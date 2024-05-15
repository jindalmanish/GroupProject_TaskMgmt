const Task = require("../models/taskModel");

// Render Controller: Render index.html with tasks using EJS
const renderTasks = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.userId});
    res.render("index", { tasks }); // Render index.ejs with tasks data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Task by ID
const renderTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.render("notfound");
    }
    task = await Task.findByIdAndUpdate(id, req.query, {new: true})
    res.render("singletask", { task }); // Render singletask.ejs with task data
  } catch (error) {
    console.error("Error rendering Task:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addtask"); // Assuming "addtask.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new task (used for rendering and API)
const addTask = async (req, res) => {
  try {
    req.body.userId = req.userId
    const newTask = new Task(req.body);
    await newTask.save();
    // Redirect to the main page after successfully adding the task
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).render("error");
  }
};

// Delete Task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete({ _id: id });
    if (!task) {
      return res.status(404).render("notfound");
    }
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleting Task:", error);
    res.status(500).render("error");
  }
};


// Update Task by ID
const renderUpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the task by id
    const task = await Task.findById(id);

    if (!task) {
      return res.render("notfound");
    }

    // Render the singletask.ejs template with the task data
    res.render("updatetask", { task });

  } catch (error) {
    console.error("Error fetching Task:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!updatedTask) {
      return res.render("notfound");
    }

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Task:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderTasks,
  renderTask,
  addTask,
  renderForm,
  deleteTask,
  updateTask,
  renderUpdateTask,
};