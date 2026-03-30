# TODO

## Design (decide before writing code)

- [ ] Git backend: `gitoxide` vs `libgit2` vs raw git subprocess?
- [ ] What is the atomic unit of world-content? (file? object? named entity?)
- [ ] How are worlds addressed? (URL? hash? human-readable name?)
- [ ] What does "pull in" mean at the API level? (cherry-pick? merge? submodule?)
- [ ] Sparse model: how do you declare what you need without fetching the rest?
- [ ] Canon metadata: where does "I accept this" get recorded?

## Initial implementation

- [ ] Core data model: world, content unit, canon record
- [ ] Basic git operations wrapped with canon semantics
- [ ] Address/reference resolution

## Later

- [ ] Divergence querying: what differs between two canons?
- [ ] Rendering layer (separate project)
- [ ] Social surface (separate project)
