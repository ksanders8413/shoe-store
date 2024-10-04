import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", formData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!"); // Optional success message

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error);
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category) => {
	set({ loading: true });
	try {
		const response = await axios.get(`/products/category/${category}`);
		set({ products: response.data.products, loading: false });
	} catch (error) {
		set({ error: "Failed to fetch products", loading: false });
		toast.error(error.response.data.error || "Failed to fetch products");
	}
},

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch featured products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
}));









//delete trying to fix the erroron thumbnail in product info page







// import { create } from "zustand";
// import toast from "react-hot-toast";
// import axios from "../lib/axios";

// export const useProductStore = create((set, get) => ({
//   products: [],
//   loading: false,

//   // Set products directly
//   setProducts: (products) => set({ products }),

//   // Create a new product
//   createProduct: async (formData) => {
//     set({ loading: true });
//     try {
//       const res = await axios.post("/products", formData);
//       set((prevState) => ({
//         products: [...prevState.products, res.data],
//         loading: false,
//       }));
//       toast.success("Product created successfully!");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.error || "Failed to create product");
//       set({ loading: false });
//     }
//   },

//   // Fetch all products
//   fetchAllProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products");
//       set({ products: response.data.products, loading: false });
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.error || "Failed to fetch products");
//       set({ loading: false });
//     }
//   },

//   // Fetch products by category
//   fetchProductsByCategory: async (category) => {
//     set({ loading: true });
//     try {
//       const response = await axios.get(`/products/category/${category}`);
//       set({ products: response.data.products, loading: false });
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.error || "Failed to fetch category products");
//       set({ loading: false });
//     }
//   },

//   // Delete a product
//   deleteProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       await axios.delete(`/products/${productId}`);
//       set((prevState) => ({
//         products: prevState.products.filter((product) => product._id !== productId),
//         loading: false,
//       }));
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.error || "Failed to delete product");
//       set({ loading: false });
//     }
//   },

//   // Toggle featured status
//   toggleFeaturedProduct: async (productId) => {
//     set({ loading: true });
//     try {
//       const response = await axios.patch(`/products/${productId}`);
//       set((prevState) => ({
//         products: prevState.products.map((product) =>
//           product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
//         ),
//         loading: false,
//       }));
//       toast.success("Product featured status updated");
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.error || "Failed to update product");
//       set({ loading: false });
//     }
//   },

//   // Fetch featured products
//   fetchFeaturedProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await axios.get("/products/featured");
//       set({ products: response.data, loading: false });
//     } catch (error) {
//       console.error("Error fetching featured products:", error);
//       set({ loading: false });
//       toast.error(error?.response?.data?.error || "Failed to fetch featured products");
//     }
//   },
// }));
