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

  // Add these states for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  if (isLoading) return <p>Loading tasks...</p>;

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
        <button
          className="mt-4 p-2 bg-blue-600 text-white rounded"
          onClick={() => {
            if (title.trim() === "" && description.trim() === "") return;
            addMutation.mutate({
              id: Math.floor(1000 * Math.random()),
              title,
              description,
              completed: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            setTitle(""); // Clearing Input
            setDescription("");
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span
              className={task.completed ? "line-through text-gray-500" : ""}
            >
              {task.title} - {task.description}
            </span>

            <div>
              <button
                className="mr-2 text-yellow-500"
                onClick={() => {
                  setEditingTask({
                    id: task.id,
                    title: task.title,
                    description: task.description,
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
                  // title - sanjana = editingTask ...editingTask , title
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
              className="border p-2 rounded w-full mb-4"
            />
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
