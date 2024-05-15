const UserModel = require("../models/userModel");

const auth = async (req, res, next) => {
  const userId = req?.signedCookies?.userId;
  const user = await UserModel.findById(userId);
  if (!user) return res.redirect("/login");
  req.userId = user?._id?.toString();
  next();
};

module.exports = auth;