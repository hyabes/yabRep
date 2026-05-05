// HECTOR YABES
// yab3.dev
// admin.js

// --------------------
// HEALTH CHECK
// Fetch /api/health and update each status field
// --------------------
fetch('/api/health')
  .then(res => res.json())
  .then(data => {
    // Flask status
    const flaskEl = document.getElementById('flask-status');
    flaskEl.textContent = data.flask ? 'OK' : 'DOWN';
    flaskEl.className   = data.flask ? 'ok' : 'down';

    // Postgres status
    const pgEl = document.getElementById('postgres-status');
    pgEl.textContent = data.postgres ? 'OK' : 'DOWN';
    pgEl.className   = data.postgres ? 'ok' : 'down';
  })
  .catch(() => {
    // If the fetch itself fails, Flask is unreachable
    document.getElementById('flask-status').textContent = 'DOWN';
    document.getElementById('flask-status').className   = 'down';
    document.getElementById('postgres-status').textContent = 'DOWN';
    document.getElementById('postgres-status').className   = 'down';
  });
