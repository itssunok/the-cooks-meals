const CUSTOM_MEALS_KEY = "mealPlanner.customMeals";

function loadCustomMeals() {
  try {
    const raw = localStorage.getItem(CUSTOM_MEALS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveCustomMeals(meals) {
  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(meals));
}

function getRotation() {
  return MEALS.concat(loadCustomMeals());
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseIngredientLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, quantity, unit] = line.split(",").map((part) => (part || "").trim());
      return { name: name || line, quantity: quantity || "", unit: unit || "" };
    });
}

function addMealToRotation({ name, prepTime, ingredientsText }) {
  const customMeals = loadCustomMeals();
  const meal = {
    id: slugify(name) || `meal-${Date.now()}`,
    name,
    prepTime: prepTime || "—",
    ingredients: parseIngredientLines(ingredientsText),
  };
  customMeals.push(meal);
  saveCustomMeals(customMeals);
  return meal;
}
