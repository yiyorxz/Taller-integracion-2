import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Clientes/Components/Header/Header';
import HomePage from './Clientes/pages/Homepage';
import LoginPage from './Clientes/pages/loginpage';
import RegisterPage from './Clientes/pages/Registerpage';
import { useState } from 'react';
import Producto from './Clientes/pages/producto';
import LosProductos from './Clientes/pages/Losproductos';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<LosProductos/>} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ElProducto/:id_producto" element={<Producto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
