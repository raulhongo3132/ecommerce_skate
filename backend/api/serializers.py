# ecommerce_skate/backend/api/serializers.py
from rest_framework import serializers
from .models import Categoria, Producto, Carrito, ItemCarrito, Pedido, ItemPedido

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Producto
        fields = [
            'id','categoria','categoria_id','nombre','descripcion',
            'precio','stock','activo','fecha_creacion'
        ]

class ItemCarritoSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    class Meta:
        model = ItemCarrito
        fields = ['id','producto','producto_nombre','cantidad','carrito']

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)
    class Meta:
        model = Carrito
        fields = ['id','usuario_id','fecha_creacion','items']

ESTADOS = ('pendiente','pagado','enviado','entregado','cancelado')
class ItemPedidoSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    class Meta:
        model = ItemPedido
        fields = ['id','producto','producto_nombre','precio_en_compra','cantidad','pedido']

class PedidoSerializer(serializers.ModelSerializer):
    items = ItemPedidoSerializer(many=True, read_only=True)
    estado = serializers.ChoiceField(choices=[(e,e) for e in ESTADOS])
    class Meta:
        model = Pedido
        fields = ['id','usuario_id','monto_total','estado','fecha_creacion','items']