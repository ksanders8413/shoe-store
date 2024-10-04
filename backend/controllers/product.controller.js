import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { cloudinary } from "../lib/cloudinary.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json( {products} ); //find all products
  } catch (error) {
    console.log("error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch from mongodb
    // .lean() is gonna return a plain javascript object instead of a mongodb document
    // which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images = [], category, sizes = [] } = req.body;

    console.log("Received sizes:", sizes);
    console.log("Received images:", images);

    let parsedSizes;
    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (error) {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    } else {
      parsedSizes = sizes; // Use as-is if it's already an array
    }

    // Ensure parsedSizes is an array
    if (!Array.isArray(parsedSizes)) {
      return res.status(400).json({ message: "Sizes must be an array" });
    }

    let imageUrls = [];

    if (images && images.length > 0) {
      // Handle multiple image uploads
      const uploadPromises = images.map((image) => {
        return cloudinary.uploader.upload(image, { folder: "products" });
      });
      const cloudinaryResponses = await Promise.all(uploadPromises);
      imageUrls = cloudinaryResponses.map((response) => response.secure_url);
    }

    // Create the product using parsedSizes
    const product = await Product.create({
      name,
      description,
      price,
      sizes: parsedSizes, // This should use parsedSizes
      images: imageUrls,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecomendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          images: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    console.log("Error in getRecomendedProducts controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    // The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function", error.message);
  }
}

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // const imageUrls = product.images ? product.images.split(',') : [];

    res.json({ ...product._doc });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



