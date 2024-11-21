import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageVen from './Vendedores/pages/Homepage';
import HomePage from './Clientes/pages/Homepage'
import LoginPage from './Vendedores/pages/loginpage';
import RegisterPage from './Vendedores/pages/Registerpage';
import { useState } from 'react';
import Producto from './Vendedores/pages/producto';
import LosProductos from './Vendedores/pages/Losproductos';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homevendedor" element={<HomePageVen/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<LosProductos/>} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ElProducto/:id_producto" element={<Producto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
