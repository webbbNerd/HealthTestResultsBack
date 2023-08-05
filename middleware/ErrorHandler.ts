const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // If headers have already been sent, delegate to the default Express error handler
    return next(err);
  }

  res.status(500).json({
    success: false,
    error: true,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
