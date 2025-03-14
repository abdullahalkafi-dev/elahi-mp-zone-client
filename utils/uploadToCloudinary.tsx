
import axios from "axios";

export const uploadToCloudinary = async (
  file: File,
  resourceType: "image" | "video"
): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("resource_type", resourceType);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || "Upload failed");
  }
};
