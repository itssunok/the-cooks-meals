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
 * @property {"meat"|"fish"|"vegetarian"} category  What the meal is built around — drives the colored tag shown in the UI.
 * @property {Ingredient[]} ingredients  What the grocery list is built from.
 * @property {string[]} instructions  Step-by-step prep instructions, shown in the recipe detail sheet.
 *
 * @type {Meal[]}
 */
const MEALS = [
  {
    id: "turkey-chili",
    name: "Turkey Chili",
    prepTime: "35 min",
    category: "meat",
    ingredients: [
      { name: "Ground turkey", quantity: "1", unit: "lb" },
      { name: "Kidney beans", quantity: "2", unit: "cans" },
      { name: "Diced tomatoes", quantity: "1", unit: "can" },
      { name: "Yellow onion", quantity: "1", unit: "" },
      { name: "Chili powder", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Dice the onion and brown it with the ground turkey in a large pot over medium-high heat.",
      "Stir in the chili powder and cook for 1 minute until fragrant.",
      "Add the diced tomatoes and kidney beans, including their liquid.",
      "Simmer uncovered for 20 minutes, stirring occasionally, until thickened.",
      "Season with salt to taste and serve.",
    ],
  },
  {
    id: "sheet-pan-salmon",
    name: "Sheet-Pan Salmon & Veggies",
    prepTime: "30 min",
    category: "fish",
    ingredients: [
      { name: "Salmon fillets", quantity: "2", unit: "" },
      { name: "Broccoli", quantity: "1", unit: "head" },
      { name: "Baby potatoes", quantity: "1", unit: "lb" },
      { name: "Lemon", quantity: "1", unit: "" },
      { name: "Olive oil", quantity: "2", unit: "tbsp" },
    ],
    instructions: [
      "Preheat the oven to 425°F (220°C).",
      "Halve the baby potatoes and toss with half the olive oil on a sheet pan; roast 15 minutes.",
      "Cut the broccoli into florets and add to the pan along with the salmon fillets.",
      "Drizzle everything with the remaining olive oil, season with salt and pepper.",
      "Roast for 12–15 minutes until the salmon flakes easily.",
      "Squeeze fresh lemon over everything before serving.",
    ],
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir-Fry",
    prepTime: "25 min",
    category: "meat",
    ingredients: [
      { name: "Chicken breast", quantity: "1", unit: "lb" },
      { name: "Bell peppers", quantity: "2", unit: "" },
      { name: "Snap peas", quantity: "1", unit: "cup" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Jasmine rice", quantity: "1.5", unit: "cups" },
    ],
    instructions: [
      "Cook the jasmine rice according to package instructions.",
      "Slice the chicken breast into thin strips and slice the bell peppers.",
      "Heat oil in a wok or large skillet over high heat; stir-fry the chicken until cooked through, about 5 minutes.",
      "Add the bell peppers and snap peas, stir-frying for another 3–4 minutes.",
      "Pour in the soy sauce, toss to coat, and serve over the rice.",
    ],
  },
  {
    id: "aglio-e-olio",
    name: "Spaghetti Aglio e Olio",
    prepTime: "20 min",
    category: "vegetarian",
    ingredients: [
      { name: "Spaghetti", quantity: "12", unit: "oz" },
      { name: "Garlic", quantity: "6", unit: "cloves" },
      { name: "Red pepper flakes", quantity: "1", unit: "tsp" },
      { name: "Parmesan", quantity: "0.5", unit: "cup" },
      { name: "Olive oil", quantity: "0.33", unit: "cup" },
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook the spaghetti until al dente.",
      "While the pasta cooks, thinly slice the garlic.",
      "Heat the olive oil in a large skillet over medium-low heat; add the garlic and red pepper flakes, cooking gently until the garlic is golden (not browned).",
      "Reserve a cup of pasta water, then drain the spaghetti and add it to the skillet.",
      "Toss over heat, adding splashes of pasta water as needed to loosen the sauce.",
      "Remove from heat, stir in the parmesan, and serve immediately.",
    ],
  },
  {
    id: "black-bean-tacos",
    name: "Black Bean Tacos",
    prepTime: "20 min",
    category: "vegetarian",
    ingredients: [
      { name: "Black beans", quantity: "2", unit: "cans" },
      { name: "Corn tortillas", quantity: "8", unit: "" },
      { name: "Avocado", quantity: "2", unit: "" },
      { name: "Lime", quantity: "2", unit: "" },
      { name: "Cotija cheese", quantity: "1", unit: "cup" },
    ],
    instructions: [
      "Drain and rinse the black beans, then warm them in a saucepan with a splash of water.",
      "Lightly mash about a third of the beans for a creamier texture.",
      "Warm the tortillas in a dry skillet or directly over a flame.",
      "Slice the avocado and cut the limes into wedges.",
      "Assemble the tacos with beans, avocado, and crumbled cotija; finish with a squeeze of lime.",
    ],
  },
  {
    id: "roast-chicken",
    name: "Roast Chicken & Potatoes",
    prepTime: "1 hr 15 min",
    category: "meat",
    ingredients: [
      { name: "Whole chicken", quantity: "1", unit: "" },
      { name: "Yukon gold potatoes", quantity: "2", unit: "lb" },
      { name: "Carrots", quantity: "4", unit: "" },
      { name: "Fresh thyme", quantity: "4", unit: "sprigs" },
      { name: "Butter", quantity: "3", unit: "tbsp" },
    ],
    instructions: [
      "Preheat the oven to 425°F (220°C).",
      "Pat the chicken dry, rub with softened butter, and season generously inside and out with salt and pepper.",
      "Stuff the cavity with the thyme sprigs.",
      "Quarter the potatoes and carrots and arrange them around the chicken in a roasting pan.",
      "Roast for about 1 hour 15 minutes, until the internal temperature reaches 165°F (74°C).",
      "Let the chicken rest for 10 minutes before carving.",
    ],
  },
];
