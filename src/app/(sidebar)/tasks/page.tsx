// "use client";

// import { useState } from "react";
// import Layout from "@/app/components/shared/Layout";
// import { useTasks } from "../../hooks/useTasks";

// export default function Tasks() {
//   const {
//     data: tasks,
//     isLoading,
//     addMutation,
//     editMutation,
//     updateMutation,
//     deleteMutation,
//   } = useTasks();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState(2); // Default: Medium priority

//   // Edit states
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTask, setEditingTask] = useState<{
//     id: number;
//     title: string;
//     description: string;
//     priority: number;
//   } | null>(null);

//   if (isLoading) return <p>Loading tasks...</p>;

//   // Helper function to get priority color
//   const getPriorityColor = (priority: number) => {
//     switch (priority) {
//       case 1:
//         return "bg-red-100 text-red-800"; // High
//       case 2:
//         return "bg-yellow-100 text-yellow-800"; // Medium
//       case 3:
//         return "bg-green-100 text-green-800"; // Low
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Helper function to get priority label
//   const getPriorityLabel = (priority: number) => {
//     switch (priority) {
//       case 1:
//         return "High";
//       case 2:
//         return "Medium";
//       case 3:
//         return "Low";
//       default:
//         return "Medium";
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">Tasks</h1>
//       <p>Manage your tasks efficiently!</p>

//       {/* Task Adding Form*/}
//       <div className="mt-4">
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded w-full mt-2"
//         />

//         {/* Priority Selector */}
//         <div className="mt-2">
//           <label className="block text-sm font-medium mb-1">Priority</label>
//           <select
//             value={priority}
//             onChange={(e) => setPriority(Number(e.target.value))}
//             className="border p-2 rounded w-full"
//           >
//             <option value={1}>High</option>
//             <option value={2}>Medium</option>
//             <option value={3}>Low</option>
//           </select>
//         </div>

//         <button
//           className="mt-4 p-2 bg-blue-600 text-white rounded"
//           onClick={() => {
//             if (title.trim() === "") return;
//             addMutation.mutate({
//               id: Math.floor(1000 * Math.random()),
//               title,
//               description,
//               completed: false,
//               priority, // Add priority here
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             });
//             setTitle("");
//             setDescription("");
//             setPriority(2); // Reset to medium
//           }}
//         >
//           Add Task
//         </button>
//       </div>

//       {/* Task List */}
//       <ul className="mt-4 space-y-2">
//         {tasks?.map((task) => (
//           <li
//             key={task.id}
//             className="flex items-center justify-between p-2 border rounded"
//           >
//             <div className="flex items-center gap-2">
//               <span
//                 className={`${
//                   task.completed ? "line-through text-gray-500" : ""
//                 } flex-1`}
//               >
//                 {task.title} - {task.description}
//               </span>

//               {/* Priority Badge */}
//               <span
//                 className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
//                   task.priority
//                 )}`}
//               >
//                 {getPriorityLabel(task.priority)}
//               </span>
//             </div>

//             <div>
//               <button
//                 className="mr-2 text-yellow-500"
//                 onClick={() => {
//                   setEditingTask({
//                     id: task.id,
//                     title: task.title,
//                     description: task.description,
//                     priority: task.priority,
//                   });
//                   setIsEditing(true);
//                 }}
//               >
//                 ✏️
//               </button>
//               <button
//                 className="mr-2 text-green-500"
//                 onClick={() =>
//                   updateMutation.mutate({
//                     id: task.id,
//                     completed: !task.completed,
//                   })
//                 }
//               >
//                 ✅
//               </button>
//               <button
//                 className="text-red-500"
//                 onClick={() => deleteMutation.mutate(task.id)}
//               >
//                 ❌
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Edit Modal */}
//       {isEditing && editingTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Edit Task</h2>
//             <input
//               type="text"
//               value={editingTask.title}
//               onChange={(e) =>
//                 setEditingTask({
//                   ...editingTask,
//                   title: e.target.value,
//                 })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               value={editingTask.description}
//               onChange={(e) =>
//                 setEditingTask({
//                   ...editingTask,
//                   description: e.target.value,
//                 })
//               }
//               className="border p-2 rounded w-full mb-2"
//             />

//             {/* Priority Selector in Edit Modal */}
//             <select
//               value={editingTask.priority}
//               onChange={(e) =>
//                 setEditingTask({
//                   ...editingTask,
//                   priority: Number(e.target.value),
//                 })
//               }
//               className="border p-2 rounded w-full mb-4"
//             >
//               <option value={1}>High</option>
//               <option value={2}>Medium</option>
//               <option value={3}>Low</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 className="p-2 bg-gray-500 text-white rounded"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditingTask(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="p-2 bg-blue-600 text-white rounded"
//                 onClick={() => {
//                   if (editingTask.title.trim() === "") return;

//                   editMutation.mutate({
//                     id: editingTask.id,
//                     title: editingTask.title,
//                     description: editingTask.description,
//                     priority: editingTask.priority,
//                   });

//                   setIsEditing(false);
//                   setEditingTask(null);
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//**************************************************************************************************************//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import Layout from "@/app/components/shared/Layout";
import { useTasks } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";
import { format, isBefore, isToday } from "date-fns";

export default function Tasks() {
  const {
    data: tasks,
    isLoading: tasksLoading,
    addMutation,
    editMutation,
    updateMutation,
    deleteMutation,
  } = useTasks();

  const {
    data: projects,
    isLoading: projectsLoading,
    addMutation: addProjectMutation,
  } = useProjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2); // Default: Medium priority
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState<number | undefined>(undefined);
  const [newProjectName, setNewProjectName] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    description: string;
    priority: number;
    dueDate?: string;
    projectId?: number;
  } | null>(null);

  if (tasksLoading || projectsLoading) return <p>Loading...</p>;

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

  // Helper function to get due date status
  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null;

    const date = new Date(dueDate);
    const today = new Date();

    if (isToday(date)) {
      return { label: "Today", class: "bg-orange-100 text-orange-800" };
    } else if (isBefore(date, today)) {
      return { label: "Overdue", class: "bg-red-100 text-red-800" };
    } else if (isBefore(date, new Date(today.setDate(today.getDate() + 3)))) {
      return { label: "Upcoming", class: "bg-blue-100 text-blue-800" };
    } else {
      return { label: "Future", class: "bg-purple-100 text-purple-800" };
    }
  };

  // Find project by ID
  const getProjectById = (id?: number) => {
    if (!id) return null;
    return projects?.find((project) => project.id === id);
  };

  const handleAddProject = () => {
    if (newProjectName.trim() === "") return;

    addProjectMutation.mutate({
      name: newProjectName,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
    });

    setNewProjectName("");
    setShowProjectForm(false);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p>Manage your tasks efficiently!</p>

      {/* Project Management */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Projects</h2>
          <button
            className="text-sm text-blue-600"
            onClick={() => setShowProjectForm(!showProjectForm)}
          >
            {showProjectForm ? "Cancel" : "+ Add Project"}
          </button>
        </div>

        {showProjectForm && (
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="border p-2 rounded flex-grow"
            />
            <button
              className="ml-2 p-2 bg-blue-600 text-white rounded"
              onClick={handleAddProject}
            >
              Add
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {projects?.map((project) => (
            <span
              key={project.id}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: project.color, color: "#fff" }}
            >
              {project.name}
            </span>
          ))}
        </div>
      </div>

      {/* Task Adding Form*/}
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-lg font-medium mb-2">Add New Task</h2>
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

        {/* Due Date Selector */}
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Project Selector */}
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Project</label>
          <select
            value={projectId || ""}
            onChange={(e) =>
              setProjectId(e.target.value ? Number(e.target.value) : undefined)
            }
            className="border p-2 rounded w-full"
          >
            <option value="">No Project</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="mt-4 p-2 bg-blue-600 text-white rounded"
          onClick={() => {
            if (title.trim() === "") return;
            addMutation.mutate({
              // id: Math.floor(1000 * Math.random()),
              title,
              description,
              completed: false,
              priority,
              dueDate: dueDate || undefined,
              projectId: projectId,
              // createdAt: new Date().toISOString(),
              // updatedAt: new Date().toISOString(),
            });
            setTitle("");
            setDescription("");
            setPriority(2);
            setDueDate("");
            setProjectId(undefined);
          }}
        >
          Add Task
        </button>
      </div>

      {/* Project Filter */}
      <div className="mt-4 mb-2">
        <label className="block text-sm font-medium mb-1">
          Filter by Project
        </label>
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            // Implement filtering logic here
            console.log("Filter by project:", e.target.value);
          }}
        >
          <option value="">All Projects</option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      <ul className="mt-4 space-y-2">
        {tasks?.map((task) => {
          const project = getProjectById(task.projectId);
          const dueDateStatus = getDueDateStatus(task.dueDate);

          return (
            <li key={task.id} className="p-3 border rounded hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-500"
                          : "font-medium"
                      }`}
                    >
                      {task.title}
                    </span>

                    {/* Priority Badge */}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>

                    {/* Project Badge */}
                    {project && (
                      <span
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.name}
                      </span>
                    )}

                    {/* Due Date Badge */}
                    {dueDateStatus && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${dueDateStatus.class}`}
                      >
                        {dueDateStatus.label}:{" "}
                        {task.dueDate
                          ? format(new Date(task.dueDate), "MMM d")
                          : ""}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <button
                    className="mr-2 text-yellow-500"
                    onClick={() => {
                      setEditingTask({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        dueDate: task.dueDate,
                        projectId: task.projectId,
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
              </div>
            </li>
          );
        })}
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
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  priority: Number(e.target.value),
                })
              }
              className="border p-2 rounded w-full mb-2"
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>

            {/* Due Date Selector in Edit Modal */}
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={editingTask.dueDate || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  dueDate: e.target.value || undefined,
                })
              }
              className="border p-2 rounded w-full mb-2"
            />

            {/* Project Selector in Edit Modal */}
            <label className="block text-sm font-medium mb-1">Project</label>
            <select
              value={editingTask.projectId || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  projectId: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value="">No Project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
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
                    dueDate: editingTask.dueDate,
                    projectId: editingTask.projectId,
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
