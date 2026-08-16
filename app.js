const WEEKDAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getTodayKey() {
  return WEEKDAY_NAMES[new Date().getDay()];
}

function getMealById(id) {
  return MEALS.find((meal) => meal.id === id) || null;
}

function renderIngredientChips(ingredients) {
  return ingredients
    .map((ingredient) => `<span class="chip-pill ingredient-chip">${ingredient.name}</span>`)
    .join("");
}

function renderTodayMealCard() {
  const todayKey = getTodayKey();
  const mealId = WEEKLY_PLAN[todayKey];
  const meal = mealId ? getMealById(mealId) : null;

  if (!meal) {
    return `
      <div class="card meal-card-empty">
        <p class="meal-card-empty-title">No dinner planned for tonight yet.</p>
        <p class="text-muted text-sm">This is the gap that turns into takeout — plan the week to fill it in.</p>
        <button type="button" class="btn btn-secondary" disabled title="Weekly planner — coming next">Plan the week</button>
      </div>
    `;
  }

  return `
    <div class="card meal-card">
      <div class="flex-row-between">
        <h2 class="title-h2">${meal.name}</h2>
        <span class="chip-pill meal-card-time">${meal.prepTime}</span>
      </div>
      <div class="ingredient-list">${renderIngredientChips(meal.ingredients)}</div>
    </div>
  `;
}

function renderCatFoodSection() {
  const todayKey = getTodayKey();
  const section = document.getElementById("cat-food-section");
  const card = document.getElementById("cat-food-card");

  if (todayKey !== CAT_FOOD_TASK.dueDayOfWeek) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  card.innerHTML = `
    <div class="card cat-food-card">
      <span class="chip-pill cat-food-tag">Cat food</span>
      <h3 class="title-h3">${CAT_FOOD_TASK.recipeName}</h3>
      <p class="text-muted text-sm">Yields ${CAT_FOOD_TASK.batchYield}</p>
      <div class="ingredient-list">${renderIngredientChips(CAT_FOOD_TASK.ingredients)}</div>
    </div>
  `;
}

function renderTodayDate() {
  const today = new Date();
  const formatted = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  document.getElementById("today-date").textContent = formatted;
}

function init() {
  renderTodayDate();
  document.getElementById("today-meal-card").innerHTML = renderTodayMealCard();
  renderCatFoodSection();
}

init();
