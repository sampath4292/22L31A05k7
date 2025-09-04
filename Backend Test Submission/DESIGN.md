# URL Shortener Microservice - Design Document

## Overview

This microservice provides HTTP endpoints to shorten URLs, manage their expiry, and retrieve usage statistics. It is designed for simplicity, maintainability, and easy extensibility.

## Architecture & Technology Choices

- **Node.js + Express**: Chosen for rapid development, robust routing, and middleware support.
- **In-memory Store**: Uses a simple JavaScript `Map` for URL storage, suitable for demo and evaluation. For production, a persistent store (e.g., Redis, MongoDB) is recommended.
- **Logging Middleware**: Custom middleware logs all requests with method, URL, status, and response time.

## Data Model

- **Short URL Entry**:
  - `shortcode` (string): Unique identifier for the short URL.
  - `url` (string): The original long URL.
  - `expiry` (Date): Expiry timestamp.
  - `createdAt` (Date): Creation timestamp.
  - `clicks` (int): Number of times the short URL was accessed.
  - `clickDetails` (array): Timestamps and IPs for each click.

## Key Design Decisions

- **Shortcode Generation**: Uses UUID v4, truncated to 6 characters, ensuring high uniqueness. Custom shortcodes are supported and checked for collisions.
- **Expiry Handling**: Default expiry is 30 minutes if not specified. Expiry is enforced on access.
- **Redirection & Stats**: The same endpoint supports both redirection (default) and statistics (when `Accept: application/json` is sent).
- **Error Handling**: All endpoints return descriptive JSON error responses for invalid input, expired or non-existent shortcodes, and collisions.
- **No Authentication**: As per requirements, no authentication or user registration is implemented.

## Assumptions

- The service is stateless and does not persist data across restarts.
- All shortcodes must be globally unique.
- The service is for demonstration and evaluation, not production use.

## Scalability & Maintainability

- The code is modular, separating routing, middleware, and data storage.
- For production, swap the in-memory store for a database and add authentication, rate limiting, and persistent logging.

---

**Author:** [Your Name]
**Date:** September 4, 2025
