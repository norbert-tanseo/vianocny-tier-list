const VALID_TIERS = new Set(['S', 'A', 'B', 'C', 'D']);
const FILM_CATEGORY = {
  klaus: 'animaky', grinch: 'animaky', 'grinch-animated': 'animaky', 'polar-express': 'animaky', 'christmas-carol': 'animaky', 'legendary-guardians': 'animaky',
  'nightmare-before-christmas': 'animaky', 'arthur-christmas': 'animaky', 'mickey-christmas-carol': 'animaky', snowman: 'animaky', 'robin-robin': 'animaky', 'the-star': 'animaky',
  'home-alone': 'americke', 'home-alone-2': 'americke', 'home-alone-3': 'americke', 'home-alone-4': 'americke', 'home-alone-5': 'americke', 'home-sweet-home-alone': 'americke', elf: 'americke', 'christmas-vacation': 'americke', 'santa-clause': 'americke',
  'miracle-34th-street': 'americke', 'four-christmases': 'americke', 'christmas-chronicles': 'americke', 'jingle-all-the-way': 'americke', 'scrooged': 'americke', 'bad-santa': 'americke', 'christmas-story': 'americke', 'dennis-christmas': 'americke', 'jack-frost': 'americke',
  'three-wishes': 'ceskoslovenske', 'with-you-world-fun': 'ceskoslovenske', 'cosy-dens': 'ceskoslovenske', perinbaba: 'ceskoslovenske',
  'salt-gold': 'ceskoslovenske', 'golden-star': 'ceskoslovenske', 'proud-princess': 'ceskoslovenske', 'angel-lord': 'ceskoslovenske', 'angel-lord-2': 'ceskoslovenske', 'three-veterans': 'ceskoslovenske', 'immortal-aunt': 'ceskoslovenske', 'devil-knows-why': 'ceskoslovenske', 'lotrando-zubejda': 'ceskoslovenske', 'cisars-baker-bakers-emperor': 'ceskoslovenske', 'madly-sad-princess': 'ceskoslovenske', 'devils-not-jokes': 'ceskoslovenske', 'rysava-jalovica': 'ceskoslovenske',
  'love-actually': 'europske', 'the-holiday': 'europske', 'last-christmas': 'europske', holdovers: 'europske', 'boy-called-christmas': 'europske', 'man-who-invented-christmas': 'europske',
  'muppet-carol': 'kultove', 'family-stone': 'kultove', gremlins: 'kultove', 'family-man': 'kultove', 'last-holiday': 'kultove', 'christmas-kranks': 'kultove',
};
const VALID_FILMS = new Set(Object.keys(FILM_CATEGORY));

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

async function readResults(db) {
  const rows = await db.prepare('SELECT film_id, tier, COUNT(*) AS votes FROM votes GROUP BY film_id, tier').all();
  const submissionRows = await db.prepare('SELECT submission_id, film_id FROM votes').all();
  const results = {};
  for (const row of rows.results || []) {
    results[row.film_id] ||= { S: 0, A: 0, B: 0, C: 0, D: 0 };
    results[row.film_id][row.tier] = Number(row.votes);
  }
  const count = await db.prepare('SELECT COUNT(DISTINCT submission_id) AS submissions FROM votes').first();
  const categorySubmissions = Object.fromEntries(['animaky', 'americke', 'ceskoslovenske', 'europske', 'kultove'].map((categoryId) => [categoryId, new Set()]));
  for (const row of submissionRows.results || []) {
    const categoryId = FILM_CATEGORY[row.film_id];
    if (categoryId) categorySubmissions[categoryId].add(row.submission_id);
  }
  const categoryCounts = Object.fromEntries(Object.entries(categorySubmissions).map(([categoryId, submissions]) => [categoryId, submissions.size]));
  return { results, categoryCounts, submissions: Number(count?.submissions || 0) };
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ results: {}, categoryCounts: {}, submissions: 0, mode: 'preview' });
  return json(await readResults(env.DB));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 40) : '';
  const categoryId = typeof body.categoryId === 'string' ? body.categoryId : '';
  const rankings = body.rankings && typeof body.rankings === 'object' ? body.rankings : {};
  if (!name) return json({ error: 'Name is required.' }, 400);
  const entries = Object.entries(rankings);
  const expectedFilms = Object.entries(FILM_CATEGORY).filter(([, filmCategory]) => filmCategory === categoryId).map(([filmId]) => filmId);
  const completeCategory = expectedFilms.length === entries.length && expectedFilms.every((filmId) => rankings[filmId]);
  const validEntries = entries.every(([filmId, tier]) => VALID_FILMS.has(filmId) && FILM_CATEGORY[filmId] === categoryId && VALID_TIERS.has(tier));
  if (!categoryId || !completeCategory || !validEntries) return json({ error: 'Complete rankings with every title assigned to one tier are required.' }, 400);

  const submissionId = crypto.randomUUID();
  const statements = entries.map(([filmId, tier]) => env.DB.prepare('INSERT INTO votes (submission_id, display_name, film_id, tier) VALUES (?, ?, ?, ?)').bind(submissionId, name, filmId, tier));
  await env.DB.batch(statements);
  return json({ ok: true, ...(await readResults(env.DB)) }, 201);
}
