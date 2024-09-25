import React, { useState, useEffect } from 'react';
import { auth } from './firebase';  // Importamos solo la autenticación
import LoginRegistro from './components/LoginRegistro';  // Importamos el componente de registro/login

function App() {
    const [user, setUser] = useState(null);  // Estado para manejar el usuario autenticado

    useEffect(() => {
        // Escuchar los cambios en el estado de la autenticación
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  // Si hay un usuario autenticado, lo guardamos en el estado
            } else {
                setUser(null);  // Si no, el usuario es null (desconectado)
            }
        });
        return () => unsubscribe();  // Limpiar el listener cuando el componente se desmonte
    }, []);

    return (
        <div className="App">
            {user ? (
                <div>
                    <h1>Bienvenido, {user.email}</h1>
                    <button onClick={() => auth.signOut()}>Cerrar Sesión</button>
                </div>
            ) : (
                <LoginRegistro />  
                /* Mostrar el formulario de login/registro cuando no hay usuario autenticado */
            )}
        </div>
    );
}

export default App;
