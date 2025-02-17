import { create } from "zustand";
import { Task } from "../../types";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  editTask: (id: number, title: string, description: string) => void;
  updateTask: (id: number, completed: boolean) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => {
    console.log("Setting tasks:", tasks);
    set({ tasks });
  },
  addTask: (task) => {
    console.log("Adding task:", task);
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  updateTask: (id, completed) => {
    console.log("Updating task:", id, completed);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      ),
    }));
  },
  deleteTask: (id) => {
    console.log("Deleting task:", id);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  editTask: (id, title, description) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      ),
    }));
  },
}));
