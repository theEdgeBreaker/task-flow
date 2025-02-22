import { create } from "zustand";
import { Task } from "../../types";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  editTask: (
    id: number,
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    projectId?: number
  ) => void;
  updateTask: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => {
    console.log("Setting tasks:", tasks);
    set({ tasks });
  },
  // Add Task functionality
  addTask: (task) => {
    console.log("Adding task:", task);
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  // Update Task unctionality
  updateTask: (id, completed) => {
    console.log("Updating task:", id, completed);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      ),
    }));
  },
  // Delete Task functionality
  deleteTask: (id) => {
    console.log("Deleting task:", id);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  // Edit Task functionality
  editTask: (id, title, description, priority, dueDate, projectId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              priority,
              dueDate: dueDate || task.dueDate,
              projectId: projectId !== undefined ? projectId : task.projectId,
            }
          : task
      ),
    }));
  },
}));
