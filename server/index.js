const createApp = require("./app");
const registerGracefulShutdown = require("./utils/gracefulShutdown");

const PORT = parseInt(process.env.PORT, 10) || 5001;

const app = createApp();
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("[startup] failed to start server", err);
  process.exit(1);
});

registerGracefulShutdown(server);
