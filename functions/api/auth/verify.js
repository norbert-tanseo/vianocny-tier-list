import { codeDigest, cookie, currentUser, digest, ensureAuthTables, equalHex, json, normalizeEmail, randomToken, sameOrigin, votedCategoryIds } from '../../../lib/user-auth.js';

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  if (!env.DB) return json({ error: 'Prihlasovanie nie je dostupné.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Neplatný kód.' }, 400); }
  const email = normalizeEmail(body?.email);
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  if (!email || !/^\d{6}$/.test(code)) return json({ error: 'Zadaj šesťmiestny kód.' }, 400);
  await ensureAuthTables(env.DB);
  const row = await env.DB.prepare('SELECT code_hash, salt, expires_at, attempts FROM login_codes WHERE email = ?').bind(email).first();
  const now = Math.floor(Date.now() / 1000);
  if (!row || row.expires_at <= now || row.attempts >= 5) return json({ error: 'Kód vypršal. Pošli si nový.' }, 401);
  const attempt = await env.DB.prepare('UPDATE login_codes SET attempts = attempts + 1 WHERE email = ? AND attempts < 5 AND expires_at > ?').bind(email, now).run();
  if (!attempt.meta?.changes) return json({ error: 'Kód vypršal. Pošli si nový.' }, 401);
  if (!equalHex(await codeDigest(email, code, row.salt), row.code_hash)) return json({ error: 'Kód nesedí. Skús to znova.' }, 401);
  const deleted = await env.DB.prepare('DELETE FROM login_codes WHERE email = ? AND code_hash = ? AND attempts <= 5 AND expires_at > ?').bind(email, row.code_hash, now).run();
  if (!deleted.meta?.changes) return json({ error: 'Kód už bol použitý.' }, 401);
  const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  const userId = existing?.id || crypto.randomUUID();
  if (!existing) await env.DB.prepare('INSERT OR IGNORE INTO users(id, email, created_at) VALUES (?, ?, ?)').bind(userId, email, now).run();
  const user = await env.DB.prepare('SELECT id, email, display_name FROM users WHERE email = ?').bind(email).first();
  const token = randomToken();
  await env.DB.prepare('INSERT INTO user_sessions(token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await digest(token), user.id, now + 30 * 86400).run();
  return json({ user: { email: user.email, name: user.display_name }, votedCategories: await votedCategoryIds(env.DB, user.id) }, 200, { 'set-cookie': cookie(request, token) });
}
