// Logging utility for backend and frontend
// Usage: Log(stack, level, package, message)
const fetch = require('node-fetch');

function Log(stack, level, pkg, message) {
  fetch('http://20.244.56.144/evaluation-service/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message
    })
  }).catch((err) => {
    console.error('Failed to send log to external API:', err.message);
  });
}

module.exports = Log;
