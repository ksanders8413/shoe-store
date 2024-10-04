// import Order from './models/orderModel'; // Assuming you have an Order model

// const orderDetails = async (orderId) => {
//   try {
//     // Fetch order by ID from the database
//     const order = await Order.findById(orderId).populate('products.product'); // Assuming you populate product details

//     if (!order) {
//       throw new Error('Order not found');
//     }

//     // Format order details into the structure needed for email
//     const orderDetails = {
//       _id: order._id, // Order ID
//       customerName: order.customerName || order.user.name || 'Customer', // Assuming you have customer/user details
//       email: order.user.email, // Assuming you store user emails
//       totalAmount: order.totalAmount,
//       subtotal: order.subtotal,
//       shippingCost: order.shippingCost,
//       tax: order.tax,
//       createdAt: order.createdAt, // Order creation date
//       estimatedArrival: calculateEstimatedArrival(order.createdAt), // A function that calculates delivery date
//       shippingAddress: {
//         name: order.shippingAddress.name,
//         street: order.shippingAddress.street,
//         city: order.shippingAddress.city,
//         state: order.shippingAddress.state,
//         zip: order.shippingAddress.zip,
//         country: order.shippingAddress.country,
//       },
//       products: order.products.map((item) => ({
//         product: {
//           name: item.product.name,
//           description: item.product.description,
//         },
//         size: item.size, // If you have a size field
//         price: item.price,
//       })),
//     };

//     return orderDetails;
//   } catch (error) {
//     console.error('Error fetching order details:', error);
//     throw error;
//   }
// };

// export default orderDetails;
