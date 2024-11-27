import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Clientes/pages/Homepage';
import LoginPage from './Clientes/pages/loginpage';
import Registerpage from './Clientes/pages/Registerpage';
import Producto from './Clientes/pages/productodetalles';
import LosProductos from './Clientes/pages/Losproductos';
import Profile from './Clientes/Components/Conex/profile';
import { UserProvider, UserContext } from './Clientes/Components/Conex/UserContext';

//para los vendedores
import HomePageVen from './Vendedores/pages/Homepage';
import LosProductosVen from './Vendedores/pages/Losproductos';

//para los admins
import HomePageAdm from './Administradores/pages/Homepage';
import LosProductosAdm from './Administradores/pages/Losproductos';



function App() {
  return (
    <UserProvider>
      <Router>
        <Bienvenida />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<LosProductos />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/ElProducto/:id_producto" element={<Producto />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/homeven" element={<HomePageVen/>} />
          <Route path='/productoven' element={<LosProductosVen/>} />

          <Route path="/homeadm" element={<HomePageAdm/>} />
          <Route path='/productoadm' element={<LosProductosAdm/>} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

function Bienvenida() {
  const { user, logout } = useContext(UserContext); // Ahora el contexto es accesible

  return (
    <div>
      Bienvenido {user?.nombre}
      <button onClick={logout}>Cerrar</button>
    </div>
  );
}

export default App;
