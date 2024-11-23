// src/permisos/roles.js
// EDITAR SEGUN LAS PAGINAS Y ACCESOS QUE TIENE CADA USUARIO
const roles = {
    comprador: {
      allowedRoutes: ['/homepage', '/profile'],
      permissions: ['verProductos', 'comprar'],
    },
    vendedor: {
      allowedRoutes: ['/homepage', '/profile', '/ventas'],
      permissions: ['verProductos', 'vender', 'gestionarInventario'],
    },
    admin: {
      allowedRoutes: ['/homepage', '/profile', '/adminPanel'],
      permissions: ['verProductos', 'gestionarUsuarios', 'configuracion'],
    },
  };
  
  export default roles;
  