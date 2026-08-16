function getMealById(id) {
  return getRotation().find((meal) => meal.id === id) || null;
}

function renderIngredientChips(ingredients) {
  return ingredients
    .map((ingredient) => `<span class="chip-pill ingredient-chip">${ingredient.name}</span>`)
    .join("");
}

function renderTodayMealCard() {
  const todayKey = getTodayKey();
  const mealId = getWeeklyPlan()[todayKey];
  const meal = mealId ? getMealById(mealId) : null;

  if (!meal) {
    return `
      <div class="card meal-card-empty">
        <p class="meal-card-empty-title">No dinner planned for tonight yet.</p>
        <p class="text-muted text-sm">This is the gap that turns into takeout — plan the week to fill it in.</p>
        <a href="./pages/weekly.html" class="btn btn-secondary">Plan the week</a>
      </div>
    `;
  }

  return `
    <div class="card meal-card recipe-openable" data-recipe-type="meal" data-recipe-id="${meal.id}">
      ${renderMealCategoryTag(meal.category, true)}
      <h2 class="title-h2">${meal.name}</h2>
      <p class="text-muted text-sm meal-card-preptime">${meal.prepTime}</p>
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
    <div class="card meal-card recipe-openable" data-recipe-type="catfood">
      ${renderMealCategoryTag("catFood", true)}
      <h2 class="title-h2">${CAT_FOOD_TASK.recipeName}</h2>
      <p class="text-muted text-sm meal-card-preptime">Yields ${CAT_FOOD_TASK.batchYield}</p>
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
