This guide will help you migrate `@farfetch/blackout-react` to the latest version.

# Table of Contents

- [Migrating from react v0 to v1](#migrating-from-react-v0-to-v1)

  - [Analytics](#analytics)
  - [Content](#content)
  - [Locale](#locale)

## Migrating from react v0 to v1

If you are migrating from `@farfetch/blackout-react` v0, there are a few setup steps that you will need to follow first which are detailed below. Later in this guide, there are sections that contains the migration steps for each specific area so you can find the changes you need more easily.

### Install `@farfetch/blackout-react` v1 and its peer dependencies

You will need to install the `@farfetch/blackout-react` package v1 to use the modules you would import from `@farfetch/blackout-react` v0.

Follow the [installation](README.md#installation) instructions to install the package and its peer dependencies.

### Change bundler/jest settings to support ESM module format

All modules provided by the new `@farfetch/blackout-react` v1 package are in ESM-only format now. Check the [configuration](README.md#configuration) section to know what changes you might need to do to use this module format in your applications.

### Remove any alias to `src` folders

The packages do not include the `src` folder under its root anymore so any alias configurations you might have in your bundler/jest/typescript configurations are not needed now as they include the areas' folders directly under its root.

### Use a typescript-enabled IDE

The `@farfetch/blackout-react` v1 package is entirely authored in typescript and ships with types that when used in conjunction with a typescript-enabled IDE (like VSCode) can help with the migration by suggesting imports and giving errors for invalid usage of the modules. Make sure you use an IDE that supports typescript to make the migration process easier.

### Change import style

The package supports 2 import styles: You can import everything from the root of the package or you can import directly from a file. We recommend using imports from the root of the package since we do not guarantee that imports directly to a file will be kept in future versions.

```js
// Previously (Still works but should be used only when it is not possible to import from the root of the package):
import { useBagItem } from '@farfetch/blackout-react/bags';

// Change to:
import { useBagItem } from '@farfetch/blackout-react';
```

Tip: Use VSCode's import suggestions to help you import the modules you need correctly.

### Hooks interface changes

All hooks implementations have changed their interfaces in order to be more structured. Hooks that can auto fetch data now receive an `enableAutoFetch` boolean option parameter so you can control this feature. Output from hooks also changed to have the data they return under the `data` property and any actions under the `actions` property of the output object. Typescript will point out any errors and will list all available properties you can use in both input and output values.

### Analytics

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                   | New name                 |
| -------------------------- | ------------------------ |
| analytics (default export) | analytics (named export) |
| eventTypes                 | EventType                |
| fromParameterTypes         | FromParameterType        |
| interactionTypes           | InteractionType          |
| loginMethodParameterTypes  | LoginMethodParameterType |
| pageTypes                  | PageType                 |
| platformTypes              | PlatformType             |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export                        | Notes                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------- |
| integrations.AnalyticsService         | Removed as it was deprecated                                              |
| integrations.Nethone                  | Removed as it was deprecated                                              |
| integrations.Vitorino                 | Use `Forter` and `Riskified` integrations directly                        |
| integrations.Zaraz                    | Removed as it was deprecated                                              |
| CLIENT_ID_HEADER_NAME (from CastleV2) | Changed to a static member with the same name on the `Castle` integration |
| CASTLE_MESSAGE_PREFIX (from CastleV2) | Changed to a static member with the same name on the `Castle` integration |

### Content

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                | New name                 |
| ----------------------- | ------------------------ |
| generateArticle         | structuredArticle        |
| generateBreadcrumbsList | structuredBreadcrumbs    |
| generateOrganization    | structuredOrganization   |
| generateProduct         | structuredProduct        |
| generateProductListing  | structuredProductListing |
| generateVideoObject     | structuredVideoObject    |
| generateWebsiteSearch   | structuredWebsiteSearch  |
| useCommercePage         | useCommercePages         |
| useContentType          | useContents              |
| usePage                 | useContentPage           |
| useSEO                  | useSeoMetadata           |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export  | Notes                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Article         | Use `structuredArticle` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`        |
| Breadcrumbs     | Use `structuredBreadcrumbs` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`    |
| Head            | Use `useSeoMetadata` hook to obtain seo metadata. You will need to set the metadata yourself in the response with a solution like `react-helmet`                 |
| Product         | Use `structuredProduct` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`        |
| ProductsListing | Use `structuredProductListing` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet` |
| Organization    | Use `structuredOrganization` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`   |
| VideoObject     | Use `structuredVideoObject` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`    |
| WebsiteSearch   | Use `structuredWebsiteSearch` function to obtain the script tag. You will need to set the metadata yourself in the response with a solution like `react-helmet`  |
| useNavbars      | Use `useContents` hook instead by specifying the `contentTypeCode` param as `navbars` and the `codes` param with the navigation key you want to fetch            |
| useWidget       | Use `useContents` hook instead by specifying the `contentTypeCode` param as `widgets` and the `codes` param with the widget key you want to fetch                |
| useAction       | Create your own hook that performs the same logic as this hook is only to be used internally                                                                     |

#### Other notable changes

##### react-helmet dependency was removed

In the previous version, there was an explicit dependency between this package and `react-helmet` as it was being used by some exports (example: `Head` and `Article` components) to set the document's head with metadata. In this version, that coupling was removed as well as the components that used it. Now you have total control to use your own solution to set metadata information and this package provides helpers that you can use to help you with that.

### Locale

#### New hooks to deal with locale structures

The following table shows the hooks that were added that can be used to deal with locale structures:

| Hook                     | Notes                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| useCountries             | Use `useCountries` to get all countries.                                                                                                                   |
| useCountryAddressSchemas | Use `useCountryAddressSchemas` to get all country address schemas by country code.                                                                         |
| useCountryStateCities    | Use `useCountryStateCities` to get all cities by country code and state id.                                                                                |
| useCountryStates         | Use `useCountryStates` to get all states by country code.                                                                                                  |
| useLocale                | Use `useLocale` to get all info of locale(`subfolder`, `countryCultureCode`, `countryCode`, `country`, `sourceCountryCode` and `currency`) from selectors. |

#### `currencyFormatter` util

A new utility called `currencyFormatter` was added that can be used to format currency-based values.
