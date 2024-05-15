// Render Controller: Render index.html with tasks using EJS
const signup = async (req, res) => {
  try {
    res.render("signup"); // Render index.ejs with tasks data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

const login = async (req, res) => {
  try {
    res.render("login", { errorMessage: null }); // Pass null errorMessage initially
  } catch (error) {
    console.error("Error rendering login page:", error);
    res.status(500).render("error");
  }
};

module.exports = { signup, login };
