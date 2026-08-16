/**
 * On-hand staples/ingredients. This is what the grocery list is generated
 * *against* — the source of truth for "do we already have this," and for
 * flagging items that are running low or past their expiration date.
 *
 * @typedef {Object} PantryItem
 * @property {string} id                Stable id.
 * @property {string} name              Display name.
 * @property {number} quantity          Amount currently on hand, in `unit`.
 * @property {string} unit              Unit for quantity/lowStockThreshold (e.g. "bottle", "cans", "cloves"); empty string if just a count.
 * @property {number} lowStockThreshold At-or-below this quantity, the item is flagged as running low.
 * @property {string|null} expirationDate  ISO date string ("YYYY-MM-DD"), or null for items that don't meaningfully expire.
 *
 * @type {PantryItem[]}
 */
const PANTRY_ITEMS = [
  { id: "olive-oil", name: "Olive oil", quantity: 1, unit: "bottle", lowStockThreshold: 0, expirationDate: "2027-06-01" },
  { id: "garlic", name: "Garlic", quantity: 2, unit: "bulbs", lowStockThreshold: 1, expirationDate: "2026-08-30" },
  { id: "parmesan", name: "Parmesan", quantity: 0, unit: "block", lowStockThreshold: 1, expirationDate: "2026-08-20" },
  { id: "kidney-beans", name: "Kidney beans", quantity: 3, unit: "cans", lowStockThreshold: 1, expirationDate: "2028-01-01" },
  { id: "jasmine-rice", name: "Jasmine rice", quantity: 1, unit: "bag", lowStockThreshold: 0, expirationDate: "2027-01-01" },
  { id: "soy-sauce", name: "Soy sauce", quantity: 1, unit: "bottle", lowStockThreshold: 0, expirationDate: "2026-12-01" },
  { id: "chicken-broth", name: "Chicken broth", quantity: 0, unit: "cartons", lowStockThreshold: 2, expirationDate: "2027-03-01" },
  { id: "yellow-onions", name: "Yellow onions", quantity: 4, unit: "", lowStockThreshold: 2, expirationDate: "2026-08-25" },
  { id: "butter", name: "Butter", quantity: 1, unit: "stick pack", lowStockThreshold: 1, expirationDate: "2026-08-10" },
  { id: "fresh-thyme", name: "Fresh thyme", quantity: 1, unit: "bunch", lowStockThreshold: 1, expirationDate: "2026-08-14" },
  { id: "avocado", name: "Avocado", quantity: 2, unit: "", lowStockThreshold: 2, expirationDate: "2026-08-18" },
  { id: "black-beans", name: "Black beans", quantity: 2, unit: "cans", lowStockThreshold: 1, expirationDate: "2028-01-01" },
];
