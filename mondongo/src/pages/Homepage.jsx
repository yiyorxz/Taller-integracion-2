import React, { useEffect, useState } from 'react';
import Carousel from '../Components/Carousel/Carousel'
import Categories from '../Components/Categories/Categories'; // Sección de categorías
import Footer from '../Components/Footer/Footer'; // Pie de página
import './Homepage.css'; // Estilos de la página de inicio
import Productos from '../Productos/Producto';
import { Header } from '../Components/Products1/Header';
import { ProductList } from '../Components/Products1/ProductList';


function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Bienvenidos a Nuestra Tienda</h1>
          <p>Descubre los mejores productos para cada categoría.</p>
         <Carousel/>
        </section>
        <Header
			allProducts={allProducts}
			setAllProducts={setAllProducts}
			total={total}
			setTotal={setTotal}
			countProducts={countProducts}
			setCountProducts={setCountProducts}
		/>
		<ProductList
			allProducts={allProducts}
			setAllProducts={setAllProducts}
			total={total}
			setTotal={setTotal}
			countProducts={countProducts}
			setCountProducts={setCountProducts}
		/>
        <Categories />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
