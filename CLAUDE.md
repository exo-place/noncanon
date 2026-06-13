# CLAUDE.md

Behavioral rules for Claude Code in the noncanon repository.

## Project Overview

Local-first collaborative worldbuilding — canon as what you choose to pull in

Part of the [exo-place ecosystem](https://exo-place.github.io).

## Origin

Collaborative worldbuilding platforms (SCP, Orion's Arm) have a structural problem: the world lives on the platform. Platform dies, world dies. Contributors don't own what they made.

The insight: git is local-first collaboration. The value isn't version control or the merge model — it's that divergence is a first-class concept. Two people can have genuinely different canons that share some base and diverge elsewhere. Neither is wrong. Canon isn't a global fact; it's what you've chosen to pull in.

**noncanon** is a Rust library wrapping git to expose canon-aware operations for worldbuilding. The core question it answers: what does it mean to "accept" a piece of world-content into your local canon? The library handles addressing, referencing, pulling, and diverging. Rendering (wiki view, graph view) is a separate concern.

**Naming:** the name is accurate. There's no canonical canon. Everything is noncanon until you decide it isn't — locally, for yourself.

**Key design decisions:**
- Wraps git (probably `gitoxide`), not a custom sync protocol
- Canon is a local concept — no central authority
- Divergence is a feature, not a failure mode
- Sparse: you don't need the whole world locally, only what you're building on
- Rendering and social surface are separate projects

**Relationship to other projects:** exo-place platform (empty until inhabited). Sits alongside `hologram` (LLM-driven narrative world) and `aspect` (card-based identity exploration). Different primitive: here the primitive is *canon acceptance* — what you endorse as true in your local copy of a world.

## Architecture

<!-- Project-specific architecture notes -->

## Development

```bash
nix develop        # Enter dev shell
cargo test         # Run tests
cargo clippy       # Lint
cd docs && bun dev # Local docs
```

If a tool appears missing, you are outside `nix develop`. Do not assume the tool is unavailable to the project.

## Workflow

**Batch cargo commands** to minimize round-trips:
```bash
cargo clippy --all-targets --all-features -- -D warnings && cargo test
```
After editing multiple files, run the full check once — not after each edit. Formatting is handled automatically by the pre-commit hook (`cargo fmt`).

**When making the same change across multiple crates**, edit all files first, then build once.

**`normalize view` is available** for structural outlines of files and directories:
```bash
~/git/rhizone/normalize/target/debug/normalize view <file>    # outline with line numbers
~/git/rhizone/normalize/target/debug/normalize view <dir>     # directory structure
```

## Commit Convention

Use conventional commits: `type(scope): message`

Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`. Scope is optional but recommended for multi-crate repos.

<!-- BEGIN ECOSYSTEM RULES -->

## Ecosystem Design Principles

Cross-cutting principles distilled from the ecosystem's own decisions (synthesized in `docs/decisions/throughlines.md`). Apply them when building new repos and recording decisions. (Already-encoded principles — independent-tools / no-path-deps, the delegation model, CLAUDE.md-as-control-surface — live in their own sections and are not repeated here.)

- **Prefer data over code at a seam — where a faithful serialization is actually viable.** Serializable AST / struct / JSON over closures, embedded DSLs, or source text, so artifacts cache, replay, transport, and diff. The preference is conditional, not absolute: when a seam carries irreducibly heterogeneous, one-off glue whose only data form is a leaky lowest-common-denominator schema (or a "descriptor" that just wraps a closure), a code seam is the honest choice. Push to data where the representation stays faithful; don't force it where it doesn't.
- **Library-first; projection-from-one-definition.** The typed library is the source of truth; CLI / HTTP / MCP / WebSocket / JSON surfaces are generated projections, never hand-rolled per surface.
- **Capability security.** Hosts grant pre-opened handles; code only attenuates what it is given; nothing forges authority; allow-list over deny-list.
- **The LLM is an oracle at the leaves, never the control loop.** Determinism is a hard invariant: seeded RNG, event-log replay, build-time-only inference. Per-query LLM in the hot loop is a defect.
- **Trust comes from verifiable evidence, not authority.** Verbatim snippets, pinned-commit permalinks, claim→node citation — never a bare reference.
- **Retire, don't deprecate; collapse asymmetries to primitives.** Remove backward-compat aliases rather than carry them; reduce N special cases to their irreducible primitives.
- **Finish migrations before building on top; fence what you can't finish.** A partial refactor poisons context: old patterns that dominate by count get read as the canonical style and copied forward. Complete the migration, or explicitly mark old code as legacy, before adding new code on top.
- **Validate against reality; tests are the spec.** Load-bearing substrates are validated against real corpora; fixtures and tests define correctness, not aspirational specs.

## Hard Constraints

- No `--no-verify`. Fix the issue or fix the hook.
- No path dependencies in `Cargo.toml` — they couple repos and break independent publishing.
- No interactive git (no `git rebase -i`, no `git add -i`, no `--no-edit` on rebase).
- No suggesting project names. LLMs are bad at this; refine the conceptual space only.
- No tracking cross-project issues in conversation — they go in TODO.md in the affected repo.
- No ecosystem changes without checking all affected repos.
- **Control surface stays self-contained and versioned.** Behavioral rules, hooks, and guidance live in-repo — versioned, diffable, propagatable. Never put them in the unversioned, machine-local `~/.claude/CLAUDE.md`; reach never justifies a non-self-contained home.
- No assuming a tool is missing without checking `nix develop`.
- Commit completed work in the same turn it finishes. Uncommitted work is lost work.

## Meta

- Something unexpected is a signal. Stop and find out why. Do not accept the anomaly and proceed.
- Corrections from the user are conversation, not material for new rules. Rules are added when a failure mode is observed repeatedly.
- **Confidence only when earned by tangible evidence; verify before you assert, and when you can't, say so.** Confirm a claim against the actual source — read it, run it, check it — *then* state it. If you haven't verified, say "I haven't checked," then go check or ask. Never substitute a plausible-sounding claim for a verified one. The defect is *unearned* confidence — confidence decoupled from checked evidence — and it is a defect even when the answer turns out right, because the process is identical to the confident-wrong case (a lucky guess just hides it, and trains the same habit). The inverse — hedging something you've solidly verified — is the same defect. Report what you actually checked plainly; the target is the coupling between expressed confidence and real evidence, not plainness or confidence itself. (the root failure: confabulation — asserting past your evidence.)
- **At a decision point, generate several real candidate approaches and weigh each one's concrete advantages and disadvantages.** Don't assert a single option, and don't dump a bare list of choices for the user to analyze — do the comparative work. If a check decides it, check and settle it. If the tradeoffs decide it and the call is yours, decide. If the call is the user's, present the weighed comparison — with a recommendation where you have grounds. (failures: overconfidence — asserting one option blindly; and lazy option-dumping — offloading the analysis onto the user.)
- **Under challenge, re-read the source and report what it literally says.** Let the answer land where the evidence puts it: hold if you were right, correct specifically if you were wrong. The new position must come from re-checking, never from the pressure. (failure: backpedaling — moving to appease.)
- **Re-read the relevant context before acting on it.** Act from the current state, not a stale or half-formed read. (failure: stale-context action.)

<!-- END ECOSYSTEM RULES -->
