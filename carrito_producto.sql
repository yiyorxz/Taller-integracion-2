CREATE TABLE Carrito_Producto (
  ID_Carrito INT NOT NULL,
  ID_Producto INT NOT NULL,
  Cantidad INT NOT NULL DEFAULT 1,
  PRIMARY KEY (ID_Carrito, ID_Producto),
  FOREIGN KEY (ID_Carrito) REFERENCES Carrito(ID_Carrito) ON DELETE CASCADE,
  FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);
