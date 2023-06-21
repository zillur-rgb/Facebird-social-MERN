import { apiRequest } from "./apihelper";

export const upload = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiRequest.post("/upload", formData);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
