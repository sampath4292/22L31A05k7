// Enhanced logging middleware that also POSTs logs to external API
const fetch = require("node-fetch");

function logToExternalAPI({ stack, level, pkg, message }) {
  // POST log to external API
  fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message,
    }),
  }).catch((err) => {
    // Fallback to console if POST fails
    console.error("Failed to send log to external API:", err.message);
  });
}

module.exports = function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    // Log all requests as info, package: 'route', stack: 'backend'
    const logMsg = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    logToExternalAPI({
      stack: "backend",
      level: "info",
      pkg: "route",
      message: logMsg,
    });
    // Also log to console for local debugging
    console.log(`[${new Date().toISOString()}] ${logMsg}`);
  });
  next();
};
