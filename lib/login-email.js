import nodemailer from 'nodemailer';

export function emailMarkup(code, recipient = '', category = '') {
  const digits = String(code).replace(/\D/g, '').slice(0, 6);
  const link = `https://tierlist.sk/#login_code=${digits}&login_email=${encodeURIComponent(recipient)}${category ? `&continue=${encodeURIComponent(category)}` : ''}`;
  return `<!doctype html><html lang="sk"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"></head><body style="margin:0;padding:0;background:#08110e;color:#f7f1e7;font-family:Arial,Helvetica,sans-serif"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#08110e"><tr><td align="center" style="padding:32px 16px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:540px;background:#143525;border:1px solid #315b47;border-radius:20px;overflow:hidden"><tr><td style="height:7px;background:linear-gradient(90deg,#da5d6b,#e3be69,#397e5b)"></td></tr><tr><td style="padding:34px 32px 38px"><p style="margin:0 0 40px;color:#e3be69;font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase">✦ &nbsp; Vianočný tier list</p><h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:34px;line-height:1.1;color:#f7f1e7">Tvoje miesto pri<br><span style="color:#e3be69">vianočných filmoch.</span></h1><p style="margin:0 0 30px;color:#c3d1c5;font-size:16px;line-height:1.55">Tu je tvoj prihlasovací kód. Platí 10 minút a môžeš ho použiť iba raz.</p><div style="padding:22px 12px;border:1px solid #537762;border-radius:12px;background:#0b1e15;text-align:center;color:#f7f1e7;font-size:38px;font-weight:bold;letter-spacing:9px">${digits}</div><p style="margin:10px 0 26px;color:#a9bdad;font-size:12px;text-align:center">Kód podrž alebo označ a skopíruj.</p><table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td bgcolor="#da5d6b" style="border-radius:9px"><a href="${link}" style="display:inline-block;padding:15px 28px;color:#fff;text-decoration:none;font-size:15px;font-weight:bold">Použiť kód na webe ↗</a></td></tr></table><p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #315b47;color:#93a99a;font-size:12px;line-height:1.5">Ak si o prihlásenie nežiadal(a), tento e-mail jednoducho ignoruj.</p></td></tr></table><p style="max-width:540px;margin:18px 0 0;color:#748b7a;font-size:12px">tierlist.sk · Vianočné filmy po tvojom</p></td></tr></table></body></html>`;
}

export async function sendLoginEmail(env, recipient, code, category = '') {
  if (!env.GMAIL_CLIENT_ID || !env.GMAIL_CLIENT_SECRET || !env.GMAIL_REFRESH_TOKEN) throw new Error('Gmail API is not configured');
  const transporter = nodemailer.createTransport({ streamTransport: true, buffer: true });
  const { message } = await transporter.sendMail({ from: 'Vianočný tier list <norbert@tanseo.dev>', to: { address: recipient }, subject: `${code} · Tvoj kód na Vianočný tier list`, text: `Tvoj prihlasovací kód: ${code}\nPlatí 10 minút.\nPouži ho na https://tierlist.sk/\nAk si oň nežiadal(a), tento e-mail ignoruj.`, html: emailMarkup(code, recipient, category) });
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.GMAIL_CLIENT_ID, client_secret: env.GMAIL_CLIENT_SECRET, refresh_token: env.GMAIL_REFRESH_TOKEN, grant_type: 'refresh_token' }),
  });
  if (!tokenResponse.ok) throw new Error(`Gmail token request failed (${tokenResponse.status})`);
  const { access_token: accessToken } = await tokenResponse.json();
  if (!accessToken) throw new Error('Gmail access token missing');
  const sendResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ raw: message.toString('base64url') }),
  });
  if (!sendResponse.ok) throw new Error(`Gmail send failed (${sendResponse.status})`);
}
