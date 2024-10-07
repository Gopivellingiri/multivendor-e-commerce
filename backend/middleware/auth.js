// auth.js
const catchAsyncError = require("./catchAsyncError.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Ensure JWT_SECRET_KEY is correctly set
  req.user = await User.findById(decoded.id);
  next();
});
