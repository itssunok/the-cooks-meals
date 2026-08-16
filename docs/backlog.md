# Meal Planner — Backlog

**Format:** `[status] Title — notes`
**Status values:** `open`, `in progress`, `done`

Prioritized MoSCoW-style. Evaluate new items against the product's PRD and locked personas (docs/prd.md) before adding them here.

---

## High Priority (Must)

- `[open]` Today view (home screen) — surface tonight's planned meal immediately on open, no navigation required; clear "not planned yet" state when there's a gap. Solves the core problem (PRD Story 1).
- `[open]` Meal rotation data model + screen — the household's list of go-to meals with ingredients, reusable across weeks (PRD Story 2, Solution Overview).
- `[open]` Weekly planner — week-at-a-glance grid, fill each day by picking from the rotation; add a new meal to the rotation when needed (PRD Story 2).
- `[open]` Pantry data model + screen — on-hand staples/ingredients with quantity and expiration date, low-stock and expired flags (PRD Story 3).
- `[open]` Grocery list generated from weekly plan minus pantry — auto-rolls up missing ingredients, manually editable (PRD Story 3).

---

## Medium Priority (Should)

- `[open]` Cat food recurring task — fixed recipe, recurring schedule, surfaced as its own task type distinct from human meals, visible from the today view (PRD Story 4).
- `[open]` Spend log — $ field when logging a grocery trip, $ field when marking a night "ordered out" instead of following the plan; viewable as a simple list/history, no dashboard (PRD Story 5).
- `[open]` Notifications bell/panel (mocked) — reminders for weekly planning not yet done, cat food prep day, and pantry low-stock/expiring items; static/simulated, no real push (PRD Story 6).

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
