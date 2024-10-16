CREATE TABLE items_carrito (
  id_carrito SERIAL PRIMARY KEY,                   
  id_producto INT REFERENCES producto(id_producto),  
  cantidad INT NOT NULL,                        
  id_usuario UUID REFERENCES usuarios(id),      
  fecha_creacion TIMESTAMP DEFAULT NOW()             
);

