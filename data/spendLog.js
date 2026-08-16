/**
 * Lightweight spend history — enough to see whether having a plan is
 * actually reducing takeout/delivery spend over time. Not a budgeting
 * tool: just a log of two moments, logged manually, with no automatic
 * totals beyond a simple current-month rollup.
 *
 * @typedef {Object} SpendEntry
 * @property {string} id                 Stable id.
 * @property {"grocery"|"orderedOut"} type  What the spend was for.
 * @property {number} amount             Dollar amount.
 * @property {string} date               ISO date string ("YYYY-MM-DD").
 *
 * @type {SpendEntry[]}
 */
const SPEND_LOG = [
  { id: "seed-1", type: "grocery", amount: 86.42, date: "2026-07-19" },
  { id: "seed-2", type: "orderedOut", amount: 34.5, date: "2026-07-22" },
  { id: "seed-3", type: "grocery", amount: 102.1, date: "2026-07-26" },
  { id: "seed-4", type: "orderedOut", amount: 28, date: "2026-08-02" },
  { id: "seed-5", type: "grocery", amount: 91.75, date: "2026-08-09" },
  { id: "seed-6", type: "orderedOut", amount: 41.2, date: "2026-08-12" },
];
