# Contributing

Work on `develop` and propose changes to `main` through a pull request.
Authenticate once with `gh auth login` if needed.

Before editing, update your local branch:

```bash
git fetch origin
git switch develop
git pull --ff-only origin develop
```

Before pushing, install dependencies from the lockfile and run every linter:

```bash
npm ci
npm run lint
```

Fix any install or lint errors before committing. CI runs these same commands;
`npm ci` also catches dependency conflicts that prevent lint from starting.

Then review and publish your changes:

```bash
git status --short
git add -A
git diff --cached --stat
git commit -m "Describe the change"
git push origin develop
gh pr create --base main --head develop --fill
```

Run `git add -A` only if `git status --short` lists files you intend to
include; it stages **all** changes, including new files. If there are unrelated
changes, stage only the files you want with `git add -- filename` instead.
Review the staged-file list before committing and replace the example commit
message. Use `gh pr create` only when opening a new PR; pushing `develop`
updates an existing PR.
