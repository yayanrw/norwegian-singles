# Strength Training Plan Generator — Implementation Plan

## Context

The app currently has one page (`index.html`) — a Norwegian Singles weekly **run** plan generator. The user wants a **new, separate feature**: a one-shot generator that produces a weekly **strength training** plan for runners, matched to their current periodization block (Base / Build / Peak / Taper).

The rationale: strength type should follow the block. Evidence supports this mapping:
- **Base** → anatomical adaptation / general strength (high rep, low load) — *Beattie et al. 2017*
- **Build** → maximal strength (heavy, low rep) → improves running economy — *Støren et al. 2008; Blagrove et al. 2018*
- **Peak** → power / plyometric conversion (explosive, low volume) — *Spurrs et al. 2003; Saunders et al. 2006*
- **Taper** → neural maintenance (low volume, retain intensity) — *Mujika & Padilla 2003*

The new page must look **visually distinct** from the cool navy/blue run page — a warm, intense aesthetic — so the two features feel like different tools.

### Scope (locked with user)
- **Inputs:** Current block, Week number within block, Sessions per week (1/2/3), Equipment (multi-select chips).
- **Output:** One-shot weekly lower-body + core strength plan — exercises with sets, reps, rest, and **prescribed RPE per exercise** (RPE is decided by the app, not entered).
- **Lower body + core only** — no upper body.
- **No injury flags, no experience level, no session timer** (all explicitly dropped).
- Week number drives simple within-block progression.
- User self-schedules — the plan does not auto-place sessions into the run calendar.

---

## Approach

Build a **new standalone `strength.html`** (single self-contained file, mirroring the architecture of `index.html`: inline `<style>` + inline `<script>`, no build step, no dependencies). Add a small **nav bar to both pages** so users can switch between "Run Plan" and "Strength Plan".

### Files
- **New:** `/Users/yayanrahmatwijaya/Herd/norwegian-singles/strength.html`
- **Edit:** `/Users/yayanrahmatwijaya/Herd/norwegian-singles/index.html` — add the shared nav bar only (no logic changes).

---

## UI / Visual Design (distinct from run page)

Run page is cool: bg `#f0f4f8`, primary navy `#0f2744`, output card navy. The strength page flips to **warm + dark/intense**:

| Element | Run page (existing) | Strength page (new) |
|---|---|---|
| Background | `#f0f4f8` cool gray-blue | `#0e0e0d` warm near-black |
| Cards | white | `#1a1a18` charcoal |
| Primary accent | navy `#0f2744` | amber/copper `#d97706` / `#f59e0b` |
| Generate button | navy | amber gradient |
| Output card | navy `#0f2744` | charcoal `#161614` with amber edge |

**Block identity colors** (each block selectable as a large tappable card, not a dropdown):

| Block | Color | Hex |
|---|---|---|
| Base | Teal | `#14b8a6` |
| Build | Red-orange | `#ef4444` |
| Peak | Violet | `#8b5cf6` |
| Taper | Slate | `#64748b` |

**Controls:**
- **Block:** 4 large tappable cards, each tinted with its block color; selected card gets a colored border + glow.
- **Sessions/week:** segmented pill toggle `1 | 2 | 3`.
- **Week number:** number stepper (− / value / +), min 1.
- **Equipment:** multi-select chips — `Bodyweight` (always on/default) · `Dumbbells` · `Barbell` · `Gym (machines)`. Exercises drawn from the combined selected pool.
- **Generate button:** amber.
- **Copy as text** button mirroring the run page's `copyPlan()` pattern (reuse the same clipboard + fallback approach from `index.html` lines 788–811).

**Output card:** block-colored eyebrow + block name badge, week label, then sessions grouped (Session 1 / 2 / 3). Each exercise row: name · `sets × reps` · rest · **RPE badge** (color-graded: RPE 6–7 green, 7–8 amber, 8–9 red). Footer: block-specific coaching notes + journal-backed reminder + "place on easy days, avoid the day before a quality session" guidance (consistent with Norwegian Singles structure).

---

## Logic / Data Model (inline JS, mirrors `index.html` constants + functions style)

### 1. Block profiles
```js
const BLOCKS = {
  base:  { name:'Base',  color:'#14b8a6', goal:'Anatomical adaptation & general strength',
           rpe:[6,7], sets:3, repScheme:'12–15', rest:'45–60s', focus:'strength' },
  build: { name:'Build', color:'#ef4444', goal:'Maximal strength → running economy',
           rpe:[8,9], sets:4, repScheme:'3–6',   rest:'2–3 min', focus:'maxStrength' },
  peak:  { name:'Peak',  color:'#8b5cf6', goal:'Power / explosive conversion',
           rpe:[7,8], sets:3, repScheme:'4–6',   rest:'2 min',   focus:'power' },
  taper: { name:'Taper', color:'#64748b', goal:'Neural maintenance, shed fatigue',
           rpe:[6,7], sets:2, repScheme:'4–5',   rest:'2 min',   focus:'maintenance' },
};
```

### 2. Exercise library (lower body + core only)
A flat array, each entry tagged with `equip` (min equipment needed) and `cat` (category). The generator filters by selected equipment, then picks exercises matching the block's `focus`.

Representative content (full list authored in implementation):
- **Strength / max-strength (Build, Base):** Back squat `barbell`, Goblet squat `dumbbells`, Bodyweight squat `bodyweight`, Romanian deadlift `barbell`/`dumbbells`, Hip thrust `barbell`/`bodyweight`, Bulgarian split squat `dumbbells`/`bodyweight`, Step-up `dumbbells`/`bodyweight`, Leg press `gym`, Walking lunge `bodyweight`, Single-leg RDL `dumbbells`/`bodyweight`, Calf raise `bodyweight`/`dumbbells`.
- **Plyometric / power (Peak, light in Taper):** Box jump, Bounding, Single-leg hop, Pogo hops, Depth jump, Jump squat (weighted if `dumbbells`), Split-squat jump.
- **Isometric / stability (all blocks, emphasis Base):** Copenhagen plank, Wall sit, Isometric calf hold, Single-leg balance, Spanish squat hold.
- **Core (all blocks):** Plank, Side plank, Dead bug, Hollow hold, Bird dog, Hanging/lying leg raise.

Each exercise object: `{ name, equip:['bodyweight'|'dumbbells'|'barbell'|'gym'], cat:'strength'|'power'|'iso'|'core', cue }`.

### 3. Generation algorithm
1. Read inputs: `block`, `week`, `sessions`, `equipSet`.
2. Filter library to exercises whose `equip` requirement is satisfied by `equipSet`.
3. Build each session: pick from the block's primary category (e.g. Build → `strength`/maxStrength compounds) + always add 1 isometric/stability + 1–2 core. Rotate selections across the N sessions so they differ (variety, like the run page rotates interval formats).
4. Apply block's `sets`/`repScheme`/`rpe`/`rest` to each exercise (power/plyo exercises override reps to explosive low-rep).
5. **Week progression** (within block): small ramp — e.g. weeks 1→4 add a set or +1–2 reps / +small intensity cue; signal a deload note every ~4th week. Keep it a light modifier on the base template, surfaced as a "Week N — progression" line, not a full periodized recalculation.
6. Render sessions + RPE badges + block notes + journal reminder.

### 4. Reused patterns from `index.html`
- Clipboard copy with `execCommand` fallback — `copyPlan()` (lines 788–811).
- Combination/rotation idea for variety — analogous to `selectAllWorkouts` (lines 534–571), simplified.
- `showError()` pattern for validation (lines 509–514) — e.g. require ≥1 block + ≥1 equipment.
- Output-card + pills + notes render structure (lines 683–736).

---

## Nav bar (added to both files)
A minimal top nav: two links/tabs — **Run Plan** (`index.html`) and **Strength Plan** (`strength.html`) — with the active page highlighted. Styled per-page so it inherits each page's palette (cool on run, warm on strength). Placed above the `<header>` in each file.

---

## Verification

1. Open `index.html` in a browser → confirm nav bar appears, "Run Plan" active, existing generator still works unchanged, "Strength Plan" link navigates to `strength.html`.
2. Open `strength.html`:
   - Warm/dark palette renders; clearly distinct from run page.
   - Select each block → card highlights in its block color.
   - Toggle sessions 1/2/3 and week stepper.
   - Select/deselect equipment chips.
   - Generate → output shows the right number of sessions, exercises filtered to selected equipment, sets/reps/rest/RPE matching the block profile (e.g. Build = 4×3–6, RPE 8–9, heavy compounds; Peak = plyometrics, RPE 7–8).
   - Change week number → progression line updates.
   - Equipment edge case: bodyweight-only still yields a full plan (no barbell exercises appear).
   - Copy as text → clipboard contains a readable plan.
3. Validation: no block selected or no equipment selected → friendly error via `showError`.
4. Cross-check block→RPE/rep mapping against the journal-backed table in Context.

## Out of scope
- No integration into the run calendar / auto day-placement.
- No persistence/localStorage (matches current app — stateless).
- No upper-body, injury, experience, or timer inputs.
