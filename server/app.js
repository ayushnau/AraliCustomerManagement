const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const customersRouter = require("./routes/customers");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const buildCorsOptions = require("./utils/corsOptions");

function createApp() {
  const app = express();

  app.use(cors(buildCorsOptions()));
  app.use(express.json());

  const logFormat = process.env.LOG_FORMAT || (process.env.NODE_ENV === "production" ? "combined" : "dev");
  app.use(morgan(logFormat));
  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/customers", customersRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
