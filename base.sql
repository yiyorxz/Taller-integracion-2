-- ======================================
-- Creación de Tablas
-- ======================================

-- Tabla Usuario
CREATE TABLE Usuario (
  ID_Usuario SERIAL PRIMARY KEY,
  Contrasena VARCHAR(255) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Apellido VARCHAR(100) NOT NULL,
  Correo_Email VARCHAR(255) UNIQUE NOT NULL,
  Telefono VARCHAR(15),
  Rut VARCHAR(12) UNIQUE NOT NULL
);

-- Tabla Estado_Despacho
CREATE TABLE Estado_Despacho (
  Id_Despacho SERIAL PRIMARY KEY,
  Estado VARCHAR(50) NOT NULL
);

-- Tabla Pedido
CREATE TABLE Pedido (
  ID_Pedido SERIAL PRIMARY KEY,
  Fecha_Pedido DATE NOT NULL,
  Precio_Total DECIMAL(10, 2) NOT NULL,
  IVA DECIMAL(10, 2) NOT NULL,
  Direccion VARCHAR(255) NOT NULL,
  ID_Usuario INT,
  ID_Tienda INT,
  Id_Despacho INT,
  FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
  FOREIGN KEY (Id_Despacho) REFERENCES Estado_Despacho(Id_Despacho)
);

-- Tabla Tienda
CREATE TABLE Tienda (
  ID_Tienda SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Ubicacion VARCHAR(255),
  T_categoria VARCHAR(100),
  Telefono VARCHAR(15)
);

-- Tabla Producto
CREATE TABLE Producto (
  ID_Producto SERIAL PRIMARY KEY,
  Nombre_Producto VARCHAR(255) NOT NULL,
  Descripcion VARCHAR(255),
  Precio DECIMAL(10, 2) NOT NULL,
  Categoria VARCHAR(100),
  Dimensiones VARCHAR(100),
  Existencias INT NOT NULL,
  IVA DECIMAL(10, 2),
  ID_Pedido INT,
  Peso INT,
  FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido)
);

-- ======================================
-- Creación de Tablas de Historial/Auditoría
-- ======================================

-- Historial de creación de usuarios
CREATE TABLE Historial_Creacion_Usuarios (
    ID SERIAL PRIMARY KEY,
    ID_Usuario INT,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Correo_Email VARCHAR(255),
    Fecha_Creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de eliminación de productos
CREATE TABLE Historial_Eliminacion_Productos (
    ID SERIAL PRIMARY KEY,
    ID_Producto INT,
    Nombre_Producto VARCHAR(255),
    Fecha_Eliminacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de ingreso de productos
CREATE TABLE Historial_Ingreso_Productos (
    ID SERIAL PRIMARY KEY,
    ID_Producto INT,
    Nombre_Producto VARCHAR(255),
    Fecha_Ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de modificaciones de productos
CREATE TABLE Historial_Modificacion_Productos (
    ID SERIAL PRIMARY KEY,
    ID_Producto INT,
    Nombre_Producto VARCHAR(255),
    Atributo_Modificado VARCHAR(255),
    Valor_Antiguo VARCHAR(255),
    Valor_Nuevo VARCHAR(255),
    Fecha_Modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================
-- Creación de Funciones y Triggers
-- ======================================

-- Función para validar productos
CREATE OR REPLACE FUNCTION validar_producto()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Existencias < 0 THEN
        RAISE EXCEPTION 'El stock (Existencias) no puede ser negativo';
    END IF;
    
    IF NEW.Precio <= 0 THEN
        RAISE EXCEPTION 'El precio del producto debe ser mayor a 0';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar productos
CREATE TRIGGER trigger_validar_producto
BEFORE INSERT OR UPDATE ON Producto
FOR EACH ROW
EXECUTE FUNCTION validar_producto();

-- Función para validar creación de usuarios
CREATE OR REPLACE FUNCTION validar_usuario()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Usuario WHERE Rut = NEW.Rut) THEN
        RAISE EXCEPTION 'El RUT % ya está registrado', NEW.Rut;
    END IF;

    IF EXISTS (SELECT 1 FROM Usuario WHERE Correo_Email = NEW.Correo_Email) THEN
        RAISE EXCEPTION 'El correo electrónico % ya está registrado', NEW.Correo_Email;
    END IF;
    
    IF NEW.Correo_Email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'El formato del correo electrónico % es inválido', NEW.Correo_Email;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar creación de usuarios
CREATE TRIGGER trigger_validar_usuario
BEFORE INSERT ON Usuario
FOR EACH ROW
EXECUTE FUNCTION validar_usuario();

-- Función para registrar creación de usuarios
CREATE OR REPLACE FUNCTION registrar_creacion_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Historial_Creacion_Usuarios (ID_Usuario, Nombre, Apellido, Correo_Email)
    VALUES (NEW.ID_Usuario, NEW.Nombre, NEW.Apellido, NEW.Correo_Email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para registrar creación de usuarios
CREATE TRIGGER trigger_creacion_usuario
AFTER INSERT ON Usuario
FOR EACH ROW
EXECUTE FUNCTION registrar_creacion_usuario();

-- Función para registrar eliminación de productos
CREATE OR REPLACE FUNCTION registrar_eliminacion_producto()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Historial_Eliminacion_Productos (ID_Producto, Nombre_Producto)
    VALUES (OLD.ID_Producto, OLD.Nombre_Producto);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger para registrar eliminación de productos
CREATE TRIGGER trigger_eliminacion_producto
AFTER DELETE ON Producto
FOR EACH ROW
EXECUTE FUNCTION registrar_eliminacion_producto();

-- Función para registrar ingreso de productos
CREATE OR REPLACE FUNCTION registrar_ingreso_producto()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Historial_Ingreso_Productos (ID_Producto, Nombre_Producto)
    VALUES (NEW.ID_Producto, NEW.Nombre_Producto);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para registrar ingreso de productos
CREATE TRIGGER trigger_ingreso_producto
AFTER INSERT ON Producto
FOR EACH ROW
EXECUTE FUNCTION registrar_ingreso_producto();

-- Función para registrar modificaciones a productos
CREATE OR REPLACE FUNCTION registrar_modificacion_producto()
RETURNS TRIGGER AS $$
DECLARE
    atributo TEXT;
    valor_antiguo TEXT;
    valor_nuevo TEXT;
BEGIN
    IF NEW.Nombre_Producto IS DISTINCT FROM OLD.Nombre_Producto THEN
        atributo := 'Nombre_Producto';
        valor_antiguo := OLD.Nombre_Producto;
        valor_nuevo := NEW.Nombre_Producto;
    ELSIF NEW.Precio IS DISTINCT FROM OLD.Precio THEN
        atributo := 'Precio';
        valor_antiguo := OLD.Precio::TEXT;
        valor_nuevo := NEW.Precio::TEXT;
    ELSIF NEW.Existencias IS DISTINCT FROM OLD.Existencias THEN
        atributo := 'Existencias';
        valor_antiguo := OLD.Existencias::TEXT;
        valor_nuevo := NEW.Existencias::TEXT;
    END IF;

    IF atributo IS NOT NULL THEN
        INSERT INTO Historial_Modificacion_Productos (ID_Producto, Nombre_Producto, Atributo_Modificado, Valor_Antiguo, Valor_Nuevo)
        VALUES (NEW.ID_Producto, NEW.Nombre_Producto, atributo, valor_antiguo, valor_nuevo);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para registrar modificaciones de productos
CREATE TRIGGER trigger_modificacion_producto
AFTER UPDATE ON Producto
FOR EACH ROW
EXECUTE FUNCTION registrar_modificacion_producto();
