const MEAL_CATEGORY_LABELS = {
  meat: "Meat",
  fish: "Fish",
  vegetarian: "Vegetarian",
  catFood: "Cat food",
};

const MEAL_CATEGORY_CLASSES = {
  meat: "meal-tag-meat",
  fish: "meal-tag-fish",
  vegetarian: "meal-tag-vegetarian",
  catFood: "meal-tag-catfood",
};

function renderMealCategoryTag(category, corner) {
  if (!category || !MEAL_CATEGORY_LABELS[category]) return "";
  const cornerClass = corner ? " meal-tag-corner" : "";
  return `<span class="chip-pill meal-tag${cornerClass} ${MEAL_CATEGORY_CLASSES[category]}">${MEAL_CATEGORY_LABELS[category]}</span>`;
}
