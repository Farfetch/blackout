This guide will help you migrate `@farfetch/blackout-client` to the latest version.

# Table of Contents

- [Migrating from @farfetch/blackout-core](#migrating-from-farfetchblackout-core)

  - [Account](#account)
  - [Addresses](#addresses)
  - [Authentication](#authentication)
  - [Categories](#categories)
  - [Checkout](#checkout)
  - [Contents](#contents)
  - [Designers](#designers)
  - [Helpers](#helpers)
  - [Locale](#locale)
  - [Management](#management)
  - [OAuth](#oauth)
  - [Orders](#orders)
  - [Payments](#payments)
  - [Products](#products)
  - [Profile](#profile)
  - [Recommendations](#recommendations)
  - [Recommended sets](#recommended-sets)
  - [Returns](#returns)
  - [Search](#search)
  - [Site features](#site-features)
  - [Size guides](#size-guides)
  - [Size scales](#size-scales)
  - [Subscriptions](#subscriptions)
  - [Wishlists](#wishlists)

## Migrating from @farfetch/blackout-core

If you are migrating from `@farfetch/blackout-core`, there are a few setup steps that you will need to follow first which are detailed below. Later in this guide, there are sections that contains the migration steps for each specific area so you can find the changes you need more easily.

### Install `@farfetch/blackout-client` and its peer dependencies

You will need to install the `@farfetch/blackout-client` package to use the clients you would import from `@farfetch/blackout-core/*/client`.

Follow the [installation](README.md#installation) instructions to install the package and its peer dependencies.

### Change bundler/jest settings to support ESM module format

All modules provided by the new `@farfetch/blackout-client` package are in ESM-only format now. Check the [configuration](README.md#configuration) section to know what changes you might need to do to use this module format in your applications.

### Remove any alias to `src` folders

The packages do not include the `src` folder under its root anymore so any alias configurations you might have in your bundler/jest/typescript configurations are not needed now as they include the areas' folders directly under its root.

### Use a typescript-enabled IDE

The `@farfetch/blackout-client` package is entirely authored in typescript and ships with types that when used in conjunction with a typescript-enabled IDE (like VSCode) can help with the migration by suggesting imports and giving errors for invalid usage of the modules. Make sure you use an IDE that supports typescript to make the migration process easier.

### Change import style

The package supports 2 import styles: You can import everything from the root of the package or you can import directly from a file. We recommend using imports from the root of the package since we do not guarantee that imports directly to a file will be kept in future versions.

```js
// Previously:
import { getCategories } from '@farfetch/blackout-core/categories/client';

// Change to:
import { getCategories } from '@farfetch/blackout-client';

// This also works but should be used only when it is not possible to import from the root of the package:
import { getCategories } from '@farfetch/blackout-client/categories';
```

Tip: Use VSCode's import suggestions to help you import the modules you need correctly.

### Account

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                        |
| -------------- | ---------------------------- |
| getSetting     | Removed as it was deprecated |
| getSettings    | Removed as it was deprecated |

### Addresses

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                    | New name                        |
| --------------------------- | ------------------------------- |
| deleteAddress               | deleteUserAddress               |
| deleteDefaultContactAddress | deleteUserDefaultContactAddress |
| getAddress                  | getUserAddress                  |
| getAddresses                | getUserAddresses                |
| getDefaultContactAddress    | getUserDefaultContactAddress    |
| getPredictionDetails        | getAddressPredictionDetails     |
| getPredictions              | getAddressPredictions           |
| getSchema                   | getCountryAddressSchemas        |
| postAddress                 | postUserAddress                 |
| putAddress                  | putUserAddress                  |
| putDefaultBillingAddress    | putUserDefaultBillingAddress    |
| putDefaultContactAddress    | putUserDefaultContactAddress    |
| putDefaultShippingAddress   | putUserDefaultShippingAddress   |

#### Other notable changes

##### Address properties were renamed

The following properties were renamed in the address object of the addresses(addressbook) actions.

| Old Property             | New Property       |
| ------------------------ | ------------------ |
| isDefaultBillingAddress  | isCurrentBilling   |
| isDefaultShippingAddress | isCurrentShipping  |
| isPreferredAddress       | isCurrentPreferred |

### Authentication

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name          | New name         |
| ----------------- | ---------------- |
| deleteGuestTokens | deleteGuestToken |
| deleteTokens      | deleteToken      |
| postGuestTokens   | postGuestToken   |
| postTokens        | postToken        |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export   | Notes                                                |
| ---------------- | ---------------------------------------------------- |
| deleteUserToken  | Use `deleteToken`/`deleteGuestToken` clients instead |
| postRefreshToken | Use `postRefreshEmailToken` client instead           |
| postRegister     | Use `postUser` client instead                        |
| postUserToken    | Use `postToken/postGuestToken` clients instead       |

#### Other notable changes

##### postUser client different working method

`postUser` client works a little bit differently than its counterpart `postRegister` in `@farfetch/blackout-core` as it requires access tokens on the request to work. If you need to use the previous method that used cookies, you can use `postUserLegacy` action or, even better, use the `useUser` hook from `@farfetch/blackout-react` which abstracts this behind the option `useLegacyActions` (requires `@farfetch/blackout-redux` to work).

### Categories

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name         | New name         |
| ---------------- | ---------------- |
| getCategoriesTop | getTopCategories |

### Checkout

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                           | New name                                          |
| ---------------------------------- | ------------------------------------------------- |
| deleteOrderItem                    | deleteCheckoutOrderItem                           |
| getCharges                         | getCheckoutOrderCharge                            |
| getCheckout                        | getCheckoutOrder                                  |
| getCheckoutDetails                 | getCheckoutOrderDetails                           |
| getDeliveryBundleUpgrades          | getCheckoutOrderDeliveryBundleUpgrades            |
| getItemDeliveryProvisioning        | getCheckoutOrderDeliveryBundleProvisioning        |
| getOperation                       | getCheckoutOrderOperation                         |
| getOperations                      | getCheckoutOrderOperations                        |
| getUpgradeItemDeliveryProvisioning | getCheckoutOrderDeliveryBundleUpgradeProvisioning |
| patchCheckout                      | patchCheckoutOrder                                |
| patchDeliveryBundleUpgrades        | patchCheckoutOrderDeliveryBundleUpgrades          |
| patchOrderItem                     | patchCheckoutOrderItem                            |
| postCharges                        | postCheckoutOrderCharge                           |
| postCheckout                       | postCheckoutOrder                                 |
| putItemTags                        | putCheckoutOrderItemTags                          |
| putPromocode                       | putCheckoutOrderPromocodes                        |
| putTags                            | putCheckoutOrderTags                              |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export               | Notes                                 |
| ---------------------------- | ------------------------------------- |
| patchCheckoutCompletePayment | Removed as it was deprecated          |
| patchDeliveryBundleUpgrade   | Removed as it was deprecated          |
| patchGiftMessage             | Use `patchCheckoutOrderItems` instead |

### Contents

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name        | New name       |
| --------------- | -------------- |
| getContentPages | getContentPage |
| getSEO          | getSEOMetadata |

#### Other notable changes

##### `baseURL` parameter is now required in `getSEOMetadata` client

The `baseURL` parameter is now mandatory in `getSEOMetadata` and some of its `target` parameters are automatically inferred from the `Accept-Language`, `FF-Country`, and `FF-Currency` headers so you only need to pass `codes` and `content type` parameters.

### Designers

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getDesigners   | Removed as it should not be used. You can use the brands clients instead but you will have to create the links to each brand yourself as they not provide that as they are application-specific |

### Helpers

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name   | New name    |
| ---------- | ----------- |
| TokenKinds | TokenKind   |
| headers    | HttpHeaders |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export                     | Notes                                                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| parsePickupDate                    | Removed as it was not necessary. You can create your own helper                                            |
| sortProductLabelsByPriority        | That logic is now builtin to the getProductLabelsByPriority selector in `@farfetch/blackout-redux` package |
| buildQueryStringFromObject         | Moved to `@farfetch/blackout-redux` package                                                                |
| Logger                             | Removed as it was being used by analytics only and this module is not in this package' scope               |
| configManagement                   | Removed as the management clients were also removed from this package                                      |
| setAxiosAuthenticationInterceptors | Use `AuthenticationProvider` from `@farfetch/blackout-react` package instead                               |

### Locale

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name      | New name              |
| ------------- | --------------------- |
| getCities     | getCountryStateCities |
| getCurrencies | getCountryCurrencies  |
| getStates     | getCountryStates      |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export       | Notes                                       |
| -------------------- | ------------------------------------------- |
| createContinentsList | Moved to `@farfetch/blackout-redux` package |

### Management

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                            |
| -------------- | -------------------------------- |
| All exports    | Removed from this package' scope |

### OAuth

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                                  |
| -------------- | -------------------------------------- |
| All exports    | Removed as they are not needed anymore |

### Orders

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                               | New name                              |
| -------------------------------------- | ------------------------------------- |
| getGuestOrderDetails                   | getGuestOrderLegacy                   |
| getOrderDetails                        | getOrder                              |
| getOrders                              | getUserOrders                         |
| getTrackings                           | getShipmentTrackings                  |
| postOrderItemActivities                | postOrderItemActivity                 |
| postOrderShippingAddressChangeRequests | postOrderShippingAddressChangeRequest |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export    | Notes                                  |
| ----------------- | -------------------------------------- |
| adaptOrderDetails | Removed as it is not necessary anymore |

### Payments

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                 | New name                      |
| ------------------------ | ----------------------------- |
| deleteInstrument         | deletePaymentIntentInstrument |
| getCharges               | getPaymentIntentCharge        |
| getInstrument            | getPaymentIntentInstrument    |
| getInstruments           | getPaymentIntentInstruments   |
| getIntent                | getPaymentIntent              |
| postCharges              | postPaymentIntentCharge       |
| postCheckCreditBalance   | getUserCreditBalance          |
| postCheckGiftCardBalance | getGiftCardBalance            |
| postInstruments          | postPaymentIntentInstrument   |
| putInstruments           | putPaymentIntentInstrument    |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export      | Notes                                                |
| ------------------- | ---------------------------------------------------- |
| getPaymentMethods   | Use `getCheckoutOrderPaymentMethods` client instead. |
| getTransaction      | Removed as it was deprecated                         |
| postApplePaySession | Removed as it was deprecated                         |
| postPayments        | Removed as it was deprecated                         |
| postTransaction     | Removed as it was deprecated                         |

### Products

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                     | New name                            |
| ---------------------------- | ----------------------------------- |
| getSet                       | getProductSet                       |
| getMeasurements              | getProductVariantsMeasurements      |
| getProductDetails            | getProduct                          |
| getProductMerchantsLocations | getProductVariantMerchantsLocations |
| getListing                   | getProductListing                   |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export                  | Notes                                         |
| ------------------------------- | --------------------------------------------- |
| getColorGrouping                | Use `getProductGrouping` client instead       |
| getRecommendedSetWithOutOfStock | Use `getRecommendedProductSet` client instead |

### Profile

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                   | New name                  |
| -------------------------- | ------------------------- |
| deleteContact              | deleteUserContact         |
| deletePersonalId           | deleteUserPersonalId      |
| getBenefits                | getUserBenefits           |
| getContact                 | getUserContact            |
| getContacts                | getUserContacts           |
| getCredits                 | getUserCredits            |
| getCreditMovements         | getUserCreditMovements    |
| getDefaultPersonalId       | getUserDefaultPersonalId  |
| getPersonalId              | getUserPersonalId         |
| getPersonalIds             | getUserPersonalIds        |
| getPreferences             | getUserPreferences        |
| getProfile                 | getUser¹                  |
| getTitles                  | getUserTitles             |
| patchContact               | patchUserContact          |
| patchPersonalId            | patchUserPersonalId       |
| postContact                | postUserContact           |
| postPersonalIdImage        | postUserPersonalIdImage   |
| postPhoneNumberValidations | postPhoneNumberValidation |
| postPhoneTokenValidations  | postPhoneTokenValidation  |
| postPhoneTokens            | postPhoneToken            |
| putDefaultPersonalId       | putUserDefaultPersonalId  |
| updatePreferences          | putUserPreferences        |
| updateProfile              | putUser                   |

¹ `getUser` client works a little bit differently than the previous `getProfile` as it expects an access token on the request for it to work. If you need to use the legacy method that does not rely on access tokens, you can use the `getUserLegacy` export.

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export       | Notes                                |
| -------------------- | ------------------------------------ |
| getGuestUserBenefits | Use `getUserBenefits` client instead |

#### Other notable changes

##### getUser client different working method

`getUser` client works a little bit differently than its counterpart `getProfile` in `@farfetch/blackout-core` as it requires access tokens on the request to work. If you need to use the previous method that used cookies, you can use `getUserLegacy` action or, even better, use the `useUser` hook from `@farfetch/blackout-react` which abstracts this behind the option `useLegacyActions` (requires `@farfetch/blackout-redux` to work).

### Recommendations

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                  | New name               |
| ------------------------- | ---------------------- |
| getProductRecommendations | getRecommendedProducts |

### Recommended sets

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name          | New name                 |
| ----------------- | ------------------------ |
| getRecommendedSet | getRecommendedProductSet |

### Returns

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                     | New name                          |
| ---------------------------- | --------------------------------- |
| getPickupCapabilities        | getReturnPickupCapability         |
| getPickupRescheduleRequest   | getReturnPickupRescheduleRequest  |
| getPickupRescheduleRequests  | getReturnPickupRescheduleRequests |
| postPickupRescheduleRequests | postReturnPickupRescheduleRequest |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export      | Notes                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| getReturnsFromOrder | Removed as it does not give all returns from the order. Use `getUserReturns` or `getUserReturnsLegacy` clients instead |
| getReferences       | Removed as it was deprecated                                                                                           |

### Search

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name  | New name         |
| --------- | ---------------- |
| getSearch | getSearchIntents |

### Site features

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export  | Notes                        |
| --------------- | ---------------------------- |
| getSiteFeatures | Removed as it was deprecated |

### Size guides

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name      | New name      |
| ------------- | ------------- |
| getSizeguides | getSizeGuides |

### Size scales

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export       | Notes                        |
| -------------------- | ---------------------------- |
| getSizeScaleMappings | Removed as it was deprecated |

### Subscriptions

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name                 | New name                         |
| ------------------------ | -------------------------------- |
| deleteRecipientFromTopic | deleteSubscriptionTopicRecipient |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export      | Notes                                   |
| ------------------- | --------------------------------------- |
| deleteSubscriptions | Use `deleteSubscription` client instead |

### Wishlists

#### Renamed exports

The following table contains the exports that were renamed and their new names you must use now.

| Old name           | New name          |
| ------------------ | ----------------- |
| deleteWishlistsSet | deleteWishlistSet |
| getWishlistsSet    | getWishlistSet    |
| getWishlistsSets   | getWishlistSets   |
| patchWishlistsSet  | patchWishlistSet  |
| postWishlistsSet   | postWishlistSet   |
