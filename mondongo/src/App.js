import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Clientes/pages/Homepage';
import LoginPage from './Clientes/pages/loginpage';
import RegisterPage from './Clientes/pages/Registerpage';
import Producto from './Clientes/pages/producto';
import LosProductos from './Clientes/pages/Losproductos';
import Profile from './Clientes/Components/Conex/profile';
import { UserProvider } from './Clientes/Components/Conex/UserContext';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<LosProductos />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ElProducto/:id_producto" element={<Producto />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
