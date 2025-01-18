const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, default: false },
    uid: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
