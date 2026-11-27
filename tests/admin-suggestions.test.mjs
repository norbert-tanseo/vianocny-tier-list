import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { onRequestPost as suggest } from '../functions/api/suggestions.js';
import { onRequestGet as getSession, onRequestPost as login } from '../functions/api/admin/session.js';
import { onRequestGet as overview } from '../functions/api/admin/overview.js';
import { onRequestPatch as updateSuggestion } from '../functions/api/admin/suggestions.js';

const origin = 'https://vianocny-tier-list.pages.dev';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  const wrap = (sql, params = []) => ({
    bind: (...values) => wrap(sql, values),
    run: async () => ({ meta: { changes: sqlite.prepare(sql).run(...params).changes } }),
    first: async () => sqlite.prepare(sql).get(...params) || null,
    all: async () => ({ results: sqlite.prepare(sql).all(...params) }),
  });
  return { prepare: wrap, batch: async (statements) => Promise.all(statements.map((statement) => statement.run())) };
}

function request(path, method = 'GET', body, cookie, requestOrigin = origin) {
  const headers = {};
  if (method !== 'GET') headers.origin = requestOrigin;
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (cookie) headers.cookie = cookie;
  return new Request(origin + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
}

test('admin data stays private and suggestions flow through review', async () => {
  const env = { DB: database(), ADMIN_PASSWORD: 'long-test-password-123456' };
  assert.equal((await getSession({ request: request('/api/admin/session'), env })).status, 200);
  assert.equal((await overview({ request: request('/api/admin/overview'), env })).status, 401);
  assert.equal((await login({ request: request('/api/admin/session', 'POST', { password: 'wrong' }), env })).status, 401);
  const signedIn = await login({ request: request('/api/admin/session', 'POST', { password: env.ADMIN_PASSWORD }), env });
  assert.equal(signedIn.status, 200);
  const cookie = signedIn.headers.get('set-cookie').split(';')[0];
  assert.equal((await getSession({ request: request('/api/admin/session', 'GET', undefined, cookie), env })).status, 200);
  assert.equal((await getSession({ request: request('/api/admin/session', 'GET', undefined, cookie), env })).headers.get('cache-control'), 'no-store');
  assert.equal((await suggest({ request: request('/api/suggestions', 'POST', { categoryId: 'americke', title: '' }), env })).status, 400);
  assert.equal((await suggest({ request: request('/api/suggestions', 'POST', { categoryId: 'americke', title: 'Film' }, undefined, 'https://other.example'), env })).status, 403);
  assert.equal((await suggest({ request: request('/api/suggestions', 'POST', { categoryId: 'americke', title: 'Nový film' }), env })).status, 201);
  assert.equal((await suggest({ request: request('/api/suggestions', 'POST', { categoryId: 'nova', newCategory: 'Zimné rozprávky', title: '' }), env })).status, 201);
  assert.equal((await updateSuggestion({ request: request('/api/admin/suggestions', 'PATCH', { id: 1, status: 'reviewed' }), env })).status, 401);
  assert.equal((await updateSuggestion({ request: request('/api/admin/suggestions', 'PATCH', { id: 1, status: 'reviewed' }, cookie), env })).status, 200);
  const data = await (await overview({ request: request('/api/admin/overview', 'GET', undefined, cookie), env })).json();
  assert.equal(data.suggestionCount, 2);
  assert.equal(data.newSuggestions, 1);
  assert.equal(data.suggestions.find((item) => item.id === 1).status, 'reviewed');
});

test('admin fails closed without a configured password', async () => {
  const env = { DB: database() };
  assert.equal((await getSession({ request: request('/api/admin/session'), env })).status, 503);
  assert.equal((await overview({ request: request('/api/admin/overview'), env })).status, 503);
});

