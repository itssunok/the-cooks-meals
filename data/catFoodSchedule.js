/**
 * The cat's homemade food — a fixed recipe, batch-cooked on a recurring
 * cadence. Deliberately separate from meals.js: this isn't a choice made
 * per-week like a human dinner, it's a standing recurring task.
 *
 * @typedef {Object} CatFoodTask
 * @property {string} recipeName        Display name of the batch recipe.
 * @property {string} dueDayOfWeek       Lowercase weekday name this batch is due, e.g. "sunday".
 * @property {string} batchYield         What one batch produces, as a display string (e.g. "1 week of meals").
 * @property {Ingredient[]} ingredients  Same shape as meals.js Ingredient — what the batch requires.
 *
 * @type {CatFoodTask}
 */
const CAT_FOOD_TASK = {
  recipeName: "Chicken & Pumpkin Cat Food",
  dueDayOfWeek: "sunday",
  batchYield: "1 week of meals",
  ingredients: [
    { name: "Chicken thighs", quantity: "2", unit: "lb" },
    { name: "Chicken liver", quantity: "4", unit: "oz" },
    { name: "Pumpkin puree", quantity: "0.5", unit: "cup" },
    { name: "Fish oil", quantity: "1", unit: "tsp" },
    { name: "Taurine supplement", quantity: "1", unit: "tsp" },
  ],
};
