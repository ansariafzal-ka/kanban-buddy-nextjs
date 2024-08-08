import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["TODO", "DOING", "DONE"],
    default: "TODO",
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
