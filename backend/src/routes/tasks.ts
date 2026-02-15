import { Router } from "express";
import Task from "../models/tasks";
import { protect, AuthRequest } from "../middleware/auth";
import { redis } from "../utils/redis";

const router = Router();
router.get("/", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const { status, dueDate } = req.query;

    const filter:any = { owner: userId };

    if (status) {
      filter.status = status;
    }

    if (dueDate) {
      filter.dueDate = { $lte: new Date(dueDate as string) };
    }

    const cacheKey = `tasks:${userId}:${status || "all"}:${dueDate || "all"}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    await redis.set(cacheKey, JSON.stringify(tasks), "EX", 60);

    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.post("/", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      owner: userId,
    });

    await redis.del(`tasks:${userId}`);

    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Task creation failed" });
  }
});

router.put("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const taskId = req.params.id as string;


    if (
      req.body.status &&
      !["pending", "completed"].includes(req.body.status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, owner: userId },
      req.body,
      { returnDocument:'after'}
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await redis.del(`tasks:${userId}`);

    res.json(task);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});





router.delete("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const taskId = req.params.id as string;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await redis.del(`tasks:${userId}`);

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});
export default router

