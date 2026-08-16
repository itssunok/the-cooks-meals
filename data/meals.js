/**
 * The household's meal rotation — the go-to dinners picked from when filling
 * out the weekly plan. This is the primary source of "what could tonight be,"
 * not a recipe-discovery catalog: new entries are added rarely and low-effort.
 *
 * @typedef {Object} Ingredient
 * @property {string} name      Ingredient name.
 * @property {string} quantity  Amount needed, as a display string (e.g. "2", "1.5 lb").
 * @property {string} unit      Unit for the quantity (e.g. "lb", "cans", "cloves"); empty string if not applicable.
 *
 * @typedef {Object} Meal
 * @property {string} id            Stable id, referenced from weeklyPlan.js as a foreign key.
 * @property {string} name          Display name shown in the UI.
 * @property {string} prepTime      Rough hands-on time, as a display string (e.g. "25 min").
 * @property {Ingredient[]} ingredients  What the grocery list is built from.
 *
 * @type {Meal[]}
 */
const MEALS = [
  {
    id: "turkey-chili",
    name: "Turkey Chili",
    prepTime: "35 min",
    ingredients: [
      { name: "Ground turkey", quantity: "1", unit: "lb" },
      { name: "Kidney beans", quantity: "2", unit: "cans" },
      { name: "Diced tomatoes", quantity: "1", unit: "can" },
      { name: "Yellow onion", quantity: "1", unit: "" },
      { name: "Chili powder", quantity: "2", unit: "tbsp" },
    ],
  },
  {
    id: "sheet-pan-salmon",
    name: "Sheet-Pan Salmon & Veggies",
    prepTime: "30 min",
    ingredients: [
      { name: "Salmon fillets", quantity: "2", unit: "" },
      { name: "Broccoli", quantity: "1", unit: "head" },
      { name: "Baby potatoes", quantity: "1", unit: "lb" },
      { name: "Lemon", quantity: "1", unit: "" },
      { name: "Olive oil", quantity: "2", unit: "tbsp" },
    ],
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir-Fry",
    prepTime: "25 min",
    ingredients: [
      { name: "Chicken breast", quantity: "1", unit: "lb" },
      { name: "Bell peppers", quantity: "2", unit: "" },
      { name: "Snap peas", quantity: "1", unit: "cup" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Jasmine rice", quantity: "1.5", unit: "cups" },
    ],
  },
  {
    id: "aglio-e-olio",
    name: "Spaghetti Aglio e Olio",
    prepTime: "20 min",
    ingredients: [
      { name: "Spaghetti", quantity: "12", unit: "oz" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Red pepper flakes", quantity: "1", unit: "tsp" },
      { name: "Parmesan", quantity: "0.5", unit: "cup" },
      { name: "Olive oil", quantity: "0.33", unit: "cup" },
    ],
  },
  {
    id: "black-bean-tacos",
    name: "Black Bean Tacos",
    prepTime: "20 min",
    ingredients: [
      { name: "Black beans", quantity: "2", unit: "cans" },
      { name: "Corn tortillas", quantity: "8", unit: "" },
      { name: "Avocado", quantity: "2", unit: "" },
      { name: "Lime", quantity: "2", unit: "" },
      { name: "Cotija cheese", quantity: "1", unit: "cup" },
    ],
  },
  {
    id: "roast-chicken",
    name: "Roast Chicken & Potatoes",
    prepTime: "1 hr 15 min",
    ingredients: [
      { name: "Whole chicken", quantity: "1", unit: "" },
      { name: "Yukon gold potatoes", quantity: "2", unit: "lb" },
      { name: "Carrots", quantity: "4", unit: "" },
      { name: "Fresh thyme", quantity: "4", unit: "sprigs" },
      { name: "Butter", quantity: "3", unit: "tbsp" },
    ],
  },
];
