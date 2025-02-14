import axios from "axios";

export const axis = axios.create({
  baseURL: "https://strapi-store-server.onrender.com/api",
});
