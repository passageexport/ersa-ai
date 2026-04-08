// ERSA.jsx — Passage Export Group
// Export Readiness Self-Assessment v5.0
// Changes from v4:
// — "Tell us more" context box added to 30 questions (one-exchange rule)
// — Q09 gets a fourth option for multi-product producers (auto-activates context)
// — Q36 reworded to ex-works/FOB framing; AI explains difference if Unsure selected
// — Q39 context box enabled
// — Compound risk flagging added to system prompt
// Flow: Language → Intro → Intake → AI Conversation → Report → Share Choice → Email

import { useState, useRef, useEffect } from "react";

// ─── System Prompt ────────────────────────────────────────────────────────────
// Built directly from ERSA Master v2.1. Do not modify without updating the master doc.

const SYSTEM_PROMPT = `You are the ERSA assessment agent for Passage Export Group — the infrastructure builder for Mauritian food exports and the founding architect of Island Creole Cuisine as a global food category.

You conduct structured export readiness assessments for Mauritian food producers across four phases. You are warm, professional, direct, and knowledgeable. You never use filler phrases. You ask one question at a time and listen carefully.

LANGUAGE: Conduct the entire assessment in the producer's chosen language (English or French). Always address the producer directly using "you" and "your" — never refer to them in the third person as "the producer". The producer is speaking to you directly.

INTAKE DATA: You will receive the producer's name, business name, product range, target markets, and email. Do not ask for these again. Use them to personalise your questions.

ELIGIBILITY GATES: If the answer to Gate Q1 or Gate Q2 is No, immediately inform the producer they are Not Eligible, explain why, and tell them Passage will make contact. Do not continue.

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
{"producerName":"","businessName":"","productRange":"","targetMarkets":[],"language":"EN","eligibilityGate":"passed","phases":{"regulatory":{"score":0,"max":18,"summary":"","gap":null},"product":{"score":0,"max":51,"summary":"","gap":null},"operations":{"score":0,"max":33,"summary":"","gap":null},"commercial":{"score":0,"max":27,"summary":"","gap":null}},"totalScore":0,"band":"Pre-readiness","bandRationale":"","topPriorities":["","",""],"recommendedPathway":"Incubation","pathwayRationale":"","packagingGap":false}`;

// ─── Predefined answer options (English) ────────────────────────────────────
const QUESTION_OPTIONS ={
  GATE1:["Yes — registered and compliant","In progress — registration underway","No — not yet registered"],
  GATE2:["Yes — current and valid","Expired — renewal in progress","No — no licence held"],
  Q01:["Yes — EHC held for at least one product","Not yet — but facility is inspection-ready","Not yet — facility preparation required"],
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

// French translations
const QUESTION_OPTIONS_FR = {
  GATE1: ["Oui — enregistrée et conforme","En cours — enregistrement en cours","Non — pas encore enregistrée"],
  GATE2: ["Oui — valide et à jour","Expirée — renouvellement en cours","Non — aucune licence détenue"],
  Q01: ["Oui — Certificat sanitaire obtenu pour au moins un produit","Pas encore — mais l'installation est prête pour une inspection","Pas encore — préparation de l'installation requise"],
  Q02: ["Oui — l'installation répond aux normes d'inspection","Peut-être — des améliorations sont nécessaires avant l'inspection","Non — une préparation importante est nécessaire avant de demander une inspection"],
  Q03: ["HACCP","ISO 22000","HACCP et ISO 22000","Procédures internes — sans certification formelle","Aucun système structuré en place"],
  Q04: ["Oui — tous les CCP documentés, surveillés et enregistrés","Partiellement — certaine documentation en place","Non — les contrôles sont informels ou non documentés"],
  Q05: ["Oui — traçabilité complète des ingrédients","Partiellement — enregistrements incomplets","Non — aucun système formel de traçabilité"],
  Q06: ["Oui — traçabilité complète des lots à l'expédition","Partiellement — certains enregistrements maintenus","Non — aucun système de traçabilité des produits finis"],
  Q07: ["Non — ingrédients d'origine végétale ou minérale uniquement","Oui — ingrédients laitiers ou œufs","Oui — viande ou fruits de mer","Oui — miel ou autres ingrédients d'origine animale","Incertain"],
  Q08: ["Ambiant / stable — aucune réfrigération requise","Réfrigéré (0–5°C)","Congelé (−18°C ou moins)"],
  Q09: ["Moins de 3 mois","3 – 6 mois","6 – 12 mois","Plus de 12 mois","J'ai plusieurs produits et la durée de conservation varie selon chaque produit"],
  Q10: ["Oui — validée par laboratoire accrédité","Oui — validée par tests internes documentés","Partiellement — tests informels non documentés formellement","Non — durée de conservation estimée, non validée"],
  Q11: ["Oui — entièrement documentée et sous contrôle de version","Partiellement — documentation incomplète","Non — formulation non documentée"],
  Q12: ["Oui — certifié alimentaire et adapté à la température","Certifié alimentaire mais aptitude thermique non confirmée","Non certifié — spécification non vérifiée"],
  Q13: ["Oui — cartons testés et norme documentée en place","Cartons adaptés mais aucune norme formelle — approvisionnement ad hoc","Emballage adapté nationalement mais non validé pour l'export","Aucune spécification formelle — approvisionnement selon disponibilité"],
  Q14: ["Oui — exporté avec succès vers des marchés internationaux","Oui — exporté dans la région mais pas vers les marchés principaux","Non — aucune expérience préalable d'export"],
  Q15: ["Oui — déclaration complète incluant tous les sous-ingrédients","Partiellement — ingrédients principaux listés mais sous-ingrédients incomplets","Non — liste incomplète ou absente"],
  Q16: ["Oui — tous les allergènes clairement déclarés","Partiellement — déclaration incomplète","Non — déclaration absente ou peu claire"],
  Q17: ["Oui — tableau nutritionnel conforme à tous les marchés","Partiellement — format non entièrement conforme","Non — tableau absent"],
  Q18: ["Oui — unités métriques (g, kg, ml ou l)","Non — unités non métriques ou poids net absent"],
  Q19: ["Oui — mention Produit de Maurice présente","Non — pays d'origine non déclaré"],
  Q20: ["Oui — nom et adresse de l'importateur inclus","Non — coordonnées non encore incluses"],
  Q21: ["Oui — code-barres EAN-13 enregistré sur toutes les références","En cours — enregistrement en cours","Non — aucun code-barres"],
  Q22: ["Anglais uniquement — Australie et Royaume-Uni","Anglais et français — Canada","Français — France / UE","L'étiquette ne répond aux exigences d'aucun marché cible"],
  Q23: ["Oui — fichiers artwork modifiables au bon format","Partiellement — certains fichiers disponibles","Non — aucun fichier artwork modifiable"],
  Q24: ["Moins de 500 unités/mois","500 – 2 000 unités/mois","2 000 – 5 000 unités/mois","5 000 – 20 000 unités/mois","Plus de 20 000 unités/mois"],
  Q25: ["Constant — volumes stables et prévisibles","Variation saisonnière","Variable — irrégulier et difficile à prévoir"],
  Q26: ["Oui — capacité supplémentaire disponible","Oui — mais nécessiterait personnel ou équipement supplémentaire","Peut-être — investissement important requis","Non — capacité maximale atteinte"],
  Q27: ["Oui — acheteurs internationaux ou exportateurs","Oui — distributeurs ou détaillants nationaux","Oui — magasins ou marchés locaux uniquement","Non — vente directe aux consommateurs uniquement"],
  Q28: ["Oui — stockage froid dédié","Partiellement — stockage partagé ou insuffisant","Non — aucun stockage froid sur site"],
  Q29: ["Oui — transport à température contrôlée documenté","Partiellement — transport disponible mais non documenté systématiquement","Non — chaîne du froid vers le port non établie"],
  Q30: ["Oui — avec enregistrements de température","Oui — sans documentation formelle de température","Non — aucune expérience de conteneur frigorifique"],
  Q31: ["Oui — entièrement documenté et suivi","Partiellement — documentation incomplète ou non suivie","Non — production basée sur connaissances non documentées"],
  Q32: ["Oui — approvisionnement constant avec spécifications convenues","Partiellement — certains ingrédients constants, d'autres variables","Non — approvisionnement varie significativement"],
  Q33: ["Oui — contrôles systématiques enregistrés pour chaque lot","Partiellement — contrôles effectués mais non enregistrés","Non — aucun processus formel de contrôle"],
  Q34: ["Oui — continuité possible","Peut-être — avec préavis et planification","Non — contraintes actuelles empêcheraient cela"],
  Q35: ["Oui — liste de prix export développée","En cours","Non — aucune tarification export"],
  Q36: ["Ex-works — l'acheteur collecte depuis notre installation","FOB — nous livrons au port de chargement, l'acheteur organise le fret ensuite","Nous n'avons pas encore défini notre base de tarification export","Je ne suis pas sûr(e) — j'aimerais en savoir plus"],
  Q37: ["Oui — MOQ définis","Partiellement — MOQ à l'étude","Non — aucun MOQ défini"],
  Q38: ["Oui — facturation en MUR avec coordonnées enregistrées","Partiellement — facturation possible mais coordonnées incomplètes","Non — capacité de facturation non établie"],
  Q39: ["Paiement à la livraison","Délai de 30 jours","Délai de 60 jours","Délai de 90 jours"],
  Q40: ["Oui — fonds de roulement suffisant","Partiellement — fonds limités, commandes à gérer soigneusement","Non — contrainte de fonds de roulement"],
  Q41: ["Oui — entièrement enregistrée avec numéro, TVA et compte bancaire","Partiellement — enregistrée mais incomplète","Non — opérant informellement"],
  Q42: ["Oui — assurance en place","En cours","Non — aucune assurance"],
  Q43: ["Oui — procédure documentée et personnel formé","Partiellement — procédure existante mais non documentée formellement","Non — aucune procédure de rappel"],
};

// ─── Compliance guide URL ─────────────────────────────────────────────────
// Update this URL if the guide page moves. It opens in a new tab from ERSA.
const GUIDE_URL = "https://passageexport.com/export-labelling";

// ─── Questions that allow "Tell us more" context ──────────────────────────
// ─── Question sequence — ground truth for button display ─────────────────────
const Q_SEQUENCE = [
  "GATE1","GATE2",
  "Q01","Q02","Q03","Q04","Q05","Q06",
  "Q07","Q08","Q09","Q10","Q11","Q12","Q13","Q14","Q15",
  "Q16","Q17","Q18","Q19","Q20","Q21","Q22","Q23",
  "Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34",
  "Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"
];

const COLD_CHAIN_KEYS = new Set(["Q28","Q29","Q30"]);
const MULTI_SELECT = new Set(["Q27"]);
const TELL_US_MORE_QUESTIONS = new Set([
  "GATE1","GATE2",
  "Q02","Q03","Q04","Q05","Q06",
  "Q10","Q11","Q12","Q13","Q14","Q16","Q17","Q21","Q22","Q23",
  "Q24","Q25","Q26","Q27","Q28","Q29","Q30","Q31","Q32","Q33","Q34",
  "Q35","Q36","Q37","Q38","Q39","Q40","Q41","Q42","Q43"
]);
const AUTO_CONTEXT_OPTIONS = new Set([
  "I have more than one product and shelf life varies across my range",
  "J'ai plusieurs produits et la durée de conservation varie selon chaque produit",
]);
const NO_ADVANCE_OPTIONS = new Set([
  "Unsure — I'd like to understand more",
  "Je ne suis pas sûr(e) — j'aimerais en savoir plus"
]);

// ─── Reference cards ──────────────────────────────────────────────────────────
const REFERENCE_CARDS = {
  Q16: {
    en: { title: "Allergen declaration requirements", desc: "The full list of declarable allergens differs by market. Check the guide to confirm which allergens must be declared for your target countries before answering.", link: "View allergen requirements by country →" },
    fr: { title: "Exigences de déclaration des allergènes", desc: "La liste complète des allergènes à déclarer varie selon les marchés. Consultez le guide pour confirmer quels allergènes doivent être déclarés pour vos marchés cibles avant de répondre.", link: "Voir les exigences par pays →" },
  },
  Q17: {
    en: { title: "Nutrition panel format by market", desc: "Australia, UK, France and Canada each require a different nutrition panel format. Check the guide to see the exact format, mandatory fields and worked example for your target markets.", link: "View nutrition panel standards by country →" },
    fr: { title: "Format du tableau nutritionnel par marché", desc: "L'Australie, le Royaume-Uni, la France et le Canada exigent chacun un format de tableau nutritionnel différent. Consultez le guide pour voir le format exact et les champs obligatoires pour vos marchés cibles.", link: "Voir les standards nutritionnels par pays →" },
  },
  Q19: {
    en: { title: "Country of origin statement wording", desc: "Each market has specific requirements for how country of origin must be declared and whether an importer address is also required. Check before answering.", link: "View country of origin requirements →" },
    fr: { title: "Libellé de la déclaration du pays d'origine", desc: "Chaque marché a des exigences spécifiques concernant la déclaration du pays d'origine et la nécessité d'indiquer l'adresse de l'importateur. Consultez le guide avant de répondre.", link: "Voir les exigences par pays →" },
  },
  Q21: {
    en: { title: "GS1 barcode registration", desc: "All four target markets require a registered EAN-13 GS1 barcode. The guide explains how to register through GS1 Mauritius and what is needed per SKU.", link: "View GS1 barcode registration guide →" },
    fr: { title: "Enregistrement du code-barres GS1", desc: "Les quatre marchés cibles exigent un code-barres EAN-13 GS1 enregistré. Le guide explique comment s'enregistrer via GS1 Maurice et ce qui est nécessaire par référence.", link: "Voir le guide d'enregistrement GS1 →" },
  },
  Q22: {
    en: { title: "Label language requirements by market", desc: "Language requirements vary significantly: Australia and UK require English; Canada requires bilingual English and French; France requires French. Check the guide for full details.", link: "View language requirements by country →" },
    fr: { title: "Exigences linguistiques par marché", desc: "Les exigences linguistiques varient : l'Australie et le Royaume-Uni exigent l'anglais ; le Canada exige l'anglais et le français bilingue ; la France exige le français. Consultez le guide pour les détails complets.", link: "Voir les exigences linguistiques par pays →" },
  },
};

// ─── Detect question tag — use LAST tag in message ────────────────────────────
function detectQuestion(text) {
  const all = [...text.matchAll(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g)];
  if (!all.length) return null;
  return all[all.length - 1][1];
}

function cleanMessage(text) {
  return text.replace(/\[ERSA_Q:(GATE1|GATE2|Q\d{2})\]/g, "").trim();
}

// ─── Question number helpers ──────────────────────────────────────────────────
function qKeyToNum(qKey) {
  if (!qKey) return null;
  if (qKey === "GATE1") return 1;
  if (qKey === "GATE2") return 2;
  const m = qKey.match(/Q(\d{2})/);
  if (m) return parseInt(m[1]) + 2;
  return null;
}

// ─── Paragraph formatter — splits acknowledgement from question ───────────────
function formatAIText(rawText) {
  let parts = rawText.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0);
  if (parts.length === 1 && parts[0].includes("?")) {
    const text = parts[0];
    const lastQ = text.lastIndexOf("?");
    let splitAt = -1;
    for (let i = lastQ - 1; i > 10; i--) {
      if ((text[i] === "." || text[i] === "!") && text[i+1] === " " && text[i+2] === text[i+2].toUpperCase()) {
        splitAt = i; break;
      }
    }
    if (splitAt > 10) {
      const before = text.slice(0, splitAt + 1).trim();
      const after = text.slice(splitAt + 1).trim();
      if (before && after) parts = [before, after];
    }
  }
  return parts;
}

// ─── Reference Card Component ─────────────────────────────────────────────
// Shown above answer buttons for questions that have compliance references.
function ReferenceCard({ questionKey, lang }) {
  const card = REFERENCE_CARDS[questionKey];
  if (!card) return null;
  const c = lang === "FR" ? card.fr : card.en;
  return (
    <div style={{
      background: "rgba(26,92,56,0.15)",
      border: "1px solid rgba(26,92,56,0.35)",
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 10,
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 700,
        color: "#6EE7B7",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "monospace",
        marginBottom: 6,
      }}>
        {lang === "FR" ? "Guide de référence" : "Reference guide"}
      </div>
      <div style={{
        fontSize: 13,
        fontWeight: 600,
        color: "rgba(255,255,255,0.9)",
        marginBottom: 4,
      }}>
        {c.title}
      </div>
      <div style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.6,
        marginBottom: 10,
      }}>
        {c.desc}
      </div>
      <a
        href={GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 700,
          color: "#6EE7B7",
          textDecoration: "none",
          fontFamily: "Georgia, serif",
        }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
        onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
      >
        {c.link}
      </a>
    </div>
  );
}

// ─── Answer Buttons + Tell Us More Component ─────────────────────────────
// Shows predefined answer buttons. For eligible questions, after a button
// is selected a context box appears. Producer submits their answer + context
// together in one message. One exchange rule is enforced in the system prompt.
function AnswerButtons({ questionKey, lang, onSelect, disabled }) {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState(new Set());
  const [context, setContext] = useState("");
  const contextRef = useRef(null);

  const isMulti = MULTI_SELECT.has(questionKey);
  const options = lang === "FR"
    ? (QUESTION_OPTIONS_FR[questionKey] || QUESTION_OPTIONS[questionKey] || [])
    : (QUESTION_OPTIONS[questionKey] || []);

  if (!options.length) return null;

  const showContext = TELL_US_MORE_QUESTIONS.has(questionKey);
  const fr = lang === "FR";

  // ── Multi-select (Q27) ────────────────────────────────────────────────────
  if (isMulti) {
    const toggleMulti = (opt) => {
      if (disabled) return;
      setSelectedMulti(prev => {
        const next = new Set(prev);
        const isNo = opt.toLowerCase().startsWith("no");
        if (next.has(opt)) {
          next.delete(opt);
        } else {
          if (isNo) { next.clear(); next.add(opt); }
          else { next.delete("No — direct to consumers only"); next.add(opt); }
        }
        return next;
      });
    };

    const submitMulti = () => {
      if (!selectedMulti.size || disabled) return;
      const answer = fr ? `Nous approvisionnons : ${[...selectedMulti].join(", ")}` : `We supply: ${[...selectedMulti].join(", ")}`;
      onSelect(answer);
    };

    return (
      <div style={{ marginTop: 4, marginBottom: 4 }}>
        <ReferenceCard questionKey={questionKey} lang={lang} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.04em" }}>
          {fr ? "Sélectionnez tout ce qui s'applique, puis confirmez" : "Select all that apply, then confirm"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {options.map((opt, i) => {
            const sel = selectedMulti.has(opt);
            return (
              <button key={i} onClick={() => toggleMulti(opt)} disabled={disabled} style={{
                background: sel ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                border: sel ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10, padding: "11px 16px",
                color: "rgba(255,255,255,0.88)", fontSize: 14, textAlign: "left",
                cursor: disabled ? "default" : "pointer", fontFamily: "Georgia, serif", lineHeight: 1.5, transition: "all 0.15s",
              }}>
                {sel && <span style={{ marginRight: 8, color: "#6EE7B7" }}>✓</span>}{opt}
              </button>
            );
          })}
        </div>
        {selectedMulti.size > 0 && (
          <button onClick={submitMulti} disabled={disabled} style={{
            width: "100%", marginTop: 10, background: "rgba(255,255,255,0.9)", color: "#0D2B45",
            border: "none", borderRadius: 10, padding: "11px 16px", fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s",
          }}>
            {fr ? "Confirmer la sélection →" : "Confirm selection →"}
          </button>
        )}
      </div>
    );
  }

  // ── Single-select ─────────────────────────────────────────────────────────
  const handleSelect = (opt) => {
    if (disabled) return;
    if (selectedOpt === opt) { setSelectedOpt(null); setContext(""); return; }
    const autoCtx = AUTO_CONTEXT_OPTIONS.has(opt);
    setSelectedOpt(opt);
    setContext("");
    if (showContext || autoCtx) {
      setTimeout(() => contextRef.current?.focus(), 50);
    } else {
      onSelect(opt);
    }
  };

  const handleSubmit = () => {
    if (!selectedOpt || disabled) return;
    const msg = context.trim()
      ? `${selectedOpt}\n\n${fr ? "Contexte supplémentaire" : "Additional context"}: ${context.trim()}`
      : selectedOpt;
    onSelect(msg);
    setSelectedOpt(null);
    setContext("");
  };

  const isAutoCtx = selectedOpt && AUTO_CONTEXT_OPTIONS.has(selectedOpt);
  const ctxVisible = selectedOpt && (showContext || isAutoCtx);

  return (
    <div style={{ marginTop: 4, marginBottom: 4 }}>
      <ReferenceCard questionKey={questionKey} lang={lang} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(opt)} disabled={disabled} style={{
            background: selectedOpt === opt ? "rgba(255,255,255,0.18)" : selectedOpt ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
            border: selectedOpt === opt ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10, padding: "11px 16px",
            color: selectedOpt && selectedOpt !== opt ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.88)",
            fontSize: 14, textAlign: "left",
            cursor: disabled || (selectedOpt && selectedOpt !== opt) ? "default" : "pointer",
            fontFamily: "Georgia, serif", lineHeight: 1.5, transition: "all 0.15s",
          }}>
            {selectedOpt === opt && <span style={{ marginRight: 8, color: "#6EE7B7" }}>✓</span>}{opt}
          </button>
        ))}
      </div>
      {ctxVisible && (
        <div style={{ marginTop: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8, fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {isAutoCtx ? (fr ? "Veuillez décrire la durée de conservation de chaque produit" : "Please describe the shelf life of each product") : (fr ? "Contexte supplémentaire (optionnel)" : "Tell us more (optional)")}
          </div>
          <textarea ref={contextRef} value={context} onChange={e => setContext(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !isAutoCtx) { e.preventDefault(); handleSubmit(); } }}
            placeholder={isAutoCtx ? (fr ? "Ex: Produit A = 12 mois…" : "e.g. Product A = 12 months, Product B = 6 months…") : (fr ? "Ajoutez des détails utiles…" : "Add any details that might be useful…")}
            rows={isAutoCtx ? 3 : 2}
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "rgba(255,255,255,0.88)", fontSize: 13, fontFamily: "Georgia, serif", lineHeight: 1.6, resize: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, gap: 8 }}>
            {!isAutoCtx && (
              <button onClick={() => { onSelect(selectedOpt); setSelectedOpt(null); setContext(""); }}
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", padding: "6px 10px" }}>
                {fr ? "Passer" : "Skip"}
              </button>
            )}
            <button onClick={handleSubmit} disabled={isAutoCtx && !context.trim()}
              style={{ background: (!isAutoCtx || context.trim()) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", color: (!isAutoCtx || context.trim()) ? "#0D2B45" : "rgba(255,255,255,0.3)", border: "none", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 700, cursor: (!isAutoCtx || context.trim()) ? "pointer" : "default", fontFamily: "Georgia, serif", transition: "all 0.2s" }}>
              {fr ? "Envoyer →" : "Send →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

  const handleSelect = (opt) => {
    if (disabled) return;
    // Auto-activate context for multi-product shelf life option
    const autoCtx = AUTO_CONTEXT_OPTIONS.has(opt);
    setSelectedOpt(opt);
    setContext("");
    if (showContext || autoCtx) {
      setTimeout(() => contextRef.current?.focus(), 50);
    } else {
      // No context available — send immediately
      onSelect(opt);
    }
  };

  const handleSubmit = () => {
    if (!selectedOpt || disabled) return;
    const msg = context.trim()
      ? `${selectedOpt}\n\n${fr ? "Contexte supplémentaire" : "Additional context"}: ${context.trim()}`
      : selectedOpt;
    onSelect(msg);
    setSelectedOpt(null);
    setContext("");
  };

  const isAutoCtx = selectedOpt && AUTO_CONTEXT_OPTIONS.has(selectedOpt);
  const ctxVisible = selectedOpt && (showContext || isAutoCtx);

  return (
    <div style={{ marginTop: 4, marginBottom: 4 }}>
      <ReferenceCard questionKey={questionKey} lang={lang} />

      {/* Answer buttons — grey out once one is selected */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt, i) => (
          <button key={i}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
            style={{
              background: selectedOpt === opt
                ? "rgba(255,255,255,0.18)"
                : selectedOpt
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.08)",
              border: selectedOpt === opt
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "11px 16px",
              color: selectedOpt && selectedOpt !== opt
                ? "rgba(255,255,255,0.35)"
                : "rgba(255,255,255,0.88)",
              fontSize: 14,
              textAlign: "left",
              cursor: disabled || (selectedOpt && selectedOpt !== opt) ? "default" : "pointer",
              fontFamily: "Georgia, serif",
              lineHeight: 1.5,
              transition: "all 0.15s",
            }}
          >
            {selectedOpt === opt && <span style={{ marginRight: 8, color: "#6EE7B7" }}>✓</span>}
            {opt}
          </button>
        ))}
      </div>

      {/* Context box — appears after selection for eligible questions */}
      {ctxVisible && (
        <div style={{
          marginTop: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 10,
          padding: "12px 14px",
        }}>
          <div style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 8,
            fontFamily: "monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            {isAutoCtx
              ? (fr ? "Veuillez décrire la durée de conservation de chaque produit" : "Please describe the shelf life of each product")
              : (fr ? "Contexte supplémentaire (optionnel)" : "Tell us more (optional)")}
          </div>
          <textarea
            ref={contextRef}
            value={context}
            onChange={e => setContext(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey && !isAutoCtx) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={
              isAutoCtx
                ? (fr ? "Ex: Produit A = 12 mois, Produit B = 6 mois…" : "e.g. Product A = 12 months, Product B = 6 months…")
                : (fr ? "Ajoutez des détails qui pourraient être utiles…" : "Add any details that might be useful…")
            }
            rows={isAutoCtx ? 3 : 2}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "rgba(255,255,255,0.88)",
              fontSize: 13,
              fontFamily: "Georgia, serif",
              lineHeight: 1.6,
              resize: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, gap: 8 }}>
            {!isAutoCtx && (
              <button
                onClick={() => { onSelect(selectedOpt); setSelectedOpt(null); setContext(""); }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  padding: "6px 10px",
                }}
              >
                {fr ? "Passer" : "Skip"}
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={isAutoCtx && !context.trim()}
              style={{
                background: (!isAutoCtx || context.trim()) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                color: (!isAutoCtx || context.trim()) ? "#0D2B45" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: 8,
                padding: "7px 18px",
                fontSize: 13,
                fontWeight: 700,
                cursor: (!isAutoCtx || context.trim()) ? "pointer" : "default",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s",
              }}
            >
              {fr ? "Envoyer →" : "Send →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [screen, setScreen]           = useState("language");
  const [lang, setLang]               = useState("EN");
  const [intake, setIntake]           = useState({ name: "", business: "", products: "", markets: [], email: "" });
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [report, setReport]           = useState(null);
  const [phasesDetected, setPhasesDetected] = useState([]);
  const [currentQ, setCurrentQ]       = useState(null);
  const [error, setError]             = useState(null);

  // Sequence tracker — refs so they don't trigger re-renders
  const qIndexRef             = useRef(-1);
  const pendingNoAdvanceRef   = useRef(false);
  const storageClassRef       = useRef(null); // "ambient" | "chilled" | "frozen"

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const fr = lang === "FR";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, report, screen]);

  // ─── Sequence tracking ──────────────────────────────────────────────────────
  const advanceQuestion = (tagFromAI) => {
    const isAmbient = storageClassRef.current === "ambient";
    if (tagFromAI && Q_SEQUENCE.includes(tagFromAI)) {
      const tagIdx = Q_SEQUENCE.indexOf(tagFromAI);
      if (tagIdx > qIndexRef.current) {
        if (isAmbient && COLD_CHAIN_KEYS.has(tagFromAI)) {
          qIndexRef.current = Q_SEQUENCE.indexOf("Q31");
          return "Q31";
        }
        qIndexRef.current = tagIdx;
        return tagFromAI;
      }
    }
    let next = qIndexRef.current + 1;
    while (next < Q_SEQUENCE.length && isAmbient && COLD_CHAIN_KEYS.has(Q_SEQUENCE[next])) next++;
    qIndexRef.current = Math.min(next, Q_SEQUENCE.length - 1);
    return Q_SEQUENCE[qIndexRef.current];
  };

  const resetSequence = () => {
    qIndexRef.current = -1;
    pendingNoAdvanceRef.current = false;
    storageClassRef.current = null;
  };

  const buildOpeningMessage = (intakeData, language) => {
    const marketList = intakeData.markets.join(", ") || "not specified";
    if (language === "FR") return `Bonjour. Je m'appelle ${intakeData.name}. Mon entreprise s'appelle ${intakeData.business}. Nos produits principaux sont : ${intakeData.products}. Nos marchés cibles sont : ${marketList}. Je suis prêt(e) à commencer l'évaluation.`;
    return `Hello. My name is ${intakeData.name}. My business is ${intakeData.business}. Our main products are: ${intakeData.products}. Our target markets are: ${marketList}. I'm ready to begin the assessment.`;
  };

  const processReply = (reply, newMessages) => {
    const parsed = parseReport(reply);
    if (parsed) {
      setReport(parsed);
      setCurrentQ(null);
      const preText = reply.slice(0, reply.indexOf("ERSA_REPORT_JSON:")).trim();
      setMessages([...newMessages, { role: "assistant", content: preText || (fr ? "Votre rapport est prêt." : "Your report is ready."), questionKey: null }]);
      setTimeout(() => setScreen("report"), 800);
      return;
    }
    const tagFromAI = detectQuestion(reply);
    let qKey;
    if (pendingNoAdvanceRef.current) {
      pendingNoAdvanceRef.current = false;
      qKey = Q_SEQUENCE[qIndexRef.current];
    } else {
      qKey = advanceQuestion(tagFromAI);
    }
    const cleanedReply = cleanMessage(reply);
    setCurrentQ(qKey);
    setMessages([...newMessages, { role: "assistant", content: cleanedReply, questionKey: qKey }]);
    setPhasesDetected(detectPhases([...newMessages, { role: "assistant", content: cleanedReply }]));
  };

  const startChat = async (intakeData) => {
    setScreen("chat");
    setLoading(true);
    setError(null);
    resetSequence();
    const opening = buildOpeningMessage(intakeData, lang);
    const initMessages = [{ role: "user", content: opening }];
    setMessages(initMessages);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: initMessages, system: SYSTEM_PROMPT }) });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      processReply(data.content?.[0]?.text || "", initMessages);
    } catch { setError(fr ? "Erreur de connexion. Veuillez réessayer." : "Connection error. Please try again."); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setError(null);
    setCurrentQ(null);
    // Detect storage classification from Q08 answer
    if (Q_SEQUENCE[qIndexRef.current] === "Q08") {
      const t = text.toLowerCase();
      if (t.includes("ambient") || t.includes("shelf-stable") || t.includes("shelf stable")) storageClassRef.current = "ambient";
      else if (t.includes("chilled")) storageClassRef.current = "chilled";
      else if (t.includes("frozen")) storageClassRef.current = "frozen";
    }
    // Flag no-advance for Unsure on Q36
    if (NO_ADVANCE_OPTIONS.has(text.trim())) pendingNoAdvanceRef.current = true;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })), system: SYSTEM_PROMPT }) });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      processReply(data.content?.[0]?.text || "", newMessages);
    } catch { setError(fr ? "Erreur de connexion. Veuillez réessayer." : "Connection error. Please try again."); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleOptionSelect = (optionText) => {
    if (loading) return;
    sendMessage(optionText);
  };

  const reset = () => {
    setScreen("language"); setLang("EN"); setIntake({ name: "", business: "", products: "", markets: [], email: "" });
    setMessages([]); setInput(""); setReport(null); setCurrentQ(null); setPhasesDetected([]); setError(null);
    resetSequence();
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

      {/* Progress bar */}
      {(() => {
        const currentQNum = currentQ ? (currentQ === "GATE1" ? 1 : currentQ === "GATE2" ? 2 : (parseInt((currentQ.match(/Q(\d{2})/)||[])[1]||0)+2)) : 0;
        const pct = currentQNum > 0 ? Math.round((currentQNum / 45) * 100) : 0;
        return (
          <div style={{ background: "rgba(0,0,0,0.2)", padding: "8px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#90CAF9", borderRadius: 2, width: `${pct}%`, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", whiteSpace: "nowrap", minWidth: 60, textAlign: "right" }}>
                {currentQNum > 0 ? `${currentQNum} of 45` : ""}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {messages.map((m, i) => {
            const isLastAssistant = m.role === "assistant" && i === messages.length - 1;
            const qKey = m.questionKey;
            const showQNum = qKey && qKey !== "GATE1" && qKey !== "GATE2";
            const qNum = showQNum ? qKeyToNum(qKey) : null;
            // Format AI text into paragraphs
            const textParts = m.role === "assistant" ? formatAIText(m.content) : null;
            return (
              <div key={i}>
                <div style={{ marginBottom: (m.role === "assistant" && m.questionKey) ? 4 : 16, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A3C5E", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#90CAF9", marginRight: 10, flexShrink: 0, marginTop: 2 }}>◈</div>
                  )}
                  <div style={{ maxWidth: "78%", background: m.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.06)", border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px", padding: "12px 16px", color: m.role === "user" ? "#0D2B45" : "rgba(255,255,255,0.88)", fontSize: 14, lineHeight: 1.7, fontWeight: m.role === "user" ? 600 : 400 }}>
                    {showQNum && qNum && (
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#90CAF9", fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.06em" }}>
                        Question {qNum} of 45
                      </div>
                    )}
                    {m.role === "assistant" && textParts
                      ? textParts.map((p, pi) => <p key={pi} style={{ margin: pi < textParts.length - 1 ? "0 0 10px 0" : "0" }}>{p}</p>)
                      : <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>
                    }
                  </div>
                </div>
                {isLastAssistant && m.questionKey && !loading && (
                  <div style={{ paddingLeft: 38, marginBottom: 16 }}>
                    {(QUESTION_OPTIONS[m.questionKey] || []).length > 0
                      ? <AnswerButtons questionKey={m.questionKey} lang={lang} onSelect={handleOptionSelect} disabled={loading} />
                      : <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "monospace", padding: "8px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }}>
                          {fr ? "Tapez votre réponse ci-dessous ↓" : "Type your response below ↓"}
                        </div>
                    }
                  </div>
                )}
              </div>
            );
          })}

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
      <style>{`@keyframes ersa-pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}input::placeholder{color:rgba(255,255,255,0.25)}input:focus{border-color:rgba(255,255,255,0.35)!important}html,body{overflow:hidden}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D2B45}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.25);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.4)}`}</style>
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
        <div style={{ textAlign: "center", marginTop: 24, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <button onClick={reset} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: 8, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {fr ? "Nouvelle évaluation" : "Start new assessment"}
          </button>
          <button onClick={() => window.print()} style={{ background: "rgba(144,202,249,0.1)", border: "1px solid rgba(144,202,249,0.3)", color: "#90CAF9", borderRadius: 8, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            ⬇ {fr ? "Imprimer / Enregistrer en PDF" : "Print / Save as PDF"}
          </button>
        </div>
      </div>
      <style>{`
        html,body{overflow:hidden}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D2B45}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.25);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.4)}
        @media print{
          body{background:white!important}
          #root>div>div:not([data-report]){display:none!important}
          [data-report]{display:block!important;padding:0!important;background:white!important}
          button{display:none!important}
          *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        }
      `}</style>
    </div>
  );

  return null;
}
