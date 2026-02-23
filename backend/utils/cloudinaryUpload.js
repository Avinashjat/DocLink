import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";


const uploadImageToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });

export default uploadImageToCloudinary;