import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://music-app-backend-4.onrender.com/api",
});
