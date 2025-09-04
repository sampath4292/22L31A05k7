// Logging middleware using reusable Log function
const Log = require("../../../Logging Middleware/log.js");

module.exports = function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMsg = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    Log("backend", "info", "route", logMsg);
    console.log(`[${new Date().toISOString()}] ${logMsg}`);
  });
  next();
};
