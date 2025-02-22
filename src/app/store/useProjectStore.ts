import { create } from "zustand";
import { Project } from "../../types";

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects) => {
    console.log("Setting projects:", projects);
    set({ projects });
  },
  // Add Project functionality
  addProject: (project) => {
    console.log("Adding project:", project);
    set((state) => ({ projects: [...state.projects, project] }));
  },
  // Delete Project functionality
  deleteProject: (id) => {
    console.log("Deleting project:", id);
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
  },
}));
