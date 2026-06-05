# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Purpose

This repo is the foundation for a **Norwegian Singles running training app**, based on the document `Norwegian-Singles.pdf` — a guide to the Norwegian Singles training method (sub-threshold running) authored by James Copeland ("sirpoc"), with a foreword by Marius Bakken MD. All business logic must faithfully implement the rules below.

---

## Norwegian Singles — Complete Domain Reference

### What It Is

An adaptation of the elite Norwegian double-threshold model for recreational runners (5–9 hours/week). Instead of two sessions per day, athletes do **one (single) sub-threshold session per day**, 3× per week. Popularized by "sirpoc" on Letsrun/Strava after analyzing Kristoffer Ingebrigtsen's Strava data. Core proof: sirpoc improved from a 19-min 5k to mid-15s 5k / mid-31s 10k / 1:10 HM after age 40 using this method.

---

## Core Principles

### 1. Sub-Threshold Focus (LT2)
- All quality work occurs **just below the second lactate threshold (LT2)** — "sweetspot" = high Zone 3 / low Zone 4 in a 5-zone model.
- Quality sessions = **~20–25% of total weekly running time** (by time, not distance).
- Easy/recovery running fills the remaining **~75–80%**.
- VO2max / high-intensity work is **avoided or minimized** — too costly for the benefit in this phase.

### 2. Intensity Control Methods (priority order)
| Method | Cost | Real-time | Accuracy | Ease of Use |
|---|---|---|---|---|
| Lactate Meter | $200–400 | No | Highest | Moderate |
| Suunto ZoneSense | $400–600 | Yes | High | High |
| Tymewear VitalPro | $299 | Limited | High | Moderate |
| Power Meter (Stryd) | $200–400 | Yes | High | Moderate |
| Talk Test | Free | Yes | Moderate | High |
| Enhanced RPE | Free | Yes | Moderate | High |

**Lactate Meter targets:** 2.0–4.0 mmol/L, ideally 2.5–3.0 mmol/L. Must not consistently exceed LT2 at end of final reps.

**Heart Rate targets:** Cap at 90–92% of Max HR, or just below LTHR (from Friel's 30-min test). HR is a ceiling, not a precise target — unreliable in heat/humidity, subject to drift.

**Pace (proxy):** Derived from recent race results (within 4–8 weeks). Adjust for interval duration (shorter reps = slightly faster; longer reps = slower) and conditions (heat, hills, wind). Use VDOT or Tinman calculators as starting points.

**Power (proxy):** Target 85–95% of Critical Power (CP). Shorter intervals: ~90–95% CP. Longer intervals: ~80–85% CP.

**RPE scale:** 4–5 = too easy; **5–6 = target ("comfortably hard")** ; 6–7 = upper sustainable limit; 7+ = too hard, decrease pace.

**Talk Test:** At sub-threshold, able to speak 3–5 words between breaths.

**Suunto ZoneSense:** Works for intervals ≥3 min only; not suitable for 10×1k.

### 3. Easy Recovery Rules
- All non-quality runs: **below 70% Max HR** OR **~65% of MAS (Maximal Aerobic Speed)**.
- Monitor for low cardiac drift after warm-up.
- Walk hills if needed. Recovery is **paramount** — it enables high quality-session frequency.

### 4. Consistency & Repeatability
- Effectiveness requires months to years of consistent application.
- Expect adaptation lag of **4–8 weeks** (longer for fast-twitch dominant runners).
- Significant breakthroughs typically after **3–6+ months**.
- Stagnation periods are normal and often precede performance jumps.

---

## Weekly Structure

**Standard pattern:** `E – Q – E – Q – E – Q – LR` (7-day cycle)

- **E** = Easy run
- **Q** = Quality (sub-threshold intervals)
- **LR** = Long Run at easy pace
- **R** = Rest (can replace an E day if needed: `E–Q–E–Q–R–Q–LR`)

**Do NOT** combine quality work into the long run — disrupts load/recovery balance.

**Doubles (easy day doubles):** For volume >9 hours/week, add easy doubles on E days rather than extending single runs or adding volume around Q sessions.

### Example: Beginner / Lower Volume
| Day | Session |
|---|---|
| Mon | Easy |
| Tue | SubT: 1 × 3000m |
| Wed | Easy |
| Thu | SubT: 2 × 2000m, 90s rest |
| Fri | Easy |
| Sat | SubT: 4 × 1000m, 60s rest |
| Sun | Rest or Easy / Long Run |

### Example: Advanced / Higher Volume
| Day | Session |
|---|---|
| Mon | Easy |
| Tue | SubT: 3 × 3000m, 120s rest |
| Wed | Easy (+/- double easy) |
| Thu | SubT: 4 × 2000m, 90s rest |
| Fri | Easy (+/- double easy) |
| Sat | SubT: 8–10 × 1000m, 60s rest |
| Sun | Long Run (Easy) |

---

## Quality Workout (Sub-Threshold) Specifications

- Rest during intervals: standing, walking, or slow jogging. Short rest is key.
- Start conservatively: **20–25 min total sub-threshold work per session** and build gradually.
- For <5 hours/week: 3 sessions may mean shorter individual durations.
- Variety in interval format (rotate through 10×1k / 5×2k / 3×3k across sessions) is psychologically beneficial; physiological difference at same sub-T state is debated.

### Time-Based Workout Table
| Duration | Reps | Pace Guide | Rest |
|---|---|---|---|
| 1 min | 25 | 10k / CV pace | 30s |
| 3 min | 10–12 | 15k pace | 60s |
| 5–6 min | 6–8 | 15k pace | 60s |
| 6–8 min | 5–6 | Half marathon pace | 60s |
| 10–12 min | 3–4 | HM – 30k pace | 60–120s |
| 15 min | 3–4 | 30k pace | 90–120s |

### Distance-Based Workout Table
| Distance | Pace Guide | Rest |
|---|---|---|
| 3000m | ~25k–30k pace | 120s |
| 2000m | ~21.1k–25k pace | 90s |
| 1600m | ~10 mile pace | 60–90s |
| 1000m | ~10k to <15k pace | 60s |

---

## Long Run Rules

- **5k–HM focus:** 75–90 min at easy pace is sufficient. Role is recovery + volume, **not** a key stress workout.
- **Marathon:** Extend to 2–3 hours, primarily easy. May incorporate sub-threshold or MP work at the end (e.g., 3 × 10 min @ HMP with short rests, or 30-min block @ MP) — often done instead of a mid-week Q session.
- Long run contributes to the **20–30% of weekly volume** that should be long running (combined with easy running proportion).

---

## Volume Distribution Rules (% of weekly time)

| Run Type | % of Weekly Time |
|---|---|
| Quality (sub-threshold) | **20–25%** |
| Easy runs (incl. long run) | **75–80%** |
| Long run (subset of easy) | 20–30% of total, at easy pace |

---

## Training Load: CTL / TSS

- **TSS (Training Stress Score):** Quantifies single-workout stress (duration × intensity vs. threshold).
- **CTL (Chronic Training Load):** 42-day exponentially weighted rolling average of daily TSS. Represents sustainable fitness.
- Goal: **maximize sustainable CTL over time**. CTL trend (not absolute value) is the fitness indicator.
- CTL is the key differentiator — sub-threshold repeatability allows higher CTL than VO2max-heavy plans.
- "Green zone" concept: level of weekly sub-T work that maximizes stimulus without hindering recovery.
- Equivalent stress: 10×1000m (short rest) ≈ physiologically similar stress to 3×3000m (longer rest) when both done at correct sub-threshold intensity.

### Tracking Tools
- **Intervals.icu**, **TrainingPeaks**, **Runalyze** — all calculate TSS/CTL.
- Pace-based TSS (rTSS) preferred if terrain is stable; requires accurate threshold pace updates.
- HR-based (hrTSS) or power-based TSS also valid depending on monitoring method.

---

## Individualization Rules

### Pace Setting
- Always use **current fitness** (race/TT within 4–8 weeks).
- Erring **slower is always safer** than faster, especially initially.
- Fast-twitch (FT) dominant runners may need significantly slower paces than calculators suggest.
- Update paces every 4–8 weeks after a race or time trial.

### Heat / Humidity
- Slow pace **significantly** in heat/humidity to maintain correct sub-threshold effort.
- HR becomes unreliable in heat (cardiac drift). Switch to RPE + pace.

### Racing / Time Trials
- **Highly recommended** every 4–8 weeks (e.g., parkrun, 3k–5k TT).
- Provides neuromuscular stimulus, breaks plateaus, updates training zones.
- "Racing rust" is normal after long sub-T-only blocks — initial races may feel flat.

### Muscle Fiber Type
- **Slow-twitch dominant:** Method works very well as-is.
- **Fast-twitch dominant:** May need slower initial paces, longer adaptation, or consider replacing one Q session with hills/strides if plateaus persist.

### Volume Ceiling
- Around **8–9 hours/week**, the method starts running out of low-risk headroom.
- Easy runs >1 hour each or quality intervals >40–50 min / 10–12k raise injury risk.
- Solution: add **easy doubles** rather than extending single runs.

### Strides / Speed Work
- Optional: 6–8 × 15–30s strides, 1–2×/week after easy runs, not compromising recovery.
- FT athletes: occasional 6–10 × 8–10s short hill sprints can help.
- Sirpoc achieved his results **without** strides or strength training.

### Strength Training
- Debated. If included: keep light, ensure it does not impede recovery for running sessions.

### Fueling
- Adequate **carbohydrate intake** essential to support 3× weekly quality sessions.
- Fuel well before and after sub-T sessions. Increased training load = increased total caloric need.

### Cross-Training
- Can substitute sessions during injury, mirroring the E-Q-E-Q-E-Q-LR structure.
- Use cycling, elliptical, arc trainer at similar durations and sub-threshold effort.

---

## Applicability by Race Distance

| Distance | Fit | Notes |
|---|---|---|
| **5k – Half Marathon** | Best fit | Sweet spot; regular races/TTs provide sufficient speed stimulus |
| **1500m / Mile** | Good | Strong base; add strides or occasional 300s/400s at race pace pre-competition |
| **800m** | Limited | Requires more anaerobic capacity work; dedicated 800m plans more suitable |
| **Marathon** | Adapted | Extend long run to 2–3h; add MP blocks; longer sub-T reps (3–5 × 5k) in late block |
| **Ultramarathon** | Experimental | Very high volume, back-to-backs, significant elevation; double-threshold days possible but risky |

### Marathon-Specific Additions
1. Long runs extended toward 2–3 hours (easy effort).
2. Sub-threshold or MP blocks at end of long run (e.g., 3 × 10 min @ HMP, or continuous 30 min @ MP).
3. Longer sub-T reps: 3×5k → 4×5k → 5×5k in later block.
4. Specific MP tempo workouts (e.g., 10k @ MP) closer to race.
5. Practice fueling/hydration during long runs.

### Peaking Phase
When approaching a key race, introduce higher-intensity work (VO2max intervals, race-pace reps) as a **separate phase** built on top of the sub-threshold base. This is not part of the standard method.

---

## Monitoring & Progress Signals

- Race or 5k TT every **4–8 weeks** to update training zones.
- Track **CTL trend** as the primary fitness progression indicator.
- Critical Power (CP) testing in power-based training: 3-min/12-min or 20-min TT protocols; retest every ~4 weeks.
- Warning signs to reduce intensity: elevated RPE at normal pace, poor motivation, slow recovery between sessions, degraded sleep quality.

---

## Comparison vs. Other Methods (for app differentiation logic)

| Method | Key Difference from Norwegian Singles |
|---|---|
| **Daniels** | Multiple zones including work above LT2; phased periodization |
| **Lydiard** | Sequential base → hills → speed phases; very long aerobic base runs |
| **Pfitzinger** | Medium-long mid-week runs; VO2max and race-pace work; marathon-specific mesocycles |
| **Palladino Power Project** | Includes supra-threshold / VO2max work; longer recoveries; built-in CP testing |
| **80/20 Polarized** | Hard work at Zone 4–5 (above LT2), not just below it; avoids time near LT2 |
| **Double Threshold** | 2× sub-T sessions/day, 2 days/week (AM+PM); basis of Norwegian Singles |

**Norwegian Singles differentiators:** 3× weekly quality at strictly sub-LT2 intensity, year-round consistent structure (no periodization phases), minimal supplementary work, optimized for time-limited / slower-recovering / masters runners.

---

## Key Numbers Summary (app constants)

```
QUALITY_PCT_MIN = 0.20          // 20% of weekly time
QUALITY_PCT_MAX = 0.25          // 25% of weekly time
EASY_PCT_MIN    = 0.75          // 75% of weekly time
EASY_PCT_MAX    = 0.80          // 80% of weekly time

LONG_RUN_MIN_MIN  = 75          // minutes (5k–HM focus)
LONG_RUN_MAX_MIN  = 90          // minutes (5k–HM focus)
LONG_RUN_MARATHON_MIN = 120     // minutes (marathon focus, up to ~180)

EASY_HR_MAX_PCT   = 0.70        // 70% of Max HR
EASY_MAS_PCT      = 0.65        // 65% of MAS

QUALITY_HR_MAX_PCT   = 0.92     // 92% of Max HR ceiling
QUALITY_LACTATE_MIN  = 2.0      // mmol/L
QUALITY_LACTATE_MAX  = 4.0      // mmol/L
QUALITY_LACTATE_TARGET = 2.5    // mmol/L (recommended cap)

QUALITY_POWER_SHORT_MIN = 0.90  // 90% CP for short intervals
QUALITY_POWER_SHORT_MAX = 0.95  // 95% CP for short intervals
QUALITY_POWER_LONG_MIN  = 0.80  // 80% CP for long intervals
QUALITY_POWER_LONG_MAX  = 0.85  // 85% CP for long intervals

RPE_TARGET_MIN = 5              // "comfortably hard"
RPE_TARGET_MAX = 6
RPE_TOO_HARD   = 7

CTL_ROLLING_DAYS = 42           // exponentially weighted

SESSION_MIN_WORK_MIN = 20       // minimum total sub-T work minutes/session
SESSION_MAX_WORK_MIN = 50       // upper safe limit for quality interval time
QUALITY_MAX_DISTANCE = 12000    // meters (~12k) per session before injury risk rises

ADAPTATION_WEEKS_MIN = 4
ADAPTATION_WEEKS_MAX = 8
BREAKTHROUGH_MONTHS  = 3        // significant results typically after 3–6 months

RACE_TT_INTERVAL_WEEKS_MIN = 4
RACE_TT_INTERVAL_WEEKS_MAX = 8

WEEKLY_HOURS_DOUBLES_THRESHOLD = 9  // add doubles above this, not longer single runs
WEEKLY_HOURS_TARGET_MIN = 5
WEEKLY_HOURS_TARGET_MAX = 9

QUALITY_SESSIONS_PER_WEEK_STD  = 3
QUALITY_SESSIONS_PER_WEEK_BEGINNER = 2

STRIDE_DURATION_MIN = 15        // seconds
STRIDE_DURATION_MAX = 30        // seconds
STRIDE_REPS_MIN = 6
STRIDE_REPS_MAX = 8
HILL_SPRINT_DURATION = 10       // seconds (8–10s range)
HILL_SPRINT_REPS_MIN = 6
HILL_SPRINT_REPS_MAX = 10
```

---

## Strength Plan Feature (`strength.html`)

A companion page to the run plan generator. Produces a **one-shot weekly strength plan** matched to the runner's current periodization block. Lower body + core only. User self-schedules sessions — no auto-placement into the run calendar.

### Pages & Navigation
- `index.html` — Run Plan (Norwegian Singles weekly plan generator)
- `strength.html` — Strength Plan (block-matched strength generator)
- Both pages share a top nav bar for switching between features.

### Inputs
| Input | Options |
|---|---|
| Training block | Base / Build / Peak / Taper |
| Week in block | 1, 2, 3, … (drives week-number progression) |
| Sessions per week | 1 / 2 / 3 |
| Equipment | Bodyweight (always) · Dumbbells · Barbell · Full Gym (multi-select) |

### Block → Strength Type Mapping (evidence-based)
| Block | Focus | Sets × Reps | RPE | Rest | Source |
|---|---|---|---|---|---|
| **Base** | Anatomical adaptation / general strength | 3 × 12–15 | 6–7 | 45–60s | Beattie et al. 2017 |
| **Build** | Maximal strength → running economy | 4 × 3–6 | 8–9 | 2–3 min | Støren et al. 2008; Blagrove et al. 2018 |
| **Peak** | Power / plyometric conversion | 3 × 4–6 (explosive) | 7–8 | 2 min | Spurrs et al. 2003; Saunders et al. 2006 |
| **Taper** | Neural maintenance, shed fatigue | 2 × 4–5 | 6–7 | 90s | Mujika & Padilla 2003 |

**Isometrics** (Copenhagen plank, wall sit, calf holds) apply across all blocks — emphasis in Base for connective tissue. Cue: time-based holds (30–45s), RPE 6–7.

**Core** (plank, dead bug, hollow hold, bird dog, etc.) included in every session — 3 × 30–45s for holds, 3 × 10–12 for dynamic exercises, RPE 7.

### Week Progression (4-week microcycle, repeating)
| Cycle week | Label | Action |
|---|---|---|
| 1 | Baseline | Establish technique, calibrate RPE |
| 2 | Build | Add load on compounds if recovery allows |
| 3 | Overload | Add load or +1 rep vs. week 2 |
| 4 | Deload | −1 set, lighter load, absorb adaptation |

### Exercise Library Structure
Each exercise: `{ name, equip, cat, cue }`
- `equip`: `'bodyweight'` | `'dumbbells'` | `'barbell'` | `'gym'`
- `cat`: `'strength'` | `'power'` | `'iso'` | `'core'`

Equipment filter hierarchy (cumulative): bodyweight < dumbbells < barbell < gym. Selecting "barbell" also unlocks all bodyweight and dumbbell exercises.

### Session Composition per Block
- **Base:** 3 strength + 1 iso + 2 core
- **Build:** 4 strength (heavy compounds) + 1 iso + 1 core
- **Peak:** 3 power/plyometric + 1 iso + 1 core
- **Taper:** 2 strength + 1 power + 1 core

Sessions rotate through the exercise pool to avoid repetition across Session 1 / 2 / 3.

### Scheduling Rules (Norwegian Singles compatibility)
- Place strength sessions on **easy run days only** — never on quality session days or the day before.
- Allow **48h** between a heavy (Build) session and the next quality run.
- Taper sessions: perform **5–7 days before race** for neuromuscular freshness.
