# Hinode - Template

<!-- Tagline -->
<p align="center">
    <b>A clean documentation and blog theme for your Hugo site based on Bootstrap 5</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen" alt="Hugo website">
    </a>
    <a href="https://app.netlify.com/sites/gethinode-template/deploys">
        <img src="https://img.shields.io/netlify/bbe29d40-f246-44fc-ac33-3c48e4776a11" alt="Netlify Status">
    </a>
    <a href="https://stats.uptimerobot.com/xyGVYhLJmV">
        <img src="https://img.shields.io/uptimerobot/status/m793642596-ec67b9245f33e4f365f0da66" alt="UptimeRobot Status">
    </a>
    <a href="https://github.com/gethinode/template/commits/main">
        <img src="https://img.shields.io/github/last-commit/gethinode/template.svg" alt="Last commit">
    </a>
    <a href="https://github.com/gethinode/template/issues">
        <img src="https://img.shields.io/github/issues/gethinode/template.svg" alt="Issues">
    </a>
    <a href="https://github.com/gethinode/template/pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/gethinode/template.svg" alt="Pulls">
    </a>
    <a href="https://github.com/gethinode/template/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/gethinode/template" alt="License">
    </a>
</p>

## About

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Use this template if you would like to **take advantage of automation features**, provided by npm and GitHub actions. Visit the [docs][docs] for an alternative installation that uses Hugo only.

## Prerequisites

Hinode is a theme that uses [Hugo modules][hugo_modules] to install and maintain various components. The Hinode template requires the following software to be installed on your local machine. The Hugo binary itself is embedded as an npm binary.

- [Git][git_download]
- [Go binary][golang_download]
- [Node.js][nodejs] 22 or newer (it includes npm)

## Installation

1. **Create a new repository**

    Click the button `Use this template` to initialize a new repository based on this template (log in to GitHub if needed).

2. **Clone a local copy**

    ```bash
    git clone https://github.com/owner/my-hinode-site && cd my-hinode-site # replace "owner/my-hinode-site"
    ```

3. **Install the npm packages and hugo modules**

    ```bash
    npm install && npm run mod:update
    ```

You can now run `npm run start` to start a local development server.

## Before committing and pushing

Use this checklist when adding or editing a page.

1. Start from the latest `develop` branch.

    ```bash
    git checkout develop
    git pull
    ```

2. Install dependencies from the lockfile.

    ```bash
    npm ci
    ```

    Use `npm ci` for verification because it follows `package-lock.json` exactly. Avoid updating dependencies during routine content edits unless that is the intended change.

3. Preview the site locally.

    ```bash
    npm run start
    ```

    Check that the edited page renders correctly and that links, images, shortcodes, and map data look right.

4. Run the linters before committing.

    ```bash
    npm test
    ```

    This runs the project lint checks, including markdown, JavaScript, and SCSS linting. Common markdown issues are missing blank lines around lists, extra blank lines, and missing final newlines.

5. Build the site before pushing if your change affects layout, styles, scripts, shortcodes, menus, or shared configuration.

    ```bash
    npm run build
    ```

6. Review and commit only the intended files.

    ```bash
    git status
    git diff
    git add path/to/changed-file.md
    git commit -m "Add page title"
    ```

7. Push your branch or `develop`, then open or update the pull request.

    ```bash
    git push origin develop
    ```

## Merging to main

Before merging `develop` into `main`, make sure the same checks pass on the final merged state.

1. Update both branches.

    ```bash
    git checkout main
    git pull
    git checkout develop
    git pull
    ```

2. Merge `main` into `develop` first and resolve any conflicts.

    ```bash
    git merge main
    ```

3. Re-run the install and checks.

    ```bash
    npm ci
    npm test
    npm run build
    ```

4. Push `develop`, confirm the GitHub checks pass, then merge `develop` into `main` using the pull request.

<!-- MARKDOWN LINKS -->
[docs]: https://gethinode.com/docs
[git_download]: https://git-scm.com
[golang_download]: https://go.dev/dl/
[hugo]: https://gohugo.io
[hugo_modules]: https://gohugo.io/hugo-modules/
[npm]: https://www.npmjs.com
[nodejs]: https://nodejs.org
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
