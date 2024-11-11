import React from 'react';
import Carousel from '../Components/Carousel/Carousel'
import Categories from '../Components/Categories/Categories'; // Sección de categorías
import Footer from '../Components/Footer/Footer'; // Pie de página
import './Homepage.css'; // Estilos de la página de inicio

function HomePage() {
  return (
    <div>
      
      <main>
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
