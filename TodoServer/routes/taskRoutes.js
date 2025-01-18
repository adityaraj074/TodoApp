const express = require("express");
const {
  getTasks,
  addTask,
  markTaskCompleted,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.get("/:uid", getTasks);
router.post("/add", addTask);
router.put("/:id/complete", markTaskCompleted);
router.delete("/:id", deleteTask);

module.exports = router;
