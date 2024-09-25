import React from 'react';
import { auth } from '../firebase'; // Asegúrate de importar Firebase

const Home = ({ user }) => {
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Cerrar sesión
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Bienvenido, {user.email}</h1>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <h1>Por favor inicia sesión para continuar.</h1>
            )}
        </div>
    );
};
export default Home;
