import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadFile = async (file: File) => {
  const bytes = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "pan-applications" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result!.secure_url);
      }
    ).end(bytes);
  });
};

export default cloudinary;
