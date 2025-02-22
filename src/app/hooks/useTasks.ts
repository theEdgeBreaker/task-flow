"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types";

export function useTasks() {
  const queryClient = useQueryClient();

  // Fetch Tasks
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
  });

  // Add Task
  // const addMutation = useMutation({
  //   mutationFn: async (newTask: Task) => {
  //     console.log(newTask);

  //     const response = await fetch("/api/tasks", {
  //       method: "POST",
  //       body: JSON.stringify(newTask),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     return response.json();
  //   },
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  // });

  // Add Task
  const addMutation = useMutation({
    mutationFn: async (
      newTask: Omit<Task, "id" | "createdAt" | "updatedAt">
    ) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create task");
      }
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Edit Task
  const editMutation = useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      priority,
      dueDate,
      projectId,
    }: {
      id: number;
      title: string;
      description: string;
      priority: number;
      dueDate?: string;
      projectId?: number;
    }) => {
      await fetch(`/api/tasks/${id}`, {
        method: "POST",
        body: JSON.stringify({
          id,
          title,
          description,
          priority,
          dueDate,
          projectId,
        }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Update Task
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ id, completed }),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Delete Task
  // const deleteMutation = useMutation({
  //   mutationFn: async (id: number) => {
  //     console.log("Delete", id);

  //     const response = await fetch(`/api/tasks/${id}`, {
  //       body: JSON.stringify({ id }),
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     console.log(response);

  //     return await response.json();
  //   },
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  // });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log("Delete", id);

      const response = await fetch(`/api/tasks/${id}`, {
        // ✅ Send id in URL
        body: JSON.stringify({ id }),
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      return await response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    data: tasks,
    isLoading,
    addMutation,
    editMutation,
    updateMutation,
    deleteMutation,
  };
}
