"use client";

// import { Task } from "@/types";
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
            if (title.trim() === "") return;
            addMutation.mutate({
              // id: Date.now(),
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
        {tasks?.map((task) => (
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
                className=" mr-2 text-yellow-500"
                onClick={() => {
                  console.log("Selena", task.id, task.title);

                  editMutation.mutate({
                    id: task.id,
                    title: task.title,
                    description: "Sanjana",
                  });
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
    </Layout>
  );
}
