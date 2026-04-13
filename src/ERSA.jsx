import { useEffect, useRef, useState, useCallback } from "react";

// ── CSS injected once ─────────────────────────────────────────────────────────
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;margin:0;padding:0;font-family:Georgia,serif;color:#fff;background:#0D2B45 !important;overflow-x:hidden}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D2B45}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.25);border-radius:3px}
.ersa-wrap{min-height:100vh;min-height:100dvh;background:#0D2B45;color:#fff;overflow-x:hidden;max-width:100vw}
.screen{display:none;min-height:100vh;min-height:100dvh;background:#0D2B45;color:#fff;align-items:center;justify-content:center;padding:24px}
.screen.active{display:flex;flex-direction:column}
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
.chat-screen{display:flex;flex-direction:column;padding:0;height:100vh;height:100dvh;background:#0D2B45;overflow:hidden;max-width:100vw}
.chat-header{background:rgba(0,0,0,.3);border-bottom:1px solid rgba(255,255,255,.08);padding:12px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.chat-title{font-size:14px;font-weight:800}
.phase-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);transition:background .4s;display:inline-block}
.restart-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);border-radius:6px;padding:6px 12px;font-size:11px;cursor:pointer;font-family:monospace}
.messages-area{flex:1;overflow-y:auto;overflow-x:hidden;padding:24px 24px 16px}
.msg-inner{max-width:680px;margin:0 auto}
.msg-row{margin-bottom:16px;display:flex}
.msg-row.user{justify-content:flex-end}
.ai-avatar{width:28px;height:28px;border-radius:50%;background:#1A3C5E;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:12px;color:#90CAF9;margin-right:10px;flex-shrink:0;margin-top:2px}
.bubble{max-width:78%;padding:12px 16px;font-size:14px;line-height:1.7}
.bubble.user{background:rgba(255,255,255,.9);color:#0D2B45;border-radius:16px 16px 4px 16px;font-weight:600;white-space:pre-wrap}
.bubble.ai{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.88);border-radius:4px 16px 16px 16px;white-space:normal}
.typing{display:flex;gap:6px;padding:4px 0}
.dot{width:6px;height:6px;border-radius:50%;background:#90CAF9;animation:pulse 1.2s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
.answers-block{padding-left:38px;margin-bottom:16px;max-width:calc(680px + 48px);margin-left:auto;margin-right:auto;width:100%}
.ref-card{background:rgba(26,92,56,.15);border:1px solid rgba(26,92,56,.35);border-radius:10px;padding:12px 16px;margin-bottom:10px}
.ref-label{font-size:11px;font-weight:700;color:#6EE7B7;letter-spacing:.06em;text-transform:uppercase;font-family:monospace;margin-bottom:6px}
.ref-title{font-size:13px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:4px}
.ref-desc{font-size:12px;color:rgba(255,255,255,.65);line-height:1.6;margin-bottom:8px}
.ref-link{font-size:12px;font-weight:700;color:#6EE7B7;text-decoration:none}
.ans-btn{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:11px 16px;color:rgba(255,255,255,.88);font-size:14px;text-align:left;cursor:pointer;font-family:Georgia,serif;line-height:1.5;transition:all .15s;margin-bottom:8px;display:block}
.ans-btn:hover:not(.dimmed):not(.selected):not(.submitted){background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.4)}
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
.text-input{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;font-family:Georgia,serif;outline:none;min-width:0}
.text-input::placeholder{color:rgba(255,255,255,.25)}
.text-input:focus{border-color:rgba(255,255,255,.35)}
.send-arrow{background:#fff;color:#0D2B45;border:none;border-radius:10px;padding:12px 20px;font-size:16px;font-weight:800;cursor:pointer;flex-shrink:0}
.send-arrow:disabled{background:rgba(255,255,255,.1);color:rgba(255,255,255,.3);cursor:default}
.phases-label{font-size:10px;color:rgba(255,255,255,.25);font-family:monospace;margin-top:8px;max-width:680px;margin-left:auto;margin-right:auto}
.error-msg{background:#FEE2E2;border:1px solid rgba(185,28,28,.4);border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#B91C1C}
.test-banner{background:#B7620A;color:#fff;text-align:center;padding:6px 12px;font-size:11px;font-family:monospace;letter-spacing:.05em}
.report-screen{background:#f8f6f2;min-height:100vh;padding:32px 24px;display:flex;flex-direction:column;align-items:center}
.report-wrap{max-width:680px;width:100%}
.new-btn{background:rgba(13,43,69,.08);border:1px solid rgba(13,43,69,.15);color:rgba(13,43,69,.5);border-radius:8px;padding:10px 24px;font-size:13px;cursor:pointer;font-family:Georgia,serif;width:100%;text-align:center;display:block;margin-top:16px;margin-bottom:8px}
@media print{
  .test-banner,.lang-screen,.intake-screen,.chat-screen,.new-btn{display:none!important}
  .report-screen{display:block!important;padding:0!important;background:white!important;min-height:auto!important}
  .report-wrap{max-width:100%!important;width:100%!important}
  .report-screen>div{overflow:visible!important;max-height:none!important;height:auto!important}
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}
  @page{margin:0;size:A4}
}
`;

// ── Constants ─────────────────────────────────────────────────────────────────
const COLD_CHAIN_KEYS = new Set(["Q28","Q29","Q30"]);
const MULTI_SELECT = new Set(["Q27"]);
const NO_ADVANCE_OPTIONS = new Set(["Unsure — I'd like to understand more","Je ne suis pas sûr(e) — j'aimerais en savoir plus"]);
// Context box removed — assessment is first-pass only, auto-submits on every button click
const REFS = {
  Q16:{title:"Allergen declaration requirements",desc:"The full list of declarable allergens differs by market. Check the guide before answering."},
  Q17:{title:"Nutrition panel format by market",desc:"Each target market requires a different nutrition panel format."},
  Q19:{title:"Country of origin wording",desc:"Each market has specific requirements for country of origin declaration."},
  Q21:{title:"GS1 barcode registration",desc:"All four markets require a registered EAN-13 GS1 barcode."},
  Q22:{title:"Label language requirements",desc:"AU/UK = English; Canada = bilingual EN/FR mandatory; France = French mandatory."},
};
const BAND = {
  "Pre-readiness":{c:"#B91C1C",bg:"#FEE2E2",l:"Pre-Readiness"},
  "Developing":{c:"#B7620A",bg:"#FEF3E2",l:"Developing"},
  "Near-ready":{c:"#2E86C1",bg:"#EBF5FB",l:"Near-Ready"},
  "Export-ready":{c:"#1A5C38",bg:"#EAFAF1",l:"Export-Ready"},
};
const PW = {
  "Incubation":{c:"#B91C1C",d:"Passage Supplier Incubation Programme"},
  "Product Development Services":{c:"#B7620A",d:"Passage Product Development Services"},
  "Targeted Verification":{c:"#2E86C1",d:"Targeted Gap Remediation + Verification"},
  "Verification":{c:"#1A5C38",d:"Passage Supplier Verification"},
};
const PHC = ["#1A3C5E","#1A5C38","#B7620A","#6B21A8"];
const Q_SEQUENCE = [
  "GATE1","GATE2",
  "Q01","Q02","Q03","Q04","Q05","Q06",
  "Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15",
  "Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23",
  "Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34",
  "Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"
];

const OPTS = {
  GATE1:["Yes — registered and compliant","In progress — registration underway","No — not yet registered"],
  GATE2:["Yes — current and valid","Expired — renewal in progress","No — no licence held"],
  Q01:["Yes — Export Health Certificate (EHC) held for at least one product","Not yet — but facility is inspection-ready","Not yet — facility preparation required"],
  Q02:["Yes — facility meets inspection standards","Possibly — some improvements are required before inspection","No — significant preparation is needed before an inspection could be requested"],
  Q03:["HACCP — Hazard Analysis and Critical Control Points","ISO 22000 — Food Safety Management System","Both HACCP and ISO 22000","Internal food safety procedures — not formally certified","No structured food safety system in place"],
  Q04:["Yes — all CCPs documented, monitored, and recorded","Partially — some documentation in place","No — hazard controls are informal or undocumented"],
  Q05:["Yes — full ingredient traceability records maintained","Partially — traceability records incomplete or inconsistent","No — no formal traceability system in place"],
  Q06:["Yes — full batch traceability from production to despatch","Partially — some records maintained but not systematically","No — no finished goods traceability system"],
  Q07:["No — plant-based or mineral ingredients only","Yes — dairy or egg ingredients","Yes — meat or seafood ingredients","Yes — honey or other animal-derived ingredients"],
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

const OPTS_FR = {
  GATE1:["Oui — enregistrée et conforme","En cours — enregistrement en cours","Non — pas encore enregistrée"],
  GATE2:["Oui — valide et à jour","Expirée — renouvellement en cours","Non — aucune licence détenue"],
  Q01:["Oui — Certificat sanitaire à l'exportation (CSE) obtenu pour au moins un produit","Pas encore — mais l'installation est prête pour une inspection","Pas encore — préparation de l'installation requise"],
  Q02:["Oui — l'installation répond aux normes d'inspection","Peut-être — des améliorations sont nécessaires avant l'inspection","Non — une préparation importante est nécessaire avant de demander une inspection"],
  Q03:["HACCP","ISO 22000","HACCP et ISO 22000","Procédures internes — sans certification formelle","Aucun système structuré en place"],
  Q04:["Oui — tous les CCP documentés, surveillés et enregistrés","Partiellement — certaine documentation en place","Non — les contrôles sont informels ou non documentés"],
  Q05:["Oui — traçabilité complète des ingrédients","Partiellement — enregistrements incomplets","Non — aucun système formel de traçabilité"],
  Q06:["Oui — traçabilité complète des lots à l'expédition","Partiellement — certains enregistrements maintenus","Non — aucun système de traçabilité des produits finis"],
  Q07:["Non — ingrédients d'origine végétale ou minérale uniquement","Oui — ingrédients laitiers ou œufs","Oui — viande ou fruits de mer","Oui — miel ou autres ingrédients d'origine animale"],
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


// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function detectQ(t){
  const all=[...t.matchAll(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g)];
  if(!all.length) return null;
  return all[all.length-1][1];
}
function cleanMsg(t){ const jsonIdx=t.indexOf('ERSA_REPORT_JSON:'); const jsonIdx2=t.indexOf('{"producerName"'); const cutAt=jsonIdx>=0?jsonIdx:(jsonIdx2>=0?jsonIdx2:-1); const cleaned=cutAt>=0?t.slice(0,cutAt).trim():t; return cleaned.replace(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g,'').replace(/\*\*/g,'').replace(/\*/g,'').replace(/#{1,6}\s/g,'').trim(); }
function parseReport(t){
  if(!t) return null;
  const i=t.indexOf("ERSA_REPORT_JSON:");
  // Try primary path: find ERSA_REPORT_JSON: marker
  if(i>=0){
    try{
      const s=t.slice(i+17).trim();
      const start=s.indexOf("{");
      const end=s.lastIndexOf("}");
      if(start>=0&&end>start){
        const parsed=JSON.parse(s.slice(start,end+1));
        if(parsed&&(parsed.totalScore!==undefined||parsed.producerName!==undefined)) return parsed;
      }
    }catch(e){}
    return {_parseError:true}; // Marker found but JSON failed — stop assessment
  }
  // Fallback: scan for a JSON blob containing producerName (handles missing marker)
  try{
    const start=t.indexOf('{"producerName"');
    if(start>=0){
      const end=t.lastIndexOf("}");
      if(end>start){
        const parsed=JSON.parse(t.slice(start,end+1));
        if(parsed&&(parsed.totalScore!==undefined||parsed.producerName!==undefined)) return parsed;
      }
    }
  }catch(e){}
  return null;
}
function qKeyToNum(qKey){
  if(!qKey) return null;
  if(qKey==="GATE1") return 1;
  if(qKey==="GATE2") return 2;
  const m=qKey.match(/Q(\d{2})/);
  if(m) return parseInt(m[1])+2;
  return null;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ERSA() {
  const [screen, setScreen] = useState("lang"); // lang | intake | chat | report
  const [lang, setLangState] = useState("EN");
  const [mkts, setMkts] = useState([]);
  const [formVals, setFormVals] = useState({name:"",biz:"",prod:"",email:""});
  const [messages, setMessages] = useState([]);
  const [chatItems, setChatItems] = useState([]); // rendered chat items
  const [loading, setLoading] = useState(false);
  const [phasesLit, setPhasesLit] = useState(new Set());
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState("0 of 45");
  const [typedInput, setTypedInput] = useState("");
  const [report, setReport] = useState(null);

  // Mutable refs for sequence logic (don't trigger re-render)
  const currentQIndexRef = useRef(-1);
  const pendingNoAdvanceRef = useRef(false);
  const abortControllerRef = useRef(null); // Abort in-flight API calls on restart
  const reportAttemptsRef = useRef(0); // Track retry attempts for final report
  const storageClassRef = useRef(null);
  const messagesRef = useRef([]);
  const loadingRef = useRef(false);
  const langRef = useRef("EN");
  const lastCallTimeRef = useRef(0); // Throttle: track when last API call fired

  const messagesEndRef = useRef(null);
  const textInputRef = useRef(null);

  const fr = () => langRef.current === "FR";

  // Inject CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback((delay=80) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, delay);
  }, []);

  // ── Sequence logic ──────────────────────────────────────────────────────────
  function advanceQuestion(tagFromAI) {
    const idx = currentQIndexRef.current;
    if(tagFromAI && Q_SEQUENCE.includes(tagFromAI)){
      const tagIdx = Q_SEQUENCE.indexOf(tagFromAI);
      if(tagIdx > idx){
        if(storageClassRef.current==="ambient" && COLD_CHAIN_KEYS.has(tagFromAI)){
          currentQIndexRef.current = Q_SEQUENCE.indexOf("Q31");
          return "Q31";
        }
        currentQIndexRef.current = tagIdx;
        return tagFromAI;
      }
    }
    let next = idx + 1;
    while(next < Q_SEQUENCE.length && storageClassRef.current==="ambient" && COLD_CHAIN_KEYS.has(Q_SEQUENCE[next])){
      next++;
    }
    currentQIndexRef.current = Math.min(next, Q_SEQUENCE.length - 1);
    return Q_SEQUENCE[currentQIndexRef.current];
  }

  // ── Update progress ─────────────────────────────────────────────────────────
  function updateProgress(qKey) {
    const n = qKeyToNum(qKey);
    if(!n) return;
    const pct = Math.round((n/45)*100);
    setProgressPct(pct);
    setProgressLabel(`${n} of 45`);
  }

  // ── Update phase dots ───────────────────────────────────────────────────────
  function updatePhases(text) {
    const t = text.toLowerCase();
    setPhasesLit(prev => {
      const next = new Set(prev);
      if(t.match(/registr|licen|haccp|certif|traceab|export health|ehc/)) next.add(0);
      if(t.match(/shelf.?life|packag|label|allergen|barcode|nutrition|ingredient|frozen|chilled|ambient/)) next.add(1);
      if(t.match(/capac|cold.?chain|reefer|quality.?check|supply|dispatch|despatch/)) next.add(2);
      if(t.match(/pric|payment|invoice|moq|working.?capital|insur|recall/)) next.add(3);
      return next;
    });
  }

  // ── Format AI message text ──────────────────────────────────────────────────
  function formatMessageText(rawText) {
    let parts = rawText.split(/\n+/).map(p=>p.trim()).filter(p=>p.length>0);
    if(parts.length===1 && parts[0].includes("?")){
      const text = parts[0];
      const lastQ = text.lastIndexOf("?");
      let splitAt = -1;
      for(let i=lastQ-1;i>10;i--){
        if((text[i]==="."||text[i]==="!") && text[i+1]===" " && text[i+2]===text[i+2].toUpperCase()){
          splitAt=i; break;
        }
      }
      if(splitAt>10){
        const before = text.slice(0,splitAt+1).trim();
        const after = text.slice(splitAt+1).trim();
        if(before && after) parts=[before,after];
      }
    }
    if(parts.length<=1) return `<p style="margin:0">${esc(rawText)}</p>`;
    return parts.map(p=>`<p style="margin:0 0 10px 0">${esc(p)}</p>`).join("");
  }

  // ── Build synthesis digest (used at Q43 to reduce token payload) ──────────
  function buildSynthesisDigest() {
    // Extract all user answers in Q-sequence order
    // Produces a compact text digest: ~1,500 tokens vs ~6,000 for full history
    const userMsgs = messagesRef.current.filter(m => m.role === "user");
    // First message is the producer intro — keep it
    const intro = userMsgs[0]?.content || "";
    // Remaining messages are answers, one per question
    const answers = userMsgs.slice(1).map((m, i) => {
      const qKey = Q_SEQUENCE[i] || `Q${String(i).padStart(2,"0")}`;
      return `${qKey}: ${m.content.split("\n")[0].trim()}`;
    });
    const digest = `Producer intro: ${intro}\n\nAssessment answers (complete):\n${answers.join("\n")}`;
    return digest;
  }

  // ── API call ────────────────────────────────────────────────────────────────
  async function callAPI() {
    try {
      abortControllerRef.current = new AbortController();

      // Throttle: if last call was < 3s ago, wait the remainder before firing
      // Prevents burst 429s when a producer clicks through questions quickly
      const now = Date.now();
      const msSinceLast = now - lastCallTimeRef.current;
      const MIN_CALL_GAP = 3000; // 3 seconds between calls
      if(msSinceLast < MIN_CALL_GAP && lastCallTimeRef.current > 0){
        await new Promise(r => setTimeout(r, MIN_CALL_GAP - msSinceLast));
      }
      lastCallTimeRef.current = Date.now();

      // Determine if this is the synthesis call
      // Q43 is the last question (index 44 in Q_SEQUENCE).
      // When user answers Q43, currentQIndexRef is still at 44 (not yet advanced).
      // The last AI message's questionKey will be "Q43".
      // We detect synthesis by checking: currentQIndex is at Q43 AND user has answered it
      // (i.e. there are more user messages than AI messages, meaning AI asked Q43, user answered).
      const aiMsgs = messagesRef.current.filter(m => m.role === "assistant");
      const lastAIMsg = aiMsgs[aiMsgs.length - 1];
      const lastAIQKey = lastAIMsg?.questionKey || null;
      const isSynthesisCall = lastAIQKey === "Q43";

      let messagesToSend;
      if(isSynthesisCall) {
        // SYNTHESIS MODE: send compact digest instead of full history
        // Cuts payload from ~6,000 tokens to ~1,500 tokens
        // This is the primary fix for 429s on the final report generation call
        const digest = buildSynthesisDigest();
        messagesToSend = [
          {
            role: "user",
            content: digest + "\n\nAll 45 questions have been answered. Please now generate the complete ERSA report JSON. Output only ERSA_REPORT_JSON: followed immediately by the complete JSON object. No other text."
          }
        ];
      } else {
        // NORMAL MODE: DROP old AI messages entirely, keep only user answers + last 2 AI messages
        //
        // WHY: The AI receiving its own old messages (even at 60 chars) reproduces truncated
        // text in acknowledgements, causing "...compl..." artifacts on screen.
        // Old AI messages are redundant — the system prompt defines every question already.
        // The AI only needs: (1) producer intro, (2) all user answers, (3) its last 2 responses.
        // This cuts mid-assessment payload by ~70% and eliminates the truncation bug entirely.
        const all = messagesRef.current.map(m => ({role: m.role, content: m.content}));
        if(all.length <= 4) {
          messagesToSend = all;
        } else {
          const opening = all[0]; // Producer intro — always full
          // Find last 2 AI message indices
          const aiIndices = [];
          for(let i = 1; i < all.length; i++){
            if(all[i].role === "assistant") aiIndices.push(i);
          }
          const keepFullFrom = aiIndices.length >= 2 ? aiIndices[aiIndices.length - 2] : (aiIndices[0] ?? 1);
          const filtered = [];
          for(let i = 1; i < all.length; i++){
            const m = all[i];
            if(m.role === "user"){
              filtered.push(m); // All user answers — always full, always included
            } else if(i >= keepFullFrom){
              filtered.push(m); // Last 2 AI messages — kept full for context
            }
            // Older AI messages: DROPPED entirely. System prompt has all question text.
          }
          messagesToSend = [opening, ...filtered];
        }
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({messages: messagesToSend, isSynthesis: isSynthesisCall, language: langRef.current}),
        signal: abortControllerRef.current.signal
      });
      if(!res.ok) throw new Error(res.status);
      const data = await res.json();
      const reply = data.content?.[0]?.text || "";
      const reportData = parseReport(reply);
      if(reportData && reportData._parseError){
        // JSON detected but malformed — offer retry
        setLoading(false);
        loadingRef.current = false;
        reportAttemptsRef.current += 1;
        const errCode = "ERR-" + Date.now().toString(36).toUpperCase().slice(-6);
        const isFrNow = fr();
        if(reportAttemptsRef.current >= 2){
          const finalErrMsg = isFrNow
            ? "L'évaluation est complète mais le rapport n'a pas pu être généré après deux tentatives. Veuillez contacter info@passageexport.com en joignant une capture d'écran de ce message.\n\nCode de référence : " + errCode
            : "The assessment is complete but the report could not be generated after two attempts. Please contact info@passageexport.com and attach a screenshot of this message.\n\nReference code: " + errCode;
          setChatItems(prev => [...prev, {type:"ai", text:finalErrMsg, qKey:null, isGateFail:false, id:Date.now()+Math.random()}]);
        } else {
          const retryMsg = isFrNow
            ? "L'évaluation est complète mais une erreur technique a empêché la génération du rapport."
            : "The assessment is complete but a technical error prevented the report from generating.";
          setChatItems(prev => [...prev, {type:"retryPrompt", text:retryMsg, isReportError:true, id:Date.now()+Math.random()}]);
        }
        return;
      }
      if(reportData){
        setLoading(false);
        loadingRef.current = false;
        reportAttemptsRef.current = 0;
        const preparingMsg = fr()
          ? "Votre évaluation est maintenant terminée. Je compile votre rapport — cela peut prendre jusqu'à deux minutes. Veuillez ne pas fermer cet onglet."
          : "Your assessment is now complete. I'm compiling your Export Readiness Report — this may take up to two minutes. Please do not close this tab.";
        setChatItems(prev => [...prev, {type:"ai", text:preparingMsg, qKey:null, isGateFail:false, id:Date.now()+Math.random()}]);
        setTimeout(() => {
          setReport(reportData);
          setTimeout(() => setScreen("report"), 100);
          fetch("/api/notify", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              band: reportData.band || "",
              score: reportData.totalScore || 0,
              markets: reportData.targetMarkets || [],
              language: reportData.language || "EN",
              timestamp: new Date().toISOString()
            })
          }).catch(() => {});
        }, 2200);
        return;
      }
      const replyLower = reply.toLowerCase();
      const isGateFail = (replyLower.includes("not eligible") || replyLower.includes("non éligible") || replyLower.includes("pas éligible")) && currentQIndexRef.current <= 1;
      const tagFromAI = detectQ(reply);
      const lastUserMsg = messagesRef.current.filter(m => m.role === "user").slice(-1)[0]?.content || "";
      const lastAnswerLine = lastUserMsg.split("\n")[0].trim();
      const isUnsureAnswer = NO_ADVANCE_OPTIONS.has(lastAnswerLine);
      let qKey;
      if(isGateFail){
        qKey = null;
      } else if(isUnsureAnswer || pendingNoAdvanceRef.current){
        pendingNoAdvanceRef.current = false;
        qKey = Q_SEQUENCE[currentQIndexRef.current];
      } else {
        qKey = advanceQuestion(tagFromAI);
      }
      const clean = cleanMsg(reply);
      messagesRef.current = [...messagesRef.current, {role:"assistant", content:clean, questionKey:qKey}];
      setMessages([...messagesRef.current]);
      setLoading(false);
      loadingRef.current = false;
      reportAttemptsRef.current = 0;
      updatePhases(clean);
      updateProgress(qKey);
      setChatItems(prev => [...prev, {type:"ai", text:clean, qKey, isGateFail, id:Date.now()+Math.random()}]);
      scrollToBottom(300);
    } catch(e) {
      if(e.name === "AbortError") return;
      setLoading(false);
      loadingRef.current = false;
      reportAttemptsRef.current += 1;
      const errCode = "ERR-" + Date.now().toString(36).toUpperCase().slice(-6);
      if(reportAttemptsRef.current >= 2){
        const finalErrMsg = fr()
          ? "La connexion a échoué après deux tentatives. Veuillez contacter info@passageexport.com en joignant une capture d'écran de ce message.\n\nCode de référence : " + errCode
          : "The connection failed after two attempts. Please contact info@passageexport.com and attach a screenshot of this message.\n\nReference code: " + errCode;
        setChatItems(prev => [...prev, {type:"ai", text:finalErrMsg, qKey:null, isGateFail:false, id:Date.now()+Math.random()}]);
      } else {
        const retryMsg = fr()
          ? "Une erreur de connexion s'est produite. Vos réponses sont préservées."
          : "A connection error occurred. Your answers have been preserved.";
        setChatItems(prev => [...prev, {type:"retryPrompt", text:retryMsg, isReportError:false, id:Date.now()+Math.random()}]);
      }
      scrollToBottom();
    }
  }

  // ── Send message ────────────────────────────────────────────────────────────
  async function sendMessage(text) {
    if(!text.trim() || loadingRef.current) return;
    // Detect storage classification from Q08
    // Coffee break interstitial — inject after Q23 answer, before sending to API
    if(Q_SEQUENCE[currentQIndexRef.current]==="Q23"){
      setChatItems(prev => [...prev, {type:"user", text, id:Date.now()+Math.random()}]);
      setChatItems(prev => [...prev, {type:"coffeebreak", id:Date.now()+Math.random(), lang:langRef.current, onContinue:() => {
        messagesRef.current = [...messagesRef.current, {role:"user",content:text}];
        setMessages([...messagesRef.current]);
        setLoading(true);
        loadingRef.current = true;
        callAPI();
      }}]);
      scrollToBottom(400);
      return;
    }
    if(Q_SEQUENCE[currentQIndexRef.current]==="Q08"){
      const t = text.toLowerCase();
      if(t.includes("ambient")||t.includes("shelf-stable")||t.includes("shelf stable")) storageClassRef.current="ambient";
      else if(t.includes("chilled")) storageClassRef.current="chilled";
      else if(t.includes("frozen")) storageClassRef.current="frozen";
    }
    // Q43 is the last question — show a holding message immediately before the API call fires
    // The synthesis call takes longer than a normal question. Producers need to know why.
    const isLastQuestion = Q_SEQUENCE[currentQIndexRef.current] === "Q43";
    messagesRef.current = [...messagesRef.current, {role:"user",content:text}];
    setMessages([...messagesRef.current]);
    setChatItems(prev => [...prev, {type:"user", text, id:Date.now()+Math.random()}]);
    if(isLastQuestion){
      const holdMsg = fr()
        ? "Merci — vous avez complété les 45 questions. Je compile maintenant votre rapport d'évaluation. Cela peut prendre 1 à 2 minutes — merci de ne pas fermer cet onglet."
        : "Thank you — you've completed all 45 questions. I'm now compiling your Export Readiness Report. This may take 1 to 2 minutes — please don't close this tab.";
      setChatItems(prev => [...prev, {type:"ai", text:holdMsg, qKey:null, isGateFail:false, id:Date.now()+Math.random()}]);
    }
    setLoading(true);
    loadingRef.current = true;
    scrollToBottom();
    await callAPI();
  }

  // ── Start chat ──────────────────────────────────────────────────────────────
  async function startChat() {
    const {name,biz,prod,email} = formVals;
    if(!name||!biz||!prod||!email||!mkts.length) return;
    currentQIndexRef.current = -1;
    pendingNoAdvanceRef.current = false;
    storageClassRef.current = null;
    messagesRef.current = [];
    setChatItems([]);
    setMessages([]);
    setPhasesLit(new Set());
    setProgressPct(0);
    setProgressLabel("0 of 45");
    setScreen("chat");
    const opening = fr()
      ? `Bonjour. Je m'appelle ${name}. Mon entreprise s'appelle ${biz}. Produits : ${prod}. Marchés : ${mkts.join(", ")}. Prêt(e).`
      : `Hello. My name is ${name}. My business is ${biz}. Products: ${prod}. Target markets: ${mkts.join(", ")}. Ready to begin.`;
    messagesRef.current = [{role:"user",content:opening}];
    setMessages([...messagesRef.current]);
    setLoading(true);
    loadingRef.current = true;
    await callAPI();
    scrollToBottom(800);
  }

  // ── Restart ─────────────────────────────────────────────────────────────────
  async function retryReport(isReportError=true) {
    // Called from retry button — does NOT add any message to history
    // Just re-calls the API with existing history so AI re-synthesises
    if(loadingRef.current) return;
    const retryingMsg = isReportError
      ? (fr() ? "Je réessaie de générer votre rapport. Veuillez patienter..." : "Retrying report generation. Please wait...")
      : (fr() ? "Je réessaie la connexion. Vos réponses sont préservées..." : "Retrying connection. Your answers have been preserved...");
    setChatItems(prev => [...prev, {type:"ai", text:retryingMsg, qKey:null, isGateFail:false, id:Date.now()+Math.random()}]);
    setLoading(true);
    loadingRef.current = true;
    scrollToBottom(300);
    await callAPI();
  }

  function restart() {
    // Abort any in-flight API call so it cannot corrupt reset state
    if(abortControllerRef.current) abortControllerRef.current.abort();
    reportAttemptsRef.current = 0;
    currentQIndexRef.current = -1;
    pendingNoAdvanceRef.current = false;
    storageClassRef.current = null;
    messagesRef.current = [];
    setMessages([]);
    setChatItems([]);
    setMkts([]);
    setFormVals({name:"",biz:"",prod:"",email:""});
    setPhasesLit(new Set());
    setProgressPct(0);
    setProgressLabel("0 of 45");
    setReport(null);
    setScreen("lang");
  }

  const dotColors = ["#1A3C5E","#1A5C38","#B7620A","#6B21A8"];
  const formReady = formVals.name&&formVals.biz&&formVals.prod&&formVals.email&&mkts.length>0;

  // ── Render ──────────────────────────────────────────────────────────────────
  if(screen==="lang") return (
    <div className="ersa-wrap screen active" style={{alignItems:"center",justifyContent:"center",padding:"24px 24px 40px"}}>
      <div style={{textAlign:"center",maxWidth:480,width:"100%"}}>
        <div className="eyebrow">Passage Export Group</div>
        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 24px"}}>◈</div>
        <h1>Export Readiness<br/>Self-Assessment</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,.4)",fontStyle:"italic",marginBottom:32}}>Choose your language / Choisissez votre langue</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:32}}>
          <button className="btn-primary" onClick={()=>{langRef.current="EN";setLangState("EN");setScreen("intake");}}>English</button>
          <button className="btn-ghost" onClick={()=>{langRef.current="FR";setLangState("FR");setScreen("intake");}}>Français</button>
        </div>
        {/* Soft launch notice */}
        <div style={{background:"rgba(183,98,10,0.15)",border:"1px solid rgba(183,98,10,0.4)",borderLeft:"3px solid #B7620A",borderRadius:8,padding:"16px 20px",textAlign:"left",marginBottom:20}}>
          <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#B7620A",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:8}}>⚠ Soft Launch — April 2026</div>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.7,margin:0}}>
            This tool is in its first weeks of operation. You may occasionally experience a slow response or a connection error during the assessment — particularly at the end when your report is being compiled. If this happens, a retry button will appear. In most cases a single retry is all that is needed.
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.7,margin:"10px 0 0 0"}}>
            If you are unable to complete the assessment, please contact us directly at <span style={{color:"#90CAF9",fontFamily:"monospace"}}>info@passageexport.com</span> and we will assist you personally.
          </p>
        </div>
        {/* FR version of notice */}
        <div style={{background:"rgba(183,98,10,0.1)",border:"1px solid rgba(183,98,10,0.3)",borderLeft:"3px solid #B7620A",borderRadius:8,padding:"16px 20px",textAlign:"left",marginBottom:24}}>
          <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#B7620A",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:8}}>⚠ Lancement en phase pilote — Avril 2026</div>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:0}}>
            Cet outil est dans ses premières semaines de fonctionnement. Vous pourrez occasionnellement rencontrer une réponse lente ou une erreur de connexion — notamment à la fin lors de la génération du rapport. Un bouton de nouvelle tentative apparaîtra si nécessaire.
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:"10px 0 0 0"}}>
            En cas de difficulté, contactez-nous directement à <span style={{color:"#90CAF9",fontFamily:"monospace"}}>info@passageexport.com</span>.
          </p>
        </div>
        <p style={{fontSize:11,color:"rgba(255,255,255,0.3)",textAlign:"center",lineHeight:1.6,fontFamily:"monospace",padding:"0 16px",margin:0}}>
          For best results, use a laptop or desktop. / Pour de meilleurs résultats, utilisez un ordinateur.
        </p>
      </div>
    </div>
  );

  if(screen==="intake") return (
    <div className="ersa-wrap screen active" style={{alignItems:"center",justifyContent:"center"}}>
      <div className="intake-card">
        <div className="eyebrow">{fr()?"Vos coordonnées":"Your details"}</div>
        <h1 style={{fontSize:20,marginBottom:24}}>{fr()?"Avant de commencer":"Before we begin"}</h1>
        <div className="field"><label>{fr()?"Votre nom":"Your name"}</label><input placeholder={fr()?"Prénom et nom":"First and last name"} value={formVals.name} onChange={e=>setFormVals(p=>({...p,name:e.target.value}))}/></div>
        <div className="field"><label>{fr()?"Nom de l'entreprise":"Business name"}</label><input placeholder={fr()?"Nom de votre entreprise":"Your business name"} value={formVals.biz} onChange={e=>setFormVals(p=>({...p,biz:e.target.value}))}/></div>
        <div className="field"><label>{fr()?"Gamme de produits":"Product range"}</label><input placeholder={fr()?"Ex: Dal puris congelés, faratas":"e.g. Frozen dal puris, faratas"} value={formVals.prod} onChange={e=>setFormVals(p=>({...p,prod:e.target.value}))}/></div>
        <div className="field"><label>{fr()?"Adresse e-mail":"Email address"}</label><input type="email" placeholder={fr()?"Votre adresse e-mail":"Your email address"} value={formVals.email} onChange={e=>setFormVals(p=>({...p,email:e.target.value}))}/></div>
        <div className="field">
          <label>{fr()?"Marchés cibles":"Target markets"}</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Australia","UK","France","Canada","Other"].map(m=>(
              <button key={m} className={`mkt-btn${mkts.includes(m)?" on":""}`} onClick={()=>setMkts(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m])}>{m}</button>
            ))}
          </div>
        </div>
        <button className={`start-btn ${formReady?"ready":"notready"}`} onClick={startChat}>{fr()?"Commencer l'évaluation →":"Begin the assessment →"}</button>
      </div>
    </div>
  );

  if(screen==="chat") return (
    <div className="chat-screen">
      <div className="test-banner">⚠ ERSA — Assessment in progress</div>
      <div className="chat-header">
        <div>
          <div className="eyebrow" style={{marginBottom:2}}>Passage Export Group</div>
          <div className="chat-title">{fr()?"ERSA — Évaluation en cours":"ERSA — Assessment in progress"}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",gap:6}}>
            {[0,1,2,3].map(i=>(
              <div key={i} className="phase-dot" style={{background:phasesLit.has(i)?dotColors[i]:"rgba(255,255,255,0.2)"}}/>
            ))}
          </div>
          <button className="restart-btn" onClick={restart}>Restart</button>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{background:"rgba(0,0,0,0.2)",padding:"8px 24px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,height:4,background:"rgba(255,255,255,0.1)",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",background:"#90CAF9",borderRadius:2,width:progressPct+"%",transition:"width 0.4s ease"}}/>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"monospace",whiteSpace:"nowrap",minWidth:80,textAlign:"right"}}>{progressLabel}</div>
        </div>
      </div>
      {/* Messages */}
      <div className="messages-area">
        <div className="msg-inner">
          {chatItems.map(item => <ChatItem key={item.id} item={item} lang={langRef.current} onSend={sendMessage} onRetry={retryReport} loadingRef={loadingRef} pendingNoAdvanceRef={pendingNoAdvanceRef}/>)}
          {loading && (
            <div className="msg-row ai">
              <div className="ai-avatar">◈</div>
              <div className="bubble ai"><div className="typing"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>
      </div>
      {/* Input bar */}
      <div className="input-bar">
        <div className="input-inner">
          <input ref={textInputRef} className="text-input" placeholder={fr()?"Ou tapez votre réponse…":"Or type your response…"} value={typedInput} onChange={e=>setTypedInput(e.target.value.slice(0,500))} maxLength={500} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();if(typedInput.trim()&&!loading){sendMessage(typedInput.trim());setTypedInput("");}}}} disabled={loading}/>
          <button className="send-arrow" disabled={!typedInput.trim()||loading} onClick={()=>{if(typedInput.trim()){sendMessage(typedInput.trim());setTypedInput("");}}}>{`→`}</button>
        </div>
        <div className="phases-label">{phasesLit.size}/4 {fr()?"phases couvertes":"phases covered"}</div>
      </div>
    </div>
  );

  if(screen==="report") return <ReportScreen report={report||{}} lang={langRef.current} onRestart={restart} messages={messagesRef.current}/>;

  return null;
}

// ── ChatItem component ────────────────────────────────────────────────────────
function ChatItem({item, lang, onSend, onRetry, loadingRef, pendingNoAdvanceRef}){
  const isFr = lang==="FR";

  if(item.type==="user") return (
    <div className="msg-row user">
      <div className="bubble user">{item.text}</div>
    </div>
  );

  if(item.type==="error") return (
    <div className="error-msg">⚠ {item.text}</div>
  );

  if(item.type==="retryPrompt") return (
    <div style={{paddingLeft:38,marginBottom:16,marginTop:8,maxWidth:"calc(680px + 48px)",marginLeft:"auto",marginRight:"auto",width:"100%"}}>
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"20px 24px"}}>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.7,marginBottom:16}}>{item.text}</div>
        <button className="ans-btn" style={{textAlign:"center",padding:"12px 16px",width:"100%"}}
          onClick={()=>{ onRetry(item.isReportError); }}>
          {item.isReportError
            ? (isFr?"↺ Réessayer de générer le rapport":"↺ Retry report generation")
            : (isFr?"↺ Réessayer la connexion":"↺ Retry connection")}
        </button>
      </div>
    </div>
  );

  if(item.type==="coffeebreak") return (
    <CoffeeBreak lang={item.lang} onContinue={item.onContinue}/>
  );

  if(item.type==="ai"){
    const {text, qKey, isGateFail} = item;
    const num = qKeyToNum(qKey);
    let displayHTML = formatMsgText(text);
    if(qKey && qKey!=="GATE1" && qKey!=="GATE2" && num){
      displayHTML = `<span style="font-size:11px;font-weight:700;color:#90CAF9;font-family:monospace;display:block;margin-bottom:6px;letter-spacing:0.06em">Question ${num} of 45</span>${displayHTML}`;
    }
    return (
      <>
        <div className="msg-row ai">
          <div className="ai-avatar">◈</div>
          <div className="bubble ai" dangerouslySetInnerHTML={{__html:displayHTML}}/>
        </div>
        {isGateFail && (
          <div style={{paddingLeft:38,marginBottom:16,marginTop:8}}>
            <button className="ans-btn" style={{width:"100%",padding:"14px 16px",fontSize:14,textAlign:"center",color:"rgba(255,255,255,0.7)"}} onClick={()=>window.location.reload()}>
              {isFr?"← Recommencer l'évaluation":"← Restart assessment"}
            </button>
          </div>
        )}
        {!isGateFail && qKey && <AnswerBlock qKey={qKey} lang={lang} onSend={onSend} loadingRef={loadingRef} pendingNoAdvanceRef={pendingNoAdvanceRef}/>}
      </>
    );
  }
  return null;
}

function formatMsgText(rawText){
  // Split on newlines first
  let parts = rawText.split(/\n+/).map(p=>p.trim()).filter(p=>p.length>0);
  // If single paragraph containing a question, try to split at sentence boundary before the question
  if(parts.length===1 && parts[0].includes("?")){
    const text = parts[0];
    const lastQ = text.lastIndexOf("?");
    let splitAt = -1;
    for(let i=lastQ-1;i>10;i--){
      if((text[i]==="."||text[i]==="!") && text[i+1]===" " && text[i+2]===text[i+2]?.toUpperCase()){
        splitAt=i; break;
      }
    }
    if(splitAt>10){
      const before = text.slice(0,splitAt+1).trim();
      const after = text.slice(splitAt+1).trim();
      if(before && after) parts=[before,after];
    }
  }
  if(parts.length<=1){
    // Single part — if it contains a question mark it's the question (bright), otherwise muted
    const isQ = parts[0]?.includes("?");
    const col = isQ ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.55)";
    return `<p style="margin:0;color:${col}">${esc(rawText)}</p>`;
  }
  // Multiple parts: first part = acknowledgement (muted), remaining = question (bright)
  return parts.map((p,i)=>{
    const isLast = i===parts.length-1;
    const col = i===0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.92)";
    const mb = isLast ? "0" : "10px";
    return `<p style="margin:0 0 ${mb} 0;color:${col}">${esc(p)}</p>`;
  }).join("");
}

// ── AnswerBlock component ─────────────────────────────────────────────────────
function AnswerBlock({qKey, lang, onSend, loadingRef, pendingNoAdvanceRef}){
  const isFr = lang==="FR";
  const [submitted, setSubmitted] = useState(false);
  const submittedRef = useRef(false); // Ref guard for sync double-click protection
  const [chosen, setChosen] = useState(null);
  const [chosenMulti, setChosenMulti] = useState(new Set());
  const isMulti = MULTI_SELECT.has(qKey);
  const opts = (isFr ? (OPTS_FR[qKey]||OPTS[qKey]) : OPTS[qKey]) || [];
  const rc = REFS[qKey];


  function doSubmit(opt){
    // Dual guard: ref (sync) + state (async) — prevents double-fire under any timing
    if(submittedRef.current || submitted) return;
    submittedRef.current = true;
    setSubmitted(true);
    if(NO_ADVANCE_OPTIONS.has(opt)) pendingNoAdvanceRef.current = true;
    onSend(opt);
  }

  function handleSingleClick(opt){
    if(submittedRef.current || submitted || loadingRef.current) return;
    if(chosen===opt){
      setChosen(null);
      return;
    }
    setChosen(opt);
    doSubmit(opt);
  }

  function handleMultiClick(opt){
    if(submittedRef.current || submitted || loadingRef.current) return;
    setChosenMulti(prev=>{
      const next = new Set(prev);
      if(next.has(opt)){ next.delete(opt); }
      else {
        if(opt.startsWith("No")){ next.clear(); }
        else { next.delete("No — direct to consumers only"); next.delete("Non — vente directe aux consommateurs uniquement"); }
        next.add(opt);
      }
      return next;
    });
  }

  function confirmMulti(){
    // Dual guard on Confirm button too
    if(submittedRef.current || submitted || chosenMulti.size===0) return;
    const answer = (isFr?"Nous approvisionnons : ":"We supply: ")+[...chosenMulti].join(", ");
    doSubmit(answer);
  }

  return (
    <div className="answers-block">
      {rc && (
        <div className="ref-card">
          <div className="ref-label">{isFr?"Guide de référence":"Reference guide"}</div>
          <div className="ref-title">{rc.title}</div>
          <div className="ref-desc">{rc.desc}</div>
          <a className="ref-link" href="https://passageexport.com/export-labelling" target="_blank" rel="noreferrer">{isFr?"Voir le guide →":"View guide →"}</a>
        </div>
      )}
      {isMulti && !submitted && (
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:"monospace",marginBottom:8,letterSpacing:"0.04em"}}>
          {isFr?"Sélectionnez tout ce qui s'applique, puis confirmez":"Select all that apply, then confirm"}
        </div>
      )}
      {opts.map(opt=>{
        let cls = "ans-btn";
        if(submitted){ cls += chosen===opt||chosenMulti.has(opt)?" selected":" submitted"; }
        else if(isMulti){ if(chosenMulti.has(opt)) cls+=" selected"; }
        else { if(chosen===opt) cls+=" selected"; else if(chosen) cls+=" dimmed"; }
        const label = submitted||(!isMulti&&chosen===opt&&(chosenMulti.has(opt)||chosen)) ? (chosenMulti.has(opt)||chosen===opt?"✓ "+opt:opt) : opt;
        return (
          <button key={opt} className={cls} onClick={()=>isMulti?handleMultiClick(opt):handleSingleClick(opt)} disabled={submitted}>
            {(isMulti&&chosenMulti.has(opt))?"✓ "+opt:opt}
          </button>
        );
      })}
      {isMulti && !submitted && chosenMulti.size>0 && (
        <button className="send-btn ready" style={{width:"100%",marginTop:8,padding:"11px 16px",fontSize:14,borderRadius:10}} onClick={confirmMulti}>
          {isFr?"Confirmer la sélection →":"Confirm selection →"}
        </button>
      )}

    </div>
  );
}

// ── CoffeeBreak component ────────────────────────────────────────────────────
function CoffeeBreak({lang, onContinue}){
  const isFr = lang==="FR";
  const [choice, setChoice] = useState(null); // null | "break" | "continue"
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  const resumedRef = useRef(false); // Prevent double-fire on continue

  function takeBreak(){
    if(resumedRef.current) return;
    setChoice("break");
    timerRef.current = setInterval(()=>{
      setSecondsLeft(s=>{
        if(s<=1){
          clearInterval(timerRef.current);
          setDone(true);
          return 0;
        }
        return s-1;
      });
    },1000);
  }

  function resume(){
    if(resumedRef.current) return; // Prevent double-fire from timer + manual click
    resumedRef.current = true;
    if(timerRef.current) clearInterval(timerRef.current);
    setChoice("continue");
    onContinue();
  }

  useEffect(()=>()=>{ if(timerRef.current) clearInterval(timerRef.current); },[]);

  const mins = Math.floor(secondsLeft/60);
  const secs = secondsLeft%60;
  const timeStr = `${mins}:${secs.toString().padStart(2,"0")}`;

  if(choice==="continue") return null;

  return (
    <div style={{paddingLeft:38,marginBottom:16,marginTop:8,maxWidth:"calc(680px + 48px)",marginLeft:"auto",marginRight:"auto",width:"100%"}}>
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"20px 24px"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#90CAF9",fontFamily:"monospace",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>
          ◈ {isFr?"Mi-parcours — Question 25 sur 45":"Halfway there — Question 25 of 45"}
        </div>
        {!choice && (
          <>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.7,marginBottom:16}}>
              {isFr
                ?"Vous avez complété la moitié de l'évaluation. Souhaitez-vous faire une courte pause ? Je vous attendrai jusqu'à 10 minutes avant de continuer."
                :"You've completed half the assessment. Would you like a short break? I can wait up to 10 minutes before we continue."}
            </p>
            <div style={{display:"flex",gap:10}}>
              <button className="ans-btn" style={{flex:1,textAlign:"center",padding:"12px 16px"}} onClick={takeBreak}>
                ☕ {isFr?"Oui, donnez-moi 10 minutes":"Yes, give me 10 minutes"}
              </button>
              <button className="ans-btn" style={{flex:1,textAlign:"center",padding:"12px 16px"}} onClick={resume}>
                {isFr?"Non, continuons":"No — let's keep going"}
              </button>
            </div>
          </>
        )}
        {choice==="break" && !done && (
          <>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.7,marginBottom:16}}>
              {isFr?"Prenez votre temps. Je reprends dans :":"Take your time. Resuming in:"}
            </p>
            <div style={{fontSize:48,fontWeight:900,color:"#90CAF9",fontFamily:"monospace",marginBottom:16,letterSpacing:"0.05em"}}>
              {timeStr}
            </div>
            <button className="ans-btn" style={{textAlign:"center",padding:"12px 16px"}} onClick={resume}>
              {isFr?"Je suis prêt(e) — reprenons":"I'm ready — let's continue"}
            </button>
          </>
        )}
        {done && (
          <>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.7,marginBottom:16}}>
              {isFr?"Bienvenue de retour. Continuons l'évaluation.":"Welcome back. Let's continue the assessment."}
            </p>
            <button className="ans-btn" style={{textAlign:"center",padding:"12px 16px"}} onClick={resume}>
              {isFr?"Continuer →":"Continue →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── ReportScreen component ────────────────────────────────────────────────────
function ReportScreen({report, lang, onRestart, messages}){
  const isFr = lang==="FR";
  const totalScoreNum = parseInt(report.totalScore)||0;
  const derivedBand = totalScoreNum>=109?"Export-ready":totalScoreNum>=68?"Near-ready":totalScoreNum>=34?"Developing":"Pre-readiness";
  report.band = derivedBand;
  const b = BAND[derivedBand]||BAND["Developing"];
  const p = PW[report.recommendedPathway]||PW["Verification"];
  const today = new Date().toLocaleDateString(isFr?"fr-FR":"en-AU",{day:"numeric",month:"long",year:"numeric"});

  const phaseKeys=[
    {k:"regulatory",l:isFr?"Phase 1 — Conformité réglementaire":"Phase 1 — Regulatory Readiness",max:18,c:PHC[0]},
    {k:"product",l:isFr?"Phase 2 — Produit & marché":"Phase 2 — Product & Market Readiness",max:51,c:PHC[1]},
    {k:"operations",l:isFr?"Phase 3 — Opérations":"Phase 3 — Operations Readiness",max:33,c:PHC[2]},
    {k:"commercial",l:isFr?"Phase 4 — Aspects commerciaux":"Phase 4 — Commercial Readiness",max:27,c:PHC[3]}
  ];
  const bandOrder=["Pre-readiness","Developing","Near-ready","Export-ready"];
  const bandFlex=[33,34,41,27];
  const bandLabels=isFr
    ?["Pré-maturité|0–33","En développement|34–67","Quasi-prêt|68–108","Prêt à l'export|109–135"]
    :["Pre-Readiness|0–33","Developing|34–67","Near-Ready|68–108","Export-Ready|109–135"];
  const bandColors={"Pre-readiness":"#B91C1C","Developing":"#B7620A","Near-ready":"#2E86C1","Export-ready":"#1A5C38"};
  const currentBandIdx=bandOrder.indexOf(report.band);

  const scaleSegs=bandOrder.map((bk,i)=>{
    const isActive=i===currentBandIdx;
    const col=bandColors[bk]||(i<currentBandIdx?"#94a3b8":"#E2E8F0");
    return <div key={bk} style={{flex:bandFlex[i],background:col,opacity:isActive?1:0.35,borderRadius:2,height:10}}/>;
  });

  const scaleLabels=bandLabels.map((lbl,i)=>{
    const isActive=i===currentBandIdx;
    const lines=lbl.split("|");
    return <div key={i} style={{fontSize:10,fontFamily:"monospace",textAlign:"center",color:isActive?bandColors[bandOrder[i]]:"#94a3b8",fontWeight:isActive?700:400,lineHeight:1.5}}>{isActive?"▲ ":""}{lines[0]}<br/>{lines[1]}</div>;
  });

  const phaseHTML = phaseKeys.map(ph=>{
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
    return (
      <div key={ph.k} style={{margin:"0 0 16px",border:"1px solid #E2E8F0",borderRadius:12,overflow:"hidden"}}>
        <div style={{padding:"16px 20px 14px",background:"#F8FAFC",borderBottom:"1px solid #E2E8F0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:16,fontWeight:700,color:"#0D2B45"}}>{ph.l}</div>
          <div style={{fontSize:15,fontWeight:800,fontFamily:"monospace",color:sc}}>{d.score}/{d.max}</div>
        </div>
        <div style={{height:5,background:"#E2E8F0"}}><div style={{height:"100%",width:pct+"%",background:sc}}/></div>
        <div style={{padding:20}}>
          {d.summary&&<p style={{fontSize:14,color:"#475569",lineHeight:1.75,marginBottom:gaps.length?18:0}}>{d.summary}</p>}
          {gaps.map((g,gi)=>{
            const isComp=g.type==="compulsory";
            const borderCol=isComp?"#B91C1C":"#B7620A";
            const diffBadge=g.difficulty==="quickwin"
              ?<span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"3px 8px",borderRadius:4,background:"#EAFAF1",color:"#1A5C38",whiteSpace:"nowrap"}}>{isFr?"Action rapide":"Quick win"}</span>
              :g.difficulty==="complex"
              ?<span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"3px 8px",borderRadius:4,background:"#F5F3FF",color:"#6B21A8",whiteSpace:"nowrap"}}>{isFr?"Complexe":"Complex"}</span>
              :<span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"3px 8px",borderRadius:4,background:"#EFF6FF",color:"#2E86C1",whiteSpace:"nowrap"}}>{isFr?"Effort moyen":"Medium effort"}</span>;
            const typeBadge=isComp
              ?<span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"3px 8px",borderRadius:4,background:"#FEE2E2",color:"#B91C1C",whiteSpace:"nowrap"}}>{isFr?"Obligatoire":"Compulsory"}</span>
              :<span style={{fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"3px 8px",borderRadius:4,background:"#FEF3E2",color:"#B7620A",whiteSpace:"nowrap"}}>{isFr?"Souhaitable":"Desirable"}</span>;
            return (
              <div key={gi} style={{border:"1px solid #E2E8F0",borderLeft:`3px solid ${borderCol}`,borderRadius:8,padding:"14px 16px",background:"white",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:8}}>
                  <div style={{fontSize:11,fontWeight:700,fontFamily:"monospace",color:"#94a3b8",flexShrink:0,marginTop:2}}>{g.id}</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#1C2B3A",lineHeight:1.4,flex:1}}>{g.title}</div>
                  <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>{typeBadge}{diffBadge}</div>
                </div>
                <div style={{fontSize:13,color:"#334155",lineHeight:1.65,marginBottom:6}}>{g.action}</div>
                {g.passage&&<div style={{fontSize:12,color:"#1A5C38",lineHeight:1.6,padding:"8px 12px",background:"#EAFAF1",borderRadius:6,marginTop:6}}><strong>{isFr?"Passage peut vous aider :":"Passage can help:"}</strong> {g.passage}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  const qw=report.quickWins||[];
  const emailBody = isFr
    ?`Bonjour,\n\nJ'ai complété l'auto-évaluation de préparation à l'export et je souhaite un rappel pour discuter de mon parcours.\n\nEntreprise : ${report.businessName||""}\nContact : ${report.producerName||""}\nRésultat : ${b.l} — ${report.totalScore} / 135\nMarchés cibles : ${(report.targetMarkets||[]).join(", ")}\n\nJe joins à cet e-mail mon rapport ERSA et le relevé complet de l'évaluation.\n\nMerci.`
    :`Hello,\n\nI have completed the Export Readiness Self-Assessment and would welcome a callback to discuss my pathway.\n\nBusiness: ${report.businessName||""}\nContact: ${report.producerName||""}\nResult: ${b.l} — ${report.totalScore} / 135\nTarget markets: ${(report.targetMarkets||[]).join(", ")}\n\nI have attached my ERSA Report and Full Assessment Record to this email.\n\nThank you.`;

  function copyEmail(){
    navigator.clipboard.writeText(emailBody).then(()=>{
      const el=document.getElementById("copy-confirm");
      if(el){el.style.display="block";setTimeout(()=>el.style.display="none",4000);}
    });
  }

  function printReport(){
    const reportEl = document.getElementById('ersa-report-printable');
    if(!reportEl) return;
    const html = reportEl.innerHTML;
    const win = window.open('','_blank');
    if(!win) return;
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ERSA Report</title><style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Georgia,serif;background:white;color:#1C2B3A;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      @media print{@page{margin:10mm;size:A4}body{background:white}}
    </style></head><body>${html}</body></html>`);
    win.document.close();
    setTimeout(()=>win.print(),400);
  }

  function printQARecord(){
    const isFr2 = lang==="FR";
    const today2 = new Date().toLocaleDateString(isFr2?"fr-FR":"en-AU",{day:"numeric",month:"long",year:"numeric"});
    const qLabels={
      GATE1:isFr2?"Votre entreprise est-elle formellement enregistrée ?":"Is your business formally registered with the relevant local authority?",
      GATE2:isFr2?"Votre entreprise détient-elle une licence alimentaire en vigueur ?":"Does your facility hold a current, valid food business licence?",
      Q01:isFr2?"Votre installation a-t-elle reçu un Export Health Certificate ?":"Has your facility ever received an Export Health Certificate?",
      Q02:isFr2?"Votre installation serait-elle prête pour une inspection EHC aujourd'hui ?":"Would your facility meet EHC inspection standards today?",
      Q03:isFr2?"Votre installation opère-t-elle sous un système de sécurité alimentaire reconnu ?":"Does your facility operate under a recognised food safety system?",
      Q04:isFr2?"Vos Points de Contrôle Critiques sont-ils documentés et enregistrés ?":"Are your Critical Control Points documented, monitored, and recorded?",
      Q05:isFr2?"Pouvez-vous tracer tous vos ingrédients jusqu'au fournisseur et au lot ?":"Can you trace all ingredients back to their supplier, batch number, and delivery date?",
      Q06:isFr2?"Pouvez-vous tracer les lots de produits finis jusqu'à l'expédition ?":"Can you trace finished goods batches from production through to despatch?",
      Q07:isFr2?"Votre produit contient-il des ingrédients d'origine animale ?":"Does your product contain meat, seafood, dairy, eggs, honey, or other animal-derived ingredients?",
      Q08:isFr2?"Quelle est la classification de conservation de votre produit ?":"What is your product's storage classification?",
      Q09:isFr2?"Quelle est la durée de conservation déclarée de votre produit ?":"What is your product's declared shelf life?",
      Q10:isFr2?"La durée de conservation a-t-elle été validée par des tests formels ?":"Has your product's shelf life been validated through formal laboratory or documented challenge testing?",
      Q11:isFr2?"La formulation de votre produit est-elle documentée ?":"Is your product formulation documented?",
      Q12:isFr2?"Votre emballage primaire est-il certifié alimentaire et adapté à la température ?":"Is your primary packaging food-grade certified and temperature-appropriate?",
      Q13:isFr2?"Votre emballage secondaire est-il adapté au fret maritime et avez-vous une norme de carton documentée ?":"Is your outer packaging suitable for palletised sea freight with a documented carton standard?",
      Q14:isFr2?"Votre produit a-t-il déjà été transporté dans des conditions de fret export commercial ?":"Has your product been transported under commercial export freight conditions previously?",
      Q15:isFr2?"Tous les ingrédients sont-ils listés en ordre décroissant de poids ?":"Are all ingredients listed in descending order of weight with sub-ingredients declared?",
      Q16:isFr2?"Tous les allergènes majeurs sont-ils clairement déclarés ?":"Are all major allergens clearly declared on your label?",
      Q17:isFr2?"Votre étiquette inclut-elle un tableau nutritionnel dans le format requis ?":"Does your label include a Nutrition Information Panel in the required format?",
      Q18:isFr2?"Le poids net est-il déclaré en unités métriques ?":"Is the net weight declared in metric units?",
      Q19:isFr2?"Votre étiquette inclut-elle une mention d'origine du pays ?":"Does your label include a country of origin statement?",
      Q20:isFr2?"Votre étiquette inclut-elle le nom et l'adresse d'un importateur ?":"Does your label include the name and address of an importer in the destination market?",
      Q21:isFr2?"Votre étiquette porte-t-elle un code-barres EAN-13 / GS1 enregistré ?":"Does your label carry a registered EAN-13 / GS1-compliant barcode?",
      Q22:isFr2?"Votre étiquette est-elle dans la langue requise par vos marchés cibles ?":"Is your label in the required language(s) for your target markets?",
      Q23:isFr2?"Détenez-vous les fichiers artwork modifiables de votre emballage actuel ?":"Do you hold editable, print-ready artwork files for your current packaging?",
      Q24:isFr2?"Combien d'unités pouvez-vous allouer à l'export par mois ?":"How many units could you allocate to export orders per month?",
      Q25:isFr2?"Votre volume de production disponible pour l'export est-il constant ?":"Is your export-available production volume consistent month-on-month?",
      Q26:isFr2?"Votre production pourrait-elle doubler en 12 mois si la demande export le requiert ?":"If export demand doubled within 12 months, could your production scale to meet it?",
      Q27:isFr2?"Approvisionnez-vous actuellement des détaillants, distributeurs ou opérateurs de restauration ?":"Do you currently supply retailers, distributors, or foodservice operators?",
      Q28:isFr2?"Votre installation dispose-t-elle d'un stockage froid dédié ?":"Does your facility have dedicated cold storage at the required temperature?",
      Q29:isFr2?"Pouvez-vous maintenir une chaîne du froid ininterrompue jusqu'au port ?":"Can you maintain an unbroken cold chain from your facility to the port of loading?",
      Q30:isFr2?"Avez-vous déjà exporté des produits réfrigérés ou congelés en conteneur frigorifique ?":"Have you previously exported chilled or frozen products in a reefer container?",
      Q31:isFr2?"Votre processus de production est-il documenté ?":"Is your production process documented?",
      Q32:isFr2?"Vos ingrédients clés sont-ils approvisionnés de manière constante ?":"Are your key ingredients sourced consistently from the same suppliers?",
      Q33:isFr2?"Effectuez-vous des contrôles qualité systématiques avant expédition ?":"Do you conduct systematic quality checks before goods are marked ready for despatch?",
      Q34:isFr2?"Pourriez-vous maintenir un approvisionnement export ininterrompu pendant 6 mois si la demande doublait ?":"Could you maintain uninterrupted export supply for six months if a major importer doubled their order?",
      Q35:isFr2?"Avez-vous développé une liste de prix export séparée de vos prix nationaux ?":"Have you developed an export price list separate from your domestic pricing?",
      Q36:isFr2?"Vos produits export sont-ils tarifés en départ usine ou FOB ?":"Do you price your export goods on an ex-works or FOB basis?",
      Q37:isFr2?"Avez-vous défini des quantités minimales de commande pour vos produits export ?":"Have you defined minimum order quantities for your export products?",
      Q38:isFr2?"Votre entreprise peut-elle émettre des factures en MUR avec les coordonnées correctes ?":"Can your business issue formal commercial invoices in Mauritian Rupees with correct registration details?",
      Q39:isFr2?"Quelles conditions de paiement pouvez-vous offrir à Passage ?":"What payment terms can your business offer Passage as your export buyer?",
      Q40:isFr2?"Votre entreprise dispose-t-elle d'un fonds de roulement suffisant pour financer la production export à l'avance ?":"Does your business have sufficient working capital to fund export production in advance?",
      Q41:isFr2?"Votre entreprise est-elle formellement enregistrée avec un numéro de société et un compte bancaire dédié ?":"Is your business formally registered with a company number, VAT if applicable, and a dedicated business bank account?",
      Q42:isFr2?"Votre entreprise dispose-t-elle d'une assurance responsabilité produits ?":"Does your business have product liability insurance in place?",
      Q43:isFr2?"Votre entreprise dispose-t-elle d'une procédure de rappel de produits documentée ?":"Does your business have a documented food recall procedure?"
    };
    const answered={};
    const asstMsgs = messages.filter(m=>m.role==="assistant");
    const userMsgs = messages.filter(m=>m.role==="user").slice(1);
    asstMsgs.forEach((am,i)=>{ if(am.questionKey && userMsgs[i]) answered[am.questionKey]=userMsgs[i].content; });
    const phaseBlocks=[
      {label:isFr2?"Questions de qualification":"Eligibility gates",keys:["GATE1","GATE2"]},
      {label:isFr2?"Phase 1 — Conformité réglementaire":"Phase 1 — Regulatory Readiness",keys:["Q01","Q02","Q03","Q04","Q05","Q06"]},
      {label:isFr2?"Phase 2 — Produit & marché":"Phase 2 — Product & Market Readiness",keys:["Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15","Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23"]},
      {label:isFr2?"Phase 3 — Opérations":"Phase 3 — Operations Readiness",keys:["Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34"]},
      {label:isFr2?"Phase 4 — Aspects commerciaux":"Phase 4 — Commercial Readiness",keys:["Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"]}
    ];
    let rows="";
    phaseBlocks.forEach(block=>{
      rows+=`<div style="padding:20px 40px 0"><div style="font-size:10px;font-family:monospace;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;padding-bottom:10px;border-bottom:2px solid #E2E8F0;margin-bottom:4px">${block.label}</div>`;
      block.keys.forEach(k=>{
        const ans=answered[k];
        if(!ans) return;
        rows+=`<div style="border-bottom:1px solid #F1EDE6;padding:14px 0"><div style="font-size:10px;font-family:monospace;font-weight:700;color:#94a3b8;margin-bottom:4px">${k}</div><div style="font-size:13px;font-weight:600;color:#1C2B3A;margin-bottom:6px">${(qLabels[k]||k)}</div><div style="font-size:13px;color:#475569;padding:8px 12px;background:#F8F6F2;border-left:3px solid #B7620A;border-radius:0 4px 4px 0">${ans.replace(/</g,"&lt;")}</div></div>`;
      });
      rows+="</div>";
    });
    const qaHTML=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ERSA Q&A Record — ${(report.businessName||"").replace(/</g,"&lt;")}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;background:#F8F6F2;color:#1C2B3A}-webkit-print-color-adjust:exact;print-color-adjust:exact}@media print{body{background:white}@page{margin:10mm;size:A4}}</style></head><body>
    <div style="max-width:780px;margin:0 auto;background:white;box-shadow:0 4px 40px rgba(0,0,0,0.1)">
      <div style="background:linear-gradient(135deg,#0D2B45,#1A3C5E);padding:36px 40px 32px">
        <div style="font-size:10px;letter-spacing:0.22em;color:#90CAF9;font-family:monospace;text-transform:uppercase;margin-bottom:10px">PASSAGE EXPORT GROUP — ${isFr2?"RELEVÉ COMPLET DES RÉPONSES":"FULL ASSESSMENT RECORD"}</div>
        <div style="font-size:26px;font-weight:900;color:white;margin-bottom:4px">${(report.businessName||"").replace(/</g,"&lt;")}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.55)">${(report.producerName||"").replace(/</g,"&lt;")} · ${(report.productRange||"").replace(/</g,"&lt;")}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;font-family:monospace">${(report.targetMarkets||[]).join(" · ")} · ${isFr2?"Évaluation complétée le":"Assessment completed"} ${today2}</div>
      </div>
      <div style="background:#F0EDE6;border-bottom:2px solid #E2DDD6;padding:16px 40px">
        <p style="font-size:13px;color:#64748b;line-height:1.6">${isFr2?"Ce document contient chaque question posée et votre réponse. Il ne contient pas les scores ni l'analyse des écarts — ceux-ci figurent dans le rapport ERSA.":"This document contains every question asked and your response. It does not contain scores or gap analysis — those are in the ERSA Report."}</p>
      </div>
      ${rows}
      <div style="background:#F8F6F2;border-top:1px solid #E2E8F0;padding:20px 40px;margin-top:16px;text-align:center">
        <p style="font-size:11px;color:#94a3b8;line-height:1.7;font-family:monospace">PASSAGE EXPORT GROUP · passageexport.com · Mauritius<br>${isFr2?"Relevé généré le":"Record generated"} ${today2} · ${isFr2?"Les réponses sont déclarées par le producteur":"Responses are self-reported by the producer"}</p>
      </div>
    </div></body></html>`;
    const win=window.open("","_blank");
    if(win){win.document.write(qaHTML);win.document.close();setTimeout(()=>win.print(),400);}
  }

  return (
    <div className="report-screen">
      <div className="report-wrap">
        <div id="ersa-report-printable" style={{maxWidth:780,width:"100%",background:"white",borderRadius:0,overflow:"visible",boxShadow:"0 4px 40px rgba(0,0,0,0.12)",wordWrap:"break-word",overflowWrap:"break-word",WebkitPrintColorAdjust:"exact",printColorAdjust:"exact"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#0D2B45,#1A3C5E)",padding:"36px 40px 32px"}}>
            <div style={{fontSize:10,letterSpacing:"0.22em",color:"#90CAF9",fontFamily:"monospace",textTransform:"uppercase",marginBottom:10}}>{isFr?"PASSAGE EXPORT GROUP — RAPPORT ERSA":"PASSAGE EXPORT GROUP — ERSA REPORT"}</div>
            <div style={{fontSize:26,fontWeight:900,color:"white",marginBottom:4}}>{report.businessName||""}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.55)"}}>{report.producerName||""} · {report.productRange||""}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:4,fontFamily:"monospace"}}>{(report.targetMarkets||[]).join(" · ")}</div>
          </div>
          {/* Band */}
          <div style={{background:b.bg,borderBottom:`3px solid ${b.c}`,padding:"28px 40px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:b.c,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:4}}>{isFr?"NIVEAU DE MATURITÉ EXPORT":"EXPORT READINESS BAND"}</div>
              <div style={{fontSize:34,fontWeight:900,color:b.c,lineHeight:1,marginBottom:8}}>{b.l}</div>
              <div style={{fontSize:13,color:b.c,opacity:0.8,maxWidth:360,lineHeight:1.5}}>{report.bandRationale||""}</div>
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:4,flexShrink:0}}>
              <div style={{fontSize:64,fontWeight:900,color:b.c,lineHeight:1}}>{report.totalScore}</div>
              <div style={{fontSize:18,color:"#94a3b8"}}>/135</div>
            </div>
          </div>
          {/* Score explainer */}
          <div style={{background:"#F8F6F2",border:"1px solid #E8E4DC",borderRadius:8,padding:"14px 18px",margin:"20px 40px 0"}}>
            <p style={{fontSize:13,color:"#64748b",lineHeight:1.7,fontFamily:"Georgia,serif"}}><strong style={{color:"#1C2B3A"}}>{isFr?"Comment ce score est calculé :":"How this score works:"}</strong> {isFr?"Chaque question est notée de 0 à 3. 0 = absent · 1 = partiel · 2 = adéquat · 3 = solide. Score maximum = 135.":"Each of the 45 questions is scored 0–3. 0 = not in place · 1 = partial · 2 = adequate · 3 = strong. Maximum score = 135."}</p>
          </div>
          {/* Scale */}
          <div style={{padding:"20px 40px 28px"}}>
            <div style={{fontSize:10,fontFamily:"monospace",letterSpacing:"0.18em",textTransform:"uppercase",color:"#94a3b8",marginBottom:10}}>{isFr?"OÙ VOUS VOUS SITUEZ":"WHERE YOU SIT"}</div>
            <div style={{display:"flex",height:10,borderRadius:5,overflow:"hidden",gap:2,marginBottom:10}}>{scaleSegs}</div>
            <div style={{display:"flex",justifyContent:"space-between"}}>{scaleLabels}</div>
          </div>
          <div style={{padding:"4px 40px 24px"}}>
            <p style={{fontSize:15,color:"#475569",lineHeight:1.8,borderLeft:`3px solid ${b.c}`,paddingLeft:16,fontStyle:"italic"}}>{report.bandRationale||""}</p>
          </div>
          {/* Animal derived warning */}
          {report.animalDerived&&(
            <div style={{margin:"0 40px 24px",background:"#FFF7ED",border:"1px solid #FED7AA",borderLeft:"4px solid #EA580C",borderRadius:8,padding:"18px 20px"}}>
              <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#EA580C",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:8}}>⚑ {isFr?"Ingrédients d'origine animale — important":"Animal-derived ingredients — important"}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#1C2B3A",marginBottom:10}}>{isFr?"Votre produit peut nécessiter une documentation supplémentaire.":"Your product may require additional documentation or may not be exportable to all target markets without further assessment."}</div>
              <div style={{fontSize:13,color:"#475569",lineHeight:1.7}}>{isFr?"Contactez Passage avant de procéder à la préparation de tout envoi.":"Export eligibility and documentation requirements vary by product type, ingredient percentage, and destination market. Please contact Passage before proceeding with any export shipment preparation."}</div>
            </div>
          )}
          {/* Phase scores */}
          <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#94a3b8",letterSpacing:"0.18em",textTransform:"uppercase",padding:"0 40px",marginBottom:16,marginTop:8}}>{isFr?"SCORES PAR PHASE ET ANALYSE DES ÉCARTS":"PHASE SCORES & GAP ANALYSIS"}</div>
          <div style={{padding:"0 40px 8px"}}>{phaseHTML}</div>
          {/* Quick wins */}
          {qw.length>0&&(
            <div style={{padding:"0 40px"}}>
              <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#94a3b8",letterSpacing:"0.18em",textTransform:"uppercase",margin:"32px 0 16px"}}>{isFr?"ACTIONS RAPIDES — priorité cette semaine":"QUICK WINS — action these first"}</div>
              <div style={{background:"#EAFAF1",border:"1px solid rgba(26,92,56,0.2)",borderRadius:12,padding:20,marginBottom:16}}>
                <div style={{fontSize:11,fontFamily:"monospace",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"#1A5C38",marginBottom:14}}>✦ {isFr?"À compléter cette semaine — sans consultant ni investissement":"Items you can complete this week — no consultants, no capital required"}</div>
                {qw.map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:8}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:"#1A5C38",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,fontFamily:"monospace",marginTop:1}}>{i+1}</div>
                    <div style={{fontSize:13,color:"#1e4030",lineHeight:1.6}}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Pathway */}
          <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#94a3b8",letterSpacing:"0.18em",textTransform:"uppercase",padding:"0 40px",marginBottom:16,marginTop:32}}>{isFr?"PARCOURS RECOMMANDÉ":"RECOMMENDED PATHWAY"}</div>
          <div style={{margin:"0 40px 32px",background:"#F8FAFC",border:"2px solid rgba(183,134,10,0.25)",borderRadius:12,padding:24}}>
            <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"#94a3b8",marginBottom:8}}>{isFr?"Passage recommande":"Passage recommends"}</div>
            <div style={{fontSize:22,fontWeight:900,color:p.c,marginBottom:10}}>{p.d}</div>
            <p style={{fontSize:14,color:"#475569",lineHeight:1.75,marginBottom:16}}>{report.pathwayRationale||""}</p>
          </div>
          {/* Privacy notice — prominent warning */}
          <div style={{margin:"0 40px 24px",background:"#FFF7ED",border:"1px solid #FED7AA",borderLeft:"4px solid #EA580C",borderRadius:8,padding:"16px 20px"}}>
            <div style={{fontSize:11,fontFamily:"monospace",fontWeight:700,color:"#EA580C",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>⚠ {isFr?"Rapport non sauvegardé":"Report not saved"}</div>
            <div style={{fontSize:13,color:"#7C2D12",lineHeight:1.65}}>{isFr?"Ce rapport n'est enregistré nulle part. Aucune donnée personnelle n'est conservée par Passage. Téléchargez votre rapport maintenant — il sera perdu si vous fermez cet onglet.":"This report is not saved anywhere. Passage does not store any personal data. Download your report now — it will be lost when you close this tab."}</div>
          </div>
          {/* What to do next */}
          <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,color:"#94a3b8",letterSpacing:"0.18em",textTransform:"uppercase",padding:"0 40px",marginBottom:16}}>{isFr?"CE QU'IL FAUT FAIRE MAINTENANT":"WHAT TO DO NEXT"}</div>
          <div style={{margin:"0 40px 32px",border:"1px solid #E2E8F0",borderRadius:12,overflow:"hidden"}}>
            {/* Step 1 — Save report */}
            <div style={{display:"flex",gap:20,padding:24,borderBottom:"1px solid #E2E8F0",alignItems:"flex-start"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"#0D2B45",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,fontFamily:"monospace",flexShrink:0,marginTop:2}}>1</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:"#0D2B45",marginBottom:6}}>{isFr?"Enregistrez votre rapport ERSA":"Save your ERSA Report"}</div>
                <div style={{fontSize:13,color:"#475569",lineHeight:1.65,marginBottom:12}}>{isFr?"Contient votre niveau, vos scores par phase, l'analyse des écarts et le parcours recommandé.":"Contains your band, phase scores, gap analysis and recommended pathway."}</div>
                <button onClick={printReport} style={{background:"#0D2B45",color:"white",border:"none",borderRadius:6,padding:"10px 20px",fontSize:13,fontWeight:700,fontFamily:"Georgia,serif",cursor:"pointer"}}>⬇ {isFr?"Télécharger le rapport (PDF)":"Download report as PDF"}</button>
              </div>
            </div>
            {/* Step 2 — Save Q&A record */}
            <div style={{display:"flex",gap:20,padding:24,borderBottom:"1px solid #E2E8F0",alignItems:"flex-start"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"#0D2B45",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,fontFamily:"monospace",flexShrink:0,marginTop:2}}>2</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:"#0D2B45",marginBottom:6}}>{isFr?"Enregistrez votre relevé complet de réponses":"Save your full Q&A record"}</div>
                <div style={{fontSize:13,color:"#475569",lineHeight:1.65,marginBottom:12}}>{isFr?"Contient chaque question posée et votre réponse. Utile à joindre si vous contactez Passage.":"Contains every question and your answer. Attach this if you contact Passage."}</div>
                <button onClick={printQARecord} style={{background:"#0D2B45",color:"white",border:"none",borderRadius:6,padding:"10px 20px",fontSize:13,fontWeight:700,fontFamily:"Georgia,serif",cursor:"pointer"}}>⬇ {isFr?"Télécharger le relevé Q&R (PDF)":"Download Q&A record as PDF"}</button>
              </div>
            </div>
            {/* Step 3 — Contact Passage */}
            <div style={{display:"flex",gap:20,padding:24,alignItems:"flex-start"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"#0D2B45",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,fontFamily:"monospace",flexShrink:0,marginTop:2}}>3</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:"#0D2B45",marginBottom:6}}>{isFr?"Contactez Passage (optionnel)":"Contact Passage (optional)"}</div>
                <div style={{fontSize:13,color:"#475569",lineHeight:1.65,marginBottom:12}}>{isFr?"Si vous souhaitez discuter de votre parcours, copiez ce message et envoyez-le avec vos deux PDF en pièce jointe.":"If you'd like to discuss your pathway, copy this message and send it with both PDFs attached."}</div>
                <div style={{background:"#F8F6F2",border:"1px solid #E2E8F0",borderRadius:8,padding:16}}>
                  <div style={{fontSize:10,fontFamily:"monospace",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#94a3b8",marginBottom:8}}>{isFr?"Copiez ce message :":"Copy this message:"}</div>
                  <div style={{fontSize:12,fontFamily:"monospace",color:"#475569",marginBottom:8,padding:"6px 10px",background:"white",border:"1px solid #E2E8F0",borderRadius:4,whiteSpace:"pre"}}>To: info@passageexport.com{"\n"}Subject: ERSA Report — {report.businessName||""} — Callback Request</div>
                  <div id="ersa-email-body" style={{fontSize:12,color:"#334155",lineHeight:1.65,whiteSpace:"pre-wrap",padding:"10px 12px",background:"white",border:"1px solid #E2E8F0",borderRadius:4,marginBottom:10,fontFamily:"Georgia,serif"}}>{emailBody}</div>
                  <button onClick={copyEmail} style={{background:"#0D2B45",color:"white",border:"none",borderRadius:6,padding:"9px 18px",fontSize:12,fontWeight:700,fontFamily:"Georgia,serif",cursor:"pointer",width:"100%"}}>{isFr?"Copier le message":"Copy message to clipboard"}</button>
                  <div id="copy-confirm" style={{fontSize:11,fontFamily:"monospace",color:"#1A5C38",textAlign:"center",marginTop:6,display:"none"}}>✓ {isFr?"Copié — joignez les deux PDF et envoyez":"Copied — attach both PDFs and send"}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={{background:"#F8F6F2",borderTop:"1px solid #E2E8F0",padding:"20px 40px",textAlign:"center"}}>
            <p style={{fontSize:11,color:"#94a3b8",lineHeight:1.7,fontFamily:"monospace"}}>PASSAGE EXPORT GROUP · passageexport.com · Mauritius<br/>{isFr?"Rapport généré le":"Report generated"} {today} {isFr?"par le système ERSA":"by the Passage ERSA system"}<br/>{isFr?"Les réponses sont déclarées par le producteur et n'ont pas été vérifiées indépendamment":"Scores and recommendations are based on self-reported responses and have not been independently verified"}</p>
          </div>
        </div>
        <button className="new-btn" onClick={onRestart}>{isFr?"Nouvelle évaluation":"Start new assessment"}</button>
      </div>
    </div>
  );
}
