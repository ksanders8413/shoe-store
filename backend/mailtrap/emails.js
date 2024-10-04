import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";
import Order from "../models/order.model.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "50a4ce1c-b300-4667-a752-412d7de47da2",
      template_variables: {
        company_info_name: "Fuego Kickz",
        name: name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset successful email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset successful email", error);

    throw new Error(`Error sending password reset successful email: ${error}`);
  }
};

export const sendOrderConfirmationEmail = async (recipientEmail, orderId) => {
  try {
    const recipient = [{ email: recipientEmail }];

    // Fetch order details using the orderId
    const orderDetails = await Order.findById(orderId).populate(
      "products.product"
    ); // Adjust this as needed based on your schema

    if (!orderDetails) {
      throw new Error("Order not found");
    }

    const {
      _id,
      totalAmount,
      products,
      createdAt,
      customerName,
      shippingAddress,
      estimatedArrival,
    } = orderDetails;

    // If any of the values are not provided, define fallback values
    const formattedCustomerName = customerName || "Customer";
    const formattedShippingAddress = shippingAddress || {
      name: "N/A",
      street: "N/A",
      city: "N/A",
      state: "N/A",
      zip: "N/A",
      country: "N/A",
    };
    const formattedArrivalDate = estimatedArrival || "N/A";
    const orderDate = createdAt ? createdAt.toDateString() : "N/A";
    const subtotal = totalAmount; // Assuming totalAmount is the subtotal for simplicity
    const shippingCost = 15; // Update as per your logic
    const tax = subtotal * 0.055; // Assuming a tax rate of 5.5%

    // Create a more readable HTML structure for the order details
    const orderDetailsHtml = `
    <img src="fuegokickzcoverphoto.png" alt="Fuego Kickz" width="200" height="200">
      <h1>Thanks for your order, ${formattedCustomerName}! We’re on it.</h1>
      <p>Your order's in and we’re working to get it packed up and out the door. If we send your order in more than one shipment, we'll email a confirmation for each.</p>
      <p>If you have a question about something else related to your order, please visit our <a href="https://fuegokickz.com/help">Help Center</a>.</p>

      <h2>Shipping Address</h2>
      <p>${formattedShippingAddress.name}<br/>
      ${formattedShippingAddress.street}<br/>
      ${formattedShippingAddress.city}, ${formattedShippingAddress.state} ${
      formattedShippingAddress.zip
    }<br/>
      ${formattedShippingAddress.country}</p>

      <h3>Estimated Arrival: ${formattedArrivalDate}</h3>

      <h2>Order Details</h2>
      
      ${products
        .map(
          (item) => `
        <div>
          <h4>${item.product.name}</h4>
          <p>${item.product.description}</p>
          <p>Size: ${item.size}</p>
          <p>Price: $${item.product.price.toFixed(2)}</p>
        </div>
      `
        )
        .join("")}

      <h3>Order Number: ${_id || "N/A"}</h3>
      <h3>Order Date: ${orderDate}</h3>

      <h2>Payment Summary</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="border-bottom: 1px solid #ddd;">Subtotal</td>
          <td style="border-bottom: 1px solid #ddd;">$${subtotal.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td style="border-bottom: 1px solid #ddd;">Shipping & Handling</td>
          <td style="border-bottom: 1px solid #ddd;">$${shippingCost.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td style="border-bottom: 1px solid #ddd;">Estimated Tax*</td>
          <td style="border-bottom: 1px solid #ddd;">$${tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Total</td>
          <td style="font-weight: bold;">$${(
            subtotal +
            shippingCost +
            tax
          ).toFixed(2)}</td>
        </tr>
      </table>
      <p>*Exact taxes will be calculated at the time of shipping. Use the <a href="https://yourstore.com/order-details/${_id}">Order Details</a> button to see the final amount.</p>

      <footer>
        <p>fuegokickz.com</p>
        <p>© 2024 Fuego Kickz, Inc. All Rights Reserved</p>
        <p>3019 Edgewater Dr, Orlando, Florida, 32804</p>
        <p><a href="https://fuegokickz.com/privacy">Privacy Policy</a> | <a href="https://fuegokickz.com/help">Get Help</a></p>
      </footer>
    `;

    // Send the email
    const response = await mailtrapClient.send({
      from: sender, // Sender from mailtrap.config.js
      to: recipient, // Recipient in array format
      subject: "Order Confirmation", // Subject line
      html: orderDetailsHtml, // Structured HTML email with order details
      category: "Order Confirmation",
    });

    console.log("Order confirmation email sent successfully", response);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw new Error(`Error sending order confirmation email: ${error}`);
  }
};

export const newOrderEmail = async (order) => {
  const recipient = [{ email: "ksanders8413@yahoo.com" }];
try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient, // Replaced with my email address
      subject: "New Order Notification",
      text: `New order received!\n\nOrder ID: ${order._id}\nEmail: ${
        order.email
      }\nTotal Amount: ${order.totalAmount}\nProducts: ${JSON.stringify(
        order.products
      )}`,
    });
    console.log("Email sent successfully.");
} catch (error) {
    console.error("Error sending email:", error);
}
};
