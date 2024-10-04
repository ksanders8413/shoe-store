
import User from "../models/user.model.js"; // Import the User model

// Example for accountSettings controller function
export const accountSettings = async (req, res) => {
  try {
    // Assuming `req.user.id` holds the ID of the authenticated user
    const userId = req.user.id;
    const { username, email } = req.body; // Expecting updated settings from the client

    // Validate the incoming data (optional but recommended)

    // Perform the update in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Account settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Import necessary models (assuming you have a User model)

// Controller for updating shipping settings
export const shippingSettings = async (req, res) => {
  try {
    // Get the authenticated user's ID (assuming req.user.id is populated by your auth middleware)
    const userId = req.user.id;

    // Get the new shipping settings from the request body
    const { address, city, postalCode } = req.body;

    // Validate input - ensure all required fields are provided
    if (!address || !city || !postalCode) {
      return res
        .status(400)
        .json({
          message:
            "Please provide all shipping details (address, city, postal code).",
        });
    }

    // Find the user by ID and update their shipping settings
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        shippingSettings: { address, city, postalCode }, // Update the shippingSettings field in the user document
      },
      { new: true } // This returns the updated user document after the update
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send back the updated shipping settings
    res.json({
      message: "Shipping settings updated successfully.",
      shippingSettings: updatedUser.shippingSettings,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Could not update shipping settings." });
  }
};

// Import necessary models (assuming you have a User model)

// Controller for updating notification settings
export const notificationSettings = async (req, res) => {
  try {
    // Get the authenticated user's ID (assuming req.user.id is populated by your auth middleware)
    const userId = req.user.id;

    // Get the new notification settings from the request body
    const { orderUpdates, promotions } = req.body;

    // Validate input - check if the notification settings are provided as boolean values
    if (typeof orderUpdates !== "boolean" || typeof promotions !== "boolean") {
      return res
        .status(400)
        .json({
          message:
            "Invalid notification settings. Please provide valid boolean values for order updates and promotions.",
        });
    }

    // Find the user by ID and update their notification settings
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        notificationSettings: { orderUpdates, promotions }, // Update the notificationSettings field in the user document
      },
      { new: true } // This returns the updated user document after the update
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send back the updated notification settings
    res.json({
      message: "Notification settings updated successfully.",
      notificationSettings: updatedUser.notificationSettings,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Server error. Could not update notification settings.",
      });
  }
};
