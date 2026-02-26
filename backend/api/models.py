# ecommerce_skate/backend/api/models.py
from django.db import models

class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    class Meta:
        managed = False
        db_table = 'categoria'
        ordering = ['nombre']
    def __str__(self): return self.nombre

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.RESTRICT, db_column='categoria_id', related_name='productos'
    )
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=12, decimal_places=2)
    stock = models.IntegerField(default=0)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'producto'
        ordering = ['-fecha_creacion']
    def __str__(self): return f"{self.nombre} (${self.precio})"

class Carrito(models.Model):
    id = models.AutoField(primary_key=True)
    usuario_id = models.IntegerField(unique=True)
    fecha_creacion = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'carrito'
    def __str__(self): return f"Carrito usuario {self.usuario_id}"

class ItemCarrito(models.Model):
    id = models.AutoField(primary_key=True)
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, db_column='carrito_id', related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.RESTRICT, db_column='producto_id')
    cantidad = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'itemcarrito'
        unique_together = (('carrito', 'producto'),)

class Pedido(models.Model):
    id = models.AutoField(primary_key=True)
    usuario_id = models.IntegerField()
    monto_total = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=20)
    fecha_creacion = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'pedido'
        ordering = ['-fecha_creacion']

class ItemPedido(models.Model):
    id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='pedido_id', related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.RESTRICT, db_column='producto_id')
    precio_en_compra = models.DecimalField(max_digits=12, decimal_places=2)
    cantidad = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'itempedido'
        unique_together = (('pedido', 'producto'),)