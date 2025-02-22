export interface Task {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
  priority: number;
  dueDate?: string;
  projectId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: number;
  name: string;
  color: string;
  createdAt: string;
}
