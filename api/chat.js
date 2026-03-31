// api/chat.js — Secure Anthropic API proxy
// ANTHROPIC_API_KEY is set in Vercel environment variables — never in code
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in Vercel environment variables.' });
  try {
    const { messages, system } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1200, system, messages })
    });
    if (!response.ok) { const e = await response.json(); return res.status(response.status).json({ error: e.error?.message || 'Anthropic API error' }); }
    return res.status(200).json(await response.json());
  } catch (e) { return res.status(500).json({ error: 'Internal server error' }); }
}
