# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for yab3.dev — a terminal-style single-page site with a command-driven interface. Stack: vanilla JS frontend, Flask (Python) backend, PostgreSQL, all orchestrated via Docker Compose with Nginx as reverse proxy.

## Development

### Running the stack

```bash
docker compose up --build        # Build and start all services
docker compose up                # Start without rebuilding
docker compose down              # Stop all services
docker compose logs flask        # Tail Flask logs
docker compose logs nginx        # Tail Nginx logs
```

### Backend (Flask)

The backend runs on port 5000 inside Docker (not exposed to host). Access it only via Nginx's `/api/` proxy. To iterate quickly on `app.py` without rebuilding, the `./code/backend` directory is volume-mounted into the Flask container — restart the container to pick up changes:

```bash
docker compose restart flask
```

### Environment variables

Copy `.env` values are required at compose startup. The file is gitignored. Required keys:
- `POSTGRES_PASSWORD`
- `DATABASE_URL` — full postgres connection string
- `SECRET_KEY`

## Architecture

```
Browser → Nginx (:80)
  ├── /          → serves code/frontend/ (static files)
  └── /api/*     → proxies to Flask (:5000)

Flask ← SQLAlchemy → PostgreSQL (:5432, internal only)
```

- **Frontend** (`code/frontend/`): Static HTML/CSS/JS. No build step. `script.js` maps typed commands to routes (`help`, `resume`, `sophia`).
- **Backend** (`code/backend/app.py`): Single Flask app file. CORS restricted to `https://yab3.dev`. DB connection via `DATABASE_URL` env var.
- **Nginx** (`nginx.conf`): Serves static frontend, proxies `/api/` to the `flask` service by Docker DNS name.
- **Dockerfile**: Builds the Flask image from `python:3.11-slim`, installs `requirements.txt`, runs `app.py` directly.

## Working Style

- Before editing any file, explain what you are about to change and why.
- Explain changes at a beginner-friendly level. Assume the user is learning and wants to understand the reasoning, not just see the result.

## Adding routes/commands

To add a new frontend command (e.g., `projects`):
1. Create the target file in `code/frontend/` (e.g., `projects.html`)
2. Add an entry to the `routes` object in `code/frontend/script.js`

To add a new API endpoint:
1. Add a route to `code/backend/app.py` under a `/api/` prefix
2. Nginx will automatically proxy it — no config change needed
