# quietledger — Hosting & Deployment Guide

Setup, local testing, and Vercel deployment for Wave 1.

---

## 1. Prerequisites

- Node.js 18+ and npm
- Git
- Midnight `compact` CLI (install from Midnight developer dashboard or toolchain)
- Vercel CLI (optional, for local testing): `npm install -g vercel`

Verify installations:
```bash
node --version
npm --version
compact --version
git --version
```

**Note:** The Midnight CLI (`compact`) is installed separately from the Midnight developer toolchain. See the [Midnight docs](https://developer.midnight.network) for CLI setup.

---

## 2. Local Setup

```bash
# Clone and install
git clone https://github.com/<your-username>/QuietLedger.git
cd QuietLedger

# Install dependencies
npm install

# Install Midnight SDK dependencies
npm install @midnight-ntwrk/compact-runtime @midnight-ntwrk/compact-cli @midnight-ntwrk/sdk
```

---

## 3. Compile the Contract

```bash
# Compile from project root
compact compile quietledger.compact managed/quietledger

# If successful, you'll see:
# > Compiled: managed/quietledger/out.json
```

**If compilation fails:**
- Check `pragma language_version` matches your `compact --version`
- Ensure all imports are correct: `import CompactStandardLibrary;`
- Review syntax errors in the contract carefully

---

## 4. Run Tests Locally

```bash
# From project root
npm test

# Tests must:
# - Use real compiled circuits (not mocks)
# - Test boundary cases at each tier
# - Verify policy pass/fail logic
# - Assert raw financial value never leaks into public ledger
# - Confirm staleness checks work correctly
```

**CRITICAL:** Do NOT ship tests that fake results or mock the circuit. Use `@midnight-ntwrk/compact-runtime` to execute the actual compiled circuit.

---

## 5. Frontend & Live Deployment

### 5a. Environment Variables

Create `.env.local` (local only, gitignored):
```
# DO NOT use NEXT_PUBLIC_ for secrets
NEXT_PUBLIC_APP_NAME=quietledger
NEXT_PUBLIC_CONTRACT_ID=<your-compiled-contract-id-from-managed/>

# Private variables (never NEXT_PUBLIC_):
PROOF_SERVER_URL=https://proof-server.midnight.network
PROOF_SERVER_API_KEY=<your-key-from-midnight-dashboard>
```

**⚠️ CRITICAL:** Secrets must be private env vars, never NEXT_PUBLIC_. This disqualifies you if credentials appear in NEXT_PUBLIC_.

### 5b. Local Frontend Dev

```bash
npm run dev

# Open http://localhost:3000
# Test Holder and Verifier flows locally
```

### 5c. Vercel Deployment

```bash
# Install Vercel CLI (if not already)
npm install -g vercel

# Deploy from project root
vercel --prod

# At prompts:
# - Confirm project name: quietledger
# - Confirm root directory: ./
# - Enable build command output: yes
```

After deployment:
1. Note your live URL: `https://quietledger-<team>.vercel.app`
2. Test the Holder view: issue a passport
3. Test the Verifier view: register a policy and verify
4. **Confirm the live deployment actually reaches a proof server** — if it only works on localhost, you'll fail the Technical Gate

**Troubleshooting:** If the Vercel deployment cannot reach the proof server, check:
- Environment variables are set in Vercel project settings (not just `.env.local`)
- `PROOF_SERVER_URL` and `PROOF_SERVER_API_KEY` are private, not exposed to frontend
- Frontend code correctly passes proof server requests server-side (API route, not client-side fetch)

---

## 6. GitHub Setup

```bash
# Initialize repo (if not done)
git init
git add .
git commit -m "Initial commit: Wave 1 scaffold"

# Add your remote
git remote add origin https://github.com/<your-username>/QuietLedger.git
git branch -M main
git push -u origin main

# Add the buildathon tag
git tag midnightntwrk
git push origin midnightntwrk
```

Verify:
- Repo is **public**
- Tag `midnightntwrk` exists and is pushed
- LICENSE file is Apache 2.0
- README is complete (see wave1 spec)

---

## 7. Verification Checklist Before Submission

- [ ] `compact compile quietledger.compact managed/quietledger` succeeds with zero errors
- [ ] `npm test` passes; all tests use real compiled circuits
- [ ] Local frontend dev (`npm run dev`) works for Holder and Verifier
- [ ] Vercel deployment URL is live and reaches the proof server (not just localhost)
- [ ] `.env.local` is in `.gitignore`; no secrets in `.env.example` or `NEXT_PUBLIC_` vars
- [ ] GitHub repo is public, `midnightntwrk` tagged, Apache 2.0 licensed
- [ ] README explains architecture, setup, testing, and live URL
- [ ] Slide deck link is ready (Google Slides, Figma, Canva)
- [ ] Demo video (YouTube/Loom unlisted or public) shows issue + verify, narrates witness/ledger split

---

## 8. Common Issues

| Issue | Fix |
|-------|-----|
| `compact` CLI not found | `npm install -g @midnight-ntwrk/compact-cli` |
| Contract compile error: version mismatch | Check `pragma language_version <match compact --version>` |
| Tests fail with "circuit not found" | Ensure `managed/quietledger/out.json` exists after compile |
| Vercel deploy fails | Check build command, Node version, and env vars in Vercel settings |
| Live demo only works on localhost | Move proof-server calls to API route (server-side), not client-side fetch |
| Secret leaked in NEXT_PUBLIC_ | Remove from `.env`, add to Vercel secrets, only reference as private env |

---

## 9. Timeline

- **Setup complete:** ~30 min
- **Contract + tests:** ~3–4 days
- **Frontend:** ~2–3 days
- **Integration & polish:** ~1–2 days
- **Submission (slide deck, video, repo):** ~1 day

**Deadline:** Sep 16, 2026, 23:59 UTC
