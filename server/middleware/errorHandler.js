const HttpError = require("../utils/httpError");

function notFoundHandler(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const status = err instanceof HttpError ? err.status : err.status || 500;
  const isServerError = status >= 500;

  if (isServerError) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  } else {
    console.warn(`[warn] ${req.method} ${req.originalUrl} -> ${status} ${err.message}`);
  }

  const message = isServerError ? "Internal Server Error" : err.message;

  res.status(status).json({ error: message });
}

module.exports = { notFoundHandler, errorHandler };
