# PRD: Meal Planner

**Status:** Draft
**Author:** Sun Ok
**Last Updated:** 2026-08-16
**Version:** 0.1
**Stakeholders:** Household of two (primary users), design/eng (self)

---

## 1. Vision & Strategic Rationale

A household of two defaults to takeout or frozen pizza whenever a meal plan doesn't already exist by the time dinner rolls around. Meal Planner exists to make a plan exist by default, cheaply enough that it beats no-plan as the path of least resistance. If it isn't built, the couple keeps falling back to ordering out — not from a lack of cooking ability or ideas, but because nothing surfaces a decided answer at the moment the decision has to be made.

---

## 2. Problem Statement

One partner has ADHD, which makes forward-planning specifically (not cooking, not decision-making in general) the point of failure — the weekly "what are we eating this week" session is easy to skip or forget, and once it's skipped, "what's for dinner tonight" has no answer, so takeout wins by default. Separately, the household already maintains an informal rotation of go-to meals and buys/cooks a fixed batch of homemade cat food on a recurring basis — none of this is currently tracked anywhere, so grocery shopping doesn't account for what's already at home, staples run out or expire unnoticed, and the cat food prep depends on someone remembering it independently of the meal plan.

**Evidence:**
- Household-reported behavior: no existing plan → default to frozen pizza / delivery, observed as the recurring failure pattern this product is meant to interrupt.
- Household-reported behavior: a stable rotation of meals already exists informally; the gap is not menu ideas, it's making the plan visible and durable enough to survive ADHD-related forgetting.
- Household-reported behavior: grocery shopping currently doesn't account for pantry stock, leading to over-buying or missing already-expired items.

---

## 3. Goals & Success Metrics

Since this is a two-person household prototype rather than a metered product, "success metrics" are framed as observable household outcomes rather than analytics.

| Goal | Metric | Current Baseline | Target | Measurement Window |
|------|--------|-------------------|--------|---------------------|
| Cut takeout/delivery spend | Monthly $ spent on takeout/delivery/frozen-pizza fallback | Unmeasured, but the default whenever no plan exists | Meaningfully lower — a plan existing should displace most fallback spend | Month-over-month, self-reported |
| Cut wasted grocery spend | Monthly $ spent on groceries that go unused/expired or duplicate pantry stock | Unmeasured, no pantry-awareness today | Meaningfully lower — pantry-aware list should stop buying what's already on hand | Month-over-month, self-reported |
| Reduce fallback takeout/frozen pizza nights | Nights per week without a pre-existing plan | Frequent (unmeasured) | Rare — plan exists by default most nights | Ongoing, self-reported |
| Make "what's for dinner tonight" answerable instantly | Time/steps to see tonight's plan | N/A (no tool today) | One glance, no digging | At launch |
| Grocery list reflects what's actually needed | Manual cross-checking against pantry before shopping | Always required today | Rarely required — list already accounts for pantry | At launch |
| Cat food prep doesn't get missed | Missed batches | Unmeasured, relies on memory | Reminder-driven, not memory-driven | At launch |

---

## 4. Non-Goals

- **General household chores** (cleaning, bills, errands unrelated to food) are explicitly out of scope. This is a food-planning tool, not a household-management tool — broadening it dilutes the one job it needs to do well.
- **Recipe discovery / new-recipe recommendation engines** are not a v1 focus. The household already has a rotation; the product's job is to make that rotation durable and visible, not to source new meal ideas. Adding an occasional new meal to the rotation should stay possible but low-effort, not a discovery-driven feature.
- **Nutrition/macro tracking** is not in scope — this isn't a fitness or health-tracking tool.
- **A full budgeting dashboard** (totals, trend charts, category breakdowns) is not in scope — spend tracking is lightweight logging only (see Solution Overview), not a finance tool.
- **Multi-household / shared-outside-the-couple use** (e.g. inviting friends, multi-family accounts) is not in scope for v1.
- **Real backend, auth, or accounts** — this is a frontend-only prototype per the repo's prototype philosophy; all data is mocked/static.

---

## 5. User Personas & Stories

**Primary Persona:** The couple — two people sharing a household, referred to here as Partner A (has ADHD; forward-planning, not cooking or decision-making, is the specific point of friction) and Partner B.

**Story 1:** As Partner A, I want to see tonight's planned meal the moment I open the app, so that I don't default to ordering out simply because I can't immediately recall or find the plan.
**Acceptance Criteria:**
- [ ] Given a plan exists for today, when the app is opened, then today's meal is the first thing visible — no navigation required.
- [ ] Given no plan exists for today, when the app is opened, then that gap is surfaced clearly (not silently blank) so it prompts action instead of defaulting to takeout by omission.

**Story 2:** As either partner, I want to assign meals from our existing rotation across the days of the week, so that weekly planning is fast and doesn't require inventing something new each time.
**Acceptance Criteria:**
- [ ] Given the meal rotation, when planning the week, then each day can be filled by picking from the rotation in a few taps/clicks.
- [ ] Given the rotation doesn't have what we want, when planning, then a new meal can still be added to the rotation without it being a heavyweight process.

**Story 3:** As either partner, I want the grocery list to reflect only what we're actually missing, so that I don't over-buy things we already have or forget things that are already expired.
**Acceptance Criteria:**
- [ ] Given a week's meals are planned, when the grocery list is generated, then it lists ingredients needed minus what the pantry already has in sufficient, non-expired quantity.
- [ ] Given a pantry item is low or past its expiration, when viewing the pantry, then that item is flagged distinctly from items that are simply in stock.

**Story 4:** As either partner, I want the cat's homemade food prep to show up as its own recurring task, so that it doesn't rely on either of us remembering it independently.
**Acceptance Criteria:**
- [ ] Given the cat food's recurring schedule, when the scheduled day arrives, then the prep task is visibly surfaced alongside (but distinguishable from) the human meal plan.
- [ ] Given the cat food recipe is fixed, when viewing the task, then its ingredients/recipe are available without needing to look elsewhere.

**Story 5:** As either partner, I want to log what a grocery trip or an ordered-out night cost, so that we can see over time whether having a plan is actually saving us money.
**Acceptance Criteria:**
- [ ] Given a grocery trip happened, when logging it, then a $ amount can be attached and viewed later alongside past trips.
- [ ] Given a night was "ordered out" instead of following the plan, when logging it, then a $ amount can be attached the same way.

**Story 6:** As Partner A, I want reminders for the moments I'm most likely to forget — planning the week, prepping the cat's food, and restocking low/expiring pantry items — so that the plan doesn't depend entirely on me remembering unprompted.
**Acceptance Criteria:**
- [ ] Given the weekly plan hasn't been made yet, when the planning window arrives, then a mocked reminder appears in the notification panel.
- [ ] Given the cat food prep day arrives, when due, then a mocked reminder appears in the notification panel.
- [ ] Given a pantry item is low or expiring, when that state is reached, then a mocked reminder appears in the notification panel.

**Story 7:** As either partner, I want to tap any meal or the cat food task and see full details (ingredients + step-by-step instructions), so that I don't need to remember how to make it from memory.
**Acceptance Criteria:**
- [ ] Given any meal card (today view, weekly planner, rotation) or the cat food task, when tapped, then a side sheet opens with the full recipe: ingredients and step-by-step instructions.
- [ ] Given the side sheet is open, when dismissed, then the underlying view is unchanged — this is a read-only detail view, not an edit flow.

---

## 6. Solution Overview

Meal Planner is built around one core surface: **today's plan, visible immediately on open.** Everything else — the weekly planner, the meal rotation, the pantry, the grocery list, and the cat food schedule — exists to keep that one surface reliably populated with minimal upfront effort.

- **Today view (home):** Shows tonight's planned meal (or a clear "not planned yet" state) and today's cat-food task if scheduled, with a fast path into weekly planning if nothing's set.
- **Weekly planner:** A week-at-a-glance grid where each day is filled by picking from the meal rotation (fast path) or adding something new to the rotation (slower, occasional path).
- **Meal rotation:** The household's list of go-to meals, each with its ingredients, reusable across weeks.
- **Pantry:** Tracks on-hand staples/ingredients with quantity-low and expiration flags — this is what the grocery list is generated *against*.
- **Grocery list:** Auto-generated from the week's planned meals' ingredients minus what the pantry already covers; remains manually editable.
- **Recipe detail side sheet:** Tapping any meal card or the cat food task opens a side sheet with the full recipe — ingredients plus step-by-step instructions — consistent across every screen a card appears on.
- **Spend log:** Lightweight $ tracking — logging a grocery trip captures its cost, and marking a night as "ordered out" (instead of following the plan) captures that cost too. Enough to see spend trends over time; not a budgeting dashboard.
- **Notifications:** A mocked in-app notification bell/panel — the reminder mechanism for the three forgetting-prone moments the PRD identifies: the weekly planning session not happening, cat food prep day arriving, and pantry items going low or expiring. Static/simulated, not real push notifications, consistent with the frontend-only prototype.
- **Cat food:** A fixed recipe on a recurring schedule, surfaced as its own recurring task type — not folded into the human meal rotation, since it's not a decision anyone makes each time.

**Key Design Decisions:**
- Chose "today's plan front-and-center" over a calendar-first home screen because the ADHD-relevant failure point is the in-the-moment decision, not the inability to find a calendar — surfacing the answer beats surfacing a tool to look up the answer.
- Chose "grocery list generated from plan minus pantry" over a plain manual list because manual cross-checking against pantry stock was the exact friction the household identified — automating the subtraction is the point, not just listing ingredients.
- Chose to keep cat food as a separate recurring task type rather than merging it into the meal rotation because it isn't a choice made per-week (fixed recipe, fixed cadence) — treating it as a "meal" would misrepresent it as a decision point it isn't.
- Deferred recipe discovery/recommendation entirely — the household's stated gap is durability and visibility of an existing rotation, not sourcing new ideas.

---

## 7. Technical Considerations

**Dependencies:**
| Dependency | Needed for | Owner | Timeline risk |
|---|---|---|---|
| Mock data models (rotation, pantry, plan, cat food schedule) | All screens | Self | Low — no external dependency, frontend-only prototype |

**Known Risks:**
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Grocery-list-minus-pantry logic reads as gimmicky if pantry data isn't realistic | Medium | Medium | Ground pantry mock data in genuinely plausible household staples/quantities, not placeholder filler |
| Cat food task blending visually into human meals and losing its distinct identity | Low | Medium | Treat as a distinct task type in both data model and UI treatment, not a meal variant |

**Open Questions (must resolve before dev start):**
- [ ] None outstanding — scope confirmed with household (2026-08-16).

---

## 8. Launch Plan

Not applicable in the traditional sense — this is a household prototype, not a phased product rollout. "Launch" here means: functional for daily household use once v1 screens are built.

| Phase | Date | Audience | Success Gate |
|---|---|---|---|
| Working prototype | TBD | The household (2 users) | Today view, weekly planner, pantry, grocery list, and cat food task all functional with realistic mock data |

**Rollback Criteria:** Not applicable — no live users beyond the household, no rollout mechanism.

---

## 9. Appendix

- Scope and requirements sourced directly from household conversation (2026-08-16): core problem (forgetting-to-plan → takeout default), meal rotation as primary planning mechanism, pantry-aware grocery list (low-stock + expiration), and cat food as a fixed-recipe recurring task. General household chores explicitly excluded from scope.
