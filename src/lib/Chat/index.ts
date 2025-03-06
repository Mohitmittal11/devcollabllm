/* eslint-disable no-useless-catch */
import axiosInstance from "../axiosInstance";

export async function ChatList(data: { role?: string; projectId?: string }) {
  try {
    const res = await axiosInstance.get(
      `/user/llm/list?role=${data.role}&projectId=${data.projectId}`
    );
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
