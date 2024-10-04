
// import Product from "../models/product.model.js";



// export const updateStock = async (req, res) => {
//   const { id } = req.params; // Product ID
//   const { size, quantity } = req.body; // Expecting size and quantity in the request body

//   console.log('Request body:', req.body); // Log the incoming payload

//   // Convert size and quantity to numbers
//   const sizeAsNumber = parseFloat(size); // Use parseFloat for decimal sizes
//   const quantityAsNumber = parseInt(quantity, 10); // Ensure quantity is an integer

//   // Validate the inputs
//   if (isNaN(sizeAsNumber) || sizeAsNumber <= 0) {
//     return res.status(400).json({ message: 'Size must be a valid number' });
//   }
//   if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
//     return res.status(400).json({ message: 'Quantity must be a valid number' });
//   }

//   try {
//     // Find the product by ID
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Find the size entry to update
//     const sizeEntry = product.sizes.find(s => s.size === sizeAsNumber);
//     if (!sizeEntry) {
//       return res.status(404).json({ message: 'Size not found' });
//     }

//     // Ensure stock is sufficient
//     if (sizeEntry.quantity < quantityAsNumber) {
//       return res.status(400).json({ message: 'Insufficient stock for this size' });
//     }

//     // Decrease the quantity for the specified size
//     sizeEntry.quantity -= quantityAsNumber;

//     // Save the updated product
//     await product.save();

//     res.status(200).json({ message: 'Stock updated successfully', product });
//   } catch (error) {
//     console.error('Error updating stock:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };






import Product from "../models/product.model.js";

export const updateStock = async (req, res) => {
  const { id } = req.params; // Product ID
  const { size, quantity } = req.body; // Expecting size and quantity in the request body

  console.log('Request body:', req.body); // Log the incoming payload

  // Convert size and quantity to numbers
  const sizeAsNumber = parseFloat(size); // Use parseFloat for decimal sizes
  const quantityAsNumber = parseInt(quantity, 10); // Ensure quantity is an integer

  // Validate the inputs
  if (isNaN(sizeAsNumber) || sizeAsNumber <= 0) {
    return res.status(400).json({ message: 'Size must be a valid number' });
  }
  if (isNaN(quantityAsNumber) || quantityAsNumber <= 0) {
    return res.status(400).json({ message: 'Quantity must be a valid number' });
  }

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product found:', product);

    // Find the size entry to update
    const sizeEntry = product.sizes.find(s => s.size === sizeAsNumber);
    if (!sizeEntry) {
      return res.status(404).json({ message: 'Size not found' });
    }

    console.log('Size entry found:', sizeEntry);

    // Ensure stock is sufficient
    if (sizeEntry.quantity < quantityAsNumber) {
      return res.status(400).json({ message: 'Insufficient stock for this size' });
    }

    // Decrease the quantity for the specified size
    sizeEntry.quantity -= quantityAsNumber;

    // Ensure stock does not go below zero (additional safety check)
    sizeEntry.quantity = Math.max(sizeEntry.quantity, 0);

    // Save the updated product
    await product.save();

    console.log('Stock updated successfully:', sizeEntry);

    res.status(200).json({
      message: 'Stock updated successfully',
      updatedSizeEntry: sizeEntry,
      product,
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const checkStock = async (req, res) => {
  const productId = req.params.productId;
  try {
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ availableStock: product.quantity}); // Assuming stock is a field in your product schema
  } catch (error) {
      console.error("Error checking stock:", error);
      res.status(500).json({ message: 'Server error' });
  }
}

