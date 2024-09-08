CREATE TABLE "Usuario" (
  "ID_Usuario" SERIAL PRIMARY KEY,
  "Contrasena" VARCHAR(255),
  "Nombre" VARCHAR(255),
  "Apellido" VARCHAR(255),
  "Correo_Email" VARCHAR(255),
  "Telefono" VARCHAR(20),
  "Rut" INT
);

CREATE TABLE "Pedido" (
  "ID_Pedido" SERIAL PRIMARY KEY,
  "Fecha_Pedido" DATE,
  "Precio_Total" NUMERIC,
  "IVA" NUMERIC,
  "Direccion" VARCHAR(255),
  "ID_Usuario" INT,
  "ID_Tienda" INT,
  FOREIGN KEY ("ID_Usuario") REFERENCES "Usuario"("ID_Usuario")
);

CREATE TABLE "Producto" (
  "ID_Producto" SERIAL PRIMARY KEY,
  "Nombre_Producto" VARCHAR(255),
  "Descripcion" VARCHAR(255),
  "Precio" NUMERIC,
  "Categoria" VARCHAR(255),
  "Dimensiones" VARCHAR(255),
  "Existencias" INT,
  "IVA" NUMERIC,
  "ID_Pedido" INT,
  "Peso" INT,
  FOREIGN KEY ("ID_Pedido") REFERENCES "Pedido"("ID_Pedido")
);

CREATE TABLE "Tienda" (
  "ID_Tienda" SERIAL PRIMARY KEY,
  "Nombre" VARCHAR(255),
  "Ubicacion" VARCHAR(255),
  "T_Categoria" VARCHAR(255),
  "Telefono" VARCHAR(20)
);
