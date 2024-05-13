const express = require("express");
const passport = require("./config/passport-config");
const errorHandler = require("./api/v1/middleware/errorHandler");
const authRouter = require("./api/v1/routes/authRoutes");
const todoRouter = require("./api/v1/routes/todoRoutes");
const connectDB = require("./config/db-config");

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());

app.use(passport.initialize());

// Define routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/todo/", todoRouter);

app.use(errorHandler);

module.exports = app;
