This guide will help you migrate `@farfetch/blackout-analytics` to the latest version.

# Table of Contents

- [Migrating from @farfetch/blackout-core](#migrating-from-farfetchblackout-core)

  - [Analytics](#analytics)

## Migrating from @farfetch/blackout-core

If you are migrating from `@farfetch/blackout-core`, there are a few setup steps that you will need to follow first which are detailed below. Later in this guide, there are sections that contain the migration steps for each specific area so you can find the changes you need more easily.

**IMPORTANT**

This package is not meant to be used directly. If all you want is to use analytics in your web / react native application to track events/pageviews/screenviews with integrations please use the [`@farfetch/blackout-react`](../react/README.md) and [`@farfetch/blackout-react-analytics`](https://github.com/Farfetch/blackout-react-native) packages respectively. If you are migrating from `@farfetch/blackout-react` v0 to v1 check the migration steps from [here](../react/MIGRATION.md#migrating-from-react-v0-to-v1).

### Install `@farfetch/blackout-analytics` and its peer dependencies

You will need to install the `@farfetch/blackout-analytics` package to use the modules you would import from `@farfetch/blackout-core/analytics`.

Follow the [installation](README.md#installation) instructions to install the package and its peer dependencies.

### Change bundler/jest settings to support ESM module format

All modules provided by the new `@farfetch/blackout-analytics` package are in ESM-only format now. Check the [configuration](README.md#configuration) section to know what changes you might need to do to use this module format in your applications.

### Remove any alias to `src` folders

The packages do not include the `src` folder under its root anymore so any alias configurations you might have in your bundler/jest/typescript configurations are not needed now as they include the areas' folders directly under its root.

### Use a typescript-enabled IDE

The `@farfetch/blackout-analytics` package is entirely authored in typescript and ships with types that when used in conjunction with a typescript-enabled IDE (like VSCode) can help with the migration by suggesting imports and giving errors for invalid usage of the modules. Make sure you use an IDE that supports typescript to make the migration process easier.

### Change import style

The package supports 2 import styles: You can import everything from the root of the package or you can import directly from a file. We recommend using imports from the root of the package since we do not guarantee that imports directly to a file will be kept in future versions.

```js
// Previously:
import Analytics from '@farfetch/blackout-core/analytics';

// Change to:
import Analytics from '@farfetch/blackout-analytics';

// This also works but should be used only when it is not possible to import from the root of the package:
import Analytics from '@farfetch/blackout-analytics/Analytics';
```

Tip: Use VSCode's import suggestions to help you import the modules you need correctly.

### Analytics

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                  | New name                 |
| ------------------------- | ------------------------ |
| eventTypes                | EventType                |
| fromParameterTypes        | FromParameterType        |
| interactionTypes          | InteractionType          |
| loginMethodParameterTypes | LoginMethodParameterType |
| pageTypes                 | PageType                 |
| platformTypes             | PlatformType             |
| trackTypes                | TrackType                |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export                | Notes                        |
| ----------------------------- | ---------------------------- |
| integrations.AnalyticsService | Removed as it was deprecated |
