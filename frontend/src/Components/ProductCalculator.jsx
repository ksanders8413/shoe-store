import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSave, FaEdit, FaCalculator } from "react-icons/fa";
import axiosInstance from "../lib/axios";

const ProductCalculator = () => {
  // State for a single product's cost details
  const [productName, setProductName] = useState("");
  const [baseCost, setBaseCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [taxRate, setTaxRate] = useState(10);
  const [customCosts, setCustomCosts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // State to store saved products
  const [savedProducts, setSavedProducts] = useState([]);

  // Calculate total cost dynamically
  useEffect(() => {
    const calculatedTax = (baseCost * taxRate) / 100;
    const customCostTotal = customCosts.reduce(
      (acc, cost) => acc + parseFloat(cost.amount || 0),
      0
    );
    const total =
      parseFloat(baseCost) +
      parseFloat(shippingCost) +
      calculatedTax +
      customCostTotal;
    setTotalCost(total.toFixed(2));
  }, [baseCost, shippingCost, taxRate, customCosts]);

  // Add a new custom cost row
  const addCustomCost = () => {
    setCustomCosts([...customCosts, { description: "", amount: 0 }]);
  };

  // Delete a custom cost row
  const deleteCustomCost = (index) => {
    const updatedCosts = customCosts.filter((_, i) => i !== index);
    setCustomCosts(updatedCosts);
  };

  // Handle updating custom cost fields
  const handleCustomCostChange = (index, field, value) => {
    const updatedCosts = [...customCosts];
    updatedCosts[index][field] =
      field === "amount" ? parseFloat(value) || 0 : value;
    setCustomCosts(updatedCosts);
  };

  // Save product costs to localStorage and the backend
 // Save product costs to localStorage and the backend
const saveProduct = async () => {
  const newProduct = {
    name: productName,
    baseCost,
    shippingCost,
    taxRate,
    customCosts,
    totalCost,
  };

  try {
    const response = await axiosInstance.post('http://localhost:5000/api/product-cost/save-product', newProduct);
    console.log('Product saved:', response.data);

    const updatedProducts = [...savedProducts, newProduct];
    setSavedProducts(updatedProducts);

    // Save to localStorage for persistence
    localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));

    // Clear form after saving
    setProductName("");
    setBaseCost(0);
    setShippingCost(0);
    setTaxRate(10);
    setCustomCosts([]);
    setTotalCost(0);
  } catch (error) {
    console.error("Error saving product:", error.response?.data || error.message);
    alert("Failed to save product. Please try again.");
  }
};


  // Load saved products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("savedProducts");
    if (storedProducts) {
      setSavedProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Edit a saved product
  const editProduct = (index) => {
    const productToEdit = savedProducts[index];
    setProductName(productToEdit.name);
    setBaseCost(productToEdit.baseCost);
    setShippingCost(productToEdit.shippingCost);
    setTaxRate(productToEdit.taxRate);
    setCustomCosts(productToEdit.customCosts);
  };

  // Calculate total cost for all saved products
  const calculateTotalForAllProducts = () => {
    return savedProducts
      .reduce((acc, product) => acc + parseFloat(product.totalCost), 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaCalculator className="mr-2" /> Product Cost Calculator
      </h2>

      {/* Product Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-600 bg-gray-700 rounded"
          placeholder="Enter product name"
        />
      </div>

      {/* Base Cost Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Base Cost:</label>
        <input
          type="number"
          value={baseCost}
          onChange={(e) => setBaseCost(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border border-gray-600 bg-gray-700 rounded"
        />
      </div>

      {/* Shipping Cost Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shipping Cost:</label>
        <input
          type="number"
          value={shippingCost}
          onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border border-gray-600 bg-gray-700 rounded"
        />
      </div>

      {/* Tax Rate Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tax Rate (%):</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border border-gray-600 bg-gray-700 rounded"
        />
      </div>

      {/* Custom Costs Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Additional Costs</h3>
          <button
            onClick={addCustomCost}
            className="bg-emerald-600 p-2 rounded hover:bg-emerald-700"
          >
            <FaPlus />
          </button>
        </div>

        {/* Custom Cost Rows */}
        {customCosts.map((cost, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <input
              type="text"
              value={cost.description}
              onChange={(e) =>
                handleCustomCostChange(index, "description", e.target.value)
              }
              placeholder="Cost Description"
              className="w-full mr-2 p-2 border border-gray-600 bg-gray-700 rounded"
            />
            <input
              type="number"
              value={cost.amount}
              onChange={(e) =>
                handleCustomCostChange(index, "amount", e.target.value)
              }
              placeholder="Amount"
              className="w-full mr-2 p-2 border border-gray-600 bg-gray-700 rounded"
            />
            <button
              onClick={() => deleteCustomCost(index)}
              className="bg-red-600 p-2 rounded hover:bg-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={saveProduct}
        className="w-full p-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex justify-center items-center gap-2 mb-6"
      >
        <FaSave /> Save Product Cost
      </button>

      {/* Total Cost for Current Product */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Total Cost: ${totalCost}</p>
      </div>

      {/* Saved Products */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Saved Products</h3>
        {savedProducts.length > 0 ? (
          <ul className="space-y-4">
            {savedProducts.map((product, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-4 rounded"
              >
                <span>{product.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-300">${product.totalCost}</span>
                  <button
                    onClick={() => editProduct(index)}
                    className="bg-blue-500 p-2 rounded hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved products yet.</p>
        )}
      </div>

      {/* Total Cost for All Products */}
      <div className="mt-6">
        <p className="text-lg font-bold">
          Total for All Products: ${calculateTotalForAllProducts()}
        </p>
      </div>
    </div>
  );
};

export default ProductCalculator;
