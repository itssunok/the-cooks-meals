function renderIngredientChipsForSheet(ingredients) {
  return ingredients
    .map((ingredient) => `<span class="chip-pill ingredient-chip">${ingredient.name}</span>`)
    .join("");
}

function renderInstructionSteps(instructions) {
  if (!instructions || instructions.length === 0) {
    return `<p class="text-muted text-sm">No instructions recorded yet.</p>`;
  }
  return `<ol class="recipe-instructions">${instructions.map((step) => `<li>${step}</li>`).join("")}</ol>`;
}

function openRecipeSheet(recipe) {
  const overlay = document.getElementById("recipe-overlay");
  const panel = document.getElementById("recipe-panel");
  const title = document.getElementById("recipe-panel-title");
  const body = document.getElementById("recipe-panel-body");

  title.textContent = recipe.name;

  const metaParts = [];
  if (recipe.prepTime) metaParts.push(`<span class="text-muted text-sm">${recipe.prepTime}</span>`);
  if (recipe.category) metaParts.push(renderMealCategoryTag(recipe.category));

  body.innerHTML = `
    <div class="recipe-sheet-meta">${metaParts.join("")}</div>
    <h3 class="label-eyebrow text-sm recipe-sheet-section-title">Ingredients</h3>
    <div class="ingredient-list">${renderIngredientChipsForSheet(recipe.ingredients)}</div>
    <h3 class="label-eyebrow text-sm recipe-sheet-section-title">Instructions</h3>
    ${renderInstructionSteps(recipe.instructions)}
  `;

  panel.hidden = false;
  overlay.hidden = false;
}

function closeRecipeSheet() {
  document.getElementById("recipe-panel").hidden = true;
  document.getElementById("recipe-overlay").hidden = true;
}

function getRecipeFromElement(element) {
  const type = element.dataset.recipeType;
  const id = element.dataset.recipeId;

  if (type === "meal") {
    return getRotation().find((meal) => meal.id === id) || null;
  }

  if (type === "catfood") {
    return {
      name: CAT_FOOD_TASK.recipeName,
      prepTime: `Yields ${CAT_FOOD_TASK.batchYield}`,
      category: "catFood",
      ingredients: CAT_FOOD_TASK.ingredients,
      instructions: CAT_FOOD_TASK.instructions,
    };
  }

  return null;
}

function initRecipeSheet() {
  document.getElementById("recipe-close-btn").addEventListener("click", closeRecipeSheet);
  document.getElementById("recipe-overlay").addEventListener("click", closeRecipeSheet);

  document.addEventListener("click", (event) => {
    if (event.target.closest("select, button, a, input, label")) return;
    const openable = event.target.closest("[data-recipe-type]");
    if (!openable) return;
    const recipe = getRecipeFromElement(openable);
    if (recipe) openRecipeSheet(recipe);
  });
}

initRecipeSheet();
