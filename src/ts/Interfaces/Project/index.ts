export interface Project {
  _id: string;
  userId: string;
  name: string;
  description: string;
  role: string;
  members: [];
  isActive: boolean;
  createdAt: string;
  projectId: string;
}
