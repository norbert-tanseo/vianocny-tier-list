import { configured, isAdmin, json } from '../../../lib/admin.js';
import { ensureSuggestionTables } from '../../../lib/storage.js';
import { FILM_CATEGORY, readResults } from '../votes.js';

export async function onRequestGet({ request, env }) {
  if (!configured(env)) return json({ error: 'Admin nie je nastavený.' }, 503);
  if (!await isAdmin(request, env)) return json({ error: 'Prihlás sa.' }, 401);
  await ensureSuggestionTables(env.DB);
  const [votes, recent, suggestions, suggestionCount] = await Promise.all([
    readResults(env.DB),
    env.DB.prepare('SELECT submission_id, MAX(display_name) AS display_name, MIN(film_id) AS film_id, MAX(created_at) AS created_at, COUNT(*) AS titles FROM votes GROUP BY submission_id ORDER BY created_at DESC LIMIT 20').all(),
    env.DB.prepare('SELECT id, title, category_id, new_category, status, created_at FROM suggestions ORDER BY created_at DESC, id DESC LIMIT 200').all(),
    env.DB.prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count FROM suggestions").first(),
  ]);
  return json({
    submissions: votes.submissions,
    categoryCounts: votes.categoryCounts,
    rankedFilms: Object.keys(votes.results).length,
    totalFilms: Object.keys(FILM_CATEGORY).length,
    suggestionCount: Number(suggestionCount?.total || 0),
    newSuggestions: Number(suggestionCount?.new_count || 0),
    recent: (recent.results || []).map((row) => ({ displayName: row.display_name, categoryId: FILM_CATEGORY[row.film_id] || '', titles: Number(row.titles), createdAt: row.created_at })),
    suggestions: suggestions.results || [],
  });
}

