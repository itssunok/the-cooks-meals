# Meal Planner — Backlog

**Format:** `[status] Title — notes`
**Status values:** `open`, `in progress`, `done`

Prioritized MoSCoW-style. Evaluate new items against the product's PRD and locked personas (docs/prd.md) before adding them here.

---

## High Priority (Must)

All Must-tier items are built.

---

## Medium Priority (Should)

- `[open]` Notifications bell/panel (mocked) — reminders for weekly planning not yet done, cat food prep day, and pantry low-stock/expiring items; static/simulated, no real push (PRD Story 6).
- `[open]` Recipe detail side sheet — tapping any meal card or the cat food task (today view, weekly planner, rotation) opens a side sheet with full ingredients + step-by-step instructions; read-only, consistent across every screen a card appears on. Requires adding an `instructions` field to the meal/cat-food data models, which don't currently have one (PRD Story 7).

---

## Low Priority (Could)

- `[open]` Pantry low-stock/expiring quick-glance summary on the today view (surfacing pantry flags without requiring a separate visit to the pantry screen).
- `[open]` Mark a planned day as "ordered out instead" directly from the today view (feeds the spend log without extra navigation).

---

## Won't This Round (deferred, not dropped)

- `[deferred]` General household chores (cleaning, bills, errands) — explicit non-goal, out of scope entirely (PRD Non-Goals).
- `[deferred]` Recipe discovery / recommendation engine — the rotation already exists; the gap is durability/visibility, not sourcing new ideas (PRD Non-Goals).
- `[deferred]` Nutrition/macro tracking — not a fitness/health tool (PRD Non-Goals).
- `[deferred]` Full budgeting dashboard (totals, trend charts, category breakdowns) — spend tracking stays lightweight logging only (PRD Non-Goals).
- `[deferred]` Multi-household / shared-outside-the-couple accounts — not needed for a two-person household (PRD Non-Goals).
- `[deferred]` Real backend, auth, or accounts — frontend-only prototype per repo's prototype philosophy (PRD Non-Goals).
