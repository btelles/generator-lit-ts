# <%= elementName %>

## Setup

Install dependencies:

```bash
npm i
```

## Build

This element uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of the component, run:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

## Testing

This element uses modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) along with
Mocha, Chai, and some related helpers for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script:

```bash
npm test
```

## Dev Server

To preview and develop the element, run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Polymer Project's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.
