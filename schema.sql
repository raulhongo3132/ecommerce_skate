-- ===========================
-- ELIMINACIÓN SEGURA
-- ===========================

DROP TABLE IF EXISTS ItemPedido CASCADE;
DROP TABLE IF EXISTS Pedido CASCADE;
DROP TABLE IF EXISTS ItemCarrito CASCADE;
DROP TABLE IF EXISTS Carrito CASCADE;
DROP TABLE IF EXISTS ImagenProducto CASCADE;
DROP TABLE IF EXISTS Producto CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Categoria CASCADE;

DROP TYPE IF EXISTS estado_pedido;

-- ===========================
-- TIPOS ENUM
-- ===========================

CREATE TYPE estado_pedido AS ENUM (
    'pendiente',
    'pagado',
    'enviado',
    'entregado',
    'cancelado'
);

-- ===========================
-- TABLAS
-- ===========================

CREATE TABLE Categoria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Usuario (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    rol VARCHAR(20) NOT NULL DEFAULT 'cliente',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Producto (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES Categoria(id)
        ON DELETE RESTRICT
);

CREATE TABLE ImagenProducto (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    producto_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    orden INTEGER DEFAULT 1,
    CONSTRAINT fk_imagen_producto
        FOREIGN KEY (producto_id)
        REFERENCES Producto(id)
        ON DELETE CASCADE
);

CREATE TABLE Carrito (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INTEGER NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrito_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE ItemCarrito (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    carrito_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    CONSTRAINT fk_itemcarrito_carrito
        FOREIGN KEY (carrito_id)
        REFERENCES Carrito(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_itemcarrito_producto
        FOREIGN KEY (producto_id)
        REFERENCES Producto(id)
        ON DELETE RESTRICT,
    CONSTRAINT unique_carrito_producto
        UNIQUE (carrito_id, producto_id)
);

CREATE TABLE Pedido (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    monto_total NUMERIC(12,2) NOT NULL CHECK (monto_total >= 0),
    estado estado_pedido NOT NULL DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES Usuario(id)
        ON DELETE RESTRICT
);

CREATE TABLE ItemPedido (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    precio_en_compra NUMERIC(12,2) NOT NULL CHECK (precio_en_compra >= 0),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    CONSTRAINT fk_itempedido_pedido
        FOREIGN KEY (pedido_id)
        REFERENCES Pedido(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_itempedido_producto
        FOREIGN KEY (producto_id)
        REFERENCES Producto(id)
        ON DELETE RESTRICT,
    CONSTRAINT unique_pedido_producto
        UNIQUE (pedido_id, producto_id)
);

-- ===========================
-- ÍNDICES PARA RENDIMIENTO
-- ===========================

CREATE INDEX idx_producto_categoria ON Producto(categoria_id);
CREATE INDEX idx_imagen_producto ON ImagenProducto(producto_id);
CREATE INDEX idx_pedido_usuario ON Pedido(usuario_id);
CREATE INDEX idx_itemcarrito_carrito ON ItemCarrito(carrito_id);
CREATE INDEX idx_itempedido_pedido ON ItemPedido(pedido_id);
