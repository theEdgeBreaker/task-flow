// // app/dashboard/page.tsx

"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Progress } from "@/app/components/ui/Progress";
import { Calendar } from "@/app/components/ui/Calendar";
import { format, parseISO, isBefore } from "date-fns";

interface TaskType {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  dueDate?: string;
  projectId?: number;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // console.log("selected Date", selectedDate);
  console.log("ADitya search term", searchTerm);

  // ✅ Fetch all tasks
  const { data: tasks = [] } = useQuery<TaskType[]>({
    queryKey: ["tasks"],
    queryFn: async () => (await axios.get("/api/tasks")).data,
  });

  // 🎯 Compute stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  // 🔎 Filter tasks based on search and date

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  // console.log("Sanjana Filter tasks", filteredTasks);
  // console.log("Sanjana SearchTerm", searchTerm);

  const upcomingTasks = tasks
    .filter(
      (task) => task.dueDate && isBefore(new Date(), parseISO(task.dueDate))
    )
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    );

  // console.log("Sanjana Upcomming task", upcomingTasks, tasks);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">📋 Dashboard</h1>

      {/* 🔢 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-medium">Total Tasks</h2>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-medium">Completed Tasks ✅</h2>
            <p className="text-2xl font-bold">{completedTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-medium">Pending Tasks ⏳</h2>
            <p className="text-2xl font-bold">{pendingTasks}</p>
          </CardContent>
        </Card>
      </div>

      {/* 📊 Progress Bar */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Task Completion Progress</h3>
        <Progress value={completionRate} />
        <p className="text-sm">{completionRate.toFixed(0)}% Completed</p>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log("Selena----------------------------------");
          }}
          className="w-full"
        />
        {/* <h1>Selena</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
      </div>

      {/* 🗓️ Calendar Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">🗓️ Calendar View</h3>
            <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          </CardContent>
        </Card>

        {/* 🚀 Upcoming Deadlines */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-medium">📅 Upcoming Deadlines</h3>
            {upcomingTasks.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming deadlines.</p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-2 hover:bg-gray-100"
                >
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600">
                    Due:{" "}
                    {task.dueDate
                      ? format(parseISO(task.dueDate), "dd MMM yyyy")
                      : "N/A"}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* 📝 Filtered Tasks Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">🔎 Filtered Tasks</h3>
        {searchTerm !== "" &&
          filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg">{task.title}</h4>
                <p className="text-gray-600 text-sm mb-1">{task.description}</p>
                <p className="text-sm">
                  Priority:{" "}
                  <span className="font-semibold">{task.priority}</span> |
                  Status: {task.completed ? "✅ Completed" : "⏳ Pending"}
                </p>
                {task.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due: {format(parseISO(task.dueDate), "dd MMM yyyy")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
