# HR Zone Calculator (FTHR-based) — Implementation Plan

## Context

The Norwegian Singles method references heart rate constantly — easy runs capped below ~70% HRmax, quality sessions held just below the lactate threshold. But the app has no tool to translate a runner's heart rate into actionable zones. This feature adds a **third page** that maps a runner's **5 HR zones** from a single field input: their **FTHR** (Functional Threshold Heart Rate from a 20-min time trial).

FTHR is chosen because it directly correlates with the Lactate Threshold — the exact intensity Norwegian Singles is built around — and the test is practical (20 min, no lab). From FTHR the app derives all 5 zones plus key NS reference values (easy ceiling, quality target range, quality hard cap).

### Scope
- **Single primary input:** FTHR in bpm (user runs the 20-min TT, computes avg × 0.95, inputs the result). No separate HRmax input, no race-estimate path.
- **Method:** FTHR 5-zone model (% of FTHR). Zones: Z1 Recovery · Z2 Endurance · Z3 Steady State · Z4 Lactate Threshold · Z5 VO2 Max.
- **Output:** Visual 5-zone bar with **Norwegian Singles annotations** baked into each zone.
- **Guidance:** Collapsible "How to perform the FTHR test" + "When to retest" sections.
- Stateless, self-scheduled — consistent with the rest of the app.

---

## Approach

Refactor the existing `hr-zones.html` (already created). Update calculation logic, zone labels, zone percentages, NS annotations, derived values, and test guidance text. No structural changes to HTML/CSS — reuse all UI patterns.

### Files
- **Edit:** `hr-zones.html` — update JS constants, zone definitions, render logic, guidance text.
- **No changes needed:** `index.html`, `strength.html` (nav already has HR Zones link).

---

## Inputs

| Input | Type | Purpose | Required |
|---|---|---|---|
| FTHR (bpm) | number stepper (− / value / +) | Anchor for all 5 zones | Yes |

**Drop:** Training status pill toggle — no longer needed. HRmax estimation is not required since the easy ceiling is derived directly from FTHR.

**Validation:** FTHR must be in a plausible range (**100–200 bpm**) or show a friendly error.

---

## Calculation Logic

### 1. FTHR test → input value
The user performs a 20-min TT, records average HR, computes `FTHR = avgHR × 0.95`, and enters the result into the stepper. The app treats FTHR as a direct input.

### 2. FTHR 5-zone split (% of FTHR)

```js
const ZONES = [
  { z:'Z1', label:'Recovery',           lo:0.00,  hi:0.68  },
  { z:'Z2', label:'Endurance',          lo:0.69,  hi:0.83  },
  { z:'Z3', label:'Steady State',       lo:0.84,  hi:0.94  },
  { z:'Z4', label:'Lactate Threshold',  lo:0.95,  hi:1.05  },
  { z:'Z5', label:'VO2 Max',            lo:1.06,  hi:null   },
];
```

Zone boundaries are non-overlapping with a 1-bpm gap between zones (matching the source definition: "< 68%" / "69–83%" / etc). Convert each ratio to bpm:
- Z1: `< Math.floor(FTHR × 0.68) + 1 bpm` → display "< X bpm"
- Z2: `Math.round(FTHR × 0.69)` → `Math.round(FTHR × 0.83)` → display "A–B bpm"
- Z3: `Math.round(FTHR × 0.84)` → `Math.round(FTHR × 0.94)`
- Z4: `Math.round(FTHR × 0.95)` → `Math.round(FTHR × 1.05)`
- Z5: `> Math.round(FTHR × 1.06)` → display "> X bpm"

### 3. Derived NS reference values

| Value | Formula | NS meaning |
|---|---|---|
| FTHR | user input | Threshold anchor |
| Easy run ceiling | `~80% × FTHR` | Approximation of 70% HRmax; stay below on all non-quality days |
| Quality target | `84–94% × FTHR` | Z3 range — the sub-threshold sweet spot |
| Quality hard cap | `= FTHR` (100% FTHR) | Never consistently exceed at end of final rep |

Note: the easy ceiling is displayed with a disclaimer: "≈ 70% HRmax estimate". Z2 (69–83%) already overlaps with easy territory — the ceiling sits near the Z2/Z3 boundary.

---

## Norwegian Singles Zone Mapping (core differentiator)

Each zone row in the output carries an NS role annotation:

| Zone | % FTHR | NS Role | Annotation |
|---|---|---|---|
| Z1 Recovery | < 68% | Easy / Recovery | Comfortable recovery — use for warm-ups and cooldowns |
| Z2 Endurance | 69–83% | Easy / Aerobic | Target zone for easy and long runs — stay in low-to-mid Z2 |
| Z3 Steady State | 84–94% | **Quality Target ★** | Sub-threshold sweet spot — the heart of Norwegian Singles |
| Z4 Lactate Threshold | 95–105% | **Quality Ceiling** | Low Z4 (95–99%) acceptable — above FTHR (>100%) enters VO2max territory, avoid in NS |
| Z5 VO2 Max | > 106% | Off-Limits | Avoided entirely in Norwegian Singles training |

**Critical NS note for Z4:** The zone extends from 95% to 105% FTHR — meaning the upper half of Z4 is already *above* threshold. Norwegian Singles targets staying *below* FTHR. Low Z4 is the ceiling, not the target. Display a callout making this boundary explicit.

Z3 is visually highlighted as the quality target band. The FTHR value (= Z4 low boundary) is marked on the zone bar as the hard cap.

---

## UI / Visual Design

No theme changes — light clinical theme (`#fafafa` bg, white cards, rose `#e11d48`) stays. Changes:

1. **Remove** training status pill toggle from inputs card.
2. **Relabel** stepper from "LTHR" to "FTHR".
3. **Update** output card: derived values panel replaces "Est. HRmax" stat with "FTHR" (input echo), adjust other stats.
4. **Add** a Z4 warning note (small inline callout): "Above FTHR (> 100% FTHR) = VO2max territory — NS stays below."
5. **Zone bar proportional flex widths** — update to reflect new zone widths:
   - Z1 (68% of FTHR range): `flex: 3.5`
   - Z2 (14% band): `flex: 1.5`
   - Z3 (10% band): `flex: 1.5` (quality zone, slightly wider for emphasis)
   - Z4 (10% band): `flex: 1.5`
   - Z5 (open): `flex: 1`

Zone colors unchanged: Z1 `#3b82f6` · Z2 `#22c55e` · Z3 `#eab308` · Z4 `#f97316` · Z5 `#ef4444`

---

## Test Guidance (updated text)

### "How to perform the FTHR test" (collapsible)

1. **Choose your route.** Flat track, flat road, or treadmill. Hills and traffic distort pacing and HR.
2. **Use a chest strap (HRM).** Wrist-based HR is unreliable at high intensities. External HRM is significantly more accurate.
3. **Warm up 10+ minutes.** Easy run + dynamic stretching or running drills. Rest 2–3 min before starting.
4. **Run as hard as you can sustain for 20 minutes** — a hard, steady time-trial effort. Start conservatively for the first 5 min, assess every 5 min. Most people go too hard early and fade; a fading effort gives inaccurate data.
5. **Record average HR for the full 20 minutes.** This is your raw test number.
6. **Calculate FTHR: multiply by 0.95.** `FTHR = avg20min × 0.95`. Enter this value into the stepper.

Tip box: "Example: avg HR 185 bpm → FTHR = 185 × 0.95 = **176 bpm**."

### "When to retest" (collapsible)

| Situation | Action |
|---|---|
| Every 4–6 weeks in active training | Retest — fitness improves, zones shift upward |
| After a race or hard effort with HR data | `race avg HR × 0.95` as a quick proxy |
| Returning from injury or a break | Retest before resuming quality sessions |
| Heat / illness / heavy fatigue | Skip — HR artificially elevated, results invalid |

Aligns with NS guidance: race or 5k TT every 4–8 weeks to update training zones.

---

## Reused patterns (no changes needed)
- Clipboard copy + `execCommand` fallback → `copyZones()`
- `showError()` validation
- Stepper UI pattern
- Nav bar markup

---

## Verification

Enter FTHR = 176 (from Ryan's example: 185 bpm avg × 0.95):
- Z1: < 120 bpm ✓
- Z2: 121–146 bpm ✓
- Z3: 148–165 bpm ✓
- Z4: 167–185 bpm ✓
- Z5: > 187 bpm ✓
- Easy ceiling: ~141 bpm (80% × 176) ✓
- Quality target: 148–165 bpm (Z3) ✓
- Quality hard cap: 176 bpm (FTHR) ✓

Out-of-range FTHR (e.g. 90 or 220) → friendly error, no output.
Expand both guidance sections → content renders correctly.
Copy as text → readable zone breakdown with FTHR and all zones.
Nav works on all 3 pages; run + strength generators unchanged.

## Out of scope
- No HRmax-only or Karvonen/HRR method.
- No race-result auto-estimate input (proxy documented in guidance only).
- No persistence / localStorage.
- No MAS / pace / power zone conversions.
- No 7-zone Friel model.
