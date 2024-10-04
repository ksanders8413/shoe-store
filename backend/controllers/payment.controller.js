import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { newOrderEmail, sendOrderConfirmationEmail } from "../mailtrap/emails.js";
import moment from "moment-timezone";


// Create Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode, ...shippingDetails } = req.body;

    // Validate shipping address
    if (
      !shippingDetails.name ||
      !shippingDetails.street ||
      !shippingDetails.city ||
      !shippingDetails.state ||
      !shippingDetails.zip ||
      !shippingDetails.country
    ) {
      return res
        .status(400)
        .json({ error: "All shipping address fields are required" });
    }

    // Validate product list
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }
let totalAmount = 0;

    const lineItems = await Promise.all(
      products.map(async (product) => {
    
        const productDetails = await Product.findById(product.product); // Use product.product
        if (!productDetails) {
          throw new Error(`Product with ID ${product.product} not found`);
        }
    
        const amount = Math.round(productDetails.price * 100); // Convert price to cents
        const quantity = product.quantity || 1;
    
     
        totalAmount += amount * quantity;
    
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: productDetails.name,
              images: [productDetails.images[0]], // Assuming you want the first image
            },
            unit_amount: amount,
          },
          quantity: quantity,
        };
      })
    );

    // Check and apply coupon if provided
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        const discountAmount = Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
        totalAmount -= discountAmount;
      }
    }

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        email: req.user.email,
        couponCode: couponCode || "",
        // Convert shipping details to a string
        shipping: JSON.stringify({
          name: shippingDetails.name,
          address: {
            street: shippingDetails.street,
            city: shippingDetails.city,
            state: shippingDetails.state,
            zip: shippingDetails.zip,
            country: shippingDetails.country,
          },
        }),
        products: JSON.stringify(
          products.map((p) => ({
            id: p.product, // Use p.product instead of p.id
            quantity: p.quantity || 1,
            size: p.size,
          }))
        ),
      },
    });
    

    // Respond with session ID and total amount
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error.message);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};





// export const checkoutSuccess = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === "paid") {
//       // Extract products and shipping address from session metadata
//       const products = JSON.parse(session.metadata.products);
//       const shippingAddress = JSON.parse(session.metadata.shipping);

//       console.log("Products:", products); // Check if size is included
//       console.log("Shipping Address:", shippingAddress);

//       // Create a new order including size
//       const newOrder = new Order({
//         userId: session.metadata.userId,
//         email: session.metadata.email,
//         products: products.map((product) => ({
//           product: product.id,
//           quantity: product.quantity,
//           price: product.price || fetchProductPrice(product.id),
//           size: product.size,  // Ensure the size is being passed here
//         })),
//         totalAmount: session.amount_total / 100,
//         stripeSessionId: sessionId,
//         shippingAddress: {
//           name: shippingAddress.name,
//           street: shippingAddress.address.street,
//           city: shippingAddress.address.city,
//           state: shippingAddress.address.state,
//           zip: shippingAddress.address.zip,
//           country: shippingAddress.address.country,
//         },
//         createdAt: moment().tz("America/Chicago").format(),
//       });

//       console.log("New Order:", newOrder);

//       await newOrder.save();

//       // Send confirmation email
//       sendOrderConfirmationEmail(session.metadata.email, newOrder);

//       res.status(200).json({
//         success: true,
//         message: "Order created successfully.",
//         orderId: newOrder._id,
//         order: { ...newOrder._doc },
//       });
//     } else {
//       res.status(400).json({ message: "Payment not completed" });
//     }
//   } catch (error) {
//     console.error("Error processing checkout:", error.message);
//     res.status(500).json({
//       message: "Error processing checkout",
//       error: error.message,
//     });
//   }
// };






export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Extract products and shipping address from session metadata
      const products = JSON.parse(session.metadata.products);
      const shippingAddress = JSON.parse(session.metadata.shipping);

      console.log("Products:", products); // Check if size is included
      console.log("Shipping Address:", shippingAddress);

      // Fetch prices for each product from the database
      const productsWithPrices = await Promise.all(
        products.map(async (product) => {
          const productDetails = await Product.findById(product.id);
          if (!productDetails) {
            throw new Error(`Product with ID ${product.id} not found`);
          }

          return {
            product: product.id,
            quantity: product.quantity,
            price: product.price || productDetails.price, // Use the price from the database if not provided
            size: product.size,  // Ensure the size is being passed here
          };
        })
      );

      // Create a new order
      const newOrder = new Order({
        userId: session.metadata.userId,
        email: session.metadata.email,
        products: productsWithPrices, // Use the array of products with prices
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
        shippingAddress: {
          name: shippingAddress.name,
          street: shippingAddress.address.street,
          city: shippingAddress.address.city,
          state: shippingAddress.address.state,
          zip: shippingAddress.address.zip,
          country: shippingAddress.address.country,
        },
        createdAt: moment().tz("America/Chicago").format(),
      });

      console.log("New Order:", newOrder);

      await newOrder.save();

      // Send confirmation email
      sendOrderConfirmationEmail(session.metadata.email, newOrder);
      newOrderEmail(newOrder);

      res.status(200).json({
        success: true,
        message: "Order created successfully.",
        orderId: newOrder._id,
        order: { ...newOrder._doc },
      });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error processing checkout:", error.message);
    res.status(500).json({
      message: "Error processing checkout",
      error: error.message,
    });
  }
};


async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}
