const WEEK_DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const WEEK_DAY_LABELS = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function getMealById(id) {
  return getRotation().find((meal) => meal.id === id) || null;
}

function renderMealOptions(selectedMealId) {
  const notPlannedOption = `<option value=""${selectedMealId ? "" : " selected"}>Not planned</option>`;
  const mealOptions = getRotation().map((meal) => {
    const selected = meal.id === selectedMealId ? " selected" : "";
    return `<option value="${meal.id}"${selected}>${meal.name}</option>`;
  }).join("");
  return notPlannedOption + mealOptions;
}

function renderDayRow(dayKey, plan) {
  const mealId = plan[dayKey];
  const meal = mealId ? getMealById(mealId) : null;

  const mealLabel = meal
    ? `<span class="week-day-meal">${meal.name}</span>`
    : `<span class="week-day-meal text-muted">Not planned yet</span>`;

  return `
    <div class="card week-day-row">
      <p class="week-day-label">
        <span class="week-day-name">${WEEK_DAY_LABELS[dayKey]}</span>
        <span class="week-day-sep text-muted">—</span>
        ${mealLabel}
      </p>
      <select class="form-input week-day-select" data-day="${dayKey}">
        ${renderMealOptions(mealId)}
      </select>
    </div>
  `;
}

function renderWeek() {
  const plan = getWeeklyPlan();
  const list = document.getElementById("week-list");
  list.innerHTML = WEEK_DAY_ORDER.map((dayKey) => renderDayRow(dayKey, plan)).join("");

  list.querySelectorAll(".week-day-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      setDayMeal(event.target.dataset.day, event.target.value);
      renderWeek();
    });
  });
}

renderWeek();
