// api/send-report.js — Email delivery via Resend
// Required environment variables (set in Vercel dashboard):
//   RESEND_API_KEY — from resend.com
//   PASSAGE_EMAIL  — receiving address for dossier submissions (default: hello@passageexport.com)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return res.status(500).json({ error: 'RESEND_API_KEY not configured.' });

  const passageEmail = process.env.PASSAGE_EMAIL || 'hello@passageexport.com';

  try {
    const { report, producerEmail, producerName, shareChoice, lang } = req.body;
    const fr = lang === 'FR';

    // ── Build HTML report for email ──────────────────────────────────────────
    const bandColors = {
      'Pre-readiness': '#B91C1C', 'Developing': '#B7620A',
      'Near-ready': '#2E86C1',   'Export-ready': '#1A5C38'
    };
    const bandColor = bandColors[report.band] || '#1A3C5E';

    const domainLabels = {
      regulatory: fr ? 'Réglementaire' : 'Regulatory',
      product:    fr ? 'Produit & Marché' : 'Product & Market',
      operations: fr ? 'Opérations' : 'Operations',
      commercial: fr ? 'Commercial' : 'Commercial'
    };

    const domainRows = Object.entries(report.phases || {}).map(([key, d]) => {
      const scoreColor = d.score >= 0.8 * d.max ? '#1A5C38' : d.score >= 0.5 * d.max ? '#2E86C1' : d.score >= 0.25 * d.max ? '#B7620A' : '#B91C1C';
      return `
        <tr>
          <td style="padding:10px 14px;font-weight:700;color:#1a2a3a;border-bottom:1px solid #e2e8f0;">${domainLabels[key] || key}</td>
          <td style="padding:10px 14px;font-weight:900;color:${scoreColor};text-align:center;border-bottom:1px solid #e2e8f0;">${d.score}/${d.max}</td>
          <td style="padding:10px 14px;color:#475569;border-bottom:1px solid #e2e8f0;">${d.summary || ''}</td>
        </tr>
        ${d.gap ? `<tr><td colspan="3" style="padding:6px 14px 12px;"><span style="background:#FEE2E2;color:#B91C1C;font-size:12px;padding:3px 10px;border-radius:4px;">⚠ ${d.gap}</span></td></tr>` : ''}
      `;
    }).join('');

    const priorityRows = (report.topPriorities || []).map((p, i) => `
      <tr><td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;">
        <span style="background:#0D2B45;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;margin-right:10px;">${i+1}</span>
        <span style="color:#334155;">${p}</span>
      </td></tr>
    `).join('');

    const reportHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Georgia,serif;">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;margin-top:32px;margin-bottom:32px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0D2B45,#1A3C5E);padding:32px;">
    <div style="font-size:10px;letter-spacing:0.2em;color:#90CAF9;font-family:monospace;margin-bottom:8px;text-transform:uppercase;">
      ${fr ? 'PASSAGE EXPORT GROUP — RAPPORT ERSA' : 'PASSAGE EXPORT GROUP — ERSA REPORT'}
    </div>
    <div style="font-size:22px;font-weight:900;color:#fff;margin-bottom:4px;">${report.businessName}</div>
    <div style="font-size:14px;color:rgba(255,255,255,0.65);">${report.producerName} · ${report.productRange}</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">
      ${fr ? 'Marchés cibles' : 'Target markets'}: ${(report.targetMarkets || []).join(', ')}
    </div>
  </div>

  <!-- Score banner -->
  <div style="background:${bandColor}12;border-bottom:2px solid ${bandColor}30;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <div style="font-size:11px;font-family:monospace;font-weight:700;color:${bandColor};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">
        ${fr ? 'NIVEAU DE MATURITÉ EXPORT' : 'EXPORT READINESS BAND'}
      </div>
      <div style="font-size:24px;font-weight:900;color:${bandColor};">${report.band}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:44px;font-weight:900;color:${bandColor};line-height:1;">${report.totalScore}</div>
      <div style="font-size:13px;color:#64748b;">/135</div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:28px 32px;">
    <p style="font-size:14px;color:#475569;line-height:1.7;margin-bottom:24px;border-left:3px solid ${bandColor};padding-left:14px;">${report.bandRationale}</p>

    <!-- Phase scores -->
    <div style="font-size:11px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px;">
      ${fr ? 'SCORES PAR PHASE' : 'PHASE SCORES'}
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#EAF0F6;">
          <th style="padding:10px 14px;text-align:left;font-size:12px;color:#1A3C5E;">${fr ? 'Phase' : 'Phase'}</th>
          <th style="padding:10px 14px;text-align:center;font-size:12px;color:#1A3C5E;">${fr ? 'Score' : 'Score'}</th>
          <th style="padding:10px 14px;text-align:left;font-size:12px;color:#1A3C5E;">${fr ? 'Résumé' : 'Summary'}</th>
        </tr>
      </thead>
      <tbody>${domainRows}</tbody>
    </table>

    <!-- Priorities -->
    ${priorityRows ? `
    <div style="font-size:11px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px;">
      ${fr ? 'PRIORITÉS IMMÉDIATES' : 'IMMEDIATE PRIORITIES'}
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <tbody>${priorityRows}</tbody>
    </table>` : ''}

    <!-- Brand guidelines -->
    ${report.packagingGap ? `
    <div style="background:linear-gradient(135deg,#1A3C5E,#2E6DA4);border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:11px;font-family:monospace;font-weight:700;color:#90CAF9;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">
        ${fr ? 'LIGNES DIRECTRICES DE LA MARQUE' : 'BRAND GUIDELINES'}
      </div>
      <div style="font-size:14px;color:#fff;font-weight:700;margin-bottom:6px;">
        ${fr ? 'Directives packaging Passage — Island Creole Cuisine' : 'Passage Packaging Guidelines — Island Creole Cuisine'}
      </div>
      <div style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.7;">
        ${fr
          ? 'Un écart d\'emballage a été identifié. Votre équipe Passage vous enverra les directives complètes de la marque Island Creole Cuisine.'
          : 'A packaging gap has been identified. Your Passage team will send you the full Island Creole Cuisine brand guidelines package.'}
      </div>
    </div>` : ''}

    <!-- Pathway -->
    <div style="background:#F8FAFC;border:2px solid ${bandColor}25;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:11px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">
        ${fr ? 'PARCOURS RECOMMANDÉ' : 'RECOMMENDED PATHWAY'}
      </div>
      <div style="font-size:18px;font-weight:900;color:${bandColor};margin-bottom:6px;">${report.recommendedPathway}</div>
      <div style="font-size:13px;color:#475569;line-height:1.7;margin-bottom:12px;">${report.pathwayRationale}</div>
      <div style="font-size:13px;font-weight:700;color:#0D2B45;">
        ${fr ? '→ Contactez Passage Export Group pour démarrer votre parcours.' : '→ Contact Passage Export Group to begin your pathway.'}
      </div>
      <div style="font-size:12px;color:#64748b;margin-top:4px;font-family:monospace;">hello@passageexport.com</div>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #e2e8f0;padding-top:20px;text-align:center;">
      <div style="font-size:12px;color:#94a3b8;font-style:italic;">
        ${fr ? 'Maurice est là où commence l\'histoire. Island Creole Cuisine est là où elle va.' : 'Mauritius is where the story starts. Island Creole Cuisine is where it goes.'}
      </div>
      <div style="font-size:11px;color:#cbd5e1;margin-top:8px;font-family:monospace;">PASSAGE EXPORT GROUP · passageexport.com</div>
    </div>
  </div>
</div>
</body>
</html>`;

    // ── Send report to producer ───────────────────────────────────────────────
    const producerSubject = fr
      ? `Votre rapport ERSA — ${report.businessName}`
      : `Your ERSA Report — ${report.businessName}`;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: 'ERSA — Passage Export Group <ersa@passageexport.com>',
        to: producerEmail,
        subject: producerSubject,
        html: reportHtml
      })
    });

    // ── Send dossier to Passage if producer opted in ──────────────────────────
    if (shareChoice === 'share' || shareChoice === 'meet') {
      const contactFlag = shareChoice === 'meet'
        ? `<div style="background:#FEF3E2;border:2px solid #B7620A;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
            <strong style="color:#B7620A;">⚑ CONTACT REQUESTED</strong><br>
            <span style="color:#475569;font-size:13px;">This producer has requested a follow-up meeting with Passage. Contact: ${producerEmail}</span>
           </div>`
        : '';

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: 'ERSA — Passage Export Group <ersa@passageexport.com>',
          to: passageEmail,
          subject: `${shareChoice === 'meet' ? '⚑ MEETING REQUESTED — ' : ''}ERSA Submission: ${report.businessName} [${report.band}]`,
          html: contactFlag + reportHtml
        })
      });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('Email error:', e);
    return res.status(500).json({ error: 'Email delivery failed' });
  }
}
