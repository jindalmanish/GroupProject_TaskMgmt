const Task = require("../models/taskModel");

// get all Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Task
const addTask = async (req, res) => {
  try {
    req.body.userId = req.userId
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Tasks
const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} tasks successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    const task = await Task.findOneAndUpdate({ _id: id }, updatedTask, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
};