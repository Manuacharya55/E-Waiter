class ApiError extends Error {
  constructor(statusCode = 500, message = "Something Went Wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = [];
    this.success = false;
    this.errors = errors;

    // Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
