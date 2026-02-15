"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status?: string;
};

export default function TasksDesign() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signup");
      return;
    }

    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  const updateTask = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        status: editStatus,
      }),
    });

    setEditingId(null);
    fetchTasks();
  };

  if (loading) return <div className="text-white">Loading...</div>;

  const active = tasks.filter((t) => t.status !== "completed");
  const completed = tasks.filter((t) => t.status === "completed");

  let filtered = tasks;
  if (filter === "active") filtered = active;
  if (filter === "completed") filtered = completed;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        
        <div className="border-b border-white/10 pb-4 mb-8 flex justify-between">
       
          <h2  className="font-semibold text-lg"> <a href="/">TaskTracker</a></h2>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/signup");
            }}
            className="text-gray-400 hover:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-gray-400">
              {active.length} pending, {completed.length} completed
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/create")}
            className="bg-indigo-500 px-5 py-2 rounded-lg hover:bg-indigo-400"
          >
            + New task
          </button>
        </div>

        <div className="flex gap-2 bg-white/5 p-1 rounded-lg mb-6">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded ${
                filter === f ? "bg-white/10" : ""
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task._id}
              className="bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              {editingId === task._id ? (
                <div className="space-y-3">

                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 rounded bg-white/10"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                    className="w-full p-2 rounded bg-white/10"
                  />

                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value)
                    }
                    className="w-full p-2 rounded bg-white/10"
                  >
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                  </select>

                  <div className="flex gap-3">
                    <button
                      onClick={() => updateTask(task._id)}
                      className="bg-green-500 px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">

                  <div>
                    <p
                      className={`font-semibold ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {task.description}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.status === "completed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {task.status || "pending"}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(task._id);
                        setEditTitle(task.title);
                        setEditDescription(
                          task.description || ""
                        );
                        setEditStatus(
                          task.status || "pending"
                        );
                      }}
                      className="text-indigo-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
