import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ecommerce-products" },
      (error, result) => {
        if (error) {
          console.log("🔥 CLOUDINARY ERROR:", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};