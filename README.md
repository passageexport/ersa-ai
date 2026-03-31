# ERSA v2.0 — Passage Export Group
## AI-Powered Export Readiness Self-Assessment

Built from ERSA Master Document v2.1 (March 2026).

---

## What's new in v2.0

- Full 4-phase, 45-question assessment built from ERSA Master v2.1
- Eligibility gates (Q1 & Q2) — hard pass/fail before scoring begins
- Intro screen with privacy notice
- Intake form collects details before AI conversation begins
- Market-specific labelling questions (AU, UK, France, Canada)
- Three result-sharing options — producer controls whether Passage receives a copy
- Report emailed to producer via Resend
- Optional dossier emailed to Passage (hello@passageexport.com — update before go-live)
- Meeting request flag on Option 3 submissions

---

## Folder structure

```
ersa-v2/
├── api/
│   ├── chat.js           ← Anthropic API proxy (secure)
│   └── send-report.js    ← Email delivery via Resend
├── src/
│   ├── main.jsx          ← React entry point
│   ├── ERSA.jsx          ← Full application
│   └── index.css         ← CSS reset
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## Environment variables (set in Vercel dashboard)

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | From console.anthropic.com |
| `RESEND_API_KEY` | Yes | From resend.com (free up to 3,000 emails/month) |
| `PASSAGE_EMAIL` | No | Defaults to hello@passageexport.com — update to live address |

---

## Deployment steps

### 1. Get API keys
- Anthropic: https://console.anthropic.com → API Keys
- Resend: https://resend.com → API Keys (free tier sufficient)
- Resend: also verify your sending domain (passageexport.com) in the Resend dashboard

### 2. Push to GitHub
- Create a private repository named `passage-ersa`
- Upload all files preserving the folder structure exactly

### 3. Deploy on Vercel
- Go to https://vercel.com → Add New Project
- Select the repository
- Leave all build settings as default (Vite is auto-detected)
- Click Deploy

### 4. Add environment variables
- Vercel dashboard → Your project → Settings → Environment Variables
- Add all three variables above
- Select all environments (Production, Preview, Development)
- Save, then redeploy

### 5. Link from WordPress
- Add a button or menu item pointing to the Vercel URL
- For a custom domain (e.g. ersa.passageexport.com): Vercel → Settings → Domains

---

## Key files to modify

| What to change | Where |
|---|---|
| Assessment logic / AI behaviour | `SYSTEM_PROMPT` constant in `src/ERSA.jsx` |
| Passage receiving email | `PASSAGE_EMAIL` env variable in Vercel |
| Intro screen copy | `screen === "intro"` section in `src/ERSA.jsx` |
| Colour scheme | CSS colour constants at top of `src/ERSA.jsx` |
| Result sharing option text | `options` array in `ShareChoice` component |

---

## Estimated costs

- Vercel: Free tier
- Anthropic API: ~$0.04 per complete assessment. At 100 assessments/month ≈ $4/month
- Resend: Free up to 3,000 emails/month

---

Built for Passage Export Group — March 2026.
