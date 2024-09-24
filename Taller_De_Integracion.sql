CREATE TABLE Usuario (
  ID_Usuario SERIAL,
  Contrasena VARCHAR(255) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Apellido VARCHAR(100) NOT NULL,
  Correo_Email VARCHAR(255) UNIQUE NOT NULL,
  Telefono VARCHAR(15),
  Rut VARCHAR(12) UNIQUE NOT NULL,
  PRIMARY KEY (ID_Usuario)
);

CREATE TABLE Estado_Despacho (
  Id_Despacho SERIAL,
  Estado VARCHAR(50) NOT NULL,
  PRIMARY KEY (Id_Despacho)
);

CREATE TABLE Pedido (
  ID_Pedido SERIAL,
  Fecha_Pedido DATE NOT NULL,
  Precio_Total DECIMAL(10, 2) NOT NULL,
  IVA DECIMAL(10, 2) NOT NULL,
  Direccion VARCHAR(255) NOT NULL,
  ID_Usuario INT,
  ID_Tienda INT,
  Id_Despacho INT,
  PRIMARY KEY (ID_Pedido),
  FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
  FOREIGN KEY (Id_Despacho) REFERENCES Estado_Despacho(Id_Despacho)
);

CREATE TABLE Tienda (
  ID_Tienda SERIAL,
  Nombre VARCHAR(100) NOT NULL,
  Ubicacion VARCHAR(255),
  T_categoria VARCHAR(100),
  Telefono VARCHAR(15),
  PRIMARY KEY (ID_Tienda)
);

CREATE TABLE Producto (
  ID_Producto SERIAL,
  Nombre_Producto VARCHAR(255) NOT NULL,
  Descripcion VARCHAR(255),
  Precio DECIMAL(10, 2) NOT NULL,
  Categoria VARCHAR(100),
  Dimensiones VARCHAR(100),
  Existencias INT NOT NULL,
  IVA DECIMAL(10, 2),
  ID_Pedido INT,
  Peso INT,
  PRIMARY KEY (ID_Producto),
  FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido)
);
