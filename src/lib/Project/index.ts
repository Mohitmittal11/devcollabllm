/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axiosInstance from "../axiosInstance";

export async function addProject(body: any) {
  try {
    const response = await axiosInstance.post("/admin/project/registor", body);
    return response.data;
  } catch (error) {
    console.log("Error is", error);
    throw error;
  }
}

export async function editProject() {
  try {
    const data = await axiosInstance.patch("/admin/project/update");
    console.log("Data is ", data);
  } catch (error) {
    console.log("Error is", error);
    throw error;
  }
}

export async function detailProject(id: string) {
  try {
    const response = await axiosInstance.get(`/admin/project/detail/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error is", error);
    throw error;
  }
}
export async function projectStatusChange() {
  try {
    const data = await axiosInstance.patch("/admin/project/status-project");
    console.log("Data is ", data);
  } catch (error) {
    console.log("Error is", error);
    throw error;
  }
}

export async function deleteProject() {
  try {
    const data = await axiosInstance.patch("/admin/project/delete-project");
    console.log("Data is ", data);
  } catch (error) {
    console.log("Error is", error);
    throw error;
  }
}
export async function projectList(data?: {
  search?: string;
  page?: number;
  perPage?: number;
}) {
  try {
    const res = await axiosInstance.get(
      `/admin/project/list?search=${data?.search}&page=${data?.page}&pageSize=${data?.perPage}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
