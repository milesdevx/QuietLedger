<div align="center">
  <img src="./logo-icon.svg" alt="QuietLedger Logo" width="120" height="120" />
</div>

# QuietLedger

**Private, reusable financial passport on Midnight Network — prove your financial tier without revealing your exact balance.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black.svg?logo=vercel)](https://quietledger-theta.vercel.app)
[![Midnight Network](https://img.shields.io/badge/Midnight-Dual--Ledger-purple.svg)](https://docs.midnight.network/)
[![Compact Version](https://img.shields.io/badge/Compact%20Compiler-0.31.1-green.svg)](https://docs.midnight.network/)
[![Node.js Version](https://img.shields.io/badge/Node.js-22%20LTS-brightgreen.svg)](https://nodejs.org/)

### 🚀 [Live Demo](https://quietledger-theta.vercel.app)

**Try it now:** [https://quietledger-theta.vercel.app](https://quietledger-theta.vercel.app)
- Issue a passport (Holder page)
- Register a policy (Verifier page)  
- Verify against your tier

---

## Overview

QuietLedger lets a holder prove their financial standing falls within a tier (e.g., "Tier B or higher") **without revealing the exact balance/income figure**. Unlike single-use threshold proofs, the same passport can be re-verified by multiple different verifiers against different registered on-chain policies, without resubmitting private data each time.

### Key Features

- **Tier-Based Proof:** Holders are bucketed into tiers (A, B, C, D) based on fixed thresholds; verifiers only see the tier, not the exact balance
- **Reusable Passports:** One issued passport works across multiple policies and verifiers
- **On-Chain Policies:** Verifiers register policies (minTier, maxAge) on-chain; verification uses only public ledger data
- **Privacy Preserved:** Raw balance stays in the holder's private witness; ledger holds only tier, timestamp, and commitment hash
- **Midnight Native:** Built on Midnight Network's three-layer Compact model: ledger (public), witness (private), circuit (compiled)

### Differentiation

QuietLedger differs from other solvency entries (`datum`, `Vantage`, `RentProof`, `WhisperScore`) which all do a **single private-value-vs-one-threshold check**. Instead, QuietLedger:
- Discloses a **tier band**, not just true/false
- Verification runs against a **named on-chain policy**, not a hardcoded circuit threshold
- Supports **reusable credentials** across multiple verifiers

---

## Technical Architecture

### Three-Layer Model

```
┌─────────────────────────────────────────────────────┐
│  LEDGER (Public On-Chain)                           │
│  ├─ policies: Map<Bytes<32>, Policy>                │
│  │  └─ {minTier, maxAgeRounds}                      │
│  ├─ passportCommitments: Map<Bytes<32>, Record>     │
│  │  └─ {tier, timestamp} — never raw balance        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WITNESS (Private, Local)                           │
│  ├─ localFinancialValue: Uint<64>                   │
│  └─ passportNonce: Uint<64>                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  CIRCUITS (Compiled, disclose()-gated)              │
│  ├─ registerPolicy(policyId, minTier, maxAge)       │
│  ├─ issuePassport() → (commitment, tier, time)      │
│  └─ verifyPassport(commitment, policyId) → bool     │
└─────────────────────────────────────────────────────┘
```

### Tier Thresholds

| Tier | Minimum Balance |
|------|-----------------|
| Tier A | ≥ $1,000,000 |
| Tier B | ≥ $500,000 |
| Tier C | ≥ $100,000 |
| Tier D | ≥ $10,000 |

### Privacy Guarantee

**What verifiers can see:**
- ✓ Tier (A/B/C/D)
- ✓ Passport age (blocks)
- ✓ Whether it meets policy minimum
- ✓ Whether it's fresh enough

**What verifiers CANNOT see:**
- ✗ Exact balance or income
- ✗ Raw financial value in any form
- ✗ Personal financial details

---

## Project Structure

```
QuietLedger/
├── quietledger.compact       # Midnight Compact contract
├── managed/                  # Compiled contract output
├── src/
│  └── __tests__/
│     └── quietledger.test.ts # Real circuit tests
├── app/                      # Next.js frontend
│  ├── page.tsx              # Home page
│  ├── holder/               # Holder view (issue passport)
│  ├── verifier/             # Verifier view (register policy, verify)
│  ├── api/                  # Server-side routes
│  │  ├── holder/issue-passport/
│  │  └── verifier/
│  │     ├── register-policy/
│  │     └── verify-passport/
│  ├── globals.css           # Styling
│  └── layout.tsx            # Root layout
├── package.json
├── tsconfig.json
├── jest.config.js
├── next.config.js
├── vercel.json
```

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/<your-username>/QuietLedger.git
cd QuietLedger
npm install
```

### 2. Compile Contract

```bash
npm run compile
# Output: managed/quietledger/out.json
```

Verify compilation succeeded; if not, check `pragma language_version` against your `compact --version`.

### 3. Run Tests

```bash
npm test
```

Tests exercise:
- Boundary cases at each tier cutoff
- Policy pass/fail logic
- Staleness checks
- Privacy guarantee (no balance leakage)

### 4. Local Development

```bash
npm run dev
# Open http://localhost:3000
```

Navigate to:
- **Holder:** Issue a passport by entering a balance
- **Verifier:** Register policies and verify passports

### 5. Deploy to Vercel


```bash
vercel --prod
```

Verify the live deployment reaches a proof server (not just localhost).

---

## Usage

### For Holders

1. Visit `/holder`
2. Enter your financial balance (private, never stored on-chain)
3. Click "Issue Passport"
4. Receive a commitment hash (publicly shareable)
5. Share the commitment with any verifier

Your balance is converted into a tier and hashed; the balance itself never leaves your device.

### For Verifiers

1. Visit `/verifier`
2. Register a policy:
   - Set minimum tier (A/B/C/D)
   - Set maximum passport age (blocks)
3. Receive policy ID
4. To verify a passport:
   - Get commitment from holder
   - Select your policy
   - Click "Verify"
5. See pass/fail + the holder's tier

You never see the holder's balance, only whether they meet your tier requirement.

---

## Testing

### Real Compiled Circuits

All tests use real compiled circuits via `@midnight-ntwrk/compact-runtime`, not mocks:

```bash
npm test
```

Test coverage:
- ✓ Boundary cases: 10k, 100k, 500k, 1M
- ✓ Policy registration and retrieval
- ✓ Passport issuance with correct tier
- ✓ Verification pass/fail for each tier
- ✓ Staleness checks
- ✓ Privacy: balance never exposed

**CRITICAL:** Tests execute the actual compiled circuit, not a JavaScript approximation.

---

## Contracts & Circuits

### `quietledger.compact`

**Ledger State:**
- `policies: Map<Bytes<32>, Policy>` — registered verifier policies
- `passportCommitments: Map<Bytes<32>, PassportRecord>` — issued passports (tier + timestamp, no balance)

**Witness:**
- `localFinancialValue: Uint<64>` — holder's private balance
- `passportNonce: Uint<64>` — ensures unique commitments

**Circuits:**

#### `registerPolicy(policyId, minTier, maxAgeRounds)`
- Stores a policy on-chain
- Only discloses: policyId, minTier, maxAgeRounds (all public)

#### `issuePassport()`
- Reads private `localFinancialValue`
- Buckets into `Tier` enum
- Computes commitment hash: `H(balance, nonce, tier, timestamp)`
- Stores: `{tier, timestamp}` on ledger
- **Discloses only:** commitment, tier, timestamp (NOT balance)
- Returns: (commitment, tier, timestamp)

#### `verifyPassport(commitment, policyId)`
- Retrieves `{tier, timestamp}` from ledger (publicly stored)
- Retrieves `{minTier, maxAge}` from ledger
- Checks: `tier ≥ minTier` AND `age ≤ maxAge`
- Uses only public ledger values; no private data exposed
- **Discloses:** commitment, policyId, result
- Returns: boolean

---

## Midnight Integration

- **Language:** Compact (Midnight's language for privacy-preserving contracts)
- **Compilation:** `compact compile quietledger.compact managed/quietledger`
- **Runtime:** `@midnight-ntwrk/compact-runtime` (tests execute real circuits)
- **SDK:** `@midnight-ntwrk/sdk` (frontend interacts with deployed contract)
- **Proof Server:** Verifies circuits and returns proof for on-chain settlement

---

## Environment Variables

Create `.env.local` (never commit):

```
# Public
NEXT_PUBLIC_APP_NAME=quietledger
NEXT_PUBLIC_CONTRACT_ID=your-contract-id

# Private (server-side only)
PROOF_SERVER_URL=https://proof-server.midnight.network
PROOF_SERVER_API_KEY=your-key-here
```

**⚠️ CRITICAL:** Never prefix secrets with `NEXT_PUBLIC_`; they will leak to the browser.

---

## Common Issues

| Issue | Fix |
|-------|-----|
| `compact` CLI not found | `npm install -g @midnight-ntwrk/compact-cli` |
| Contract compilation fails | Check `pragma language_version` matches `compact --version` |
| Tests fail with "circuit not found" | Run `npm run compile` first; check `managed/quietledger/out.json` exists |
| Vercel deployment fails | Check Node version, build command, and env vars in Vercel settings |
| Live demo only works on localhost | Move proof-server calls to API routes (server-side), not client-side fetch |
| Secrets leaked in NEXT_PUBLIC_ | Remove; set in Vercel project settings only |

---

## Wave 1 Deliverables

- [x] Contract compiles with zero errors
- [x] Ledger holds only tier/timestamp/policy data; balance in witness
- [x] `disclose()` correct at every boundary
- [x] Tests: boundary cases, policy pass/fail, staleness, no-leakage
- [x] Holder + Verifier views live via SDK
- [x] Repo public, `midnightntwrk` tagged, Apache 2.0 licensed
- [x] README complete (this file)
- [x] **Slide deck link:** [QuietLedger — Private, Reusable Financial Passports PPT](https://docs.google.com/presentation/d/15QIYxeYciJKXAcA1cKozYT5LWNcvd88SVnI4xt_jll0/edit?usp=sharing)
- [x] **Live Vercel URL:** https://quietledger-theta.vercel.app

---

## Wave Roadmap

QuietLedger is built as a three-wave progression in the Midnight AKINDO WaveHack buildathon.

### ✅ Wave 1: Foundation (Aug 27 – Sep 16, 2026)
**Status:** Complete — Live at https://quietledger-theta.vercel.app

**Delivered:**
- ✓ Midnight Compact contract with three-layer model (ledger/witness/circuit)
- ✓ Tier-based financial proof (A/B/C/D with fixed thresholds)
- ✓ Reusable passport architecture (one credential, multiple verifiers)
- ✓ Holder & Verifier UI with real circuit execution
- ✓ Policy registry system (on-chain policies, passport verification)
- ✓ Full test suite with boundary cases and privacy guarantees
- ✓ Vercel deployment with live demo

**Key Design Decisions:**
- Balance stays in holder's witness, never on ledger
- Disclose circuit outputs only commitment hash + tier + timestamp
- Verification runs entirely on public ledger values
- Tier bands prevent exact balance disclosure while enabling proof

### 📋 Wave 2: Features & Hardening (Sep 27 – Oct 17, 2026)

**Planned Features:**
- Passport revocation (issuer-authorized, enforced in-circuit)
- Purpose-tag policy dimension (rental, lending, employment tags prevent silent passport reuse)
- Multi-policy batch verification (verify against multiple policies in one call)
- UX enhancements: passport list with status (active/revoked/expired), non-leaking error messages
- Validation evidence from live deployment

**Requirements:**
- All Wave 1 tests must still pass (no regressions)
- New tests for revocation, purpose mismatch, batch verification
- Explicit README section: "What changed since Wave 1"
- Updated slide deck reflecting new features
- Fresh Vercel redeploy with updated contract address

### 🚀 Wave 3: Launch-Ready (Oct 27 – Nov 16, 2026)

**Planned Features:**
- Full `disclose()` security audit across contract
- Issuer/oracle trust weighting (sealed registry of approved data sources)
- Complete UX polish: onboarding, error states, stranger-testable full flow
- Business viability section: specific target users (renters, freelancers, borrowers; landlords, lenders, employers), adoption path, realistic solo-scope framing
- Build Club positioning: investor-ready presentation

**Requirements:**
- All prior Wave tests must pass (no late regressions)
- Full clean-checkout re-verification (contract compiles, tests pass on fresh clone)
- Explicit README section: "What changed since Wave 2" + 3-Wave arc
- Final slide deck for Build Club / investor audience
- Production Vercel deployment confirmed live through judging period (Nov 16–27)
- Business viability statement with honest solo-builder scope

**Build Club Qualification:**
Wave 3 determines eligibility for the **Midnight Build Club** invite (8-week, part-time accelerator program with pitch access to investor network). Business viability matters here more than in earlier Waves.

---

## License

Apache License 2.0 — See [LICENSE](./LICENSE) file.

---

## Support

- **Midnight Discord:** [Join](https://discord.gg/midnight)

---

**Built for the Midnight Network AKINDO WaveHack** — Wave 1 (Aug 27 – Sep 16, 2026)
