// ERSA.jsx — Passage Export Group
// Export Readiness Self-Assessment v2.0
// Built from ERSA Master Document v2.1 (March 2026)
// Flow: Language → Intro → Intake → AI Conversation → Report → Share Choice → Email

import { useState, useRef, useEffect } from "react";

// ─── System Prompt ────────────────────────────────────────────────────────────
// Built directly from ERSA Master v2.1. Do not modify without updating the master doc.

const SYSTEM_PROMPT = `You are the ERSA assessment agent for Passage Export Group — the infrastructure builder for Mauritian food exports and the founding architect of Island Creole Cuisine as a global food category.

You conduct structured export readiness assessments for Mauritian food producers across four phases. You are warm, professional, direct, and knowledgeable. You never use filler phrases. You ask one question at a time and listen carefully.

LANGUAGE: You have already been told the producer's language preference. Conduct the entire assessment in that language (English or French). Do not switch unless the producer switches first.

INTAKE DATA: You will receive the producer's name, business name, product range, target markets, and email at the start of the conversation. Do not ask for these again. Use them to personalise your questions — especially target markets for Phase 2 labelling.

ELIGIBILITY GATES (Q1 and Q2): These are hard pass/fail. If the answer to either is No, immediately inform the producer warmly that they are Not Eligible to proceed, explain why registration/licensing is a prerequisite, and tell them Passage will make contact to support their path to eligibility. Do not continue the assessment.

ASSESSMENT STRUCTURE — 4 phases, 45 questions total:

PHASE 1 — REGULATORY READINESS (6 scored questions + 2 gates)
Gate Q1: Is the facility formally registered with the relevant Mauritian local authority? (Yes / In progress / No — GATE: No = stop)
Gate Q2: Does the facility hold a current, valid food business licence? (Yes / Expired-renewal / No — GATE: No = stop)
Q1: Has the facility ever received an Export Health Certificate from the Ministry of Health & Wellness? 
Q2: Based on current facility condition, would it meet EHC inspection standards today?
Q3: Does the facility operate under a recognised food safety system? (HACCP / ISO 22000 / Both / Internal only / None)
Q4: Are Critical Control Points documented, monitored, and recorded?
Q5: Can all ingredients be traced back to supplier, batch, and delivery date?
Q6: Can finished goods batches be traced from production through to despatch?

PHASE 2 — PRODUCT & MARKET READINESS (17 scored questions)
Q7: Does the product contain meat, seafood, dairy, eggs, honey, or other animal-derived ingredients?
Q8: What is the product's storage classification? (Ambient / Chilled / Frozen)
Q9: What is the declared shelf life?
Q10: Has shelf life been validated through formal laboratory or documented challenge testing?
Q11: Is the product formulation — recipes, ingredient specs, processing parameters — documented?
Q12: Is primary packaging food-grade certified and temperature-appropriate?
Q13: Is secondary/outer packaging suitable for palletised international sea freight — AND is there a documented carton standard the supplier must match on every reorder?
Q14: Has the product been transported under commercial export freight conditions previously?
Q15: Are all ingredients listed in descending order of weight with sub-ingredients declared?
Q16: Are all major allergens clearly declared?
Q17: Does the label include a Nutrition Information Panel in the format required by target markets? (Calibrate to their selected markets — AU needs per serve AND per 100g in kJ; UK needs kJ and kcal per 100g; France needs French language values per 100g under INCO; Canada needs bilingual EN/FR Nutrition Facts table)
Q18: Is net weight declared in metric units?
Q19: Does the label include a country of origin statement?
Q20: Does the label include the name and address of an importer in the destination market? (Yes or No only)
Q21: Does the label carry a registered EAN-13 / GS1-compliant barcode?
Q22: Is the label in the required language(s) for target markets? (AU/UK = English; Canada = bilingual EN/FR mandatory; France = French mandatory)
Q23: Does the producer hold editable print-ready artwork files for current packaging?

PHASE 3 — OPERATIONS READINESS (11 scored questions)
Q24: Of total monthly production capacity, how many units could be allocated to export orders after fulfilling existing domestic commitments?
Q25: Is export-available production volume consistent month-on-month?
Q26: If export demand doubled within 12 months, could production scale to meet it?
Q27: Does the producer currently supply retailers, distributors, or foodservice operators?
Q28 (chilled/frozen only): Does the facility have dedicated cold storage at the required temperature?
Q29 (chilled/frozen only): Can the producer maintain unbroken cold chain from facility to port?
Q30 (chilled/frozen only): Have chilled or frozen products been exported in a reefer container previously?
Q31: Is the production process documented — equipment settings, parameters, batch sizes, quality checks?
Q32: Are key ingredients sourced consistently from the same suppliers under the same specifications?
Q33: Are systematic quality checks conducted before goods are marked ready for despatch?
Q34: Could uninterrupted export supply be maintained for six months if a major importer doubled their order?

PHASE 4 — COMMERCIAL READINESS (9 scored questions)
Q35: Has an export price list been developed — separate from domestic pricing?
Q36: Does the producer understand the difference between FOB and CIF pricing terms?
Q37: Have minimum order quantities been defined for export products?
Q38: Can the business issue formal commercial invoices in Mauritian Rupees (MUR) with correct registration details? (Note: Passage buys in MUR — producers do not need to invoice in foreign currencies)
Q39: What payment terms can the producer offer Passage as their export buyer? (Payment on delivery / 30 days / 60 days / 90 days)
Q40: Does the business have sufficient working capital to fund export production in advance — including a potential 60–90 day gap before payment receipt?
Q41: Is the business formally registered with company number, VAT (if applicable), and a dedicated business bank account?
Q42: Does the business have product liability insurance in place?
Q43: Does the business have a documented food recall procedure?

SCORING PER QUESTION:
0 = Not in place / no evidence
1 = Partial / in progress
2 = Adequate / meets basic requirements
3 = Strong / exceeds requirements

BANDS (total out of 135):
0–33: Pre-Readiness → Incubation
34–67: Developing → Product Development Services
68–108: Near-Ready → Targeted Verification
109–135: Export-Ready → Verification

EFFICIENCY: Move at a good pace. One question at a time. Follow up only when an answer is genuinely ambiguous. Do not over-explain. The target is 7–10 minutes total.

PHASE TRANSITIONS: Announce each phase transition briefly and naturally. E.g. "That covers the regulatory side. Let me move on to your product and how it's prepared for the target markets."

FINAL SYNTHESIS: After all phases, tell the producer you have everything needed and are preparing their report. Then output ONLY this JSON block — nothing before or after it:

ERSA_REPORT_JSON:
{
  "producerName": "string",
  "businessName": "string",
  "productRange": "string",
  "targetMarkets": ["string"],
  "language": "EN or FR",
  "eligibilityGate": "passed or failed",
  "phases": {
    "regulatory":  { "score": 0, "max": 18, "summary": "one sentence", "gap": "gap or null" },
    "product":     { "score": 0, "max": 51, "summary": "one sentence", "gap": "gap or null" },
    "operations":  { "score": 0, "max": 33, "summary": "one sentence", "gap": "gap or null" },
    "commercial":  { "score": 0, "max": 27, "summary": "one sentence", "gap": "gap or null" }
  },
  "totalScore": 0,
  "band": "Pre-readiness",
  "bandRationale": "2-3 sentences",
  "topPriorities": ["priority 1", "priority 2", "priority 3"],
  "recommendedPathway": "Incubation | Product Development Services | Targeted Verification | Verification",
  "pathwayRationale": "one sentence",
  "packagingGap": false
}`;

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASES = [
  { key: "regulatory", label: "Regulatory",       labelFr: "Réglementaire",    color: "#1A3C5E", max: 18 },
  { key: "product",    label: "Product & Market",  labelFr: "Produit & Marché", color: "#1A5C38", max: 51 },
  { key: "operations", label: "Operations",        labelFr: "Opérations",       color: "#B7620A", max: 33 },
  { key: "commercial", label: "Commercial",        labelFr: "Commercial",       color: "#6B21A8", max: 27 },
];

const BAND_CONFIG = {
  "Pre-readiness":  { color: "#B91C1C", bg: "#FEE2E2", label: "Pre-Readiness",  labelFr: "Pré-maturité" },
  "Developing":     { color: "#B7620A", bg: "#FEF3E2", label: "Developing",      labelFr: "En développement" },
  "Near-ready":     { color: "#2E86C1", bg: "#EBF5FB", label: "Near-Ready",      labelFr: "Quasi-prêt" },
  "Export-ready":   { color: "#1A5C38", bg: "#EAFAF1", label: "Export-Ready",    labelFr: "Prêt à l'export" },
};

const PATHWAY_CONFIG = {
  "Incubation":                   { color: "#B91C1C", desc: "Passage Supplier Incubation Programme",     descFr: "Programme d'incubation fournisseurs" },
  "Product Development Services": { color: "#B7620A", desc: "Passage Product Development Services",      descFr: "Services de développement produit" },
  "Targeted Verification":        { color: "#2E86C1", desc: "Targeted Gap Remediation + Verification",   descFr: "Remédiation ciblée + Vérification" },
  "Verification":                 { color: "#1A5C38", desc: "Passage Supplier Verification",             descFr: "Vérification fournisseur Passage" },
};

const TARGET_MARKETS = ["Australia", "UK", "France", "Canada", "Other"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseReport(text) {
  const marker = "ERSA_REPORT_JSON:";
  const idx = text.indexOf(marker);
  if (idx === -1) return null;
  try {
    const jsonStr = text.slice(idx + marker.length).trim();
    return JSON.parse(jsonStr.slice(0, jsonStr.lastIndexOf("}") + 1));
  } catch { return null; }
}

function detectPhases(msgs) {
  const text = msgs.map(m => m.content).join(" ").toLowerCase();
  const detected = [];
  if (text.match(/registr|licen|haccp|certif|traceab|export health/)) detected.push("regulatory");
  if (text.match(/shelf.?life|packag|label|allergen|barcode|nutrition|ingredient|frozen|chilled|ambient/)) detected.push("product");
  if (text.match(/produc.{0,10}capac|cold.?chain|reefer|quality.?check|supply|dispatch/)) detected.push("operations");
  if (text.match(/pric|payment|invoice|moq|working.?capital|insur|recall/)) detected.push("commercial");
  return [...new Set(detected)];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ score, max, color }) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace", whiteSpace: "nowrap" }}>{score}/{max}</span>
    </div>
  );
}

function ReportCard({ report, lang }) {
  const fr = lang === "FR";
  const band = BAND_CONFIG[report.band] || BAND_CONFIG["Developing"];
  const pw = PATHWAY_CONFIG[report.recommendedPathway] || PATHWAY_CONFIG["Incubation"];

  return (
    <div style={{ fontFamily: "'Georgia', serif", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0D2B45,#1A3C5E)", padding: "28px 32px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#90CAF9", fontFamily: "monospace", marginBottom: 8, textTransform: "uppercase" }}>
          {fr ? "PASSAGE EXPORT GROUP — RAPPORT ERSA" : "PASSAGE EXPORT GROUP — ERSA REPORT"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{report.businessName}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{report.producerName} · {report.productRange}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
          {fr ? "Marchés cibles" : "Target markets"}: {(report.targetMarkets || []).join(", ")}
        </div>
      </div>

      {/* Score banner */}
      <div style={{ background: band.bg, borderBottom: `2px solid ${band.color}30`, padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: band.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
            {fr ? "NIVEAU DE MATURITÉ EXPORT" : "EXPORT READINESS BAND"}
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: band.color }}>{fr ? band.labelFr : band.label}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: band.color, lineHeight: 1 }}>{report.totalScore}</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>/135</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 32px", background: "#fff" }}>

        {/* Rationale */}
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 24, borderLeft: `3px solid ${band.color}`, paddingLeft: 14 }}>
          {report.bandRationale}
        </p>

        {/* Phase scores */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
            {fr ? "SCORES PAR PHASE" : "PHASE SCORES"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PHASES.map(ph => {
              const d = report.phases?.[ph.key];
              if (!d) return null;
              const scoreColor = d.score >= 0.8 * d.max ? "#1A5C38" : d.score >= 0.5 * d.max ? "#2E86C1" : d.score >= 0.25 * d.max ? "#B7620A" : "#B91C1C";
              return (
                <div key={ph.key} style={{ background: "#F8FAFC", borderRadius: 8, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: ph.color }}>{fr ? ph.labelFr : ph.label}</div>
                    <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: scoreColor }}>{d.score}/{d.max}</span>
                  </div>
                  <ScoreBar score={d.score} max={d.max} color={scoreColor} />
                  {d.summary && <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginTop: 8 }}>{d.summary}</div>}
                  {d.gap && <div style={{ marginTop: 6, fontSize: 12, color: "#B91C1C", background: "#FEE2E2", borderRadius: 4, padding: "4px 10px", display: "inline-block" }}>⚠ {d.gap}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Priorities */}
        {report.topPriorities?.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
              {fr ? "PRIORITÉS IMMÉDIATES" : "IMMEDIATE PRIORITIES"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {report.topPriorities.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#0D2B45", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brand guidelines trigger */}
        {report.packagingGap && (
          <div style={{ background: "linear-gradient(135deg,#1A3C5E,#2E6DA4)", borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#90CAF9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              {fr ? "LIGNES DIRECTRICES DE LA MARQUE" : "BRAND GUIDELINES"}
            </div>
            <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, marginBottom: 6 }}>
              {fr ? "Directives packaging Passage — Island Creole Cuisine" : "Passage Packaging Guidelines — Island Creole Cuisine"}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
              {fr
                ? "Un écart d'emballage a été identifié. Votre équipe Passage vous enverra les directives complètes."
                : "A packaging gap has been identified. Your Passage team will send you the full brand guidelines package."}
            </div>
          </div>
        )}

        {/* Pathway */}
        <div style={{ background: "#F8FAFC", border: `2px solid ${pw.color}30`, borderRadius: 10, padding: "20px 24px" }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            {fr ? "PARCOURS RECOMMANDÉ" : "RECOMMENDED PATHWAY"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, color: pw.color, marginBottom: 6 }}>{fr ? pw.descFr : pw.desc}</div>
          <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 12 }}>{report.pathwayRationale}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0D2B45" }}>
            {fr ? "→ Contactez Passage Export Group pour démarrer votre parcours." : "→ Contact Passage Export Group to begin your pathway."}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontFamily: "monospace" }}>hello@passageexport.com</div>
        </div>
      </div>
    </div>
  );
}

function ShareChoice({ report, intake, lang, onDone }) {
  const fr = lang === "FR";
  const [choice, setChoice] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const options = [
    {
      id: "report",
      icon: "✉",
      title: fr ? "Envoyez-moi mon rapport" : "Email me my report",
      desc: fr
        ? "Je recevrai mon rapport par e-mail. Je déciderai plus tard si je souhaite le partager avec Passage."
        : "I'll receive my report by email. I'll decide later whether to share it with Passage.",
    },
    {
      id: "share",
      icon: "◈",
      title: fr ? "Envoyez-moi mon rapport et partagez une copie avec Passage" : "Email me my report and share a copy with Passage",
      desc: fr
        ? "Passage recevra une copie de mon évaluation. Je suis ouvert(e) à une conversation de suivi."
        : "Passage will receive a copy of my assessment. I'm open to a follow-up conversation.",
    },
    {
      id: "meet",
      icon: "⚑",
      title: fr ? "Partagez avec Passage et je souhaite les rencontrer" : "Share with Passage and I'd like to meet them",
      desc: fr
        ? "Passage recevra mon évaluation et me contactera pour organiser un entretien approfondi."
        : "Passage will receive my assessment and contact me to arrange an in-depth review.",
    },
  ];

  const handleSubmit = async () => {
    if (!choice) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          report,
          producerEmail: intake.email,
          producerName: intake.name,
          shareChoice: choice,
          lang
        })
      });
      if (!res.ok) throw new Error("Send failed");
      setSent(true);
    } catch {
      setError(fr ? "Erreur d'envoi. Veuillez réessayer." : "Send failed. Please try again.");
    }
    setSending(false);
  };

  if (sent) {
    return (
      <div style={{ background: "#EAFAF1", border: "1px solid #1A5C3840", borderRadius: 12, padding: "28px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#1A5C38", marginBottom: 8 }}>
          {fr ? "Rapport envoyé" : "Report sent"}
        </div>
        <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>
          {fr
            ? `Votre rapport a été envoyé à ${intake.email}.${choice === "meet" ? " L'équipe Passage vous contactera prochainement." : ""}`
            : `Your report has been sent to ${intake.email}.${choice === "meet" ? " The Passage team will be in touch shortly." : ""}`}
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
          {fr ? "Mauritius est là où commence l'histoire. Island Creole Cuisine est là où elle va." : "Mauritius is where the story starts. Island Creole Cuisine is where it goes."}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px 28px" }}>
      <div style={{ fontWeight: 900, fontSize: 16, color: "#0D2B45", marginBottom: 6 }}>
        {fr ? "Comment souhaitez-vous gérer vos résultats ?" : "How would you like to handle your results?"}
      </div>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>
        {fr
          ? "Vous êtes en contrôle. Choisissez comment votre rapport est partagé."
          : "You are in control. Choose how your report is shared."}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {options.map(opt => (
          <div
            key={opt.id}
            onClick={() => setChoice(opt.id)}
            style={{
              border: `2px solid ${choice === opt.id ? "#1A3C5E" : "#e2e8f0"}`,
              borderRadius: 10, padding: "14px 18px", cursor: "pointer",
              background: choice === opt.id ? "#EAF0F6" : "#F8FAFC",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: choice === opt.id ? "#1A3C5E" : "#e2e8f0", color: choice === opt.id ? "#fff" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "all 0.2s" }}>
                {opt.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2a3a", marginBottom: 3 }}>{opt.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{opt.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <div style={{ fontSize: 13, color: "#B91C1C", marginBottom: 12 }}>⚠ {error}</div>}
      <button
        onClick={handleSubmit}
        disabled={!choice || sending}
        style={{
          width: "100%", background: choice && !sending ? "#0D2B45" : "#e2e8f0",
          color: choice && !sending ? "#fff" : "#94a3b8",
          border: "none", borderRadius: 8, padding: "14px", fontSize: 15,
          fontWeight: 800, cursor: choice && !sending ? "pointer" : "default",
          fontFamily: "Georgia, serif", transition: "all 0.2s"
        }}
      >
        {sending
          ? (fr ? "Envoi en cours…" : "Sending…")
          : (fr ? "Confirmer et envoyer" : "Confirm and send")}
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ERSA() {
  const [screen, setScreen]           = useState("language");   // language | intro | intake | chat | report | share
  const [lang, setLang]               = useState("EN");
  const [intake, setIntake]           = useState({ name: "", business: "", products: "", markets: [], email: "" });
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [report, setReport]           = useState(null);
  const [phasesDetected, setPhasesDetected] = useState([]);
  const [error, setError]             = useState(null);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const fr = lang === "FR";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, report, screen]);

  // Build opening message with intake data
  const buildOpeningMessage = (intakeData, language) => {
    const marketList = intakeData.markets.join(", ") || "not specified";
    if (language === "FR") {
      return `Bonjour. Je m'appelle ${intakeData.name}. Mon entreprise s'appelle ${intakeData.business}. Nos produits principaux sont : ${intakeData.products}. Nos marchés cibles sont : ${marketList}. Je suis prêt(e) à commencer l'évaluation.`;
    }
    return `Hello. My name is ${intakeData.name}. My business is ${intakeData.business}. Our main products are: ${intakeData.products}. Our target markets are: ${marketList}. I'm ready to begin the assessment.`;
  };

  const startChat = async (intakeData) => {
    setScreen("chat");
    setLoading(true);
    setError(null);
    const opening = buildOpeningMessage(intakeData, lang);
    const initMessages = [{ role: "user", content: opening }];
    setMessages(initMessages);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: initMessages, system: SYSTEM_PROMPT })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.content?.[0]?.text || "";
      setMessages([...initMessages, { role: "assistant", content: reply }]);
    } catch { setError(fr ? "Erreur de connexion. Veuillez réessayer." : "Connection error. Please try again."); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setError(null);
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, system: SYSTEM_PROMPT })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.content?.[0]?.text || "";
      const parsed = parseReport(reply);
      if (parsed) {
        setReport(parsed);
        const preText = reply.slice(0, reply.indexOf("ERSA_REPORT_JSON:")).trim();
        setMessages([...newMessages, { role: "assistant", content: preText || (fr ? "Votre rapport est prêt." : "Your report is ready.") }]);
        setTimeout(() => setScreen("report"), 800);
      } else {
        setMessages([...newMessages, { role: "assistant", content: reply }]);
        setPhasesDetected(detectPhases([...newMessages, { role: "assistant", content: reply }]));
      }
    } catch { setError(fr ? "Erreur de connexion. Veuillez réessayer." : "Connection error. Please try again."); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const reset = () => {
    setScreen("language"); setLang("EN"); setIntake({ name: "", business: "", products: "", markets: [], email: "" });
    setMessages([]); setInput(""); setReport(null); setPhasesDetected([]); setError(null);
  };

  // ── SCREEN: Language ────────────────────────────────────────────────────────
  if (screen === "language") return (
    <div style={{ minHeight: "100vh", background: "#0D2B45", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#90CAF9", fontFamily: "monospace", marginBottom: 20, textTransform: "uppercase" }}>Passage Export Group</div>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>◈</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Export Readiness<br />Self-Assessment</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: 36 }}>Choose your language / Choisissez votre langue</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => { setLang("EN"); setScreen("intro"); }} style={{ background: "#fff", color: "#0D2B45", border: "none", borderRadius: 8, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif" }}>English</button>
          <button onClick={() => { setLang("FR"); setScreen("intro"); }} style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif" }}>Français</button>
        </div>
      </div>
    </div>
  );

  // ── SCREEN: Intro ───────────────────────────────────────────────────────────
  if (screen === "intro") return (
    <div style={{ minHeight: "100vh", background: "#0D2B45", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 580, width: "100%" }}>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "40px 40px 32px", color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#90CAF9", fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>Passage Export Group</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            {fr ? "Bienvenue sur ERSA" : "Welcome to ERSA"}
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
            {fr
              ? "Avant qu'un produit alimentaire mauricien puisse atteindre un rayon en Australie, au Royaume-Uni, en France ou au Canada, beaucoup de choses doivent être en ordre. Conformité réglementaire. Stabilité du produit. Emballage capable de survivre à six semaines de transport maritime. Conditions commerciales adaptées aux acheteurs internationaux. Et une entreprise prête à approvisionner de manière constante, à grande échelle, sur la durée."
              : "Before a Mauritian food product can reach a shelf in Australia, the UK, France, or Canada, a great deal has to be right. Regulatory compliance. Product stability. Packaging that survives a six-week sea journey. Commercial terms that work for international buyers. And a business ready to supply consistently, at scale, over time."}
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
            {fr
              ? "ERSA est conçu pour vous dire honnêtement où vous en êtes sur ces quatre dimensions — et ce que vous devez faire ensuite."
              : "ERSA is designed to tell you honestly where you stand across all four dimensions — and what to do next."}
          </p>

          {/* What you receive */}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#90CAF9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              {fr ? "CE QUE VOUS RECEVREZ" : "WHAT YOU'LL RECEIVE"}
            </div>
            {[
              fr ? "Un score de maturité export sur 135, réparti en quatre phases" : "An Export Readiness Score out of 135 across four phases",
              fr ? "Une analyse des écarts — ce qui doit changer et dans quel ordre" : "A gap analysis — what needs to change and in what order",
              fr ? "Un parcours Passage recommandé, spécifique à votre situation" : "A recommended Passage pathway specific to your situation",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
                <span style={{ color: "#90CAF9", flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Practical details */}
          <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { icon: "◷", label: fr ? "7–10 minutes" : "7–10 minutes" },
              { icon: "✉", label: fr ? "Rapport envoyé par e-mail" : "Report emailed to you" },
              { icon: "◈", label: fr ? "45 questions, 4 phases" : "45 questions, 4 phases" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#90CAF9" }}>{item.icon}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div style={{ background: "rgba(144,202,249,0.08)", border: "1px solid rgba(144,202,249,0.2)", borderRadius: 8, padding: "10px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: "#90CAF9" }}>
              {fr
                ? "🔒 À la fin de l'évaluation, vous choisirez comment vos résultats sont gérés. Vous contrôlez si Passage reçoit une copie."
                : "🔒 At the end of the assessment, you will choose how your results are handled. You are in control of whether Passage receives a copy."}
            </span>
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 28, fontStyle: "italic" }}>
            {fr
              ? "ERSA n'est pas une certification gouvernementale. Elle ne remplace pas le Certificat sanitaire d'exportation délivré par le ministère de la Santé et du Bien-être de Maurice."
              : "ERSA is not a government certification. It does not replace the Export Health Certificate issued by the Ministry of Health & Wellness of Mauritius."}
          </p>

          <button onClick={() => setScreen("intake")} style={{ width: "100%", background: "#fff", color: "#0D2B45", border: "none", borderRadius: 8, padding: "15px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {fr ? "Commencer l'évaluation →" : "Begin the assessment →"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── SCREEN: Intake ──────────────────────────────────────────────────────────
  if (screen === "intake") {
    const toggleMarket = (m) => {
      setIntake(prev => ({
        ...prev,
        markets: prev.markets.includes(m) ? prev.markets.filter(x => x !== m) : [...prev.markets, m]
      }));
    };
    const canProceed = intake.name.trim() && intake.business.trim() && intake.products.trim() && intake.markets.length > 0 && intake.email.trim();

    return (
      <div style={{ minHeight: "100vh", background: "#0D2B45", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif" }}>
        <div style={{ maxWidth: 520, width: "100%" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "36px 40px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#90CAF9", fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>
              {fr ? "Vos coordonnées" : "Your details"}
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 0 24px" }}>
              {fr ? "Avant de commencer" : "Before we begin"}
            </h3>

            {[
              { key: "name",     label: fr ? "Votre nom" : "Your name",           placeholder: fr ? "Prénom et nom" : "First and last name" },
              { key: "business", label: fr ? "Nom de l'entreprise" : "Business name", placeholder: fr ? "Nom de votre entreprise" : "Your business name" },
              { key: "products", label: fr ? "Gamme de produits" : "Product range",  placeholder: fr ? "Ex: Dal puris surgelés, faratas, snacks mauriciens" : "e.g. Frozen dal puris, faratas, Mauritian snacks" },
              { key: "email",    label: fr ? "Adresse e-mail" : "Email address",   placeholder: fr ? "Votre adresse e-mail" : "Your email address", type: "email" },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 6, letterSpacing: "0.05em" }}>{field.label.toUpperCase()}</label>
                <input
                  type={field.type || "text"}
                  value={intake[field.key]}
                  onChange={e => setIntake(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 14, fontFamily: "Georgia, serif", outline: "none" }}
                />
              </div>
            ))}

            {/* Market selection */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.05em" }}>
                {fr ? "MARCHÉS CIBLES" : "TARGET MARKETS"}
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TARGET_MARKETS.map(m => (
                  <button key={m} onClick={() => toggleMarket(m)} style={{
                    background: intake.markets.includes(m) ? "#fff" : "rgba(255,255,255,0.07)",
                    color: intake.markets.includes(m) ? "#0D2B45" : "rgba(255,255,255,0.6)",
                    border: `1px solid ${intake.markets.includes(m) ? "#fff" : "rgba(255,255,255,0.2)"}`,
                    borderRadius: 6, padding: "7px 14px", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", transition: "all 0.2s", fontFamily: "Georgia, serif"
                  }}>{m}</button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setIntake(prev => ({ ...prev })); startChat(intake); }}
              disabled={!canProceed}
              style={{
                width: "100%", background: canProceed ? "#fff" : "rgba(255,255,255,0.1)",
                color: canProceed ? "#0D2B45" : "rgba(255,255,255,0.3)",
                border: "none", borderRadius: 8, padding: "15px", fontSize: 15,
                fontWeight: 800, cursor: canProceed ? "pointer" : "default",
                fontFamily: "Georgia, serif", transition: "all 0.2s"
              }}
            >
              {fr ? "Commencer l'évaluation →" : "Start the assessment →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SCREEN: Chat ────────────────────────────────────────────────────────────
  if (screen === "chat") return (
    <div style={{ minHeight: "100vh", background: "#0D2B45", display: "flex", flexDirection: "column", fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#90CAF9", fontFamily: "monospace", textTransform: "uppercase" }}>Passage Export Group</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>ERSA — {fr ? "Évaluation en cours" : "Assessment in progress"}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }} title={fr ? "Progression" : "Progress"}>
            {PHASES.map(ph => (
              <div key={ph.key} style={{ width: 8, height: 8, borderRadius: "50%", background: phasesDetected.includes(ph.key) ? ph.color : "rgba(255,255,255,0.2)", transition: "background 0.4s" }} />
            ))}
          </div>
          <button onClick={reset} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "monospace" }}>
            {fr ? "Recommencer" : "Restart"}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 16, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A3C5E", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#90CAF9", marginRight: 10, flexShrink: 0, marginTop: 2 }}>◈</div>
              )}
              <div style={{
                maxWidth: "78%",
                background: m.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.06)",
                border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                padding: "12px 16px", color: m.role === "user" ? "#0D2B45" : "rgba(255,255,255,0.88)",
                fontSize: 14, lineHeight: 1.7, fontWeight: m.role === "user" ? 600 : 400, whiteSpace: "pre-wrap"
              }}>{m.content}</div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A3C5E", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#90CAF9", marginRight: 10, flexShrink: 0 }}>◈</div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px 16px 16px 16px", padding: "14px 20px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#90CAF9", animation: `ersa-pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          {error && <div style={{ background: "#FEE2E2", border: "1px solid #B91C1C40", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#B91C1C" }}>⚠ {error}</div>}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "16px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
            placeholder={fr ? "Tapez votre réponse…" : "Type your response…"}
            disabled={loading}
            style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "Georgia, serif", outline: "none", opacity: loading ? 0.5 : 1 }}
          />
          <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{ background: input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.1)", color: input.trim() && !loading ? "#0D2B45" : "rgba(255,255,255,0.3)", border: "none", borderRadius: 10, padding: "12px 20px", fontSize: 16, cursor: input.trim() && !loading ? "pointer" : "default", transition: "all 0.2s", fontWeight: 800 }}>→</button>
        </div>
        <div style={{ maxWidth: 680, margin: "8px auto 0" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
            {phasesDetected.length}/4 {fr ? "phases couvertes" : "phases covered"}
          </span>
        </div>
      </div>
      <style>{`@keyframes ersa-pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}input::placeholder{color:rgba(255,255,255,0.25)}input:focus{border-color:rgba(255,255,255,0.35)!important}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:2px}`}</style>
    </div>
  );

  // ── SCREEN: Report + Share ──────────────────────────────────────────────────
  if (screen === "report" || screen === "share") return (
    <div style={{ minHeight: "100vh", background: "#0D2B45", padding: "32px 24px", fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <ReportCard report={report} lang={lang} />
        </div>
        <ShareChoice report={report} intake={intake} lang={lang} onDone={() => {}} />
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button onClick={reset} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: 8, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {fr ? "Nouvelle évaluation" : "Start new assessment"}
          </button>
        </div>
      </div>
      <style>{`::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:2px}`}</style>
    </div>
  );

  return null;
}
