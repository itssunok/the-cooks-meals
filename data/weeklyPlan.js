/**
 * This week's assignment of rotation meals to days. Keyed by lowercase
 * weekday name rather than an absolute date, so the mock data stays valid
 * regardless of when the prototype is viewed. A `null` value represents a
 * day that hasn't been planned yet — the exact gap the today view exists to
 * surface, rather than silently leaving takeout/frozen pizza to fill in.
 *
 * @typedef {Object.<string, string|null>} WeeklyPlan
 * Keys: "monday" through "sunday". Values: a Meal id from meals.js, or null if unplanned.
 *
 * @type {WeeklyPlan}
 */
const WEEKLY_PLAN = {
  monday: "turkey-chili",
  tuesday: "chicken-stir-fry",
  wednesday: "aglio-e-olio",
  thursday: null,
  friday: "black-bean-tacos",
  saturday: "roast-chicken",
  sunday: "sheet-pan-salmon",
};
