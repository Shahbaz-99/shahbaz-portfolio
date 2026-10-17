# Contributing

## Branch policy

- `dev` is the development branch; `main` is the production branch.
- Make all feature, fix, design, refactoring, dependency, and documentation changes on `dev`, never directly on `main`.
- Every completed and verified development task must be committed and pushed to `origin/dev`.
- Promote reviewed changes to `main` only through an explicitly authorized merge or pull request. Production merges and deployments require explicit authorization; do not merge or deploy automatically.

## Workflow

1. Check the current branch, worktree, and remote state. Preserve existing changes; switch to `dev` only when safe.
2. Implement the requested change on `dev`.
3. Run the relevant tests, type checks, builds, and security checks. Do not push unverified changes.
4. Review the complete diff and status. Stage only intended files; exclude secrets, unrelated changes, and generated artifacts.
5. Commit with a clear, meaningful message.
6. Push with `git push origin dev` and confirm the remote branch contains the commit.
7. Request review. Merge into `main` only after explicit authorization; verify deployment after an approved production merge when possible.
