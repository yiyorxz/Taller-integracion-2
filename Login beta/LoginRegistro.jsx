import React, { useState } from 'react';
// import { handleLogin } from './FuncInSeccion'; 
// import { handleRegister } from './FuncRegistro';
import { handleRegister } from '../functions/FuncRegistro';  // Importa la función de registro
import { handleLogin } from '../functions/FuncInSeccion';    // Importa la función de inicio de sesión

const LoginRegistro = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <div>
            <h2>Registro de Usuario</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            
            <form onSubmit={(e) => {
                e.preventDefault();
                handleRegister(email, password, repPassword, fullName, username, setError, setSuccess);
            }}>
                <input type="text" placeholder="Nombre Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Repetir Contraseña" value={repPassword} onChange={(e) => setRepPassword(e.target.value)} required />
                <button type="submit">Registrarse</button>
            </form>

            <h2>Inicio de Sesión</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin(loginEmail, loginPassword, setError, setSuccess);
            }}>
                <input type="email" placeholder="Correo" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginRegistro;
