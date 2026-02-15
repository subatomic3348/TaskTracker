
import express from "express";
import cors from 'cors'
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks"

const app = express();

app.use(express.json());
app.use(cors())

 app.use("/api/tasks",taskRoutes)
app.use("/api/auth", authRoutes);
export default app