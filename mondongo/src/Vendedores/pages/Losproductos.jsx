import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer/Footer'; // Pie de página
import { Header } from '../Components/Productsycarro/Header';
import { ProductList } from '../Components/Productsycarro/ProductList';


function LosProductos(){

    return (
        <div>
                <Header/>
            <main>
                <ProductList/>
            </main>
            <Footer />
        </div>  
    );    
}

export default LosProductos;