import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "incomplete",
    },
  },
  {
    timestamps: true,
  }
);

const TasksModel = mongoose.model("tasks", taskSchema);

export default TasksModel;
