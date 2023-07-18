const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(400).json({
      error: "Please login first",
    });
  }

  const d = jwt.decode(req.headers.token);
  req.headers.userId = d._id;

  next();
};

module.exports = isAuthenticated;
