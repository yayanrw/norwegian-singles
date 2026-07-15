import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = readFileSync(path.join(dir, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const context = {
  document: { addEventListener() {}, getElementById() { return null; } },
  window: { addEventListener() {} },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: {},
};
context.window = context;
vm.createContext(context);
vm.runInContext(script, context);

const { selectAllWorkouts, riegelPaceSecPerKm, fmtPace, parseTimeToSeconds, easyPaceRange } = context;

// ── selectAllWorkouts: totals stay close to target across race/session/volume combos ──
// marathon/ultra use longer intervals (2000-5000m) — need higher volume before discrete
// rep-rounding can hit the 20% target at low km, so they get a higher weeklyKm floor.
const RACE_VOLUMES = {
  '5k': [40, 60, 80, 100], '10k': [40, 60, 80, 100], 'hm': [40, 60, 80, 100],
  'marathon': [60, 80, 100, 120], 'ultra': [60, 80, 100, 120],
};
for (const race of Object.keys(RACE_VOLUMES)) {
  for (const sessions of [2, 3]) {
    for (const weeklyKm of RACE_VOLUMES[race]) {
      const target = weeklyKm * 0.20;
      const workouts = selectAllWorkouts(target, race, sessions);
      assert.equal(workouts.length, sessions, `${race}/${sessions}/${weeklyKm}: session count`);
      const total = workouts.reduce((s, w) => s + w.totalKm, 0);
      assert.ok(Math.abs(total - target) <= target * 0.20,
        `${race}/${sessions}/${weeklyKm}: total ${total} vs target ${target}`);
      workouts.forEach(w => assert.ok(w.reps >= 1, `${race}: reps >= 1`));
      const dists = workouts.map(w => w.dist);
      assert.equal(new Set(dists).size, dists.length, `${race}/${sessions}: distances unique`);
    }
  }
}
console.log('selectAllWorkouts: OK');

// ── Riegel round-trip: 20:00 5k -> ~41:40 10k ──
const t1 = parseTimeToSeconds('20:00');
assert.equal(t1, 1200);
const pace10k = riegelPaceSecPerKm(t1, 5000, 10000);
const predicted10kSec = pace10k * 10;
assert.ok(Math.abs(predicted10kSec - 2500) < 30, `predicted 10k ${predicted10kSec}s vs ~2500s`);
console.log('Riegel round-trip: OK');

// ── parseTimeToSeconds formats ──
assert.equal(parseTimeToSeconds('1:05:30'), 3930);
assert.equal(parseTimeToSeconds('22:15'), 1335);
assert.equal(parseTimeToSeconds('bad'), null);
console.log('parseTimeToSeconds: OK');

// ── easyPaceRange returns null without inputs, a range with them ──
assert.equal(easyPaceRange(null, null), null);
assert.match(easyPaceRange(1200, 5000), /^\d+:\d{2}–\d+:\d{2}\/km$/);
console.log('easyPaceRange: OK');

console.log('\nAll plan-math tests passed.');
