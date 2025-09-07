# Backend Test Submission - URL Shortener Microservice

## Project Structure

```
22L31A05K7/
├── Backend Test Submission/
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/
│   │   │   └── shorturl.js
│   │   ├── middleware/
│   │   │   └── logger.js
│   │   └── models/
│   │       └── urlStore.js
│   ├── package.json
│   └── DESIGN.md
└── Logging Middleware/
    └── log.js
```

## How to Run

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start the server:**
   ```powershell
   node "Backend Test Submission\src\app.js"
   ```
   The server will run on port 3000 by default.

   <img width="1161" height="838" alt="Screenshot 2025-09-04 113126" src="https://github.com/user-attachments/assets/ce509bcb-7704-422a-b50e-c12d67974754" />
   <img width="936" height="247" alt="Screenshot 2025-09-04 115154" src="https://github.com/user-attachments/assets/3df54eeb-6554-494a-b0fc-6acb89ad06f2" />

## API Endpoints

### Create Short URL
- **POST** `/shorturls`
- **Body (JSON):**
  ```json
  {
    "url": "https://example.com/very/long/url",
    "validity": 30,
    "shortcode": "mycode1"
  }
  ```
- **Response:**
  ```json
  {
    "shortLink": "http://localhost:3000/shorturls/mycode1",
    "expiry": "2025-09-04T12:00:00.000Z"
  }
  ```

### Redirect Using Short URL
- **GET** `/shorturls/:shortcode`
- Redirects to the original URL if valid and not expired.

### Retrieve Short URL Statistics
- **GET** `/shorturls/:shortcode` with header `Accept: application/json`
- **Response:**
  ```json
  {
    "url": "https://example.com/very/long/url",
    "createdAt": "...",
    "expiry": "...",
    "clicks": 2,
    "clickDetails": [
      {
        "timestamp": "...",
        "ip": "...",
        "referrer": null,
        "geoLocation": "unknown"
      }
    ]
  }
  ```

## Error Handling
- Returns descriptive JSON errors for:
  - Invalid or missing fields
  - Expired or non-existent shortcodes
  - Shortcode collisions

## Logging Middleware
- All requests are logged using the reusable `Log` function in `Logging Middleware/log.js`.
- Logs are POSTed to the external API as required.

## Notes
- No authentication is required.
- Data is stored in-memory and will be lost on server restart.
- The code is modular and follows the required folder structure.


