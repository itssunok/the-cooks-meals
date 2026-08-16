function renderIngredientChips(ingredients) {
  return ingredients
    .map((ingredient) => `<span class="chip-pill ingredient-chip">${ingredient.name}</span>`)
    .join("");
}

function renderMealCard(meal) {
  return `
    <div class="card meal-card">
      <div class="flex-row-between">
        <h2 class="title-h3">${meal.name}</h2>
        <span class="chip-pill meal-card-time">${meal.prepTime}</span>
      </div>
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
    ingredientsText: form.elements.ingredients.value,
  });

  form.reset();
  renderRotation();
}

document.getElementById("add-meal-form").addEventListener("submit", handleAddMealSubmit);
renderRotation();
