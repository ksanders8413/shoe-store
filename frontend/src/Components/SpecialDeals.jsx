import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure you're using react-router for navigation

const SpecialDeals = ({ products }) => {
  const [specialDeals, setSpecialDeals] = useState([]);

  useEffect(() => {
    // Filter the products for special deals (assuming there's a `isOnSale` or `discount` property)
    const deals = products.filter(product => product.isOnSale || product.discount > 0);
    setSpecialDeals(deals);
  }, [products]);

  return (
    <div className="py-12 bg-gradient-to-b from-blue-800 to-green-900 ">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-8">
          Special Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {specialDeals.length > 0 ? (
            specialDeals.map((product) => (
              <div key={product._id} className="bg-gradient-to-b from-purple-600 to-emerald-500 rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 border border-emerald-500/40">
                <Link to={`/product/${product._id}`} className="block">
                  <div className="overflow-hidden border-b-4 border-emerald-500 h-48 bg-gradient-to-r from-emerald-500 to-blue-500">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-4 bg-gray-900 text-white">
                  <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                    {product.name}
                  </h3>
                  <p className="text-white font-medium mb-2">
                    ${product.price.toFixed(2)} {product.discount > 0 && <span className="text-red-500 line-through">${(product.price + product.discount).toFixed(2)}</span>}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No special deals available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialDeals;
