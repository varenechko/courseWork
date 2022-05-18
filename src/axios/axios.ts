import axios from "axios";

const token = localStorage.getItem("jwt") || "";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
