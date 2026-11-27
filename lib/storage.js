export async function ensureSuggestionTables(db) {
  await db.prepare("CREATE TABLE IF NOT EXISTS suggestions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL DEFAULT '', category_id TEXT NOT NULL, new_category TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed')), created_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_suggestions_created ON suggestions (created_at DESC)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS suggestion_limits (id INTEGER PRIMARY KEY AUTOINCREMENT, rate_key TEXT NOT NULL, created_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_suggestion_limits_key_time ON suggestion_limits (rate_key, created_at)').run();
}

export async function ensureLoginTable(db) {
  await db.prepare('CREATE TABLE IF NOT EXISTS admin_login_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, rate_key TEXT NOT NULL, created_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_key_time ON admin_login_attempts (rate_key, created_at)').run();
}

export async function rateKey(request, secret) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${secret}:${ip}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

