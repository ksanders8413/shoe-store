import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import ImageUpload from "./ImageUpload";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

const categories = ["mens", "womens", "kids"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: [],
    images: [], // Updated to 'images'
  });
  const [sizeInput, setSizeInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createProduct, loading} = useProductStore();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    
    

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);

    // Append sizes as JSON
    formData.append("sizes", JSON.stringify(newProduct.sizes));

    // Append each image to the formData
    newProduct.images.forEach((image) => {
      formData.append("images", image); // Ensure this matches the field name in your schema
    });

    try {
      await createProduct(formData); // Send formData to backend
    } catch (error) {
      console.log("Error while creating product", error);
    }finally {
      setIsLoading(false);
    }
  };


  const handleImageUpload = (imageFiles) => {
    // Add uploaded files directly to the newProduct 'images' array
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...imageFiles], // Store multiple images
    }));
  };

  const addSize = () => {
    const quantity = parseInt(quantityInput);
    if (sizeInput && quantity > 0) {
      setNewProduct({
        ...newProduct,
        sizes: [...newProduct.sizes, { size: sizeInput, quantity }],
      });
      setSizeInput("");
      setQuantityInput("");
    } else {
      toast.error("Please enter valid size and quantity.");
    }
  };

  const removeSize = (index) => {
    const updatedSizes = newProduct.sizes.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };
  
  if (isLoading) {
		return <LoadingSpinner />
	}

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full mt-1 block bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Product Images
          </label>
          <ImageUpload onUpload={handleImageUpload} />
          {newProduct.images.length > 0 && (
            <span className="ml-3 text-sm text-gray-400">Images uploaded</span>
          )}
        </div>

        {/* Sizes and Stock */}
        <div>
          <label
            htmlFor="sizes"
            className="block text-sm font-medium text-gray-300"
          >
            Sizes
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="size"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Size (e.g., 8)"
              className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              id="quantity"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              placeholder="Quantity in stock"
              className="ml-2 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={addSize}
              className="ml-2 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Add Size
            </button>
          </div>
          {newProduct.sizes.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {newProduct.sizes.map((size, index) => (
                <li key={index} className="flex justify-between items-center">
                  {size.size} - {size.quantity} in stock
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <PlusCircle className="mr-2" />
          )}
          Create Product
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;