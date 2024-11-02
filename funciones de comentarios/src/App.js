import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './pages/Homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/Registerpage';
import Navbar from './Components/Navbar/Navbar';
import { useState } from 'react';
import Productos from './Productos/Producto';
import Producto from './pages/producto';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Productos" element={<Productos/>}/>
        <Route path="/ElProducto/:id_producto" element={<Producto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
