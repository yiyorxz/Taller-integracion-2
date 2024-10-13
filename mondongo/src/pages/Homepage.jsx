import React, { useEffect } from 'react';
import Carousel from '../Components/Carousel/Carousel'
import Categories from '../Components/Categories/Categories'; // Sección de categorías
import Footer from '../Components/Footer/Footer'; // Pie de página
import './Homepage.css'; // Estilos de la página de inicio


const HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    
  const fetchProducts = async() => {
    try {
      const response = await fetch()
      setProducts(response.data);
      setLoading(false); 
    } catch(error){
      console.error('no se pudieron obtener los productos');
      setLoading(false);
    }
  };
  useEffect(() =>{
    fetchProducts();
  }, [])
  



  return (
    <div>
      
      <main>
        <section className="hero">
          <h1>Bienvenidos a Nuestra Tienda</h1>
          <p>Descubre los mejores productos para cada categoría.</p>
         <Carousel/>
        </section>
        <Categories />
        {loading ? (
          <div className="loading">Cargando productos...Por Favor espere</div>
        ) : (
          <div className='product-list'>
            {products.map((product) => (
              <div key={product.id} className='product-item'>
                <h2 className='product-name'>{product.name}</h2>
                <p className='product-price'>${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
