import React from 'react';
function LoginPage() {
  return (
    <div>
      
      <h1>Login</h1>
      <form>
        <input type="email" name='email' placeholder="tucorreo@dominio.com" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
