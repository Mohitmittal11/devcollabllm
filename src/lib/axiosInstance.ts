/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { type AxiosRequestConfig, type AxiosError } from "axios";

export interface ErrorResponse {
  message: string;
  [key: string]: unknown;
}

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "message" in error;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://devcollab-ai.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    deviceType: "web",
  },
});

// Request interceptor to attach token and language to every request
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    if (config.headers) {
      const cookies = document.cookie.split("; ");
      const token = cookies
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const role = cookies
        .find((row) => row.startsWith("role="))
        ?.split("=")[1];

      if (token) {
        config.headers["Authorization"] = `${token}`;
        config.headers["role"] = `${role}`;
      }
    }
    if (config.data) {
      const cookies = document.cookie.split("; ");
      const role = cookies
        .find((row) => row.startsWith("role="))
        ?.split("=")[1];
      config.data["role"] = `${role}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
