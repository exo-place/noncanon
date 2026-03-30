# TODO

## Design (resolved)

- [x] Git backend: `gitoxide`
- [x] Atomic unit: object — files are the on-fs representation, not the primitive
- [x] Addressing: git remotes (standard git addressing)
- [x] "Pull in": expose multiple actions (not one fixed operation)
- [x] Sparse model: expose git's sparse mechanisms + optional metadata filtering (tags etc., not limited to tags)
- [x] Canon metadata: implicit — if you pulled it in, it's canon. No explicit record needed.

## Initial implementation

- [ ] Core data model: world, object
- [ ] Wrap gitoxide with canon-aware operations
- [ ] Address/reference resolution via git remotes
- [ ] Basic pull operations (multiple action variants)
- [ ] Metadata filtering for sparse fetch

## Later

- [ ] Divergence querying: what differs between two canons?
- [ ] Rendering layer (separate project)
- [ ] Social surface (separate project)
