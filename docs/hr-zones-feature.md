# HR Zone Calculator (LTHR-based) — Implementation Plan

## Context

The Norwegian Singles method references heart rate constantly — easy runs capped below 70% HRmax, quality sessions held just below LTHR (the LT2 proxy). But the app has no tool to translate a runner's heart rate into actionable zones. This feature adds a **third page** that maps a runner's **5 HR zones** from a single field input: their **LTHR** (Lactate Threshold Heart Rate from Friel's 30-min test).

LTHR is chosen as the anchor because it directly measures LT2 — the exact intensity Norwegian Singles is built around — making its zones individualized rather than a generic % of HRmax. From LTHR alone the app derives all 5 zones plus an estimated HRmax and the NS easy-run ceiling.

### Scope (locked with user)
- **Single primary input:** LTHR in bpm. No multi-path race-estimate input, no separate HRmax input.
- **One refining input:** Training status (improves the derived HRmax estimate only).
- **Method:** Friel 30-min TT zones (% of LTHR) — Method 2 from brainstorm.
- **Output:** Visual 5-zone bar with **Norwegian Singles annotations** baked into each zone.
- **Guidance:** Collapsible "How to do the test" + "When to retest" sections.
- Stateless, self-scheduled — consistent with the rest of the app.

---

## Approach

Build a **new standalone `hr-zones.html`** (single self-contained file: inline `<style>` + inline `<script>`, no build step, no dependencies — same architecture as `index.html` and `strength.html`). Extend the shared nav bar on **all three pages** to include the new page.

### Files
- **New:** `/Users/yayanrahmatwijaya/Herd/norwegian-singles/hr-zones.html`
- **Edit:** `index.html` and `strength.html` — add a third nav link only (no logic changes).

---

## Inputs

| Input | Type | Purpose | Required |
|---|---|---|---|
| LTHR (bpm) | number stepper / field | Anchor for all 5 zones | Yes |
| Training status | 3-option segmented toggle | Refines estimated HRmax → easy ceiling | Yes (default: Trained) |

Validation: LTHR must be in a plausible range (**120–210 bpm**) or show a friendly error via the existing `showError` pattern.

---

## Calculation Logic

### 1. Friel 5-zone split (% of LTHR)
```js
const ZONES = [
  { z:'Z1', label:'Recovery',       lo:0.00, hi:0.85 },
  { z:'Z2', label:'Aerobic',        lo:0.85, hi:0.90 },
  { z:'Z3', label:'Sub-Threshold',  lo:0.90, hi:0.95 },
  { z:'Z4', label:'Threshold',      lo:0.95, hi:1.00 },
  { z:'Z5', label:'VO2max+',        lo:1.00, hi:Infinity },
];
```
Convert each ratio to bpm and make the integer boundaries contiguous (each zone starts at previous zone's upper bound + 1; Z1 shown as "< X bpm", Z5 as "≥ LTHR bpm").

### 2. Estimated HRmax (training-status dependent ratio)
```js
const HRMAX_RATIO = { recreational:0.86, trained:0.88, highly:0.91 };
estHRmax = Math.round(LTHR / HRMAX_RATIO[status]);
```
Label clearly as an **estimate (±5–10 bpm)**, not a measured value.

### 3. Derived NS reference values
| Value | Formula | NS meaning |
|---|---|---|
| Estimated HRmax | `LTHR ÷ ratio` | Derived anchor |
| Easy run ceiling | `0.70 × estHRmax` | All non-quality runs stay below |
| Quality target | `0.90–0.95 × LTHR` | The sub-threshold sweet spot |
| Quality hard cap | `1.00 × LTHR` | Never consistently exceed at end of final rep |

---

## Norwegian Singles Zone Mapping (the core differentiator)

Each zone in the output carries an NS role annotation:

| Zone | % LTHR | NS Role | Annotation |
|---|---|---|---|
| Z1 Recovery | < 85% | Easy / Recovery | Target for all non-quality runs |
| Z2 Aerobic | 85–89% | Easy / Long run | Upper limit of easy effort |
| Z3 Sub-Threshold | 90–94% | **Quality target** | High Z3 = the NS sweet spot ★ |
| Z4 Threshold | 95–99% | **Quality ceiling** | Low Z4 OK — LTHR is the hard cap |
| Z5 VO2max+ | ≥ 100% | Off-limits | Avoided entirely in NS |

Z3 (and low Z4) are visually highlighted as the quality target band.

---

## UI / Visual Design (distinct from the other two pages)

Run page = light + cool navy. Strength page = dark + warm amber. **HR Zones page = light "clinical/cardio" theme with a crimson-rose accent**, and a multicolor **zone gradient bar** as the hero element (blue → green → yellow → orange → red), so it reads instantly as a heart-rate tool.

| Element | Value |
|---|---|
| Background | `#fafafa` clean off-white |
| Cards | white with subtle border |
| Primary accent | crimson/rose `#e11d48` / `#f43f5e` (heart-rate motif) |
| Generate button | rose |
| Zone colors | Z1 `#3b82f6` · Z2 `#22c55e` · Z3 `#eab308` · Z4 `#f97316` · Z5 `#ef4444` |

**Controls:**
- **LTHR:** number stepper (− / value / +, bpm unit) — mirrors strength page stepper.
- **Training status:** 3-segment pill toggle — `Recreational | Trained | Highly Trained`.
- **Generate button:** rose.

**Output (hero):**
- A horizontal **stacked zone bar** — five segments sized/colored by zone, each labeled with its bpm range; the Z3 quality band visibly emphasized (glow/marker on the LTHR line).
- Below the bar: a **zone detail list** — each row = zone color dot · name · bpm range · NS role badge.
- A **derived values panel** — Estimated HRmax, Easy ceiling, Quality target, Quality cap (each as a labeled stat).
- **Copy as text** button (reuse `copyPlan()` clipboard + `execCommand` fallback from `index.html` lines 788–811).

**Guidance (collapsible `<details>` sections below output):**

1. **How to perform the LTHR test**
   - Flat route (track/flat road/treadmill); **chest strap** (wrist unreliable at intensity); fresh legs.
   - Warm up 10–15 min easy → run **as hard as sustainable for 30 min** → lap at 10 min → **average HR of the last 20 min = LTHR**.
   - No-TT proxy: recent **10k race avg ≈ LTHR**; **HM race avg ≈ LTHR −2–3 bpm**.

2. **When to retest**
   | Situation | Action |
   |---|---|
   | Every 4–6 weeks in active training | Retest — fitness shifts zones |
   | After a race with HR data | Use race avg as updated proxy |
   | Returning from injury/break | Retest before resuming quality |
   | Heat / illness / heavy fatigue | Skip — results inflated |

   (Aligns with the existing NS guidance: race/TT every 4–8 weeks to update zones.)

---

## Reused patterns
- Clipboard copy with `execCommand` fallback — `copyPlan()` (`index.html` 788–811).
- `showError()` validation pattern (`index.html` 509–514) — for out-of-range LTHR.
- Nav bar markup/styles — extend the existing pattern already in `index.html` and `strength.html`.
- Stepper + pill-toggle controls — reuse from `strength.html`.

---

## Nav bar (updated on all three pages)
Three links: **Run Plan** (`index.html`) · **Strength Plan** (`strength.html`) · **HR Zones** (`hr-zones.html`), active page highlighted, styled per-page to match each palette.

---

## Verification

1. Open `hr-zones.html`:
   - Light/rose clinical theme renders; distinct from both other pages.
   - Enter LTHR (e.g. 165), status = Trained → zone bar renders 5 colored segments with correct bpm ranges (Z1 <140, Z2 140–146, Z3 148–155, Z4 156–163, Z5 ≥165), Z3 highlighted as quality target.
   - Derived panel shows est. HRmax ≈ 188, easy ceiling ≈ 131, quality target ≈ 149–157, cap = 165.
   - Change training status → est. HRmax + easy ceiling update (zones unchanged — they depend only on LTHR).
   - Out-of-range LTHR (e.g. 90 or 230) → friendly error, no output.
   - Expand both collapsible guidance sections.
   - Copy as text → clipboard contains a readable zone breakdown.
2. Cross-check zone math by hand against the Friel %-of-LTHR table.
3. Confirm nav bar appears on all three pages and links correctly; existing run + strength generators still work unchanged.

## Out of scope
- No HRmax-only or Karvonen/HRR method (LTHR is the single chosen method).
- No race-result auto-estimate input (proxy is documented in guidance text only).
- No persistence/localStorage.
- No MAS / pace / power zone conversions.
