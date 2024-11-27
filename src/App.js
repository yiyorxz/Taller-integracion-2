import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useContext } from 'react';  // Asegúrate de importar 'useContext' aquí
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Clientes/pages/Homepage';
import LoginPage from './Clientes/pages/loginpage';
import RegisterPage from './Clientes/pages/Registerpage';
import Producto from './Clientes/pages/producto';
import LosProductos from './Clientes/pages/Losproductos';
import Profile from './Clientes/Components/Conex/profile';
import { UserProvider, UserContext } from './Clientes/Components/Conex/UserContext';
import Protector from './Clientes/Components/Conex/protector'; // Importa el componente Protector

function App() {
  return (
    <UserProvider>
      <Router>
        <Bienvenida />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Ruta protegida de productos */}
          <Route
            path="/products"
            element={
              <Protector>
                <LosProductos />
              </Protector>
            }
          />
          
          {/* Ruta protegida de un producto específico */}
          <Route
            path="/ElProducto/:id_producto"
            element={
              <Protector>
                <Producto />
              </Protector>
            }
          />
          
          {/* Ruta protegida de perfil */}
          <Route
            path="/profile"
            element={
              <Protector>
                <Profile />
              </Protector>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function Bienvenida() {
  const { user, logout } = useContext(UserContext); // Accede al estado del usuario usando 'useContext'

  return (
    <div>
      {user ? (
        <>
          <p>Bienvenido, {user.nombre}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <p>No estás logueado.</p>
      )}
    </div>
  );
}

export default App;
