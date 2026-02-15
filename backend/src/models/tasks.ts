import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
      },
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  {
      timestamps: true
   }
);

taskSchema.index({ owner: 1, status: 1 });

export default mongoose.model("Task", taskSchema);
