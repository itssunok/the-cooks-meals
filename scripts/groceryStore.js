const GROCERY_CHECKED_KEY = "mealPlanner.grocery.checked";
const GROCERY_DISMISSED_KEY = "mealPlanner.grocery.dismissed";
const GROCERY_CUSTOM_KEY = "mealPlanner.grocery.customItems";

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugifyIngredientName(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getPantryStatusByName() {
  const statusByName = {};
  getPantry().forEach((item) => {
    statusByName[item.name.toLowerCase().trim()] = getPrimaryStatus(item);
  });
  return statusByName;
}

// Groups every ingredient across the week's planned meals by name, then
// drops anything the pantry already has in sufficient, non-expired
// quantity (pantry status "ok") — what's left is what's actually missing.
function getAutoGroceryItems() {
  const plan = getWeeklyPlan();
  const pantryStatusByName = getPantryStatusByName();
  const grouped = {};

  Object.keys(plan).forEach((dayKey) => {
    const mealId = plan[dayKey];
    if (!mealId) return;
    const meal = getRotation().find((m) => m.id === mealId);
    if (!meal) return;

    meal.ingredients.forEach((ingredient) => {
      const key = slugifyIngredientName(ingredient.name);
      if (!grouped[key]) {
        grouped[key] = { key, name: ingredient.name, quantities: [], meals: [] };
      }
      const quantityDisplay = [ingredient.quantity, ingredient.unit].filter(Boolean).join(" ");
      if (quantityDisplay) grouped[key].quantities.push(quantityDisplay);
      if (!grouped[key].meals.includes(meal.name)) grouped[key].meals.push(meal.name);
    });
  });

  const dismissed = new Set(loadJSON(GROCERY_DISMISSED_KEY, []));

  return Object.values(grouped)
    .filter((item) => pantryStatusByName[item.name.toLowerCase().trim()] !== "ok")
    .filter((item) => !dismissed.has(item.key))
    .map((item) => ({
      id: "auto:" + item.key,
      name: item.name,
      quantityDisplay: item.quantities.join(" + "),
      meals: item.meals,
    }));
}

function getCustomItems() {
  return loadJSON(GROCERY_CUSTOM_KEY, []).map((item) => ({
    id: "custom:" + item.id,
    name: item.name,
    quantityDisplay: "",
    meals: [],
  }));
}

function addCustomGroceryItem(name) {
  const items = loadJSON(GROCERY_CUSTOM_KEY, []);
  items.push({ id: `${Date.now()}`, name });
  saveJSON(GROCERY_CUSTOM_KEY, items);
}

function dismissGroceryItem(id) {
  if (id.startsWith("auto:")) {
    const key = id.slice("auto:".length);
    const dismissed = loadJSON(GROCERY_DISMISSED_KEY, []);
    if (!dismissed.includes(key)) {
      dismissed.push(key);
      saveJSON(GROCERY_DISMISSED_KEY, dismissed);
    }
  } else if (id.startsWith("custom:")) {
    const customId = id.slice("custom:".length);
    const items = loadJSON(GROCERY_CUSTOM_KEY, []).filter((item) => item.id !== customId);
    saveJSON(GROCERY_CUSTOM_KEY, items);
  }
}

function isGroceryItemChecked(id) {
  return loadJSON(GROCERY_CHECKED_KEY, []).includes(id);
}

function toggleGroceryItemChecked(id) {
  const checked = loadJSON(GROCERY_CHECKED_KEY, []);
  const index = checked.indexOf(id);
  if (index === -1) checked.push(id);
  else checked.splice(index, 1);
  saveJSON(GROCERY_CHECKED_KEY, checked);
}

function getGroceryList() {
  const items = getAutoGroceryItems().concat(getCustomItems());
  return items
    .map((item) => Object.assign({}, item, { checked: isGroceryItemChecked(item.id) }))
    .sort((a, b) => Number(a.checked) - Number(b.checked));
}
