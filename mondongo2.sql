-- Tabla usuario
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  contrasena VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo_email VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(15),
  rut VARCHAR(12) UNIQUE NOT NULL
);

-- Tabla estado_despacho
CREATE TABLE estado_despacho (
  id_despacho SERIAL PRIMARY KEY,
  estado VARCHAR(50) NOT NULL
);

-- Tabla tienda
CREATE TABLE tienda (
  id_tienda SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(255),
  t_categoria VARCHAR(100),
  telefono VARCHAR(15)
);

-- Tabla pedido
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  fecha_pedido DATE NOT NULL,
  precio_total DECIMAL(10, 2) NOT NULL,
  iva DECIMAL(10, 2) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  id_usuario INT,
  id_tienda INT,
  id_despacho INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_despacho) REFERENCES estado_despacho(id_despacho)
);

-- Tabla producto
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre_producto VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  dimensiones VARCHAR(100),
  existencias INT NOT NULL,
  iva DECIMAL(10, 2),
  id_pedido INT,
  peso INT,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);
-- Historial de creación de usuarios
CREATE TABLE historial_creacion_usuarios (
    id SERIAL PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo_email VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de eliminación de productos
CREATE TABLE historial_eliminacion_productos (
    id SERIAL PRIMARY KEY,
    id_producto INT,
    nombre_producto VARCHAR(255),
    fecha_eliminacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de ingreso de productos
CREATE TABLE historial_ingreso_productos (
    id SERIAL PRIMARY KEY,
    id_producto INT,
    nombre_producto VARCHAR(255),
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de modificaciones de productos
CREATE TABLE historial_modificacion_productos (
    id SERIAL PRIMARY KEY,
    id_producto INT,
    nombre_producto VARCHAR(255),
    atributo_modificado VARCHAR(255),
    valor_antiguo VARCHAR(255),
    valor_nuevo VARCHAR(255),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
