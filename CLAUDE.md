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

## Context Is The Only Scarce Resource

Every byte that enters the main session stays in the main session for its entire lifetime. File contents, command output, search results, page text — once read, it lingers in cache and shapes every downstream token. There is no "just looking."

**All exploration runs in subagents.** Investigations, audits, deep dives, surveys, "let me check," "let me find" — if the purpose of a tool sequence is to find out something you don't yet know, it runs in a subagent. Renaming the activity does not change what it is. The subagent returns a distilled summary; the raw output stays in the subagent.

The main session holds only the durable artifacts you are producing: the edit, the commit, the doc update.

## Durability

Subagent reports, mid-session realizations, "I'll remember this" — none of these outlast the session. Anything worth keeping goes into CLAUDE.md, code, docs, or a commit. If it isn't written down, it is gone.

**Commit completed work immediately.** After tests pass, commit. After each phase of a multi-phase plan, commit. Uncommitted work is lost work, and accumulated uncommitted phases lose isolation as well.

**Docs change in the same commit as the code.** New pages enter the sidebar in that commit. There is no follow-up.

**Note things down immediately — no deferral:**
- Problems, tech debt, issues → TODO.md now, in the same response
- Design decisions, key insights → docs/ or CLAUDE.md
- Future/deferred scope → TODO.md **before** writing any code, not after
- **Every observed problem → TODO.md. No exceptions.** Code comments and conversation mentions are not tracked items. If you write a TODO comment in source, the next action is to open TODO.md and write the entry.

## Authenticity

When asked to analyze X, read X. Do not synthesize from conversation memory, prior summaries, or what the file probably says. Claims must correspond to evidence produced this session.

**Something unexpected is a signal.** Surprising output, anomalous numbers, a file containing what it shouldn't — stop and find out why. Do not accept the anomaly and proceed.

## Discipline

Corrections from the user are conversation, not material for new rules. A single correction does not warrant a CLAUDE.md edit. Rules are added when a failure mode is observed repeatedly and the rule names the failure it prevents.

Do not announce actions ("I will now…"). Act.

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

## Hard Constraints

- No `--no-verify`. Fix the issue or fix the hook.
- No path dependencies in `Cargo.toml` — they couple repos and break independent publishing.
- No interactive git (`git add -p`, `git add -i`, `git rebase -i`) — these block on stdin and hang.
- No assuming a tool is missing without checking `nix develop`.
