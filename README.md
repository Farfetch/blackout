# Blackout

[![Pipeline](https://github.com/Farfetch/blackout/actions/workflows/CI.yml/badge.svg)](https://github.com/Farfetch/blackout/actions/workflows/CI.yml)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui)](https://github.com/Farfetch/blackout/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Farfetch/blackout)](https://github.com/Farfetch/blackout/graphs/commit-activity)

Blackout is the codename for the Farfetch Platform Solutions (FPS) projects. It's a monorepo with Yarn workspaces and Lerna.

Useful to build e-commerce applications using the FPS APIs and integrating business logic.

## What's inside

Each package has its own `package.json` file and defines its dependencies, having full autonomy to publish a new version into the registry when needed. Click on each package link below to find instructions on how to install, configure and use each of them.

[**@farfetch/blackout-analytics**](packages/analytics)

- Centralized and agnostic way of tracking data with built-in integrations
- Depends on [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)

[**@farfetch/blackout-client**](packages/client)

- Clients to connect to the Farfetch Platform Solutions' services

[**@farfetch/blackout-react**](packages/react)

- React components, hooks and other tools filled with business logic to help using the Farfetch Platform Solutions' services in web or native e-commerce apps
- Depends on
  - [`@farfetch/blackout-analytics`](https://www.npmjs.com/package/@farfetch/blackout-analytics)
  - [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)
  - [`@farfetch/blackout-redux`](https://www.npmjs.com/package/@farfetch/blackout-redux)

[**@farfetch/blackout-redux**](packages/redux)

- Modules to manage the application global state
- Depends on
  - [`@farfetch/blackout-analytics`](https://www.npmjs.com/package/@farfetch/blackout-analytics)
  - [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## About

Blackout is a project maintained by some awesome [contributors](https://github.com/Farfetch/blackout/graphs/contributors) from [Farfetch Platform Solutions](https://www.farfetchplatformsolutions.com/).

## Maintainers

- [Bruno Oliveira](https://github.com/boliveira)
- [Diego Griep](https://github.com/diegogriep)
- [Duarte Amorim](https://github.com/dnamorim)
- [Rui Nunes](https://github.com/ruifcnunes)

## License

[MIT](LICENSE) @ Farfetch
