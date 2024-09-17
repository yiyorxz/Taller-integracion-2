// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import { auth } from '../config/configfirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  // Observar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
      console.error('Error en el registro de usuario:', error.message);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    // Validar correo electrónico y contraseña
    if (!validateEmail(trimmedEmail)) {
      console.error('Correo electrónico no válido.');
      return;
    }
  
    if (trimmedPassword === '') {
      console.error('La contraseña no puede estar vacía.');
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      console.log('Usuario autenticado:', userCredential.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  

  return (
    <div>
      {/* Mostrar estado del usuario */}
      {user ? (
        <div>
          <h2>Bienvenido, {user.email}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering ? (
            <button onClick={handleRegister}>Register</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <p onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
