import React from 'react';

function RegisterPage() {
  return (
    <div>
      <h1>Registro</h1>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;
