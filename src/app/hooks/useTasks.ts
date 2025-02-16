"use client";

// src/hooks/useTasks.ts
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
  const addMutation = useMutation({
    mutationFn: async (newTask: Task) => {
      console.log(newTask);

      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
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
        body: JSON.stringify({ completed }),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Delete Task
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log("Aditya", id);

      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        // body: JSON.stringify({ id }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    data: tasks,
    isLoading,
    addMutation,
    updateMutation,
    deleteMutation,
  };
}
