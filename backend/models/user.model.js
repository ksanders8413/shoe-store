import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 0, // Keep if quantity is always 1 by default
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // Ensure this field is always populated
        },
        size: {
          // Renamed from sizes to size for clarity
          type: Number,
          required: true, // Ensure this field is always populated
        },
      },
    ],

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	} 
  
});



userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
