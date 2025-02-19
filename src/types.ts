export interface Task {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
}
