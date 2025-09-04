// Simple in-memory store for URLs
const { v4: uuidv4 } = require("uuid");

const urlMap = new Map(); // shortcode -> { url, expiry, createdAt, clicks, clickDetails }

function generateShortcode() {
  return uuidv4().slice(0, 6); // 6-char unique code
}

function saveUrl({ url, shortcode, expiry }) {
  const createdAt = new Date();
  urlMap.set(shortcode, {
    url,
    expiry,
    createdAt,
    clicks: 0,
    clickDetails: [],
  });
}

function getUrl(shortcode) {
  return urlMap.get(shortcode);
}

function incrementClick(shortcode, req) {
  const entry = urlMap.get(shortcode);
  if (entry) {
    entry.clicks += 1;
    entry.clickDetails.push({
      timestamp: new Date(),
      ip: req.ip,
      referrer: req.get('referer') || null,
      geoLocation: 'unknown' // Placeholder, real geo lookup would require an external API
    });
  }
}

function getStats(shortcode) {
  const entry = urlMap.get(shortcode);
  if (!entry) return null;
  return {
    url: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clicks: entry.clicks,
    clickDetails: entry.clickDetails,
  };
}

function isShortcodeTaken(shortcode) {
  return urlMap.has(shortcode);
}

module.exports = {
  generateShortcode,
  saveUrl,
  getUrl,
  incrementClick,
  getStats,
  isShortcodeTaken,
};
