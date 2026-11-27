import { clearSessionCookie, configured, isAdmin, json, sameOrigin, sessionCookie, validPassword } from '../../../lib/admin.js';
import { ensureLoginTable, rateKey } from '../../../lib/storage.js';

export async function onRequestGet({ request, env }) {
  if (!configured(env)) return json({ configured: false, authenticated: false }, 503);
  return json({ configured: true, authenticated: await isAdmin(request, env) });
}

export async function onRequestPost({ request, env }) {
  if (!configured(env)) return json({ error: 'Admin heslo nie je nastavené na serveri.' }, 503);
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  const raw = await request.text();
  if (raw.length > 1024) return json({ error: 'Neplatné prihlásenie.' }, 400);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'Neplatné prihlásenie.' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Neplatné prihlásenie.' }, 400);
  await ensureLoginTable(env.DB);
  const key = await rateKey(request, env.ADMIN_PASSWORD);
  const since = Math.floor(Date.now() / 1000) - 900;
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE created_at < ?').bind(since).run();
  const attempts = await env.DB.prepare('SELECT COUNT(*) AS count FROM admin_login_attempts WHERE rate_key = ? AND created_at > ?').bind(key, since).first();
  if (Number(attempts?.count || 0) >= 5) return json({ error: 'Priveľa pokusov. Skús to o 15 minút.' }, 429);
  if (!await validPassword(body.password, env)) {
    await env.DB.prepare('INSERT INTO admin_login_attempts (rate_key, created_at) VALUES (?, ?)').bind(key, Math.floor(Date.now() / 1000)).run();
    return json({ error: 'Nesprávne heslo.' }, 401);
  }
  await env.DB.prepare('DELETE FROM admin_login_attempts WHERE rate_key = ?').bind(key).run();
  return json({ authenticated: true }, 200, { 'set-cookie': await sessionCookie(request, env) });
}

export async function onRequestDelete({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  return json({ authenticated: false }, 200, { 'set-cookie': clearSessionCookie(request) });
}

