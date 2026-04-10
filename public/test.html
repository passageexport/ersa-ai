<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark">
<style>html,body{background:#0D2B45 !important;margin:0;padding:0;overflow-x:hidden;max-width:100vw}</style>
<title>ERSA v5 — Test Build</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;margin:0;padding:0;font-family:Georgia,serif;color:#fff;background:#0D2B45 !important;overflow-x:hidden}
*{box-sizing:border-box}
.screen{display:none;min-height:100vh;min-height:100dvh;background:#0D2B45 !important;color:#fff}
.screen.active{display:flex;flex-direction:column}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D2B45}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.25);border-radius:3px}
.screen{display:none;min-height:100vh;min-height:100dvh;background:#0D2B45 !important;color:#fff;align-items:center;justify-content:center;padding:24px}
.eyebrow{font-size:10px;letter-spacing:.25em;color:#90CAF9;font-family:monospace;margin-bottom:20px;text-transform:uppercase}
h1{font-size:28px;font-weight:900;margin-bottom:16px;line-height:1.2}
.btn-primary{background:#fff;color:#0D2B45;border:none;border-radius:8px;padding:14px 32px;font-size:15px;font-weight:800;cursor:pointer;font-family:Georgia,serif}
.btn-ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:14px 32px;font-size:15px;font-weight:800;cursor:pointer;font-family:Georgia,serif}
.intake-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:36px 40px;max-width:520px;width:100%}
.field{margin-bottom:18px}
.field label{display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,.6);margin-bottom:6px;letter-spacing:.05em;text-transform:uppercase;font-family:monospace}
.field input{width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:11px 14px;color:#fff;font-size:14px;font-family:Georgia,serif;outline:none}
.field input::placeholder{color:rgba(255,255,255,.25)}
.field input:focus{border-color:rgba(255,255,255,.35)}
.mkt-btn{background:rgba(255,255,255,.07);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:7px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:Georgia,serif;transition:all .2s}
.mkt-btn.on{background:#fff;color:#0D2B45;border-color:#fff}
.start-btn{width:100%;border:none;border-radius:8px;padding:15px;font-size:15px;font-weight:800;font-family:Georgia,serif;transition:all .2s;margin-top:8px}
.start-btn.ready{background:#fff;color:#0D2B45;cursor:pointer}
.start-btn.notready{background:rgba(255,255,255,.1);color:rgba(255,255,255,.3);cursor:default}
#chat-screen{flex-direction:column;padding:0;align-items:stretch;height:100vh}
.chat-header{background:rgba(0,0,0,.3);border-bottom:1px solid rgba(255,255,255,.08);padding:12px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.chat-title{font-size:14px;font-weight:800}
.phase-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);transition:background .4s}
.restart-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);border-radius:6px;padding:6px 12px;font-size:11px;cursor:pointer;font-family:monospace}
#messages{flex:1;overflow-y:auto;padding:24px 24px 16px}
.msg-inner{max-width:680px;margin:0 auto}
.msg-row{margin-bottom:16px;display:flex}
.msg-row.user{justify-content:flex-end}
.ai-avatar{width:28px;height:28px;border-radius:50%;background:#1A3C5E;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:12px;color:#90CAF9;margin-right:10px;flex-shrink:0;margin-top:2px}
.bubble{max-width:78%;padding:12px 16px;font-size:14px;line-height:1.7;white-space:pre-wrap}
.bubble.user{background:rgba(255,255,255,.9);color:#0D2B45;border-radius:16px 16px 4px 16px;font-weight:600}
.bubble.ai{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.88);border-radius:4px 16px 16px 16px}
.typing{display:flex;gap:6px;padding:4px 0}
.dot{width:6px;height:6px;border-radius:50%;background:#90CAF9;animation:pulse 1.2s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
.answers-block{padding-left:38px;margin-bottom:16px}
.ref-card{background:rgba(26,92,56,.15);border:1px solid rgba(26,92,56,.35);border-radius:10px;padding:12px 16px;margin-bottom:10px}
.ref-label{font-size:11px;font-weight:700;color:#6EE7B7;letter-spacing:.06em;text-transform:uppercase;font-family:monospace;margin-bottom:6px}
.ref-title{font-size:13px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:4px}
.ref-desc{font-size:12px;color:rgba(255,255,255,.65);line-height:1.6;margin-bottom:8px}
.ref-link{font-size:12px;font-weight:700;color:#6EE7B7;text-decoration:none}
.ans-btn{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:11px 16px;color:rgba(255,255,255,.88);font-size:14px;text-align:left;cursor:pointer;font-family:Georgia,serif;line-height:1.5;transition:all .15s;margin-bottom:8px;display:block}
.ans-btn:hover:not(.dimmed):not(.selected){background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.4)}
.ans-btn.selected{background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.5)}
.ans-btn.dimmed{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.08);color:rgba(255,255,255,.25);cursor:default}
.ans-btn.submitted{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:rgba(255,255,255,.5);cursor:default}
.ctx-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:12px 14px;margin-top:4px}
.ctx-label{font-size:11px;color:rgba(255,255,255,.5);margin-bottom:8px;font-family:monospace;letter-spacing:.06em;text-transform:uppercase}
.ctx-ta{width:100%;background:transparent;border:none;outline:none;color:rgba(255,255,255,.88);font-size:13px;font-family:Georgia,serif;line-height:1.6;resize:none}
.ctx-ta::placeholder{color:rgba(255,255,255,.25)}
.ctx-actions{display:flex;gap:8px;margin-top:12px}
.skip-btn{flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,.65);font-size:14px;cursor:pointer;font-family:Georgia,serif;padding:12px 16px;border-radius:8px;font-weight:600}
.send-btn{flex:1;border:none;border-radius:8px;padding:12px 16px;font-size:14px;font-weight:700;font-family:Georgia,serif;transition:all .2s}
.send-btn.ready{background:rgba(255,255,255,.9);color:#0D2B45;cursor:pointer}
.send-btn.notready{background:rgba(255,255,255,.15);color:rgba(255,255,255,.3);cursor:default}
.input-bar{padding:16px 24px 24px;border-top:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.2);flex-shrink:0}
.input-inner{max-width:680px;margin:0 auto;display:flex;gap:10px}
.text-input{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;font-family:Georgia,serif;outline:none}
.text-input::placeholder{color:rgba(255,255,255,.25)}
.text-input:focus{border-color:rgba(255,255,255,.35)}
.send-arrow{background:#fff;color:#0D2B45;border:none;border-radius:10px;padding:12px 20px;font-size:16px;font-weight:800;cursor:pointer}
.send-arrow:disabled{background:rgba(255,255,255,.1);color:rgba(255,255,255,.3);cursor:default}
.phases-label{font-size:10px;color:rgba(255,255,255,.25);font-family:monospace;margin-top:8px;max-width:680px;margin-left:auto;margin-right:auto}
.error-msg{background:#FEE2E2;border:1px solid rgba(185,28,28,.4);border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#B91C1C}
#report-screen{flex-direction:column;padding:32px 24px;align-items:center}
.report-wrap{max-width:680px;width:100%}
.report-card{border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.12);margin-bottom:24px}
.rh{background:linear-gradient(135deg,#0D2B45,#1A3C5E);padding:28px 32px}
.rh-eyebrow{font-size:10px;letter-spacing:.2em;color:#90CAF9;font-family:monospace;margin-bottom:8px;text-transform:uppercase}
.rh-biz{font-size:22px;font-weight:900;margin-bottom:4px}
.rh-sub{font-size:14px;color:rgba(255,255,255,.65)}
.band-bar{padding:20px 32px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.band-score{font-size:48px;font-weight:900;line-height:1}
.rb{padding:24px 32px;background:#fff}
.rationale{font-size:14px;color:#475569;line-height:1.7;margin-bottom:24px;border-left:3px solid #ccc;padding-left:14px}
.sec-title{font-size:11px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px}
.ph-row{background:#F8FAFC;border-radius:8px;padding:12px 16px;border:1px solid #e2e8f0;margin-bottom:8px}
.ph-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;font-weight:700}
.bar-wrap{height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px}
.bar-fill{height:100%;border-radius:4px}
.ph-sum{font-size:13px;color:#64748b;line-height:1.6}
.ph-gap{margin-top:6px;font-size:12px;color:#B91C1C;background:#FEE2E2;border-radius:4px;padding:4px 10px;display:inline-block}
.pri-row{display:flex;gap:12px;align-items:flex-start;margin-bottom:8px}
.pri-num{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:#0D2B45;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800}
.pw-box{background:#F8FAFC;border-radius:10px;padding:20px 24px;border:2px solid #ccc}
.pw-name{font-size:18px;font-weight:900;margin-bottom:6px}
.pw-rat{font-size:13px;color:#475569;line-height:1.7;margin-bottom:12px}
.pw-cta{font-size:13px;font-weight:700;color:#0D2B45}
.pw-email{font-size:12px;color:#64748b;font-family:monospace;margin-top:4px}
.new-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);border-radius:8px;padding:10px 24px;font-size:13px;cursor:pointer;font-family:Georgia,serif;width:100%;text-align:center;display:block}
.test-banner{background:#B7620A;color:#fff;text-align:center;padding:6px 12px;font-size:11px;font-family:monospace;letter-spacing:.05em}
@media print {
  body { background: white !important; }
  .test-banner, #lang-screen, #intake-screen, #chat-screen, .new-btn { display: none !important; }
  #report-screen { display: block !important; padding: 0 !important; background: white !important; }
  .report-wrap { max-width: 100% !important; }
  .report-card { border: 1px solid #ccc !important; box-shadow: none !important; }
  /* Force background colours to print for both class-based and inline-styled elements */
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
  .rh { background: #0D2B45 !important; }
  .band-bar, .rb { }
  .bar-fill, .score-bar-fill { }
  .ph-gap { }
}
</style>
</head>
<body>
<div class="test-banner" id="banner">⚠ ERSA v5 TEST BUILD — Not for production use</div>

<!-- LANGUAGE -->
<div class="screen active" id="lang-screen">
  <div style="text-align:center;max-width:480px;width:100%">
    <div class="eyebrow">Passage Export Group</div>
    <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 24px">◈</div>
    <h1>Export Readiness<br>Self-Assessment</h1>
    <p style="font-size:13px;color:rgba(255,255,255,.4);font-style:italic;margin-bottom:36px">Choose your language / Choisissez votre langue</p>
    <div style="display:flex;gap:12px;justify-content:center">
      <button class="btn-primary" onclick="setLang('EN')">English</button>
      <button class="btn-ghost" onclick="setLang('FR')">Français</button>
    </div>
  </div>
</div>

<!-- INTAKE -->
<div class="screen" id="intake-screen">
  <div class="intake-card">
    <div class="eyebrow" id="ie">Your details</div>
    <h1 style="font-size:20px;margin-bottom:24px" id="ih">Before we begin</h1>
    <div class="field"><label id="ln">Your name</label><input id="fn" placeholder="First and last name"></div>
    <div class="field"><label id="lb">Business name</label><input id="fb" placeholder="Your business name"></div>
    <div class="field"><label id="lp">Product range</label><input id="fp" placeholder="e.g. Frozen dal puris, faratas"></div>
    <div class="field"><label id="le">Email address</label><input type="email" id="fe" placeholder="Your email address"></div>
    <div class="field">
      <label id="lm">Target markets</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="mkt-btn" onclick="toggleMkt(this,'Australia')">Australia</button>
        <button class="mkt-btn" onclick="toggleMkt(this,'UK')">UK</button>
        <button class="mkt-btn" onclick="toggleMkt(this,'France')">France</button>
        <button class="mkt-btn" onclick="toggleMkt(this,'Canada')">Canada</button>
        <button class="mkt-btn" onclick="toggleMkt(this,'Other')">Other</button>
      </div>
    </div>
    <button class="start-btn notready" id="sb" onclick="startChat()">Begin the assessment →</button>
  </div>
</div>

<!-- CHAT -->
<div class="screen" id="chat-screen" style="height:calc(100vh - 32px)">
  <div class="chat-header">
    <div>
      <div class="eyebrow" style="margin-bottom:2px">Passage Export Group</div>
      <div class="chat-title" id="ct">ERSA — Assessment in progress</div>
    </div>
    <div style="display:flex;align-items:center;gap:16px">
      <div style="display:flex;gap:6px" id="dots">
        <div class="phase-dot" id="d0"></div><div class="phase-dot" id="d1"></div>
        <div class="phase-dot" id="d2"></div><div class="phase-dot" id="d3"></div>
      </div>
      <button class="restart-btn" onclick="restart()">Restart</button>
    </div>
  </div>
  <!-- Progress bar -->
  <div style="background:rgba(0,0,0,0.2);padding:8px 24px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0">
    <div style="max-width:680px;margin:0 auto;display:flex;align-items:center;gap:12px">
      <div style="flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden">
        <div id="progress-fill" style="height:100%;background:#90CAF9;border-radius:2px;width:0%;transition:width 0.4s ease"></div>
      </div>
      <div id="progress-label" style="font-size:11px;color:rgba(255,255,255,0.4);font-family:monospace;white-space:nowrap;min-width:80px;text-align:right">0 of 45</div>
    </div>
  </div>
  <div id="messages" style="flex:1;overflow-y:auto;padding:24px 24px 16px">
    <div class="msg-inner" id="mi"></div>
  </div>
  <div class="input-bar">
    <div class="input-inner">
      <input class="text-input" id="ti" placeholder="Or type your response…" onkeydown="onKey(event)" oninput="updateArrow()">
      <button class="send-arrow" id="sa" onclick="sendTyped()" disabled>→</button>
    </div>
    <div class="phases-label" id="pl">0/4 phases covered</div>
  </div>
</div>

<!-- REPORT -->
<div class="screen" id="report-screen">
  <div class="report-wrap" id="rw"></div>
</div>

<script>
// API calls route through /api/chat proxy — no key needed in this file

// ── State ────────────────────────────────────────────────────────────────────
let lang="EN", markets=[], messages=[], loading=false, phasesLit=new Set();
let pendingNoAdvance=false;
let storageClassification=null; // "ambient", "chilled", or "frozen" — set when Q08 is answered
const COLD_CHAIN_KEYS=new Set(["Q28","Q29","Q30"]); // skipped for ambient products

// ── System prompt ─────────────────────────────────────────────────────────────
const SYS=`You are the ERSA assessment agent for Passage Export Group — the infrastructure builder for Mauritian food exports and the founding architect of Island Creole Cuisine as a global food category.

You conduct structured export readiness assessments for Mauritian food producers across four phases. You are warm, professional, direct, and knowledgeable. You never use filler phrases. You ask one question at a time and listen carefully.

LANGUAGE: Conduct the entire assessment in the producer's chosen language (English or French). Always address the producer directly using "you" and "your" — never refer to them in the third person as "the producer". The producer is speaking to you directly.

INTAKE DATA: You will receive the producer's name, business name, product range, target markets, and email. Do not ask for these again. Use them to personalise your questions.

ELIGIBILITY GATES: If the answer to Gate Q1 or Gate Q2 is No or Expired, immediately inform the producer they are Not Eligible. Your response MUST contain the exact phrase "Not Eligible" — this is used by the system to stop the assessment. Explain warmly why registration/licensing is a prerequisite, and tell them to please contact Passage directly on hello@passageexport.com. Do not ask any further questions. Do not append any [ERSA_Q] tag. End the conversation there.

COMPULSORY vs DESIRABLE: When identifying gaps, classify each as follows.
COMPULSORY (must be resolved before Passage can coordinate a shipment, or causes importer rejection): GATE1, GATE2, Q01, Q02, Q08, Q09, Q12, Q13, Q15, Q16, Q17, Q18, Q19, Q20, Q21, Q22, Q28 (frozen/chilled only), Q29 (frozen/chilled only), Q38, Q41, Q42.
DESIRABLE (good practice, required for Passage verification, not an immediate shipment blocker): Q03, Q04, Q05, Q06, Q10, Q11, Q14, Q23, Q24, Q25, Q26, Q27, Q30, Q31, Q32, Q33, Q34, Q35, Q36, Q37, Q39, Q40, Q43.

Q07 is a ROUTING QUESTION only — do not list it as a gap. If the answer indicates animal-derived ingredients, set animalDerived:true in the JSON. Do not state specific documentation requirements in the report — the system will display a general warning.

EXPORT HEALTH CERTIFICATE: This document is issued by the Agricultural Marketing Board of Mauritius (or equivalent Mauritian authority). It is NOT issued by the destination country. Always write "Export Health Certificate" in full on first use. Do not imply it is a destination country requirement.

TRACEABILITY (Q05, Q06): Ingredient and batch traceability records are NOT a legal border-refusal trigger. They are a Passage verification requirement and an importer expectation. Do not classify them as Compulsory in gap analysis.

PASSAGE CAN HELP lines: Never reference the EDB or any specific government body. Refer only to Passage's own services, templates, advisory support, or network.

ASSESSMENT STRUCTURE — 4 phases, 45 questions:

PHASE 1 — REGULATORY READINESS
Gate Q1: Is your facility formally registered with the relevant Mauritian local authority?
Gate Q2: Does your facility hold a current, valid food business licence?
Q01: Has your facility ever received an Export Health Certificate from the Ministry of Health & Wellness?
Q02: Based on your facility's current condition, would it meet EHC inspection standards today?
Q03: Does your facility operate under a recognised food safety system? (HACCP / ISO 22000 / Both / Internal only / None)
Q04: Are your Critical Control Points documented, monitored, and recorded?
Q05: Can you trace all ingredients back to their supplier, batch number, and delivery date?
Q06: Can you trace finished goods batches from production through to despatch?

PHASE 2 — PRODUCT & MARKET READINESS
Q07: Does your product contain meat, seafood, dairy, eggs, honey, or other animal-derived ingredients?
Q08: What is your product's storage classification? (Ambient / Chilled / Frozen)
Q09: What is your product's declared shelf life?
Q10: Has your product's shelf life been validated through formal laboratory or documented challenge testing?
Q11: Is your product formulation — recipes, ingredient specs, processing parameters — documented?
Q12: Is your primary packaging food-grade certified and temperature-appropriate?
Q13: Is your secondary/outer packaging suitable for palletised international sea freight — AND do you have a documented carton standard your supplier must match on every reorder?
Q14: Has your product been transported under commercial export freight conditions previously?
Q15: Are all ingredients on your label listed in descending order of weight with sub-ingredients declared?
Q16: Are all major allergens clearly declared on your label?
Q17: Does your label include a Nutrition Information Panel in the format required by your target markets?
Q18: Is the net weight declared in metric units on your label?
Q19: Does your label include a country of origin statement?
Q20: Does your label include the name and address of an importer in the destination market?
Q21: Does your label carry a registered EAN-13 / GS1-compliant barcode?
Q22: Is your label in the required language(s) for your target markets?
Q23: Do you hold editable, print-ready artwork files for your current packaging?

PHASE 3 — OPERATIONS READINESS
Q24: How many units could you allocate to export orders per month, after fulfilling your existing domestic commitments?
Q25: Is your export-available production volume consistent month-on-month?
Q26: If your export demand doubled within 12 months, could your production scale to meet it?
Q27: Do you currently supply retailers, distributors, or foodservice operators? (Select all that apply)
Q28 (chilled/frozen only): Does your facility have dedicated cold storage at the required temperature?
Q29 (chilled/frozen only): Can you maintain an unbroken cold chain from your facility to the port of loading?
Q30 (chilled/frozen only): Have you previously exported chilled or frozen products in a reefer container?
Q31: Is your production process documented — equipment settings, parameters, batch sizes, quality checks?
Q32: Are your key ingredients sourced consistently from the same suppliers under the same specifications?
Q33: Do you conduct systematic quality checks before goods are marked ready for despatch?
Q34: Could you maintain uninterrupted export supply for six months if a major importer doubled their order?

PHASE 4 — COMMERCIAL READINESS
Q35: Have you developed an export price list — separate from your domestic pricing?
Q36: Do you price your export goods on an ex-works or FOB basis?
IMPORTANT FOR Q36: If the answer is Unsure, explain in plain language: Ex-works means your responsibility ends at your factory gate — the buyer arranges all transport from there. FOB means you deliver to the port of loading and responsibility transfers when goods are loaded onto the vessel. Passage's preferred model is FOB. Ask them to confirm which they use or are likely to use. Keep it to 2-3 sentences then show Q36 again.
Q37: Have you defined minimum order quantities for your export products?
Q38: Can your business issue formal commercial invoices in Mauritian Rupees (MUR) with correct registration details?
Q39: What payment terms can your business offer Passage as your export buyer?
Q40: Does your business have sufficient working capital to fund export production in advance — including a potential 60-90 day gap before payment receipt?
Q41: Is your business formally registered with a company number, VAT (if applicable), and a dedicated business bank account?
Q42: Does your business have product liability insurance in place?
Q43: Does your business have a documented food recall procedure?

SCORING: 0=Not in place, 1=Partial/in progress, 2=Adequate, 3=Strong
BANDS (out of 135): 0-33 Pre-Readiness, 34-67 Developing, 68-108 Near-Ready, 109-135 Export-Ready

EFFICIENCY: One question at a time. Target 7-10 minutes total.
PHASE TRANSITIONS: Announce briefly and naturally.

CONTEXT RESPONSES:
When a producer adds context after selecting an answer:
— Incorporate it into scoring silently
— Acknowledge in ONE brief sentence only
— Immediately ask the NEXT question after the acknowledgement
— CRITICAL: The tag at the end of your message MUST match the NEW question you are asking — NOT the question that was just answered. Example: if you acknowledged Q07 and are now asking Q08, the tag MUST be [ERSA_Q:Q08] not [ERSA_Q:Q07].
— Before ending your message, verify: does the tag match the question I just asked? If not, correct it.
— Never omit the tag even in acknowledgement responses.

COMPOUND RISK FLAGGING:
When you detect compound risks (e.g. frozen + partial cold chain + no reefer experience), flag in one sentence: "I want to note that across the last few answers, [risk]. I will compile the full detail in your report." Then move immediately to the next question.

CRITICAL — QUESTION TAGS: After every question you ask, append the EXACT tag for that question as the very last thing in your message. The tag must match the question you just asked — a wrong tag shows the wrong answer buttons to the producer. Use this reference table:

Gate Q1 → [ERSA_Q:GATE1]
Gate Q2 → [ERSA_Q:GATE2]
Q01 (EHC received?) → [ERSA_Q:Q01]
Q02 (EHC inspection ready today?) → [ERSA_Q:Q02]
Q03 (Food safety system?) → [ERSA_Q:Q03]
Q04 (CCPs documented?) → [ERSA_Q:Q04]
Q05 (Ingredient traceability?) → [ERSA_Q:Q05]
Q06 (Batch traceability?) → [ERSA_Q:Q06]
Q07 (Animal-derived ingredients?) → [ERSA_Q:Q07]
Q08 (Storage classification: ambient/chilled/frozen?) → [ERSA_Q:Q08]
Q09 (Declared shelf life?) → [ERSA_Q:Q09]
Q10 (Shelf life validated?) → [ERSA_Q:Q10]
Q11 (Formulation documented?) → [ERSA_Q:Q11]
Q12 (Primary packaging food-grade?) → [ERSA_Q:Q12]
Q13 (Outer carton/carton standard?) → [ERSA_Q:Q13]
Q14 (Export freight experience?) → [ERSA_Q:Q14]
Q15 (Ingredient list order?) → [ERSA_Q:Q15]
Q16 (Allergen declaration?) → [ERSA_Q:Q16]
Q17 (Nutrition panel?) → [ERSA_Q:Q17]
Q18 (Net weight metric?) → [ERSA_Q:Q18]
Q19 (Country of origin?) → [ERSA_Q:Q19]
Q20 (Importer address on label?) → [ERSA_Q:Q20]
Q21 (EAN-13 barcode?) → [ERSA_Q:Q21]
Q22 (Label language?) → [ERSA_Q:Q22]
Q23 (Editable artwork files?) → [ERSA_Q:Q23]
Q24 (Export units per month?) → [ERSA_Q:Q24]
Q25 (Volume consistency?) → [ERSA_Q:Q25]
Q26 (Can production scale?) → [ERSA_Q:Q26]
Q27 (Current customers?) → [ERSA_Q:Q27]
Q28 (Cold storage on site?) → [ERSA_Q:Q28]
Q29 (Cold chain to port?) → [ERSA_Q:Q29]
Q30 (Reefer experience?) → [ERSA_Q:Q30]
Q31 (Production process documented?) → [ERSA_Q:Q31]
Q32 (Ingredient sourcing consistency?) → [ERSA_Q:Q32]
Q33 (Quality checks before despatch?) → [ERSA_Q:Q33]
Q34 (Supply continuity 6 months?) → [ERSA_Q:Q34]
Q35 (Export price list?) → [ERSA_Q:Q35]
Q36 (Ex-works or FOB?) → [ERSA_Q:Q36]
Q37 (MOQs defined?) → [ERSA_Q:Q37]
Q38 (MUR invoicing?) → [ERSA_Q:Q38]
Q39 (Payment terms?) → [ERSA_Q:Q39]
Q40 (Working capital?) → [ERSA_Q:Q40]
Q41 (Business registered?) → [ERSA_Q:Q41]
Q42 (Product liability insurance?) → [ERSA_Q:Q42]
Q43 (Recall procedure?) → [ERSA_Q:Q43]

NEVER use a tag that does not match the question you just asked. Always verify the tag matches the question before ending your message.

FINAL SYNTHESIS: After all phases, output ONLY this JSON:

ERSA_REPORT_JSON:
{"producerName":"","businessName":"","productRange":"","targetMarkets":[],"language":"EN","eligibilityGate":"passed","animalDerived":false,"phases":{"regulatory":{"score":0,"max":18,"summary":"","gaps":[]},"product":{"score":0,"max":51,"summary":"","gaps":[]},"operations":{"score":0,"max":33,"summary":"","gaps":[]},"commercial":{"score":0,"max":27,"summary":"","gaps":[]}},"quickWins":[],"totalScore":0,"band":"Pre-readiness","bandRationale":"","recommendedPathway":"Verification","pathwayRationale":""}`;

// ── Answer options ────────────────────────────────────────────────────────────
const OPTS={
  GATE1:["Yes — registered and compliant","In progress — registration underway","No — not yet registered"],
  GATE2:["Yes — current and valid","Expired — renewal in progress","No — no licence held"],
  Q01:["Yes — Export Health Certificate (EHC) held for at least one product","Not yet — but facility is inspection-ready","Not yet — facility preparation required"],
  Q02:["Yes — facility meets inspection standards","Possibly — some improvements are required before inspection","No — significant preparation is needed before an inspection could be requested"],
  Q03:["HACCP — Hazard Analysis and Critical Control Points","ISO 22000 — Food Safety Management System","Both HACCP and ISO 22000","Internal food safety procedures — not formally certified","No structured food safety system in place"],
  Q04:["Yes — all CCPs documented, monitored, and recorded","Partially — some documentation in place","No — hazard controls are informal or undocumented"],
  Q05:["Yes — full ingredient traceability records maintained","Partially — traceability records incomplete or inconsistent","No — no formal traceability system in place"],
  Q06:["Yes — full batch traceability from production to despatch","Partially — some records maintained but not systematically","No — no finished goods traceability system"],
  Q07:["No — plant-based or mineral ingredients only","Yes — dairy or egg ingredients","Yes — meat or seafood ingredients","Yes — honey or other animal-derived ingredients","Unsure"],
  Q08:["Ambient / shelf-stable — no refrigeration required","Chilled — requires continuous refrigeration (0–5°C)","Frozen — requires continuous freezing (−18°C or below)"],
  Q09:["Less than 3 months","3 – 6 months","6 – 12 months","More than 12 months","I have more than one product and shelf life varies across my range"],
  Q10:["Yes — validated by accredited laboratory testing","Yes — validated through documented internal challenge testing","Partially — informal testing conducted but not formally documented","No — shelf life is estimated, not formally validated"],
  Q11:["Yes — fully documented and version-controlled","Partially — documentation incomplete or informal","No — formulation is undocumented"],
  Q12:["Yes — food-grade certified and temperature-appropriate","Food-grade certified but temperature suitability not confirmed","Not certified — packaging source and specification not verified"],
  Q13:["Yes — outer cartons tested for export conditions and a documented carton standard is in place","Outer cartons are suitable but no formal carton standard documented — packaging sourced ad hoc","Packaging adequate for domestic use but not validated for export freight conditions","No formal outer carton specification — packaging sourced from available market supply"],
  Q14:["Yes — exported successfully to international markets","Yes — exported within the region (e.g. Indian Ocean islands) but not to major export corridors","No — no prior export freight experience"],
  Q15:["Yes — full ingredient declaration including all sub-ingredients","Partially — main ingredients listed but sub-ingredients not fully declared","No — ingredient list incomplete or absent"],
  Q16:["Yes — all allergens clearly declared","Partially — some allergens declared but declaration is incomplete","No — allergen declaration absent or unclear"],
  Q17:["Yes — NIP present and compliant with all target market formats","Partially — NIP present but format does not fully meet target market requirements","No — NIP absent"],
  Q18:["Yes — metric units used (g, kg, ml, or l)","No — non-metric units used or net weight not declared"],
  Q19:["Yes — Product of Mauritius or equivalent statement present","No — country of origin not declared"],
  Q20:["Yes — importer name and address included on label","No — importer details not yet included"],
  Q21:["Yes — registered EAN-13 barcode present on all SKUs","In progress — barcode registration underway","No — no barcode on current packaging"],
  Q22:["English only — suitable for Australia and UK","English and French — suitable for Canada","French (mandatory information) — suitable for France / EU","Current label does not meet any target market language requirement"],
  Q23:["Yes — fully editable artwork files in correct format (AI, EPS, or PDF)","Partially — some files available but not all SKUs covered","No — no editable artwork files available"],
  Q24:["Fewer than 500 units available for export per month","500 – 2,000 units available for export per month","2,000 – 5,000 units available for export per month","5,000 – 20,000 units available for export per month","More than 20,000 units available for export per month"],
  Q25:["Consistent — export-available volumes are stable and predictable","Seasonal variation — volumes fluctuate with ingredient availability or domestic demand cycles","Variable — export-available volumes are irregular and difficult to predict"],
  Q26:["Yes — additional export capacity is readily available","Yes — but would require additional staff or minor equipment investment","Possibly — but would require significant capital investment","No — current production is at or near total capacity"],
  Q27:["International buyers or exporters","National retailers or distributors in Mauritius","Local stores or markets only","Foodservice operators","No — direct to consumers only"],
  Q28:["Yes — dedicated cold storage at required temperature, owned or leased","Partially — cold storage available but shared or insufficient capacity","No — no on-site cold storage"],
  Q29:["Yes — temperature-controlled transport to port in place and documented","Partially — temperature-controlled transport available but not consistently documented","No — cold chain capability between facility and port not yet established"],
  Q30:["Yes — reefer export experience with documented temperature records","Yes — reefer export experience but without formal temperature documentation","No — no prior reefer container export experience"],
  Q31:["Yes — fully documented and followed consistently","Partially — documentation exists but is incomplete or not consistently followed","No — production relies on undocumented knowledge"],
  Q32:["Yes — consistent sourcing from identified suppliers with agreed specifications","Partially — some ingredients sourced consistently, others vary by availability","No — ingredient sourcing varies significantly between batches"],
  Q33:["Yes — systematic quality checks conducted and recorded for every batch","Partially — quality checks conducted but not systematically recorded","No — no formal pre-despatch quality checking process"],
  Q34:["Yes — supply continuity could be maintained","Possibly — with advance notice and production planning","No — current supply chain constraints would prevent this"],
  Q35:["Yes — export price list developed and costed","In progress — export pricing under development","No — no export pricing developed"],
  Q36:["Ex-works — buyer collects from our facility","FOB — we deliver to port of loading, buyer arranges freight from there","We have not yet defined our export pricing basis","Unsure — I'd like to understand more"],
  Q37:["Yes — MOQs defined and aligned with production economics","Partially — MOQs under consideration but not formally set","No — no MOQs defined"],
  Q38:["Yes — invoicing capability in place with registered business details","Partially — invoicing possible but registration details incomplete","No — formal invoicing capability not yet established"],
  Q39:["Payment on delivery — payment required before or on goods despatch","30-day terms — payment within 30 days of invoice","60-day terms — payment within 60 days of invoice","90-day terms — payment within 90 days of invoice"],
  Q40:["Yes — working capital sufficient to fund export production in advance","Partially — limited working capital; order sizes would need to be managed carefully","No — working capital constraint would prevent taking export orders without advance payment"],
  Q41:["Yes — fully registered with company number, VAT, and business bank account","Partially — registered but some elements incomplete","No — operating informally without formal registration"],
  Q42:["Yes — product liability insurance in place","In progress — insurance being arranged","No — no product liability insurance"],
  Q43:["Yes — documented recall procedure in place and staff are trained on it","Partially — procedure exists but is not formally documented or tested","No — no recall procedure in place"],
};

const OPTS_FR={
  GATE1:["Oui — enregistrée et conforme","En cours — enregistrement en cours","Non — pas encore enregistrée"],
  GATE2:["Oui — valide et à jour","Expirée — renouvellement en cours","Non — aucune licence détenue"],

  Q01:["Oui — Certificat sanitaire à l'exportation (CSE) obtenu pour au moins un produit","Pas encore — mais l'installation est prête pour une inspection","Pas encore — préparation de l'installation requise"],

  Q02:["Oui — l'installation répond aux normes d'inspection","Peut-être — des améliorations sont nécessaires avant l'inspection","Non — une préparation importante est nécessaire avant de demander une inspection"],

  Q03:["HACCP","ISO 22000","HACCP et ISO 22000","Procédures internes — sans certification formelle","Aucun système structuré en place"],

  Q04:["Oui — tous les CCP documentés, surveillés et enregistrés","Partiellement — certaine documentation en place","Non — les contrôles sont informels ou non documentés"],

  Q05:["Oui — traçabilité complète des ingrédients","Partiellement — enregistrements incomplets","Non — aucun système formel de traçabilité"],

  Q06:["Oui — traçabilité complète des lots à l'expédition","Partiellement — certains enregistrements maintenus","Non — aucun système de traçabilité des produits finis"],

  Q07:["Non — ingrédients d'origine végétale ou minérale uniquement","Oui — ingrédients laitiers ou œufs","Oui — viande ou fruits de mer","Oui — miel ou autres ingrédients d'origine animale","Incertain"],

  Q08:["Ambiant / stable — aucune réfrigération requise","Réfrigéré (0–5°C)","Congelé (−18°C ou moins)"],

  Q09:["Moins de 3 mois","3 – 6 mois","6 – 12 mois","Plus de 12 mois","J'ai plusieurs produits et la durée de conservation varie selon chaque produit"],

  Q10:["Oui — validée par laboratoire accrédité","Oui — validée par tests internes documentés","Partiellement — tests informels non documentés formellement","Non — durée de conservation estimée, non validée"],

  Q11:["Oui — entièrement documentée et sous contrôle de version","Partiellement — documentation incomplète","Non — formulation non documentée"],

  Q12:["Oui — certifié alimentaire et adapté à la température","Certifié alimentaire mais aptitude thermique non confirmée","Non certifié — spécification non vérifiée"],

  Q13:["Oui — cartons testés et norme documentée en place","Cartons adaptés mais aucune norme formelle — approvisionnement ad hoc","Emballage adapté nationalement mais non validé pour l'export","Aucune spécification formelle — approvisionnement selon disponibilité"],

  Q14:["Oui — exporté avec succès vers des marchés internationaux","Oui — exporté dans la région mais pas vers les marchés principaux","Non — aucune expérience préalable d'export"],

  Q15:["Oui — déclaration complète incluant tous les sous-ingrédients","Partiellement — ingrédients principaux listés mais sous-ingrédients incomplets","Non — liste incomplète ou absente"],

  Q16:["Oui — tous les allergènes clairement déclarés","Partiellement — déclaration incomplète","Non — déclaration absente ou peu claire"],

  Q17:["Oui — tableau nutritionnel conforme à tous les marchés","Partiellement — format non entièrement conforme","Non — tableau absent"],

  Q18:["Oui — unités métriques (g, kg, ml ou l)","Non — unités non métriques ou poids net absent"],

  Q19:["Oui — mention Produit de Maurice présente","Non — pays d'origine non déclaré"],

  Q20:["Oui — nom et adresse de l'importateur inclus","Non — coordonnées non encore incluses"],

  Q21:["Oui — code-barres EAN-13 enregistré sur toutes les références","En cours — enregistrement en cours","Non — aucun code-barres"],

  Q22:["Anglais uniquement — Australie et Royaume-Uni","Anglais et français — Canada","Français — France / UE","L'étiquette ne répond aux exigences d'aucun marché cible"],

  Q23:["Oui — fichiers artwork modifiables au bon format","Partiellement — certains fichiers disponibles","Non — aucun fichier artwork modifiable"],

  Q24:["Moins de 500 unités/mois","500 – 2 000 unités/mois","2 000 – 5 000 unités/mois","5 000 – 20 000 unités/mois","Plus de 20 000 unités/mois"],

  Q25:["Constant — volumes stables et prévisibles","Variation saisonnière","Variable — irrégulier et difficile à prévoir"],

  Q26:["Oui — capacité supplémentaire disponible","Oui — mais nécessiterait personnel ou équipement supplémentaire","Peut-être — investissement important requis","Non — capacité maximale atteinte"],

  Q27:["Acheteurs internationaux ou exportateurs","Détaillants ou distributeurs nationaux à l'île Maurice","Magasins ou marchés locaux uniquement","Opérateurs de restauration","Non — vente directe aux consommateurs uniquement"],

  Q28:["Oui — stockage froid dédié","Partiellement — stockage partagé ou insuffisant","Non — aucun stockage froid sur site"],

  Q29:["Oui — transport à température contrôlée documenté","Partiellement — transport disponible mais non documenté systématiquement","Non — chaîne du froid vers le port non établie"],

  Q30:["Oui — avec enregistrements de température","Oui — sans documentation formelle de température","Non — aucune expérience de conteneur frigorifique"],

  Q31:["Oui — entièrement documenté et suivi","Partiellement — documentation incomplète ou non suivie","Non — production basée sur connaissances non documentées"],

  Q32:["Oui — approvisionnement constant avec spécifications convenues","Partiellement — certains ingrédients constants, d'autres variables","Non — approvisionnement varie significativement"],

  Q33:["Oui — contrôles systématiques enregistrés pour chaque lot","Partiellement — contrôles effectués mais non enregistrés","Non — aucun processus formel de contrôle"],

  Q34:["Oui — continuité possible","Peut-être — avec préavis et planification","Non — contraintes actuelles empêcheraient cela"],

  Q35:["Oui — liste de prix export développée","En cours","Non — aucune tarification export"],

  Q36:["Ex-works — l'acheteur collecte depuis notre installation","FOB — nous livrons au port de chargement, l'acheteur organise le fret ensuite","Nous n'avons pas encore défini notre base de tarification export","Je ne suis pas sûr(e) — j'aimerais en savoir plus"],

  Q37:["Oui — MOQ définis","Partiellement — MOQ à l'étude","Non — aucun MOQ défini"],

  Q38:["Oui — facturation en MUR avec coordonnées enregistrées","Partiellement — facturation possible mais coordonnées incomplètes","Non — capacité de facturation non établie"],

  Q39:["Paiement à la livraison","Délai de 30 jours","Délai de 60 jours","Délai de 90 jours"],

  Q40:["Oui — fonds de roulement suffisant","Partiellement — fonds limités, commandes à gérer soigneusement","Non — contrainte de fonds de roulement"],

  Q41:["Oui — entièrement enregistrée avec numéro, TVA et compte bancaire","Partiellement — enregistrée mais incomplète","Non — opérant informellement"],

  Q42:["Oui — assurance en place","En cours","Non — aucune assurance"],

  Q43:["Oui — procédure documentée et personnel formé","Partiellement — procédure existante mais non documentée formellement","Non — aucune procédure de rappel"],
};

const TELL_US_MORE=new Set(["GATE1","GATE2","Q02","Q03","Q04","Q05","Q06","Q10","Q11","Q12","Q13","Q14","Q16","Q17","Q21","Q22","Q23","Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34","Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"]);
const AUTO_CTX=new Set(["I have more than one product and shelf life varies across my range","J'ai plusieurs produits et la durée de conservation varie selon chaque produit"]);
// Q27 allows multiple selections before submitting
const MULTI_SELECT=new Set(["Q27"]);
// When these options are selected, the AI response is explanatory — do not advance question sequence
const NO_ADVANCE_OPTIONS=new Set(["Unsure — I'd like to understand more","Je ne suis pas sûr(e) — j'aimerais en savoir plus"]);
const REFS={
  Q16:{title:"Allergen declaration requirements",desc:"The full list of declarable allergens differs by market. Check the guide before answering."},
  Q17:{title:"Nutrition panel format by market",desc:"Each target market requires a different nutrition panel format."},
  Q19:{title:"Country of origin wording",desc:"Each market has specific requirements for country of origin declaration."},
  Q21:{title:"GS1 barcode registration",desc:"All four markets require a registered EAN-13 GS1 barcode."},
  Q22:{title:"Label language requirements",desc:"AU/UK = English; Canada = bilingual EN/FR mandatory; France = French mandatory."},
};
const BAND={
  "Pre-readiness":{c:"#B91C1C",bg:"#FEE2E2",l:"Pre-Readiness"},
  "Developing":{c:"#B7620A",bg:"#FEF3E2",l:"Developing"},
  "Near-ready":{c:"#2E86C1",bg:"#EBF5FB",l:"Near-Ready"},
  "Export-ready":{c:"#1A5C38",bg:"#EAFAF1",l:"Export-Ready"},
};
const PW={
  "Incubation":{c:"#B91C1C",d:"Passage Supplier Incubation Programme"},
  "Product Development Services":{c:"#B7620A",d:"Passage Product Development Services"},
  "Targeted Verification":{c:"#2E86C1",d:"Targeted Gap Remediation + Verification"},
  "Verification":{c:"#1A5C38",d:"Passage Supplier Verification"},
};
const PHC=["#1A3C5E","#1A5C38","#B7620A","#6B21A8"];

// ── Question sequence — the ground truth ─────────────────────────────────────
// The order is fixed. We track position ourselves and use the AI tag only
// as a cross-check. If the tag is missing or wrong, we still know where we are.
const Q_SEQUENCE = [
  "GATE1","GATE2",
  "Q01","Q02","Q03","Q04","Q05","Q06",
  "Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15",
  "Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23",
  "Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34",
  "Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"
];
let currentQIndex = -1; // -1 = not started

function advanceQuestion(tagFromAI) {
  // If AI provided a valid tag that moves forward, use it
  if(tagFromAI && Q_SEQUENCE.includes(tagFromAI)){
    const tagIdx = Q_SEQUENCE.indexOf(tagFromAI);
    if(tagIdx > currentQIndex) {
      // Block cold chain questions for ambient products regardless of AI tag
      if(storageClassification==="ambient" && COLD_CHAIN_KEYS.has(tagFromAI)){
        currentQIndex = Q_SEQUENCE.indexOf("Q31");
        return "Q31";
      }
      currentQIndex = tagIdx;
      return tagFromAI;
    }
  }
  // AI tag missing or wrong — advance by one, skipping cold chain if ambient
  let next = currentQIndex + 1;
  while(next < Q_SEQUENCE.length && storageClassification==="ambient" && COLD_CHAIN_KEYS.has(Q_SEQUENCE[next])){
    next++;
  }
  currentQIndex = Math.min(next, Q_SEQUENCE.length - 1);
  return Q_SEQUENCE[currentQIndex];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const fr = () => lang==="FR";
function detectQ(t){
  // Return the LAST tag found — handles acknowledgement + question combined messages
  const all=[...t.matchAll(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g)];
  if(!all.length) return null;
  return all[all.length-1][1];
}
function cleanMsg(t){ return t.replace(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g,"").trim(); }
function parseReport(t){ const i=t.indexOf("ERSA_REPORT_JSON:"); if(i<0)return null; try{ const s=t.slice(i+17).trim(); return JSON.parse(s.slice(0,s.lastIndexOf("}")+1)); }catch{return null;} }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function showScreen(id){ document.querySelectorAll(".screen").forEach(s=>s.style.display="none"); $(id).style.display="flex"; }
function scrollToBottom(delay){ setTimeout(()=>{ const m=$("messages"); if(m){m.scrollTop=m.scrollHeight;} },delay||80); }

// ── Language & intake ─────────────────────────────────────────────────────────
function setLang(l){
  lang=l;
  if(fr()){
    $("ie").textContent="Vos coordonnées"; $("ih").textContent="Avant de commencer";
    $("ln").textContent="Votre nom"; $("lb").textContent="Nom de l'entreprise";
    $("lp").textContent="Gamme de produits"; $("le").textContent="Adresse e-mail";
    $("lm").textContent="Marchés cibles"; $("sb").textContent="Commencer l'évaluation →";
    $("ti").placeholder="Ou tapez votre réponse…";
    $("ct").textContent="ERSA — Évaluation en cours";
  }
  showScreen("intake-screen");
  ["fn","fb","fp","fe"].forEach(id=>$(id).addEventListener("input",checkReady));
}
let mkts=[];
function toggleMkt(btn,m){ btn.classList.toggle("on"); mkts=mkts.includes(m)?mkts.filter(x=>x!==m):[...mkts,m]; checkReady(); }
function checkReady(){
  const ok=$("fn").value.trim()&&$("fb").value.trim()&&$("fp").value.trim()&&$("fe").value.trim()&&mkts.length>0;
  $("sb").className="start-btn "+(ok?"ready":"notready");
}

// ── Chat start ────────────────────────────────────────────────────────────────
async function startChat(){
  const name=$("fn").value.trim(),biz=$("fb").value.trim(),prod=$("fp").value.trim(),email=$("fe").value.trim();
  if(!name||!biz||!prod||!email||!mkts.length) return;
  showScreen("chat-screen");
  $("chat-screen").style.display="flex";
  $("mi").innerHTML="";
  messages=[];
  const opening=fr()
    ?`Bonjour. Je m'appelle ${name}. Mon entreprise s'appelle ${biz}. Produits : ${prod}. Marchés : ${mkts.join(", ")}. Prêt(e).`
    :`Hello. My name is ${name}. My business is ${biz}. Products: ${prod}. Target markets: ${mkts.join(", ")}. Ready to begin.`;
  messages.push({role:"user",content:opening});
  setLoading(true);
  await callAPI();
}

// ── API ───────────────────────────────────────────────────────────────────────
async function callAPI(){
  try{
    const res=await fetch("/api/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({messages:messages.map(m=>({role:m.role,content:m.content})),system:SYS})
    });
    if(!res.ok) throw new Error(res.status);
    const data=await res.json();
    const reply=data.content?.[0]?.text||"";
    const report=parseReport(reply);
    if(report){ setLoading(false); renderReport(report); return; }
    // Gate-fail detection — suppress all buttons, show restart only
    const replyLower=reply.toLowerCase();
    const isGateFail=(replyLower.includes("not eligible")||replyLower.includes("non éligible")||replyLower.includes("pas éligible"))
      && currentQIndex<=1;
    const tagFromAI=detectQ(reply);
    let qKey;
    if(isGateFail){
      qKey=null; // no buttons
    } else if(pendingNoAdvance){
      pendingNoAdvance=false;
      qKey=Q_SEQUENCE[currentQIndex];
    } else {
      qKey=advanceQuestion(tagFromAI);
    }
    const clean=cleanMsg(reply);
    messages.push({role:"assistant",content:clean,questionKey:qKey});
    setLoading(false);
    appendAIMessage(clean,qKey,isGateFail);
    updatePhases(clean);
  } catch(e){
    setLoading(false);
    appendError(fr()?"Erreur de connexion. Veuillez réessayer.":"Connection error. Please try again.");
  }
}

// ── Key message rendering principle:
// Each message is appended ONCE to the DOM and never rebuilt.
// Answer buttons are appended once per question and locked after submission.
// This prevents duplicate context boxes entirely.

function appendUserBubble(text){
  const mi=$("mi");
  const row=document.createElement("div");
  row.className="msg-row user";
  row.innerHTML=`<div class="bubble user">${esc(text)}</div>`;
  mi.appendChild(row);
  scrollToBottom();
}

// ── Question number helpers ───────────────────────────────────────────────────
function qKeyToNum(qKey){
  if(!qKey) return null;
  if(qKey==="GATE1") return 1;
  if(qKey==="GATE2") return 2;
  const m=qKey.match(/Q(\d{2})/);
  if(m) return parseInt(m[1])+2;
  return null;
}
function updateProgress(qKey){
  const n=qKeyToNum(qKey);
  if(!n) return;
  const pct=Math.round((n/45)*100);
  $("progress-fill").style.width=pct+"%";
  $("progress-label").textContent=n+" of 45";
}

function appendAIMessage(text,qKey,isGateFail){
  const mi=$("mi");
  const row=document.createElement("div");
  row.className="msg-row ai";

  function formatMessageText(rawText){
    let parts = rawText.split(/\n+/).map(p=>p.trim()).filter(p=>p.length>0);
    if(parts.length===1 && parts[0].includes("?")){
      const text=parts[0];
      const lastQ=text.lastIndexOf("?");
      let splitAt=-1;
      for(let i=lastQ-1;i>10;i--){
        if((text[i]==="."||text[i]==="!") && text[i+1]===" " && text[i+2]===text[i+2].toUpperCase()){
          splitAt=i;
          break;
        }
      }
      if(splitAt>10){
        const before=text.slice(0,splitAt+1).trim();
        const after=text.slice(splitAt+1).trim();
        if(before && after) parts=[before,after];
      }
    }
    if(parts.length<=1) return `<p style="margin:0">${esc(rawText)}</p>`;
    return parts.map(p=>`<p style="margin:0 0 10px 0">${esc(p)}</p>`).join('');
  }

  let displayText = formatMessageText(text);

  if(qKey && qKey!=="GATE1" && qKey!=="GATE2"){
    const num=qKeyToNum(qKey);
    if(num){
      displayText=`<span style="font-size:11px;font-weight:700;color:#90CAF9;font-family:monospace;display:block;margin-bottom:6px;letter-spacing:0.06em">Question ${num} of 45</span>${displayText}`;
    }
  }
  row.innerHTML=`<div class="ai-avatar">◈</div><div class="bubble ai" style="white-space:normal">${displayText}</div>`;
  mi.appendChild(row);

  // Gate-fail: show only restart button, no assessment buttons
  if(isGateFail){
    const restartWrap=document.createElement("div");
    restartWrap.style.cssText="padding-left:38px;margin-bottom:16px;margin-top:8px";
    const restartBtn=document.createElement("button");
    restartBtn.className="ans-btn";
    restartBtn.style.cssText="width:100%;padding:14px 16px;font-size:14px;text-align:center;color:rgba(255,255,255,0.7)";
    restartBtn.textContent=fr()?"← Recommencer l'évaluation":"← Restart assessment";
    restartBtn.onclick=()=>restart();
    restartWrap.appendChild(restartBtn);
    mi.appendChild(restartWrap);
  } else if(qKey){
    // Normal answer buttons
    const opts=(fr() ? (OPTS_FR[qKey]||OPTS[qKey]) : OPTS[qKey])||[];
    if(opts.length>0){
      const block=buildAnswerBlock(qKey);
      mi.appendChild(block);
    } else {
      const fallback=document.createElement("div");
      fallback.style.cssText="padding-left:38px;margin-bottom:16px";
      fallback.innerHTML=`<div style="font-size:12px;color:rgba(255,255,255,0.45);font-family:monospace;padding:8px 12px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.1)">${fr()?"Tapez votre réponse ci-dessous ↓":"Type your response below ↓"}</div>`;
      mi.appendChild(fallback);
      setTimeout(()=>{ $("ti").focus(); $("ti").style.borderColor="rgba(255,255,255,0.5)"; setTimeout(()=>$("ti").style.borderColor="",2000); },100);
    }
  }
  updateProgress(qKey);
  scrollToBottom();
  // Extra delayed scroll to ensure buttons are fully rendered before scrolling
  scrollToBottom(300);
}

function appendTyping(){
  const mi=$("mi");
  const t=document.createElement("div");
  t.id="typing-row";
  t.className="msg-row ai";
  t.innerHTML=`<div class="ai-avatar">◈</div><div class="bubble ai"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
  mi.appendChild(t);
  scrollToBottom();
}

function removeTyping(){ const t=$("typing-row"); if(t)t.remove(); }

function appendError(msg){
  const mi=$("mi");
  const e=document.createElement("div");
  e.className="error-msg";
  e.textContent="⚠ "+msg;
  mi.appendChild(e);
  scrollToBottom();
}

// ── Answer block — built once, locked on submit ───────────────────────────────
function buildAnswerBlock(qKey){
  const block=document.createElement("div");
  block.className="answers-block";
  const isMulti=MULTI_SELECT.has(qKey);

  // Reference card
  const rc=REFS[qKey];
  if(rc){
    const rcard=document.createElement("div");
    rcard.className="ref-card";
    rcard.innerHTML=`<div class="ref-label">${fr()?"Guide de référence":"Reference guide"}</div><div class="ref-title">${rc.title}</div><div class="ref-desc">${rc.desc}</div><a class="ref-link" href="https://passageexport.com/export-labelling" target="_blank">${fr()?"Voir le guide →":"View guide →"}</a>`;
    block.appendChild(rcard);
  }

  if(isMulti){
    // Multi-select instruction label
    const instrEl=document.createElement("div");
    instrEl.style.cssText="font-size:11px;color:rgba(255,255,255,0.5);font-family:monospace;margin-bottom:8px;letter-spacing:0.04em";
    instrEl.textContent=fr()?"Sélectionnez tout ce qui s'applique, puis confirmez":"Select all that apply, then confirm";
    block.appendChild(instrEl);
  }

  const opts=(fr() ? (OPTS_FR[qKey]||OPTS[qKey]) : OPTS[qKey])||[];
  let chosen=null; // single select
  let chosenMulti=new Set(); // multi select
  let ctxBox=null;
  let confirmBtn=null;

  function lockBlock(displayText){
    block.querySelectorAll(".ans-btn").forEach(b=>{ b.className="ans-btn submitted"; b.onclick=null; });
    if(ctxBox){ ctxBox.remove(); ctxBox=null; }
    if(confirmBtn){ confirmBtn.remove(); confirmBtn=null; }
  }

  function doSubmit(opt,ctx){
    const msg=ctx?`${opt}\n\n${fr()?"Contexte supplémentaire":"Additional context"}: ${ctx}`:opt;
    lockBlock(opt);
    // Track if this option should suppress sequence advance
    if(NO_ADVANCE_OPTIONS.has(opt)) pendingNoAdvance=true;
    sendMessage(msg);
  }

  function showCtxBox(opt){
    if(ctxBox){ ctxBox.remove(); ctxBox=null; }
    const isAuto=AUTO_CTX.has(opt);
    const box=document.createElement("div");
    box.className="ctx-box";
    const ctxLabel=isAuto
      ?(fr()?"Veuillez décrire la durée de conservation de chaque produit":"Please describe the shelf life of each product")
      :(fr()?"Contexte supplémentaire (optionnel)":"Tell us more (optional)");
    const ctxPh=isAuto
      ?(fr()?"Ex: Produit A = 12 mois…":"e.g. Product A = 12 months, Product B = 6 months…")
      :(fr()?"Ajoutez des détails utiles…":"Add any details that might be useful…");
    box.innerHTML=`<div class="ctx-label">${ctxLabel}</div><textarea class="ctx-ta" rows="${isAuto?3:2}" placeholder="${ctxPh}"></textarea><div class="ctx-actions">${!isAuto?`<button class="skip-btn">${fr()?"Passer":"Skip"}</button>`:""}<button class="send-btn ${isAuto?"notready":"ready"}">${fr()?"Envoyer →":"Send →"}</button></div>`;
    ctxBox=box;
    block.appendChild(box);
    const ta=box.querySelector(".ctx-ta");
    const sendBtn=box.querySelector(".send-btn");
    const skipBtn=box.querySelector(".skip-btn");
    if(isAuto){ ta.addEventListener("input",()=>{ sendBtn.className=ta.value.trim()?"send-btn ready":"send-btn notready"; }); }
    sendBtn.onclick=()=>{ if(isAuto&&!ta.value.trim())return; doSubmit(opt,ta.value.trim()); };
    if(skipBtn) skipBtn.onclick=()=>doSubmit(opt,"");
    setTimeout(()=>{ 
      box.scrollIntoView({behavior:"smooth",block:"nearest"});
      ta.focus(); 
    },100);
  }

  opts.forEach(opt=>{
    const btn=document.createElement("button");
    btn.className="ans-btn";
    btn.dataset.opt=opt;
    btn.textContent=opt;

    if(isMulti){
      btn.onclick=()=>{
        if(loading) return;
        // Toggle selection
        if(chosenMulti.has(opt)){
          chosenMulti.delete(opt);
          btn.className="ans-btn";
          btn.textContent=opt;
        } else {
          // Deselect "No" if other options chosen, or deselect others if "No" chosen
          if(opt.startsWith("No")){ chosenMulti.clear(); block.querySelectorAll(".ans-btn").forEach(b=>{ b.className="ans-btn"; b.textContent=b.dataset.opt; }); }
          else { if(chosenMulti.has("No — direct to consumers only")){ chosenMulti.delete("No — direct to consumers only"); block.querySelectorAll(".ans-btn").forEach(b=>{ if(b.dataset.opt.startsWith("No")){ b.className="ans-btn"; b.textContent=b.dataset.opt; }}); }}
          chosenMulti.add(opt);
          btn.className="ans-btn selected";
          btn.textContent="✓ "+opt;
        }
        // Show/hide confirm button
        if(chosenMulti.size>0){
          if(!confirmBtn){
            confirmBtn=document.createElement("button");
            confirmBtn.className="send-btn ready";
            confirmBtn.style.cssText="width:100%;margin-top:8px;padding:11px 16px;font-size:14px;border-radius:10px";
            confirmBtn.textContent=fr()?"Confirmer la sélection →":"Confirm selection →";
            confirmBtn.onclick=()=>{
              const answer="We supply: "+[...chosenMulti].join(", ");
              lockBlock(answer);
              sendMessage(answer);
            };
            block.appendChild(confirmBtn);
          }
        } else {
          if(confirmBtn){ confirmBtn.remove(); confirmBtn=null; }
        }
        scrollToBottom();
      };
    } else {
      btn.onclick=()=>{
        if(loading) return;
        if(chosen===opt){
          // Deselect
          chosen=null;
          btn.className="ans-btn";
          btn.textContent=opt;
          if(ctxBox){ ctxBox.remove(); ctxBox=null; }
          return;
        }
        chosen=opt;
        block.querySelectorAll(".ans-btn").forEach(b=>{
          b.className=b.dataset.opt===opt?"ans-btn selected":"ans-btn dimmed";
          if(b.dataset.opt===opt) b.textContent="✓ "+opt;
          else b.textContent=b.dataset.opt;
        });
        const showCtx=TELL_US_MORE.has(qKey)||AUTO_CTX.has(opt);
        if(showCtx){ showCtxBox(opt); }
        else { doSubmit(opt,""); }
      };
    }
    block.appendChild(btn);
  });

  return block;
}

// ── Send message ──────────────────────────────────────────────────────────────
async function sendMessage(text){
  if(!text.trim()||loading) return;
  // Detect storage classification from Q08 answer
  if(Q_SEQUENCE[currentQIndex]==="Q08"){
    const t=text.toLowerCase();
    if(t.includes("ambient")||t.includes("shelf-stable")||t.includes("shelf stable")) storageClassification="ambient";
    else if(t.includes("chilled")) storageClassification="chilled";
    else if(t.includes("frozen")) storageClassification="frozen";
  }
  messages.push({role:"user",content:text});
  appendUserBubble(text);
  setLoading(true);
  await callAPI();
}

function sendTyped(){ const v=$("ti").value.trim(); if(v) sendMessage(v); $("ti").value=""; updateArrow(); }
function onKey(e){ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendTyped();} }
function updateArrow(){ $("sa").disabled=!$("ti").value.trim()||loading; }

// ── Loading ───────────────────────────────────────────────────────────────────
function setLoading(val){
  loading=val;
  $("sa").disabled=val;
  if(val) appendTyping();
  else removeTyping();
}

// ── Phase dots ────────────────────────────────────────────────────────────────
const dotColors=["#1A3C5E","#1A5C38","#B7620A","#6B21A8"];
function updatePhases(text){
  const t=text.toLowerCase();
  if(t.match(/registr|licen|haccp|certif|traceab|export health|ehs|ehc/)) phasesLit.add(0);
  if(t.match(/shelf.?life|packag|label|allergen|barcode|nutrition|ingredient|frozen|chilled|ambient/)) phasesLit.add(1);
  if(t.match(/capac|cold.?chain|reefer|quality.?check|supply|dispatch|despatch/)) phasesLit.add(2);
  if(t.match(/pric|payment|invoice|moq|working.?capital|insur|recall/)) phasesLit.add(3);
  for(let i=0;i<4;i++){
    const d=$("d"+i);
    d.style.background=phasesLit.has(i)?dotColors[i]:"rgba(255,255,255,0.2)";
  }
  $("pl").textContent=phasesLit.size+"/4 "+(fr()?"phases couvertes":"phases covered");
}

// ── Report ────────────────────────────────────────────────────────────────────
function renderReport(report){
  showScreen("report-screen");
  $("report-screen").style.display="flex";
  $("banner").style.display="none";
  // Store report globally for Q&A print
  window._ersaReport=report;
  // Calculate band from score — do not trust AI band field
  const totalScoreNum=parseInt(report.totalScore)||0;
  const derivedBand=totalScoreNum>=109?"Export-ready":totalScoreNum>=68?"Near-ready":totalScoreNum>=34?"Developing":"Pre-readiness";
  const b=BAND[derivedBand]||BAND["Developing"];
  // Override report.band so email body also reflects correct band
  report.band=derivedBand;
  const p=PW[report.recommendedPathway]||PW["Verification"];
  const isFr=fr();
  const phaseKeys=[
    {k:"regulatory",l:isFr?"Phase 1 — Conformité réglementaire":"Phase 1 — Regulatory Readiness",max:18,c:PHC[0]},
    {k:"product",l:isFr?"Phase 2 — Produit & marché":"Phase 2 — Product & Market Readiness",max:51,c:PHC[1]},
    {k:"operations",l:isFr?"Phase 3 — Opérations":"Phase 3 — Operations Readiness",max:33,c:PHC[2]},
    {k:"commercial",l:isFr?"Phase 4 — Aspects commerciaux":"Phase 4 — Commercial Readiness",max:27,c:PHC[3]}
  ];
  // Band scale segments
  const bandOrder=["Pre-readiness","Developing","Near-ready","Export-ready"];
  const bandFlex=[33,34,41,27];
  const bandLabels=isFr
    ?["Pré-maturité|0–33","En développement|34–67","Quasi-prêt|68–108","Prêt à l'export|109–135"]
    :["Pre-Readiness|0–33","Developing|34–67","Near-Ready|68–108","Export-Ready|109–135"];
  const bandColors={"Pre-readiness":"#B91C1C","Developing":"#B7620A","Near-ready":"#2E86C1","Export-ready":"#1A5C38"};
  const currentBandIdx=bandOrder.indexOf(report.band);
  let scaleSegs="";
  bandOrder.forEach((bk,i)=>{
    const isActive=i===currentBandIdx;
    const col=bandColors[bk]||(i<currentBandIdx?"#94a3b8":"#E2E8F0");
    const op=isActive?"1":"0.35";
    scaleSegs+=`<div style="flex:${bandFlex[i]};background:${col};opacity:${op};border-radius:2px;height:10px"></div>`;
  });
  let scaleLabels="";
  bandLabels.forEach((lbl,i)=>{
    const isActive=i===currentBandIdx;
    const lines=lbl.split("|");
    scaleLabels+=`<div style="font-size:10px;font-family:monospace;text-align:center;color:${isActive?bandColors[bandOrder[i]]:"#94a3b8"};font-weight:${isActive?"700":"400"};line-height:1.5">${isActive?"▲ ":""}${lines[0]}<br>${lines[1]}</div>`;
  });
  // Animal-derived warning
  const animalHTML=report.animalDerived?`
    <div style="margin:0 0 24px;background:#FFF7ED;border:1px solid #FED7AA;border-left:4px solid #EA580C;border-radius:8px;padding:18px 20px">
      <div style="font-size:10px;font-family:monospace;font-weight:700;color:#EA580C;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:8px">⚑ ${isFr?"Ingrédients d'origine animale — important":"Animal-derived ingredients — important"}</div>
      <div style="font-size:15px;font-weight:700;color:#1C2B3A;margin-bottom:10px">${isFr?"Votre produit peut nécessiter une documentation supplémentaire ou ne pas être exportable vers tous les marchés cibles sans évaluation complémentaire.":"Your product may require additional documentation or may not be exportable to all target markets without further assessment."}</div>
      <div style="font-size:13px;color:#475569;line-height:1.7">${isFr?"Les exigences d'exportation varient selon le type de produit, le pourcentage d'ingrédient et le marché de destination. Contactez Passage avant de procéder à la préparation de tout envoi.":"Export eligibility and documentation requirements vary by product type, ingredient percentage, and destination market. Please contact Passage before proceeding with any export shipment preparation."}</div>
    </div>`:"";
  // Phase cards with full gap lists
  let phaseHTML="";
  phaseKeys.forEach(ph=>{
    const d=report.phases?.[ph.k]||{score:0,max:ph.max,summary:"",gaps:[]};
    const pct=d.max>0?Math.round((d.score/d.max)*100):0;
    const sc=pct>=80?"#1A5C38":pct>=50?"#2E86C1":pct>=25?"#B7620A":"#B91C1C";
    const gaps=(d.gaps||[]).map(g=>({
      id:g.id||g.ref||g.reference||"",
      title:g.title||g.name||g.gap||g.item||"",
      type:(g.type||g.classification||"desirable").toLowerCase(),
      difficulty:(g.difficulty||g.effort||"medium").toLowerCase().replace(/\s/g,""),
      action:g.action||g.description||g.text||g.detail||"",
      passage:g.passage||g.help||g.passageHelp||g.passage_help||""
    }));
    let gapsHTML="";
    gaps.forEach(g=>{
      const isComp=g.type==="compulsory";
      const borderCol=isComp?"#B91C1C":"#B7620A";
      const diffBadge=g.difficulty==="quickwin"
        ?`<span style="font-size:10px;font-family:monospace;font-weight:700;padding:3px 8px;border-radius:4px;background:#EAFAF1;color:#1A5C38;white-space:nowrap">${isFr?"Action rapide":"Quick win"}</span>`
        :g.difficulty==="complex"
        ?`<span style="font-size:10px;font-family:monospace;font-weight:700;padding:3px 8px;border-radius:4px;background:#F5F3FF;color:#6B21A8;white-space:nowrap">${isFr?"Complexe":"Complex"}</span>`
        :`<span style="font-size:10px;font-family:monospace;font-weight:700;padding:3px 8px;border-radius:4px;background:#EFF6FF;color:#2E86C1;white-space:nowrap">${isFr?"Effort moyen":"Medium effort"}</span>`;
      const typeBadge=isComp
        ?`<span style="font-size:10px;font-family:monospace;font-weight:700;padding:3px 8px;border-radius:4px;background:#FEE2E2;color:#B91C1C;white-space:nowrap">${isFr?"Obligatoire":"Compulsory"}</span>`
        :`<span style="font-size:10px;font-family:monospace;font-weight:700;padding:3px 8px;border-radius:4px;background:#FEF3E2;color:#B7620A;white-space:nowrap">${isFr?"Souhaitable":"Desirable"}</span>`;
      gapsHTML+=`<div style="border:1px solid #E2E8F0;border-left:3px solid ${borderCol};border-radius:8px;padding:14px 16px;background:white;margin-bottom:10px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px">
          <div style="font-size:11px;font-weight:700;font-family:monospace;color:#94a3b8;flex-shrink:0;margin-top:2px">${esc(g.id||"")}</div>
          <div style="font-size:14px;font-weight:600;color:#1C2B3A;line-height:1.4;flex:1">${esc(g.title||"")}</div>
          <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end">${typeBadge}${diffBadge}</div>
        </div>
        <div style="font-size:13px;color:#334155;line-height:1.65;margin-bottom:6px">${esc(g.action||"")}</div>
        ${g.passage?`<div style="font-size:12px;color:#1A5C38;line-height:1.6;padding:8px 12px;background:#EAFAF1;border-radius:6px;margin-top:6px"><strong>${isFr?"Passage peut vous aider :":"Passage can help:"}</strong> ${esc(g.passage)}</div>`:""}
      </div>`;
    });
    phaseHTML+=`<div style="margin:0 0 16px;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden">
      <div style="padding:16px 20px 14px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:16px;font-weight:700;color:#0D2B45">${ph.l}</div>
        <div style="font-size:15px;font-weight:800;font-family:monospace;color:${sc}">${d.score}/${d.max}</div>
      </div>
      <div style="height:5px;background:#E2E8F0"><div style="height:100%;width:${pct}%;background:${sc}"></div></div>
      <div style="padding:20px">
        ${d.summary?`<p style="font-size:14px;color:#475569;line-height:1.75;margin-bottom:${gaps.length?"18px":"0"}">${esc(d.summary)}</p>`:""}
        ${gapsHTML}
      </div>
    </div>`;
  });
  // Quick wins
  const qw=report.quickWins||[];
  const qwHTML=qw.length?`
    <div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.18em;text-transform:uppercase;margin:32px 0 16px">${isFr?"ACTIONS RAPIDES — priorité cette semaine":"QUICK WINS — action these first"}</div>
    <div style="background:#EAFAF1;border:1px solid rgba(26,92,56,0.2);border-radius:12px;padding:20px;margin-bottom:16px">
      <div style="font-size:11px;font-family:monospace;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#1A5C38;margin-bottom:14px">✦ ${isFr?"À compléter cette semaine — sans consultant ni investissement":"Items you can complete this week — no consultants, no capital required"}</div>
      ${qw.map((item,i)=>`<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:8px">
        <div style="width:22px;height:22px;border-radius:50%;background:#1A5C38;color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;font-family:monospace;margin-top:1px">${i+1}</div>
        <div style="font-size:13px;color:#1e4030;line-height:1.6">${esc(item)}</div>
      </div>`).join("")}
    </div>`:"";
  // Email body
  const topGaps=(report.phases?Object.values(report.phases).flatMap(ph=>(ph.gaps||[]).filter(g=>g.type==="compulsory").map(g=>g.title)).slice(0,3):[]); 
  const emailSubj=`${isFr?"À":"To"}: hello@passageexport.com
${isFr?"Objet":"Subject"}: ${isFr?"Rapport ERSA":"ERSA Report"} — ${esc(report.businessName||"")} — ${isFr?"Demande de rappel":"Callback Request"}`;
  const emailBody=isFr
    ?`Bonjour,

J'ai complété l'auto-évaluation de préparation à l'export et je souhaite un rappel pour discuter de mon parcours.

Entreprise : ${report.businessName||""}
Contact : ${report.producerName||""}
Résultat : ${b.l} — ${report.totalScore} / 135
Marchés cibles : ${(report.targetMarkets||[]).join(", ")}

Je joins à cet e-mail mon rapport ERSA et le relevé complet de l'évaluation.

Merci.`
    :`Hello,

I have completed the Export Readiness Self-Assessment and would welcome a callback to discuss my pathway.

Business: ${report.businessName||""}
Contact: ${report.producerName||""}
Result: ${b.l} — ${report.totalScore} / 135
Target markets: ${(report.targetMarkets||[]).join(", ")}

I have attached my ERSA Report and Full Assessment Record to this email.

Thank you.`;
  $("rw").innerHTML=`
    <div style="max-width:780px;width:100%;background:white;border-radius:0;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.12);word-wrap:break-word;overflow-wrap:break-word;-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact">
      <div style="background:linear-gradient(135deg,#0D2B45,#1A3C5E);padding:36px 40px 32px">
        <div style="font-size:10px;letter-spacing:0.22em;color:#90CAF9;font-family:monospace;text-transform:uppercase;margin-bottom:10px">${isFr?"PASSAGE EXPORT GROUP — RAPPORT ERSA":"PASSAGE EXPORT GROUP — ERSA REPORT"}</div>
        <div style="font-size:26px;font-weight:900;color:white;margin-bottom:4px">${esc(report.businessName||"")}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.55)">${esc(report.producerName||"")} · ${esc(report.productRange||"")}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;font-family:monospace">${(report.targetMarkets||[]).map(m=>esc(m)).join(" · ")}</div>
      </div>
      <div style="background:${b.bg};border-bottom:3px solid ${b.c};padding:28px 40px;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:${b.c};letter-spacing:0.18em;text-transform:uppercase;margin-bottom:4px">${isFr?"NIVEAU DE MATURITÉ EXPORT":"EXPORT READINESS BAND"}</div>
          <div style="font-size:34px;font-weight:900;color:${b.c};line-height:1;margin-bottom:8px">${b.l}</div>
          <div style="font-size:13px;color:${b.c};opacity:0.8;max-width:360px;line-height:1.5">${esc(report.bandRationale||"")}</div>
        </div>
        <div style="display:flex;align-items:baseline;gap:4px;flex-shrink:0">
          <div style="font-size:64px;font-weight:900;color:${b.c};line-height:1">${report.totalScore}</div>
          <div style="font-size:18px;color:#94a3b8">/135</div>
        </div>
      </div>
      <div style="background:#F8F6F2;border:1px solid #E8E4DC;border-radius:8px;padding:14px 18px;margin:20px 40px 0">
        <p style="font-size:13px;color:#64748b;line-height:1.7;font-family:Georgia,serif"><strong style="color:#1C2B3A">${isFr?"Comment ce score est calculé :":"How this score works:"}</strong> ${isFr?"Chaque question est notée de 0 à 3. <strong>0</strong> = absent · <strong>1</strong> = partiel · <strong>2</strong> = adéquat · <strong>3</strong> = solide. Score maximum = 135.":"Each of the 45 questions is scored 0–3. <strong>0</strong> = not in place · <strong>1</strong> = partial · <strong>2</strong> = adequate · <strong>3</strong> = strong. Maximum score = 135."}</p>
      </div>
      <div style="padding:20px 40px 28px">
        <div style="font-size:10px;font-family:monospace;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;margin-bottom:10px">${isFr?"OÙ VOUS VOUS SITUEZ":"WHERE YOU SIT"}</div>
        <div style="display:flex;height:10px;border-radius:5px;overflow:hidden;gap:2px;margin-bottom:10px">${scaleSegs}</div>
        <div style="display:flex;justify-content:space-between">${scaleLabels}</div>
      </div>
      <div style="padding:4px 40px 24px">
        <p style="font-size:15px;color:#475569;line-height:1.8;border-left:3px solid ${b.c};padding-left:16px;font-style:italic">${esc(report.bandRationale||"")}</p>
      </div>
      ${report.animalDerived?`<div style="margin:0 40px 24px">${animalHTML}</div>`:""}
      <div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.18em;text-transform:uppercase;padding:0 40px;margin-bottom:16px;margin-top:8px">${isFr?"SCORES PAR PHASE ET ANALYSE DES ÉCARTS":"PHASE SCORES & GAP ANALYSIS"}</div>
      <div style="padding:0 40px 8px">${phaseHTML}</div>
      ${qwHTML?`<div style="padding:0 40px">${qwHTML}</div>`:""}
      <div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.18em;text-transform:uppercase;padding:0 40px;margin-bottom:16px;margin-top:32px">${isFr?"PARCOURS RECOMMANDÉ":"RECOMMENDED PATHWAY"}</div>
      <div style="margin:0 40px 32px;background:#F8FAFC;border:2px solid rgba(183,134,10,0.25);border-radius:12px;padding:24px">
        <div style="font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px">${isFr?"Passage recommande":"Passage recommends"}</div>
        <div style="font-size:22px;font-weight:900;color:${p.c};margin-bottom:10px">${p.d}</div>
        <p style="font-size:14px;color:#475569;line-height:1.75;margin-bottom:16px">${esc(report.pathwayRationale||"")}</p>
      </div>
      <div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;letter-spacing:0.18em;text-transform:uppercase;padding:0 40px;margin-bottom:16px">${isFr?"CE QU'IL FAUT FAIRE MAINTENANT":"WHAT TO DO NEXT"}</div>
      <div style="margin:0 40px 32px;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden">
        <div style="display:flex;gap:20px;padding:24px;border-bottom:1px solid #E2E8F0;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:#0D2B45;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;font-family:monospace;flex-shrink:0;margin-top:2px">1</div>
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:#0D2B45;margin-bottom:6px">${isFr?"Enregistrez votre rapport ERSA":"Save your ERSA Report"}</div>
            <div style="font-size:13px;color:#475569;line-height:1.65;margin-bottom:12px">${isFr?"Ce document contient votre niveau, vos scores par phase, l'analyse des écarts et le parcours recommandé.":"This document contains your band, phase scores, gap analysis and recommended pathway."}</div>
            <button onclick="window.print()" style="background:#0D2B45;color:white;border:none;border-radius:6px;padding:10px 20px;font-size:13px;font-weight:700;font-family:Georgia,serif;cursor:pointer">⬇ ${isFr?"Imprimer / Enregistrer en PDF":"Print / Save report as PDF"}</button>
          </div>
        </div>
        <div style="display:flex;gap:20px;padding:24px;border-bottom:1px solid #E2E8F0;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:#0D2B45;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;font-family:monospace;flex-shrink:0;margin-top:2px">2</div>
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:#0D2B45;margin-bottom:6px">${isFr?"Enregistrez votre relevé complet d'évaluation":"Save your Full Assessment Record"}</div>
            <div style="font-size:13px;color:#475569;line-height:1.65;margin-bottom:12px">${isFr?"Ce document contient chaque question et votre réponse. Passage l'utilisera pour préparer votre conversation de rappel.":"This document contains every question and your answer. Passage will use it to prepare for your callback conversation."}</div>
            <button onclick="printQARecord()" style="background:#0D2B45;color:white;border:none;border-radius:6px;padding:10px 20px;font-size:13px;font-weight:700;font-family:Georgia,serif;cursor:pointer">⬇ ${isFr?"Imprimer / Enregistrer le relevé en PDF":"Print / Save assessment record as PDF"}</button>
          </div>
        </div>
        <div style="display:flex;gap:20px;padding:24px;align-items:flex-start">
          <div style="width:32px;height:32px;border-radius:50%;background:#0D2B45;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;font-family:monospace;flex-shrink:0;margin-top:2px">3</div>
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:#0D2B45;margin-bottom:6px">${isFr?"Demandez un rappel à Passage":"Request a callback from Passage"}</div>
            <div style="font-size:13px;color:#475569;line-height:1.65;margin-bottom:12px">${isFr?"Copiez le message ci-dessous, ouvrez votre client de messagerie, collez-le dans un nouvel e-mail — <strong style='color:#0D2B45'>joignez les deux PDF</strong> — et envoyez.":"Copy the message below, open your email client, paste it into a new email — <strong style='color:#0D2B45'>attach both PDFs you just saved</strong> — and send."}</div>
            <div style="background:#F8F6F2;border:1px solid #E2E8F0;border-radius:8px;padding:16px">
              <div style="font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;display:flex;align-items:flex-start;gap:6px;flex-wrap:wrap">${isFr?"Copiez ce message —":"Copy this message —"} <span style="background:#0D2B45;color:white;padding:2px 8px;border-radius:3px;letter-spacing:0.08em">${isFr?"JOIGNEZ LES DEUX PDF AVANT D'ENVOYER":"ATTACH BOTH PDFs BEFORE SENDING"}</span></div>
              <div style="font-size:12px;font-family:monospace;color:#475569;margin-bottom:8px;padding:6px 10px;background:white;border:1px solid #E2E8F0;border-radius:4px;white-space:pre">${emailSubj}</div>
              <div id="ersa-email-body" style="font-size:12px;color:#334155;line-height:1.65;white-space:pre-wrap;padding:10px 12px;background:white;border:1px solid #E2E8F0;border-radius:4px;margin-bottom:10px;font-family:Georgia,serif">${emailBody}</div>
              <button onclick="copyEmailBody()" style="background:#0D2B45;color:white;border:none;border-radius:6px;padding:9px 18px;font-size:12px;font-weight:700;font-family:Georgia,serif;cursor:pointer;width:100%">${isFr?"Copier le message":"Copy message to clipboard"}</button>
              <div id="copy-confirm" style="font-size:11px;font-family:monospace;color:#1A5C38;text-align:center;margin-top:6px;display:none">✓ ${isFr?"Copié — ouvrez votre messagerie, collez, joignez les deux PDF et envoyez":"Copied — open your email, paste, attach both PDFs, and send"}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#F8F6F2;border-top:1px solid #E2E8F0;padding:20px 40px;text-align:center">
        <p style="font-size:11px;color:#94a3b8;line-height:1.7;font-family:monospace">PASSAGE EXPORT GROUP · passageexport.com · Mauritius<br>
        ${isFr?"Rapport généré le":"Report generated"} ${new Date().toLocaleDateString(isFr?"fr-FR":"en-AU",{day:"numeric",month:"long",year:"numeric"})} ${isFr?"par le système ERSA":"by the Passage ERSA system"}<br>
        ${isFr?"Les réponses sont déclarées par le producteur et n'ont pas été vérifiées indépendamment":"Scores and recommendations are based on self-reported responses and have not been independently verified"}</p>
      </div>
    </div>
    <button class="new-btn" onclick="restart()" style="margin-top:16px;margin-bottom:8px">${isFr?"Nouvelle évaluation":"Start new assessment"}</button>`;
}

function copyEmailBody(){
  const el=document.getElementById("ersa-email-body");
  if(el) navigator.clipboard.writeText(el.innerText).then(()=>{
    const c=document.getElementById("copy-confirm");
    if(c){c.style.display="block";setTimeout(()=>c.style.display="none",4000);}
  });
}

function printQARecord(){
  const report=window._ersaReport||{};
  const isFr=fr();
  const today=new Date().toLocaleDateString(isFr?"fr-FR":"en-AU",{day:"numeric",month:"long",year:"numeric"});
  // Q label map
  const qLabels={
    GATE1:isFr?"Votre entreprise est-elle formellement enregistrée avec un numéro de société actif ?":"Is your business formally registered with an active company number?",
    GATE2:isFr?"Votre entreprise détient-elle une licence ou autorisation d'exploitation alimentaire en vigueur ?":"Does your business hold a current food business licence or permit?",
    Q01:isFr?"Votre entreprise a-t-elle déjà obtenu un Certificat sanitaire à l'exportation pour un produit quelconque ?":"Has your business previously received an Export Health Certificate for any product?",
    Q02:isFr?"Votre installation de production est-elle prête pour une inspection en vue d'un Certificat sanitaire à l'exportation aujourd'hui si demandé ?":"Is your production facility ready for an Export Health Certificate inspection today if requested?",
    Q03:isFr?"Votre entreprise dispose-t-elle d'un système de gestion de la sécurité alimentaire ?":"Does your business have a food safety management system in place?",
    Q04:isFr?"Vos Points de Contrôle Critiques sont-ils documentés et surveillés avec enregistrements ?":"Are your Critical Control Points documented and actively monitored with records?",
    Q05:isFr?"Enregistrez-vous la traçabilité des ingrédients (fournisseur, numéro de lot, date de livraison) ?":"Do you record ingredient traceability — supplier name, batch number and delivery date?",
    Q06:isFr?"Enregistrez-vous la traçabilité des produits finis par lot ?":"Do you record finished goods batch traceability for every batch?",
    Q07:isFr?"Votre produit contient-il des ingrédients d'origine animale ?":"Does your product contain animal-derived ingredients?",
    Q08:isFr?"Quelle est la classification de conservation de votre produit ?":"What is your product's storage classification?",
    Q09:isFr?"La durée de conservation de votre produit a-t-elle été établie et déclarée ?":"Has your product's shelf life been established and declared?",
    Q10:isFr?"La durée de conservation a-t-elle été validée par des tests de laboratoire formels ?":"Has your product's shelf life been validated through formal laboratory or challenge testing?",
    Q11:isFr?"La formulation de votre produit est-elle documentée ?":"Is your product formulation documented?",
    Q12:isFr?"Votre emballage primaire est-il certifié alimentaire et adapté à la température ?":"Is your primary packaging food-grade certified and temperature-appropriate?",
    Q13:isFr?"Disposez-vous d'un standard de carton documenté avec votre fournisseur d'emballage externe ?":"Do you have a documented carton standard with your outer packaging supplier?",
    Q14:isFr?"Votre produit a-t-il déjà été transporté dans des conditions de fret export commercial ?":"Has your product been transported under commercial export freight conditions previously?",
    Q15:isFr?"Tous les ingrédients sont-ils listés sur l'étiquette en ordre décroissant de poids ?":"Are all ingredients listed on your label in descending order of weight?",
    Q16:isFr?"Tous les allergènes majeurs sont-ils clairement déclarés sur l'étiquette ?":"Are all major allergens clearly declared on your label?",
    Q17:isFr?"Votre étiquette comporte-t-elle un tableau nutritionnel dans le format requis ?":"Does your label include a Nutrition Information Panel in the correct format?",
    Q18:isFr?"Le poids net est-il déclaré en unités métriques sur l'étiquette ?":"Is the net weight declared in metric units on your label?",
    Q19:isFr?"Votre étiquette comporte-t-elle une mention d'origine du pays ?":"Does your label include a country of origin statement?",
    Q20:isFr?"Votre étiquette comporte-t-elle le nom et l'adresse d'un importateur dans le marché de destination ?":"Does your label include the name and address of an importer in the destination market?",
    Q21:isFr?"Votre étiquette porte-t-elle un code-barres EAN-13 enregistré auprès de GS1 ?":"Does your label carry a registered EAN-13 / GS1-compliant barcode?",
    Q22:isFr?"Votre étiquette est-elle dans la langue ou les langues requises pour vos marchés cibles ?":"Is your label in the required language(s) for your target markets?",
    Q23:isFr?"Disposez-vous de fichiers artwork modifiables et prêts à imprimer pour votre emballage actuel ?":"Do you hold editable, print-ready artwork files for your current packaging?",
    Q24:isFr?"Combien d'unités pouvez-vous allouer à des commandes export par mois ?":"How many units could you allocate to export orders per month?",
    Q25:isFr?"Votre volume de production disponible pour l'export est-il constant d'un mois à l'autre ?":"Is your export-available production volume consistent month-on-month?",
    Q26:isFr?"Si la demande export doublait dans les 12 prochains mois, votre production pourrait-elle suivre ?":"If your export demand doubled within 12 months, could your production scale to meet it?",
    Q27:isFr?"Approvisionnez-vous actuellement des détaillants, distributeurs ou opérateurs de restauration ?":"Do you currently supply retailers, distributors, or foodservice operators?",
    Q28:isFr?"Votre installation dispose-t-elle d'un stockage froid dédié à la température requise ?":"Does your facility have dedicated cold storage at the required temperature?",
    Q29:isFr?"Pouvez-vous maintenir une chaîne du froid ininterrompue de votre installation au port de chargement ?":"Can you maintain an unbroken cold chain from your facility to the port of loading?",
    Q30:isFr?"Avez-vous déjà exporté des produits réfrigérés ou congelés dans un conteneur frigorifique ?":"Have you previously exported chilled or frozen products in a reefer container?",
    Q31:isFr?"Votre processus de production est-il documenté ?":"Is your production process documented?",
    Q32:isFr?"Vos ingrédients clés sont-ils approvisionnés de manière constante auprès des mêmes fournisseurs ?":"Are your key ingredients sourced consistently from the same suppliers?",
    Q33:isFr?"Effectuez-vous des contrôles qualité systématiques avant que les marchandises soient prêtes à l'expédition ?":"Do you conduct systematic quality checks before goods are marked ready for despatch?",
    Q34:isFr?"Pourriez-vous maintenir une fourniture export ininterrompue pendant six mois si un importateur doublait sa commande ?":"Could you maintain uninterrupted export supply for six months if a major importer doubled their order?",
    Q35:isFr?"Avez-vous développé une liste de prix export, séparée de vos prix nationaux ?":"Have you developed an export price list, separate from your domestic pricing?",
    Q36:isFr?"Vos produits export sont-ils tarifés en départ usine ou FOB ?":"Do you price your export goods on an ex-works or FOB basis?",
    Q37:isFr?"Avez-vous défini des quantités minimales de commande pour vos produits export ?":"Have you defined minimum order quantities for your export products?",
    Q38:isFr?"Votre entreprise peut-elle émettre des factures commerciales formelles en MUR ?":"Can your business issue formal commercial invoices in Mauritian Rupees?",
    Q39:isFr?"Quelles conditions de paiement pouvez-vous offrir à Passage en tant qu'acheteur export ?":"What payment terms can your business offer Passage as your export buyer?",
    Q40:isFr?"Votre entreprise dispose-t-elle d'un fonds de roulement suffisant pour financer la production export à l'avance ?":"Does your business have sufficient working capital to fund export production in advance?",
    Q41:isFr?"Votre entreprise est-elle formellement enregistrée avec numéro de société, TVA le cas échéant, et compte bancaire dédié ?":"Is your business formally registered with company number, VAT if applicable, and a dedicated bank account?",
    Q42:isFr?"Votre entreprise dispose-t-elle d'une assurance responsabilité produits ?":"Does your business have product liability insurance in place?",
    Q43:isFr?"Votre entreprise dispose-t-elle d'une procédure de rappel de produits documentée ?":"Does your business have a documented food recall procedure in place?"
  };
  // Build Q&A from messages
  let qaRows="";
  const qKeys=["GATE1","GATE2","Q01","Q02","Q03","Q04","Q05","Q06","Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15","Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23","Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34","Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"];
  // Extract user answers from message history
  // messages array: alternating assistant/user. User messages after the opening are answers.
  const userMsgs=messages.filter(m=>m.role==="user").slice(1); // skip opening
  const asstMsgs=messages.filter(m=>m.role==="assistant");
  // Match by questionKey stored on assistant messages
  const answered={};
  asstMsgs.forEach((am,i)=>{
    if(am.questionKey && userMsgs[i]){
      answered[am.questionKey]=(answered[am.questionKey]||[]); 
      answered[am.questionKey].push(userMsgs[i].content);
    }
  });
  const phaseBlocks=[
    {label:isFr?"Questions de qualification":"Eligibility gates",keys:["GATE1","GATE2"]},
    {label:isFr?"Phase 1 — Conformité réglementaire":"Phase 1 — Regulatory Readiness",keys:["Q01","Q02","Q03","Q04","Q05","Q06"]},
    {label:isFr?"Phase 2 — Produit & marché":"Phase 2 — Product & Market Readiness",keys:["Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15","Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23"]},
    {label:isFr?"Phase 3 — Opérations":"Phase 3 — Operations Readiness",keys:["Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34"]},
    {label:isFr?"Phase 4 — Aspects commerciaux":"Phase 4 — Commercial Readiness",keys:["Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"]}
  ];
  phaseBlocks.forEach(block=>{
    qaRows+=`<div style="padding:28px 40px 0"><div style="font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;padding-bottom:10px;border-bottom:2px solid #E2E8F0">${block.label}</div>`;
    block.keys.forEach(k=>{
      const ans=answered[k];
      if(!ans) return;
      const fullAns=ans.join(" / ");
      // Split on "Additional context:" to separate response from context
      const parts=fullAns.split(/additional context:|contexte supplémentaire:/i);
      const mainAns=parts[0].replace(/^(✓\s*)/,"").trim();
      const ctx=parts[1]?parts[1].trim():"";
      qaRows+=`<div style="border-bottom:1px solid #F1EDE6;padding:16px 0">
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:6px">
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;min-width:48px;padding-top:2px">${k}</div>
          <div style="font-size:14px;font-weight:600;color:#1C2B3A;line-height:1.5">${esc(qLabels[k]||k)}</div>
        </div>
        <div style="font-size:13px;color:#475569;line-height:1.65;padding:10px 14px;background:#F8F6F2;border-left:3px solid #B7620A;border-radius:0 6px 6px 0;margin-left:58px">
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:#B7620A;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px">${isFr?"Réponse":"Response"}</div>
          ${esc(mainAns)}
        </div>
        ${ctx?`<div style="font-size:12px;color:#334155;line-height:1.65;padding:8px 12px;background:#EFF6FF;border-left:3px solid #2E86C1;border-radius:0 6px 6px 0;margin-top:6px;margin-left:58px">
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:#2E86C1;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px">${isFr?"Contexte supplémentaire fourni":"Additional context provided"}</div>
          ${esc(ctx)}
        </div>`:""}
      </div>`;
    });
    qaRows+="</div>";
  });
  const qaHTML=`<!DOCTYPE html><html lang="${isFr?"fr":"en"}"><head><meta charset="UTF-8"><title>${isFr?"Relevé d'évaluation complet":"Full Assessment Record"} — ${esc(report.businessName||"")}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;background:#F8F6F2;color:#1C2B3A}div[style]{-webkit-print-color-adjust:exact;print-color-adjust:exact}@media print{body{background:white}.no-print{display:none}}</style></head><body>
  <div style="max-width:780px;margin:0 auto;background:white;box-shadow:0 4px 40px rgba(0,0,0,0.1)">
    <div style="background:linear-gradient(135deg,#0D2B45,#1A3C5E);padding:36px 40px 32px">
      <div style="font-size:10px;letter-spacing:0.22em;color:#90CAF9;font-family:monospace;text-transform:uppercase;margin-bottom:10px">${isFr?"PASSAGE EXPORT GROUP — RELEVÉ COMPLET D'ÉVALUATION":"PASSAGE EXPORT GROUP — FULL ASSESSMENT RECORD"}</div>
      <div style="font-size:26px;font-weight:900;color:white;margin-bottom:4px">${esc(report.businessName||"")}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.55)">${esc(report.producerName||"")} · ${esc(report.productRange||"")}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;font-family:monospace">${(report.targetMarkets||[]).map(m=>esc(m)).join(" · ")} · ${isFr?"Évaluation complétée le":"Assessment completed"} ${today}</div>
    </div>
    <div style="background:#F0EDE6;border-bottom:2px solid #E2DDD6;padding:20px 40px">
      <p style="font-size:13px;color:#64748b;line-height:1.7;font-family:Georgia,serif">${isFr?"Ce document est le relevé complet de l'auto-évaluation de préparation à l'export. Il contient chaque question posée et la réponse fournie. Il ne contient pas les scores ni l'analyse des écarts — ces éléments figurent dans le rapport ERSA d'accompagnement. Ce document est destiné à être partagé avec Passage Export Group lors d'une conversation de rappel ou d'intégration.":"This document is the complete record of the Export Readiness Self-Assessment. It contains every question asked and the response given. It does not contain scoring or gap analysis — those are in the accompanying ERSA Report. This document is intended to be read alongside the report and shared with Passage Export Group as part of a callback or onboarding conversation."}</p>
    </div>
    ${qaRows}
    <div style="background:#F8F6F2;border-top:1px solid #E2E8F0;padding:20px 40px;margin-top:32px;text-align:center">
      <p style="font-size:11px;color:#94a3b8;line-height:1.7;font-family:monospace">PASSAGE EXPORT GROUP · passageexport.com · Mauritius<br>${isFr?"Relevé généré le":"Full Assessment Record generated"} ${today} · ${isFr?"Les réponses sont déclarées par le producteur":"Responses are self-reported by the producer named above"}<br>${isFr?"Ce document doit être lu avec le rapport ERSA d'accompagnement":"This document should be read alongside the accompanying ERSA Report"}</p>
    </div>
    <div class="no-print" style="padding:20px 40px;text-align:center"><button onclick="window.print()" style="background:#0D2B45;color:white;border:none;border-radius:6px;padding:12px 28px;font-size:14px;font-weight:700;font-family:Georgia,serif;cursor:pointer">⬇ ${isFr?"Imprimer / Enregistrer en PDF":"Print / Save as PDF"}</button></div>
  </div></body></html>`;
  const win=window.open("","_blank");
  if(win){ win.document.write(qaHTML); win.document.close(); }
}

// ── Restart ───────────────────────────────────────────────────────────────────
function restart(){
  messages=[];loading=false;phasesLit=new Set();mkts=[];currentQIndex=-1;pendingNoAdvance=false;storageClassification=null;
  document.querySelectorAll(".mkt-btn").forEach(b=>b.classList.remove("on"));
  ["fn","fb","fp","fe"].forEach(id=>$(id).value="");
  $("sb").className="start-btn notready";
  $("mi").innerHTML="";
  $("banner").style.display="block";
  for(let i=0;i<4;i++) $("d"+i).style.background="rgba(255,255,255,0.2)";
  $("pl").textContent="0/4 phases covered";
  $("progress-fill").style.width="0%";
  $("progress-label").textContent="0 of 45";
  showScreen("lang-screen");
}
</script>
</body>
</html>
