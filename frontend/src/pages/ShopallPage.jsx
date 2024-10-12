import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import ProductCard from '../Components/ProductCard'; // Adjust the import based on your structure
import LoadingSpinner from '../Components/LoadingSpinner';
import { StarryBackground } from '../../motionComponents/ShopByCategory';
// import { useLocation } from 'react-router-dom';


const ShopAllPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      console.log(response.data); // Log to inspect the response structure
  
      // Check if 'products' is an array within the response data
      if (response.data.products && Array.isArray(response.data.products)) {
        setProducts(response.data.products); // Set the products state
      } else {
        setError('Products data is not in the expected format.');
      }
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
      return
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  // const ScrollToTop = () => {
  //   const { pathname } = useLocation();
  
  //   useEffect(() => {
  //     window.scrollTo(0, 0); // Scroll to top of the page
  //   }, [pathname]);
  
  //   return null;
  // };
  
  return (
    <div className="relative min-h-screen -mb-10 -mt-8" style={{ background: 'linear-gradient(to bottom, #001f3f, #003366, #004080, #1a5276, #2471a3)' }}>
      {/* <ScrollToTop /> */}
      <StarryBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-4xl font-bold text-gray-200 mb-8">
          Shop All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopAllPage;

