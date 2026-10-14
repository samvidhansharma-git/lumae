# Lumae — implementation plan

## Product
Lumae is a privacy-first voice-memory command center for the hackathon's Privacy-first Knowledge Systems track. It must show a credible Omi → Qdrant → Lyzr loop, let someone ask a grounded question, expose observable workflow traces, and remain runnable in demo mode without private credentials.

## Design
- **Design movement:** dark editorial control room crossed with a quiet observatory.
- **Core principles:** signal over noise; privacy is visible; every system step is explainable; warmth belongs in the typography, not the chrome.
- **Color philosophy:** near-black gives the user's memories visual gravity; acid lime marks permission and readiness; coral, blue, green, and violet identify the three integrations and activity types.
- **Layout paradigm:** asymmetric command center: a narrow identity rail, a narrative hero, metric band, then a left-to-right systems trace that resolves into a large ask surface.
- **Signature elements:** orbital signal visualization; tiny mono telemetry labels; paper query card with a lime shadow; status markers that make backend work visible.
- **Interaction philosophy:** actions acknowledge the system state immediately, show the route the data took, and never hide whether the experience is demo or live.
- **Animation:** slow orbital drift and signal pulses; short node trace animation; all motion collapses under `prefers-reduced-motion`.
- **Typography:** Instrument Serif for human questions and answers; DM Sans for UI hierarchy; DM Mono for telemetry and integration labels.
- **Brand essence:** a private signal layer for the thoughts you do not want to lose. Personality: observant, calm, exact.
- **Brand voice:** specific, unhurried, lightly poetic. Example lines: “Turn ambient thought into searchable signal.” / “Context first. Confidence second.”
- **Wordmark & logo:** a rotated rounded square containing three rising signal bars, paired with the lowercase `lumae` wordmark.
- **Signature brand color:** knowledge lime `#d4f36a`.

## Implementation
- Static HTML/CSS/JS frontend with no build dependency.
- Vercel serverless functions under `api/` for health, ask, and both Omi webhook routes.
- Deterministic 384-dimension hashing embedder keeps the integration self-contained and matches the Qdrant collection contract in the guide.
- Qdrant Cloud is used when `QDRANT_URL` is present; otherwise the API returns safe demo context.
- Lyzr Agent Studio is called when `LYZR_API_KEY` and `LYZR_AGENT_ID` are present; otherwise the API returns a grounded, keyword-routed demo answer.
- Frontend always renders the answer's source mode and context chips.

## Project structure

- `index.html` — semantic page shell, product copy, query UI, and accessible live regions.
- `styles.css` — visual system, responsive states, focus treatment, and reduced motion.
- `app.js` — capture simulation, query flow, trace animation, activity feed, and privacy reset.
- `api/_lib/memory.mjs` — vector memory boundary and provider adapters.
- `api/omi/*` — webhook adapters for Omi payloads.
- `README.md` — setup, architecture, API, privacy, and submission details.
