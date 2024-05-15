const mongoose = require("mongoose");

// const MONGO_URI = "mongodb+srv://ridhampatel:FRys5bCO7CSVZcwD@cluster0.xhozmje.mongodb.net/fullstack-course";
const MONGO_URI = "mongodb://localhost:27017/fullstack-course";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;