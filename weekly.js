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
  return MEALS.find((meal) => meal.id === id) || null;
}

function renderMealOptions(selectedMealId) {
  const notPlannedOption = `<option value=""${selectedMealId ? "" : " selected"}>Not planned</option>`;
  const mealOptions = MEALS.map((meal) => {
    const selected = meal.id === selectedMealId ? " selected" : "";
    return `<option value="${meal.id}"${selected}>${meal.name}</option>`;
  }).join("");
  return notPlannedOption + mealOptions;
}

function renderDayRow(dayKey, plan) {
  const mealId = plan[dayKey];
  const meal = mealId ? getMealById(mealId) : null;

  const infoMarkup = meal
    ? `<span class="title-h3">${meal.name}</span><span class="text-muted text-sm">${meal.prepTime}</span>`
    : `<span class="text-muted text-sm">Not planned yet</span>`;

  return `
    <div class="card week-day-row">
      <div class="week-day-row-info">
        <span class="label-eyebrow text-2xs">${WEEK_DAY_LABELS[dayKey]}</span>
        ${infoMarkup}
      </div>
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
