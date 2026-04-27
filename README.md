# Admin — Customer Management Dashboard

A full-stack web application for managing customers. Add, view, search, and delete customers through a clean dashboard UI backed by a RESTful API.

## Demo

> Loom walkthrough: _[paste your Loom link here]_

---

## Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Frontend   | React 19, CSS (custom, no library)                 |
| Backend    | Node.js, Express 5                                 |
| Runtime    | [Bun](https://bun.sh) (v1.0+)                     |
| Validation | [Zod](https://zod.dev) (v4)                        |
| Date/Time  | [Luxon](https://moment.github.io/luxon/) (Asia/Kolkata) |
| Logging    | Morgan                                             |
| Storage    | In-memory array (no database)                      |

---

## Project Structure

```
CustomerManagement/
├── server/                   # Backend API
│   ├── index.js              # Entry point — starts server, graceful shutdown
│   ├── app.js                # Express app factory (middleware, routes)
│   ├── .env                  # Environment variables (PORT, CORS, logging)
│   ├── routes/
│   │   └── customers.js      # GET / POST / DELETE /customers
│   ├── middleware/
│   │   └── errorHandler.js   # 404 handler + global error handler
│   └── utils/
│       ├── corsOptions.js    # CORS origin whitelist from env
│       ├── generateId.js     # Short hex ID generator (c_xxxx)
│       ├── gracefulShutdown.js # SIGTERM/SIGINT + uncaught error handling
│       └── httpError.js      # Custom HTTP error class
├── client/                   # Frontend React app
│   └── src/
│       ├── App.js            # Main component (form, table, tweaks panel)
│       └── App.css           # Full stylesheet with theming support
└── README.md
```

---

## Prerequisites

- **Bun** v1.0 or later — [install guide](https://bun.sh/docs/installation)
- **Node.js** v18 or later (for the React dev server)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd CustomerManagement
```

### 2. Install dependencies

```bash
# Backend
cd server
bun install

# Frontend
cd ../client
npm install
```

### 3. Configure environment

The backend ships with a `.env` file pre-configured for local development:

```env
PORT=5001
CORS_ORIGINS=http://localhost:3000
LOG_FORMAT=dev
```

No changes needed for local use.

### 4. Start the servers

Open two terminals:

```bash
# Terminal 1 — Backend (port 5001)
cd server
bun start

# Terminal 2 — Frontend (port 3000)
cd client
npm start
```

The React app opens automatically at **http://localhost:3000**.

---

## API Reference

Base URL: `http://localhost:5001`

### Health Check

```
GET /health
```

Response: `{ "status": "ok" }`

### Get All Customers

```
GET /customers
GET /customers?q=search_term
```

Returns an array of customer objects. The optional `q` parameter filters by name, email, or phone (case-insensitive).

### Add a Customer

```
POST /customers
Content-Type: application/json

{
  "name": "Ayush Nautiyal",
  "email": "ayush@company.com",
  "phone": "+91 9876543210"
}
```

**Validation (Zod):**
- `name` — required, max 255 characters
- `email` — required, must be valid email format, max 255 characters
- `phone` — required, max 30 characters

**Frontend validation:**
- Phone must be a valid 10-digit Indian number (auto-prefixed with `+91`)

Response: `201 Created` with the new customer object.

### Delete a Customer

```
DELETE /customers/:id
```

Response: `200 OK` with the deleted customer object, or `404` if not found.

---

## Frontend Features

- **Add Customer Form** — validated inputs with real-time error clearing, 10-digit phone validation with auto `+91` prefix
- **Customer Table** — displays name (with avatar initials), short ID, email (mailto link), phone, and date added (IST via Luxon)
- **Search** — live search across name, email, and phone fields
- **Delete** — remove customers with a single click
- **Toast Notifications** — success/info feedback on add and delete
- **Tweaks Panel** (gear icon in topbar):
  - **Mode** — Light / Dark theme
  - **Accent** — Indigo / Emerald / Slate / Amber
  - **Form Placement** — Side / Top / Modal
  - **Density** — Comfortable / Compact
- **Responsive** — collapses to single-column on mobile

---

## Design Decisions

- **In-memory storage** — data resets on server restart, as specified in the assignment. No database setup needed.
- **Express 5** — native async error handling in route handlers, no need for wrapper middleware.
- **Zod validation** — schema-based input validation with clear, per-field error messages returned to the client.
- **Luxon + Asia/Kolkata** — all "Added" dates are displayed in IST for consistent Indian timezone formatting.
- **Short IDs** (`c_xxxx`) — 2-byte hex IDs for readability in the UI. Sufficient for in-memory demo scale.
- **CORS whitelist** — only the configured frontend origin can call the API (`CORS_ORIGINS` in `.env`).
- **Graceful shutdown** — the server handles SIGTERM/SIGINT and drains connections before exiting.

---

## Scripts

### Backend (`server/`)

| Command     | Description                          |
| ----------- | ------------------------------------ |
| `bun start` | Start the server                     |
| `bun dev`   | Start with watch mode (auto-restart) |

### Frontend (`client/`)

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm start`      | Start dev server on port 3000  |
| `npm run build`  | Production build to `build/`   |
| `npm test`       | Run test suite                 |
