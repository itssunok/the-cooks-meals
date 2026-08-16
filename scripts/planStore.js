const PLAN_OVERRIDES_KEY = "mealPlanner.weeklyPlanOverrides";

function loadPlanOverrides() {
  try {
    const raw = localStorage.getItem(PLAN_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function savePlanOverrides(overrides) {
  localStorage.setItem(PLAN_OVERRIDES_KEY, JSON.stringify(overrides));
}

function getWeeklyPlan() {
  return Object.assign({}, WEEKLY_PLAN, loadPlanOverrides());
}

function setDayMeal(dayKey, mealId) {
  const overrides = loadPlanOverrides();
  overrides[dayKey] = mealId || null;
  savePlanOverrides(overrides);
}
