const CONFIG = {
  user: "Karan",
  startDate: "2026-02-09",
  endDate: "2026-04-06",
  sobriety90Date: "2026-05-10",
  targetWeightLossKg: 8,
  macroTargets: { calories: [1800, 2000], protein: [180, 200], fat: [60, 70], carbs: [100, 150], highCarbDays: ["Monday", "Wednesday", "Friday"], highCarbRange: [150, 180] },
  workoutSchedule: {
    Monday: { type: "Legs", location: "Gym", duration: "70 min" },
    Tuesday: { type: "Chest + Triceps", location: "Gym", duration: "70 min" },
    Wednesday: { type: "Back + Biceps", location: "Gym", duration: "70 min" },
    Thursday: { type: "Rest / Light Cardio", location: "Home", duration: "30-45 min" },
    Friday: { type: "Shoulders + Abs", location: "Gym", duration: "70 min" },
    Saturday: { type: "Full Body Circuit + HIIT", location: "Home", duration: "60 min" },
    Sunday: { type: "Active Recovery", location: "Anywhere", duration: "45-60 min" },
  },
};

const WORKOUTS = {
  Monday: [["Barbell Back Squats", "4 x 8-10", "2-3 min"], ["Romanian Deadlifts", "4 x 10", "2-3 min"], ["Leg Press", "3 x 12-15", "90 sec"], ["Walking Lunges", "3 x 12 per leg", "90 sec"], ["Leg Curls", "3 x 12", "60 sec"], ["Calf Raises", "4 x 15-20", "60 sec"]],
  Tuesday: [["Barbell Bench Press", "4 x 8-10", "2-3 min"], ["Incline Dumbbell Press", "4 x 10-12", "2 min"], ["Cable Flyes", "3 x 12-15", "90 sec"], ["Dips (chest focus)", "3 x 10-12", "90 sec"], ["Close-Grip Bench Press", "3 x 10", "2 min"], ["Rope Pushdowns", "3 x 12-15", "60 sec"], ["Overhead Dumbbell Extension", "3 x 12", "60 sec"]],
  Wednesday: [["Deadlifts", "4 x 6-8", "3 min"], ["Pull-ups or Lat Pulldowns", "4 x 8-12", "2 min"], ["Barbell Rows", "4 x 8-10", "2 min"], ["Seated Cable Rows", "3 x 12", "90 sec"], ["Face Pulls", "3 x 15", "60 sec"], ["Barbell Curls", "3 x 10", "90 sec"], ["Hammer Curls", "3 x 12", "60 sec"], ["Cable Curls", "3 x 15", "60 sec"]],
  Thursday: [["Recovery", "Walk / Yoga / Rest", "as needed"]],
  Friday: [["Overhead Press", "4 x 8-10", "2-3 min"], ["Lateral Raises", "4 x 12-15", "90 sec"], ["Front Raises", "3 x 12", "90 sec"], ["Reverse Flyes", "3 x 15", "60 sec"], ["Dumbbell Shrugs", "3 x 12", "90 sec"], ["Hanging Leg Raises", "3 x 12-15", "60 sec"], ["Cable Crunches", "3 x 15-20", "60 sec"], ["Planks", "3 x 60 sec", "60 sec"], ["Russian Twists", "3 x 20 total", "60 sec"]],
  Saturday: [["Goblet Squats", "3 rounds x 15", "90 sec"], ["Push-ups", "3 rounds x 15-20", "90 sec"], ["DB RDLs", "3 rounds x 12", "90 sec"], ["Pull-ups", "3 rounds x 8-12", "90 sec"], ["DB Lunges", "3 rounds x 12/leg", "90 sec"], ["DB Shoulder Press", "3 rounds x 12", "90 sec"], ["DB Rows", "3 rounds x 12/arm", "90 sec"], ["Plank", "3 rounds x 60 sec", "90 sec"]],
  Sunday: [["Active Recovery", "Walk / Yoga / Swim", "easy pace"]],
};

const SUPPLEMENTS = {
  morning: ["Multivitamin/B-Complex", "Vitamin D", "Omega-3 Fish Oil", "CoQ10", "Collagen Powder"],
  pre_workout: ["Coffee (optional)", "Creatine 5g"],
  post_workout: ["Whey Protein 25-40g", "Creatine 5g"],
  night: ["Magnesium", "Zinc", "NAC", "Vitamin C"],
  anytime: ["Folate", "Vitamin E 400 IU"],
};

const MILESTONES = [
  ["Start Sobriety", "2026-02-09", "Stop THC and alcohol"], ["Week 1-2 complete", "2026-02-22", "Schedule semen analysis"], ["30 Days Clean", "2026-03-11", "Celebrate milestone"], ["8-Week Program Complete", "2026-04-06", "Review body recomp results"], ["60 Days Clean", "2026-04-10", "Significant sperm improvement"], ["90 Days Clean", "2026-05-10", "Repeat semen analysis and start TTC"], ["Start Trying to Conceive", "2026-06-15", "Begin conception efforts with Diana"],
];

const EQUIPMENT = {
  essential: [
    { item: "Adjustable Dumbbells (5-50 lbs)", budget: [200, 300], links: ["https://www.amazon.com/s?k=bowflex+selecttech", "https://www.amazon.com/s?k=powerblock"] },
    { item: "Resistance Bands Set", budget: [30, 50], links: ["https://www.amazon.com/s?k=resistance+bands+set"] },
    { item: "Pull-up Bar (doorway)", budget: [25, 40], links: ["https://www.amazon.com/s?k=doorway+pull+up+bar"] },
    { item: "Jump Rope", budget: [15, 20], links: ["https://www.amazon.com/s?k=jump+rope+fitness"] },
    { item: "Yoga Mat", budget: [20, 30], links: ["https://www.amazon.com/s?k=yoga+mat"] },
    { item: "Kettlebell (35-50 lbs)", budget: [50, 80], links: ["https://www.amazon.com/s?k=kettlebell+50+lb"] },
  ],
  optional: [
    { item: "Adjustable Bench", budget: [150, 250], links: ["https://www.amazon.com/s?k=adjustable+weight+bench"] },
    { item: "TRX Suspension Trainer", budget: [100, 150], links: ["https://www.amazon.com/s?k=trx+suspension+trainer"] },
  ],
};

const KNOWLEDGE = [
  ["Why Body Recomposition Works", "You can lose fat while gaining muscle; the scale may move slower than visual/body-measurement changes."],
  ["Fertility Optimization", "THC/alcohol reduce sperm quality; sperm regeneration takes ~90 days. CoQ10, Zinc, Folate and avoiding heat/tight underwear support outcomes."],
  ["Nutrition Science", "Protein preserves/builds muscle during a deficit; carb cycling supports performance on hard training days."],
  ["Progressive Overload", "Track weights weekly and increase load/reps gradually to drive strength and muscle adaptation."],
  ["Recovery & Sleep", "7-8 hours sleep lowers cortisol, improves recovery, hormone health, and fat-loss consistency."],
];

const MOTIVATION = [
  "Day 7: Your body is already healing. Keep going.",
  "Day 15: The cravings will pass. The gains won't.",
  "Day 30: One month clean. You're becoming the father your child deserves.",
  "Week 4: Halfway there. Don't stop now.",
  "90 days clean is a legacy-level commitment.",
];

const KEY = "fitness-fertility-tracker-v2";
const state = JSON.parse(localStorage.getItem(KEY) || "{}");
state.sobrietyLog ??= {};
state.workoutLog ??= {};
state.nutritionLog ??= {};
state.metrics ??= [];
state.checkins ??= [];
state.supplements ??= {};
state.photos ??= [];
state.equipment ??= {};
state.settings ??= { weightUnit: "kg", waistUnit: "cm", theme: "dark", checkinDay: "Monday", mealReminder: "20:00", cleanReminder: "21:00" };

const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const isoToday = today.toISOString().slice(0, 10);

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function daysBetween(a, b) { return Math.floor((new Date(b) - new Date(a)) / 86400000); }
function daysFromStart() { return Math.max(0, daysBetween(CONFIG.startDate, isoToday)); }
function currentWeek() { return Math.min(Math.max(Math.floor(daysFromStart() / 7) + 1, 1), 8); }
function macroStatus(value, [min, max]) { if (value >= min && value <= max) return "status-good"; if (value >= min * 0.85) return "status-warn"; return "status-bad"; }
function toWeightDisplay(kg) { if (kg == null) return "-"; return state.settings.weightUnit === "lbs" ? `${(kg * 2.20462).toFixed(1)} lbs` : `${kg.toFixed(1)} kg`; }

function renderDashboard() {
  const startWeight = state.metrics[0]?.weight;
  const currentWeight = state.metrics.at(-1)?.weight;
  const currentWaist = state.metrics.at(-1)?.waist;
  const weightLost = startWeight && currentWeight ? (startWeight - currentWeight).toFixed(1) : "-";
  const todayMacros = state.nutritionLog[isoToday] || { calories: 0, protein: 0, fat: 0, carbs: 0 };
  const cards = [
    [daysFromStart(), "Days clean THC/alcohol"],
    [currentWeek(), "Current week (1-8)"],
    [Math.max(0, daysBetween(isoToday, CONFIG.sobriety90Date)), "Days to 90-day mark"],
    [toWeightDisplay(currentWeight), "Current weight"],
    [startWeight ? `${weightLost} kg` : "-", "Weight lost so far"],
    [currentWaist ? `${currentWaist} ${state.settings.waistUnit}` : "-", "Waist"],
    [CONFIG.workoutSchedule[dayName].type, "Today's workout"],
    [`${todayMacros.protein}g`, "Protein today"],
  ];
  document.getElementById("dashboard-metrics").innerHTML = cards.map(([v, l]) => `<div class="metric"><strong>${v}</strong><span>${l}</span></div>`).join("");
}

function renderSobriety() {
  document.getElementById("sobriety-stats").innerHTML = `<span class="badge">Start: Feb 9, 2026</span><span class="badge">Current streak: ${daysFromStart()} days</span><span class="badge">90-day target: ${CONFIG.sobriety90Date}</span>`;
  const current = daysFromStart();
  const milestones = [7, 14, 30, 60, 90];
  const next = milestones.find((m) => m > current) || 90;
  const pct = Math.min(100, Math.round((current / next) * 100));
  const milestoneText = current >= 90 ? "90 DAYS CLEAN! 🎉🎉🎉 Schedule repeat semen analysis." : `Progress to ${next}-day milestone: ${pct}%`;
  document.getElementById("milestone-message").textContent = milestoneText;

  const start = new Date(CONFIG.startDate);
  const cells = [];
  for (let i = 0; i <= daysFromStart(); i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    const status = state.sobrietyLog[key];
    cells.push(`<div class="day-cell ${status === "clean" ? "day-clean" : status === "relapse" ? "day-relapse" : ""}" title="${key}"></div>`);
  }
  document.getElementById("sobriety-calendar").innerHTML = cells.join("");
}

function renderWorkout() {
  const schedule = CONFIG.workoutSchedule[dayName];
  const list = WORKOUTS[dayName];
  const daily = (state.workoutLog[isoToday] ??= {});
  document.getElementById("today-workout-summary").innerHTML = `<strong>${dayName}</strong> • ${schedule.type} (${schedule.location}, ${schedule.duration})`;
  document.getElementById("today-workout-list").innerHTML = list.map(([exercise, volume, rest], idx) => {
    const key = `${dayName}-${idx}`;
    const done = daily[key]?.done ? "checked" : "";
    const wt = daily[key]?.weight ?? "";
    return `<div class="workout-item"><label><input class="workout-check" data-key="${key}" type="checkbox" ${done}/> ${exercise}</label><br><small class="muted">${volume} • Rest ${rest}</small><input class="workout-weight" data-key="${key}" type="number" placeholder="Weight used" value="${wt}" /></div>`;
  }).join("");
  document.querySelectorAll(".workout-check").forEach((el) => el.addEventListener("change", (e) => {
    const key = e.target.dataset.key; daily[key] ??= {}; daily[key].done = e.target.checked; save(); renderProgressSummary();
  }));
  document.querySelectorAll(".workout-weight").forEach((el) => el.addEventListener("change", (e) => {
    const key = e.target.dataset.key; daily[key] ??= {}; daily[key].weight = Number(e.target.value || 0); save();
  }));
}

function renderMacros() {
  const macros = state.nutritionLog[isoToday] || { calories: 0, protein: 0, fat: 0, carbs: 0 };
  const highCarb = CONFIG.macroTargets.highCarbDays.includes(dayName);
  const carbsTarget = highCarb ? CONFIG.macroTargets.highCarbRange : CONFIG.macroTargets.carbs;
  document.getElementById("macro-progress").innerHTML = `
    <p class="${macroStatus(macros.calories, CONFIG.macroTargets.calories)}">Calories: ${macros.calories} / ${CONFIG.macroTargets.calories[0]}-${CONFIG.macroTargets.calories[1]}</p>
    <p class="${macroStatus(macros.protein, CONFIG.macroTargets.protein)}">Protein: ${macros.protein}g / ${CONFIG.macroTargets.protein[0]}-${CONFIG.macroTargets.protein[1]}</p>
    <p class="${macroStatus(macros.fat, CONFIG.macroTargets.fat)}">Fat: ${macros.fat}g / ${CONFIG.macroTargets.fat[0]}-${CONFIG.macroTargets.fat[1]}</p>
    <p class="${macroStatus(macros.carbs, carbsTarget)}">Carbs: ${macros.carbs}g / ${carbsTarget[0]}-${carbsTarget[1]}${highCarb ? " (high-carb day)" : ""}</p>
  `;
}

function renderSupplements() {
  const todaySupp = (state.supplements[isoToday] ??= {});
  document.getElementById("supplement-list").innerHTML = Object.entries(SUPPLEMENTS).map(([slot, list]) => {
    const rows = list.map((name) => {
      const id = `${slot}-${name}`;
      return `<label><input class="supp-check" type="checkbox" data-id="${id}" ${todaySupp[id] ? "checked" : ""}/> ${name}</label>`;
    }).join("<br>");
    return `<div class="panel-item"><strong>${slot.replace("_", " ")}</strong><br>${rows}</div>`;
  }).join("");
  document.querySelectorAll(".supp-check").forEach((el) => el.addEventListener("change", (e) => {
    todaySupp[e.target.dataset.id] = e.target.checked; save(); renderProgressSummary();
  }));
}

function renderMilestones() {
  document.getElementById("milestone-timeline").innerHTML = MILESTONES.map(([title, date, action]) => {
    const done = new Date(isoToday) >= new Date(date);
    return `<div class="milestone ${done ? "done" : ""}"><strong>${title}</strong><br><small>${date} — ${action}</small></div>`;
  }).join("");
}

function renderEquipment() {
  const all = [...EQUIPMENT.essential.map((x) => ({ ...x, tier: "essential" })), ...EQUIPMENT.optional.map((x) => ({ ...x, tier: "optional" }))];
  document.getElementById("equipment-list").innerHTML = all.map((it, idx) => {
    const key = `eq-${idx}`;
    const checked = state.equipment[key] ? "checked" : "";
    return `<div class="panel-item"><label><input class="equip-check" data-id="${key}" type="checkbox" ${checked}/> ${it.item} (${it.tier}) • $${it.budget[0]}-$${it.budget[1]}</label><div class="link-row">${it.links.map((l) => `<a target="_blank" href="${l}">Buy</a>`).join("")}</div></div>`;
  }).join("");
  document.querySelectorAll(".equip-check").forEach((el) => el.addEventListener("change", (e) => {
    state.equipment[e.target.dataset.id] = e.target.checked;
    save();
    renderEquipmentBudget();
  }));
  renderEquipmentBudget();
}

function renderEquipmentBudget() {
  const all = [...EQUIPMENT.essential, ...EQUIPMENT.optional];
  let min = 0; let max = 0;
  all.forEach((it, idx) => {
    if (state.equipment[`eq-${idx}`]) { min += it.budget[0]; max += it.budget[1]; }
  });
  document.getElementById("equipment-budget").textContent = `Selected budget: $${min} - $${max}. Target: $300-$500 essential, up to $750 with optional.`;
}

function renderKnowledge() {
  document.getElementById("knowledge-base").innerHTML = KNOWLEDGE.map(([title, body]) => `<div class="panel-item"><strong>${title}</strong><p>${body}</p></div>`).join("");
}

function renderPhotos() {
  document.getElementById("photo-gallery").innerHTML = state.photos.slice(-6).map((p) => `<img src="${p.data}" alt="progress ${p.date}" title="${p.date}"/>`).join("");
}

function renderProgressSummary() {
  const weekWorkouts = Object.entries(state.workoutLog).filter(([d]) => daysBetween(d, isoToday) >= 0 && daysBetween(d, isoToday) < 7);
  const doneDays = weekWorkouts.filter(([, v]) => Object.values(v).some((x) => x.done)).length;
  const todaySupp = state.supplements[isoToday] || {};
  const allSuppCount = Object.values(SUPPLEMENTS).flat().length;
  const suppDone = Object.values(todaySupp).filter(Boolean).length;
  const proteinDays = Object.values(state.nutritionLog).filter((n) => n.protein >= 180).length;
  const sw = state.metrics[0]?.weight;
  const cw = state.metrics.at(-1)?.weight;
  const gw = sw ? (sw - CONFIG.targetWeightLossKg).toFixed(1) : "-";

  document.getElementById("progress-summary").innerHTML = `
    <p><strong>Sobriety:</strong> ${daysFromStart()} days clean</p>
    <p><strong>Weight:</strong> ${sw ?? "-"}kg → ${cw ?? "-"}kg (goal ${gw}kg)</p>
    <p><strong>Workouts this week:</strong> ${doneDays}/7</p>
    <p><strong>Protein-target days:</strong> ${proteinDays}</p>
    <p><strong>Supplements today:</strong> ${suppDone}/${allSuppCount}</p>
    <p><strong>Next major milestone:</strong> ${Math.max(0, daysBetween(isoToday, CONFIG.sobriety90Date))} days to 90 days clean</p>
    <p><strong>Check-in day:</strong> ${state.settings.checkinDay}</p>
  `;
}

function renderQuote() {
  document.getElementById("quote-box").textContent = MOTIVATION[daysFromStart() % MOTIVATION.length];
}

function applySettings() {
  document.documentElement.setAttribute("data-theme", state.settings.theme);
  document.getElementById("weight-unit").value = state.settings.weightUnit;
  document.getElementById("waist-unit").value = state.settings.waistUnit;
  document.getElementById("theme-select").value = state.settings.theme;
  document.getElementById("checkin-day").value = state.settings.checkinDay;
  document.getElementById("meal-reminder").value = state.settings.mealReminder;
  document.getElementById("clean-reminder").value = state.settings.cleanReminder;
}

function exportAsJson() {
  const blob = new Blob([JSON.stringify({ config: CONFIG, state }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `karan-tracker-${isoToday}.json`;
  a.click();
}

function exportAsCsv() {
  const rows = [["date", "calories", "protein", "fat", "carbs"], ...Object.entries(state.nutritionLog).map(([d, m]) => [d, m.calories, m.protein, m.fat, m.carbs])];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `karan-nutrition-${isoToday}.csv`;
  a.click();
}

document.getElementById("clean-today-btn").addEventListener("click", () => { state.sobrietyLog[isoToday] = "clean"; save(); renderSobriety(); renderProgressSummary(); });
document.getElementById("relapse-btn").addEventListener("click", () => { state.sobrietyLog[isoToday] = "relapse"; save(); renderSobriety(); renderProgressSummary(); });

document.getElementById("macro-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const foodsToAvoid = ["alcohol", "thc", "processed", "sugary", "fast food", "pastries", "fried"];
  const notes = document.getElementById("meal-notes").value || "";
  const flag = foodsToAvoid.some((w) => notes.toLowerCase().includes(w));
  state.nutritionLog[isoToday] = { calories: Number(document.getElementById("calories").value), protein: Number(document.getElementById("protein").value), fat: Number(document.getElementById("fat").value), carbs: Number(document.getElementById("carbs").value), notes, flagged: flag };
  save();
  renderMacros(); renderDashboard(); renderProgressSummary();
  e.target.reset();
});

document.getElementById("metrics-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const row = { date: isoToday, weight: Number(document.getElementById("weight-input").value), waist: Number(document.getElementById("waist-input").value), bodyFat: document.getElementById("bodyfat-input").value ? Number(document.getElementById("bodyfat-input").value) : null };
  state.metrics.push(row);
  save();
  document.getElementById("body-metrics-summary").textContent = `Saved ${row.date}: ${row.weight}kg, waist ${row.waist}${state.settings.waistUnit}`;
  renderDashboard(); renderProgressSummary();
  e.target.reset();
});

document.getElementById("checkin-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.checkins.push({ date: isoToday, week: currentWeek(), mental: Number(document.getElementById("mental-state").value), energy: Number(document.getElementById("energy-level").value), sleepHours: Number(document.getElementById("sleep-hours").value), sleepQuality: Number(document.getElementById("sleep-quality").value), cravings: document.getElementById("cravings").value, wins: document.getElementById("wins").value, struggles: document.getElementById("struggles").value });
  save();
  alert(`Weekly check-in saved for week ${currentWeek()}.`);
  e.target.reset();
});

document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.settings = { weightUnit: document.getElementById("weight-unit").value, waistUnit: document.getElementById("waist-unit").value, theme: document.getElementById("theme-select").value, checkinDay: document.getElementById("checkin-day").value, mealReminder: document.getElementById("meal-reminder").value, cleanReminder: document.getElementById("clean-reminder").value };
  save();
  applySettings(); renderDashboard(); renderProgressSummary();
});

document.getElementById("save-photos-btn").addEventListener("click", async () => {
  const files = Array.from(document.getElementById("photo-upload").files || []);
  for (const file of files) {
    const data = await new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); });
    state.photos.push({ date: isoToday, data });
  }
  save();
  renderPhotos();
});

document.getElementById("export-json-btn").addEventListener("click", exportAsJson);
document.getElementById("export-csv-btn").addEventListener("click", exportAsCsv);
document.getElementById("reset-program-btn").addEventListener("click", () => {
  if (!confirm("Reset all tracker data?")) return;
  localStorage.removeItem(KEY);
  location.reload();
});

applySettings();
renderDashboard();
renderSobriety();
renderWorkout();
renderMacros();
renderSupplements();
renderMilestones();
renderEquipment();
renderKnowledge();
renderPhotos();
renderProgressSummary();
renderQuote();
