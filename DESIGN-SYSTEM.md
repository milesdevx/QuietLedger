# QuietLedger Design System

**Design reference for the visual layer.** This describes a complete color, typography, and layout system you can apply to the frontend later. It does not modify any code — it's a reference document only.

---

## Concept

quietledger's whole pitch is *"prove the tier, not the number."* The design should make that architecture visible, not just decorative. The one idea worth carrying everywhere:

**Color = data sensitivity**, mapped directly to Compact's own three-layer model.

---

## Color Tokens

| Token | Hex | Meaning | Use for |
|---|---|---|---|
| `--bg` | `#10131c` | Base background | Page background, deep ink |
| `--panel` | `#171b27` | Surface | Cards, chips, sticky nav |
| `--panel-2` | `#1c2233` | Raised surface | Nested elements, code chips |
| `--line` | `#2a2f42` | Border | Card borders, dividers |
| `--text` | `#eae6db` | Primary text | Headlines, body copy (warm off-white, not pure white) |
| `--text-dim` | `#9aa0b4` | Secondary text | Subheads, descriptions |
| `--text-faint` | `#5f6579` | Tertiary text | Labels, timestamps |
| `--ledger` (gold) | `#c9a664` | **Public state** | Ledger fields, checklists, "what's on-chain" |
| `--witness` (violet) | `#8d8ff0` | **Private, local data** | Witness values, "what never leaves the holder" |
| `--circuit` (teal) | `#6fbf9b` | **Compiled / verified logic** | Circuits, section markers, build steps |
| `--danger` (terracotta) | `#d97a63` | **Risk / disqualifiers** | Warnings only — never decorative |

**Principle:** The three architecture colors (gold / violet / teal) should appear together as a legend early on the page, then get reused consistently — never introduce a fourth "brand" color that competes with them.

---

## Typography

- **Display: Fraunces** (serif, weight 400–600, optical size range)
  - Headlines only
  - Gives the "official document / passport" feel without going full broadsheet
  - Example: Page titles, section headers

- **Body: Inter**
  - Everything else: body copy, labels, descriptions
  - Clean, doesn't compete with the serif

- **Data/Code: JetBrains Mono**
  - Small, used only inline for real Compact identifiers
  - Examples: `ledger`, `witness`, `disclose()`, field names, commitment hashes
  - Never used for prose or labels
  - Used sparingly — only where content is literally code

**Rule:** Two typefaces (serif + sans) carry meaning. The mono is a sparing third used only where content is literally code, so it doesn't count as a competing "brand" typeface.

---

## Layout Principles

### Sequence is Real, So Numbering is Earned

Wave 1 → 2 → 3 is an actual timeline. Each wave's build prompt is an actual ordered process. Numbered steps are appropriate here, unlike most UI where numbering is just decoration.

### One Motion, Not Many

- Tab switching: single fade/rise on the panel
- No hover-lift on every card
- No staggered entrance animations
- Motion should reinforce structure, not distract

### Two-Column Split for Deliverables vs. Risk

- Left: Deliverables (gold check marks)
- Right: Disqualifiers (numbered red-outlined risk list)
- Benefit: "what to finish" and "what kills the submission" are never more than a glance apart

### A Single Progress Bar Tells the Money Story

One segmented bar (gold/violet/teal, matching the wave order):
- Tier 1: $3,500 / $12,500
- Tier 2: $4,000 / $12,500
- Tier 3: $5,000 / $12,500

No separate chart needed.

### Line Length & Readability

- Body copy inside cards: cap under ~64 characters
- Serif headlines can run wider
- Ensures the warm off-white text stays comfortable to read on dark backgrounds

---

## What NOT to Do

- ❌ **Don't add a fourth accent color** "for variety" — the three architecture colors (gold/violet/teal) already carry all the meaning this project needs.
- ❌ **Don't put the mono font anywhere except real code tokens** — it's not a brand typeface.
- ❌ **Don't add card-hover shadows or gradient washes as pure decoration** — every visual device here should map to something real (a wave, a data layer, a risk).
- ❌ **Don't use pure white text** — use `--text` (#eae6db) instead for warmth and reduced eye strain.

---

## How to Apply This Later

**To implement:** Hand this file to whoever builds your actual frontend (or apply it yourself) as the token system and layout rationale.

### Quick Implementation Checklist

- [ ] Define CSS custom properties for all color tokens
- [ ] Import Fraunces (display), Inter (body), JetBrains Mono (code)
- [ ] Audit all headings → apply Fraunces
- [ ] Audit all code tokens → apply mono (commitment hashes, field names, circuit names)
- [ ] Audit color usage → map to ledger/witness/circuit colors (not arbitrary)
- [ ] Test line lengths in cards → keep body under ~64 chars
- [ ] Add two-column layout for deliverables + disqualifiers (if applicable)
- [ ] Test with dark mode / light mode (this system is dark-first)

---

## Rationale

**Why these colors?**
- **Gold (ledger)**: precious, official, on-chain (public, immutable)
- **Violet (witness)**: private, local, hidden (stays on the device)
- **Teal (circuit)**: verified, compiled, executable (the logic layer)

This mapping makes the invisible (privacy architecture) visible in the UI.

**Why Fraunces + Inter?**
- Serif signals "official" (passport, financial document) without being stuffy
- Sans serif is modern and clean
- Together they read as "modern financial infrastructure," not "startup generic"

**Why minimize motion?**
- quietledger is serious (financial privacy)
- Excessive animation undercuts that tone
- One smooth transition per interaction is enough

---

**Status:** Reference only. No code changes required. Apply at your discretion when building the polished Holder/Verifier UI.
