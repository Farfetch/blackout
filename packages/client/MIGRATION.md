This guide will help you migrate `@farfetch/blackout-client` to the latest version.

# Table of Contents

- [Migrating from @farfetch/blackout-core](#migrating-from-@farfetch/blackout-core)

  - [Addresses](#addresses)
  - [Authentication](#authentication)
  - [Bags](#bags)
  - [Categories](#categories)
  - [Designers](#designers)
  - [Forms](#forms)
  - [Listing](#listing)
  - [Locale](#locale)
  - [Loyalty](#loyalty)
  - [Orders](#orders)
  - [Payments](#payments)
  - [Product Images](#product-images)
  - [Recently viewed](#recently-viewed)
  - [Recommendations](#recommendations)
  - [RecommendedSetWithOutOfStock](#recommended-set-with-out-of-stock)
  - [Returns](#returns)
  - [Search](#search)
  - [Size guides](#size-guides)
  - [Size scales](#size-scales)
  - [Subscriptions](#subscriptions)
  - [Users](#users)
  - [Wishlists](#wishlists)

## Migrating from @farfetch/blackout-core

- Everything under `@farfetch/blackout-core/*/redux`, i.e. redux selectors, action types, actions, reducer, middlewares and some utils, will be removed. You can access it now from a new package `@farfetch/blackout-redux/*`.

  ```js
  // Previously
  import { areDesignersLoading } from '@farfetch/blackout-core/designers/redux';

  import {
    bagMiddleware,
    setUserMiddleware,
    wishlistMiddleware,
  } from '@farfetch/blackout-core/analytics/redux/middlewares';

  // Change to:
  import { areDesignersLoading } from '@farfetch/blackout-redux/designers';

  import {
    bagMiddleware,
    setUserMiddleware,
    wishlistMiddleware,
  } from '@farfetch/blackout-redux/analytics/middlewares';
  ```

- Besides, the clients you'd import from `@farfetch/blackout-core/*/client` will be exported from `@farfetch/blackout-client/*`.

  ```js
  // Previously
  import { getCategories } from '@farfetch/blackout-core/categories/client';

  // Change to:
  import { getCategories } from '@farfetch/blackout-client/categories';
  ```

- Everything under `@farfetch/blackout-core/entities/*`, i.e. entities actions, entities action types, createEntitiesReducer, schemas and schemas selectors, will be removed. You can access it now from a new package `@farfetch/blackout-redux/entities/*`.

  ```js
  // Previously
  import { entitiesMapperReducer } from '@farfetch/blackout-core/entities/redux';
  import {
    getBrand,
    getProduct,
    getUser,
  } from '@farfetch/blackout-core/entities/redux';

  // Change to:
  import { entitiesMapperReducer } from '@farfetch/blackout-redux/entities';
  import {
    getBrand,
    getProduct,
    getUser,
  } from '@farfetch/blackout-redux/entities';
  ```

- Everything under `@farfetch/blackout-core/helpers/redux/*`, i.e. serverInitialState, reducerFactory pr createMergedObject, will be removed. You can access it now from a new package `@farfetch/blackout-redux/helpers/*`.

  ```js
  // Previously
  import { serverInitialState } from '@farfetch/blackout-core/helpers/redux';

  // Change to:
  import { serverInitialState } from '@farfetch/blackout-redux/helpers';
  ```

- Besides, the helper named `sortProductLabelsByPriority` you'd import from `@farfetch/blackout-core/helpers` will be now exported from `@farfetch/blackout-redux/products/utils`.

  ```js
  // Previously
  import { sortProductLabelsByPriority } from '@farfetch/blackout-core/helpers';

  // Change to:
  import { sortProductLabelsByPriority } from '@farfetch/blackout-redux/products/utils';
  ```

### Addresses:

#### What you need to change:

- The following properties changed the name in the address object of the
  addresses(addressbook) actions. - isDefaultBillingAddress -> isCurrentBilling - isDefaultShippingAddress -> isCurrentShipping - isPreferredAddress -> isCurrentPreferred
- getPredictionDetails now receives an object with the predictionId instead of the string itself, it also now supports query params.
- The `deleteAddress`, `putDefaultBillingAddress` and `putDefaultShippingAddress` clients no longer return the response.data but instead return the response.status.

### Authentication:

#### What's new:

- The `users/me` response now returns gender, status as strings and dateofbirth in UTC format.
- The `postPasswordRecover` client signature has changed. It now requires a `uri` key to be passed in the `data` argument. This is the uri where the user will reset its password.

#### What you need to change:

- The `doPasswordChange` redux function was changed into `changePasswordFactory`, if you want to use its preset opt for `changePassword`.
- The `doCreateClientCredentialsToken` redux function was changed into `createClientCredentialsTokenFactory`, if you want to use its preset opt for `createClientCredentials`.
- The `doCreateUserImpersonation` redux function was changed into `createUserImpersonationFactory`, if you want to use its preset opt for `createUserImpersonation`.
- The `doLogin` redux function was changed into `loginFactory`, if you want to use its preset opt for `login`.
- The `doLogout` redux function was changed into `logoutFactory`, if you want to use its preset opt for `logout`.
- The `doPasswordRecover` redux function was changed into `recoverPasswordFactory`, if you want to use its preset opt for `recoverPassword`.
- The `doRefreshEmailToken` redux function was changed into `refreshEmailTokenFactory`, if you want to use its preset opt for `refreshEmailToken`.
- The `doRefreshUserToken` redux function was changed into `refreshTokenFactory`, if you want to use its preset opt for `refreshToken`.
- The `doRegister` redux function was changed into `registerFactory`, if you want to use its preset opt for `register`.
- The `doDeleteUserToken` redux function was changed into `removeTokenFactory`, if you want to use its preset opt for `removeToken`.
- The `doDeleteUserImpersonation` redux function was changed into `removeUserImpersonationFactory`, if you want to use its preset opt for `removeUserImpersonation`.
- The `doPasswordReset` redux function was changed into `resetPasswordFactory`, if you want to use its preset opt for `resetPassword`.
- The `doValidateEmail` redux function was changed into `validateEmailFactory`, if you want to use its preset opt for `validateEmail`.
- Pass the `uri` key when calling the recover password action.

### Bags:

#### What's new:

- The `useBagItem` react hook was removed from `@farfetch/blackout-core/bags/hooks`

#### What you need to change:

- Start using the `useBagItem` hook, now available on `@farfetch/blackout-react/hooks/bags` (`@farfetch/blackout-react` version 0.5.0 or above), which:

  - provides the same handlers - for quantity, size and removal
  - avoid the need to import redux actions and handlers for bag items (already connects to the store using @farfetch/blackout-core functionality)
  - provides error and isLoading status regarding the bagItemId provided

- The `deleteBagItem` client now receives a `query` prop as its third argument and the `config` prop is the fourth argument.
- The `getBag` client now receives a `query` prop as its second argument and the `config` prop is the third argument.
- The `patchBagItem` client now receives a `query` prop as its fourth argument and the `config` prop is the fifth argument.
- The `postBagItem` client now receives a `query` prop as its third argument and the `config` prop is the fourth argument.

To upgrade you need to:

- Import `useBagItem` from `@farfetch/blackout-react`.

  ```js
  // Previously
  import { useBagItem } from '@farfetch/blackout-core/bags/hooks';

  // ...

  const { handleQuantityChange, handleSizeChange, handleDeleteBagItem } =
    useBagItem(bagItems, bagItem, addBagItem, deleteBagItem, updateBagItem);

  // Change to:
  import { useBagItem } from '@farfetch/blackout-react/hooks/bags';

  // ...

  const {
    bagItem,
    error: bagItemError,
    isLoading: bagItemIsLoading,
    handleQuantityChange,
    handleSizeChange,
    handleDeleteBagItem,
  } = useBagItem(bagItemId);
  ```

- Change your `config` prop to the next argument in `deleteBagItem`, `getBag`, `patchBagItem`, `postBagItem`.

```jsx
//Previously:
...
deleteBagItem(id, itemId, config)
getBag(id, config)
patchBagItem(id, itemId, data, config)
postBagItem(id, data, config)
...

//Now:
...
deleteBagItem(id, itemId, null, config)
getBag(id, null, config)
patchBagItem(id, itemId, data, null, config)
postBagItem(id, data, null, config)
...
```

### Categories

#### What's new:

- The `getCategoriesTop` client was renamed to `getTopCategories`.

#### What you need to change:

- Rename the client:

```js
// Previously
import { getCategoriesTop } from '@farfetch/blackout-core/categories/clients';

// Change to:
import { getTopCategories } from '@farfetch/blackout-core/categories';
```

### Designers:

#### What's new:

- The `reset` action was renamed in `@farfetch/blackout-core/designers/redux/actions` to `resetState`, working as previously.
- The `RESET_DESIGNERS` action type in `@farfetch/blackout-core/designers/redux/actionsTypes` was renamed
  to `RESET_DESIGNERS_STATE`.

#### What you need to change:

- Rename the action `reset` to `resetState`

  ```js
  // Previously
  import { reset } from '@farfetch/blackout-core/designers/redux';

  // ...
  reset();

  // Change to:
  import { resetState } from '@farfetch/blackout-redux/designers';

  // ...
  resetState();
  ```

- Rename the action type `RESET_DESIGNERS` to `RESET_DESIGNERS_STATE`

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/designers/redux';

  // ...
  actionTypes.RESET_DESIGNERS;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/designers';

  // ...
  actionTypes.RESET_DESIGNERS_STATE;
  ```

### Forms:

#### What's new:

- The action thunk creators `doGetFormSchema` and `doPostFormData` were renamed to `fetchFormSchema` and `submitFormData` respectively and are already pre-configured with the client, so it is not necessary to import the client from @farfetch/blackout-core and invoke these functions with it to obtain the final thunk creator.

- The actions `GET_FORM_SCHEMA_REQUEST`, `GET_FORM_SCHEMA_SUCCESS` and `GET_FORM_SCHEMA_FAILURE` were renamed to `FETCH_FORM_SCHEMA_REQUEST`, `FETCH_FORM_SCHEMA_SUCCESS` and `FETCH_FORM_SCHEMA_FAILURE` respectively.

- The modules `fetchFormSchemaFactory`, `submitFormDataFactory` were created to support the use case of configuring the action creators with a custom client.

#### What you need to change:

- If you are using the default client from @farfetch/blackout-core to configure `doGetFormSchema` and `doPostFormData` actions creators, rename them to the new names, `fetchFormSchema` and `submitFormData` respectively and remove the call to them with the client as the argument:

```js
// Previously
import {
  doGetFormSchema,
  doPostFormData,
} from '@farfetch/blackout-core/forms/redux';
import {
  getFormSchema,
  postFormData,
} from '@farfetch/blackout-core/forms/client';

const mapDispatchToProps = {
  getFormSchema: doGetFormSchema(getFormSchema),
  postFormData: doPostFormData(postFormData),
};

// Change to:
import {
  fetchFormSchema,
  submitFormData,
} from '@farfetch/blackout-redux/forms';

const mapDispatchToProps = {
  getFormSchema: fetchFormSchema,
  postFormData: submitFormData,
};
```

- If you need to provide a custom client for these actions, you will need to change your imports to import the new factory modules:

```js
// Previously
import {
  doGetFormSchema,
  doPostFormData,
} from '@farfetch/blackout-core/forms/redux';
import {
  myCustomGetFormSchema,
  myCustomPostFormData,
} from 'my-custom-forms-client';

const mapDispatchToProps = {
  getFormSchema: doGetFormSchema(myCustomGetFormSchema),
  postFormData: doPostFormData(myCustomPostFormData),
};

// Change to:
import {
  fetchFormSchemaFactory,
  submitFormDataFactory,
} from '@farfetch/blackout-redux/forms';
import {
  myCustomGetFormSchema,
  myCustomPostFormData,
} from 'my-custom-forms-client';

const mapDispatchToProps = {
  getFormSchema: fetchFormSchemaFactory(myCustomGetFormSchema),
  postFormData: submitFormDataFactory(myCustomPostFormData),
};
```

- Rename the action thunk creators `doGetFormSchema` and `doPostFormData`:

```js
// Previously
import {
  doGetFormSchema,
  doPostFormData,
} from '@farfetch/blackout-core/forms/redux';

// Change to:
import {
  fetchFormSchema,
  submitFormData,
} from '@farfetch/blackout-redux/forms';
```

- Rename the actions `GET_FORM_SCHEMA_REQUEST`, `GET_FORM_SCHEMA_SUCCESS` and `GET_FORM_SCHEMA_FAILURE` if you use them in any custom reducer/middleware:

```js
// Previously
import { actionTypes } from '@farfetch/blackout-core/forms/redux';

// ...
actionTypes.GET_FORM_SCHEMA_REQUEST;
actionTypes.GET_FORM_SCHEMA_SUCCESS;
actionTypes.GET_FORM_SCHEMA_FAILURE;

// Change to:
import { actionTypes } from '@farfetch/blackout-redux/forms';

// ...
actionTypes.FETCH_FORM_SCHEMA_REQUEST;
actionTypes.FETCH_FORM_SCHEMA_SUCCESS;
actionTypes.FETCH_FORM_SCHEMA_FAILURE;
```

### Loyalty:

#### What's new:

- As mentioned in the beginning:
  - clients are now exported from `@farfetch/blackout-core/loyalty/*` instead of `@farfetch/blackout-core/loyalty/client/*`
  - everything under `@farfetch/blackout-core/loyalty/redux/*` was moved to `@farfetch/blackout-redux/loyalty/*`.
- The following action thunk creators were renamed and are already pre-configured with the client, so it is not necessary to import the clients from @blackout-client and invoke the functions with them to obtain the final thunk creator:
  - `doGetPrograms` -> `fetchPrograms`,
  - `doCreateProgramMembership` -> `createProgramMembership`,
  - `doRequestProgramMembershipReplacement` -> `createProgramMembershipReplacement`,
  - `doCreateProgramMembershipConvert` -> `createProgramMembershipConvert`,
  - `doGetProgramMembershipStatements` -> `fetchProgramMembershipStatements`,
  - `doGetProgramUsersMembership` -> `fetchProgramUsersMembership`,
- The action types were also renamed. `*` stands for `SUCCESS`|`FAILURE`|`REQUEST`:
  - `GET_PROGRAMS_*` -> `FETCH_PROGRAMS_*`,
  - `REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_*` -> `CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_*`,
  - `GET_PROGRAM_MEMBERSHIP_STATEMENTS_*` -> `FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_*`,
  - `GET_PROGRAM_USERS_MEMBERSHIP_*` -> `FETCH_PROGRAM_USERS_MEMBERSHIP_*`,

#### What you need to change:

- Update the imports mentioned above for the `client` and `redux` folder.

```js
// Previously
import { getPrograms } from '@farfetch/blackout-core/loyalty/client';
import { doGetPrograms } from '@farfetch/blackout-core/loyalty/redux';
// ...

// Change to:
import { getPrograms } from '@farfetch/blackout-core/loyalty';
import { doGetPrograms } from '@farfetch/blackout-redux/loyalty';
// ...
```

- Rename the actions creator mentioned in the previous section to the new names and remove the call to them with the client as the argument:

```js
// Previously
import {
  doGetPrograms,
  doCreateProgramMembership,
  doRequestProgramMembershipReplacement,
  doCreateProgramMembershipConvert,
  doGetProgramMembershipStatements,
  doGetProgramUsersMembership,
} from '@blackout-redux/loyalty';
import {
  getPrograms,
  postProgramMembership,
  postProgramMembershipReplacement,
  postProgramMembershipConvert,
  getProgramMembershipStatements,
  getProgramUsersMembership,
} from '@blackout-client/loyalty';

const mapDispatchToProps = {
  getPrograms: doGetPrograms(getPrograms),
  createProgramMembership: doCreateProgramMembership(postProgramMembership),
  (...)
};

// Change to:
import {
  fetchPrograms,
  createProgramMembership,
  (...)
} from '@blackout-redux/loyalty';

const mapDispatchToProps = {
  getPrograms: fetchPrograms,
  createProgramMembership: createProgramMembership,
  (...)
};

```

### Orders

#### Whats' new:

- The `getOrderDetails` response had some properties changed. Check the following section for a table summarizing these changes.

#### What you need to change:

- The following `getOrderDetails` properties were changed. If you use them please update as described in these tables:

  - `shippingAddress` and `billingAddress` object properties:

    | Before                   | After              |
    | ------------------------ | ------------------ |
    | isDefaultBillingAddress  | isCurrentBilling   |
    | isDefaultShippingAddress | isCurrentShipping  |
    | isPreferredAddress       | isCurrentPreferred |

  - `customerType`:

    | Before | After           |
    | ------ | --------------- |
    | 0      | Normal          |
    | 1      | PersonalShopper |
    | 2      | VipBrazil       |

  - The order `item`->`attributes`->`type`:

    | Before | After           |
    | ------ | --------------- |
    | 0      | Size            |
    | 1      | SizeDescription |
    | 2      | Scale           |

  - The order `item`->`categories`->`gender`:

    | Before | After  |
    | ------ | ------ |
    | 0      | Woman  |
    | 1      | Man    |
    | 2      | Unisex |
    | 3      | Kid    |

  - `orderItemStatus`:

    | Before | After                    |
    | ------ | ------------------------ |
    | 0      | None                     |
    | 1      | OutOfStock               |
    | 2      | WithStock                |
    | 3      | ReturnWithShippingCost   |
    | 4      | ReturnWithoutShippinCost |
    | 5      | SuggestAlternative       |
    | 10     | Canceled                 |

  - `orderStatus`:

    | Before | After               |
    | ------ | ------------------- |
    | 1      | CheckingStock       |
    | 2      | ProcessingPayment   |
    | 3      | Packaging           |
    | 4      | Awb                 |
    | 5      | PreparingToDispatch |
    | 6      | InTransit           |
    | 7      | CollectInStore      |
    | 8      | ReadyToCollect      |
    | 97     | Cancelled           |
    | 98     | Returned            |
    | 100    | Delivered           |

  - `productType`:

    | Before | After         |
    | ------ | ------------- |
    | 0      | Standard      |
    | 1      | BundleProduct |
    | 2      | BundleVariant |
    | 3      | ProductGroup  |
    | 4      | Sample        |

  - `creationChannel`:

    | Before | After   |
    | ------ | ------- |
    | 0      | Catalog |
    | 1      | Mail    |
    | 2      | Phone   |

### Products

#### What's new:

- The folder `details` here - `@farfetch/blackout-core/products/details` - was removed and now
  all the clients are under `products` - `@farfetch/blackout-core/products`.

- The folder `listing` here - `@farfetch/blackout-core/products/listing` - was removed and now
  all the clients are under `products` - `@farfetch/blackout-core/products`.

- Clients available:
  - getListing
  - getProductAttributes
  - getProductColorGrouping (previously named `getColorGrouping`)
  - getProductDetails
  - getProductFittings
  - getProductVariantsByMerchantsLocations
  - getProductSizeGuides (previously named `getProductSizeguides`)
  - getProductSizes
  - getProductVariantsMeasurements (previously named `getMeasurements`)
  - getSet

### Product Images

#### What's new:

- The adapter `adapters.DEPRECATED_adaptProductImages()` was removed.

#### What you need to change:

- Make the changes necessary to use the product `images` structure if you were using the `DEPRECATED_images` field.

```js
// Previously, called `DEPRECATED_images` and now removed
{
  primary: {
   sources: {
      250: 'https://cdn-images.farfetch.com/img_1_250.jpg',
      500: 'https://cdn-images.farfetch.com/img_1_500.jpg'
   },
   type: 'image'
 },
 secondary: {
   sources: { ... },
   type: 'image'
 },
}

// Now, called `images` since v1.x.x and now the only way to access the product images
[
  {
    order: 1,
    sources: {
      250: 'https://cdn-images.farfetch.com/img_1_250.jpg',
      500: 'https://cdn-images.farfetch.com/img_1_500.jpg',
      ...
    },
  },
  {
    order: 2,
    sources: {
      250: 'https://cdn-images.farfetch.com/img_2_250.jpg',
      500: 'https://cdn-images.farfetch.com/img_2_500.jpg',
      ...
    },
  },
  {
    ...
  }
];
```

### Recently viewed

#### What's new:

- The action thunk creators `doGetRecentlyViewedProducts` and `doRemoveRecentlyViewedProduct` were renamed to `fetchRecentlyViewedProducts` and `removeRecentlyViewedProduct` respectively and are already pre-configured with the client, so it is not necessary to import the client from @farfetch/blackout-core and invoke these functions with it to obtain the final thunk creator.

- The actions `GET_RECENTLY_VIEWED_PRODUCTS_REQUEST`, `GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS`, `GET_RECENTLY_VIEWED_PRODUCTS_FAILURE`, `DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST`, `DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS` and `DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE` were renamed to `FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST`, `FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS`, `FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE`, `REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST`, `REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS` and `REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE` respectively.

- The modules `fetchRecentlyViewedProductsFactory`, `removeRecentlyViewedProductFactory` were created to support the use case of configuring the action creators with a custom client.

#### What you need to change:

- If you are using the default client from @farfetch/blackout-core to configure `doGetRecentlyViewedProducts` and `doRemoveRecentlyViewedProduct` actions creators, rename them to the new names, `fetchRecentlyViewedProducts` and `removeRecentlyViewedProduct` respectively and remove the call to them with the client as the argument:

```js
// Previously
import {
  doGetRecentlyViewedProducts,
  doRemoveRecentlyViewedProduct,
} from '@farfetch/blackout-core/recentlyViewed/redux';
import {
  getRecentlyViewedProducts,
  deleteRecentlyViewedProduct,
} from '@farfetch/blackout-core/recentlyViewed/client';

const mapDispatchToProps = {
  getRecentlyViewedProducts: doGetRecentlyViewedProducts(
    getRecentlyViewedProducts,
  ),
  deleteRecentlyViewedProducts: doRemoveRecentlyViewedProduct(
    deleteRecentlyViewedProduct,
  ),
};

// Change to:
import {
  fetchRecentlyViewedProducts,
  removeRecentlyViewedProduct,
} from '@farfetch/blackout-redux/recentlyViewed';

const mapDispatchToProps = {
  getRecentlyViewedProducts: fetchRecentlyViewedProducts,
  deleteRecentlyViewedProducts: removeRecentlyViewedProduct,
};
```

- If you need to provide a custom client for these actions, you will need to change your imports to import the new factory modules:

```js
// Previously
import {
  doGetRecentlyViewedProducts,
  doRemoveRecentlyViewedProduct,
} from '@farfetch/blackout-core/recentlyViewed/redux';
import {
  myCustomGetRecentlyViewedProducts,
  myCustomDeleteRecentlyViewedProduct,
} from 'my-custom-recentlyViewed-client';

const mapDispatchToProps = {
  getRecentlyViewedProducts: doGetRecentlyViewedProducts(
    myCustomGetRecentlyViewedProducts,
  ),
  deleteRecentlyViewedProducts: doRemoveRecentlyViewedProduct(
    myCustomDeleteRecentlyViewedProduct,
  ),
};

// Change to:
import {
  fetchRecentlyViewedProductsFactory,
  removeRecentlyViewedProductFactory,
} from '@farfetch/blackout-redux/recentlyViewed';
import {
  myCustomGetRecentlyViewedProducts,
  myCustomDeleteRecentlyViewedProduct,
} from 'my-custom-recentlyViewed-client';

const mapDispatchToProps = {
  getRecentlyViewedProducts: fetchRecentlyViewedProductsFactory(
    myCustomGetRecentlyViewedProducts,
  ),
  deleteRecentlyViewedProducts: removeRecentlyViewedProductFactory(
    myCustomDeleteRecentlyViewedProduct,
  ),
};
```

- Rename the actions `GET_RECENTLY_VIEWED_PRODUCTS_REQUEST`, `GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS` and `GET_RECENTLY_VIEWED_PRODUCTS_FAILURE` if you use them in any custom reducer/middleware:

```js
// Previously
import { actionTypes } from '@farfetch/blackout-core/recentlyViewed/redux';

// ...
actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_REQUEST;
actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS;
actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_FAILURE;

//
actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST;
actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS;
actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE;

// Change to:
import { actionTypes } from '@farfetch/blackout-redux/recentlyViewed';

// ...
actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST;
actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS;
actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE;

// ...
actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST;
actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS;
actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE;
```

### Recommendations:

#### What's new:

- The action creator doGetProductRecommendations was renamed to fetchProductRecommendations and now comes pre-configured with the corresponding client from @farfetch/blackout-core/recommendations.There is no need to configure the action creator anymore, it can be used with the default @farfetch/blackout-core client provided.

- A module fetchProductRecommendationsFactory was created to support the use case of configuring the action creator with a custom client.

- The actions `GET_PRODUCT_RECOMMENDATIONS_REQUEST`, `GET_PRODUCT_RECOMMENDATIONS_SUCCESS` and `GET_PRODUCT_RECOMMENDATIONS_FAILURE` were renamed to `FETCH_PRODUCT_RECOMMENDATIONS_REQUEST`, `FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS` and `FETCH_PRODUCT_RECOMMENDATIONS_FAILURE` respectively.

- The `getProductRecommendations` client parameter list has changed. The first parameter is now an object that contains the previous parameters `productId` and `strategyName` as its properties.
  Check the following table for all available properties:

| Name           | Type   | Required | Status                                                                                                            |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| productId      | number | YES      | Old first argument on `getProductRecommendations` function. Get recommendation products to specified product ID.4 |
| stategyName    | string | YES      | Old second argument on `getProductRecommendations` function. Get recommendation products to specified product ID. |
| howMany        | number | NO       | Set how many recommendation products will be returned.                                                            |
| countryCode    | string | NO       | Get recommendation products to specified country.                                                                 |
| gender         | string | NO       | Get recommendations with products or brands to a specific gender: None, Women, Men, Unisex, Kids.                 |
| userType       | string | NO       | Type of user identifier. One cookieID, userID, deviceID, or emailHash.                                            |
| userIdentifier | string | NO       | Get recommendations with products or brands to a specific user.                                                   |
| categoryId     | number | NO       | Get recommendations for products with the categoryId as context.                                                  |
| brandId        | string | NO       | Get recommendations with products with brandId as context.                                                        |
| merchantId     | number | NO       | Get recommendations with products with merchantId as context.                                                     |

#### What you need to change:

- If you are using the default client from @farfetch/blackout-core to configure doGetProductRecommendations action creator, rename it to the new name and remove the call with the client as the argument:

```js
// Previously
import { doGetProductRecommendations } from '@farfetch/blackout-core/recommendations/redux';
import { getProductRecommendations } from '@farfetch/blackout-core/recommendations/client';

getProductRecommendations(productId, strategyName);

const mapDispatchToProps = {
  getProductRecommendations: doGetProductRecommendations(
    getProductRecommendations,
  ),
};

// Change to:
import { fetchProductRecommendations } from '@farfetch/blackout-redux/recommendations';

getProductRecommendations({ productId, strategyName });

const mapDispatchToProps = {
  getProductRecommendations: fetchProductRecommendations,
};
```

- Rename the action thunk creator `doGetProductRecommendations`:

```js
// Previously
import { doGetProductRecommendations } from '@farfetch/blackout-core/recommendations/redux';

// Change to:
import { fetchProductRecommendations } from '@farfetch/blackout-redux/recommendations';
```

- Rename the actions `GET_PRODUCT_RECOMMENDATIONS_REQUEST`, `GET_PRODUCT_RECOMMENDATIONS_SUCCESS` and `GET_PRODUCT_RECOMMENDATIONS_FAILURE` if you use them in any custom reducer/middleware:

```js
// Previously
import { actionTypes } from '@farfetch/blackout-core/recommendations/redux';

// ...
actionTypes.GET_PRODUCT_RECOMMENDATIONS_REQUEST;
actionTypes.GET_PRODUCT_RECOMMENDATIONS_SUCCESS;
actionTypes.GET_PRODUCT_RECOMMENDATIONS_FAILURE;

// Change to:
import { actionTypes } from '@farfetch/blackout-redux/recommendations';

// ...
actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST;
actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS;
actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE;
```

### RecommendedSetWithOutOfStock:

#### What's new:

- The client `getRecommendedSetWithOutOfStock` was renamed to `getRecommendedSet`.

#### What you need to change:

- Rename client

```js
// Previously
import { getRecommendedSetWithOutOfStock } from '@farfetch/blackout-core/products/details/client';

const mapDispatchToProps = {
  getRecommendedSet: doGetRecommendedSetWithOutOfStock(
    getRecommendedSetWithOutOfStock,
  ),
};

// Change to:
import { getRecommendedSet } from '@farfetch/blackout-core/products';

const mapDispatchToProps = {
  getRecommendedSetAction: doGetRecommendedSetWithOutOfStock(getRecommendedSet),
};
```

### Returns

#### What's new:

- The response for `getReturnsFromOrder` has changed.
- As mentioned in the beginning:
  - clients are now exported from `@farfetch/blackout-core/returns/*` instead of `@farfetch/blackout-core/returns/client/*`
  - everything under `@farfetch/blackout-core/returns/redux/*` was moved to `@farfetch/blackout-redux/returns/*`.

#### What you need to change:

- Update the imports mentioned above for the `client` and `redux` folder.

- Regarding the `getReturnsFromOrder` all the dates of the object are in the UTC date format (eg: 2021-06-01T08:56:01.6248908Z).

- The references name now are typed as a string you can follow this table to adapt:

  | Before | After                      |
  | ------ | -------------------------- |
  | 0      | None                       |
  | 1      | ReturnNote                 |
  | 2      | ReturnCustomerRequestedAWB |
  | 3      | ReturnLabelAWB             |
  | 4      | DropOffLocationsPage       |

- The item status now are typed as a string you can follow this table to adapt:

  | Before | After                        |
  | ------ | ---------------------------- |
  | 0      | Created                      |
  | 1      | AcceptedWithShippingCosts    |
  | 2      | AcceptedWithoutShippingCosts |
  | 3      | Contested                    |
  | 4      | ContestAccepted              |
  | 5      | Canceled                     |

- The courier now is typed as a string you can follow this table to adapt:

  | Before | After    |
  | ------ | -------- |
  | 0      | NotKnown |
  | 1      | DHL      |
  | 2      | UPS      |

- The return status now is typed as a string you can follow this table to adapt:

  | Before | After              |
  | ------ | ------------------ |
  | 0      | Created            |
  | 1      | AwaitingPickup     |
  | 2      | InTransit          |
  | 3      | Accepted           |
  | 4      | PartialAccepted    |
  | 5      | Refused            |
  | 6      | Canceled           |
  | 7      | NeedPickupSchedule |

- The return type now is typed as a string you can follow this table to adapt:

  | Before | After          |
  | ------ | -------------- |
  | 0      | Courier        |
  | 1      | InStore        |
  | 2      | CourierDropOff |
  | 3      | CourierPickUp  |
  | 4      | Manual         |

### Search:

#### What's new:

- In order to accommodate other search features, please notice the following changes on the search intents context:

#### What you need to change:

- The client changed its name, from `getSearch` to `getSearchIntents`:

```js
// Previously:
import { getSearch } from '@farfetch/blackout-core/search/client';

// Change to:
import { getSearchIntents } from '@farfetch/blackout-core/search/client';
```

- These `actionTypes` changed their names:

```js
// From this:
export const GET_SEARCH_FAILURE = '@farfetch/blackout-core/GET_SEARCH_FAILURE';
export const GET_SEARCH_REQUEST = '@farfetch/blackout-core/GET_SEARCH_REQUEST';
export const GET_SEARCH_SUCCESS = '@farfetch/blackout-core/GET_SEARCH_SUCCESS';
export const RESET_SEARCH = '@farfetch/blackout-core/RESET_SEARCH';

// To this:
export const GET_SEARCH_INTENTS_FAILURE =
  '@farfetch/blackout-core/GET_SEARCH_INTENTS_FAILURE';
export const GET_SEARCH_INTENTS_REQUEST =
  '@farfetch/blackout-core/GET_SEARCH_INTENTS_REQUEST';
export const GET_SEARCH_INTENTS_SUCCESS =
  '@farfetch/blackout-core/GET_SEARCH_INTENTS_SUCCESS';
export const RESET_SEARCH_INTENTS =
  '@farfetch/blackout-core/RESET_SEARCH_INTENTS';
```

- These actions changed their name, from `doGetSearch` to `doGetSearchIntents` and from `reset` to `doResetSearchIntents`:

```js
// Previously:
import { doGetSearch, reset } from '@farfetch/blackout-core/search/redux';

// Change to:
import {
  doGetSearchIntents,
  doResetSearchIntents,
} from '@farfetch/blackout-core/search/redux';
```

- These selectors changed their name, from `getSearchError` to `getSearchIntentsError`, from `isSearchLoading` to `areSearchIntentsLoading` and from `getSearchResult` to `getSearchIntentsResult`:

```js
// Previously:
import {
  getSearchError,
  isSearchLoading,
  getSearchResult,
} from '@farfetch/blackout-core/search/redux';

// Change to:
import {
  getSearchIntentsError,
  areSearchIntentsLoading,
  getSearchIntentsResult,
} from '@farfetch/blackout-core/search/redux';
```

- The reducer changed their properties, to accommodate new search features in the near future:

```js
// The store - previously:
{
    search: {
        isLoading: true,
        error: null,
        result: { 123: 'foo' }
    }
}

// The store - now:
{
    search: {
        intents: {
            isLoading: true,
            error: null,
            result: { 123: 'foo' }
        },
        suggestions: {...},
        didYouMean: {...}
    }
}
```

### Size guides

#### What's new:

All `sizeguide` references updated to an uppercase "G", to `sizeGuide`.

#### What you need to change:

Client:

```js
// Previously
import { getSizeguides } from '@farfetch/blackout-core/sizeguides/client';

// Change to:
import { getSizeGuides } from '@farfetch/blackout-core/sizeGuides';
```

### Size scales:

#### What's new:

- Everything imported from `@farfetch/blackout-core/products/details/` related to size scales is now deleted.

#### What you need to change:

Selectors: (previously -> now, imported from `@farfetch/blackout-redux/sizeScales`)

- `isProductSizeScaleLoading` -> `isSizeScaleLoadingById`
- `isProductSizeScaleFetched` -> `isSizeScaleFetched`
- `getProductSizeScale` -> `getSizeScaleById`
- `getProductSizeScaleError` -> `getSizeScaleErrorById`

All of the selectors above now receive as a second param the scale id, instead of the product id.

Actions:

- `doGetSizeScale` still has the same name but now receives a scale id as param, instead
  of a product id

If anything imported from `@farfetch/blackout-core/product/details/` is related to size scales and not mentioned here, it means the name is still the same.

### Subscriptions:

#### What's new:

- The action thunk creators `doGetUserSubscriptions`, `doGetSubscriptionPackages` and `doUpdateUserSubscriptions` were renamed to `fetchUserSubscriptions`, `fetchSubscriptionPackages` and `updateUserSubscriptions` respectively and are already pre-configured with the client, so it is not necessary to import the client from @farfetch/blackout-core and invoke these functions with it to obtain the final thunk creator.

- The actions `GET_SUBSCRIPTION_PACKAGES_SUCCESS`, `GET_SUBSCRIPTION_PACKAGES_REQUEST`, `GET_SUBSCRIPTION_PACKAGES_FAILURE`, `GET_USER_SUBSCRIPTIONS_REQUEST`, `GET_USER_SUBSCRIPTIONS_SUCESS`, `GET_USER_SUBSCRIPTIONS_FAILURE`, `PUT_USER_SUBSCRIPTIONS_SUCESS`, `PUT_USER_SUBSCRIPTIONS_REQUEST` and `PUT_USER_SUBSCRIPTIONS_FAILURE` were renamed to `FETCH_SUBSCRIPTION_PACKAGES_SUCCESS`, `FETCH_SUBSCRIPTION_PACKAGES_REQUEST`, `FETCH_SUBSCRIPTION_PACKAGES_FAILURE`, `FETCH_USER_SUBSCRIPTIONS_REQUEST`, `FETCH_USER_SUBSCRIPTIONS_SUCESS`, `FETCH_USER_SUBSCRIPTIONS_FAILURE` `UPDATE_USER_SUBSCRIPTIONS_SUCCESS`, `UPDATE_USER_SUBSCRIPTIONS_REQUEST`, `UPDATE_USER_SUBSCRIPTIONS_FAILURE` respectively.

- The modules `fetchSubscriptionPackagesFactory`, `fetchUserSubscriptionsFactory` and `updateUserSubscriptionsFactory` were created to support the use case of configuring the action creators with a custom client.

- The method for `unsubscribeAllSubscriptions` was deprecated, to introduce a new one `unsubscribeFromSubscription`, which is very close to the last one, changing the parameters.

#### What you need to change:

- If you are using the default client from @farfetch/blackout-core to configure `doGetSubscriptionPackages`, `doGetUserSubscriptions` or `doUpdateUserSubscriptions` actions creators, rename them to the new names and remove the call to them with the client as the argument:

```js
// Previously
import {
  doGetSubscriptionPackages,
  doGetUserSubscriptions,
  doUpdateUserSubscriptions,
  doUnsubscribeAllSubscriptions,
} from '@farfetch/blackout-core/subscriptions/redux';
import {
  getSubscriptionPackages,
  getSubscriptions,
  putSubscriptions,
  deleteSubscriptions,
} from '@farfetch/blackout-core/subscriptions/client';

unsubscribeAllSubscriptions(EMAIL_HASH - SHA256);

const mapDispatchToProps = {
  getSubscriptionPackages: doGetSubscriptionPackages(getSubscriptionPackages),
  getSubscriptions: doGetUserSubscriptions(getSubscriptions),
  updateSubscriptions: doUpdateUserSubscriptions(putSubscriptions),
  unsubscribeAllSubscriptions:
    doUnsubscribeAllSubscriptions(deleteSubscriptions),
};

// Change to:
import {
  fetchSubscriptionPackages,
  fetchUserSubscriptions,
  updateUserSubscriptions,
  unsubscribeFromSubscription,
} from '@farfetch/blackout-redux/subscriptions';

deleteAllSubscriptions({ id: SUBSCRIPTION_ID, emailHash: EMAIL_HASH - SHA256 });

const mapDispatchToProps = {
  getSubscriptionPackages: fetchSubscriptionPackages,
  getSubscriptions: fetchUserSubscriptions,
  updateSubscriptions: updateUserSubscriptions,
  deleteAllSubscriptions: unsubscribeFromSubscription,
};
```

- If you need to provide a custom client for these actions, you will need to change your imports to import the new factory modules:

```js
// Previously
import {
  doGetSubscriptionPackages,
  doGetUserSubscriptions,
  doUpdateUserSubscriptions,
} from '@farfetch/blackout-core/subscriptions/redux';
import {
  myCustomGetSubscriptionPackagesClient,
  myCustomGetSubscriptionsClient,
  myCustomPutSubscriptionsClient,
} from './my-custom-subscriptions-clients';

const mapDispatchToProps = {
  getSubscriptionPackages: doGetSubscriptionPackages(
    myCustomGetSubscriptionPackagesClient,
  ),
  getSubscriptions: doGetUserSubscriptions(myCustomGetSubscriptionsClient),
  updateSubscriptions: doUpdateUserSubscriptions(
    myCustomPutSubscriptionsClient,
  ),
};

// Change to:
import {
  fetchSubscriptionPackagesFactory,
  fetchUserSubscriptionsFactory,
  updateUserSubscriptionsFactory,
} from '@farfetch/blackout-redux/subscriptions';
import {
  myCustomGetSubscriptionPackagesClient,
  myCustomGetSubscriptionsClient,
  myCustomPutSubscriptionsClient,
} from './my-custom-subscriptions-clients';

const mapDispatchToProps = {
  getSubscriptionPackages: fetchSubscriptionPackagesFactory(
    myCustomGetSubscriptionPackagesClient,
  ),
  getSubscriptions: fetchUserSubscriptionsFactory(
    myCustomGetSubscriptionsClient,
  ),
  updateSubscriptions: updateUserSubscriptionsFactory(
    myCustomPutSubscriptionsClient,
  ),
};
```

- Rename the action thunk creator `reset`:

```js
// Previously
import { reset } from '@farfetch/blackout-core/subscriptions/redux';

// Change to:
import { resetSubscriptions } from '@farfetch/blackout-redux/subscriptions';
```

- Rename the actions `GET_SUBSCRIPTION_PACKAGES_SUCCESS`, `GET_SUBSCRIPTION_PACKAGES_REQUEST`, `GET_SUBSCRIPTION_PACKAGES_FAILURE`, `GET_USER_SUBSCRIPTIONS_REQUEST`, `GET_USER_SUBSCRIPTIONS_SUCESS`, `GET_USER_SUBSCRIPTIONS_FAILURE`, `PUT_USER_SUBSCRIPTIONS_SUCESS`, `PUT_USER_SUBSCRIPTIONS_REQUEST` and `PUT_USER_SUBSCRIPTIONS_FAILURE` if you use them in any custom reducer/middleware:

```js
// Previously
import { actionTypes } from '@farfetch/blackout-core/subscriptions/redux';

// ...
actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST;
actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS;
actionTypes.GET_SUBSCRIPTION_PACKAGES_FAILURE;

actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST;
actionTypes.GET_USER_SUBSCRIPTIONS_SUCESS;
actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE;

actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST;
actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS;
actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE;

// Change to:
import { actionTypes } from '@farfetch/blackout-redux/subscriptions';

// ...
actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST;
actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS;
actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE;

actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST;
actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCESS;
actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE;

actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST;
actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS;
actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE;
```

### Users

#### What's new:

- Users is the new name of the profile area, since some of the requests aren't related to the profile
  but all of them are related to users and guest users.

#### What you need to change:

- Instead of importing the clients with the `@farfetch/blackout-core/profile` prefix you should import it by using the
  `@farfetch/blackout-core/users` prefix.
- `updatePreferences` and `updateUser` were changed into `putPreferences` and `putUsers` respectively to reflect the HTTP methods being used and to be coeherent with the rest of the frontend api

### Wishlists

#### What's new:

- The clients `deleteWishlistsSet`, `getWishlistsSet`, `getWishlistsSet`, `patchWishlistsSet` and
  `postWishlistsSet` were renamed to `deleteWishlistSet`, `getWishlistSet`, `getWishlistSet`,
  `patchWishlistSet` and `postWishlistSet`, respectively.

#### What you need to change:

- Change the clients names:

  ```jsx
  // Previously:
  import {
    deleteWishlistsSet,
    getWishlistsSet,
    getWishlistsSet,
    patchWishlistsSet,
    postWishlistsSet,
  } from '@farfetch/blackout-core/wishlists/clients';

  // Now:
  import {
    deleteWishlistSet,
    getWishlistSet,
    getWishlistSet,
    patchWishlistSet,
    postWishlistSet,
  } from '@farfetch/blackout-core/wishlists';
  ```
