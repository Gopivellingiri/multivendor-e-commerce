class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Captures the stack trace of where the error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
