const express = require("express");
const logger = require("./middleware/logger");
const shorturlRouter = require("./routes/shorturl");

const app = express();
app.use(express.json());
app.use(logger);

app.use("/shorturls", shorturlRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener Microservice running on port ${PORT}`);
});
