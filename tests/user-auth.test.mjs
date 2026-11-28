import test from 'node:test';
import assert from 'node:assert/strict';
import { codeDigest, normalizeEmail } from '../lib/user-auth.js';
import { emailMarkup } from '../lib/login-email.js';

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
