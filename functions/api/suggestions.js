import { json, sameOrigin } from '../../lib/admin.js';
import { ensureSuggestionTables, rateKey } from '../../lib/storage.js';

const CATEGORIES = new Set(['animaky', 'ceskoslovenske', 'americke', 'europske', 'kultove']);

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Ukladanie návrhov nie je dostupné.' }, 503);
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  const raw = await request.text();
  if (raw.length > 4096) return json({ error: 'Návrh je príliš dlhý.' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'Neplatný návrh.' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Neplatný návrh.' }, 400);
  if (body.website) return json({ ok: true }, 201);
  const categoryId = typeof body.categoryId === 'string' ? body.categoryId : '';
  const newCategory = typeof body.newCategory === 'string' ? body.newCategory.trim() : '';
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const isNewCategory = categoryId === 'nova';
  if ((!CATEGORIES.has(categoryId) && !isNewCategory) || (isNewCategory && (!newCategory || newCategory.length > 60)) || (!isNewCategory && (!title || newCategory)) || title.length > 120 || (!title && !newCategory)) {
    return json({ error: 'Vyplň kategóriu a názov filmu alebo novej kategórie.' }, 400);
  }
  await ensureSuggestionTables(env.DB);
  const key = await rateKey(request, env.ADMIN_PASSWORD || 'suggestions');
  const since = Math.floor(Date.now() / 1000) - 3600;
  await env.DB.prepare('DELETE FROM suggestion_limits WHERE created_at < ?').bind(since).run();
  const limit = await env.DB.prepare('SELECT COUNT(*) AS count FROM suggestion_limits WHERE rate_key = ? AND created_at > ?').bind(key, since).first();
  if (Number(limit?.count || 0) >= 5) return json({ error: 'Poslal si viacero návrhov. Skús to o chvíľu.' }, 429);
  await env.DB.batch([
    env.DB.prepare('INSERT INTO suggestions (title, category_id, new_category) VALUES (?, ?, ?)').bind(title, categoryId, newCategory),
    env.DB.prepare('INSERT INTO suggestion_limits (rate_key, created_at) VALUES (?, ?)').bind(key, Math.floor(Date.now() / 1000)),
  ]);
  return json({ ok: true }, 201);
}

