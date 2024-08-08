import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Board =
  mongoose.models.Board || mongoose.model("Board", BoardSchema);
