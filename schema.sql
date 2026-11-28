CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  film_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('S', 'A', 'B', 'C', 'D')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_votes_film_tier ON votes (film_id, tier);
CREATE INDEX IF NOT EXISTS idx_votes_submission ON votes (submission_id);

CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL DEFAULT '', created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS login_codes (email TEXT PRIMARY KEY, code_hash TEXT NOT NULL, salt TEXT NOT NULL, expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, requested_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS user_sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS login_limits (rate_key TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS idx_login_limits_key_time ON login_limits(rate_key, created_at);
CREATE TABLE IF NOT EXISTS user_votes (user_id TEXT NOT NULL, category_id TEXT NOT NULL, submission_id TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, PRIMARY KEY (user_id, category_id));

CREATE TABLE IF NOT EXISTS suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL,
  new_category TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_suggestions_created ON suggestions (created_at DESC);

CREATE TABLE IF NOT EXISTS suggestion_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rate_key TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_suggestion_limits_key_time ON suggestion_limits (rate_key, created_at);

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rate_key TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_key_time ON admin_login_attempts (rate_key, created_at);

