import React from "react";
import './Navbar.css';
import { IoLocationSharp } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserAltSlash } from "react-icons/fa";

const Navbar = () => {
    return (     
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#"><IoLocationSharp style={{fontSize:'38px'}}/> Ingresa tu <br></br><b>ubicacion</b></a>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">categoria1</a>
                    <a class="dropdown-item" href="#">categoria2</a>
                    <a class="dropdown-item" href="#">categoria3</a>
                </div>
                </li>
              <li class="nav-item">
                <a class="nav-link active" aria-disabled="true">Ofertas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-disabled="true">Ayuda</a>
              </li>
            </ul>
            
          </div>
          <a class="navbar-brand" href="#"><FaUserAltSlash style={{fontSize:'30px'}}/></a>
          <a class="navbar-brand" href="#"><CiShoppingCart style={{fontSize:'30px'}}/></a>
        </div>

      </nav>
    );
};

export default Navbar;