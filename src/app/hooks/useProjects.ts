// In hooks/useProjects.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@/types";

export function useProjects() {
  const queryClient = useQueryClient();

  // Fetch Projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  // Add Project
  const addMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, "id" | "createdAt">) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(newProject),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  // Delete Project
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return {
    data: projects,
    isLoading,
    addMutation,
    deleteMutation,
  };
}
