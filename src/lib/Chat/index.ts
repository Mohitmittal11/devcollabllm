/* eslint-disable no-useless-catch */
import axiosInstance from "../axiosInstance";

export async function ChatList(data: {
  id?: string;
  role?: string;
  search?: string;
}) {
  try {
    let url = `/user/llm/list?role=${data.role}&projectId=${data?.id}`;
    if (data.search) {
      url = `/user/llm/list?role=${data.role}&projectId=${data?.id}&search=${data.search}`;
    }
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function Chat(chatBodyData: {
  query: string;
  modelType: string;
  role?: string;
}) {
  try {
    const res = await axiosInstance.post(`/user/llm/llm-chat`, chatBodyData);
    return res.data;
  } catch (error) {
    throw error;
  }
}
