const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  // Default error status code and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle CastError (usually invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Duplicate Key error (usually MongoDB unique field conflict)
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(
      err.keyValue
    )}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT errors (invalid token)
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please try again.";
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please try again.";
    err = new ErrorHandler(message, 400);
  }

  // Send the error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
