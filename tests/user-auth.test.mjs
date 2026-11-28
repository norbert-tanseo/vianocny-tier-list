import test from 'node:test';
import assert from 'node:assert/strict';
import { codeDigest, normalizeEmail } from '../lib/user-auth.js';
import { emailMarkup, sendLoginEmail } from '../lib/login-email.js';

test('email identity collapses Gmail aliases and rejects header injection', () => {
  assert.equal(normalizeEmail(' Name.Surname+movie@googlemail.com '), 'namesurname@gmail.com');
  assert.equal(normalizeEmail('norbert@tanseo.dev'), 'norbert@tanseo.dev');
  assert.equal(normalizeEmail('person@site.test\nBcc:other@site.test'), '');
});

test('one-time code digest changes with email and salt', async () => {
  const expected = await codeDigest('a@example.com', '123456', 'salt-a');
  assert.notEqual(expected, await codeDigest('a@example.com', '123456', 'salt-b'));
  assert.notEqual(expected, await codeDigest('b@example.com', '123456', 'salt-a'));
});

test('email action keeps the code in a URL fragment', () => {
  const html = emailMarkup('123456', 'a@example.com', 'animaky');
  assert.match(html, /tierlist\.sk\/#login_code=123456/);
  assert.match(html, /continue=animaky/);
  assert.match(html, /<meta name="viewport"/);
});

test('Gmail API sends the composed message with a send-only access token', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify(calls.length === 1 ? { access_token: 'test-token' } : { id: 'sent' }), { status: 200 });
  };
  try {
    await sendLoginEmail({ GMAIL_CLIENT_ID: 'client', GMAIL_CLIENT_SECRET: 'secret', GMAIL_REFRESH_TOKEN: 'refresh' }, 'viewer@example.com', '123456', 'animaky');
    assert.equal(calls[0].url, 'https://oauth2.googleapis.com/token');
    assert.equal(calls[1].url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send');
    assert.equal(calls[1].options.headers.authorization, 'Bearer test-token');
    const message = Buffer.from(JSON.parse(calls[1].options.body).raw, 'base64url').toString('utf8');
    assert.match(message, /viewer@example\.com/);
    assert.match(message, /norbert@tanseo\.dev/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
