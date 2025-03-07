/* eslint-disable no-useless-catch */
import axios from "axios";
import useAuthStore from "../../store/authStore";
import type { AdminLogin } from "../../ts/Interfaces/Admin/auth";
import axiosInstance from "../axiosInstance";
const setAuthData = useAuthStore.getState().setAuthData;

export async function AdminLogin(bodyData: AdminLogin) {
  try {
    const res = await axios.post(
      "https://devcollab-ai.onrender.com/api/v1/admin/auth/login",
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

// export async function AdminLogin(bodyData: AdminLogin) {
//   try {
//     const res = await fetch(
//       "https://devcollab-ai.onrender.com/api/v1/admin/auth/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           deviceType: "web",
//         },
//         body: JSON.stringify(bodyData),
//       }
//     );

//     console.log("res", res.body);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     document.cookie = `token=${data?.token}; path=/;`;
//     document.cookie = `role=${data?.role}; path=/;`;
//     setAuthData(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

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

export async function AdminLogout() {
  try {
    const res = await axiosInstance.get("/admin/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function Details() {
  try {
    const res = await axiosInstance.get("/admin/auth/details");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function UpdateProfile(data: { name: string }) {
  try {
    const res = await axiosInstance.patch(`admin/auth/update-profile`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
