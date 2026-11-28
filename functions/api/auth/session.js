import { cookie, currentUser, digest, ensureAuthTables, json, sameOrigin, votedCategoryIds } from '../../../lib/user-auth.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ user: null, votedCategories: [] });
  await ensureAuthTables(env.DB);
  await env.DB.prepare('DELETE FROM user_sessions WHERE expires_at < ?').bind(Math.floor(Date.now() / 1000)).run();
  const user = await currentUser(request, env.DB);
  if (!user) return json({ user: null, votedCategories: [] });
  return json({ user: { email: user.email, name: user.display_name }, votedCategories: await votedCategoryIds(env.DB, user.id) });
}

export async function onRequestPatch({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  if (!env.DB) return json({ error: 'Nedostupné.' }, 503);
  await ensureAuthTables(env.DB);
  const user = await currentUser(request, env.DB);
  if (!user) return json({ error: 'Prihlás sa.' }, 401);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Neplatné meno.' }, 400); }
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  if (!name || name.length > 40) return json({ error: 'Meno musí mať 1 až 40 znakov.' }, 400);
  await env.DB.prepare('UPDATE users SET display_name = ? WHERE id = ?').bind(name, user.id).run();
  return json({ user: { email: user.email, name } });
}

export async function onRequestDelete({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  if (env.DB) {
    const token = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith('christmas_user='))?.slice('christmas_user='.length);
    if (token && /^[a-f0-9]{64}$/.test(token)) await env.DB.prepare('DELETE FROM user_sessions WHERE token_hash = ?').bind(await digest(token)).run();
  }
  return json({ user: null }, 200, { 'set-cookie': cookie(request, '', 0) });
}
