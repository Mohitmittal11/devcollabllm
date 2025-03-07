/* eslint-disable no-useless-catch */
import useAuthStore from "../../store/authStore";
import type { AdminLogin } from "../../ts/Interfaces/Admin/auth";
import axiosInstance from "../axiosInstance";
const setAuthData = useAuthStore.getState().setAuthData;

export async function AdminLogin(bodyData: AdminLogin) {
  try {
    const res = await fetch(
      "https://devcollab-ai.onrender.com/api/v1/admin/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          deviceType: "web",
        },
        body: JSON.stringify(bodyData),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    document.cookie = `token=${data?.token}; path=/;`;
    document.cookie = `role=${data?.role}; path=/;`;
    setAuthData(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function ChangePassword(bodyData: {
  newPassword: string;
  password: string;
}) {
  try {
    const res = await axiosInstance.patch(
      `/admin/auth/change-password`,
      bodyData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
