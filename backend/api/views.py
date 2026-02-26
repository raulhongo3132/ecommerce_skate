# ecommerce_skate/backend/api/views.py
from rest_framework import viewsets, permissions, filters
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from decimal import Decimal

from .models import Categoria, Producto, Carrito, ItemCarrito, Pedido, ItemPedido
from .serializers import (
    CategoriaSerializer, ProductoSerializer,
    CarritoSerializer, ItemCarritoSerializer,
    PedidoSerializer, ItemPedidoSerializer
)

# --------- Catálogo (público lectura, admin escritura)
class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.select_related('categoria').all()
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['precio', 'fecha_creacion', 'stock']

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        return [IsAdminUser()]

# --------- Carrito (punto 5.2)

class CarritoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _get_or_create_cart(self, request):
        # Ajusta este mapeo si tu usuario real (tabla Usuario) no coincide con auth_user.id
        usuario_id = request.user.id
        cart, _ = Carrito.objects.get_or_create(usuario_id=usuario_id)
        return cart

    @action(detail=False, methods=['GET'])
    def mine(self, request):
        from .serializers import CarritoSerializer
        cart = self._get_or_create_cart(request)
        return Response(CarritoSerializer(cart).data)

    @action(detail=False, methods=['POST'])
    def add(self, request):
        from .serializers import ItemCarritoSerializer
        cart = self._get_or_create_cart(request)
        try:
            producto_id = int(request.data.get('producto_id'))
            cantidad = int(request.data.get('cantidad', 1))
        except (TypeError, ValueError):
            return Response({"detail": "Datos inválidos"}, status=400)
        if cantidad <= 0:
            return Response({"detail": "Cantidad inválida"}, status=400)

        item, created = ItemCarrito.objects.get_or_create(
            carrito=cart,
            producto_id=producto_id,
            defaults={'cantidad': cantidad}
        )
        if not created:
            item.cantidad += cantidad
            item.save()
        return Response(ItemCarritoSerializer(item).data, status=201 if created else 200)

    # ⛔️ Antes: def update(...) con @action → conflicto
    # ✅ Ahora: renombrado a set_quantity (ruta: /api/cart/set-quantity/)
    @action(detail=False, methods=['PATCH'], url_path='set-quantity')
    def set_quantity(self, request):
        from .serializers import ItemCarritoSerializer
        cart = self._get_or_create_cart(request)
        try:
            producto_id = int(request.data.get('producto_id'))
            cantidad = int(request.data.get('cantidad', 1))
        except (TypeError, ValueError):
            return Response({"detail": "Datos inválidos"}, status=400)

        try:
            item = ItemCarrito.objects.get(carrito=cart, producto_id=producto_id)
        except ItemCarrito.DoesNotExist:
            return Response({"detail": "Item no existe en el carrito"}, status=404)

        if cantidad <= 0:
            item.delete()
            return Response(status=204)

        item.cantidad = cantidad
        item.save()
        return Response(ItemCarritoSerializer(item).data)

    # Opcional: más explícito en la URL para DELETE y aceptar query param
    @action(detail=False, methods=['DELETE'], url_path='remove-item')
    def remove_item(self, request):
        cart = self._get_or_create_cart(request)
        # DELETE a veces ignora body; lee también de querystring
        pid = request.query_params.get('producto_id') or request.data.get('producto_id')
        try:
            producto_id = int(pid)
        except (TypeError, ValueError):
            return Response({"detail": "producto_id requerido"}, status=400)
        ItemCarrito.objects.filter(carrito=cart, producto_id=producto_id).delete()
        return Response(status=204)

# --------- Pedidos / Checkout (punto 5.3)
class PedidoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        if request.user.is_staff or request.user.is_superuser:
            qs = Pedido.objects.all()
        else:
            qs = Pedido.objects.filter(usuario_id=request.user.id)
        return Response(PedidoSerializer(qs, many=True).data)

    def retrieve(self, request, pk=None):
        try:
            p = Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            return Response(status=404)
        if not (request.user.is_staff or request.user.is_superuser) and p.usuario_id != request.user.id:
            return Response(status=403)
        return Response(PedidoSerializer(p).data)

    @action(detail=False, methods=['POST'])
    @transaction.atomic
    def checkout(self, request):
        usuario_id = request.user.id
        try:
            cart = Carrito.objects.get(usuario_id=usuario_id)
        except Carrito.DoesNotExist:
            return Response({"detail":"Carrito vacío"}, status=400)

        items = list(ItemCarrito.objects.select_related('producto').filter(carrito=cart))
        if not items:
            return Response({"detail":"Carrito vacío"}, status=400)

        # Verificar stock y calcular total
        total = Decimal('0.00')
        for it in items:
            if not it.producto.activo:
                return Response({"detail": f"Producto {it.producto_id} inactivo"}, status=400)
            if it.cantidad > it.producto.stock:
                return Response({"detail": f"Stock insuficiente para producto {it.producto_id}"}, status=400)
            total += (it.producto.precio * it.cantidad)

        # Crear pedido
        pedido = Pedido.objects.create(
            usuario_id=usuario_id,
            monto_total=total,
            estado='pendiente'
        )

        # Crear items + descontar stock
        for it in items:
            ItemPedido.objects.create(
                pedido=pedido,
                producto_id=it.producto_id,
                precio_en_compra=it.producto.precio,
                cantidad=it.cantidad
            )
            it.producto.stock -= it.cantidad
            it.producto.save()

        # Vaciar carrito
        ItemCarrito.objects.filter(carrito=cart).delete()
        return Response(PedidoSerializer(pedido).data, status=201)

    @action(detail=True, methods=['PATCH'])
    def set_status(self, request, pk=None):
        if not (request.user.is_staff or request.user.is_superuser):
            return Response(status=403)
        try:
            pedido = Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            return Response(status=404)

        estado = request.data.get('estado')
        if estado not in ('pendiente','pagado','enviado','entregado','cancelado'):
            return Response({"detail":"Estado inválido"}, status=400)

        pedido.estado = estado
        pedido.save()
        return Response(PedidoSerializer(pedido).data)