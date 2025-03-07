/* eslint-disable no-useless-catch */
import axiosInstance from "../../axiosInstance";

export async function addUser(bodyData: { name: string; email: string }) {
  try {
    const res = await axiosInstance.post("/admin/user/registor", bodyData);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function ListUser() {
  try {
    const res = await axiosInstance.get(`/admin/user/list`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function userDetails(id: string) {
  try {
    const res = await axiosInstance.get(`/admin/user/detail/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function editUser(
  id: string,
  value: { name: string; email: string }
) {
  try {
    const res = await axiosInstance.patch(`/admin/user/update/${id}`, value);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await axiosInstance.get(`/admin/user/delete-user/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
