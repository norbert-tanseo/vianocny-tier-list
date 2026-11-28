import { json, sameOrigin } from './admin.js';

const COOKIE = 'christmas_user';
const SESSION_AGE = 60 * 60 * 24 * 30;
const encoder = new TextEncoder();

export { json, sameOrigin };

export function normalizeEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(email)) return '';
  const [local, domain] = email.split('@');
  return ['gmail.com', 'googlemail.com'].includes(domain) ? `${local.split('+')[0].replace(/\./g, '')}@gmail.com` : email;
}

export async function digest(value) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function codeDigest(email, code, salt) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(`${email}:${code}`), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations: 120000 }, key, 256);
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function equalHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return mismatch === 0;
}

export function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function cookie(request, token, age = SESSION_AGE) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${token}; Path=/api; HttpOnly; SameSite=Strict${secure}; Max-Age=${age}`;
}

export async function ensureAuthTables(db) {
  await db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL DEFAULT \'\', created_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS login_codes (email TEXT PRIMARY KEY, code_hash TEXT NOT NULL, salt TEXT NOT NULL, expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, requested_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS user_sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS login_limits (rate_key TEXT NOT NULL, created_at INTEGER NOT NULL)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_login_limits_key_time ON login_limits(rate_key, created_at)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS user_votes (user_id TEXT NOT NULL, category_id TEXT NOT NULL, submission_id TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, PRIMARY KEY (user_id, category_id))').run();
}

export async function currentUser(request, db) {
  const token = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) || '';
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const row = await db.prepare('SELECT u.id, u.email, u.display_name FROM user_sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?').bind(await digest(token), Math.floor(Date.now() / 1000)).first();
  return row || null;
}

export async function votedCategoryIds(db, userId) {
  const rows = await db.prepare('SELECT category_id FROM user_votes WHERE user_id = ?').bind(userId).all();
  return (rows.results || []).map((row) => row.category_id);
}
