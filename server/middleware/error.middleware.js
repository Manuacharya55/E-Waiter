export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      data: err.data || [],
      errors: err.errors || [],
    });
  };