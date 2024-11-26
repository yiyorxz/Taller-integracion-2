import React, { useEffect, useState, useContext } from 'react';
import Carousel from '../Components/Carousel/Carousel'
import Categories from '../Components/Categories/Categories'; // Sección de categorías
import Footer from '../Components/Footer/Footer'; // Pie de página
import './Homepage.css'; // Estilos de la página de inicio
import { Header } from '../Components/Productsycarro/Header';
import { ProductList } from '../Components/Productsycarro/ProductList';
import Popup from '../Components/PopUp/Popup'
import { UserContext } from '../Components/Conex/UserContext';

function HomePage() {

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
        <Popup/>
        <section className="hero">
          <h1>Bienvenidos a Nuestra Tienda</h1>
          <p>Descubre los mejores productos para cada categoría.</p>
         <Carousel/>
        </section>
        <Categories />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
