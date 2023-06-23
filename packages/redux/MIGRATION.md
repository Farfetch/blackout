This guide will help you migrate `@farfetch/blackout-redux` to the latest version.

# Table of Contents

- [Migrating from @farfetch/blackout-core](#migrating-from-@farfetch/blackout-core)

  - [Addresses](#addresses)
  - [Analytics](#analytics)
  - [Authentication](#authentication)
  - [Bags](#bags)
  - [Brands](#brands)
  - [Categories](#categories)
  - [Checkout](#checkout)
  - [Contents](#contents)
  - [Designers](#designers)
  - [Entities](#entities)
  - [Forms](#forms)
  - [Helpers](#helpers)
  - [Locale](#locale)
  - [Loyalty](#loyalty)
  - [Management](#management)
  - [Merchants Locations](#merchants-locations)
  - [Orders](#orders)
  - [Payments](#payments)
  - [Products/Details](#productsdetails)
  - [Products/Listing](#productslisting)
  - [Profile](#profile)
  - [Promotion evaluations](#promotion-evaluations)
  - [Recently viewed](#recently-viewed)
  - [Recommendations](#recommendations)
  - [Returns](#returns)
  - [Search](#search)
  - [Site features](#site-features)
  - [Size guides](#size-guides)
  - [Size scales](#size-scales)
  - [Staff members](#staff-members)
  - [Subscriptions](#subscriptions)
  - [Wishlists](#wishlists)

## Migrating from @farfetch/blackout-core

If you are migrating from `@farfetch/blackout-core`, there are a few setup steps that you will need to follow first which are detailed below. Later in this guide, there are sections that contains the migration steps for each specific area so you can find the changes you need more easily.

### Install `@farfetch/blackout-redux` and its peer dependencies

You will need to install the `@farfetch/blackout-redux` package to use the redux modules you would import from `@farfetch/blackout-core/*/redux`.

Follow the [installation](README.md#installation) instructions to install the package and its peer dependencies.

### Change bundler/jest settings to support ESM module format

All modules provided by the new `@farfetch/blackout-redux` package are in ESM-only format now. Check the [configuration](README.md#configuration) section to know what changes you might need to do to use this module format in your applications.

### Remove any alias to `src` folders

The packages do not include the `src` folder under its root anymore so any alias configurations you might have in your bundler/jest/typescript configurations are not needed now as they include the areas' folders directly under its root.

### Use a typescript-enabled IDE

The `@farfetch/blackout-redux` package is entirely authored in typescript and ships with types that when used in conjunction with a typescript-enabled IDE (like VSCode) can help with the migration by suggesting imports and giving errors for invalid usage of the modules. Make sure you use an IDE that supports typescript to make the migration process easier.

### Change import style

The package supports 2 import styles: You can import everything from the root of the package or you can import directly from a file. We recommend using imports from the root of the package since we do not guarantee that imports directly to a file will be kept in future versions.

```js
// Previously:
import { getCategories } from '@farfetch/blackout-core/categories/redux';

// Change to:
import { getCategories } from '@farfetch/blackout-redux';

// This also works but should be used only when it is not possible to import from the root of the package:
import { getCategories } from '@farfetch/blackout-redux/categories';
```

Tip: Use VSCode's import suggestions to help you import the modules you need correctly.

### `getEntity` selector was splitted in 2

In `@farfetch/blackout-core` package, the `getEntity` selector would return a specific entity value when its `id` parameter was set to a value different to `null` or `undefined` and would return all entities otherwise. This
implicit behaviour could lead to some unexpected bugs and was rectified.

The `getEntity` selector was then split in two selectors: `getEntities` and `getEntityById`. If you need to fetch all entities of a specific kind, use the `getEntities` selector. If you need to fetch a specific entity by its id, use the `getEntityById` selector. This selector will return `undefined` if the `id` parameter is `null` or `undefined` which removes any ambiguity.

### Actions now contain the default client builtin

When using actions from `@farfetch/blackout-core` it was necessary to configure them with a matching client before using. While this makes the action more flexible as you can specify your own client, it added unnecessary boilerplate as most of the time the client that was used was the one provided by the package itself. This was now rectified and the `@farfetch/blackout-redux` provides actions configured with the default client so you can use them out of the box. If you need to specify your own client for those actions, `factory` modules are now provided for that specific purpose. The following example demonstrates those changes:

```js
// Previously:
import { doGetCategories } from '@farfetch/blackout-core/categories/redux';
import { getCategories as getCategoriesClient } from '@farfetch/blackout-core/categories/client';

const fetchCategories = doGetCategories(getCategories);

reduxStore.dispatch(fetchCategories());

// Change to:
import { fetchCategories } from '@farfetch/blackout-redux';

reduxStore.dispatch(fetchCategories());

// If you need to pass your own client, then you can import the factory module:
import { fetchCategoriesFactory } from '@farfetch/blackout-redux';

// myClient here is a client that matches the type expected by fetchCategoriesFactory
const fetchCategories = fetchCategoriesFactory(myClient);

reduxStore.dispatch(fetchCategories());
```

### Dispatched action types changed

If you were using custom middlewares to perform some logic when certain action types were dispatched by redux modules from `@farfetch/blackout-core/*/redux`, you will need to change the action types used as they were changed in `@farfetch/blackout-redux` package. We will highlight those changes when describing the changes for each specific area.

### Output of actions changed

If you `await` the call to any action provided you will now get the raw response from the client used by the action instead of not receiving any value.

### Addresses

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                      | New name                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| actionTypes                                   | Split between addressesActionTypes/usersActionTypes/localeActionTypes¹ |
| actionTypes.GET_PREDICTION\*²                 | addressesActionTypes.FETCH_ADDRESS_PREDICTION\*²                       |
| actionTypes.GET_PREDICTION_DETAILS\*²         | addressesActionTypes.FETCH_ADDRESS_PREDICTION_DETAILS\*²               |
| actionTypes.RESET_PREDICTION                  | addressesActionTypes.RESET_ADDRESS_PREDICTIONS                         |
| actionTypes.GET_ADDRESSES\*²                  | usersActionTypes³.FETCH_USER_ADDRESSES\*²                              |
| actionTypes.GET_ADDRESS\*²                    | usersActionTypes³.FETCH_USER_ADDRESS\*²                                |
| actionTypes.CREATE_ADDRESS\*²                 | usersActionTypes³.CREATE_USER_ADDRESS\*²                               |
| actionTypes.UPDATE_ADDRESS\*²                 | usersActionTypes³.UPDATE_USER_ADDRESS\*²                               |
| actionTypes.DELETE_ADDRESS\*²                 | usersActionTypes³.REMOVE_USER_ADDRESS\*²                               |
| actionTypes.SET_DEFAULT_BILLING_ADDRESS\*²    | usersActionTypes³.SET_USER_DEFAULT_BILLING_ADDRESS\*²                  |
| actionTypes.SET_DEFAULT_SHIPPING_ADDRESS\*²   | usersActionTypes³.SET_USER_DEFAULT_SHIPPING_ADDRESS\*²                 |
| actionTypes.GET_ADDRESS_SCHEMA\*²             | localeActionTypes⁴.FETCH_COUNTRY_ADDRESS_SCHEMAS\*²                    |
| actionTypes.SET_DEFAULT_CONTACT_ADDRESS\*²    | usersActionTypes³.SET_USER_DEFAULT_CONTACT_ADDRESS\*²                  |
| actionTypes.SET_DEFAULT_CONTACT_ADDRESS\*²    | usersActionTypes³.SET_USER_DEFAULT_CONTACT_ADDRESS\*²                  |
| actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS\*² | usersActionTypes³.REMOVE_USER_DEFAULT_CONTACT_ADDRESS\*²               |
| actionTypes.GET_DEFAULT_CONTACT_ADDRESS\*²    | usersActionTypes³.FETCH_USER_DEFAULT_CONTACT_ADDRESS\*²                |
| actionTypes.RESET_ADDRESSES                   | usersActionTypes³.RESET_USER_ADDRESSES                                 |

¹ Addresses `actionTypes` export was split between `addressesActionTypes`, `usersActionTypes` and `localeActionTypes`.

² Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

³ These actions types are now considered under user action types.

⁴ This action type is now considered under locale action types.

##### Reducers

| Old name                 | New name                                                   |
| ------------------------ | ---------------------------------------------------------- |
| reducer (default export) | Split between addressesReducer/usersReducer/localeReducer¹ |
| entitiesMapper           | Split between localeEntitiesMapper/usersEntitiesMapper²    |

¹ Addresses `reducer` export was split between `addressesReducer`, `usersReducer` and `localeReducer`. Depending on the action you need, you might need to use different reducers.

² Addresses `entitiesMapper` export was split between `localeEntitiesMapper` and `usersEntitiesMapper`. Depending on the action you need, you might need to use different entities mapper.

##### Actions

| Old name                      | New name                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| doCreateAddress               | createUserAddress (pre-configured w/ client) or createUserAddressFactory                             |
| doDeleteAddress               | removeUserAddress (pre-configured w/ client) or removeUserAddressFactory                             |
| doDeleteDefaultContactAddress | removeUserDefaultContactAddress (pre-configured w/ client) or removeUserDefaultContactAddressFactory |
| doGetAddress                  | fetchUserAddress (pre-configured w/ client) or fetchUserAddressFactory                               |
| doGetAddressSchema            | fetchCountryAddressSchemas (pre-configured w/ client) or fetchCountryAddressSchemasFactory           |
| doGetAddresses                | fetchUserAddresses (pre-configured w/ client) or fetchUserAddressesFactory                           |
| doGetDefaultContactAddress    | fetchUserDefaultContactAddress (pre-configured w/ client) or fetchUserDefaultContactAddressFactory   |
| doGetPredictionDetails        | fetchAddressPredictionDetails (pre-configured w/ client) or fetchAddressPredictionDetailsFactory     |
| doGetPredictions              | fetchAddressPredictions (pre-configured w/ client) or fetchAddressPredictionsFactory                 |
| doResetPredictions            | resetAddressPredictions                                                                              |
| doSetDefaultBillingAddress    | setUserDefaultBillingAddress (pre-configured w/ client) or setUserDefaultBillingAddressFactory       |
| doSetDefaultContactAddress    | setUserDefaultContactAddress (pre-configured w/ client) or setUserDefaultContactAddressFactory       |
| doSetDefaultShippingAddress   | setUserDefaultShippingAddress (pre-configured w/ client) or setUserDefaultShippingAddressFactory     |
| doUpdateAddress               | updateUserAddress (pre-configured w/ client) or updateUserAddressFactory                             |
| reset                         | resetUserAddresses                                                                                   |

##### Selectors

| Old name                       | New name                            |
| ------------------------------ | ----------------------------------- |
| getResult                      | getUserAddressesResult              |
| getError                       | getUserAddressesError               |
| isAddressesLoading             | areUserAddressesLoading             |
| getAddresses                   | getUserAddresses                    |
| getAddress                     | getUserAddress                      |
| getSchemas                     | getCountriesAddressSchemas          |
| getSchema                      | getCountryAddressSchemas            |
| getPredictions                 | getAddressPredictions               |
| getPredictionsError            | getAddressPredictionsError          |
| isPredictionsLoading           | areAddressPredictionsLoading        |
| getPredictionDetails           | getAddressPrediction                |
| getPredictionDetailsError      | getAddressPredictionError           |
| isPredictionDetailsLoading     | areAddressPredictionDetailsLoading  |
| isAddressesListLoading         | areUserAddressesListLoading         |
| getAddressesListError          | getUserAddressesListError           |
| isAddressLoading               | isUserAddressLoading                |
| getAddressError                | getUserAddressError                 |
| isAddressSchemaLoading         | areCountriesAddressSchemasLoading   |
| getAddressSchemaError          | getCountriesAddressSchemasError     |
| isDefaultAddressDetailsLoading | areUserDefaultAddressDetailsLoading |
| getDefaultAddressDetailsError  | getUserDefaultAddressDetailsError   |
| getDefaultAddressDetailsResult | getUserDefaultAddressDetailsResult  |

### Analytics

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Middlewares

| Old name           | New name                       |
| ------------------ | ------------------------------ |
| bagMiddleware      | analyticsMiddlewares¹.bag      |
| setUserMiddleware  | analyticsMiddlewares¹.setUser  |
| wishlistMiddleware | analyticsMiddlewares¹.wishlist |

¹ Analytics middlewares are now under `analyticsMiddlewares` export. You will need to import that to have access to the middlewares.

### Authentication

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                           | New name                                |
| ---------------------------------- | --------------------------------------- |
| actionTypes                        | usersActionTypes                        |
| actionTypes.LOGIN\*¹               | usersActionTypes.LOGIN\*¹               |
| actionTypes.LOGOUT\*¹              | usersActionTypes.LOGOUT\*¹              |
| actionTypes.PASSWORD_CHANGE\*¹     | usersActionTypes.PASSWORD_CHANGE\*¹     |
| actionTypes.PASSWORD_RECOVER\*¹    | usersActionTypes.PASSWORD_RECOVER\*¹    |
| actionTypes.PASSWORD_RESET\*¹      | usersActionTypes.PASSWORD_RESET\*¹      |
| actionTypes.REGISTER\*¹            | usersActionTypes.REGISTER\*¹            |
| actionTypes.VALIDATE_EMAIL\*¹      | usersActionTypes.VALIDATE_EMAIL\*¹      |
| actionTypes.REFRESH_TOKEN\*¹       | usersActionTypes.REFRESH_TOKEN\*¹       |
| actionTypes.REFRESH_EMAIL_TOKEN\*¹ | usersActionTypes.REFRESH_EMAIL_TOKEN\*¹ |
| actionTypes.AUTHENTICATION_RESET   | usersActionTypes.RESET_AUTHENTICATION   |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name            |
| ------------------------ | ------------------- |
| reducer (default export) | usersReducer        |
| entitiesMapper           | usersEntitiesMapper |

##### Actions

| Old name            | New name                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| doLogin             | login (pre-configured w/ client) or loginFactory                         |
| doLogout            | logout (pre-configured w/ client) or logoutFactory                       |
| doPasswordChange    | changePassword (pre-configured w/ client) or changePasswordFactory       |
| doPasswordRecover   | recoverPassword (pre-configured w/ client) or recoverPasswordFactory     |
| doPasswordReset     | resetPassword (pre-configured w/ client) or resetPasswordFactory         |
| doRefreshEmailToken | refreshEmailToken (pre-configured w/ client) or refreshEmailTokenFactory |
| doRefreshToken      | refreshToken (pre-configured w/ client) or refreshTokenFactory           |
| doRegister          | register¹ (pre-configured w/ client) or registerFactory                  |
| doReset             | resetAuthentication                                                      |
| doValidateEmail     | validateEmail (pre-configured w/ client) or validateEmailFactory         |

¹ `register` action works a little bit differently than the previous `doRegister` as it expects an access token on the request for it to work. If you need to use the legacy method that does not rely on access tokens, you can use the `registerLegacy` and `registerLegacyFactory` exports.

##### Selectors

| Old name              | New name       |
| --------------------- | -------------- |
| isRefreshTokenLoading | isTokenLoading |
| getRefreshTokenError  | getTokenError  |

#### Other notable changes

##### register action different working method

`register` action works a little bit differently than its counterpart `doRegister` in `@farfetch/blackout-core` as it requires access tokens on the request to work. If you need to use the previous method that used cookies, you can use `registerLegacy` action or, even better, use the `useUser` hook from `@farfetch/blackout-react` which abstracts this behind the option `useLegacyActions`.

### Bags

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                          | New name                                      |
| --------------------------------- | --------------------------------------------- |
| actionTypes                       | bagsActionTypes                               |
| actionTypes.ADD_ITEM_TO_BAG\*¹    | bagsActionTypes.ADD_BAG_ITEM\*¹               |
| actionTypes.DELETE_BAG_ITEM\*¹    | bagsActionTypes.REMOVE_BAG_ITEM\*¹            |
| actionTypes.SET_BAG_PROMOCODES\*¹ | bagsActionTypes.SET_BAG_PROMOCODES\*¹         |
| actionTypes.GET_BAG\*¹            | bagsActionTypes.FETCH_BAG\*¹                  |
| actionTypes.RESET_BAG_STATE       | bagsActionTypes.RESET_BAG_STATE               |
| actionTypes.RESET_BAG_ENTITIES    | bagsActionTypes.RESET_BAG_ENTITIES            |
| actionTypes.UPDATE_BAG_ITEM\*¹    | bagsActionTypes.UPDATE_BAG_ITEM\*¹            |
| actionTypes.GET_BAG_OPERATION\*¹  | bagsActionTypes.FETCH_BAG_OPERATION\*¹        |
| actionTypes.RESET_BAG_OPERATIONS  | bagsActionTypes.RESET_BAG_OPERATIONS_ENTITIES |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name           |
| ------------------------ | ------------------ |
| reducer (default export) | bagsReducer        |
| entitiesMapper           | bagsEntitiesMapper |

##### Middlewares

| Old name                            | New name                                              |
| ----------------------------------- | ----------------------------------------------------- |
| getBagOnSetPromocodesRequestSuccess | bagMiddlewares¹.fetchBagOnSetPromocodesRequestSuccess |
| getOperationsOnBagRequestSuccess    | bagMiddlewares¹.fetchBagOperationsOnBagRequestSuccess |

¹ Bags middlewares are now under `bagsMiddlewares` export. You will need to import that to have access to the middlewares.

##### Actions

| Old name           | New name                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| doAddBagItem       | addBagItem (pre-configured w/ client) or addBagItemFactory               |
| doDeleteBagItem    | removeBagItem (pre-configured w/ client) or removeBagItemFactory         |
| doGetBag           | fetchBag (pre-configured w/ client) or fetchBagFactory                   |
| doGetBagOperation  | fetchBagOperation (pre-configured w/ client) or fetchBagOperationFactory |
| doSetBagPromocodes | setBagPromocodes (pre-configured w/ client) or setBagPromocodesFactory   |
| doUpdateBagItem    | updateBagItem (pre-configured w/ client) or updateBagItemFactory         |
| reset              | resetBag                                                                 |

##### Selectors

| Old name             | New name                |
| -------------------- | ----------------------- |
| createGetItemInBag   | findProductInBag        |
| getItemWholeQuantity | getProductQuantityInBag |

##### Utils

| Old name          | New name            |
| ----------------- | ------------------- |
| createBagItemHash | generateBagItemHash |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Actions

| Removed export | Notes                         |
| -------------- | ----------------------------- |
| resetState     | Use `resetBag` action instead |

##### Utils

| Removed export          | Notes                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------- |
| areBagItemsIdentical    | Removed as it is not necessary. You can replicate its logic if needed in your apps |
| bagOperationChangeTypes | Use `BagOperationChangeType` export from `@farfetch/blackout-client` package       |

#### Other notable changes

##### `useBag` hook

The `useBag` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a user bag feature in your apps. Prefer that instead of directly using the bag actions/selectors.

### Brands

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                       | New name                             |
| ------------------------------ | ------------------------------------ |
| actionTypes                    | brandsActionTypes                    |
| actionTypes.FETCH_BRAND\*¹     | brandsActionTypes.FETCH_BRAND\*¹     |
| actionTypes.FETCH_BRANDS\*¹    | brandsActionTypes.FETCH_BRANDS\*¹    |
| actionTypes.RESET_BRANDS_STATE | brandsActionTypes.RESET_BRANDS_STATE |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name      |
| ------------------------ | ------------- |
| reducer (default export) | brandsReducer |

##### Actions

| Old name         | New name                                                     |
| ---------------- | ------------------------------------------------------------ |
| fetchBrand       | fetchBrand (pre-configured w/ client) or fetchBrandFactory   |
| fetchBrands      | fetchBrands (pre-configured w/ client) or fetchBrandsFactory |
| resetBrandsState | resetBrands                                                  |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export              | Notes                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| actionTypes.SET_BRANDS_HASH | Brands selectors now must receive the query parameter to specify the data from which request to retrieve |

##### Selectors

| Removed export | Notes                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getBrandsHash  | Brands slice does not keep the currently set hash anymore. All brands selectors now must receive the query parameter to specify the data from which request to retrieve |

#### Other notable changes

##### `useBrands` hook

The `useBrands` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a feature that needs brand information in your apps. Prefer that instead of directly using the bag actions/selectors.

### Categories

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                          | New name                                      |
| --------------------------------- | --------------------------------------------- |
| actionTypes                       | categoriesActionTypes                         |
| actionTypes.GET_CATEGORIES_TOP\*¹ | categoriesActionTypes.FETCH_TOP_CATEGORIES\*¹ |
| actionTypes.GET_CATEGORIES\*¹     | categoriesActionTypes.FETCH_CATEGORIES\*¹     |
| actionTypes.RESET_CATEGORIES      | categoriesActionTypes.RESET_CATEGORIES_STATE  |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name          |
| ------------------------ | ----------------- |
| reducer (default export) | categoriesReducer |

##### Actions

| Old name           | New name                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| doGetCategories    | fetchCategories (pre-configured w/ client) or fetchCategoriesFactory       |
| doGetCategoriesTop | fetchTopCategories (pre-configured w/ client) or fetchTopCategoriesFactory |
| reset              | resetCategories                                                            |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

##### Selectors

| Removed export  | Notes                              |
| --------------- | ---------------------------------- |
| getCategoryById | Use `getCategory` selector instead |

#### Other notable changes

##### `useCategories` hook

The `useCategories` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a feature that needs categories information in your apps. Prefer that instead of directly using the categories actions/selectors.

### Checkout

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                              | New name                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| actionTypes                                           | checkoutActionTypes                                                              |
| actionTypes.CREATE_CHECKOUT\*¹                        | checkoutActionTypes.CREATE_CHECKOUT_ORDER\*¹                                     |
| actionTypes.GET_CHARGES\*¹                            | checkoutActionTypes.FETCH_CHECKOUT_ORDER_CHARGE\*¹                               |
| actionTypes.GET_CHECKOUT\*¹                           | checkoutActionTypes.FETCH_CHECKOUT_ORDER\*¹                                      |
| actionTypes.GET_OPERATIONS\*¹                         | checkoutActionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS\*¹                           |
| actionTypes.GET_OPERATION\*¹                          | checkoutActionTypes.FETCH_CHECKOUT_ORDER_OPERATION\*¹                            |
| actionTypes.UPDATE_ORDER_ITEM\*¹                      | checkoutActionTypes.UPDATE_CHECKOUT_ORDER_ITEM\*¹                                |
| actionTypes.DELETE_ORDER_ITEM\*¹                      | checkoutActionTypes.REMOVE_CHECKOUT_ORDER_ITEM\*¹                                |
| actionTypes.RESET_CHECKOUT                            | checkoutActionTypes.RESET_CHECKOUT                                               |
| actionTypes.GET_CHECKOUT_DETAILS\*¹                   | checkoutActionTypes.FETCH_CHECKOUT_ORDER_DETAILS\*¹                              |
| actionTypes.GET_COLLECTPOINTS\*¹                      | checkoutActionTypes.FETCH_COLLECT_POINTS\*¹                                      |
| actionTypes.GET_ITEM_DELIVERY_PROVISIONING\*¹         | checkoutActionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING\*¹         |
| actionTypes.GET_DELIVERY_BUNDLE_UPGRADES\*¹           | checkoutActionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES\*¹             |
| actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING\*¹ | checkoutActionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING\*¹ |
| actionTypes.SET_ITEM_TAGS\*¹                          | checkoutActionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS\*¹                              |
| actionTypes.SET_PROMOCODE\*¹                          | checkoutActionTypes.SET_CHECKOUT_ORDER_PROMOCODES\*¹                             |
| actionTypes.SET_PROMOCODE_RESET                       | checkoutActionTypes.RESET_CHECKOUT_ORDER_PROMOCODES_STATE                        |
| actionTypes.SET_TAGS\*¹                               | checkoutActionTypes.SET_CHECKOUT_ORDER_TAGS\*¹                                   |
| actionTypes.UPDATE_CHECKOUT\*¹                        | checkoutActionTypes.UPDATE_CHECKOUT_ORDER\*¹                                     |
| actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES\*¹        | checkoutActionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES\*¹            |
| actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE\*¹         | checkoutActionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE\*¹             |
| actionTypes.POST_CHARGES\*¹                           | checkoutActionTypes.CREATE_CHECKOUT_ORDER_CHARGE\*¹                              |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name               |
| ------------------------ | ---------------------- |
| reducer (default export) | checkoutReducer        |
| entitiesMapper           | checkoutEntitiesMapper |

##### Actions

| Old name                             | New name                                                                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| doCreateCheckout                     | createCheckoutOrder (pre-configured w/ client) or createCheckoutOrderFactory                                                                 |
| doDeleteOrderItem                    | removeCheckoutOrderItem (pre-configured w/ client) or removeCheckoutOrderItemFactory                                                         |
| doGetCharges                         | fetchCheckoutOrderCharge (pre-configured w/ client) or fetchCheckoutOrderChargeFactory                                                       |
| doGetCheckout                        | fetchCheckoutOrder (pre-configured w/ client) or fetchCheckoutOrderFactory                                                                   |
| doGetCheckoutDetails                 | fetchCheckoutOrderDetails (pre-configured w/ client) or fetchCheckoutOrderDetailsFactory                                                     |
| doGetCollectPoints                   | fetchCollectPoints (pre-configured w/ client) or fetchCollectPointsFactory                                                                   |
| doGetDeliveryBundleUpgrades          | fetchCheckoutOrderDeliveryBundleUpgrades (pre-configured w/ client) or fetchCheckoutOrderDeliveryBundleUpgradesFactory                       |
| doGetItemDeliveryProvisioning        | fetchCheckoutOrderDeliveryBundleProvisioning (pre-configured w/ client) or fetchCheckoutOrderDeliveryBundleProvisioningFactory               |
| doGetOperation                       | fetchCheckoutOrderOperation (pre-configured w/ client) or fetchCheckoutOrderOperationFactory                                                 |
| doGetOperations                      | fetchCheckoutOrderOperations (pre-configured w/ client) or fetchCheckoutOrderOperationsFactory                                               |
| doGetUpgradeItemDeliveryProvisioning | fetchCheckoutOrderDeliveryBundleUpgradeProvisioning (pre-configured w/ client) or fetchCheckoutOrderDeliveryBundleUpgradeProvisioningFactory |
| doResetCharges                       | resetCheckoutOrderChargeState                                                                                                                |
| doSetItemTags                        | setCheckoutOrderItemTags (pre-configured w/ client) or setCheckoutOrderItemTagsFactory                                                       |
| doUpdateCheckout                     | updateCheckoutOrder (pre-configured w/ client) or updateCheckoutOrderFactory                                                                 |
| doUpdateOrderItem                    | updateCheckoutOrderItem (pre-configured w/ client) or updateCheckoutOrderItemFactory                                                         |
| doUpdateDeliveryBundleUpgrades       | updateCheckoutOrderDeliveryBundleUpgrades (pre-configured w/ client) or updateCheckoutOrderDeliveryBundleUpgradesFactory                     |
| doPostCharges                        | createCheckoutOrderCharge (pre-configured w/ client) or createCheckoutOrderChargeFactory                                                     |
| reset                                | resetCheckout                                                                                                                                |
| resetPromocode                       | resetCheckoutOrderPromocodes                                                                                                                 |

##### Selectors

| Old name                                               | New name                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| getCheckoutId                                          | getCheckoutOrderId                                               |
| getCheckout                                            | getCheckoutOrderResult                                           |
| getCharges                                             | getCheckoutOrderChargeResult                                     |
| getCheckoutDetail                                      | getCheckoutOrderDetails                                          |
| getCheckoutOrderCollectPoints                          | getCollectPoints                                                 |
| getCheckoutShippingOptions                             | getCheckoutOrderShippingOptions                                  |
| getCheckoutDeliveryBundle                              | getCheckoutOrderDeliveryBundle                                   |
| getCheckoutDeliveryBundlesIds                          | getCheckoutOrderDeliveryBundlesIds                               |
| getCheckoutDeliveryBundles                             | getCheckoutOrderDeliveryBundles                                  |
| getCheckoutDeliveryBundleUpgrades                      | getCheckoutOrderDeliveryBundleUpgrades                           |
| getCheckoutDeliveryBundleUpgrade                       | getCheckoutOrderDeliveryBundleUpgrade                            |
| getCheckoutCollectPointEstimatedDeliveryPeriod         | getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod      |
| getCheckoutError                                       | getCheckoutOrderError                                            |
| isCheckoutLoading                                      | isCheckoutOrderLoading                                           |
| isCheckoutDetailsLoading                               | areCheckoutOrderDetailsLoading                                   |
| getCheckoutDetailsError                                | getCheckoutOrderDetailsError                                     |
| isCollectPointsLoading                                 | areCollectPointsLoading                                          |
| isItemTagsLoading                                      | areCheckoutOrderItemTagsLoading                                  |
| getItemTagsError                                       | getCheckoutOrderItemTagsError                                    |
| isPromoCodeLoading                                     | areCheckoutOrderPromocodesLoading                                |
| getPromoCodeError                                      | getCheckoutOrderPromocodesError                                  |
| isTagsLoading                                          | areCheckoutOrderTagsLoading                                      |
| getTagsError                                           | getCheckoutOrderTagsError                                        |
| isChargesLoading                                       | isCheckoutOrderChargeLoading                                     |
| getChargesError                                        | getCheckoutOrderChargeError                                      |
| getChargesResult                                       | getCheckoutOrderChargeResult                                     |
| isDeliveryBundleUpgradesLoading                        | areCheckoutOrderDeliveryBundleUpgradesLoading                    |
| getDeliveryBundleUpgradesError                         | getCheckoutOrderDeliveryBundleUpgradesError                      |
| isItemDeliveryProvisioningLoading                      | isCheckoutOrderDeliveryBundleProvisioningLoading                 |
| getItemDeliveryProvisioningError                       | getCheckoutOrderDeliveryBundleProvisioningError                  |
| isUpgradeItemDeliveryProvisioningLoading               | isCheckoutOrderDeliveryBundleUpgradeProvisioningLoading          |
| getUpgradeItemDeliveryProvisioningError                | getCheckoutOrderDeliveryBundleUpgradeProvisioningError           |
| isOperationsLoading                                    | areCheckoutOrderOperationsLoading                                |
| getOperationsError                                     | getCheckoutOrderOperationsError                                  |
| isOperationLoading                                     | isCheckoutOrderOperationLoading                                  |
| getOperationError                                      | getCheckoutOrderOperationError                                   |
| isOrderItemLoading                                     | split into isRemoveOrderItemLoading and isUpdateOrderItemLoading |
| getOrderItemError                                      | split into getRemoveOrderItemError and getUpdateOrderItemError   |
| getCheckoutOrderDeliveryBundleItemsDeliveryOptionsDate | getCheckoutOrderItemsDeliveryOptionsDate                         |
| getBundleDeliveryWindow                                | getCheckoutOrderDeliveryBundleWindow                             |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                           | Notes                                |
| ---------------------------------------- | ------------------------------------ |
| actionTypes.COMPLETE_PAYMENT_CHECKOUT\*¹ | Removed as its action was deprecated |
| actionTypes.UPDATE_GIFT_MESSAGE\*¹       | Removed as its action was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export            | Notes                                         |
| ------------------------- | --------------------------------------------- |
| doCompletePaymentCheckout | Removed as it was deprecated                  |
| doUpdateGiftMessage       | Use `updateCheckoutOrderItems` action instead |

##### Selectors

| Removed export                   | Notes                                                                   |
| -------------------------------- | ----------------------------------------------------------------------- |
| getCheckoutOrderItemsIds         | Use `getCheckoutOrder` selector to calculate the items ids              |
| getCheckoutOrderItems            | Use `getCheckoutOrder` selector to get the order and retrieve its items |
| isCompletePaymentCheckoutLoading | Removed as it was deprecated                                            |
| getCompletePaymentCheckoutError  | Removed as it was deprecated                                            |
| isGiftMessageLoading             | Removed as it was deprecated                                            |
| getGiftMessageError              | Removed as it was deprecated                                            |

#### Other notable changes

##### `useCheckout` hook

The `useCheckout` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a checkout feature in your apps. Prefer that instead of directly using the checkout actions/selectors.

### Contents

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                          | New name                                    |
| --------------------------------- | ------------------------------------------- |
| actionTypes                       | contentsActionTypes                         |
| actionTypes.GET_COMMERCE_PAGES\*¹ | contentsActionTypes.FETCH_COMMERCE_PAGES\*¹ |
| actionTypes.GET_CONTENT_PAGES\*¹  | contentsActionTypes.FETCH_CONTENT_PAGE\*¹   |
| actionTypes.GET_CONTENT\*¹        | contentsActionTypes.FETCH_CONTENTS\*¹       |
| actionTypes.GET_CONTENT_TYPES\*¹  | contentsActionTypes.FETCH_CONTENT_TYPES\*¹  |
| actionTypes.GET_SEO\*¹            | contentsActionTypes.FETCH_SEO_METADATA\*¹   |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                   |
| ------------------------ | -------------------------- |
| reducer (default export) | contentsReducer            |
| serverInitialState       | contentsServerInitialState |

##### Actions

| Old name           | New name                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| doGetCommercePages | fetchCommercePages (pre-configured w/ client) or fetchCommercePagesFactory |
| doGetContent       | fetchContents (pre-configured w/ client) or fetchContentsFactory           |
| doGetContentPages  | fetchContentPage (pre-configured w/ client) or fetchContentPageFactory     |
| doGetContentTypes  | fetchContentTypes (pre-configured w/ client) or fetchContentTypesFactory   |
| doGetSEO           | fetchSEOMetadata (pre-configured w/ client) or fetchSEOMetadataFactory     |

##### Selectors

| Old name               | New name             |
| ---------------------- | -------------------- |
| getContentGroupByQuery | getContentByQuery    |
| getSEOError            | getSEOMetadataError  |
| isSEOLoading           | isSEOMetadataLoading |
| getSEO                 | getSEOMetadataResult |
| getAllContentTypes     | getContentTypes      |

##### Utils

| Old name              | New name                          |
| --------------------- | --------------------------------- |
| buildContentGroupHash | generateContentHash               |
| buildSEOPathname      | generateSEOPathname               |
| ENVIRONMENT_CODES     | ContentEnvironmentCode            |
| getRankedCommercePage | applyCommercePagesRankingStrategy |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

##### Utils

| Removed export             | Notes                        |
| -------------------------- | ---------------------------- |
| stripSlugSubfolderJsonTrue | Removed as it was deprecated |

#### Other notable changes

##### `useContents` hook

The `useContents` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch content in your apps. Prefer that instead of directly using the contents actions/selectors.

### Designers

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All exports    | Removed as it should not be used. You can use the brands actions instead but you will have to create the links to each brand yourself as they not provide that as they are application-specific |

### Entities

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                   | New name                           |
| -------------------------- | ---------------------------------- |
| actionTypes                | entitiesActionTypes                |
| actionTypes.RESET_ENTITIES | entitiesActionTypes.RESET_ENTITIES |

##### Reducers

| Old name              | New name                     |
| --------------------- | ---------------------------- |
| entitiesMapperReducer | createDefaultEntitiesReducer |
| defaultMappers        | defaultEntitiesReducers      |

##### Actions

| Old name | New name      |
| -------- | ------------- |
| reset    | resetEntities |

##### Selectors

| Old name        | New name                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| getContentGroup | getContent                                                                                                                 |
| getEntity       | Split between getEntityById and getEntities selectors as mentioned in the section `Migrating from @farfetch/blackout-core` |
| getPreferences  | getUserPreferences (does not accept a preference code parameter, will return all preferences)                              |
| getUserCredit   | getUserCredits                                                                                                             |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

##### Selectors

| Removed export                  | Notes                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| getBenefit                      | Use `getUserBenefits` selector to get all benefits or `getEntityById` to get a specific benefit from the `benefits` slice |
| getOrderPayments                | Removed as it was deprecated                                                                                              |
| getRecommendedSetWithOutOfStock | Removed as it was deprecated                                                                                              |
| getSet                          | Replaced with `getProductsListResult` selector                                                                            |
| getUserMembership               | Removed as it was deprecated                                                                                              |

### Forms

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                       | New name                              |
| ------------------------------ | ------------------------------------- |
| actionTypes                    | formsActionTypes                      |
| actionTypes.GET_FORM_SCHEMA\*¹ | formsActionTypes.FETCH_FORM_SCHEMA\*¹ |
| actionTypes.RESET_SCHEMAS      | formsActionTypes.RESET_FORM_SCHEMAS   |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name     |
| ------------------------ | ------------ |
| reducer (default export) | formsReducer |

##### Actions

| Old name        | New name                                                             |
| --------------- | -------------------------------------------------------------------- |
| doGetFormSchema | fetchFormSchema (pre-configured w/ client) or fetchFormSchemaFactory |
| doPostFormData  | submitFormData (pre-configured w/ client) or submitFormDataFactory   |

### Helpers

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export                            | Notes                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| All adapters from helpers/adapters folder | They are now internal as they are not necessary to be used since they are used in selectors |
| createMergedObject                        | Removed as it is internal                                                                   |
| reducerFactory                            | Removed as it is internal                                                                   |

### Locale

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                      | New name                                        |
| ----------------------------- | ----------------------------------------------- |
| actionTypes                   | localeActionTypes                               |
| actionTypes.GET_CITIES\*¹     | localeActionTypes.FETCH_COUNTRY_STATE_CITIES\*¹ |
| actionTypes.GET_COUNTRIES\*¹  | localeActionTypes.FETCH_COUNTRIES\*¹            |
| actionTypes.GET_COUNTRY\*¹    | localeActionTypes.FETCH_COUNTRY\*¹              |
| actionTypes.GET_CURRENCIES\*¹ | localeActionTypes.FETCH_COUNTRY_CURRENCIES\*¹   |
| actionTypes.GET_STATES\*¹     | localeActionTypes.FETCH_COUNTRY_STATES\*¹       |
| actionTypes.SET_COUNTRY       | localeActionTypes.SET_COUNTRY_CODE              |
| actionTypes.RESET_LOCALE      | localeActionTypes.RESET_LOCALE_STATE            |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                 |
| ------------------------ | ------------------------ |
| reducer (default export) | localeReducer            |
| serverInitialState       | localeServerInitialState |

##### Middlewares

| Old name                         | New name                                   |
| -------------------------------- | ------------------------------------------ |
| middlewares                      | localeMiddlewares                          |
| middlewares.setCountryMiddleware | localeMiddlewares.setCountryCodeMiddleware |

##### Actions

| Old name        | New name                                                                             |
| --------------- | ------------------------------------------------------------------------------------ |
| doGetCities     | fetchCountryStateCities (pre-configured w/ client) or fetchCountryStateCitiesFactory |
| doGetCountries  | fetchCountries (pre-configured w/ client) or fetchCountriesFactory                   |
| doGetCountry    | fetchCountry (pre-configured w/ client) or fetchCountryFactory                       |
| doGetCurrencies | fetchCountryCurrencies (pre-configured w/ client) or fetchCountryCurrenciesFactory   |
| doGetStates     | fetchCountryStates (pre-configured w/ client) or fetchCountryStatesFactory           |
| doSetCountry    | setCountryCode                                                                       |

##### Selectors

| Old name                   | New name                     |
| -------------------------- | ---------------------------- |
| getCurrenciesByCountryCode | getCountryCurrencies         |
| getCurrencyCode            | getCountryCurrencyCode       |
| getCultureCode             | getCountryCulture            |
| getCitiesError             | getCountryStateCitiesError   |
| areCitiesLoading           | areCountryStateCitiesLoading |
| getCurrenciesError         | getCountryCurrenciesError    |
| areCurrenciesLoading       | areCountryCurrenciesLoading  |
| getStatesError             | getCountryStatesError        |
| areStatesLoading           | areCountryStatesLoading      |
| getCitiesByStateId         | getCountryStateCities        |
| getStatesByCountryCode     | getCountryStates             |

#### Other notable changes

##### `getSubfolder` selector was added

You can now use the new `getSubfolder` selector to retrieve the subfolder in use. Please note that the value returned from this selector will include the leading `/`.

##### `getSourceCountryCode` selector was added

You can now use the new `getSourceCountryCode` selector to retrieve the source country code, i.e., the country code that was used in the original request which might be different (for example, if there was a redirect to another subfolder) than the current `countryCode` returned from `getCountryCode`.

##### `useLocale` hook

The `useLocale` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch locale information in your apps. Prefer that instead of directly using the locale actions/selectors.

### Loyalty

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                              | New name                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| actionTypes                                           | loyaltyActionTypes                                          |
| actionTypes.GET_PROGRAMS\*¹                           | loyaltyActionTypes.FETCH_PROGRAMS\*¹                        |
| actionTypes.REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT\*¹ | loyaltyActionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT\*¹ |
| actionTypes.GET_PROGRAM_MEMBERSHIP_STATEMENTS\*¹      | loyaltyActionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS\*¹   |
| actionTypes.GET_PROGRAM_USERS_MEMBERSHIP\*¹           | loyaltyActionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP\*¹        |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name       |
| ------------------------ | -------------- |
| reducer (default export) | loyaltyReducer |

##### Actions

| Old name                              | New name                                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| doCreateProgramMembership             | createProgramMembership (pre-configured w/ client) or createProgramMembershipFactory                       |
| doCreateProgramMembershipConvert      | createProgramMembershipConvert (pre-configured w/ client) or createProgramMembershipConvertFactory         |
| doGetProgramMembershipStatements      | fetchProgramMembershipStatements (pre-configured w/ client) or fetchProgramMembershipStatementsFactory     |
| doGetProgramUsersMembership           | fetchProgramUsersMembership (pre-configured w/ client) or fetchProgramUsersMembershipFactory               |
| doGetPrograms                         | fetchPrograms (pre-configured w/ client) or fetchProgramsFactory                                           |
| doRequestProgramMembershipReplacement | createProgramMembershipReplacement (pre-configured w/ client) or createProgramMembershipReplacementFactory |

##### Selectors

| Old name              | New name                                |
| --------------------- | --------------------------------------- |
| isProgramsLoading     | areProgramsLoading                      |
| getMembership         | getProgramMembership                    |
| getMembershipError    | getProgramMembershipError               |
| getMembershipResult   | getProgramMembershipResult              |
| isMembershipLoading   | isProgramMembershipLoading              |
| getReplacements       | getProgramMembershipReplacements        |
| getReplacementsError  | getProgramMembershipReplacementsError   |
| getReplacementsResult | getProgramMembershipReplacementsResult  |
| isReplacementsLoading | areProgramMembershipReplacementsLoading |
| getConverts           | getProgramMembershipConverts            |
| getConvertsError      | getProgramMembershipConvertsError       |
| getConvertsResult     | getProgramMembershipConvertsResult      |
| isConvertsLoading     | areProgramMembershipConvertsLoading     |
| getStatements         | getProgramMembershipStatements          |
| getStatementsError    | getProgramMembershipStatementsError     |
| getStatementsResult   | getProgramMembershipStatementsResult    |
| isStatementsLoading   | areProgramMembershipStatementsLoading   |

### Management

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                            |
| -------------- | -------------------------------- |
| All exports    | Removed from this package' scope |

### Merchants locations

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                               | New name                                                      |
| -------------------------------------- | ------------------------------------------------------------- |
| actionTypes                            | merchantsLocationsActionTypes                                 |
| actionTypes.GET_MERCHANTS_LOCATIONS\*¹ | merchantsLocationsActionTypes.FETCH_MERCHANTS_LOCATIONS\*¹    |
| actionTypes.RESET_MERCHANTS_LOCATIONS  | merchantsLocationsActionTypes.RESET_MERCHANTS_LOCATIONS_STATE |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                         |
| ------------------------ | -------------------------------- |
| reducer (default export) | merchantsLocationsReducer        |
| entitiesMapper           | merchantsLocationsEntitiesMapper |

##### Actions

| Old name                | New name                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------ |
| doGetMerchantsLocations | fetchMerchantsLocations (pre-configured w/ client) or fetchMerchantsLocationsFactory |

##### Selectors

| Old name              | New name                   |
| --------------------- | -------------------------- |
| getMerchantsLocations | getMerchantsLocationsByIds |

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

##### Selectors

| Removed export           | Notes                                        |
| ------------------------ | -------------------------------------------- |
| getAllMerchantsLocations | Use `getMerchantsLocations` selector instead |

### Orders

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                            | New name                                                    |
| --------------------------------------------------- | ----------------------------------------------------------- |
| actionTypes                                         | ordersActionTypes                                           |
| actionTypes.GET_ORDER_DETAILS\*¹                    | ordersActionTypes.FETCH_ORDER\*¹                            |
| actionTypes.GET_ORDER_RETURN_OPTIONS\*¹             | ordersActionTypes.FETCH_ORDER_RETURN_OPTIONS\*¹             |
| actionTypes.GET_ORDERS\*¹                           | ordersActionTypes.FETCH_USER_ORDERS\*¹                      |
| actionTypes.GET_TRACKINGS\*¹                        | ordersActionTypes.FETCH_SHIPMENT_TRACKINGS\*¹               |
| actionTypes.GET_ORDER_DOCUMENTS\*¹                  | ordersActionTypes.FETCH_ORDER_DOCUMENTS\*¹                  |
| actionTypes.GET_ORDER_DOCUMENT\*¹                   | ordersActionTypes.FETCH_ORDER_DOCUMENT\*¹                   |
| actionTypes.GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES\*¹ | ordersActionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES\*¹ |
| actionTypes.GET_ORDER_ITEM_AVAILABLE_ACTIVITIES\*¹  | ordersActionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES\*¹  |
| actionTypes.POST_ORDER_DOCUMENT\*¹                  | ordersActionTypes.ADD_ORDER_DOCUMENT\*¹                     |
| actionTypes.POST_ORDER_ITEM_ACTIVITIES\*¹           | ordersActionTypes.ADD_ORDER_ITEM_ACTIVITY\*¹                |
| actionTypes.RESET_ORDERS                            | ordersActionTypes.RESET_ORDERS                              |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name             |
| ------------------------ | -------------------- |
| reducer (default export) | ordersReducer        |
| entitiesMapper           | ordersEntitiesMapper |

##### Actions

| Old name                           | New name                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| doGetOrderAvailableItemsActivities | fetchOrderAvailableItemsActivities (pre-configured w/ client) or fetchOrderAvailableItemsActivitiesFactory |
| doGetOrderDetails                  | fetchOrder (pre-configured w/ client) or fetchOrderFactory                                                 |
| doGetOrderDetailsGuestUser         | fetchGuestOrderLegacy (pre-configured w/ client) or fetchGuestOrderLegacyFactory                           |
| doGetOrderDocument                 | fetchOrderDocument (pre-configured w/ client) or fetchOrderDocumentFactory                                 |
| doGetOrderDocuments                | fetchOrderDocuments (pre-configured w/ client) or fetchOrderDocumentsFactory                               |
| doGetOrderItemAvailableActivities  | fetchOrderItemAvailableActivities (pre-configured w/ client) or fetchOrderItemAvailableActivitiesFactory   |
| doGetOrderReturnOptions            | fetchOrderReturnOptions (pre-configured w/ client) or fetchOrderReturnOptionsFactory                       |
| doGetOrders                        | fetchUserOrders (pre-configured w/ client) or fetchUserOrdersFactory                                       |
| doGetTracking                      | fetchShipmentTrackings (pre-configured w/ client) or fetchShipmentTrackingsFactory                         |
| doPostOrderDocument                | addOrderDocument (pre-configured w/ client) or addOrderDocumentFactory                                     |
| doPostOrderItemActivities          | addOrderItemActivity (pre-configured w/ client) or addOrderItemActivityFactory                             |
| doResetOrders                      | resetOrders                                                                                                |

##### Selectors

| Old name                              | New name                                |
| ------------------------------------- | --------------------------------------- |
| isOrdersLoading                       | areUserOrdersLoading                    |
| getOrdersError                        | getUserOrdersError                      |
| getLabelTracking                      | getShipmentTrackingLabel                |
| getOrdersPagination                   | getUserOrdersResult                     |
| getReturnOptionsFromOrder             | getOrderReturnOptions                   |
| isOrdersListLoading                   | areUserOrdersLoading                    |
| getOrdersListError                    | getUserOrdersError                      |
| isOrderDetailsLoading                 | isOrderLoading                          |
| getOrderDetailsError                  | getOrderError                           |
| isOrderReturnOptionsLoading           | areOrderReturnOptionsLoading            |
| isTrackingsLoading                    | areShipmentTrackingsLoading             |
| getTrackingsError                     | getShipmentTrackingsError               |
| isDocumentsLoading                    | areOrderDocumentsLoading                |
| getDocumentsError                     | getOrderDocumentsError                  |
| isAvailableItemsActivitiesLoading     | areOrderAvailableItemsActivitiesLoading |
| isAvailableItemsActivitiesLoading     | areOrderAvailableItemsActivitiesLoading |
| getAvailableItemsActivitiesError      | getOrderAvailableItemsActivitiesError   |
| isOrderItemAvailableActivitiesLoading | areOrderItemAvailableActivitiesLoading  |
| getOrderItemQuantity                  | getOrderProductQuantity                 |
| getOrderItemsByMerchant               | getOrderItemsByMerchantOrderCode¹       |

¹ The selector `getOrderItemsByMerchantOrderCode` returns the order items indexed by merchant order code now and not by merchant id as in the previous `getOrderItemsByMerchant` selector.

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                                             | Notes                                                                                                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| actionTypes.GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS\*¹  | Use `getOrderShippingAddressChangeRequests` client from `@farfetch/blackout-client` directly as this data is not stored in redux anymore |
| actionTypes.POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS\*¹ | Use `postOrderShippingAddressChangeRequest` client from `@farfetch/blackout-client` directly as this data is not stored in redux anymore |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export                           | Notes                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| doGetOrderShippingAddressChangeRequests  | Use `getOrderShippingAddressChangeRequests` client from `@farfetch/blackout-client` directly as this data is not stored in redux anymore |
| doPostOrderShippingAddressChangeRequests | Use `postOrderShippingAddressChangeRequest` client from `@farfetch/blackout-client` directly as this data is not stored in redux anymore |

##### Selectors

| Removed export        | Notes                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| getMerchantsFromOrder | Use `getOrder` selector and derive the merchants from the order items                 |
| getOrderItemsByOrder  | Use `getOrder` selector which will return the order items inside the `items` property |
| getOrderShipments     | Use `getOrder` and `getOrderSummaries` to obtain the same information                 |

#### Other notable changes

##### `useUserOrders` hook

The `useUserOrders` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a user orders feature in your apps. Prefer that instead of directly using the orders actions/selectors.

### Payments

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                                   | New name                                                             |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| actionTypes                                                | paymentsActionTypes                                                  |
| actionTypes.DELETE_INSTRUMENT\*¹                           | paymentsActionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT\*¹              |
| actionTypes.DELETE_PAYMENT_TOKEN\*¹                        | paymentsActionTypes.REMOVE_PAYMENT_TOKEN\*¹                          |
| actionTypes.GET_CHARGES\*¹                                 | paymentsActionTypes.FETCH_PAYMENT_INTENT_CHARGE\*¹                   |
| actionTypes.GET_INSTRUMENT\*¹                              | paymentsActionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT\*¹               |
| actionTypes.GET_INSTRUMENTS\*¹                             | paymentsActionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS\*¹              |
| actionTypes.GET_INTENT\*¹                                  | paymentsActionTypes.FETCH_PAYMENT_INTENT\*¹                          |
| actionTypes.GET_PAYMENT_TOKENS\*¹                          | paymentsActionTypes.FETCH_PAYMENT_TOKENS\*¹                          |
| actionTypes.GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY\*¹ | paymentsActionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY\*¹ |
| actionTypes.GET_PAYMENT_METHODS_BY_INTENT\*¹               | paymentsActionTypes.FETCH_PAYMENT_METHODS_BY_INTENT\*¹               |
| actionTypes.POST_CHARGES\*¹                                | paymentsActionTypes.CREATE_PAYMENT_INTENT_CHARGE\*¹                  |
| actionTypes.POST_CREDIT_BALANCE\*¹                         | paymentsActionTypes.FETCH_USER_CREDIT_BALANCE\*¹                     |
| actionTypes.POST_GIFT_CARD_BALANCE\*¹                      | paymentsActionTypes.FETCH_GIFT_CARD_BALANCE\*¹                       |
| actionTypes.POST_INSTRUMENT\*¹                             | paymentsActionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT\*¹              |
| actionTypes.POST_PAYMENTS\*¹                               | paymentsActionTypes.CREATE_PAYMENT_INTENT_CHARGE\*¹                  |
| actionTypes.PUT_INSTRUMENT\*¹                              | paymentsActionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT\*¹              |
| actionTypes.RESET_CHARGES                                  | paymentsActionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE                |
| actionTypes.RESET_INSTRUMENTS                              | paymentsActionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE           |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name               |
| ------------------------ | ---------------------- |
| reducer (default export) | paymentsReducer        |
| entitiesMapper           | paymentsEntitiesMapper |

##### Actions

| Old name                                | New name                                                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| doDeleteInstrument                      | removePaymentIntentInstrument (pre-configured w/ client) or removePaymentIntentInstrumentFactory                     |
| doDeletePaymentToken                    | removePaymentToken (pre-configured w/ client) or removePaymentTokenFactory                                           |
| doGetCharges                            | fetchPaymentIntentCharge (pre-configured w/ client) or fetchPaymentIntentChargeFactory                               |
| doGetInstrument                         | fetchPaymentIntentInstrument (pre-configured w/ client) or fetchPaymentIntentInstrumentFactory                       |
| doGetInstruments                        | fetchPaymentIntentInstruments (pre-configured w/ client) or fetchPaymentIntentInstrumentsFactory                     |
| doGetIntent                             | fetchPaymentIntent (pre-configured w/ client) or fetchPaymentIntentFactory                                           |
| doGetPaymentMethodsByCountryAndCurrency | fetchPaymentMethodsByCountryAndCurrency (pre-configured w/ client) or fetchPaymentMethodsByCountryAndCurrencyFactory |
| doGetPaymentMethodsByIntent             | fetchPaymentMethodsByIntent (pre-configured w/ client) or fetchPaymentMethodsByIntentFactory                         |
| doGetPaymentTokens                      | fetchPaymentTokens (pre-configured w/ client) or fetchPaymentTokensFactory                                           |
| doPostCharges                           | createPaymentIntentCharge (pre-configured w/ client) or createPaymentIntentChargeFactory                             |
| doPostCreditBalance                     | fetchUserCreditBalance (pre-configured w/ client) or fetchUserCreditBalanceFactory                                   |
| doPostGiftCardBalance                   | fetchGiftCardBalance (pre-configured w/ client) or fetchGiftCardBalanceFactory                                       |
| doPostInstruments                       | createPaymentIntentInstrument (pre-configured w/ client) or createPaymentIntentInstrumentFactory                     |
| doPostPayments                          | createPaymentIntentCharge (pre-configured w/ client) or createPaymentIntentChargeFactory                             |
| doPutInstruments                        | updatePaymentIntentInstrument (pre-configured w/ client) or updatePaymentIntentInstrumentFactory                     |
| doResetInstruments                      | resetPaymentIntentInstruments                                                                                        |

##### Selectors

| Old name               | New name                           |
| ---------------------- | ---------------------------------- |
| isPaymentTokensLoading | arePaymentTokensLoading            |
| getInstrument          | getPaymentIntentInstrument         |
| getInstruments         | getPaymentIntentInstruments        |
| isInstrumentsLoading   | arePaymentIntentInstrumentsLoading |
| getInstrumentsError    | getPaymentIntentInstrumentsError   |
| getInstrumentsResult   | getPaymentIntentInstrumentsResult  |
| isCreditBalanceLoading | isUserCreditBalanceLoading         |
| getCreditBalanceError  | getUserCreditBalanceError          |
| getCreditBalanceResult | getUserCreditBalanceResult         |
| isIntentLoading        | isPaymentIntentLoading             |
| getIntentError         | getPaymentIntentError              |
| getIntentResult        | getPaymentIntentResult             |
| isChargesLoading       | isPaymentIntentChargeLoading       |
| getChargesError        | getPaymentIntentChargeError        |
| getChargesResult       | getPaymentIntentChargeResult       |
| getChargesResult       | getPaymentIntentChargeResult       |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                        | Notes                        |
| ------------------------------------- | ---------------------------- |
| actionTypes.GET_PAYMENT_METHODS\*¹    | Removed as it was deprecated |
| actionTypes.GET_TRANSACTION\*¹        | Removed as it was deprecated |
| actionTypes.POST_APPLE_PAY_SESSION\*¹ | Removed as it was deprecated |
| actionTypes.POST_TRANSACTION\*¹       | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export        | Notes                                                                         |
| --------------------- | ----------------------------------------------------------------------------- |
| doGetPaymentMethods   | Use `fetchCheckoutOrder` action and pass the query parameter `paymentMethods` |
| doGetTransaction      | Removed as it was deprecated                                                  |
| doPayTransaction      | Removed as it was deprecated                                                  |
| doPostApplePaySession | Removed as it was deprecated                                                  |

##### Selectors

| Removed export           | Notes                        |
| ------------------------ | ---------------------------- |
| getOrderPaymentsEntity   | Removed as it was deprecated |
| isOrderPaymentsLoading   | Removed as it was deprecated |
| getOrderPaymentsError    | Removed as it was deprecated |
| isTransactionLoading     | Removed as it was deprecated |
| getTransactionError      | Removed as it was deprecated |
| getTransactionResult     | Removed as it was deprecated |
| isPaymentMethodsLoading  | Removed as it was deprecated |
| getPaymentMethodsError   | Removed as it was deprecated |
| getPaymentMethodsResult  | Removed as it was deprecated |
| isApplePaySessionLoading | Removed as it was deprecated |
| getApplePaySessionError  | Removed as it was deprecated |
| getApplePaySessionResult | Removed as it was deprecated |

### Products/Details

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                       | New name                                                 |
| ---------------------------------------------- | -------------------------------------------------------- |
| actionTypes                                    | productsActionTypes                                      |
| actionTypes.DEHYDRATE_PRODUCT_DETAILS          | productsActionTypes.DEHYDRATE_PRODUCT_DETAILS            |
| actionTypes.GET_MEASUREMENTS\*¹                | productsActionTypes.FETCH_PRODUCT_MEASUREMENTS\*¹        |
| actionTypes.GET_PRODUCT_ATTRIBUTES\*¹          | productsActionTypes.FETCH_PRODUCT_ATTRIBUTES\*¹          |
| actionTypes.GET_PRODUCT_DETAILS\*¹             | productsActionTypes.FETCH_PRODUCT_DETAILS\*¹             |
| actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS\*¹ | productsActionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS\*¹ |
| actionTypes.GET_PRODUCT_OUTFITS\*¹             | productsActionTypes.FETCH_PRODUCT_OUTFITS\*¹             |
| actionTypes.GET_PRODUCT_SIZEGUIDES\*¹          | productsActionTypes.FETCH_PRODUCT_SIZEGUIDES\*¹          |
| actionTypes.GET_PRODUCT_SIZES\*¹               | productsActionTypes.FETCH_PRODUCT_SIZES\*¹               |
| actionTypes.GET_SIZESCALE\*¹                   | productsActionTypes.FETCH_SIZE_SCALE\*¹                  |
| actionTypes.GET_RECOMMENDED_SET\*¹             | productsActionTypes.FETCH_RECOMMENDED_PRODUCT_SET\*¹     |
| actionTypes.GET_SET\*¹                         | productsActionTypes.FETCH_PRODUCTS_LIST\*¹               |
| actionTypes.RESET_DETAILS_ENTITIES             | productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES       |
| actionTypes.RESET_DETAILS_STATE                | productsActionTypes.RESET_PRODUCT_DETAILS_STATE          |
| actionTypes.GET_PRODUCT_GROUPING\*¹            | productsActionTypes.FETCH_PRODUCT_GROUPING\*¹            |
| actionTypes.GET_PRODUCT_GROUPING_PROPERTIES\*¹ | productsActionTypes.FETCH_PRODUCT_GROUPING_PROPERTIES\*¹ |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                   |
| ------------------------ | -------------------------- |
| reducer (default export) | productsReducer            |
| entitiesMapper           | productsEntitiesMapper     |
| serverInitialState       | productsServerInitialState |

##### Actions

| Old name                       | New name                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| doGetMeasurements              | fetchProductMeasurements (pre-configured w/ client) or fetchProductMeasurementsFactory                                 |
| doGetProductAttributes         | fetchProductAttributes (pre-configured w/ client) or fetchProductAttributesFactory                                     |
| doGetProductDetails            | fetchProductDetails (pre-configured w/ client) or fetchProductDetailsFactory                                           |
| doGetProductGrouping           | fetchProductGrouping (pre-configured w/ client) or fetchProductGroupingFactory                                         |
| doGetProductGroupingProperties | fetchProductGroupingProperties (pre-configured w/ client) or fetchProductGroupingPropertiesFactory                     |
| doGetProductMerchantsLocations | fetchProductVariantsByMerchantsLocations (pre-configured w/ client) or fetchProductVariantsByMerchantsLocationsFactory |
| doGetProductOutfits            | fetchProductOutfits (pre-configured w/ client) or fetchProductOutfitsFactory                                           |
| doGetProductSizeguides         | fetchProductSizeGuides (pre-configured w/ client) or fetchProductSizeGuidesFactory                                     |
| doGetProductSizes              | fetchProductSizes (pre-configured w/ client) or fetchProductSizesFactory                                               |
| doGetRecommendedSet            | fetchRecommendedProductSet (pre-configured w/ client) or fetchRecommendedProductSetFactory                             |
| doGetSet                       | fetchProductSet (pre-configured w/ client) or fetchProductSetFactory                                                   |
| doGetSizeScale                 | fetchSizeScale (pre-configured w/ client) or fetchSizeScaleFactory                                                     |
| reset                          | resetProductDetails                                                                                                    |

##### Selectors

| Old name                            | New name                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------ |
| isProductGroupingPropertiesLoading  | areProductGroupingPropertiesLoading                                      |
| areProductMerchantsLocationsLoading | areProductVariantsByMerchantsLocationsLoading                            |
| areProductMerchantsLocationsFetched | areProductVariantsByMerchantsLocationsFetched                            |
| getProductMerchantsLocationsError   | getProductVariantsByMerchantsLocationsError                              |
| getProductMerchantsLocations        | getProductVariantsByMerchantsLocations                                   |
| createGetProductRemainingQuantity   | getProductSizeRemainingQuantity                                          |
| isRecommendedSetLoading             | isRecommendedProductSetLoading                                           |
| isRecommendedSetFetched             | isRecommendedProductSetFetched                                           |
| getRecommendedSetError              | getRecommendedProductSetError                                            |
| isSetLoading                        | isProductListingLoading (sets now use same selector as product listings) |
| isSetFetched                        | isProductListingFetched (sets now use same selector as product listings) |
| getSetError                         | getProductListingError (sets now use same selector as product listings)  |
| areProductSizeguidesFetched         | areProductSizeGuidesFetched                                              |
| getProductSizeguideError            | getProductSizeGuidesError                                                |
| getProductSizeguide                 | getProductSizeGuide                                                      |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### HOCs

| Removed export     | Notes                        |
| ------------------ | ---------------------------- |
| withProductActions | Removed as it was deprecated |

##### Utils

| Removed export               | Notes                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| sortStocksByPreferedMerchant | Removed as it is unnecessary since size stocks already come sorted |

##### Action types

| Removed export                                | Notes                        |
| --------------------------------------------- | ---------------------------- |
| actionTypes.GET_COLOR_GROUPING\*¹             | Removed as it was deprecated |
| actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS\*¹ | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export                    | Notes                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| doGetColorGrouping                | Use `fetchProductGrouping` action instead which will fetch all groupings including colors |
| doGetRecommendedSetWithOutOfStock | Use `fetchRecommendedProductSet` action instead                                           |
| resetState                        | Use `resetProductDetails` action instead                                                  |

##### Selectors

| Removed export                          | Notes                                                                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isProductColorGroupingLoading           | Removed as it was deprecated                                                                                                                                          |
| getProductColorGroupingError            | Removed as it was deprecated                                                                                                                                          |
| getProductColorGroupingCurrentPageIndex | Removed as it was deprecated                                                                                                                                          |
| getProductColorGrouping                 | Removed as it was deprecated                                                                                                                                          |
| getDigitalAssetsFromColorGrouping       | Removed as it was deprecated                                                                                                                                          |
| getColorGroupingByPageIndex             | Removed as it was deprecated                                                                                                                                          |
| getColorGroupingTotalPages              | Removed as it was deprecated                                                                                                                                          |
| isProductWithColorGrouping              | Removed as it was deprecated                                                                                                                                          |
| getProductGroupingCurrentPageIndex      | Removed as it was deprecated                                                                                                                                          |
| getDigitalAssetsFromGrouping            | Removed as it was deprecated                                                                                                                                          |
| getGroupingByPageIndex                  | Removed as it was deprecated                                                                                                                                          |
| getGroupingTotalPages                   | Removed as it was deprecated                                                                                                                                          |
| isProductWithGrouping                   | Removed as it was deprecated                                                                                                                                          |
| isRecommendedSetWithOutOfStockLoading   | Removed as it was deprecated                                                                                                                                          |
| isRecommendedSetWithOutOfStockFetched   | Removed as it was deprecated                                                                                                                                          |
| getRecommendedSetWithOutOfStockError    | Removed as it was deprecated                                                                                                                                          |
| getProductSizeScaleId                   | Use `getProduct` selector which will include the property `scaleId`                                                                                                   |
| isProductSizeScaleLoading               | Use `isSizeScaleLoading` selector instead with the `scaleId` property of the product                                                                                  |
| isProductSizeScaleFetched               | Use `isSizeScaleFetched` selector instead with the `scaleId` property of the product                                                                                  |
| getProductSizeScale                     | Use `getSizeScale` selector instead with the `scaleId` property of the product                                                                                        |
| getProductSizeScaleError                | Use `getSizeScalesError` selector instead with the `scaleId` property of the product                                                                                  |
| getProductRecommendedSetId              | Use `getRecommendedProductSet` selector instead by passing the recommended product set id you would obtain from the `recommendedSet` prop in product details response |

#### Other notable changes

##### `useProductDetails` hook

The `useProductDetails` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch product details information in your apps. Prefer that instead of directly using the product details actions/selectors.

### Products/Listing

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                           | New name                                           |
| ---------------------------------- | -------------------------------------------------- |
| actionTypes                        | productsActionTypes                                |
| actionTypes.DEHYDRATE_LISTING      | productsActionTypes.DEHYDRATE_PRODUCT_LISTING      |
| actionTypes.GET_LISTING\*¹         | productsActionTypes.FETCH_PRODUCT_LISTING\*¹       |
| actionTypes.RESET_LISTING_ENTITIES | productsActionTypes.RESET_PRODUCT_LISTING_ENTITIES |
| actionTypes.RESET_LISTING_STATE    | productsActionTypes.RESET_PRODUCT_LISTINGS_STATE   |
| actionTypes.SET_LISTING_HASH       | productsActionTypes.SET_PRODUCT_LISTING_HASH       |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                   |
| ------------------------ | -------------------------- |
| reducer (default export) | productsReducer            |
| entitiesMapper           | productsEntitiesMapper     |
| serverInitialState       | productsServerInitialState |

##### Actions

| Old name     | New name                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| doGetListing | fetchProductListing (pre-configured w/ client) or fetchProductListingFactory |
| reset        | resetProductListings                                                         |

##### Selectors

| Old name                       | New name                                |
| ------------------------------ | --------------------------------------- |
| getListingHash                 | getProductListingHash                   |
| getListingError                | getProductListingError                  |
| isListingHydrated              | isProductListingHydrated                |
| isListingLoading               | isProductListingLoading                 |
| getListingResult               | getProductListingResult                 |
| getListingProductsIds          | getProductListingProductsIds            |
| getListingProducts             | getProductListingProducts               |
| getListingPagination           | getProductListingPagination             |
| getListingBreadcrumbs          | getProductListingBreadcrumbs            |
| getListingGroupedEntries       | getProductGroupedEntries                |
| isListingInCache               | isProductListingCached                  |
| getListingActiveFilters        | getProductListingActiveFilters          |
| getListingSelectedFiltersCount | getProductListingSelectedFiltersCount   |
| getListingSort                 | getProductListingSort                   |
| getFacetsGroupsByType          | getProductListingFacetGroupsByType      |
| getFacetsByFacetGroupType      | getProductListingFacetsByFacetGroupType |

##### Utils

| Old name           | New name                      |
| ------------------ | ----------------------------- |
| buildFacetChildren | buildFacetTree                |
| buildListingHash   | generateProductListingHash    |
| buildSetFilters    | buildSetFiltersQueryParams    |
| buildUnsetFilters  | buildUnsetFiltersQueryParams  |
| getMaxDepth        | getFacetGroupsMaxDepth        |
| getShallowestDepth | getFacetGroupsShallowestDepth |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Actions

| Removed export   | Notes                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| doGetNextListing | Removed as it was deprecated. The same functionality can be replicated with `fetchProductListing` action |
| resetState       | Use `resetProductListings` instead                                                                       |

##### Selectors

| Removed export               | Notes                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| isNextListingLoading         | Removed as it was deprecated                                                           |
| isInfiniteListingLoading     | Removed as it was deprecated                                                           |
| getRedirectUrl               | Use `getProductsListResult` selector which contains the property `redirectInformation` |
| getListingActiveFiltersCount | Removed as it was deprecated                                                           |

#### Other notable changes

##### `useProductListing` hook

The `useProductListing` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch product listing information in your apps. Prefer that instead of directly using the product listing actions/selectors.

### Profile

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                     | New name                                           |
| -------------------------------------------- | -------------------------------------------------- |
| actionTypes                                  | usersActionTypes                                   |
| actionTypes.GET_PROFILE\*¹                   | usersActionTypes.FETCH_USER\*¹                     |
| actionTypes.UPDATE_PROFILE\*¹                | usersActionTypes.UPDATE_USER\*¹                    |
| actionTypes.GET_BENEFITS\*¹                  | usersActionTypes.FETCH_USER_BENEFITS\*¹            |
| actionTypes.GET_PREFERENCES\*¹               | usersActionTypes.FETCH_USER_PREFERENCES\*¹         |
| actionTypes.UPDATE_PREFERENCES\*¹            | usersActionTypes.UPDATE_USER_PREFERENCES\*¹        |
| actionTypes.GET_TITLES\*¹                    | usersActionTypes.FETCH_USER_TITLES\*¹              |
| actionTypes.GET_CREDIT\*¹                    | usersActionTypes.FETCH_USER_CREDITS\*¹             |
| actionTypes.GET_CONTACT\*¹                   | usersActionTypes.FETCH_USER_CONTACT\*¹             |
| actionTypes.CREATE_CONTACT\*¹                | usersActionTypes.CREATE_USER_CONTACT\*¹            |
| actionTypes.UPDATE_CONTACT\*¹                | usersActionTypes.UPDATE_USER_CONTACT\*¹            |
| actionTypes.DELETE_CONTACT\*¹                | usersActionTypes.REMOVE_USER_CONTACT\*¹            |
| actionTypes.GET_CONTACTS\*¹                  | usersActionTypes.FETCH_USER_CONTACTS\*¹            |
| actionTypes.GET_CREDIT_MOVEMENTS\*¹          | usersActionTypes.FETCH_USER_CREDIT_MOVEMENTS\*¹    |
| actionTypes.CREATE_GUEST_USER\*¹             | usersActionTypes.CREATE_GUEST_USER\*¹              |
| actionTypes.GET_GUEST_USER\*¹                | usersActionTypes.FETCH_GUEST_USER\*¹               |
| actionTypes.GET_USER_ATTRIBUTES\*¹           | usersActionTypes.FETCH_USER_ATTRIBUTES\*¹          |
| actionTypes.POST_USER_ATTRIBUTES\*¹          | usersActionTypes.CREATE_USER_ATTRIBUTES\*¹         |
| actionTypes.GET_USER_ATTRIBUTE\*¹            | usersActionTypes.FETCH_USER_ATTRIBUTE\*¹           |
| actionTypes.PUT_USER_ATTRIBUTE\*¹            | usersActionTypes.SET_USER_ATTRIBUTE\*¹             |
| actionTypes.PATCH_USER_ATTRIBUTE\*¹          | usersActionTypes.UPDATE_USER_ATTRIBUTE\*¹          |
| actionTypes.DELETE_USER_ATTRIBUTE\*¹         | usersActionTypes.REMOVE_USER_ATTRIBUTE\*¹          |
| actionTypes.POST_PHONE_NUMBER_VALIDATIONS\*¹ | usersActionTypes.CREATE_PHONE_NUMBER_VALIDATION\*¹ |
| actionTypes.POST_PHONE_TOKEN\*¹              | usersActionTypes.CREATE_PHONE_TOKEN\*¹             |
| actionTypes.POST_PHONE_TOKEN_VALIDATIONS\*¹  | usersActionTypes.CREATE_PHONE_TOKEN_VALIDATION\*¹  |
| actionTypes.GET_PERSONAL_IDS\*¹              | usersActionTypes.FETCH_USER_PERSONAL_IDS\*¹        |
| actionTypes.POST_PERSONAL_IDS\*¹             | usersActionTypes.CREATE_USER_PERSONAL_ID\*¹        |
| actionTypes.GET_DEFAULT_PERSONAL_ID\*¹       | usersActionTypes.FETCH_USER_PERSONAL_ID\*¹         |
| actionTypes.PUT_DEFAULT_PERSONAL_ID\*¹       | usersActionTypes.SET_USER_DEFAULT_PERSONAL_ID\*¹   |
| actionTypes.POST_PERSONAL_ID_IMAGE\*¹        | usersActionTypes.CREATE_USER_PERSONAL_ID_IMAGE\*¹  |
| actionTypes.GET_PERSONAL_ID\*¹               | usersActionTypes.FETCH_USER_PERSONAL_ID\*¹         |
| actionTypes.PATCH_PERSONAL_ID\*¹             | usersActionTypes.UPDATE_USER_PERSONAL_ID\*¹        |
| actionTypes.DELETE_PERSONAL_ID\*¹            | usersActionTypes.REMOVE_USER_PERSONAL_ID\*¹        |
| actionTypes.GET_USER_BENEFITS\*¹             | usersActionTypes.FETCH_USER_BENEFITS\*¹            |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name            |
| ------------------------ | ------------------- |
| reducer (default export) | usersReducer        |
| entitiesMapper           | usersEntitiesMapper |

##### Actions

| Old name                     | New name                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| doCreateContact              | createUserContact (pre-configured w/ client) or createUserContactFactory                     |
| doCreateGuestUser            | createGuestUser (pre-configured w/ client) or createGuestUserFactory                         |
| doDeleteContact              | removeUserContact (pre-configured w/ client) or removeUserContactFactory                     |
| doDeletePersonalId           | removeUserPersonalId (pre-configured w/ client) or removeUserPersonalIdFactory               |
| doDeleteUserAttribute        | removeUserAttribute (pre-configured w/ client) or removeUserAttributeFactory                 |
| doGetBenefits                | fetchUserBenefits (pre-configured w/ client) or fetchUserBenefitsFactory                     |
| doGetContact                 | fetchUserContact (pre-configured w/ client) or fetchUserContactFactory                       |
| doGetContacts                | fetchUserContacts (pre-configured w/ client) or fetchUserContactsFactory                     |
| doGetCredit                  | fetchUserCredits (pre-configured w/ client) or fetchUserCreditsFactory                       |
| doGetCreditMovements         | fetchUserCreditMovements (pre-configured w/ client) or fetchUserCreditMovementsFactory       |
| doGetDefaultPersonalId       | fetchUserDefaultPersonalId (pre-configured w/ client) or fetchUserDefaultPersonalIdFactory   |
| doGetGuestUser               | fetchGuestUser (pre-configured w/ client) or fetchGuestUserFactory                           |
| doGetPersonalId              | fetchUserPersonalId (pre-configured w/ client) or fetchUserPersonalIdFactory                 |
| doGetPersonalIds             | fetchUserPersonalIds (pre-configured w/ client) or fetchUserPersonalIdsFactory               |
| doGetPreferences             | fetchUserPreferences (pre-configured w/ client) or fetchUserPreferencesFactory               |
| doGetProfile                 | fetchUser¹ (pre-configured w/ client) or fetchUserFactory                                    |
| doGetTitles                  | fetchUserTitles (pre-configured w/ client) or fetchUserTitlesFactory                         |
| doGetUserAttribute           | fetchUserAttribute (pre-configured w/ client) or fetchUserAttributeFactory                   |
| doGetUserAttributes          | fetchUserAttributes (pre-configured w/ client) or fetchUserAttributesFactory                 |
| doGetUserBenefits            | fetchUserBenefits (pre-configured w/ client) or fetchUserBenefitsFactory                     |
| doPatchPersonalId            | updateUserPersonalId (pre-configured w/ client) or updateUserPersonalIdFactory               |
| doPatchUserAttribute         | updateUserAttribute (pre-configured w/ client) or updateUserAttributeFactory                 |
| doPostPersonalIdImage        | createUserPersonalIdImage (pre-configured w/ client) or createUserPersonalIdImageFactory     |
| doPostPersonalIds            | createUserPersonalId (pre-configured w/ client) or createUserPersonalIdFactory               |
| doPostPhoneNumberValidations | createPhoneNumberValidation (pre-configured w/ client) or createPhoneNumberValidationFactory |
| doPostPhoneToken             | createPhoneToken (pre-configured w/ client) or createPhoneTokenFactory                       |
| doPostPhoneTokenValidations  | createPhoneTokenValidation (pre-configured w/ client) or createPhoneTokenValidationFactory   |
| doPostUserAttributes         | createUserAttribute (pre-configured w/ client) or createUserAttributeFactory                 |
| doPutDefaultPersonalId       | setUserDefaultPersonalId (pre-configured w/ client) or setUserDefaultPersonalIdFactory       |
| doPutUserAttribute           | setUserAttribute (pre-configured w/ client) or setUserAttributeFactory                       |
| doUpdateContact              | updateUserContact (pre-configured w/ client) or updateUserContactFactory                     |
| doUpdatePreferences          | setUserPreferences (pre-configured w/ client) or setUserPreferencesFactory                   |
| doUpdateProfile              | setUser (pre-configured w/ client) or setUserFactory                                         |

¹ `fetchUser` action works a little bit differently than the previous `doGetProfile` as it expects an access token on the request for it to work. If you need to use the legacy method that does not rely on access tokens, you can use the `fetchUserLegacy` and `fetchUserLegacyFactory` exports.

##### Selectors

| Old name                  | New name                      |
| ------------------------- | ----------------------------- |
| isProfileLoading          | isUserLoading                 |
| getProfileError           | getUserError                  |
| getProfileId              | getUserId                     |
| isBenefitsLoading         | areUserBenefitsLoading        |
| getBenefitsError          | getUserBenefitsError          |
| getBenefits               | getUserBenefits               |
| isPreferencesLoading      | areUserPreferencesLoading     |
| getPreferencesError       | getUserPreferencesError       |
| isUpdatingPreferences     | areUserPreferencesUpdating    |
| getUpdatePreferencesError | getUserPreferencesUpdateError |
| getPreferences            | getUserPreferences            |
| isTitlesLoading           | areUserTitlesLoading          |
| getTitlesError            | getUserTitlesError            |
| getTitles                 | getUserTitles                 |
| getTitleById              | getUserTitleById              |
| isCreditLoading           | areUserCreditsLoading         |
| getCreditError            | getUserCreditsError           |
| getCredit                 | getUserCredits                |
| isCreditMovementsLoading  | areUserCreditMovementsLoading |
| getCreditMovementsError   | getUserCreditMovementsError   |
| getCreditMovements        | getUserCreditMovements        |
| isContactsLoading         | areUserContactsLoading        |
| getContactsError          | getUserContactsError          |
| getContacts               | getUserContacts               |
| isUserAttributesLoading   | areUserAttributesLoading      |
| getUserAttributesError    | getUserAttributesError        |
| getUserAttributes         | getUserAttributes             |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                         | Notes                        |
| -------------------------------------- | ---------------------------- |
| actionTypes.GET_GUEST_USER_BENEFITS\*¹ | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export         | Notes                        |
| ---------------------- | ---------------------------- |
| doGetGuestUserBenefits | Removed as it was deprecated |

#### Other notable changes

##### fetchUser action different working method

`fetchUser` action works a little bit differently than its counterpart `doGetProfile` in `@farfetch/blackout-core` as it requires access tokens on the request to work. If you need to use the previous method that used cookies, you can use `fetchUserLegacy` action or, even better, use the `useUser` hook from `@farfetch/blackout-react` which abstracts this behind the option `useLegacyActions`.

##### `useUser` hook

The `useUser` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch user information in your apps. Prefer that instead of directly using the user actions/selectors.

### Promotion evaluations

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                        | New name                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| actionTypes                                     | promotionEvaluationsActionTypes                                     |
| actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS\*¹ | promotionEvaluationsActionTypes.FETCH_PROMOTION_EVALUATION_ITEMS\*¹ |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                    |
| ------------------------ | --------------------------- |
| reducer (default export) | promotionEvaluationsReducer |

### Recently viewed

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                      | New name                                              |
| --------------------------------------------- | ----------------------------------------------------- |
| actionTypes                                   | productsActionTypes                                   |
| actionTypes.GET_RECENTLY_VIEWED_PRODUCTS\*¹   | productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS\*¹ |
| actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT\*¹ | productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT\*¹ |
| actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT      | productsActionTypes.SAVE_RECENTLY_VIEWED_PRODUCT      |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name        |
| ------------------------ | --------------- |
| reducer (default export) | productsReducer |

##### Actions

| Old name                      | New name                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| doDeleteRecentlyViewedProduct | removeRecentlyViewedProduct (pre-configured w/ client) or removeRecentlyViewedProductFactory |
| doGetRecentlyViewedProducts   | fetchRecentlyViewedProducts (pre-configured w/ client) or fetchRecentlyViewedProductsFactory |
| doSaveRecentlyViewedProduct   | saveRecentlyViewedProduct                                                                    |

#### Other notable changes

##### `useRecentlyViewedProducts` hook

The `useRecentlyViewedProducts` hook was added to the `@farfetch/blackout-react` package which helps greatly when you need to fetch recently viewed products information in your apps. Prefer that instead of directly using the recently viewed actions/selectors.

### Recommendations

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                   | New name                                          |
| ------------------------------------------ | ------------------------------------------------- |
| actionTypes                                | productsActionTypes                               |
| actionTypes.GET_PRODUCT_RECOMMENDATIONS\*¹ | productsActionTypes.FETCH_RECOMMENDED_PRODUCTS\*¹ |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name        |
| ------------------------ | --------------- |
| reducer (default export) | productsReducer |

##### Actions

| Old name                    | New name                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------- |
| doGetProductRecommendations | fetchRecommendedProducts (pre-configured w/ client) or fetchRecommendedProductsFactory |

##### Selectors

| Old name                                | New name                             |
| --------------------------------------- | ------------------------------------ |
| getProductRecommendationsError          | getRecommendedProductsError          |
| isProductRecommendationLoading          | areRecommendedProductsLoading        |
| getProductRecommendations               | getRecommendedProducts               |
| getProductRecommendationsByStrategyName | getRecommendedProductsByStrategyName |
| getProductRecommendationsId             | getRecommendedProductsId             |

### Returns

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                               | New name                                             |
| -------------------------------------- | ---------------------------------------------------- |
| actionTypes                            | returnsActionTypes                                   |
| actionTypes.CREATE_RETURN\*¹           | returnsActionTypes.CREATE_RETURN\*¹                  |
| actionTypes.GET_PICKUP_CAPABILITIES\*¹ | returnsActionTypes.FETCH_RETURN_PICKUP_CAPABILITY\*¹ |
| actionTypes.GET_RETURN\*¹              | returnsActionTypes.FETCH_RETURN\*¹                   |
| actionTypes.UPDATE_RETURN\*¹           | returnsActionTypes.UPDATE_RETURN\*¹                  |
| actionTypes.GET_USER_RETURNS\*¹        | returnsActionTypes.FETCH_USER_RETURNS\*¹             |
| actionTypes.RESET_RETURN               | returnsActionTypes.RESET_RETURNS                     |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name              |
| ------------------------ | --------------------- |
| reducer (default export) | returnsReducer        |
| entitiesMapper           | returnsEntitiesMapper |

##### Actions

| Old name                | New name                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| doCreateReturn          | createReturn (pre-configured w/ client) or createReturnFactory                               |
| doGetPickupCapabilities | fetchReturnPickupCapability (pre-configured w/ client) or fetchReturnPickupCapabilityFactory |
| doGetReturn             | fetchReturn (pre-configured w/ client) or fetchReturnFactory                                 |
| doGetUserReturns        | fetchUserReturns¹ (pre-configured w/ client) or fetchUserReturnsFactory                      |
| doResetReturn           | resetReturns                                                                                 |
| doUpdateReturn          | updateReturn (pre-configured w/ client) or updateReturnFactory                               |

¹ `fetchUserReturns` action works a little bit differently than the previous `doGetUserReturns` as it expects an access token on the request for it to work. If you need to use the legacy method that does not rely on access tokens, you can use the `fetchUserReturnsLegacy` and `fetchUserReturnsLegacyFactory` exports.

##### Selectors

| Old name                    | New name                        |
| --------------------------- | ------------------------------- |
| isReturnsLoading            | areUserReturnsLoading           |
| getReturnsError             | getUserReturnsError             |
| isPickupCapabilitiesLoading | isReturnPickupCapabilityLoading |
| getPickupCapabilitiesError  | getReturnPickupCapabilityError  |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                                 | Notes                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| actionTypes.GET_REFERENCES\*¹                  | Removed as it was deprecated                                      |
| actionTypes.GET_RETURNS_FROM_ORDER\*¹          | Removed as it was deprecated                                      |
| actionTypes.POST_PICKUP_RESCHEDULE_REQUESTS\*¹ | Removed as these requests' state are not stored in redux any more |
| actionTypes.GET_PICKUP_RESCHEDULE_REQUESTS\*¹  | Removed as these requests' state are not stored in redux any more |
| actionTypes.GET_PICKUP_RESCHEDULE_REQUEST\*¹   | Removed as these requests' state are not stored in redux any more |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export                 | Notes                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| doGetReferences                | Removed as it was deprecated                                                                                                       |
| doGetReturnsFromOrder          | Use `fetchUserReturns` or `fetchUserReturnsLegacy` actions instead                                                                 |
| doGetPickupRescheduleRequest   | Use `useReturnPickupRescheduleRequest` hook from `@farfetch/blackout-react` instead                                                |
| doGetPickupRescheduleRequests  | Use `useReturnPickupRescheduleRequests` hook from `@farfetch/blackout-react` instead                                               |
| doPostPickupRescheduleRequests | Use either `useReturnPickupRescheduleRequest` or `useReturnPickupRescheduleRequests` hooks from `@farfetch/blackout-react` instead |

##### Selectors

| Removed export                    | Notes                                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| getReturnId                       | Removed as it was deprecated                                                                                                 |
| getReturnItemsIds                 | Use `getReturn` selector and use the `items` property of the return to find its items ids                                    |
| getReturnItems                    | Use `getReturn` selector and use the `items` property of the return to get its items                                         |
| isReferencesLoading               | Removed as it was deprecated                                                                                                 |
| getReferencesError                | Removed as it was deprecated                                                                                                 |
| isPickupRescheduleRequestsLoading | Use `useReturnPickupRescheduleRequests` hook from `@farfetch/blackout-react` package as it manages the state of this request |
| getPickupRescheduleRequestsError  | Use `useReturnPickupRescheduleRequests` hook from `@farfetch/blackout-react` package as it manages the state of this request |

#### Other notable changes

##### `useUserReturns` hook

The `useUserReturns` hook was added to the `@farfetch/blackout-react` package which helps greatly when implementing a user returns feature in your apps. Prefer that instead of directly using the returns actions/selectors.

### Search

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                               | New name                                       |
| -------------------------------------- | ---------------------------------------------- |
| actionTypes                            | searchActionTypes                              |
| actionTypes.GET_SEARCH_DID_YOU_MEAN\*¹ | searchActionTypes.FETCH_SEARCH_DID_YOU_MEAN\*¹ |
| actionTypes.GET_SEARCH_INTENTS\*¹      | searchActionTypes.FETCH_SEARCH_INTENTS\*¹      |
| actionTypes.GET_SEARCH_SUGGESTIONS\*¹  | searchActionTypes.FETCH_SEARCH_SUGGESTIONS\*¹  |
| actionTypes.RESET_SEARCH_DID_YOU_MEAN  | searchActionTypes.RESET_SEARCH_DID_YOU_MEAN    |
| actionTypes.RESET_SEARCH_INTENTS       | searchActionTypes.RESET_SEARCH_INTENTS         |
| actionTypes.RESET_SEARCH_SUGGESTIONS   | searchActionTypes.RESET_SEARCH_SUGGESTIONS     |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name      |
| ------------------------ | ------------- |
| reducer (default export) | searchReducer |

##### Actions

| Old name                 | New name                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| doGetSearchDidYouMean    | fetchSearchDidYouMean (pre-configured w/ client) or fetchSearchDidYouMeanFactory   |
| doGetSearchIntents       | fetchSearchIntents (pre-configured w/ client) or fetchSearchIntentsFactory         |
| doGetSearchSuggestions   | fetchSearchSuggestions (pre-configured w/ client) or fetchSearchSuggestionsFactory |
| doResetSearchDidYouMean  | resetSearchDidYouMean                                                              |
| doResetSearchIntents     | resetSearchIntents                                                                 |
| doResetSearchSuggestions | resetSearchSuggestions                                                             |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export            | Notes                        |
| ------------------------- | ---------------------------- |
| actionTypes.GET_SEARCH\*¹ | Removed as it was deprecated |
| actionTypes.RESET_SEARCH  | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export | Notes                        |
| -------------- | ---------------------------- |
| doGetSearch    | Removed as it was deprecated |
| doResetSearch  | Removed as it was deprecated |
| reset          | Removed as it was deprecated |

##### Selectors

| Removed export            | Notes                        |
| ------------------------- | ---------------------------- |
| getSearchError            | Removed as it was deprecated |
| isSearchLoading           | Removed as it was deprecated |
| getSearchResult           | Removed as it was deprecated |
| getSearchDidYouMeanQuery  | Removed as it was redundant  |
| getSearchSuggestionsQuery | Removed as it was redundant  |

#### Other notable changes

##### `useSearchDidYouMean`, `useSearchIntents` and `useSearchSuggestions` hooks

The `useSearchDidYouMean`, `useSearchIntents` and `useSearchSuggestions` hooks were added to the `@farfetch/blackout-react` package which helps greatly when you need to implement a search feature in your apps. Prefer that instead of directly using the search actions/selectors.

### Site features

#### Removed exports

The following table contains the exports that were removed and the alternatives you can use, if any.

| Removed export | Notes                            |
| -------------- | -------------------------------- |
| All exports    | Removed from this package' scope |

### Size guides

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                      | New name                                      |
| ----------------------------- | --------------------------------------------- |
| actionTypes                   | sizeGuidesActionTypes                         |
| actionTypes.GET_SIZEGUIDES\*¹ | sizeGuidesActionTypes.FETCH_SIZE_GUIDES\*¹    |
| actionTypes.RESET_SIZEGUIDES  | sizeGuidesActionTypes.RESET_SIZE_GUIDES_STATE |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name          |
| ------------------------ | ----------------- |
| reducer (default export) | sizeGuidesReducer |

##### Actions

| Old name        | New name                                                             |
| --------------- | -------------------------------------------------------------------- |
| doGetSizeguides | fetchSizeGuides (pre-configured w/ client) or fetchSizeGuidesFactory |
| reset           | resetSizeGuides                                                      |

##### Selectors

| Old name                         | New name             |
| -------------------------------- | -------------------- |
| areSizeguidesLoading             | areSizeGuidesLoading |
| getSizeguidesError               | getSizeGuidesError   |
| getAllSizeguides                 | getSizeGuides        |
| getSizeguideByCategoriesAndBrand | getSpecificSizeGuide |

### Size scales

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                      | New name                                      |
| ----------------------------- | --------------------------------------------- |
| actionTypes                   | sizeScalesActionTypes                         |
| actionTypes.GET_SIZESCALES\*¹ | sizeScalesActionTypes.FETCH_SIZE_SCALES\*¹    |
| actionTypes.GET_SIZESCALE\*¹  | sizeScalesActionTypes.FETCH_SIZE_SCALE\*¹     |
| actionTypes.RESET_SIZESCALES  | sizeScalesActionTypes.RESET_SIZE_SCALES_STATE |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name          |
| ------------------------ | ----------------- |
| reducer (default export) | sizeScalesReducer |

##### Actions

| Old name          | New name                                                             |
| ----------------- | -------------------------------------------------------------------- |
| doGetSizeScale    | fetchSizeScale (pre-configured w/ client) or fetchSizeScaleFactory   |
| doGetSizeScales   | fetchSizeScales (pre-configured w/ client) or fetchSizeScalesFactory |
| doResetSizeScales | resetSizeScales                                                      |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                          | Notes                        |
| --------------------------------------- | ---------------------------- |
| actionTypes.FETCH_SIZESCALE_MAPPINGS\*¹ | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export         | Notes                        |
| ---------------------- | ---------------------------- |
| fetchSizeScaleMappings | Removed as it was deprecated |

##### Selectors

| Removed export            | Notes                                     |
| ------------------------- | ----------------------------------------- |
| getSizeScaleById          | Use `getSizeScale` selector instead       |
| isSizeScaleLoadingByQuery | Use `isSizeScaleLoading` selector instead |
| isSizeScaleLoadingById    | Use `isSizeScaleLoading` selector instead |
| getSizeScaleErrorByQuery  | Use `getSizeScaleError` selector instead  |
| getSizeScaleErrorById     | Use `getSizeScaleError` selector instead  |
| getSizeScaleMappingError  | Removed as it was deprecated              |
| isSizeScaleMappingLoading | Removed as it was deprecated              |
| getSizeScaleMapping       | Removed as it was deprecated              |

##### Utils

| Removed export                | Notes                        |
| ----------------------------- | ---------------------------- |
| generateSizeScaleMappingsHash | Removed as it was deprecated |

### Staff members

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                          | New name                                      |
| --------------------------------- | --------------------------------------------- |
| actionTypes                       | staffMembersActionTypes                       |
| actionTypes.FETCH_STAFF_MEMBER\*¹ | staffMembersActionTypes.FETCH_STAFF_MEMBER\*¹ |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name            |
| ------------------------ | ------------------- |
| reducer (default export) | staffMembersReducer |

##### Actions

| Old name         | New name                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| fetchStaffMember | fetchStaffMember (pre-configured w/ client) or fetchStaffMemberFactory |

### Subscriptions

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                                                        | New name                                                                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| actionTypes                                                     | subscriptionsActionTypes                                                                                                 |
| actionTypes.GET_SUBSCRIPTION_PACKAGES\*¹                        | subscriptionsActionTypes.FETCH_SUBSCRIPTION_PACKAGES\*¹                                                                  |
| actionTypes.GET_USER_SUBSCRIPTIONS\*¹                           | subscriptionsActionTypes.FETCH_USER_SUBSCRIPTIONS\*¹                                                                     |
| actionTypes.PUT_USER_SUBSCRIPTIONS\*¹                           | subscriptionsActionTypes.UPDATE_USER_SUBSCRIPTIONS\*¹                                                                    |
| actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION\*¹                    | subscriptionsActionTypes.UNSUBSCRIBE_SUBSCRIPTION\*¹                                                                     |
| actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC\*¹                 | subscriptionsActionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT\*¹                                                     |
| actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST      | subscriptionsActionTypes.CLEAR_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST                                          |
| actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS | subscriptionsActionTypes.CLEAR_ALL_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FROM_REQUESTS                                |
| actionTypes.RESET_SUBSCRIPTIONS                                 | split between subscriptionsActionTypes.RESET_SUBSCRIPTION_PACKAGES and subscriptionsActionTypes.RESET_USER_SUBSCRIPTIONS |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                    |
| ------------------------ | --------------------------- |
| reducer (default export) | subscriptionsReducer        |
| entitiesMapper           | subscriptionsEntitiesMapper |

##### Actions

| Old name                                        | New name                                                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| doClearAllUnsubscribeRecipientFromTopicRequests | clearAllUnsubscribeSubscriptionTopicRecipientRequests                                                            |
| doClearUnsubscribeRecipientFromTopicRequest     | clearUnsubscribeRecipientFromTopic                                                                               |
| doGetSubscriptionPackages                       | fetchSubscriptionPackages (pre-configured w/ client) or fetchSubscriptionPackagesFactory                         |
| doGetUserSubscriptions                          | fetchUserSubscriptions (pre-configured w/ client) or fetchUserSubscriptionsFactory                               |
| doUnsubscribeFromSubscription                   | unsubscribeSubscription (pre-configured w/ client) or unsubscribeSubscriptionFactory                             |
| doUnsubscribeRecipientFromTopic                 | unsubscribeSubscriptionTopicRecipient (pre-configured w/ client) or unsubscribeSubscriptionTopicRecipientFactory |
| doUpdateUserSubscriptions                       | updateUserSubscriptions (pre-configured w/ client) or updateUserSubscriptionsFactory                             |
| reset                                           | resetSubscriptions                                                                                               |

##### Selectors

| Old name                      | New name                                 |
| ----------------------------- | ---------------------------------------- |
| getUpdateSubscriptionsError   | getUpdateUserSubscriptionsError          |
| isUserSubscriptionsLoading    | areUserSubscriptionsLoading              |
| isSubscriptionPackagesLoading | areSubscriptionPackagesLoading           |
| getSupportedChannels          | getSubscriptionPackagesSupportedChannels |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Action types

| Removed export                               | Notes                        |
| -------------------------------------------- | ---------------------------- |
| actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS\*¹ | Removed as it was deprecated |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Actions

| Removed export                | Notes                                        |
| ----------------------------- | -------------------------------------------- |
| doUnsubscribeAllSubscriptions | Use `unsubscribeSubscription` action instead |

### Wishlists

#### Renamed exports

The following tables contain the exports that were renamed and their new names you must use now.

##### Action types

| Old name                              | New name                                       |
| ------------------------------------- | ---------------------------------------------- |
| actionTypes                           | wishlistsActionTypes                           |
| actionTypes.ADD_ITEM_TO_WISHLIST\*¹   | wishlistsActionTypes.ADD_WISHLIST_ITEM\*¹      |
| actionTypes.DELETE_WISHLIST_ITEM\*¹   | wishlistsActionTypes.REMOVE_WISHLIST_ITEM\*¹   |
| actionTypes.GET_WISHLIST\*¹           | wishlistsActionTypes.FETCH_WISHLIST\*¹         |
| actionTypes.UPDATE_WISHLIST_ITEM\*¹   | wishlistsActionTypes.UPDATE_WISHLIST_ITEM\*¹   |
| actionTypes.GET_WISHLIST_SETS\*¹      | wishlistsActionTypes.FETCH_WISHLIST_SETS\*¹    |
| actionTypes.ADD_WISHLIST_SET\*¹       | wishlistsActionTypes.ADD_WISHLIST_SET\*¹       |
| actionTypes.DELETE_WISHLIST_SET\*¹    | wishlistsActionTypes.REMOVE_WISHLIST_SET\*¹    |
| actionTypes.GET_WISHLIST_SET\*¹       | wishlistsActionTypes.FETCH_WISHLIST_SET\*¹     |
| actionTypes.UPDATE_WISHLIST_SET\*¹    | wishlistsActionTypes.UPDATE_WISHLIST_SET\*¹    |
| actionTypes.RESET_WISHLIST_ENTITIES   | wishlistsActionTypes.RESET_WISHLIST_ENTITIES   |
| actionTypes.RESET_WISHLIST_SETS_STATE | wishlistsActionTypes.RESET_WISHLIST_SETS_STATE |

¹ Where `*` can be `_REQUEST`, `_FAILURE` or `_SUCCESS`.

##### Reducers

| Old name                 | New name                |
| ------------------------ | ----------------------- |
| reducer (default export) | wishlistsReducer        |
| entitiesMapper           | wishlistsEntitiesMapper |

##### Middlewares

| Old name                                       | New name                                                |
| ---------------------------------------------- | ------------------------------------------------------- |
| middlewares                                    | wishlistsMiddlewares                                    |
| middlewares.updateWishlistSetsUponItemDeletion | wishlistsMiddlewares.updateWishlistSetsUponItemDeletion |

##### Actions

| Old name             | New name                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| doAddWishlistItem    | addWishlistItem (pre-configured w/ client) or addWishlistItemFactory       |
| doAddWishlistSet     | addWishlistSet (pre-configured w/ client) or addWishlistSetFactory         |
| doDeleteWishlistItem | removeWishlistItem (pre-configured w/ client) or removeWishlistItemFactory |
| doDeleteWishlistSet  | removeWishlistSet (pre-configured w/ client) or removeWishlistSetFactory   |
| doGetWishlist        | fetchWishlist (pre-configured w/ client) or fetchWishlistFactory           |
| doGetWishlistSet     | fetchWishlistSet (pre-configured w/ client) or fetchWishlistSetFactory     |
| doGetWishlistSets    | fetchWishlistSets (pre-configured w/ client) or fetchWishlistSetsFactory   |
| doUpdateWishlistItem | updateWishlistItem (pre-configured w/ client) or updateWishlistItemFactory |
| doUpdateWishlistSet  | updateWishlistSet (pre-configured w/ client) or updateWishlistSetFactory   |
| reset                | resetWishlist                                                              |

##### Selectors

| Old name       | New name              |
| -------------- | --------------------- |
| itemInWishlist | findProductInWishlist |

##### Utils

| Old name               | New name                 |
| ---------------------- | ------------------------ |
| createWishlistItemHash | generateWishlistItemHash |

#### Removed exports

The following tables contain the exports that were removed and the alternatives you can use, if any.

##### Actions

| Removed export | Notes                              |
| -------------- | ---------------------------------- |
| resetState     | Use `resetWishlist` action instead |

##### Selectors

| Removed export          | Notes                                        |
| ----------------------- | -------------------------------------------- |
| createGetItemInWishlist | Use `findProductInWishlist` selector instead |

#### Other notable changes

##### `useWishlist` and `useWishlistSets` hooks

The `useWishlist` and `useWishlistSets` hooks were added to the `@farfetch/blackout-react` package which helps greatly when you need to implement a user wishlist feature in your apps. Prefer that instead of directly using the wishlist actions/selectors.
