-- Tabla de estado_despacho para el seguimiento de pedidos
CREATE TABLE estado_despacho (
  id_despacho SERIAL PRIMARY KEY,
  estado VARCHAR(50) NOT NULL
);

-- Tabla de usuario con roles específicos
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  contrasena VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo_email VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(15),
  direccion VARCHAR(255),
  rut VARCHAR(12) UNIQUE NOT NULL,
  tipo_usuario VARCHAR(50) CHECK (tipo_usuario IN ('comprador', 'vendedor', 'admin'))
);

-- Tabla tienda (asociada a los vendedores)
CREATE TABLE tienda (
  id_tienda SERIAL PRIMARY KEY,
  id_vendedor INT REFERENCES usuario(id_usuario),
  nombre VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(255),
  t_categoria VARCHAR(100),
  telefono VARCHAR(15)
);

-- Tabla de pedido para gestionar las compras de los usuarios
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  fecha_pedido DATE NOT NULL,
  precio_total DECIMAL(10, 2) NOT NULL,
  iva DECIMAL(10, 2) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  id_usuario INT REFERENCES usuario(id_usuario),
  id_tienda INT REFERENCES tienda(id_tienda),
  id_despacho INT REFERENCES estado_despacho(id_despacho)
);

-- Tabla de producto
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre_producto VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  dimensiones VARCHAR(100),
  existencias INT NOT NULL,
  iva DECIMAL(10, 2),
  peso INT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carrito para los usuarios con productos añadidos
CREATE TABLE carrito (
  id_carrito SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuario(id_usuario)
);

-- Tabla de relación entre carrito y productos
CREATE TABLE carrito_producto (
  id_carrito INT REFERENCES carrito(id_carrito),
  id_producto INT REFERENCES producto(id_producto),
  cantidad INT,
  PRIMARY KEY (id_carrito, id_producto)
);

-- Tabla de pedidos y productos relacionados
CREATE TABLE pedido_producto (
  id_pedido INT REFERENCES pedido(id_pedido),
  id_producto INT REFERENCES producto(id_producto),
  cantidad INT,
  PRIMARY KEY (id_pedido, id_producto)
);

-- Tabla de descuentos para productos
CREATE TABLE descuentos (
  id_descuento SERIAL PRIMARY KEY,
  id_producto INT REFERENCES producto(id_producto),
  porcentaje_descuento DECIMAL(5, 2),
  fecha_inicio DATE,
  fecha_fin DATE
);

-- Tabla de pop-ups
CREATE TABLE popups (
  id_popup SERIAL PRIMARY KEY,
  id_vendedor INT REFERENCES usuario(id_usuario),
  mensaje TEXT NOT NULL,
  fecha_inicio DATE,
  fecha_fin DATE
);

-- Tabla para favoritos de los usuarios
CREATE TABLE favoritos (
  id_favorito SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuario(id_usuario),
  id_producto INT REFERENCES producto(id_producto)
);

-- Tabla para comparación de productos
CREATE TABLE comparacion_productos (
  id_comparacion SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuario(id_usuario),
  productos JSONB -- Lista de IDs de productos en formato JSON
);

-- Tabla de puntuaciones de productos
CREATE TABLE puntuaciones (
  id_puntuacion SERIAL PRIMARY KEY,
  id_producto INT REFERENCES producto(id_producto),
  id_usuario INT REFERENCES usuario(id_usuario),
  puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5), -- Rango de 1 a 5
  fecha_puntuacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de comentarios de productos
CREATE TABLE comentarios (
  id_comentario SERIAL PRIMARY KEY,
  id_producto INT REFERENCES producto(id_producto),
  id_usuario INT REFERENCES usuario(id_usuario),
  comentario TEXT NOT NULL,
  fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial para auditorías de usuario y producto
CREATE TABLE historial_creacion_usuarios (
  id SERIAL PRIMARY KEY,
  id_usuario INT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historial_creacion_productos (
  id SERIAL PRIMARY KEY,
  id_producto INT REFERENCES producto(id_producto),
  nombre_producto VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historial_ventas (
  id SERIAL PRIMARY KEY,
  id_pedido INT REFERENCES pedido(id_pedido),
  id_usuario INT REFERENCES usuario(id_usuario),
  fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historial_eliminacion_productos (
  id SERIAL PRIMARY KEY,
  id_producto INT,
  fecha_eliminacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial de logística
CREATE TABLE historial_logistica (
  id SERIAL PRIMARY KEY,
  id_pedido INT REFERENCES pedido(id_pedido),
  id_camion INT,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado_envio VARCHAR(50)
);
-- Trigger para auditoría de creación de usuario
CREATE OR REPLACE FUNCTION log_creacion_usuario() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO historial_creacion_usuarios(id_usuario) VALUES (NEW.id_usuario);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_creacion_usuario
  AFTER INSERT ON usuario
  FOR EACH ROW
  EXECUTE FUNCTION log_creacion_usuario();

-- Trigger para auditoría de creación de productos
CREATE OR REPLACE FUNCTION log_creacion_producto() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO historial_creacion_productos(id_producto, nombre_producto, fecha_creacion)
  VALUES (NEW.id_producto, NEW.nombre_producto, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_creacion_producto
  AFTER INSERT ON producto
  FOR EACH ROW
  EXECUTE FUNCTION log_creacion_producto();

-- Trigger para auditoría de ventas
CREATE OR REPLACE FUNCTION log_venta() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO historial_ventas(id_pedido, id_usuario, fecha_venta) VALUES (NEW.id_pedido, NEW.id_usuario, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_venta
  AFTER INSERT ON pedido
  FOR EACH ROW
  EXECUTE FUNCTION log_venta();
