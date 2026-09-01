# quietledger — Wave 1 Prompt (Solo Builder Edition)
### Midnight Buildathon (AKINDO WaveHack) — Private, Reusable Financial Passport

**Build period:** Aug 27 – Sep 16, 2026 · **Judging period:** Sep 16 – Sep 27, 2026 · **Grant pool:** $3,500 of $12,500 total

> **Setup, local testing, and Vercel deployment steps live in `quietledger-hosting-guide.md`** — keep that file in the repo root alongside this one. This file covers only what's specific to Wave 1: the build prompt, requirements, and deliverables.

quietledger lets a holder prove their financial standing falls within a tier (e.g., "Tier B or higher") without revealing the exact balance/income figure — and unlike a single-use threshold proof, the same passport can be re-verified by multiple different verifiers against different registered on-chain policies, without resubmitting private data each time.

**Differentiated from the board's other solvency entries** (`datum`, `Vantage`, `RentProof`, `WhisperScore`), which all do a single private-value-vs-one-threshold check: quietledger discloses a *tier band*, not just true/false, and verification runs against a *named on-chain policy*, not a hardcoded circuit threshold.

---

## Buildathon Requirements Checklist (Wave 1, solo)

**Registration & Eligibility**
- [ ] Registered individually on AKINDO (solo entrant — no team roster needed)
- [ ] 18+, not located in / not transacted from a sanctioned jurisdiction, not in a privileged program role
- [ ] Joined the Midnight Discord

**Licensing & Originality**
- [ ] All newly written Midnight-related code (contract, circuits) licensed Apache 2.0
- [ ] Functionality is genuinely original this Wave — not a mere fork/copy (Technical Gate requirement)

**Submission Requirements**
- [ ] Public GitHub repo, tagged `midnightntwrk`
- [ ] README: project explanation, setup, architecture, Midnight integration, how to test
- [ ] Slide deck link
- [ ] Demo / video pitch link
- [ ] Description of Wave 1 progress for the AKINDO submission form

**Technical Gate (auto-disqualifies if unmet)**
- [ ] At least one Compact contract compiles successfully
- [ ] Meaningful Midnight-related functionality present
- [ ] `midnightntwrk` label, public repo, deck, and video all present

*(For exact compile/test commands, env var setup, and the Vercel deploy process, see `quietledger-hosting-guide.md`.)*

---

## The Build Prompt

> Build quietledger's foundation on Midnight, respecting the three-layer Compact model: `ledger` (public), `witness` (private, local), `circuit` (compiled, `disclose()`-gated). This submission is automatically disqualified under the Technical Gate if the contract doesn't compile — verify before polishing anything.
>
> **1. `quietledger.compact` – must compile successfully**
> - `pragma language_version <match compact --version>;` `import CompactStandardLibrary;`
> - **Ledger:** `policies: Map<Bytes<32>, Policy>` (id, minTier, maxAgeRounds); `passportCommitments: Map<Bytes<32>, PassportRecord>` (commitment → {tier, timestamp}) — never raw figures.
> - **Witness:** `localFinancialValue(): Uint<64>` — the holder's real balance/income, local only.
> - **Circuits:** `registerPolicy(policyId, minTier, maxAgeRounds)`; `issuePassport()` — reads the witness, buckets into a `Tier` enum via fixed thresholds, `disclose()`s only `(commitment, tier, timestamp)`; `verifyPassport(commitment, policyId)` — checks tier ≥ policy.minTier and age ≤ policy.maxAgeRounds using already-public ledger values only, returns boolean.
> - Compile early and often: `compact compile quietledger.compact managed/quietledger`.
>
> **2. Meaningful, original Midnight functionality** — the tier-banding + reusable policy-registry design must be genuinely implemented in the contract, not a relabeled single-threshold check. If scaffolding from a template, state clearly in the README what's newly written this Wave.
>
> **3. Tests** (real compiled circuits via `@midnight-ntwrk/compact-runtime`, not JS mocks) — boundary values at each tier cutoff; policy pass/fail; stale-passport failure; assert the raw financial value never appears in ledger state or emitted data.
>
> **4. Frontend, connected end-to-end** — Holder view (issue passport), Verifier view (register policy, verify passport), both live via SDK against a real deployed contract. No mocked results. Confirm the *deployed* Vercel version actually reaches a live proof server — not just your local dev setup.
>
> **5. Public GitHub repository, Apache 2.0, tagged `midnightntwrk`** — set up now, not the night before deadline.
>
> **6. README** — what it does, why tiered + reusable rather than single-threshold, setup steps (or a pointer to the hosting guide), architecture (ledger/witness/circuit split and disclose() usage), how to run tests, and how to reach the live Vercel deployment.
>
> **7. Slide deck (5–8 slides)** — problem, why privacy is structural here, Midnight fit, what shipped, Wave 2 roadmap. Host it wherever's convenient (Google Slides, Canva, Figma) and submit the public share link.
>
> **8. Demo video** — issue a passport once, verify it against two different policies, narrate the witness/ledger split since it's invisible in the UI. Upload to YouTube/Loom/Drive (public or unlisted, viewable without login) and submit the link.
>
> **9. Description of Wave 1 progress** for the AKINDO submission form.

## Wave 1 Deliverables Checklist
- [ ] Contract compiles with zero errors on a clean checkout
- [ ] Financial value is `witness`, never `ledger`
- [ ] Ledger holds only tier/timestamp/policy data
- [ ] `disclose()` correct at every boundary
- [ ] Tests: boundary cases, policy pass/fail, staleness, no-leakage assertion
- [ ] Holder + Verifier views live via SDK, working against the live Vercel deployment (not just localhost)
- [ ] Repo public, `midnightntwrk` tagged, Apache 2.0
- [ ] README complete
- [ ] **Slide deck link:** _______________
- [ ] **Demo / video pitch link:** _______________
- [ ] **Live Vercel URL:** _______________
- [ ] Description of Wave 1 progress submitted on AKINDO

## Fastest Ways to Get Disqualified
1. Contract doesn't compile — check `pragma language_version` against your actual installed toolchain first.
2. Raw financial figure ends up in a `ledger` field instead of `witness`.
3. Frontend fakes a result instead of calling the real circuit.
4. Missing `midnightntwrk` tag, private repo, or wrong/missing Apache 2.0 license.
5. Tests exercise a JS approximation of the logic instead of the compiled circuit.
6. Live Vercel demo can't actually reach a proof server (localhost-only setup shipped by mistake) — see `quietledger-hosting-guide.md` §5.
7. Wallet credentials or proof-server secrets accidentally shipped in a `NEXT_PUBLIC_` variable — see `quietledger-hosting-guide.md` §4.
