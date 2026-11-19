const VALID_TIERS = new Set(['S', 'A', 'B', 'C', 'D']);
const VALID_FILMS = new Set([
  'klaus', 'grinch', 'grinch-animated', 'polar-express', 'christmas-carol', 'nightmare-before-christmas',
  'arthur-christmas', 'mickey-christmas-carol', 'snowman',
  'home-alone', 'home-alone-2', 'elf', 'christmas-vacation', 'die-hard', 'santa-clause', 'miracle-34th-street', 'four-christmases', 'christmas-chronicles',
  'three-wishes', 'with-you-world-fun', 'cosy-dens', 'perinbaba', 'salt-gold', 'golden-star', 'proud-princess', 'angel-lord', 'angel-lord-2',
  'love-actually', 'the-holiday', 'muppet-carol', 'family-stone', 'gremlins', 'last-christmas', 'holdovers', 'boy-called-christmas', 'man-who-invented-christmas',
]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

async function readResults(db) {
  const rows = await db.prepare('SELECT film_id, tier, COUNT(*) AS votes FROM votes GROUP BY film_id, tier').all();
  const results = {};
  for (const row of rows.results || []) {
    results[row.film_id] ||= { S: 0, A: 0, B: 0, C: 0, D: 0 };
    results[row.film_id][row.tier] = Number(row.votes);
  }
  const count = await db.prepare('SELECT COUNT(DISTINCT submission_id) AS submissions FROM votes').first();
  return { results, submissions: Number(count?.submissions || 0) };
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ results: {}, submissions: 0, mode: 'preview' });
  return json(await readResults(env.DB));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 40) : '';
  const rankings = body.rankings && typeof body.rankings === 'object' ? body.rankings : {};
  if (!name) return json({ error: 'Name is required.' }, 400);
  const entries = Object.entries(rankings);
  if (!entries.length || entries.some(([filmId, tier]) => !VALID_FILMS.has(filmId) || !VALID_TIERS.has(tier))) return json({ error: 'Complete rankings are required.' }, 400);

  const submissionId = crypto.randomUUID();
  const statements = entries.map(([filmId, tier]) => env.DB.prepare('INSERT INTO votes (submission_id, display_name, film_id, tier) VALUES (?, ?, ?, ?)').bind(submissionId, name, filmId, tier));
  await env.DB.batch(statements);
  return json({ ok: true, ...(await readResults(env.DB)) }, 201);
}
