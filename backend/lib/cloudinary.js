



import { v2 as cloudinary } from "cloudinary";
import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'shoeImages', // Adjust to your desired folder in Cloudinary
//     allowed_formats: ['jpg', 'png'],
//   },
// });

export const cloudinaryUpload = multer({ storage });
export { cloudinary };