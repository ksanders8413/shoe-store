// // import { v2 as cloudinary } from "cloudinary";
// // import dotenv from "dotenv";
// // import { CloudinaryStorage } from "multer-storage-cloudinary"; // Use this for proper import
// // import multer from "multer";

// // dotenv.config();

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // const storage = new CloudinaryStorage({
// //   cloudinary, // Use the correct version (v2)
// //   params: {
// //     folder: "test", // Folder to store uploaded images
// //     allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
// //   },
// // });

// // // Initialize multer with Cloudinary storage
// // const upload = multer({ storage });

// // export default upload;






// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import { CloudinaryStorage } from "multer-storage-cloudinary"; 
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from 'url';

// dotenv.config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Local storage configuration
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const localImagesDir = path.join(__dirname, '../shoeImages'); // Local images directory

// const localStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, localImagesDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Multer setups
// const localUpload = multer({ storage: localStorage });
// const cloudinaryUpload = multer({ storage: new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "test", // Cloudinary folder
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// }) });

// export { localUpload, cloudinaryUpload, cloudinary };




import { v2 as cloudinary } from "cloudinary";
// import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shoeImages', // Adjust to your desired folder in Cloudinary
    allowed_formats: ['jpg', 'png'],
  },
});

export const cloudinaryUpload = multer({ storage });
export { cloudinary };