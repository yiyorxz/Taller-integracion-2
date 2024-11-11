import React, { useState } from 'react';
import { client } from '../supabase/client';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await client.auth.signUp({
      email,
      password
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignUp;
