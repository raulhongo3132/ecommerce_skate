from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, CarritoViewSet, PedidoViewSet

router = DefaultRouter()
router.register(r'categories', CategoriaViewSet, basename='categoria')
router.register(r'products',   ProductoViewSet, basename='producto')
router.register(r'cart',       CarritoViewSet, basename='carrito')
router.register(r'orders',     PedidoViewSet,  basename='pedido')

urlpatterns = [
    path('', include(router.urls)),
]