# Blackout

Blackout is the codename for the Farfetch Platform Solutions (FPS) projects. It's a monorepo with Yarn workspaces and Lerna.

Useful to build e-commerce applications using the FPS APIs and integrating business logic.

## Table of contents
- [Blackout](#blackout)
  - [What's inside](#whats-inside)
    - [Project structure](#project-structure)
  - [Installing](#installing)
  - [Quality](#quality)
    - [Coding styles](#coding-styles)
    - [Linters](#linters)
    - [Git hooks/Lint-staged](#git-hookslint-staged)
    - [Tests](#tests)
    - [CI](#ci)
  - [License](#license)

## What's inside

Each package has its own `package.json` file and defines its dependencies, having full autonomy to publish a new version into the registry when needed.

[**@farfetch/blackout-core**](packages/core)

- Clients to connect to the FPS APIs
- Modules to manage the application data layer and global state (with redux)

[**@farfetch/blackout-react**](packages/react)

- Set of react components, hooks, contexts and utils with business logic embedded, to build web or react-native interfaces
- Depends on `@farfetch/blackout-core`

### Project structure

```
.
├── packages
│   ├── core       // @farfetch/blackout-core package
│   └── react      // @farfetch/blackout-react package
├── tests          // global test utilities and fixtures
├── ...
└── package.json   //root workspace (private package used by yarn workspaces)
```

## Installing

Clone the project

```sh
git clone git@github.com:Farfetch/blackout.git
cd blackout
```

Install the dependencies

```sh
yarn install
```

## Quality

### Coding styles

[Prettier](https://prettier.io/) is in charge of formatting the code, check the [.prettierrc](.prettierrc) content to see what's configured.

There is also the [.editorconfig](.editorconfig) to help maintain consistent coding styles.

### Linters

The eslint configuration can be found in [.eslintrc.json](.eslintrc.json). Prettier is included.

### Git hooks/Lint-staged

Check the [.huskyrc.json](.huskyrc.json) content to see what hooks are enabled. Lint-staged is used to guarantee that lint and prettier are applied automatically on commit and/or pushes.

### Tests

Tests are made with [Jest](https://jestjs.io/) and relies on [enzyme](https://enzymejs.github.io/enzyme/). [React-testing-library](https://testing-library.com/) is enabled whenever react is involved. Configuration lives in the root folder, check [jest.config.js](jest.config.js).

### CI

You'll find some workflows for Github Actions in [.github/workflows](.github/workflows); they will ensure that:

- There is no linter/code-style errors
- The test suite is successful
- The package releases are handled

## License

[MIT](LICENSE) @ Farfetch
