# [PRODUCT_NAME] — instructions for Claude

> **This is a BOILERPLATE CLAUDE.md.** Sections or lines marked **[PLACEHOLDER]** need to be filled in deliberately when starting a new product on this repo — don't leave them unfilled and don't let default/assumed values leak in from the prior product.

## Workflow
- Never commit or push automatically. Make the requested edits, stop, and let the user review the files locally before anything is committed. Only commit/push when explicitly told to.
- If a request is vague or open to more than one reasonable interpretation, don't guess — ask multiple-choice clarifying questions one at a time until it's resolved, rather than picking an interpretation and running with it.
- Preserve existing functionality when restyling or refactoring. A visual/design pass should not silently drop working behavior (e.g. a login flow) — carry it forward even as markup and styles change.
- The PRD is the source of truth for product requirements and scope. Check it before adding or changing functionality.
- It's fine to add non-functional/decorative elements for visual completeness (e.g. extra auth provider buttons) when the user explicitly scopes them that way — don't wire them up unless asked.
- If a task from the docs/backlog.md file is done, remove it from the list.
- If asked "why" something is a certain way, answer the why question directly first — don't jump straight to implementing a fix. Only make a change afterward if the user then asks for one.
- Before invoking any skill or plugin that isn't one of this repo's own `.claude/agents/*.md` personas (e.g. a global "superpowers" brainstorming/planning skill), ask first. This repo has its own tailored agents for exactly this kind of work — default to those, don't let an unrelated global skill take over a task they're built for.
- Don't claim a change works without checking it, but don't spin up a local server (`python3 -m http.server` or similar) to do that check unless explicitly asked. Verification here means: `node --check` on any touched `.js` file, grepping to confirm structural rules actually hold (e.g. zero `style="` / `<style` matches in HTML per the no-inline-CSS rule, every `var(--token)` referenced in markup/CSS actually exists in `styles/tokens.css`), confirming any `<link href>`/`<script src>` target file actually exists, and re-reading the edited section rather than assuming a successful Edit means the content is correct. Actual visual/browser verification is a real gap this doesn't close — flag that gap rather than silently skipping it, and only open a local server for it if the user asks.

## Visual identity **[PLACEHOLDER]**
[PRODUCT_NAME] must look like [reference product / design system] — not like a generic/templated AI-generated product. Fill this in deliberately before doing any visual work; don't inherit a prior product's identity by default. Concretely define:
- **Layout**: [navigation pattern — e.g. persistent sidebar vs. top nav vs. icon-only]
- **Color**: [core token palette and what each color is reserved for — e.g. one accent color for status vs. general use]
- **Components**: [button shape, card style, border vs. shadow treatment, etc.]
- **Type**: [primary typeface and why — not a generic system stack unless that's a deliberate choice]
- **Product naming**: [naming pattern for user-facing chrome, e.g. login top bar, page titles]

## Prototype philosophy
This product is a vibe-coded, frontend-only prototype — there is no real backend, auth, or third-party integration behind it. Vibe-coded describes the speed and iteration style, not permission to lower the bar — that applies to both what features look like and how well the code underneath is built. Judgment, not a reflexive answer, decides how much to invest in either.

**Feature scope**
- When a feature idea sounds like it needs real infra (an API, Jira, Slack, SSO, live data access), don't drop it from scope — reframe it as a convincing mocked/static experience instead. The goal is that it *feels* like a real, deep product, not that it's stripped down to only what's technically wired up.
- Only exclude something entirely if faking it wouldn't read as credible or would take disproportionate effort for the illusion it buys — use judgment, don't default to cutting.
- Before changing any mock dataset, first write out per screen what data points are shown, why each is valuable to show, and whether the values are realistic/meaningful — don't jump straight to adjusting numbers.
- When the user supplies a reference product for a specific pattern (e.g. a competitor's screen for a particular layout), treat it as a first-class design reference for that feature, same as the primary visual-identity reference is for overall look and feel.
- If a change deviates from something the PRD explicitly states (e.g. a stated v1 non-goal), flag the deviation explicitly rather than silently overriding it — confirm whether it's an intentional override or whether the PRD itself should be amended. If the user confirms the override, update `docs/prd.md` in the same piece of work so the PRD never falls out of sync with what's actually been built — don't leave it for a later cleanup pass.

**Code quality**
- This prototype may be shown to a real engineering audience (e.g. as part of a job application or portfolio) — the audience includes a reviewing engineer judging craft, not just end users judging utility. **[PLACEHOLDER: confirm whether this applies to the current product — if not, relax this bar accordingly.]** This shapes how much to invest in engineering-quality work specifically: don't use "it's a prototype" as license for a bad foundation (hardcoded data with no schema, no design tokens, everything hex-literal) — an engineer reviewing this will judge it the same way they'd judge production code. But don't swing to a full production build either (real framework, TypeScript, schema validation, multi-week migration) — a half-finished attempt reads worse than a well-organized single-file prototype.
- Default test for any engineering-quality proposal: is it cheap (a couple hours) AND does it read as strong judgment to a reviewer? If yes, do it now. If it's a real time investment, write the plan into docs/backlog.md as explicitly deferred — don't silently skip it, and don't execute it piecemeal.

## Code organization
By default this repo is zero-build (no bundler, no framework) — this section documents conventions added on top of that default, not a fixed rule. **A product built here can add a real framework or a live third-party integration (e.g. a real Slack/API connection) if it genuinely needs one — treat "no framework" as the starting point to deliberately deviate from, not a constraint to work around.**
- **Design tokens** live in `styles/tokens.css`, reusable component styles in `styles/components.css` — both as CSS custom properties/classes. Reference `var(--token-name)` and existing component classes rather than hardcoding hex/pixel values. No inline `style=""` attributes anywhere in markup, and no `<style>` blocks in HTML files — this is a hard rule, not a default: all styling lives in `styles/*.css` and is applied via classes.
- **Mock data** starts from `data/example.js` — copy it per data model (rename the file and exported const), loaded via `<script src>` in a page's `<head>` — no TypeScript, no runtime validation library by default. Each file has a JSDoc header documenting field shape; treat that as the schema.
- **App logic** lives in `scripts/*.js` — one file per screen (e.g. `scripts/weekly.js`) plus shared cross-screen modules (e.g. `scripts/planStore.js` for shared state, `scripts/mealTags.js` for a shared render helper). Loaded via `<script src>`, no bundler.
- **Pages** — `index.html` stays at the project root as the entry point; every other screen lives in `pages/*.html`. Each page's `<link>`/`<script src>` paths are relative to its own location (`../styles/`, `../data/`, `../scripts/` from inside `pages/`), and nav links between pages account for the folder boundary (`../index.html` from `pages/`, `./pages/weekly.html` from root).
- A full production foundation (real framework, TypeScript, schema validation, component-level restructure) is a valid future step but should have a written migration plan and be explicitly scoped — see docs/backlog.md — rather than started piecemeal mid-task.

## Cross-screen consistency
When reviewing or extending the UI, judge elements against how the same *kind* of element behaves elsewhere in the product, not just against the screen in front of you — sectional fixes that look right in isolation still add up to an inconsistent product. Concretely:
- Don't reuse a shared component/pattern (e.g. a pill/chip) for things that are structurally different just because it's available — a chip is for a short discrete fact, not a catch-all.
- Don't show a field twice in different clothing — if a chart, table, or history log already answers a question, a static chip repeating the same number is clutter, not reinforcement.
- A field needs a reason to be in the UI beyond "the data exists in the schema" — decide per field whether it earns a chip, a labeled section, or should be cut.
- Visual weight should track actual importance, not build order — e.g. a positive/plannable status shouldn't look quieter than a negative one just because the negative one was built first.
- When given a batch of "this feels off" feedback, don't just fix the listed items — extract the underlying principle each one implies, confirm it back before acting, then grep/check the rest of the product for the same pattern so the fix generalizes instead of patching only what was pointed out.

## Product decisions **[PLACEHOLDER]**
For product-facing work on this repo (PRD critique, roadmap/backlog prioritization, scoping new features, writing user stories) — reason like [persona name], the [role] who owns this product. The full role context, stakeholder map, domain expertise, and operating principles for that persona live in `.claude/agents/product-manager.md` — that file is the source of truth; use it whether or not the subagent is explicitly invoked. **Fill in the persona name, role, and stakeholder map in that file before relying on it — it currently contains placeholders carried over from the boilerplate.**
