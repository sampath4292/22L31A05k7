const express = require("express");
const router = express.Router();
const {
  generateShortcode,
  saveUrl,
  getUrl,
  incrementClick,
  getStats,
  isShortcodeTaken,
} = require("../models/urlStore");

// Helper to get expiry date
function getExpiry(validity) {
  const now = new Date();
  const minutes = validity ? parseInt(validity, 10) : 30;
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

// POST /shorturls - create short URL
router.post("/", (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid or missing url" });
  }
  let code = shortcode;
  if (code) {
    if (isShortcodeTaken(code)) {
      return res.status(409).json({ error: "Shortcode already in use" });
    }
  } else {
    do {
      code = generateShortcode();
    } while (isShortcodeTaken(code));
  }
  const expiry = getExpiry(validity);
  saveUrl({ url, shortcode: code, expiry });
  return res.status(201).json({
    shortLink: `${req.protocol}://${req.get("host")}/shorturls/${code}`,
    expiry: expiry.toISOString(),
  });
});

// GET /shorturls/:shortcode - redirect or stats
router.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const entry = getUrl(shortcode);
  if (!entry) {
    return res.status(404).json({ error: "Shortcode not found" });
  }
  const now = new Date();
  if (now > entry.expiry) {
    return res.status(410).json({ error: "Shortcode expired" });
  }
  // If Accept: application/json, return stats
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    const stats = getStats(shortcode);
    return res.json({
      url: stats.url,
      createdAt: stats.createdAt,
      expiry: stats.expiry,
      clicks: stats.clicks,
      clickDetails: stats.clickDetails,
    });
  }
  // Otherwise, redirect
  incrementClick(shortcode, req);
  return res.redirect(entry.url);
});

module.exports = router;
