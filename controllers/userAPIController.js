const User = require("../models/userModel");

// Render Controller: Render index.html with tasks using EJS
const signup = async (req, res) => {
  try {
    if (await User.findOne({ email: req?.body?.email})) {
      return res.status(400).json({ message: "This email already used please enter different email." });

    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Password mismatch" });
    }
    await User.create(req.body);
    res.redirect("/login"); // Render index.ejs with tasks data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.render("login", { errorMessage: "Invalid Email" }); // Render login page with error message
    }
    if (user.password !== req.body.password) {
      return res.render("login", { errorMessage: "Invalid Password" }); // Render login page with error message
    }
    let options = {
      maxAge: 1000 * 60 * 60 * 7, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: true, // Indicates if the cookie should be signed
    };
    res.cookie("userId", user._id, options);

    res.redirect("/"); // Redirect to home page if login successful
  } catch (error) {
    console.error("Error rendering login page:", error);
    res.status(500).render("error");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("userId");
    res.redirect("/login"); // Render index.ejs with tasks data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

module.exports = { signup, login, logout };
