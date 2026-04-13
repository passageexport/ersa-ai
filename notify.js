// api/notify.js — Anonymous report completion ping to Passage
// Fires when a producer completes the ERSA and their report is generated
// Contains NO personal data — band, score, markets, language, timestamp only
// RESEND_API_KEY must be set in Vercel environment variables

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'RESEND_API_KEY not configured' });

  try {
    const { band, score, markets, language, timestamp } = req.body || {};

    const date = new Date(timestamp || Date.now());
    const formatted = date.toLocaleString('en-AU', {
      timeZone: 'Indian/Mauritius',
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const marketList = Array.isArray(markets) ? markets.join(', ') : markets || '—';
    const langLabel = language === 'FR' ? 'French' : 'English';

    const html = `
      <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#1C2B3A">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;font-family:monospace;margin-bottom:20px">Passage Export Group — ERSA</div>
        <h2 style="font-size:22px;font-weight:900;margin:0 0 8px">New Assessment Completed</h2>
        <p style="font-size:14px;color:#64748b;margin:0 0 28px">${formatted} (Mauritius time)</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr style="border-bottom:1px solid #E2E8F0">
            <td style="padding:12px 0;color:#64748b;width:40%">Export Readiness Band</td>
            <td style="padding:12px 0;font-weight:700;color:#1C2B3A">${band || '—'}</td>
          </tr>
          <tr style="border-bottom:1px solid #E2E8F0">
            <td style="padding:12px 0;color:#64748b">Score</td>
            <td style="padding:12px 0;font-weight:700;color:#1C2B3A">${score} / 135</td>
          </tr>
          <tr style="border-bottom:1px solid #E2E8F0">
            <td style="padding:12px 0;color:#64748b">Target Markets</td>
            <td style="padding:12px 0;font-weight:700;color:#1C2B3A">${marketList}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#64748b">Language</td>
            <td style="padding:12px 0;font-weight:700;color:#1C2B3A">${langLabel}</td>
          </tr>
        </table>
        <p style="font-size:12px;color:#94a3b8;margin:28px 0 0;font-family:monospace">No personal data is included in this notification. The producer's name, business, and contact details are not stored by Passage.</p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'ERSA <ersa@passageexport.com>',
        to: ['info@passageexport.com'],
        subject: `ERSA Report Completed — ${band || 'Unknown'} (${score}/135)`,
        html
      })
    });

    if (!response.ok) {
      const e = await response.json();
      return res.status(response.status).json({ error: e.message || 'Resend error' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
