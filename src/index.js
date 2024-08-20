const initDBConnection = require("./db");
const authenticateRequest = require("./middlewares/authenticateRequest");
const authRoutes = require("./routes/authRoutes");
const airlineRoute = require("./routes/airlinesRoute");
const flightRoute = require("./routes/flightRoute");

initDBConnection();
const API_PREFIX = "api/v1";

module.exports = (app) => {
  // public routes
  app.use(`/${API_PREFIX}/auth`, authRoutes);

  // protected routes
  app.use(`/${API_PREFIX}/airline`, authenticateRequest, airlineRoute);
  app.use(`/${API_PREFIX}/flight`, authenticateRequest, flightRoute);

  // catch undefined routes
  app.use("*", (_, res) => {
    res.status(404).json({
      success: false,
      message: "Resource not found!",
    });
  });
};
