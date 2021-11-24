# Blackout

[![Pipeline](https://github.com/Farfetch/blackout/actions/workflows/CI.yml/badge.svg)](https://github.com/Farfetch/blackout/actions/workflows/CI.yml)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui)](https://github.com/Farfetch/blackout/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Farfetch/blackout)](https://github.com/Farfetch/blackout/graphs/commit-activity)

Blackout is the codename for the Farfetch Platform Solutions (FPS) projects. It's a monorepo with Yarn workspaces and Lerna.

Useful to build e-commerce applications using the FPS APIs and integrating business logic.

## What's inside

Each package has its own `package.json` file and defines its dependencies, having full autonomy to publish a new version into the registry when needed.

[**@farfetch/blackout-core**](packages/core)

- Clients to connect to the FPS APIs
- Modules to manage the application data layer and global state (with redux)

[**@farfetch/blackout-react**](packages/react)

- Set of react components, hooks, contexts and utils with business logic embedded, to build web or react-native interfaces
- Depends on [`@farfetch/blackout-core`](https://www.npmjs.com/package/@farfetch/blackout-core)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](CONTRIBUTING) file to know what we expect from your contribution and the guidelines you should follow.

## About

Blackout is a project maintained by some awesome [contributors](https://github.com/Farfetch/blackout/graphs/contributors) from [Farfetch Platform Solutions](https://www.farfetchplatformsolutions.com/).

## Maintainers

- [Helder Burato Berto](https://github.com/helderburato)
- [João Ramalho Costa](https://github.com/joaoprcosta)
- [Nelson Leite](https://github.com/nelsonleite)
- [Ricardo Jorge Figueiredo](https://github.com/ricardojmf)
- [Rui Nunes](https://github.com/ruifcnunes)

## License

[MIT](LICENSE) @ Farfetch
