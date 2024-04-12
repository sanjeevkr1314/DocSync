import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    //delete the file from cloudinary
    const response = await cloudinary.uploader.destroy(publicId);
    // file has been deleted successfully
    // console.log("file is deleted from cloudinary ", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      upload_preset: "file_management_app_preset",
      resource_type: "auto"
    });
    // file has been uploaded successfully
    // console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return error;
  }
};