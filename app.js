const express = require("express");
const app = express();
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const taskAPI = require("./controllers/taskAPIController");
const taskSSR = require("./controllers/taskSSRController");
const userSSR = require("./controllers/userSSRController");
const userAPI = require("./controllers/userAPIController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(logger);

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));
app.use(cookieParser("SECRET"));

// Connect to MongoDB
connectDB();

// SSR

app.get("/signup", userSSR.signup);
app.get("/login", userSSR.login);
app.get("/logout", userAPI.logout);

// End1: Route to render index.html with tasks using EJS
app.get("/", auth, taskSSR.renderTasks);
// // End2: Define a route to render the addtask.ejs view
app.get("/addtask", taskSSR.renderForm);
// // End3:Route to add task using EJS
app.post("/addtask", auth, taskSSR.addTask);
// // Define a route to render the singletask.ejs view
app.get("/single-task/:id", auth, taskSSR.renderTask);
// // Define a route to delete singletask
app.delete("/single-task/:id", taskSSR.deleteTask);
// // Define a route to update single task.ejs
app.put("/single-task/:id", auth, taskSSR.updateTask);
// // Define task to update
app.get("/single-task/update/:id", auth, taskSSR.renderUpdateTask);

// API

app.post("/api/signup", userAPI.signup);
app.post("/api/login", userAPI.login);

// GET all Task
app.get("/api/tasks", auth, taskAPI.getTask);
// POST a new Task
app.post("/api/tasks", auth, taskAPI.addTask);
// GET a single Task
app.get("/api/tasks/:id", auth, taskAPI.getTask);
// Update Task using PUT
app.put("/api/tasks/:id", auth, taskAPI.updateTask);
// DELETE a Task
app.delete("/api/tasks/:id", auth, taskAPI.deleteTask);
// DELETE all Task
app.delete("/api/tasks", auth, taskAPI.deleteAllTasks);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
