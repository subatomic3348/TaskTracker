"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signup");
      return;
    }

    if (!title.trim()) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-lg space-y-4">

        <h2 className="text-2xl font-bold text-center">
          Create Task
        </h2>

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-white/10"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-white/10"
        />

        <div className="flex gap-3">
          <button
            onClick={createTask}
            className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-400"
          >
            Create
          </button>

          <button
            onClick={() => router.back()}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
