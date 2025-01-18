const Task = require("../models/taskModel");

// Get all tasks for a specific user
exports.getTasks = async (req, res) => {
  const { uid } = req.params;
  try {
    const tasks = await Task.find({ uid });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// Create a new task
exports.addTask = async (req, res) => {
  const { title, description, deadline, priority, uid } = req.body;
  console.log(req.body, "hghgh");
  try {
    const newTask = new Task({ title, description, deadline, priority, uid });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// Update a task's completion status
exports.markTaskCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
