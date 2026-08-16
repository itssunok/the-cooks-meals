function renderIngredientChips(ingredients) {
  return ingredients
    .map((ingredient) => `<span class="chip-pill ingredient-chip">${ingredient.name}</span>`)
    .join("");
}

function renderMealCard(meal) {
  return `
    <div class="card meal-card">
      ${renderMealCategoryTag(meal.category, true)}
      <h2 class="title-h3">${meal.name}</h2>
      <p class="text-muted text-sm meal-card-preptime">${meal.prepTime}</p>
      <div class="ingredient-list">${renderIngredientChips(meal.ingredients)}</div>
    </div>
  `;
}

function renderRotation() {
  const list = document.getElementById("rotation-list");
  list.innerHTML = getRotation().map(renderMealCard).join("");
}

function handleAddMealSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.elements.name.value.trim();
  if (!name) return;

  addMealToRotation({
    name,
    prepTime: form.elements.prepTime.value.trim(),
    category: form.elements.category.value,
    ingredientsText: form.elements.ingredients.value,
  });

  form.reset();
  renderRotation();
}

document.getElementById("add-meal-form").addEventListener("submit", handleAddMealSubmit);
renderRotation();
