import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer/Footer'; // Pie de página
import { Header } from '../Components/Productsycarro/Header';
import { ProductList } from '../Components/Productsycarro/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';


function LosProductosVen(){
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    return (
        <div>
                <Header
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setCountProducts={setCountProducts}
                />
            <main>
                <ProductList
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setCountProducts={setCountProducts}
                />
            </main>
            <Footer />
        </div>  
    );    
}

export default LosProductosVen;