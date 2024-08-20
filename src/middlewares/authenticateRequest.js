const { StatusCodes: HttpStatusCode } = require("http-status-codes");

const authenticateRequest = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Unauthorized!", success: false });
  }
  next();
};

module.exports = authenticateRequest;
