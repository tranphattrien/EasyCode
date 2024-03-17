import axios from "axios";

export const uploadImage = (img) => {
  const formData = new FormData();
  formData.append("image", img);

  return axios
    .post(import.meta.env.VITE_SERVER_DOMAIN + "/upload", formData)
    .then((response) => {
      return response.data.imageUrl;
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      throw error;
    });
};
