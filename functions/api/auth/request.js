import { codeDigest, digest, ensureAuthTables, json, normalizeEmail, randomToken, sameOrigin } from '../../../lib/user-auth.js';
import { sendLoginEmail } from '../../../lib/login-email.js';

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  if (!env.DB || !env.SMTP_APP_PASSWORD) return json({ error: 'Prihlasovanie ešte nie je dostupné.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Neplatný e-mail.' }, 400); }
  const email = normalizeEmail(body?.email);
  if (!email) return json({ error: 'Zadaj platnú e-mailovú adresu.' }, 400);
  await ensureAuthTables(env.DB);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare('DELETE FROM login_limits WHERE created_at < ?').bind(now - 3600).run();
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const ipKey = await digest(`ip:${ip}`);
  const emailKey = await digest(`email:${email}`);
  const limits = await env.DB.prepare('SELECT rate_key, COUNT(*) AS count FROM login_limits WHERE rate_key IN (?, ?) AND created_at > ? GROUP BY rate_key').bind(ipKey, emailKey, now - 3600).all();
  const counts = Object.fromEntries((limits.results || []).map((row) => [row.rate_key, Number(row.count)]));
  if ((counts[ipKey] || 0) >= 20 || (counts[emailKey] || 0) >= 5) return json({ error: 'Priveľa kódov. Skús to neskôr.' }, 429);
  const previous = await env.DB.prepare('SELECT requested_at FROM login_codes WHERE email = ?').bind(email).first();
  if (previous && now - previous.requested_at < 60) return json({ error: 'Nový kód môžeš poslať o minútu.' }, 429);
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
  const salt = randomToken();
  const codeHash = await codeDigest(email, code, salt);
  await env.DB.prepare('INSERT INTO login_codes(email, code_hash, salt, expires_at, attempts, requested_at) VALUES (?, ?, ?, ?, 0, ?) ON CONFLICT(email) DO UPDATE SET code_hash=excluded.code_hash, salt=excluded.salt, expires_at=excluded.expires_at, attempts=0, requested_at=excluded.requested_at').bind(email, codeHash, salt, now + 600, now).run();
  try {
    const category = ['animaky', 'ceskoslovenske', 'americke', 'europske', 'kultove'].includes(body.category) ? body.category : '';
    await sendLoginEmail(env, email, code, category);
  } catch {
    await env.DB.prepare('DELETE FROM login_codes WHERE email = ? AND code_hash = ?').bind(email, codeHash).run();
    return json({ error: 'Kód sa nepodarilo odoslať. Skús to o chvíľu.' }, 503);
  }
  await env.DB.batch([ipKey, emailKey].map((key) => env.DB.prepare('INSERT INTO login_limits(rate_key, created_at) VALUES (?, ?)').bind(key, now)));
  return json({ ok: true });
}
