const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");

const initApplication = require("./src");
const {
  cors: { allowedOrigins, ...corsOptions },
} = require("./src/config");

const app = express();

app.use(logger("dev"));
// cors middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    ...corsOptions,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// session middleware
app.use(
  session({
    name: "ssid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

initApplication(app);

// app.use("*", (_, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Resource not found!",
//   });
// });

module.exports = app;
