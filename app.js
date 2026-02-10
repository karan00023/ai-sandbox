const CONFIG = {
  user: "Karan",
  startDate: "2026-02-09",
  endDate: "2026-04-06",
  sobriety90Date: "2026-05-10",
  targetWeightLossKg: 8,
  macroTargets: { calories: [1800, 2000], protein: [180, 200], fat: [60, 70], carbs: [100, 150], highCarbDays: ["Monday", "Wednesday", "Friday"], highCarbRange: [150, 180] },
  workoutSchedule: {
    Monday: { type: "Legs", location: "Gym", duration: "70 min" }, Tuesday: { type: "Chest + Triceps", location: "Gym", duration: "70 min" }, Wednesday: { type: "Back + Biceps", location: "Gym", duration: "70 min" }, Thursday: { type: "Rest / Light Cardio", location: "Home", duration: "30-45 min" }, Friday: { type: "Shoulders + Abs", location: "Gym", duration: "70 min" }, Saturday: { type: "Full Body Circuit + HIIT", location: "Home", duration: "60 min" }, Sunday: { type: "Active Recovery", location: "Anywhere", duration: "45-60 min" },
  },
};
const WORKOUTS = { Monday: [["Barbell Back Squats", "4 x 8-10", "2-3 min"],["Romanian Deadlifts", "4 x 10", "2-3 min"],["Leg Press", "3 x 12-15", "90 sec"]], Tuesday: [["Barbell Bench Press", "4 x 8-10", "2-3 min"],["Incline Dumbbell Press", "4 x 10-12", "2 min"],["Cable Flyes", "3 x 12-15", "90 sec"]], Wednesday: [["Deadlifts", "4 x 6-8", "3 min"],["Pull-ups / Lat Pulldowns", "4 x 8-12", "2 min"],["Barbell Rows", "4 x 8-10", "2 min"]], Thursday: [["Recovery", "Walk / Yoga / Rest", "as needed"]], Friday: [["Overhead Press", "4 x 8-10", "2-3 min"],["Lateral Raises", "4 x 12-15", "90 sec"]], Saturday: [["Goblet Squats", "3 rounds x 15", "90 sec"],["Push-ups", "3 rounds x 15-20", "90 sec"]], Sunday: [["Active Recovery", "Walk / Yoga / Swim", "easy"]] };
const SUPPLEMENTS = { morning: ["Multivitamin/B-Complex", "Vitamin D", "Omega-3", "CoQ10", "Collagen"], pre_workout: ["Coffee", "Creatine 5g"], post_workout: ["Whey", "Creatine 5g"], night: ["Magnesium", "Zinc", "NAC", "Vitamin C"], anytime: ["Folate", "Vitamin E"] };
const MILESTONES = [["Start Sobriety", "2026-02-09", "Stop THC and alcohol"], ["30 Days Clean", "2026-03-11", "Celebrate milestone"], ["8-Week Program Complete", "2026-04-06", "Review body recomp"], ["60 Days Clean", "2026-04-10", "Sperm quality improving"], ["90 Days Clean", "2026-05-10", "Repeat semen analysis"]];
const EQUIPMENT = { essential: [{ item: "Adjustable Dumbbells", budget: [200, 300], links: ["https://www.amazon.com/s?k=bowflex+selecttech"] }, { item: "Resistance Bands Set", budget: [30, 50], links: ["https://www.amazon.com/s?k=resistance+bands+set"] }, { item: "Pull-up Bar", budget: [25, 40], links: ["https://www.amazon.com/s?k=doorway+pull+up+bar"] }, { item: "Jump Rope", budget: [15, 20], links: ["https://www.amazon.com/s?k=jump+rope+fitness"] }, { item: "Yoga Mat", budget: [20, 30], links: ["https://www.amazon.com/s?k=yoga+mat"] }, { item: "Kettlebell", budget: [50, 80], links: ["https://www.amazon.com/s?k=kettlebell+50+lb"] }], optional: [{ item: "Adjustable Bench", budget: [150, 250], links: ["https://www.amazon.com/s?k=adjustable+weight+bench"] }] };
const KNOWLEDGE = [["Why Body Recomposition Works", "Lose fat and gain muscle simultaneously with high protein and progressive training."], ["Fertility Optimization", "THC/alcohol reduce sperm quality; improvements usually need ~90 days."], ["Nutrition Science", "Protein target protects muscle in a calorie deficit."], ["Progressive Overload", "Track loads and increase reps/weight gradually."], ["Recovery & Sleep", "7-8h sleep improves hormones and fat loss."]];
const MOTIVATION = ["Your body is healing. Keep going.", "Cravings pass. Discipline compounds.", "You are building the future father version of you."];

const KEY = 'fitness-fertility-tracker-v2';
const defaultState = { sobrietyLog: {}, workoutLog: {}, nutritionLog: {}, metrics: [], checkins: [], supplements: {}, photos: [], equipmentChecked: {}, settings: { weightUnit: 'kg', waistUnit: 'cm', theme: 'dark', checkinDay: 'Monday', mealReminder: '20:30', cleanReminder: '21:00' } };
const state = structuredClone(defaultState);
const isoToday = new Date().toISOString().slice(0, 10);

function mergeState(incoming = {}) {
  Object.assign(state, structuredClone(defaultState), incoming);
}
function saveLocal() { localStorage.setItem(KEY, JSON.stringify(state)); }
function setSyncStatus(text, good = true) { const el = document.getElementById('sync-status'); el.textContent = text; el.className = `badge ${good ? 'status-good' : 'status-warn'}`; }

async function loadState() {
  const local = JSON.parse(localStorage.getItem(KEY) || '{}');
  mergeState(local);
  try {
    const r = await fetch('/api/state');
    if (r.ok) {
      const payload = await r.json();
      if (payload.state && Object.keys(payload.state).length) {
        mergeState(payload.state);
        saveLocal();
      }
      setSyncStatus('SQLite sync connected');
    }
  } catch {
    setSyncStatus('Local-only mode', false);
  }
}

async function persist() {
  saveLocal();
  try {
    const r = await fetch('/api/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state }) });
    setSyncStatus(r.ok ? 'Saved to SQLite' : 'Save failed', r.ok);
  } catch {
    setSyncStatus('Saved locally only', false);
  }
}

function daysBetween(a, b) { return Math.floor((new Date(b) - new Date(a)) / 86400000); }
function daysFromStart() { return Math.max(0, daysBetween(CONFIG.startDate, isoToday) + 1); }
function currentWeek() { return Math.min(8, Math.max(1, Math.floor(daysBetween(CONFIG.startDate, isoToday) / 7) + 1)); }
function dayName() { return new Date().toLocaleDateString('en-US', { weekday: 'long' }); }
function statusClass(v, t) { return v >= t[0] && v <= t[1] ? 'status-good' : v >= t[0] * 0.9 ? 'status-warn' : 'status-bad'; }

function renderDashboard() {
  const latest = state.metrics.at(-1) || {};
  const startWeight = state.metrics[0]?.weight || null;
  const todayMacro = state.nutritionLog[isoToday] || { calories: 0, protein: 0, fat: 0, carbs: 0 };
  document.getElementById('dashboard-metrics').innerHTML = [
    ['Days clean', daysFromStart()], ['Week', `${currentWeek()}/8`], ['Days to 90', Math.max(0, daysBetween(isoToday, CONFIG.sobriety90Date))], ['Weight', latest.weight ?? '-'], ['Lost', startWeight ? (startWeight - (latest.weight || startWeight)).toFixed(1) : '-'], ['Waist', latest.waist ?? '-'], ['Workout', CONFIG.workoutSchedule[dayName()].type], ['Protein', `${todayMacro.protein}g/${CONFIG.macroTargets.protein[0]}g`]
  ].map(([k,v]) => `<div class="metric"><strong>${v}</strong><span>${k}</span></div>`).join('');
}

function renderSobriety() {
  const clean = Object.values(state.sobrietyLog).filter((v) => v === 'clean').length;
  const next = [7,14,30,60,90].find((m) => clean < m) || 90;
  document.getElementById('sobriety-stats').innerHTML = `<span class="badge">Clean logs: ${clean}</span><span class="badge">Next milestone: ${next} days</span>`;
  document.getElementById('milestone-message').textContent = clean >= 90 ? '90 DAYS CLEAN! You did it.' : `Keep going: ${next-clean} days to next milestone.`;
  const start = new Date(CONFIG.startDate);
  const days = Array.from({ length: Math.max(1, daysBetween(CONFIG.startDate, isoToday) + 1) }, (_, i) => { const d = new Date(start); d.setDate(d.getDate()+i); const iso=d.toISOString().slice(0,10); const mark=state.sobrietyLog[iso]; return `<div class="day-cell ${mark==='clean'?'day-clean':mark==='relapse'?'day-relapse':''}" title="${iso}"></div>`; });
  document.getElementById('sobriety-calendar').innerHTML = days.join('');
}

function renderWorkout() {
  const today = dayName();
  const plan = WORKOUTS[today] || [];
  document.getElementById('today-workout-summary').textContent = `${today}: ${CONFIG.workoutSchedule[today].type} • ${CONFIG.workoutSchedule[today].location} • ${CONFIG.workoutSchedule[today].duration}`;
  const log = state.workoutLog[isoToday] || {};
  document.getElementById('today-workout-list').innerHTML = plan.map(([name, reps, rest], i) => `<div class="workout-item"><label><input type="checkbox" data-w="${i}" ${log[i]?.done?'checked':''}/> ${name}</label><div><small class="muted">${reps} • Rest ${rest}</small></div><input data-ww="${i}" type="number" placeholder="Weight used" value="${log[i]?.weight ?? ''}"/></div>`).join('');
  document.querySelectorAll('[data-w]').forEach((el) => el.addEventListener('change', (e) => { const i = e.target.dataset.w; state.workoutLog[isoToday] ??= {}; state.workoutLog[isoToday][i] ??= {}; state.workoutLog[isoToday][i].done = e.target.checked; persist(); renderProgressSummary(); }));
  document.querySelectorAll('[data-ww]').forEach((el) => el.addEventListener('change', (e) => { const i = e.target.dataset.ww; state.workoutLog[isoToday] ??= {}; state.workoutLog[isoToday][i] ??= {}; state.workoutLog[isoToday][i].weight = Number(e.target.value || 0); persist(); }));
}

function renderMacros() {
  const m = state.nutritionLog[isoToday] || { calories: 0, protein: 0, fat: 0, carbs: 0, notes: '' };
  document.getElementById('macro-progress').innerHTML = `<p class="${statusClass(m.calories, CONFIG.macroTargets.calories)}">Calories: ${m.calories} / ${CONFIG.macroTargets.calories.join('-')}</p><p class="${statusClass(m.protein, CONFIG.macroTargets.protein)}">Protein: ${m.protein}g / ${CONFIG.macroTargets.protein.join('-')}g</p><p class="${statusClass(m.fat, CONFIG.macroTargets.fat)}">Fat: ${m.fat}g / ${CONFIG.macroTargets.fat.join('-')}g</p><p class="${statusClass(m.carbs, CONFIG.macroTargets.carbs)}">Carbs: ${m.carbs}g / ${CONFIG.macroTargets.carbs.join('-')}g</p>${m.flagged ? '<p class="status-bad">Avoid-food flag detected in notes.</p>' : ''}`;
}

function renderSupplements() {
  state.supplements[isoToday] ??= {};
  document.getElementById('supplement-list').innerHTML = Object.entries(SUPPLEMENTS).map(([block, items]) => `<div class="panel-item"><strong>${block.replace('_',' ')}</strong>${items.map((s,i)=>`<label><input type="checkbox" data-s="${block}-${i}" ${state.supplements[isoToday][`${block}-${i}`]?'checked':''}/> ${s}</label>`).join('')}</div>`).join('');
  document.querySelectorAll('[data-s]').forEach((el)=>el.addEventListener('change',(e)=>{ state.supplements[isoToday][e.target.dataset.s]=e.target.checked; persist(); renderProgressSummary(); }));
}

function renderMilestones() { document.getElementById('milestone-timeline').innerHTML = MILESTONES.map(([n,d,a]) => `<div class="milestone ${new Date(d) <= new Date(isoToday) ? 'done' : ''}"><strong>${n}</strong><div>${d}</div><small class="muted">${a}</small></div>`).join(''); }
function renderEquipment() {
  const rows = [['essential', EQUIPMENT.essential], ['optional', EQUIPMENT.optional]];
  document.getElementById('equipment-list').innerHTML = rows.map(([k,l]) => `<div class="panel-item"><strong>${k}</strong>${l.map((it, idx) => `<label><input data-e="${k}-${idx}" type="checkbox" ${state.equipmentChecked[`${k}-${idx}`]?'checked':''}/> ${it.item} ($${it.budget[0]}-$${it.budget[1]})</label><div class="link-row">${it.links.map((u)=>`<a href="${u}" target="_blank">Buy</a>`).join('')}</div>`).join('')}</div>`).join('');
  document.querySelectorAll('[data-e]').forEach((el)=>el.addEventListener('change',(e)=>{ state.equipmentChecked[e.target.dataset.e]=e.target.checked; persist(); renderEquipment(); }));
  let min=0,max=0; rows.forEach(([k,l])=>l.forEach((it,idx)=>{ if(state.equipmentChecked[`${k}-${idx}`]){min+=it.budget[0];max+=it.budget[1];}}));
  document.getElementById('equipment-budget').textContent = `Selected budget: $${min}-$${max}`;
}
function renderKnowledge(){ document.getElementById('knowledge-base').innerHTML = KNOWLEDGE.map(([t,b])=>`<div class="panel-item"><strong>${t}</strong><p>${b}</p></div>`).join(''); }
function renderPhotos(){ document.getElementById('photo-gallery').innerHTML = state.photos.slice(-8).map((p)=>`<img src="${p.data}" alt="progress ${p.date}"/>`).join(''); }

function renderProgressSummary() {
  const doneDays = Object.entries(state.workoutLog).filter(([d,v]) => daysBetween(d, isoToday) >= 0 && daysBetween(d, isoToday) < 7 && Object.values(v).some((x) => x.done)).length;
  const suppTotal = Object.values(SUPPLEMENTS).flat().length;
  const suppDone = Object.values(state.supplements[isoToday] || {}).filter(Boolean).length;
  const proteinDays = Object.values(state.nutritionLog).filter((n) => n.protein >= 180).length;
  const sw = state.metrics[0]?.weight; const cw = state.metrics.at(-1)?.weight; const gw = sw ? (sw - CONFIG.targetWeightLossKg).toFixed(1) : '-';
  document.getElementById('progress-summary').innerHTML = `<p><strong>Sobriety:</strong> ${daysFromStart()} days clean</p><p><strong>Weight:</strong> ${sw ?? '-'} → ${cw ?? '-'} (goal ${gw})</p><p><strong>Workouts this week:</strong> ${doneDays}/7</p><p><strong>Protein-target days:</strong> ${proteinDays}</p><p><strong>Supplements today:</strong> ${suppDone}/${suppTotal}</p>`;
}
function renderQuote(){ document.getElementById('quote-box').textContent = MOTIVATION[daysFromStart() % MOTIVATION.length]; }

function applySettings() {
  document.documentElement.setAttribute('data-theme', state.settings.theme);
  ['weight-unit','waist-unit','theme-select','checkin-day','meal-reminder','clean-reminder'].forEach((id)=>{ const key=id.replace('-', ''); });
  document.getElementById('weight-unit').value = state.settings.weightUnit;
  document.getElementById('waist-unit').value = state.settings.waistUnit;
  document.getElementById('theme-select').value = state.settings.theme;
  document.getElementById('checkin-day').value = state.settings.checkinDay;
  document.getElementById('meal-reminder').value = state.settings.mealReminder;
  document.getElementById('clean-reminder').value = state.settings.cleanReminder;
}

function wireEvents() {
  document.getElementById('tabs-nav').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn'); if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach((b)=>b.classList.toggle('active', b === btn));
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach((p)=>p.classList.toggle('active', p.id === `tab-${tab}`));
  });
  document.getElementById('clean-today-btn').addEventListener('click', async () => { state.sobrietyLog[isoToday] = 'clean'; await persist(); renderSobriety(); renderProgressSummary(); });
  document.getElementById('relapse-btn').addEventListener('click', async () => { state.sobrietyLog[isoToday] = 'relapse'; await persist(); renderSobriety(); renderProgressSummary(); });
  document.getElementById('macro-form').addEventListener('submit', async (e) => { e.preventDefault(); const notes = document.getElementById('meal-notes').value || ''; const flag = ['alcohol','thc','processed','sugary','fast food','pastries','fried'].some((w)=>notes.toLowerCase().includes(w)); state.nutritionLog[isoToday] = { calories:+document.getElementById('calories').value, protein:+document.getElementById('protein').value, fat:+document.getElementById('fat').value, carbs:+document.getElementById('carbs').value, notes, flagged: flag }; await persist(); renderMacros(); renderDashboard(); renderProgressSummary(); e.target.reset(); });
  document.getElementById('metrics-form').addEventListener('submit', async (e) => { e.preventDefault(); const row = { date: isoToday, weight:+document.getElementById('weight-input').value, waist:+document.getElementById('waist-input').value, bodyFat: document.getElementById('bodyfat-input').value ? +document.getElementById('bodyfat-input').value : null }; state.metrics.push(row); await persist(); document.getElementById('body-metrics-summary').textContent = `Saved ${row.date}: ${row.weight}${state.settings.weightUnit}, waist ${row.waist}${state.settings.waistUnit}`; renderDashboard(); renderProgressSummary(); e.target.reset(); });
  document.getElementById('checkin-form').addEventListener('submit', async (e) => { e.preventDefault(); state.checkins.push({ date: isoToday, week: currentWeek(), mental:+document.getElementById('mental-state').value, energy:+document.getElementById('energy-level').value, sleepHours:+document.getElementById('sleep-hours').value, sleepQuality:+document.getElementById('sleep-quality').value, cravings:document.getElementById('cravings').value, wins:document.getElementById('wins').value, struggles:document.getElementById('struggles').value }); await persist(); alert('Weekly check-in saved.'); e.target.reset(); });
  document.getElementById('settings-form').addEventListener('submit', async (e) => { e.preventDefault(); state.settings = { weightUnit: document.getElementById('weight-unit').value, waistUnit: document.getElementById('waist-unit').value, theme: document.getElementById('theme-select').value, checkinDay: document.getElementById('checkin-day').value, mealReminder: document.getElementById('meal-reminder').value, cleanReminder: document.getElementById('clean-reminder').value }; await persist(); applySettings(); });
  document.getElementById('save-photos-btn').addEventListener('click', async () => { const files = Array.from(document.getElementById('photo-upload').files || []); for (const file of files) { const data = await new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(file); }); state.photos.push({ date: isoToday, data }); } await persist(); renderPhotos(); });
  document.getElementById('export-json-btn').addEventListener('click', () => { const blob = new Blob([JSON.stringify({ config: CONFIG, state }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `karan-tracker-${isoToday}.json`; a.click(); });
  document.getElementById('export-csv-btn').addEventListener('click', () => { const rows = [['date','calories','protein','fat','carbs'], ...Object.entries(state.nutritionLog).map(([d,m]) => [d,m.calories,m.protein,m.fat,m.carbs])]; const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `karan-nutrition-${isoToday}.csv`; a.click(); });
  document.getElementById('reset-program-btn').addEventListener('click', async () => { if (!confirm('Reset all tracker data?')) return; localStorage.removeItem(KEY); try { await fetch('/api/reset', { method: 'POST' }); } catch {} location.reload(); });
}

async function init() {
  await loadState();
  applySettings();
  wireEvents();
  renderDashboard(); renderSobriety(); renderWorkout(); renderMacros(); renderSupplements(); renderMilestones(); renderEquipment(); renderKnowledge(); renderPhotos(); renderProgressSummary(); renderQuote();
}
init();
