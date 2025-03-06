import { create } from 'zustand';
import { Project } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  setCurrentProject: (projectId: string) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a scalable e-commerce solution with React and Node.js',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-05-20T14:45:00Z',
    members: ['1', '2'],
  },
  {
    id: '2',
    name: 'CRM System',
    description: 'Customer relationship management system with analytics dashboard',
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-06-05T11:20:00Z',
    members: ['1'],
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with React Native',
    createdAt: '2023-04-22T13:45:00Z',
    updatedAt: '2023-06-18T16:30:00Z',
    members: ['2'],
  },
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  fetchProjects: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ projects: mockProjects });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentProject: (projectId: string) => {
    const project = get().projects.find(p => p.id === projectId) || null;
    set({ currentProject: project });
  },

  createProject: async (project) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        projects: [...state.projects, newProject],
      }));
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (projectId: string, updates: Partial<Project>) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        projects: state.projects.map(project => 
          project.id === projectId 
            ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
            : project
        ),
        currentProject: state.currentProject?.id === projectId 
          ? { ...state.currentProject, ...updates, updatedAt: new Date().toISOString() } 
          : state.currentProject,
      }));
    } catch (error) {
      console.error('Failed to update project:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));