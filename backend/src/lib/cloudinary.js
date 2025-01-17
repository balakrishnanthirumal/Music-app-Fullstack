import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUNARY_CLOUD_NAME,
  api_key: process.env.CLOUNARY_API_KEY,
  api_secret: process.env.CLOUNARY_API_SECRET,
});

export default cloudinary;
