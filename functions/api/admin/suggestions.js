import { configured, isAdmin, json, sameOrigin } from '../../../lib/admin.js';
import { ensureSuggestionTables } from '../../../lib/storage.js';

export async function onRequestPatch({ request, env }) {
  if (!configured(env)) return json({ error: 'Admin nie je nastavený.' }, 503);
  if (!await isAdmin(request, env)) return json({ error: 'Prihlás sa.' }, 401);
  if (!sameOrigin(request)) return json({ error: 'Neplatný pôvod požiadavky.' }, 403);
  const raw = await request.text();
  if (raw.length > 1024) return json({ error: 'Neplatná zmena.' }, 400);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'Neplatná zmena.' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Neplatná zmena.' }, 400);
  const id = Number(body.id);
  if (!Number.isSafeInteger(id) || id < 1 || !['new', 'reviewed'].includes(body.status)) return json({ error: 'Neplatná zmena.' }, 400);
  await ensureSuggestionTables(env.DB);
  const result = await env.DB.prepare('UPDATE suggestions SET status = ? WHERE id = ?').bind(body.status, id).run();
  if (!result.meta?.changes) return json({ error: 'Návrh sa nenašiel.' }, 404);
  return json({ ok: true });
}

