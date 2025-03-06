/* eslint-disable no-useless-catch */
import useAuthStore from "../../store/authStore";
import type { AdminLogin } from "../../ts/Interfaces/Admin/auth";
import axiosInstance from "../axiosInstance";
import axios from "axios";
const setAuthData = useAuthStore.getState().setAuthData;

export async function AdminLogin(bodyData: AdminLogin) {
  try {
    const res = await axios.post(
      `https://devcollab-ai.onrender.com/api/v1/admin/auth/login`,
      bodyData
    );
    document.cookie = `token=${res?.data?.token}; path=/;`;
    document.cookie = `role=${res?.data?.role}; path=/;`;

    setAuthData(res?.data);
    return res.data;
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
