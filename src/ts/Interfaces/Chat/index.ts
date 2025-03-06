export interface ChatInterface {
  _id: string;
  userId: string;
  message: string;
  response: string;
  date: string;
  time: string;
  modelType: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
