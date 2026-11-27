const COOKIE_NAME = 'christmas_admin';
const SESSION_SECONDS = 12 * 60 * 60;
const encoder = new TextEncoder();

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

export function configured(env) {
  return typeof env.ADMIN_PASSWORD === 'string' && env.ADMIN_PASSWORD.length >= 12 && !!env.DB;
}

export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}

function equalBytes(a, b) {
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  let mismatch = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) mismatch |= (left[i] || 0) ^ (right[i] || 0);
  return mismatch === 0;
}

async function hmac(secret, value) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function validPassword(candidate, env) {
  if (!configured(env) || typeof candidate !== 'string') return false;
  const [expected, actual] = await Promise.all([hmac(env.ADMIN_PASSWORD, 'password:' + env.ADMIN_PASSWORD), hmac(env.ADMIN_PASSWORD, 'password:' + candidate)]);
  return equalBytes(expected, actual);
}

export async function sessionCookie(request, env) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const signature = await hmac(env.ADMIN_PASSWORD, `session:${expires}`);
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_NAME}=${expires}.${signature}; Path=/api/admin; HttpOnly; SameSite=Strict${secure}; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/api/admin; HttpOnly; SameSite=Strict${secure}; Max-Age=0`;
}

export async function isAdmin(request, env) {
  if (!configured(env)) return false;
  const cookie = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  const token = cookie?.slice(COOKIE_NAME.length + 1) || '';
  const match = /^(\d{10})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  if (expires <= Date.now() / 1000 || expires > Date.now() / 1000 + SESSION_SECONDS) return false;
  const expected = await hmac(env.ADMIN_PASSWORD, `session:${expires}`);
  return equalBytes(expected, match[2]);
}

