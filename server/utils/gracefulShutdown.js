const SHUTDOWN_SIGNALS = ["SIGTERM", "SIGINT"];
const FATAL_EVENTS = ["uncaughtException", "unhandledRejection"];

function registerGracefulShutdown(server, { timeoutMs = 10000 } = {}) {
  let shuttingDown = false;
  function shutdown(reason) {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`\n[${reason}] received — shutting down gracefully`);

    server.close((err) => {
      if (err) {
        console.error("[shutdown] error while closing server", err);
        process.exit(1);
      }
      console.log("[shutdown] http server closed");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("[shutdown] forced exit after timeout");
      process.exit(1);
    }, timeoutMs).unref();
  }

  SHUTDOWN_SIGNALS.forEach((signal) => {
    process.on(signal, () => shutdown(signal));
  });

  FATAL_EVENTS.forEach((event) => {
    process.on(event, (err) => {
      console.error(`[${event}]`, err);
      shutdown(event);
    });
  });
}

module.exports = registerGracefulShutdown;
