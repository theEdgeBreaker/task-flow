"use client";

import { useState } from "react";
import Layout from "@/app/components/shared/Layout";
import { useTasks } from "../../hooks/useTasks";

export default function Tasks() {
  const {
    data: tasks,
    isLoading,
    addMutation,
    editMutation,
    updateMutation,
    deleteMutation,
  } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2); // Default: Medium priority

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    description: string;
    priority: number;
  } | null>(null);

  if (isLoading) return <p>Loading tasks...</p>;

  // Helper function to get priority color
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-100 text-red-800"; // High
      case 2:
        return "bg-yellow-100 text-yellow-800"; // Medium
      case 3:
        return "bg-green-100 text-green-800"; // Low
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get priority label
  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Medium";
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p>Manage your tasks efficiently!</p>

      {/* Task Adding Form*/}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />

        {/* Priority Selector */}
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        <button
          className="mt-4 p-2 bg-blue-600 text-white rounded"
          onClick={() => {
            if (title.trim() === "") return;
            addMutation.mutate({
              id: Math.floor(1000 * Math.random()),
              title,
              description,
              completed: false,
              priority, // Add priority here
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            setTitle("");
            setDescription("");
            setPriority(2); // Reset to medium
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="mt-4 space-y-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                } flex-1`}
              >
                {task.title} - {task.description}
              </span>

              {/* Priority Badge */}
              <span
                className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
            </div>

            <div>
              <button
                className="mr-2 text-yellow-500"
                onClick={() => {
                  setEditingTask({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                  });
                  setIsEditing(true);
                }}
              >
                ✏️
              </button>
              <button
                className="mr-2 text-green-500"
                onClick={() =>
                  updateMutation.mutate({
                    id: task.id,
                    completed: !task.completed,
                  })
                }
              >
                ✅
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteMutation.mutate(task.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {isEditing && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  title: e.target.value,
                })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
              className="border p-2 rounded w-full mb-2"
            />

            {/* Priority Selector in Edit Modal */}
            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  priority: Number(e.target.value),
                })
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="p-2 bg-gray-500 text-white rounded"
                onClick={() => {
                  setIsEditing(false);
                  setEditingTask(null);
                }}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-600 text-white rounded"
                onClick={() => {
                  if (editingTask.title.trim() === "") return;

                  editMutation.mutate({
                    id: editingTask.id,
                    title: editingTask.title,
                    description: editingTask.description,
                    priority: editingTask.priority,
                  });

                  setIsEditing(false);
                  setEditingTask(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
