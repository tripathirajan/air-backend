const initDBConnection = require("./db");
const authenticateRequest = require("./middlewares/authenticateRequest");
const authRoutes = require("./routes/authRoutes");

initDBConnection();
const API_PREFIX = "api/v1";

module.exports = (app) => {
  // public routes
  app.use(`/${API_PREFIX}/auth`, authRoutes);
  // private routes
  // app.use(authenticateRequest);
  app.use("*", (_, res) => {
    res.status(404).json({
      success: false,
      message: "Resource not found!",
    });
  });
};
