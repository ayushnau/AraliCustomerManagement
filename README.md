# Admin — Customer Management Dashboard

A full-stack web application for managing customers. Add, view, search, and delete customers through a clean dashboard UI backed by a RESTful API.

## Demo

> Loom walkthrough: _[paste your Loom link here]_

---

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React 19, Tailwind CSS 3                                 |
| Backend    | Node.js, Express 5                                       |
| Runtime    | [Bun](https://bun.sh) (v1.0+)                           |
| Validation | [Zod](https://zod.dev) (v4)                              |
| Date/Time  | [Luxon](https://moment.github.io/luxon/) (Asia/Kolkata)  |
| Logging    | Morgan                                                   |
| Storage    | In-memory array (no database)                            |

---

## Project Structure

```
CustomerManagement/
├── server/                        # Backend API
│   ├── index.js                   # Entry point — starts server, graceful shutdown
│   ├── app.js                     # Express app factory (middleware, routes)
│   ├── .env.example               # Environment variable reference
│   ├── routes/
│   │   └── customers.js           # GET / POST / DELETE /customers
│   ├── middleware/
│   │   └── errorHandler.js        # 404 handler + global error handler
│   └── utils/
│       ├── corsOptions.js         # CORS origin whitelist from env
│       ├── generateId.js          # Short hex ID generator
│       ├── gracefulShutdown.js    # SIGTERM/SIGINT + uncaught error handling
│       └── httpError.js           # Custom HTTP error class
├── client/                        # Frontend React app
│   ├── .env                       # VITE_API_URL
│   ├── tailwind.config.js         # Tailwind theme with CSS variable references
│   └── src/
│       ├── App.js                 # Main dashboard layout and state
│       ├── App.css                # Tailwind directives + CSS variables (theming)
│       ├── components/
│       │   ├── Icons.js           # SVG icon components
│       │   ├── CustomerForm.js    # Add customer form with validation
│       │   ├── CustomerRow.js     # Table row with delete action
│       │   ├── ConfirmModal.js    # Delete confirmation dialog
│       │   ├── TweaksPanel.js     # Theme/layout settings panel
│       │   └── Toasts.js          # Auto-dismissing notifications
│       └── utils/
│           └── helpers.js         # API URL, initials(), fmtDate()
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

Copy the example env file for the backend:

```bash
cd server
cp .env.example .env
```

Default values (no changes needed for local use):

```env
PORT=5001
CORS_ORIGINS=http://localhost:3000
LOG_FORMAT=dev
```

The frontend `.env` is already configured:

```env
VITE_API_URL=http://localhost:5001
```

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
- **Customer Table** — displays name (with avatar initials), email (mailto link), phone, and date added (IST via Luxon)
- **Search** — live search across name, email, and phone fields
- **Delete** — confirmation modal before removing a customer
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
- **Tailwind CSS** — utility-first styling with CSS variables for dynamic theming (light/dark, accents).
- **Luxon + Asia/Kolkata** — all "Added" dates are displayed in IST for consistent Indian timezone formatting.
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
