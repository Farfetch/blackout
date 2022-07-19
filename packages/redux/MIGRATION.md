This guide will help you migrate `@farfetch/blackout-redux` to the latest version.

# Table of Contents

- [Migrating from @farfetch/blackout-core](#migrating-from-@farfetch/blackout-core)

  - [General](#general)
  - [Selectors using `getEntity`](#selectors-using-getentity)
    - [What you need to change](#what-you-need-to-change)
  - [Product Images](#product-images)
    - [What's new](#whats-new)
    - [What you need to change](#what-you-need-to-change-1)
  - [Addresses](#addresses)
  - [What's new](#whats-new-1)
  - [What you need to change](#what-you-need-to-change-2)
  - [Bags](#bags)
  - [What's new](#whats-new-2)
  - [What you need to change](#what-you-need-to-change-3)
  - [Brands](#brands)
  - [What's new](#whats-new-3)
  - [What you need to change](#what-you-need-to-change-4)
  - [Categories](#categories)
  - [What's new](#whats-new-4)
  - [What you need to change](#what-you-need-to-change-5)
  - [Checkout](#checkout)
  - [What's new](#whats-new-5)
  - [What you need to change](#what-you-need-to-change-6)
  - [Contents](#contents)
  - [What's new](#whats-new-6)
  - [What you need to change](#what-you-need-to-change-7)
  - [Designers](#designers)
  - [What's new](#whats-new-7)
  - [What you need to change](#what-you-need-to-change-8)
  - [Locale:](#locale)
  - [What's new](#whats-new-8)
  - [What do you need to change:](#what-do-you-need-to-change)
  - [Orders](#orders)
    - [What's new](#whats-new-9)
  - [What you need to change](#what-you-need-to-change-9)
  - [Merchants Locations:](#merchants-locations)
  - [What's new](#whats-new-10)
  - [What you need to change](#what-you-need-to-change-10)
  - [Payments](#payments)
  - [What's new](#whats-new-11)
  - [What's no longer supported](#whats-no-longer-supported)
  - [What you need to change](#what-you-need-to-change-11)
  - [Products](#products)
  - [What's new](#whats-new-12)
  - [What you need to change](#what-you-need-to-change-12)
  - [ProductsLists (listing and sets)](#productslists-listing-and-sets)
  - [What you need to change](#what-you-need-to-change-13)
  - [RecommendedSetsWithOutOfStock](#recommendedsetswithoutofstock)
  - [What's new](#whats-new-13)
  - [What you need to change](#what-you-need-to-change-14)
  - [RecommendedSets](#recommendedsets)
  - [What's new](#whats-new-14)
  - [Search](#search)
  - [What's new](#whats-new-15)
  - [What you need to change](#what-you-need-to-change-15)
  - [SizeGuides](#sizeguides)
  - [What's new](#whats-new-16)
  - [What you need to change](#what-you-need-to-change-16)
  - [SizeScales](#sizescales)
  - [What's new](#whats-new-17)
  - [What you need to change](#what-you-need-to-change-17)
  - [StaffMembers](#staffmembers)
  - [What's new](#whats-new-18)
  - [What you need to change](#what-you-need-to-change-18)
  - [Users](#users)
    - [What's new](#whats-new-19)
    - [What you need to change](#what-you-need-to-change-19)
  - [Wishlist](#wishlist)
  - [What's new](#whats-new-20)
  - [What you need to change](#what-you-need-to-change-20)

## General

### Selectors using `getEntity`

Previously, the `getEntity` selector returned either a specific
entity value or the whole entity, even if the id argument is `null`.

This results in unwanted side-effects, because if an id is given as `null`, the
selector returns the whole entity content, instead of the result of the provided
id. Ie, if `null` is provided, which is a value like any other, the result for
that specific entity should be returned, or undefined if it doesn’t exist;
instead of the current behaviour, which is “If the id is null, return everything”.

This doesn’t feel right because a specific value is given (`null` for this case)
and everything is returned instead. If the `null` key doesn’t exist, it should
return undefined, just like any other value that doesn’t exist.

**In practice:**

```js
// Given this state
{
  entities: {
    brands: {
      1000: {
        id: 1000,
        name: 'Brand 1',
      },
      2450: {
        id: 2450,
        name: 'Another Brand',
      },
      5555: {
        id: 5555,
        name: 'A Third Brand',
      },
    },
  },
};
```

Previously, the selector worked like this

```js
// Results in all entities of the given schema name
getEntity(state, 'brands');
getEntity(state, 'brands', null);
getEntity(state, 'brands', undefined);

{
  1000: {
    id: 1000,
    name: 'Brand 1',
  },
  2450: {
    id: 2450,
    name: 'Another Brand',
  },
  5555: {
    id: 5555,
    name: 'A Third Brand',
  },
};

// Results in a specific entity
getEntity(state, 'brands', 1000);

{
  1000: {
    id: 1000,
    name: 'Brand 1',
  },
}
```

With the changes introduced, it now works like this

```js
// Results in all entities of the given schema name
getEntities(state, 'brands');

{
  1000: {
    id: 1000,
    name: 'Brand 1',
  },
  2450: {
    id: 2450,
    name: 'Another Brand',
  },
  5555: {
    id: 5555,
    name: 'A Third Brand',
  },
};

// Results in undefined
getEntities(state, 'random');
getEntityById(state, 'brands');
getEntityById(state, 'brands', undefined);
getEntityById(state, 'brands', null);

undefined

// Results in a specific entity
getEntityById(state, 'brands', 1000);

{
  1000: {
    id: 1000,
    name: 'Brand 1',
  },
}
```

#### What you need to change

- Now there are 2 selectors with distinct jobs:
  - `getEntities` - Gets all entities of a given schema name
  - `getEntityById` - Gets a specific entity of the given schema name, by id

You need to replace your `getEntity` call for one of the selectors above, according to your need. For example:

- `getEntity(state, 'brands')` becomes `getEntities(state, 'brands')`
- `getEntity(state, 'brands', brandId)` becomes `getEntityById(state, 'brands', brandId)`

### Product Images

#### What's new

- The adapter `adapters.DEPRECATED_adaptProductImages()` was removed.

#### What you need to change

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

  // Now, called `images` since v1.x.x and the only way to access the product images
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

## Addresses

### What's new

- Action thunk creators, `doCreateAddress`, `doGetAddress`,
  `doGetAddressSchema`, `doGetAddresses`, `doGetDefaultContactAddress`,
  `doGetPredictionDetails`, `doGetPredictions`, `doDeleteAddress`,
  `doDeleteContactAddress`, `doResetPredictions`, `doSetDefaultBillingAddress`,
  `doSetDefaultContactAddress`, `doSetDefaultShippingAddress`, `doUpdateAddress`
  were renamed to `createAddress`, `fetchAddress`, `fetchAddressSchema`,
  `fetchAddresses`, `fetchDefaultContactAddress`, `fetchPredictionDetails`,
  `fetchPredictions`, `removeAddress`, `removeDefaultContactAddress`,
  `resetPredictions`, `setDefaultBillingAddress`, `setDefaultContactAddress`,
  `doSetDefaultShippingAddress` and `updateAddress` respectively.
- Actions are now pre-configured with the respective client, so you don't need
  to do it manually.
- All the action types names were changed:
  - The area changed `@farfetch/blackout-core` to `@farfetch/blackout-redux`
  - The verbs were changed when a action type was named `GET_` was changed to
    `FETCH_` and whenever the action type was named `DELETE_` was changed to
    `REMOVE_`.
    the action creator anymore (if you use the default `@farfetch/blackout-core` client provided).
- Actions now return the raw endpoint's response instead of returning the redux
  `dispatch` call.
- Factories were created to support the use case where you need to provide a
  custom client.
- LOGOUT_SUCCESS resets the addresses area to its initial state.
- The old predictionDetails now resets its content with the RESET_PREDICTION
  action.

### What you need to change

- Presets (Actions with client embedded), factories (actions without embedded
  client), selectors are all imported from `@farfetch/blackout-redux/addresses`.
- The return from doCreateAddress, now called createAddress (preset) and
  createAddressFactory (without client) now returns the raw response from the API
  instead of the normalized result as before.

## Bags

### What's new

- The function `createBagItemHash` was renamed.
- The action thunk creators `resetState` and `reset` were renamed to `resetBagState` and `resetBag`, respectively.
- The action creators `addBagItem`, `fetchBag`, `removeBagItem` and `updateBagItem` are now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default @farfetch/blackout-core client provided).
- The module `addBagItemFactory`, `fetchBagFactory`, `removeBagItemFactory` and `updateBagItemFactory` were created to support the use case where you need to provide a custom client for the action.
- The thunk factory you get by using our action factories + clients or our action presets changed its arguments:
  - `addBagItemFactory(some-client)` and `addBagItem` now receive `query` as a second argument and `config` as the third argument (instead of second);
  - `fetchBagFactory(some-client)` and `fetchBag` now receive `query` as a second argument and `config` as the third argument (instead of second);
  - `removeBagItemFactory(some-client)` and `removeBagItem` now receive `query` as a second argument and `config` as the third argument (instead of second);
  - `updateBagItemFactory(some-client)` and `updateBagItem` now receive `query` as a third argument and `config` as the fourth argument (instead of third).
- The action types `GET_BAG_*` , `ADD_ITEM_TO_BAG_*` and `DELETE_BAG_ITEM_*` were renamed to `FETCH_BAG_*`, `ADD_BAG_ITEM_*` and `DELETE_BAG_ITEM_*`, respectively.
- The selectors `createGetItemInBag` and `getItemWholeQuantity` were renamed to `findProductInBag` and `getProductQuantityInBag`.
- The `createGetItemInBag` selector (now named `findProductInBag`) receives two arguments: state and productParams (an object with `size` and `product`) - instead of receiving `state` and returning a function that receives `productParams`.
- The `getItemWholeQuantity` selector (now named `getProductQuantityInBag`) receives three props: `state`, `productId` and `sizeId` instead of `state` and `bagItem` (with `productId` and `sizeId`).
- The `bag` entity was removed.
- The `areBagItemsIdentical` util was removed.
- The bag reducer structure was changed, inside items now you have an object item where the error and isLoading status of each bag item is stored, instead of it being right inside items.
- The initial value of `items.ids` and `result` are no longer `[]` and `{}`, respectively, but `null` for both.
- The actions dispatched by `addBagItem`, `removeBagItem` and `updateBagItem` now have a meta object with bagItemId and data (provided to the action creator) and a payload with only the endpoint response, instead of payload with all of the above.

### What you need to change

- Rename `createBagItemHash` to `generateBagItemHash`

  ```js
  // Previously
  import { createBagItemHash } from '@farfetch/blackout-redux/bags/utils';

  // ...

  const hash = createBagItemHash(item);

  // Change to:
  import { generateBagItemHash } from '@farfetch/blackout-redux/bags/utils';

  // ...

  const hash = generateBagItemHash(item);
  ```

- Rename the actions without clients:

  ```jsx
  // Previously:
  import { resetState, reset } from '@farfetch/blackout-core/bags/redux';

  // Now:
  import { resetBagState, resetBag } from '@farfetch/blackout-redux/bags';
  ```

- Rename action which require clients:

  ```js
  // Previously
  import {
    doAddBagItem,
    doDeleteBagItem,
    doGetBag,
    doUpdateBagItem,
  } from '@farfetch/blackout-core/bags/redux';
  import {
    postBagItem,
    deleteBagItem,
    getBag,
    patchBagItem,
  } from '@farfetch/blackout-core/bags/client';

  const mapDispatchToProps = {
    addBagItem: doAddBagItem(postBagItem),
    deleteBagItem: doDeleteBagItem(deleteBagItem),
    getBag: doGetBag(getBag),
    updateBagItem: doUpdateBagItem(patchBagItem),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import {
    addBagItem,
    fetchBag,
    removeBagItem,
    updateBagItem,
  } from '@farfetch/blackout-redux/bags';

  const mapDispatchToProps = {
    addBagItem,
    fetchBag,
    removeBagItem,
    updateBagItem,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
    addBagItem,
    fetchBag,
    removeBagItem,
    updateBagItem,
  } from '@farfetch/blackout-redux/bags';
  import {
    addBagItemClient,
    fetchBagClient,
    removeBagItemClient,
    updateBagItemClient,
  } from 'my-bags-client';

  const mapDispatchToProps = {
    addBagItem: addBagItem(addBagItemClient),
    getBag: fetchBag(fetchBagClient),
    deleteBagItem: removeBagItem(removeBagItemClient),
    updateBagItem: updateBagItem(updateBagItemClient),
  };
  ```

- If you're using it, change your `config` prop to the next argument in all `bags` thunk factories:

  ```jsx
  import {
    addBagItem,
    fetchBag,
    removeBagItem,
    updateBagItem,
  } from '@farfetch/blackout-redux/bags';

  const addBagItemAction = addBagItem(addBagItemClient);
  const getBagAction = fetchBag(fetchBagClient);
  const deleteBagItemAction = removeBagItem(removeBagItemClient);
  const updateBagItemAction = updateBagItem(updateBagItemClient);

  // Previously:
  ...
  addBagItemAction(data, config)
  getBagAction(bagId, config)
  deleteBagItemAction(bagItemId, config)
  updateBagItemAction(bagItemId, data, config)
  ...

  // Change to:
  ...
  addBagItemAction(data, null, config)
  getBagAction(bagId, null, config)
  deleteBagItemAction(bagItemId, null, config)
  updateBagItemAction(bagItemId, data, null, config)
  ...
  ```

- Rename action types:

  ```jsx
  // Previously:
  import {
    GET_BAG_FAILURE,
    GET_BAG_REQUEST,
    GET_BAG_SUCCESS,
    ADD_ITEM_TO_BAG_FAILURE,
    ADD_ITEM_TO_BAG_REQUEST,
    ADD_ITEM_TO_BAG_SUCCESS,
    DELETE_BAG_ITEM_FAILURE,
    DELETE_BAG_ITEM_REQUEST,
    DELETE_BAG_ITEM_SUCCESS,
  } from '@farfetch/blackout-core/bag/redux';

  // Now:
  import {
    FETCH_BAG_FAILURE,
    FETCH_BAG_REQUEST,
    FETCH_BAG_SUCCESS,
    ADD_BAG_ITEM_FAILURE,
    ADD_BAG_ITEM_REQUEST,
    ADD_BAG_ITEM_SUCCESS,
    REMOVE_BAG_ITEM_FAILURE,
    REMOVE_BAG_ITEM_REQUEST,
    REMOVE_BAG_ITEM_SUCCESS,
  } from '@farfetch/blackout-redux/bag';
  ```

- Rename selectors:

  ```jsx
  // Previously:
  import {
    createGetItemInBag,
    getItemWholeQuantity,
  } from '@farfetch/blackout-core/bag/redux';

  // Now:
  import {
    findProductInBag,
    getProductQuantityInBag,
  } from '@farfetch/blackout-redux/bag';
  ```

- Change `createGetItemInBag` params:

  ```jsx
  // Previously:
  import { createGetItemInBag } from '@farfetch/blackout-core/bag/redux';

  ...

  const getItemInBag = createGetItemInBag(state);
  const itemInBag = getItemInBag(productParams);

  // Now:
  import { findProductInBag } from '@farfetch/blackout-redux/bag';

  ...

  const itemInBag = findProductInBag(state, productParams);
  ```

- Change `getItemWholeQuantity` params:

  ```jsx
  // Previously:
  import { getItemWholeQuantity } from '@farfetch/blackout-core/bag/redux';

  ...

  const itemQuantity = getItemWholeQuantity(state, bagItem);

  // Now:
  import { getProductQuantityInBag } from '@farfetch/blackout-redux/bag';

  ...

  const itemQuantity = getProductQuantityInBag(state, productId, sizeId);
  ```

- The reducer structure was changed:

  ```jsx
  // Previously:
  {
      entities: {
          products: {
              123456789: { ... }
          },
          bagItems: {
              1234: {
                  price: {...},
                  productId: 12346789
              }
          },
          bag: {
              'xxxx-xxxx-...': {
                  bagSummary: {...},
                  id: 'xxxx-xxxx-...',
                  items: [1234] // Array of bagItems ids
              }
          }
      },
      bag: {
          isLoading: false,
          error: null,
          id: 'xxxx-xxxx-...',
          bagItems: {
              isLoading: {},
              error: {},
          }
      }
  }

  // Now:
  {
      entities: {
          products: {
           123456789: { ... }
          },
          bagItems: {
              1234: {
                  price: {...},
                  productId: 12346789
              }
          }
      },
      bag: {
          isLoading: false,
          error: null,
          id: 'xxxx-xxxx-...',
          result: {
              bagSummary: {...},
              id: 'xxxx-xxxx-...',
          },
          items: {
              ids: [1234] // Array of bagItems ids
              item:{
                  isLoading: {},
                  error: {},
              }
          }
      }
  }
  ```

- Change any middleware that is catching bag actions.

  ```jsx
  // Previously
  dispatch({
    payload: { error },
    type: UPDATE_BAG_ITEM_FAILURE,
  });

  // Now
  dispatch({
    payload: { error, bagItemId },
    meta: {
      ...data,
      bagItemId,
      bagId,
    },
    type: UPDATE_BAG_ITEM_FAILURE,
  });
  ```

## Brands

### What's new

- The initial state of `brands` was changed, now `result` is initially `{}` instead of `null`;
- The action creators `fetchBrand` and `fetchBrands` are now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default @farfetch/blackout-core client provided);
- The module `fetchBrandFactory` and `fetchBrandsFactory` were created to support the use case where you need to provide a custom client for the action;
- The action `fetchBrand` and `fetchBrands` now return the raw endpoint's response instead of returning the redux `dispatch` call.

### What you need to change

- Change `brands` redux initial state if you're mocking it somewhere:

  ```jsx
  // Previously
  {
      error: {},
      hash: null,
      isLoading: {},
      result: null,
      };

  // Now
  {
      error: {},
      hash: null,
      isLoading: {},
      result: {},
  };
  ```

- Rename action which require clients:

  ```js
  // Previously
  import {
    fetchBrand,
    fetchBrands,
  } from '@farfetch/blackout-core/brands/redux';
  import { getBrand, getBrands } from '@farfetch/blackout-core/brands/client';

  const mapDispatchToProps = {
    fetchBrandAction: fetchBrand(getBrand),
    fetchBrandsAction: fetchBrands(getBrands),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import { fetchBrand, fetchBrands } from '@farfetch/blackout-redux/brands';

  const mapDispatchToProps = {
    fetchBrand,
    fetchBrands,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchBrand, fetchBrands } from '@farfetch/blackout-redux/brands';
  import { getBrandClient, getBrandsClient } from 'my-brands-client';

  const mapDispatchToProps = {
    fetchBrandAction: fetchBrand(getBrandClient),
    fetchBrandsAction: fetchBrands(getBrandsClient),
  };
  ```

- Make changes to receive new returned value of the `fetchBrand` and `fetchBrands` actions:

  ```js
  // Previously
  import { fetchBrand, fetchBrands } from "@farfetch/blackout-core/brands/redux";

  // Returns a redux action with payload, type and meta.
  const fetchBrandReduxAction = dispatch(fetchBrand(...));
  const fetchBrandsReduxAction = dispatch(fetchBrands(...));

  // Now
  import  { fetchBrand, fetchBrands } from "@farfetch/blackout-redux/brands";

  // Raw endpoint response
  const fetchBrandRawResponse = dispatch(fetchBrand(...));
  const fetchBrandsRawResponse = dispatch(fetchBrands(...));
  ```

## Categories

### What's new

- The function `createBagItemHash` was renamed.
- The action thunk creators `doGetCategories`, `doGetCategoriesTop` and `reset` were renamed to `fetchCategories`, `fetchTopCategories` and `resetCategoriesState` respectively.
- The action `fetchCategories` and `fetchTopCategories` are now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default `@farfetch/blackout-core` client provided).
- The module `fetchCategoriesFactory` and `fetchTopCategoriesFactory` were created to support the use case where you need to provide a custom client for the action.
- The action types `GET_CATEGORIES_*` and `RESET_CATEGORIES` were renamed to `FETCH_CATEGORIES_*` and `RESET_CATEGORIES_STATE` respectively.
- The selector `getCategories` was moved to `@farfetch/blackout-redux/entities/selectors` and now returns an object with hash/categories as key/value pairs.
- The selector `getCategoryById` was deleted, you can get the same functionality using `getCategory` from `@farfetch/blackout-redux/entities/selectors`.
- The reducer entries `isLoading` and `error` were previously used to store the loading/error status from both `fetchCategories` and `fetchTopCategories` actions. Now, to get the loading/error status from the `fetchTopCategories` action, you must use the new `areTopCategoriesLoading` and `getTopCategoriesError` selectors.

### What you need to change

- Rename the actions without clients:

  ```jsx
  // Previously
  import { reset } from '@farfetch/blackout-core/categories/redux';

  // Change to
  import { resetCategoriesState } from '@farfetch/blackout-redux/categories';
  ```

- Rename action which require clients:

  ```jsx
  // Previously
  import {
    doGetCategories,
    doGetCategoriesTop,
  } from '@farfetch/blackout-core/categories/redux';
  import {
    getCategories,
    getCategoriesTop,
  } from '@farfetch/blackout-core/categories/client';

  const mapDispatchToProps = {
    getCategoriesAction: doGetCategories(getCategories),
    getCategoriesTopAction: doGetCategoriesTop(getCategoriesTop),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchDesigners`, which is pre-configred with
  // our @farfetch/blackout-core client
  import {
    fetchCategories,
    fetchTopCategories,
  } from '@farfetch/blackout-redux/categories';

  const mapDispatchToProps = {
    getCategoriesAction: fetchCategories,
    getTopCategoriesAction: fetchTopCategories,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
    fetchCategoriesFactory,
    fetchTopCategoriesFactory,
  } from '@farfetch/blackout-redux/categories';
  import {
    myCategoriesClient,
    myTopCategoriesClient,
  } from 'my-categories-clients';

  const mapDispatchToProps = {
    getCategoriesAction: fetchCategoriesFactory(myCategoriesClient),
    getTopCategoriesAction: fetchTopCategoriesFactory(myTopCategoriesClient),
  };
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```jsx
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/categories/redux';

  // ...
  actionTypes.GET_CATEGORIES_FAILURE;
  actionTypes.GET_CATEGORIES_REQUEST;
  actionTypes.GET_CATEGORIES_SUCCESS;
  actionTypes.RESET_CATEGORIES;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/categories';

  // ...
  actionTypes.FETCH_CATEGORIES_FAILURE;
  actionTypes.FETCH_CATEGORIES_REQUEST;
  actionTypes.FETCH_CATEGORIES_SUCCESS;
  actionTypes.RESET_CATEGORIES_STATE;
  ```

- Rename the selectors and change the usage:

  ```jsx
  // Previously
  import {
    getCategories,
    getCategoryById,
  } from '@farfetch/blackout-core/categories/redux';

  // Change to:
  import {
    getCategories,
    getCategory,
  } from '@farfetch/blackout-redux/entities';
  ```

- The reducer structure was changed:

  ```jsx
  // Previously
  {
      isLoading: true,
      error: null,
      hash: '/hash',
      top: [ ... ]
  }

  // Change to:
  {
      isLoading: true,
      error: null,
      hash: '/hash',
      top: {
          isLoading: true,
          error: null,
          result: [ ... ]
      }
  }
  ```

## Checkout

### What's new

- Action thunk creators, `doGetCharges`, `doCompletePaymentCheckout`, `doCreateCheckout`,
  `doGetCheckout`, `doGetCheckoutDetails`, `doGetCollectPoints`, `doGetDeliveryBundleUpgrades`,
  `doGetItemDeliveryProvisioning`, `doGetUpgradeItemDeliveryProvisioning`, `doPostCharges`,
  `doResetCharges`, `doSetItemTags`, `doSetPromocode`,
  `doSetTags`, `doUpdateCheckout`, `doUpdateDeliveryBundleUpgrade`, `doUpdateDeliveryBundleUpgrades`, and `doUpdateGiftMessage`
  were renamed to `charge`, `completePaymentCheckout`, `createCheckout`, `fetchCharges`, `fetchCheckoutDetails`, `fetchCheckout`, `fetchCollectPoints`, `fetchDeliveryBundleUpgrades`, `fetchItemDeliveryProvisioning`, `fetchUpgradeItemDeliveryProvisioning`, `resetCheckoutState`, `resetChargesState`, `setItemTags`, `setPromocode`, `setTags`, `updateCheckout`, `updateDeliveryBundleUpgrade`, `updateDeliveryBundleUpgrades` and `updateGiftMessage`,
- Action types `CREATE_CHECKOUT_*`, `FETCH_CHARGES_*`, `CHARGE_*`,
  `RESET_CHARGES_STATE`, `COMPLETE_PAYMENT_CHECKOUT_*`, `FETCH_CHECKOUT_*`, `RESET_CHECKOUT_STATE`,
  `FETCH_CHECKOUT_DETAILS_*`, `FETCH_COLLECT_POINTS_*`, `FETCH_ITEM_DELIVERY_PROVISIONING_*`,
  `FETCH_DELIVERY_BUNDLE_UPGRADES_*`, `FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_*`, `SET_ITEM_TAGS_*`,
  `SET_PROMOCODE_*`, `SET_TAGS_*`, `UPDATE_CHECKOUT_*`, `UPDATE_DELIVERY_BUNDLE_UPGRADE_*`,
  `UPDATE_DELIVERY_BUNDLE_UPGRADES_*`, and `UPDATE_GIFT_MESSAGE_*`
  were renamed to `CREATE_CHECKOUT_*`, `FETCH_CHARGES_*`, `CHARGE_*`,
  `RESET_CHARGES_STATE`, `COMPLETE_PAYMENT_CHECKOUT_*`, `FETCH_CHECKOUT_*`, `RESET_CHECKOUT_STATE`,
  `FETCH_CHECKOUT_DETAILS_*`, `FETCH_COLLECT_POINTS_*`, `FETCH_ITEM_DELIVERY_PROVISIONING_*`,
  `FETCH_DELIVERY_BUNDLE_UPGRADES_*`, `FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_*`, `SET_ITEM_TAGS_*`,
  `SET_PROMOCODE_*`, `SET_TAGS_*`, `UPDATE_CHECKOUT_*`, `UPDATE_DELIVERY_BUNDLE_UPGRADE_*`,
  `UPDATE_DELIVERY_BUNDLE_UPGRADES_*`, and `UPDATE_GIFT_MESSAGE_*`.
- Actions are now pre-configured with the respective client, so you don't need to configure
  the action creator anymore (if you use the default `@farfetch/blackout-core` client provided).
- Actions now return the raw endpoint's response instead of returning the redux `dispatch` call.
- Factories were created to support the use case where you need to provide a custom client.
- LOGOUT_SUCCESS resets the payments area to its initial state.

### What you need to change

- Rename the actions without clients:

  ```js
  // Previously
  import {
    doCreateCheckout,
    doGetCheckout,
    doGetCheckoutDetails,
    ...
  } from '@farfetch/blackout-core/checkout/redux';

  // Change to
  import {
    createCheckout,
    fetchCheckout,
    fetchCheckoutDetails,
    ...
  } from '@farfetch/blackout-redux/checkout';
  ```

- Rename actions which require clients:

  ```js
  // Previously
  import {
    postCheckout
    getCheckout,
    getCheckoutDetails,
    ...
  } from '@farfetch/blackout-core/checkout/client';
  import {
    doCreateCheckout,
    doGetCheckout,
    doGetCheckoutDetails,
    ...
  } from '@farfetch/blackout-core/checkout/redux';

  export const mapDispatchToProps = {
    createCheckout: doCreateCheckout(postCheckout),
    getCheckout: doGetCheckout(getCheckout),
    getCheckoutDetails: doGetCheckoutDetails(getCheckoutDetails),
    ...
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import {
    createCheckout,
    fetchCheckout,
    fetchCheckoutDetails,
    ...
  } from '@farfetch/blackout-redux/checkout';

  const mapDispatchToProps = {
    createCheckoutAction: createCheckout,
    fetchCheckoutAction: fetchCheckout,
    fetchCheckoutDetailsAction: fetchCheckoutDetails,
    ...
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
    createCheckoutFactory,
    fetchCheckoutClientFactory,
    fetchCheckoutDetailsFactory,
    ...
  } from '@farfetch/blackout-redux/checkout';
  import {
    createCheckoutClient,
    fetchCheckoutClient,
    fetchCheckoutDetailsClient,
    ...
  } from "client-path";

  const mapDispatchToProps = {
    fetchCheckoutDetailsAction: fetchCheckoutDetailsFactory(
      fetchCheckoutDetailsClient
    ),
    fetchCheckoutAction: fetchCheckoutFactory(fetchCheckoutClient),
    fetchCheckoutDetailsAction: fetchCheckoutDetailsFactory(
      fetchCheckoutDetailsClient
    ),
    ...
  };
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/payments/redux';

  // ...
  actionTypes.DELETE_INSTRUMENT_*;
  actionTypes.GET_INSTRUMENTS_*;
  actionTypes.POST_INSTRUMENT_*;
  ...

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/payments';

  // ...
  actionTypes.REMOVE_INSTRUMENT_*;
  actionTypes.FETCH_INSTRUMENTS_*;
  actionTypes.CREATE_INSTRUMENT_*;
  ...
  ```

- Change selectors usage:

  ```js
  // Previously
  import {
    getInstruments,
    getInstrumentsError,
    isInstrumentsLoading,
    ...
  } from '@farfetch/blackout-core/payments/redux';

  // Change to:
  import {
    getInstruments,
    getInstrumentsError,
    isInstrumentsLoading,
    ...
  } from '@farfetch/blackout-redux/payments';
  ```

## Contents

### What's new

- The functions `buildContentHash` and `buildSEOPathname` was renamed.

### What you need to change

- Rename `buildContentHash` to `generateContentHash`

  ```js
  // Previously
  import { buildContentHash } from '@farfetch/blackout-redux/contents/utils';

  // ...

  const hash = buildContentHash(item);

  // Change to:
  import { generateContentHash } from '@farfetch/blackout-redux/contents/utils';

  // ...

  const hash = generateContentHash(item);
  ```

- Rename `buildSEOPathname` to `generateSEOPathname`

  ```js
  // Previously
  import { buildSEOPathname } from '@farfetch/blackout-redux/contents/utils';

  // ...

  const hash = buildSEOPathname(item);

  // Change to:
  import { generateSEOPathname } from '@farfetch/blackout-redux/contents/utils';

  // ...

  const hash = generateSEOPathname(item);
  ```

## Designers

### What's new

- The designers hash is no longer based on the subfolder (nor country structure).
- The function `buildDesignerResultHash` was renamed and no longer needs the `subfolder` argument.
- The action thunk creators `doGetDesigners` and reset were renamed to `fetchDesigners` and `resetDesignersState` respectively.
- The action `fetchDesigners` is now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default `@farfetch/blackout-core` client provided)
- The module `fetchDesignersFactory` was created to support the use case where you need to provide a custom client for the action.
- The action types `GET_DESIGNERS_*`, `RESET_DESIGNERS` and `SET_DESIGNER_RESULT_HASH` were renamed to `FETCH_DESIGNERS_*`, `RESET_DESIGNERS_STATE` and `SET_DESIGNERS_RESULT_HASH` respectively.
- The selectors `getDesignerResultHash` and `isDesignerResultInCache` were renamed to `getDesignersResultHash` and `isDesignersResultCached`, respectively.
- The reducer entry `result` was added to the designer's reducer. The `designersResult` entity was removed.

### What you need to change

- You no longer need to set the `options` in your project (`buildStore.js` file) for designers (you may need it for some other areas, however)

- Rename `buildDesignerResultHash` to `generateDesignerResultHash` and remove the `subfolder` argument.

  ```js
  // Previously
  import { buildDesignerResultHash } from '@farfetch/blackout-redux/designers/utils';

  // ...

  const hash = buildDesignerResultHash(subfolder, query);

  // Change to:
  import { generateDesignerResultHash } from '@farfetch/blackout-redux/designers/utils';

  // ...

  const hash = generateDesignerResultHash(query);
  ```

- Rename the actions without clients:

  ```jsx
  // Previously
  import { reset } from '@farfetch/blackout-core/designers/redux';

  // Change to
  import { resetDesignersState } from '@farfetch/blackout-redux/designers';
  ```

- Rename action which require clients:

  ```jsx
  // Previously
  import { doGetDesigners } from '@farfetch/blackout-core/designers/redux';
  import { getDesigners } from '@farfetch/blackout-core/designers/client';

  const mapDispatchToProps = {
    getDesignersAction: doGetDesigners(getDesigners),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchDesigners`, which is pre-configred with
  // our @farfetch/blackout-core client
  import { fetchDesigners } from '@farfetch/blackout-redux/designers';

  const mapDispatchToProps = {
    getDesignersAction: fetchDesigners,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchDesignersFactory } from '@farfetch/blackout-redux/designers';
  import myDesignersClient from 'my-designers-client';

  const mapDispatchToProps = {
    getDesignersAction: fetchDesignersFactory(myDesignersClient),
  };
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```jsx
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/designers/redux';

  // ...
  actionTypes.GET_DESIGNERS_FAILURE;
  actionTypes.GET_DESIGNERS_REQUEST;
  actionTypes.GET_DESIGNERS_SUCCESS;
  actionTypes.RESET_DESIGNERS;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/designers';

  // ...
  actionTypes.FETCH_DESIGNERS_FAILURE;
  actionTypes.FETCH_DESIGNERS_REQUEST;
  actionTypes.FETCH_DESIGNERS_SUCCESS;
  actionTypes.RESET_DESIGNERS_STATE;
  ```

- Rename the selectors and change the usage:

  ```jsx
  // Previously
  import {
    getDesignerResultHash,
    isDesignerResultInCache,
  } from '@farfetch/blackout-core/designers/redux';

  // Change to:
  import {
    getDesignersResultHash,
    isDesignersResultCached,
  } from '@farfetch/blackout-redux/designers';
  ```

- The reducer structure was changed:

  ```jsx
  // Previously
  {
    error: {},
    hash: null,
    isLoading: {},
  }

  // Change to:
  {
    error: {},
    hash: null,
    isLoading: {},
    result: { ... },
  };
  ```

## Locale:

### What's new

- We have changed the scope `countries|country` to improve the readability and the developer experience.
- Actions, Action types, Selectors, and the Server Initial State have changed to adopt the new nomenclature.

### What do you need to change:

- Rename the actions:

  ```jsx
  // Previously:
  import {
    fetchCities,
    fetchCurrencies,
    fetchStates,
    resetLocale,
    setCountry,
  } from '@farfetch/blackout-core/locale/redux';

  // Now:
  import {
    fetchCountryCities,
    fetchCountryCurrencies,
    fetchCountryStates,
    resetLocaleState,
    setCountryCode,
  } from '@farfetch/blackout-redux/locale';
  ```

- Rename the actions/factories:

  ```jsx
  // Previously:
  import {
    fetchCitiesFactory,
    fetchCurrenciesFactory,
    fetchStatesFactory,
  } from '@farfetch/blackout-core/locale/redux';

  // Now:
  import {
    fetchCountryCitiesFactory,
    fetchCountryCurrenciesFactory,
    fetchCountryStatesFactory,
  } from '@farfetch/blackout-redux/locale';
  ```

- Rename action types:

  ```jsx
  // Previously:
  import {
    FETCH_CITIES_FAILURE,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_STATES_FAILURE,
    FETCH_STATES_REQUEST,
    FETCH_STATES_SUCCESS,
    SET_COUNTRY,
    RESET_LOCALE,
  } from '@farfetch/blackout-core/locale/redux';

  // Now:
  import {
    FETCH_COUNTRY_CITIES_FAILURE,
    FETCH_COUNTRY_CITIES_REQUEST,
    FETCH_COUNTRY_CITIES_SUCCESS,
    FETCH_COUNTRY_CURRENCIES_FAILURE,
    FETCH_COUNTRY_CURRENCIES_REQUEST,
    FETCH_COUNTRY_CURRENCIES_SUCCESS,
    FETCH_COUNTRY_STATES_FAILURE,
    FETCH_COUNTRY_STATES_REQUEST,
    FETCH_COUNTRY_STATES_SUCCESS,
    SET_COUNTRY_CODE,
    RESET_LOCALE_STATE,
  } from '@farfetch/blackout-redux/locale';
  ```

- Rename selectors:

  ```jsx
  // Previously:
  import {
    getAreCitiesLoading,
    getAreCurrenciesLoading,
    getAreStatesLoading,
    getCitiesByStateId,
    getCitiesError,
    getCultureCode,
    getCurrenciesByCountryCode,
    getCurrencyCode,
    getCurrenciesError,
    getSubfolder,
    getStatesByCountryCode,
    getStatesError,
  } from '@farfetch/blackout-core/locale/redux';

  // Now:
  import {
    getAreCountryCitiesLoading,
    getAreCountryCurrenciesLoading,
    getAreCountryStatesLoading,
    getCountryCities,
    getCountryCitiesError,
    getCountryCultureCode,
    getCountryCurrencies,
    getCountryCurrencyCode,
    getCountryCurrenciesError,
    getCountryStates,
    getCountryStatesError,
    getCountryStructure,
  } from '@farfetch/blackout-redux/locale';
  ```

- ServerInitialState model changed on cultures and structures:

  ```jsx
  // Previously:
  const { entities } = normalize(
    {
      code: countryCode,
      cultureCode,
      currencies: [
        {
          isoCode: currencyCode,
          cultureCode: currencyCultureCode,
        },
      ],
      newsletterSubscriptionOptionDefault,
      platformId: countryId,
      structure: subfolder,
    },
    country,
  );

  // Now:
  const { entities } = normalize(
    {
      code: countryCode,
      cultures: [cultureCode],
      currencies: [
        {
          isoCode: currencyCode,
          cultureCode: currencyCultureCode,
        },
      ],
      newsletterSubscriptionOptionDefault,
      platformId: countryId,
      structure: subfolder,
    },
    country,
  );
  ```

## Orders

#### What's new

- All the action types names were changed:
  - The verbs were changed when an action type was named `GET_` was changed to
    `FETCH_` and whenever the action type was named `POST_` was changed to
    `ADD_`.
- The action thunk creators were renamed, following the above principle

### What you need to change

- Rename the action types if you use them in any custom reducer/middleware:

```js
import { actionTypes } from '@farfetch/blackout-client/orders/redux';

// Previously
actionTypes.GET_ORDER_DETAILS_FAILURE;
actionTypes.GET_ORDER_DETAILS_REQUEST;
actionTypes.GET_ORDER_DETAILS_SUCCESS;

actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE;
actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST;
actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS;

actionTypes.GET_ORDERS_FAILURE;
actionTypes.GET_ORDERS_REQUEST;
actionTypes.GET_ORDERS_SUCCESS;

actionTypes.GET_TRACKINGS_FAILURE;
actionTypes.GET_TRACKINGS_REQUEST;
actionTypes.GET_TRACKINGS_SUCCESS;

actionTypes.GET_ORDER_DOCUMENTS_FAILURE;
actionTypes.GET_ORDER_DOCUMENTS_REQUEST;
actionTypes.GET_ORDER_DOCUMENTS_SUCCESS;

actionTypes.GET_ORDER_DOCUMENT_FAILURE;
actionTypes.GET_ORDER_DOCUMENT_REQUEST;
actionTypes.GET_ORDER_DOCUMENT_SUCCESS;

actionTypes.POST_ORDER_DOCUMENT_FAILURE;
actionTypes.POST_ORDER_DOCUMENT_REQUEST;
actionTypes.POST_ORDER_DOCUMENT_SUCCESS;

// Change to
actionTypes.FETCH_ORDER_DETAILS_FAILURE;
actionTypes.FETCH_ORDER_DETAILS_REQUEST;
actionTypes.FETCH_ORDER_DETAILS_SUCCESS;

actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS;

actionTypes.FETCH_ORDERS_FAILURE;
actionTypes.FETCH_ORDERS_REQUEST;
actionTypes.FETCH_ORDERS_SUCCESS;

actionTypes.FETCH_TRACKINGS_FAILURE;
actionTypes.FETCH_TRACKINGS_REQUEST;
actionTypes.FETCH_TRACKINGS_SUCCESS;

actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE;
actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST;
actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS;

actionTypes.FETCH_ORDER_DOCUMENT_FAILURE;
actionTypes.FETCH_ORDER_DOCUMENT_REQUEST;
actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS;

actionTypes.ADD_ORDER_DOCUMENT_FAILURE;
actionTypes.ADD_ORDER_DOCUMENT_REQUEST;
actionTypes.ADD_ORDER_DOCUMENT_SUCCESS;
```

- Rename the action thunk creators:

```js
// Previously
import {
  doPostOrderDocument,
  doGetOrderDetails,
  doGetOrderDetailsGuestUser,
  doGetOrderDocument,
  doGetOrderDocuments,
  doGetOrderReturnOptions,
  doGetOrders,
  doGetTracking,
  doResetOrders,
} from '@farfetch/blackout-core/orders/redux';

// Change to
import {
  addOrderDocument,
  fetchOrderDetails,
  fetchOrderDetailsGuestUser,
  fetchOrderDocument,
  fetchOrderDocuments,
  fetchOrderReturnOptions,
  fetchOrders,
  fetchTrackings,
  resetOrders,
} from '@farfetch/blackout-client/orders/redux';
```

## Merchants Locations:

### What's new

- The entity file name `merchantsLocations` was renamed to `merchantLocation`.
- The entity is called `merchantsLocations`.
- The action thunk creators `doGetMerchantsLocations` and `reset` were renamed to
  `fetchMerchantsLocations` and `resetMerchantsLocations` respectively.
- The action `fetchMerchantsLocations` is now pre-configured with the respective client, so you
  don't need to configure the action creator anymore (if you use the default `@farfetch/blackout-core` client
  provided).
- The module `fetchMerchantsLocationsFactory` was created to support the use case where you need to
  provide a custom client for the action.
- The action `fetchMerchantsLocations` now return the raw endpoint's response instead of returning the redux `dispatch` call.
- The action types `GET_MERCHANTS_LOCATIONS_*` were renamed to
  `FETCH_MERCHANTS_LOCATIONS_*`.
- The selectors `getAllMerchantsLocations` and `getMerchantLocation` were removed.
  We already have them on: `@farfetch/blackout-redux/entities/selectors/merchantsLocations` -
  `getMerchansLocations` and `getMerchantLocation`.
- The selector `getMerchantsLocations` was renamed to `getMerchantsLocationsByIds`
  and moved to the `@farfetch/blackout-redux/entities/selectors/merchantsLocations`.

### What you need to change

- Rename the actions without clients:

  ```js
  // Previously
  import { reset } from '@farfetch/blackout-core/merchantsLocations/redux';

  // Change to
  import { resetMerchantsLocations } from '@farfetch/blackout-redux/merchantsLocations';
  ```

- Rename action which require clients:

  ```js
  // Previously
  import { doGetMerchantsLocations } from '@farfetch/blackout-core/merchantsLocations/redux';
  import { getMerchantsLocations } from '@farfetch/blackout-core/merchantsLocations/client';

  const mapDispatchToProps = {
    getMerchantsLocations: doGetMerchantsLocations(getMerchantsLocations),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchMerchantsLocations`, which is pre-configred with
  // our `@farfetch/blackout-core` client
  import { fetchMerchantsLocations } from '@farfetch/blackout-redux/merchantsLocations';

  const mapDispatchToProps = {
    fetchMerchantsLocationsAction: fetchMerchantsLocations,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchMerchantsLocationsFactory } from '@farfetch/blackout-redux/merchantsLocations';
  import myMerchantsLocationsClient from 'my-merchantsLocations-client';

  const mapDispatchToProps = {
    fetchMerchantsLocationsAction: fetchMerchantsLocationsFactory(
      myMerchantsLocationsClient,
    ),
  };
  ```

- Make changes to receive new returned value of the `fetchMerchantsLocations` action:

  ```js
  // Previously
  import { doGetMerchantsLocations } from "@farfetch/blackout-core/merchantsLocations/redux";

  // Returns a redux action with payload, type and meta.
  const reduxAction = dispatch(doGetMerchantsLocations(...));

  // Now
  import { fetchMerchantsLocations } from "@farfetch/blackout-redux/merchantsLocations";

  // Raw endpoint response
  const rawResponse = dispatch(fetchMerchantsLocations(...));
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/merchantsLocations/redux';

  // ...
  actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE;
  actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST;
  actionTypes.GET_MERCHANTS_LOCATIONS_SUCCESS;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/merchantsLocations';

  // ...
  actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE;
  actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST;
  actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS;
  ```

- Rename the selectors and change the usage:

  ```js
  // Previously
  import {
    getAllMerchantsLocations,
    getMerchantLocation,
    getMerchantsLocations,
  } from '@farfetch/blackout-core/merchantsLocations/redux';

  // Change to:
  import {
    getMerchantsLocations,
    getMerchantLocation,
    getMerchantsLocationsByIds,
  } from '@farfetch/blackout-redux/merchantsLocations';
  ```

## Payments

### What's new

- Action thunk creators:

  - `doPostCharges` renamed to `charge`
  - `doPostInstruments` renamed to `createInstruments`
  - `doGetCharges` renamed to `fetchCharges`
  - `doPostCreditBalance` renamed to `fetchCreditBalance`
  - `doPostGiftCardBalance` renamed to `fetchGiftCardBalance`
  - `doGetInstrument` renamed to `fetchInstrument`
  - `doGetInstruments` renamed to `fetchInstruments`
  - `doGetIntent` renamed to `fetchIntent`
  - `doGetPaymentMethodsByCountryAndCurrency` renamed to `fetchPaymentMethodsByCountryAndCurrency`
  - `doGetPaymentMethods` renamed to `fetchPaymentMethods`
  - `doGetPaymentTokens` renamed to `fetchPaymentTokens`
  - `doDeleteInstrument` renamed to `removeInstrument`
  - `doDeletePaymentToken` renamed to `removePaymentToken`
  - `doPutInstruments` renamed to `updateInstruments`

- Action types:

  - `POST_CHARGES_*` renamed to `CHARGE_*`
  - `POST_INSTRUMENT_*` renamed to `CREATE_INSTRUMENT_*`
  - `GET_CHARGES_*` renamed to `FETCH_CHARGES_*`
  - `POST_CREDIT_BALANCE_*` renamed to `FETCH_CREDIT_BALANCE_*`
  - `POST_GIFT_CARD_BALANCE_*` renamed to `FETCH_GIFT_CARD_BALANCE_*`
  - `GET_INSTRUMENT_*` renamed to `FETCH_INSTRUMENT_*`
  - `GET_INSTRUMENTS_*` renamed to `FETCH_INSTRUMENTS_*`
  - `GET_INTENT_*` renamed to `FETCH_INTENT_*`
  - `GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_*` renamed to `FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_*`
  - `GET_PAYMENT_METHODS_*` renamed to `FETCH_PAYMENT_METHODS_*`
  - `GET_PAYMENT_TOKENS_*` renamed to `FETCH_PAYMENT_TOKENS_*`
  - `DELETE_INSTRUMENT_*` renamed to `REMOVE_INSTRUMENT_*`
  - `DELETE_PAYMENT_TOKEN_*` renamed to `REMOVE_PAYMENT_TOKEN_*`
  - `PUT_INSTRUMENT_*` renamed to `UPDATE_INSTRUMENT_*`
  - `RESET_INSTRUMENTS` renamed to `RESET_INSTRUMENTS_STATE`
  - `RESET_CHARGES` renamed to `RESET_CHARGES_STATE`

- Actions are now pre-configured with the respective client, so you don't need to configure
  the action creator anymore (if you use the default `@farfetch/blackout-core` client provided).
- Actions now return the raw endpoint's response instead of returning the redux `dispatch` call.
- Factories were created to support the use case where you need to provide a custom client.
- LOGOUT_SUCCESS resets the payments area to its initial state.

### What's no longer supported

- Action thunk creators removed: `doPostTransaction`, `doPostPayments`, `doGetTransaction`

- Action types removed: `POST_TRANSACTION_*`, `POST_PAYMENTS_*`, `GET_TRANSACTION_*`

### What you need to change

- Rename the actions without clients:

```js
// Previously
import {
  doDeleteInstrument,
  doGetInstruments,
  doPostInstruments,
  ...
} from '@farfetch/blackout-core/payments/redux';

// Change to
import {
  removeInstrument,
  fetchInstruments,
  createInstruments,
  ...
} from '@farfetch/blackout-redux/payments';
```

- Rename actions which require clients:

```js
// Previously
import {
  deleteInstrument,
  getInstruments as fetchInstruments,
  postInstruments,
  ...
} from '@farfetch/blackout-core/payments/client';
import {
  doDeleteInstrument,
  doGetInstruments,
  doPostInstruments,
  ...
} from '@farfetch/blackout-core/payments/redux';

export const mapDispatchToProps = {
  addInstruments: doPostInstruments(postInstruments),
  deleteInstrument: doDeleteInstrument(deleteInstrument),
  getInstruments: doGetInstruments(fetchInstruments),
  ...
};

// Change to:

// If you don't need a custom client, you can use the new
// presets, which are pre-configred with our `@farfetch/blackout-core` client
import {
  removeInstrument,
  fetchInstruments,
  createInstruments,
  ...
} from '@farfetch/blackout-redux/payments';

const mapDispatchToProps = {
  removeInstrumentAction: removeInstrument,
  fetchInstrumentsAction: fetchInstruments,
  createInstrumentsAction: createInstruments,
  ...
};

// If you need a custom client, just append "Factory" to the desired action
import {
  removeInstrumentFactory,
  fetchInstrumentsFactory,
  createInstrumentsFactory,
  ...
} from '@farfetch/blackout-redux/payments';
import {
  removeInstrumentClient,
  fetchInstrumentsClient,
  createInstrumentsClient,
  ...
} from "my-search-client";

const mapDispatchToProps = {
  removeInstrumentAction: removeInstrumentFactory(removeInstrumentClient),
  fetchInstrumentsAction: fetchInstrumentsFactory(fetchInstrumentsClient),
  createInstrumentsAction: createInstrumentsFactory(createInstrumentsClient),
  ...
};
```

- Rename the action types if you use them in any custom reducer/middleware:

```js
// Previously
import { actionTypes } from '@farfetch/blackout-core/payments/redux';

// ...
actionTypes.DELETE_INSTRUMENT_*;
actionTypes.GET_INSTRUMENTS_*;
actionTypes.POST_INSTRUMENT_*;
...

// Change to:
import { actionTypes } from '@farfetch/blackout-redux/payments';

// ...
actionTypes.REMOVE_INSTRUMENT_*;
actionTypes.FETCH_INSTRUMENTS_*;
actionTypes.CREATE_INSTRUMENT_*;
...
```

- Change selectors usage:

```js
// Previously
import {
  getInstruments,
  getInstrumentsError,
  isInstrumentsLoading,
  ...
} from '@farfetch/blackout-core/payments/redux';

// Change to:
import {
  getInstruments,
  getInstrumentsError,
  isInstrumentsLoading,
  ...
} from '@farfetch/blackout-redux/payments';
```

## Products

### What's new

- The `getHierarchicalFacetsWithChildren` selector now receives an object as third argument - options.
- We have two different endpoints and actions for listings and sets, but they have the same goal - they’re lists of products.
  With this in mind, we have a [new entity called `productsList`](#products-lists-listing-and-sets) to replace the previous entities `listings` and `sets`,
  where the entity is identified by its `hash`, with a identifier `listing` or `sets`.
  For the reducer, instead of having `products.listing` and `products.sets`, now we have `products.lists`.
- The listing hash (products list hash now) no longer needs the subfolder. You should reset all the products lists entities when changing country
  to avoid data with errors.
- The util `buildListingHash` was renamed to `generateProductsListHash`.
- The `getListingActiveFiltersCount` selector was removed from `@farfetch/blackout-core/product/listing/redux`.
- The action thunk creators `reset` and `resetState` from `@farfetch/blackout-core/products/details/redux` were renamed to `resetProductDetails` and `resetProductDetailsState`, respectively.
- The action thunk creators `reset` and `resetState` from `@farfetch/blackout-core/products/listing/redux` were renamed to `resetProductsLists` and `resetProductsListsState`, respectively - with this we can reset all the productsLists entities and the reducer products.list with all the data related to listings and sets.
- There are new action creators `fetchListing`, `fetchProductAttributes`, `fetchProductColorGrouping`,`fetchProductDetails`, `fetchProductFittings`, `fetchProductMeasurements`, `fetchProductVariantsByMerchantsLocations`, `fetchProductSizeGuides`, `fetchProductSizes` and `fetchSet` are now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default @farfetch/blackout-core client provided).
- The modules `fetchListingFactory`, `fetchProductAttributesFactory`, `fetchProductColorGroupingFactory`,`fetchProductDetailsFactory`, `fetchProductFittingsFactory`, `fetchProductMeasurementsFactory`, `fetchProductVariantsByMerchantsLocationsFactory`, `fetchProductSizeGuidesFactory`, `fetchProductSizesFactory` and `fetchSetFactory` were created to support the use case where you need to provide a custom client for the action.
- The actions `fetchListing`, `fetchProductAttributes`, `fetchProductColorGrouping`,`fetchProductDetails`, `fetchProductFittings`, `fetchProductMeasurements`, `fetchProductVariantsByMerchantsLocations`, `fetchProductSizeGuides`, `fetchProductSizes` and `fetchSet` now return the raw endpoint's response instead of returning the redux `dispatch` call.
- The action `fetchProductColorGrouping` only stores the last request in the store, i.e., before the action returned an array with multiple color groupings (appended to the already existing) and now just returns an object with the result of the respective request. With this in mind, the tenant/stakeholder should be responsible to do what it wants with the data, e.g: store all the color grouping with page indexes.
- The actions `doGetRecommendedSet` and `doGetRelatedSets` were removed. You should use the `fetchSet` action.
- The action `fetchSet` is now similar to the `fetchListing` action, so now receives a slug (string|number) and some options related to store the sets hash (`options.setProductsListHash`) and to cache the payload (`options.useCache`).
- The action `doGetSizeScale` was removed - we already have the `sizeScales` chunk.
- The action `doGetNextListing` was removed, because the tenant should handle its own pagination logic according to its needs, using always the `fetchListing` action.
- The action types `GET_COLOR_GROUPING_{*}` , `GET_MEASUREMENTS_{*}`, `GET_PRODUCT_ATTRIBUTES_{*}`,
  `GET_PRODUCT_DETAILS_{*}`, `GET_PRODUCT_MERCHANTS_LOCATIONS_{*}`, `GET_PRODUCT_SIZEGUIDES_{*}` and `GET_PRODUCT_SIZES_{*}` were renamed to
  `FETCH_COLOR_GROUPING_{*}`, `FETCH_PRODUCT_MEASUREMENTS_{*}`, `FETCH_PRODUCT_ATTRIBUTES_{*}`,
  `FETCH_PRODUCT_DETAILS_{*}`, `FETCH_PRODUCT_MERCHANTS_LOCATIONS_{*}`, `FETCH_PRODUCT_SIZEGUIDES_{*}` and `FETCH_PRODUCT_SIZES_{*}` respectively.
- The action types `GET_RECOMMENDED_SET_{*}` and `GET_LISTING_{*}` now are the same action type - `FETCH_PRODUCTS_LIST_{*}`.
- On the reducer, the `id` property no longer exists, since we fetch a lot of products and keeping the id of the last one fetched doesn’t look useful.
- The selector `getProductColorGroupingCurrentPageIndex` was removed, because the strategy has changed - we can now use the `getProductColorGroupingPagination` selector.
- The selector `getDigitalAssetsFromColorGrouping` was removed because the strategy has changed - we can now use the `getProductColorGrouping` selector.
- The selector `getColorGroupingByPageIndex` was removed, because the strategy has changed - we can now use the `getProductColorGroupingPagination` selector.
- The selector `getColorGroupingTotalPages` was removed because the strategy has changed - we can now use the `getProductColorGroupingPagination` selector.
- The selectors `isNextListingLoading` and `isInfiniteListingLoading` were removed
  because the infinite scroll feature should be developed on the tenant side.
- The selector `getRedirectUrl` was removed.
- The selector `getListingActiveFiltersCount` was removed.
- The selector `isProductWithColorGrouping` was renamed to `hasProductColorGrouping`.
- The `createGetProductRemainingQuantity` selector (now named `getProductSizeRemainingQuantity`) receives three arguments: `(state, productId, sizeId)` - instead of receiving `(state, productId)` and
  returning a function that receives `sizeId`.
- The selector `isRecommendedSetLoading` was renamed to `isProductsListLoading`.
- The selector `isRecommendedSetFetched` was renamed to `isProductsListFetched`.
- The selector `getRecommendedSetError` was renamed to `getProductsListError`.
- The selectors `getListingProductsIds` and `getListingProducts` now receiving
  one more argument - `hash` and are renamed to `getProductsListProductsIds` and `getProductsListProducts`.
- The selector `getListingGroupedEntries` was renamed to `getProductGroupedEntries`.
- The selector `isListingInCache` was renamed to `isProductsListCached`.
- The selector `getFacetsGroupsByType` was renamed to `getProductsListFacetsGroupsByType`.
- The selector `getFacetsByFacetGroupType` was renamed to `getProductsListFacetsByFacetGroupType`.
- The `searchResults` and the `sets` entities were now the same and were renamed to `productsLists`.
- The util `buildFacetChildren` was renamed to `buildFacetTree`.
- The util `buildSetFilters` was renamed to `buildSetFiltersQueryParams` and now only returns
  an object that represents the `queryParams`. The tenant that needs the URL string can posteriorly use the `buildQueryStringFromObject` util.
- The util `buildUnsetFilters` was renamed to `buildUnsetFilters` and now only returns
  an object that represents the `queryParams`. The tenant that needs the URL string can posteriorly use the `buildQueryStringFromObject` util.
- The util `getSlug` was refactored to only transform the pathname, removing the first part - `shopping|set|categories`.
- Regarding the `serverInitialState` existent for listing and details, they're
  only one now for products as a whole.
- Now we have a `products` reducer with everything related inside:
  ```js
    {
      ...,
      products: {
        attributes: {
          error: {},
          isLoading: {},
        },
        colorGrouping: {
          error: {},
          isLoading: {},
        },
        details: {
          error: {},
          isHydrated: {},
          isLoading: {},
        },
        fittings: {
          error: {},
          isLoading: {},
        },
        // Includes all the listing and sets logic
        lists: {
          error: {},
          hash: null,
          isHydrated: {},
          isLoading: {},
        },
        measurements: {
          error: {},
          isLoading: {},
        },
        sizeGuides: {
          error: {},
          isLoading: {},
        },
        sizes: {
          error: {},
          isLoading: {},
        },
        variantsByMerchantsLocations: {
          error: {},
          isLoading: {},
        },
      },
      entities: {
        ...,
        brands: {},
        products: {},
        productsLists: {},
      }
    }
  ```

### What you need to change

- When using the `getHierarchicalFacetsWithChildren` selector, mind that it now receives an object as a third argument,
  containing the following properties:

- `hash` - Hash identifying the list of products we want the facets from. Defaults to the current
  product list.
- `initialDepth` - First facet group depth level.
- `dynamic` - Dynamic of the facet group we want. Useful when handling different genders.

  ```js
  // Previously
  const facetsWithChildren = getHierarchicalFacetsWithChildren(
    state,
    type,
    undefined,
    undefined,
    dynamic,
  );

  // Change to
  const facetsWithChildren = getHierarchicalFacetsWithChildren(state, type, {
    dynamic,
  });
  ```

- When setting the `options` in your project (`buildStore.js` file),
  there is no need to set a subfolder for listing or sets actions.

- Pay attention to everything under `@farfetch/blackout-core/products/listing/redux` and
  `@farfetch/blackout-core/products/listing/redux` are now under `@farfetch/blackout-redux/products`.

- Rename `buildListingHash` to `generateProductsListHash`

  ```js
  // Previously
  import { buildListingHash } from '@farfetch/blackout-redux/products/listing/utils';

  // ...

  const hash = buildListingHash(subfolder, slug, query);

  // Change to:
  import { generateProductsListHash } from '@farfetch/blackout-redux/products/listing/utils';

  // ...

  const hash = generateProductsListHash(slug, query, { isSet });
  ```

- If you want a similar behaviour regarding the selector `getListingActiveFiltersCount`, please use the `getProductsListSelectedFiltersCount` from the `@farfetch/blackout-redux/products`.

- Rename the actions without clients:

  ```jsx
  // Previously:
  import {
    reset,
    resetState,
  } from '@farfetch/blackout-core/products/details/redux';
  import {
    reset,
    resetState,
  } from '@farfetch/blackout-core/products/listing/redux';

  // Now:
  import {
    resetProductsLists,
    resetProductsListsState,
    resetProductDetails,
    resetProductDetailsState,
  } from '@farfetch/blackout-redux/products';
  ```

- Rename action which require clients:

  ```jsx
  // Previously:
  import {
      doGetColorGrouping,
      doGetMeasurements,
      doGetProductAttributes,
      doGetProductDetails,
      ...
  } from '@farfetch/blackout-core/products/details/redux';
  import {
      doGetListing,
  } from '@farfetch/blackout-core/products/listing/redux';
  import {
      getColorGrouping,
      getMeasurements,
      getProductAttributes,
      getProductDetails,
      ...
  } from '@farfetch/blackout-core/products/details/client';
  import {
      getListing,
  } from '@farfetch/blackout-core/products/listing/client';

  const mapDispatchToProps = {
    fetchProductDetailsAction: doGetProductDetails(getProductDetails),
    fetchListing: doGetListing(getListing)
    ...
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import {
      fetchListing,
      fetchProductColorGrouping,
      fetchProductMeasurements,
      fetchProductAttributes,
      fetchProductDetails,
      ...
  } from '@farfetch/blackout-redux/products';

  const mapDispatchToProps = {
      fetchListing,
      fetchProductColorGrouping,
      fetchProductMeasurements,
      fetchProductAttributes,
      fetchProductDetails,
      ...
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
      fetchListingFactory,
      fetchProductColorGroupingFactory,
      fetchProductMeasurementsFactory,
      fetchProductAttributesFactory,
      fetchProductDetailsFactory,
      ...
  } from '@farfetch/blackout-redux/products';
  import {
      getListingClient,
      getProductColorGroupingClient,
      getProductMeasurementsClient,
      getProductAttributesClient,
      getProductDetailsClient,
      ...
  } from 'my-products-client';

  const mapDispatchToProps = {
    fetchListingAction: fetchListingFactory(getListingClient),
    fetchProductColorGroupingAction: fetchProductColorGroupingFactory(getProductColorGroupingClient),
    fetchProductMeasurementsAction: fetchProductMeasurementsFactory(getProductMeasurementsClient),
    fetchProductAttributesAction: fetchProductAttributesFactory(getProductAttributesClient),
    fetchProductDetailsAction: fetchProductDetailsFactory(getProductDetailsClient),
    ...
  };
  ```

- Make changes to receive new returned value of the `fetchListing`, `fetchProductAttributes`, `fetchProductColorGrouping`,`fetchProductDetails`, `fetchProductFittings`, `fetchProductMeasurements`, `fetchProductVariantsByMerchantsLocations`, `fetchProductSizeGuides`, `fetchProductSizes` and `fetchSet` actions:

  ```js
  // Previously
  import {
    doGetProductAttributes,
    doGetColorGrouping,
    doGetProductDetails,
    fetchProductFittings,
    doGetMeasurements,
    doGetProductMerchantsLocations,
    doGetProductSizeguides,
    doGetProductSizes,
    doGetSet
  } from "@farfetch/blackout-core/products/details/redux";
  import { doGetListing  } from "@farfetch/blackout-core/products/listing/redux";

  // Returns a redux action with payload, type and meta.
  const doGetListingReduxAction = dispatch(doGetListing(...));
  const doGetProductAttributesReduxAction = dispatch(doGetProductAttributes(...));
  const doGetColorGroupingReduxAction = dispatch(doGetColorGrouping(...));
  ...

  // Now
  import {
    fetchListing,
    fetchProductAttributes,
    fetchProductColorGrouping,
    fetchProductDetails,
    fetchProductFittings,
    fetchProductMeasurements,
    fetchProductVariantsByMerchantsLocations,
    fetchProductSizeGuides,
    fetchProductSizes,
    fetchSet
  } from "@farfetch/blackout-redux/products";

  // Raw endpoint response
  const fetchListingRawResponse = dispatch(fetchListing(...));
  const fetchProductAttributesRawResponse = dispatch(fetchProductAttributes(...));
  const fetchProductColorGroupingRawResponse = dispatch(fetchProductColorGrouping(...));
  ...
  ```

- Rename action types:

  ```jsx
  // Previously:
  import {
    GET_COLOR_GROUPING_FAILURE,
    GET_COLOR_GROUPING_REQUEST,
    GET_COLOR_GROUPING_SUCCESS,
    GET_MEASUREMENTS_FAILURE,
    GET_MEASUREMENTS_REQUEST,
    GET_MEASUREMENTS_SUCCESS,
    GET_PRODUCT_ATTRIBUTES_FAILURE,
    GET_PRODUCT_ATTRIBUTES_REQUEST,
    GET_PRODUCT_ATTRIBUTES_SUCCESS,
    GET_PRODUCT_DETAILS_FAILURE,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
    GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
    GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
    GET_PRODUCT_SIZEGUIDES_FAILURE,
    GET_PRODUCT_SIZEGUIDES_REQUEST,
    GET_PRODUCT_SIZEGUIDES_SUCCESS,
    GET_PRODUCT_SIZES_FAILURE,
    GET_PRODUCT_SIZES_REQUEST,
    GET_PRODUCT_SIZES_SUCCESS,
    GET_RECOMMENDED_SET_FAILURE,
    GET_RECOMMENDED_SET_REQUEST,
    GET_RECOMMENDED_SET_SUCCESS,
  } from '@farfetch/blackout-core/products/details/redux';
  import {
    GET_LISTING_FAILURE,
    GET_LISTING_REQUEST,
    GET_LISTING_SUCCESS,
  } from '@farfetch/blackout-core/products/listing/redux';

  // Now:
  import {
    FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
    FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
    FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
    FETCH_PRODUCT_MEASUREMENTS_FAILURE,
    FETCH_PRODUCT_MEASUREMENTS_REQUEST,
    FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
    FETCH_PRODUCT_ATTRIBUTES_FAILURE,
    FETCH_PRODUCT_ATTRIBUTES_REQUEST,
    FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
    FETCH_PRODUCT_DETAILS_FAILURE,
    FETCH_PRODUCT_DETAILS_REQUEST,
    FETCH_PRODUCT_DETAILS_SUCCESS,
    FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
    FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
    FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
    FETCH_PRODUCT_SIZEGUIDES_FAILURE,
    FETCH_PRODUCT_SIZEGUIDES_REQUEST,
    FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
    FETCH_PRODUCT_SIZES_FAILURE,
    FETCH_PRODUCT_SIZES_REQUEST,
    FETCH_PRODUCT_SIZES_SUCCESS,
    FETCH_PRODUCTS_LIST_FAILURE,
    FETCH_PRODUCTS_LIST_REQUEST,
    FETCH_PRODUCTS_LIST_SUCCESS,
    RESET_PRODUCT_DETAILS_ENTITIES,
    RESET_PRODUCT_DETAILS_STATE,
    RESET_PRODUCTS_LISTS_ENTITIES,
    RESET_PRODUCTS_LISTS_STATE,
  } from '@farfetch/blackout-redux/products';
  ```

- Change the `serverInitialState` usage:

  ```js
  // Previously:
  import { serverInitialState as detailsInitialState } from '@farfetch/blackout-core/products/details/redux';
  import { serverInitialState as listingInitialState } from '@farfetch/blackout-core/products/listing/redux';

  ...serverInitialState(
    detailsInitialState({ model }),
    listingInitialState({ model }),
    ...
  )

  // Now:
  import { serverInitialState as productsInitialState } from '@farfetch/blackout-redux/products';

  ...serverInitialState(
    productsInitialState({ model }),
  ...
  )
  ```

## ProductsLists (listing and sets)

### What you need to change

Since we have a new entity called `productsLists` to aggregate the listing and sets concepts,
below you can find a table with all changes you need.

| Scope   | Type             | Previous                                                                              | Now                                                                                         |
| ------- | ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Listing | Entity           | searchResults                                                                         | productsLists                                                                               |
| Sets    | Entity           | sets \| recommendedSets                                                               | productsLists                                                                               |
| Sets    | Entity selectors | entities/selectors - getSet                                                           | products/selectors - getProductsListResult                                                  |
| Sets    | Action types     | FETCH_SET\_\*                                                                         | FETCH_PRODUCTS_LIST\_\*                                                                     |
| Listing | Action types     | DEHYDRATE_LISTING                                                                     | DEHYDRATE_PRODUCTS_LIST                                                                     |
| Listing | Action types     | FETCH_LISTING\_\*                                                                     | FETCH_PRODUCTS_LIST\_\*                                                                     |
| Listing | Action types     | RESET_LISTING_ENTITIES                                                                | RESET_PRODUCTS_LISTS_ENTITIES                                                               |
| Listing | Action types     | RESET_LISTING_STATE                                                                   | RESET_PRODUCTS_LISTS_STATE                                                                  |
| Listing | Action types     | SET_LISTING_HASH                                                                      | SET_PRODUCTS_LIST_HASH                                                                      |
| Listing | Action           | doGetListing(client)(slug, query, useCache, setListingHash, config)                   | fetchListing(slug, query, { useCache, setProductsListHash }, config)                        |
| Listing | Action           | reset()                                                                               | resetProductsLists()                                                                        |
| Listing | Action           | resetState()                                                                          | resetProductsListsState()                                                                   |
| Set     | Action           | doGetRecommendedSet(setId, query, config)                                             | fetchSet(slug, query, { useCache, setProductsListHash }, config)                            |
| Listing | Reducer          | products.listing                                                                      | products.lists                                                                              |
| Sets    | Reducer          | products.details.recommendedSets \| products.details.sets                             | products.lists                                                                              |
| Listing | Selectors        | getListingHash(hash)                                                                  | getProductsListHash(hash)                                                                   |
| Listing | Selectors        | getListingError(hash)                                                                 | getProductsListError(state, hash)                                                           |
| Listing | Selectors        | isListingHydrated(state, hash)                                                        | isProductsListHydrated(state, hash)                                                         |
| Listing | Selectors        | isListingLoading(state, hash)                                                         | isProductsListLoading(state, hash)                                                          |
| Listing | Selectors        | getListingResult(state, hash)                                                         | getProductsListResult(state, hash)                                                          |
| Listing | Selectors        | getListingProductsIds(state)                                                          | getProductsListProductsIds(state, hash)                                                     |
| Listing | Selectors        | getListingProducts(state)                                                             | getProductsListProducts(state, hash)                                                        |
| Listing | Selectors        | getListingPagination(state, hash)                                                     | getProductsListPagination(state, hash)                                                      |
| Listing | Selectors        | getListingBreadcrumbs(state, hash)                                                    | getProductsListBreadcrumbs(state, hash)                                                     |
| Listing | Selectors        | isListingInCache(state, hash)                                                         | isProductsListCached(state, hash)                                                           |
| Listing | Selectors        | getListingActiveFilters(state, hash)                                                  | getProductsListActiveFilters(state, hash)                                                   |
| Listing | Selectors        | getListingSelectedFiltersCount(state)                                                 | getProductsListSelectedFiltersCount(state, hash)                                            |
| Listing | Selectors        | getListingSort(state, hash)                                                           | getProductsListSort(state, hash)                                                            |
| Listing | Selectors        | getFacetsGroupsByType(state, facetGroupType, hash)                                    | getProductsListFacetsGroupsByType(state, facetGroupType, hash)                              |
| Listing | Selectors        | getFacetsByFacetGroupType(state, facetGroupType, hash)                                | getProductsListFacetsByFacetGroupType(state, facetGroupType, hash)                          |
| Listing | Selectors        | getHierarchicalFacetsWithChildren(state, facetGroupType, hash, initialDepth, dynamic) | getProductsListFacetsByFacetGroupType(state, facetGroupType, {hash, initialDepth, dynamic}) |
| Sets    | Selectors        | isSetLoading(state, id)                                                               | isProductsListLoading(state, hash)                                                          |
| Sets    | Selectors        | isSetFetched(state, id)                                                               | isProductsListFetched(state, hash)                                                          |
| Sets    | Selectors        | getSetError(state, id)                                                                | getProductsListError(state, hash)                                                           |
| Listing | Utils            | buildListingHash(subfolder, slug, query)                                              | generateProductsListHash(slug, query, { isSet })                                            |

## RecommendedSetsWithOutOfStock

### What's new

- The action creator `doGetRecommendedSetWithOutOfStock` was renamed to `fetchRecommendedSetFactory` and was moved to `@farfetch/blackout-redux/products/actions/factories`.
- The new action creator `fetchRecommendedSet` from `@farfetch/blackout-redux/products` is pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default @farfetch/blackout-core client provided).
- The action types `FETCH_RECOMMENDED_SET_WITH_OOS__*` were renamed to `FETCH_RECOMMENDED_SET_*`.
- The selectors `isRecommendedSetWithOutOfStockLoading`, `isRecommendedSetWithOutOfStockFetched` and `getRecommendedSetWithOutOfStockError` were renamed to `isRecommendedSetLoading`, `isRecommendedSetFetched` and `getRecommendedSetError`, respectively.
- The entity `recommendedSetsWithOutOfStock` was removed.
- The entity selector `getRecommendedSetWithOutOfStock` was renamed to `getRecommendedSet` and is now available at `@farfetch/blackout-redux/products`.
- The recommended set reducer structure was changed, you now have a `results` entry with all recommended sets fetched by id.

### What you need to change

- Rename action which require clients:

  ```js
  // Previously
  import { doGetRecommendedSetWithOutOfStock } from '@farfetch/blackout-core/products/redux';
  import { getRecommendedSetWithOutOfStock } from '@farfetch/blackout-core/products/client';

  const mapDispatchToProps = {
    getRecommendedSetWithOOS: doGetRecommendedSetWithOutOfStock(
      getRecommendedSetWithOutOfStock,
    ),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import { fetchRecommendedSet } from '@farfetch/blackout-redux/products';

  const mapDispatchToProps = {
    fetchRecommendedSet,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchRecommendedSetFactory } from '@farfetch/blackout-redux/products/actions/factories';
  import { fetchRecommendedSetClient } from 'my-client';

  const mapDispatchToProps = {
    fetchRecommendedSet: fetchRecommendedSetFactory(fetchRecommendedSetClient),
  };
  ```

- Rename action types:

  ```jsx
  // Previously:
  import {
    FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE,
    FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
    FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
  } from '@farfetch/blackout-core/products/redux';

  // Now:
  import {
    FETCH_RECOMMENDED_SET_FAILURE,
    FETCH_RECOMMENDED_SET_REQUEST,
    FETCH_RECOMMENDED_SET_SUCCESS,
  } from '@farfetch/blackout-redux/products';
  ```

- Rename selectors:

  ```jsx
  // Previously:
  import {
    isRecommendedSetWithOutOfStockLoading,
    isRecommendedSetWithOutOfStockFetched,
    getRecommendedSetWithOutOfStockError,
  } from '@farfetch/blackout-core/products/redux';

  // Now:
  import {
    isRecommendedSetLoading,
    isRecommendedSetFetched,
    getRecommendedSetError,
  } from '@farfetch/blackout-redux/products';
  ```

- Change selector name and import location:

  ```jsx
  // Previously:
  import { getRecommendedSetWithOutOfStock } from '@farfetch/blackout-core/entities/redux';

  // Now:
  import { getRecommendedSet } from '@farfetch/blackout-redux/products';
  ```

- The reducer structure was changed:

  ```jsx
  // Previously:
  {
      entities: {
          recommendedSetsWithOutOfStock: {
              123456789: { ... }
          },
      },
      details: {
          recommendedSetsWithOutOfStock: {
              error: {},
              isLoading: {
                  123456789: false
              },
          }
      }
  }

  // Now:
  {
      products: {
          recommendedSets: {
              error: {},
              isLoading: {
                  123456789: false
              },
              results: {
                123456789: { ... }
              }
          }
      }
  }
  ```

## RecommendedSets

### What's new

If you want to get a set or a recommended set and you _DON'T_ want products with OOS, the following applies to you:

This whole area/chunk was removed. We have now the concept of the products list.

- The entity `recommendedSet` should be replaced with the new entity `productsList`.
- The selectors `.../entities/selectors/recommendedSets` were removed.
- The action `doGetRecommendedSet` should be replaced by `fetchSet`.
- The action types `GET_RECOMMENDED_SET_*` should be renamed to `FETCH_PRODUCTS_LIST_*`.
- The selectors `isRecommendedSetLoading`, `isRecommendedSetFetched`,
  `getRecommendedSetError` and `getProductRecommendedSetId` should be replaced to
  `isProductsListLoading`, `isProductsListFetched`, `getProductsListError` and
  `getProductRelatedSetsIdsByType`.

## Search

### What's new

- The action thunk creators `doGetSearchDidYouMean`, `doGetSearchIntents`,
  `doGetSearchSuggestions`, `doResetSearchDidYouMean`, `doResetSearchIntents` and
  `doResetSearchSuggestions` were renamed to `fetchSearchDidYouMean`,
  `fetchSearchIntents`, `fetchSearchSuggestions`, `resetSearchDidYouMean`,
  `resetSearchIntents` and `resetSearchSuggestions`.
- The actions `fetchSearchDidYouMean`, `fetchSearchIntents` and `fetchSearchSuggestions` are now
  pre-configured with the respective client, so you don't need to configure the action creator
  anymore (if you use the default `@farfetch/blackout-core` client provided)
- The modules `fetchSearchDidYouMeanFactory`, `fetchSearchIntentsFactory` and
  `fetchSearchSuggestionsFactory` were created to support the use case where you need to provide a
  custom client for the actions
- The action types `GET_SEARCH_DID_YOU_MEAN_*`, `GET_SEARCH_DID_YOU_MEAN_*` and
  `GET_SEARCH_SUGGESTIONS_*` were renamed to `FETCH_SEARCH_DID_YOU_MEAN_*`,
  `FETCH_SEARCH_INTENTS__*` and `FETCH_SEARCH_SUGGESTIONS_*` respectively.

### What you need to change

- Rename the actions without clients:

  ```js
  // Previously
  import {
    doResetSearchDidYouMean,
    doResetSearchIntents,
    doResetSearchSuggestions,
  } from '@farfetch/blackout-core/search/redux';

  // Change to
  import {
    resetSearchDidYouMean,
    resetSearchIntents,
    resetSearchSuggestions,
  } from '@farfetch/blackout-redux/search';
  ```

- Rename action which require clients:

  ```js
  // Previously
  import {
    doGetSearchDidYouMean,
    doGetSearchIntents,
    doGetSearchSuggestions,
  } from '@farfetch/blackout-core/search/redux';
  import {
    getSearchDidYouMean,
    getSearchIntents,
    getSearchSuggestions,
  } from '@farfetch/blackout-core/search/client';

  const mapDispatchToProps = {
    getSearchDidYouMeanAction: doGetSearchDidYouMean(getSearchDidYouMean),
    getSearchIntentsAction: doGetSearchIntents(getSearchIntents),
    getSearchSuggestionsAction: doGetSearchSuggestions(getSearchSuggestions),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import {
    fetchSearchDidYouMean,
    fetchSearchIntents,
    fetchSearchSuggestions,
  } from '@farfetch/blackout-redux/search';

  const mapDispatchToProps = {
    fetchSearchDidYouMeanAction: fetchSearchDidYouMean,
    fetchSearchIntentsAction: fetchSearchIntents,
    fetchSearchSuggestionsAction: fetchSearchSuggestions,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
    fetchSearchDidYouMeanFactory,
    fetchSearchIntentsFactory,
    fetchSearchSuggestionsFactory,
  } from '@farfetch/blackout-redux/search';
  import {
    mySearchDidYouMeanClient,
    mySearchIntentsClient,
    mySearchSuggestionsClient,
  } from 'my-search-client';

  const mapDispatchToProps = {
    fetchSearchDidYouMeanAction: fetchSearchDidYouMeanFactory(
      mySearchDidYouMeanClient,
    ),
    fetchSearchIntentsAction: fetchSearchIntentsFactory(mySearchIntentsClient),
    fetchSearchSuggestionsAction: fetchSearchSuggestionsFactory(
      mySearchSuggestionsClient,
    ),
  };
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/search/redux';

  // ...
  actionTypes.GET_SEARCH_DID_YOU_MEAN_FAILURE;
  actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST;
  actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS;
  actionTypes.GET_SEARCH_INTENTS_FAILURE;
  actionTypes.GET_SEARCH_INTENTS_REQUEST;
  actionTypes.GET_SEARCH_INTENTS_SUCCESS;
  actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE;
  actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST;
  actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS;

  // Change to:
  import { actionTypes } from '@fps/search/sizeScales';

  // ...
  actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE;
  actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST;
  actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS;
  actionTypes.FETCH_SEARCH_INTENTS_FAILURE;
  actionTypes.FETCH_SEARCH_INTENTS_REQUEST;
  actionTypes.FETCH_SEARCH_INTENTS_SUCCESS;
  actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE;
  actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST;
  actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS;
  ```

## SizeGuides

### What's new

- The action thunk creators `doGetSizeguides` and `reset` were renamed to `fetchSizeGuides` and `resetSizeGuidesState` respectively.
- The action `fetchSizeGuides` is now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default `@farfetch/blackout-core` client provided)
- The module `fetchSizeGuidesFactory` was created to support the use case where you need to provide a custom client for the action
- The action `fetchSizeGuides` now return the raw endpoint's response instead of returning the redux `dispatch` call.
- The action types `GET_SIZEGUIDES_*` and `RESET_SIZEGUIDES` were renamed to
  `FETCH_SIZE_GUIDES_*` and `RESET_SIZE_GUIDES_STATE` respectively.
- The selectors `areSizeguidesLoading`, `getSizeguidesError` and
  `getAllSizeguides` were renamed to
  `areSizeGuidesLoading`, `getSizeGuidesError` and `getSizeGuides`.
- The selector `getSizeguideByCategoriesAndBrand` was renamed to
  `getSpecificSizeGuide` and the arguments other than the state are now received
  as an object.
  - The new `getSpecificSizeGuide` selector now receives the same query as the client, in tho following format:
  ```
  {
    brandIds: Array<Brand['id']>;
    categoryIds: Array<Category['id']>
  }
  ```
- The util `getSpecificSizeguide` was renamed to `findSpecificSizeGuide`
  and the arguments are now received as an object.

### What you need to change

- Rename the actions without clients:

  ```js
  // Previously
  import { reset } from '@farfetch/blackout-core/sizeguides/redux';

  // Change to:
  import { resetSizeGuidesState } from '@farfetch/blackout-redux/sizeGuides';
  ```

- Rename actions which require clients:

  ```js
  // Previously
  import { doGetSizeguides } from '@farfetch/blackout-core/sizeguides/redux';
  import { getSizeguides } from '@farfetch/blackout-core/sizeguides/client';

  const mapDispatchToProps = {
    getSizeguides: doGetSizeguides(getSizeguides),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchSizeGuides`, which is pre-configred with
  // our @farfetch/blackout-core client
  import { fetchSizeGuides } from '@farfetch/blackout-redux/sizeGuides';

  const mapDispatchToProps = {
    getSizeGuides: fetchSizeGuides,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchSizeGuidesFactory } from '@farfetch/blackout-redux/sizeGuides';
  import mySizeGuidesClient from 'my-sizeGuides-client';

  const mapDispatchToProps = {
    getSizeGuides: fetchSizeGuidesFactory(mySizeGuidesClient),
  };
  ```

- Make changes to receive new returned value of the `fetchSizeGuides` action:

  ```js
  // Previously
  import { doGetSizeguides } from "@farfetch/blackout-core/sizeguides/redux";

  // Returns a redux action with payload, type and meta.
  const reduxAction = dispatch(doGetSizeguides(...));

  // Now
  import { fetchSizeGuides } from "@farfetch/blackout-redux/sizeGuides";

  // Raw endpoint response
  const rawResponse = dispatch(fetchSizeGuides(...));
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/sizeguides/redux';

  // ...
  actionTypes.GET_SIZEGUIDES_FAILURE;
  actionTypes.GET_SIZEGUIDES_REQUEST;
  actionTypes.GET_SIZEGUIDES_SUCCESS;
  actionTypes.RESET_SIZEGUIDES;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/sizeGuides';

  // ...
  actionTypes.FETCH_SIZE_GUIDES_FAILURE;
  actionTypes.FETCH_SIZE_GUIDES_REQUEST;
  actionTypes.FETCH_SIZE_GUIDES_SUCCESS;
  actionTypes.RESET_SIZE_GUIDES_STATE;
  ```

- Rename the selectors and change the usage:

  ```js
  // Previously
  import {
    areSizeguidesLoading,
    getSizeguidesError,
    getAllSizeguides,
    getSizeguideByCategoriesAndBrand,
  } from '@farfetch/blackout-core/sizeguides/redux';

  const sizeGuide = getSizeguideByCategoriesAndBrand(
    state,
    categoriesIds,
    brandId,
  );

  // Change to:
  import {
    areSizeGuidesLoading,
    getSizeGuidesError,
    getSizeGuides,
    getSpecificSizeGuide,
  } from '@farfetch/blackout-redux/sizeGuides';

  const sizeGuide = getSpecificSizeGuide(state, { brandIds, categoryIds });
  ```

## SizeScales

### What's new

- The action thunk creators `doGetSizeScale`, `doGetSizeScales` and
  `doResetSizeScales` were renamed to `fetchSizeScale`, `fetchSizeScales` and
  `resetSizeScalesState` respectively.
- The actions `fetchSizeScale`, `fetchSizeScales` and `fetchSizeScaleMappings` are now
  pre-configured with the respective client, so you don't need to configure the action creator
  anymore (if you use the default `@farfetch/blackout-core` client provided).
- The modules `fetchSizeScaleFactory`, `fetchSizeScalesFactory` and `fetchSizeScaleMappingsFactory`
  were created to support the use case where you need to provide a custom client for the actions.
- The action `fetchSizeScale`, `fetchSizeScales` and `fetchSizeScaleMappings` now return the raw endpoint's response instead of returning the redux `dispatch` call.
- The action types `GET_SIZESCALES_*`, `GET_SIZESCALE_*` and `RESET_SIZESCALES`
  were renamed to `FETCH_SIZE_SCALES_*`, `FETCH_SIZE_SCALE_*` and
  `RESET_SIZE_SCALES_STATE` respectively.
- The selectors `isSizeScaleLoadingByQuery` and `isSizeScaleLoadingById` are now
  the same selector `isSizeScaleLoading`, that receives a `scaleIdentifier` that
  can be a number (scaleId) or an object (query with categoryId).
- The selectors `getSizeScaleErrorByQuery` and `getSizeScaleErrorById` are now
  the same selector `getSizeScaleError`, that receives a `scaleIdentifier` that
  can be a number (scaleId) or an object (query with categoryId).
- The selectors `getSizeScales` and `getSizeScaleById` were removed. We already
  have them on: `@farfetch/blackout-redux/entities/selectors/sizeScales`.
- The reducer structure was changed:

  ```js
  // Previously
  sizeScales: {
      error: null,
      isLoading: false,
      errorById: {},
      errorByQuery: {},
      isLoadingById: {},
      isLoadingByQuery: {},
  }

  // Now:
  sizeScales: {
      error: null,
      isLoading: false,
      sizeScale: {
          // With `scaleId` or `categoryId_[query.categoryId]`
          // as identifiers on `error` and `isLoading` properties.
          error: {},
          isLoading: {}
      }
  }
  ```

### What you need to change

- Rename the actions without clients:

  ```js
  // Previously
  import { doResetSizeScales } from '@farfetch/blackout-core/sizeScales/redux';

  // Change to:
  import { resetSizeScalesState } from '@farfetch/blackout-redux/sizeScales';
  ```

- Rename actions which require clients:

  ```js
  // Previously
  import { doGetSizeScale } from '@farfetch/blackout-core/sizeScales/redux';
  import { getSizeScale } from '@farfetch/blackout-core/sizeScales/client';

  const mapDispatchToProps = {
    getSizeScale: doGetSizeScale(getSizeScale),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchSizeScale`, which is pre-configred with
  // our @farfetch/blackout-core client
  import { fetchSizeScale } from '@farfetch/blackout-redux/sizeScales';

  const mapDispatchToProps = {
    getSizeScale: fetchSizeScale,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchSizeScaleFactory } from '@farfetch/blackout-redux/sizeScales';
  import mySizeScalesClient from 'my-sizeScales-client';

  const mapDispatchToProps = {
    getSizeScale: fetchSizeScaleFactory(mySizeScalesClient),
  };
  ```

- Make changes to receive new returned value of the `fetchSizeScale`, `fetchSizeScales` and `fetchSizeScaleMappings` action:

  ```js
  // Previously
  import { doGetSizeScale, doGetSizeScales, fetchSizeScaleMappings } from "@farfetch/blackout-core/sizeScales/redux";

  // Returns a redux action with payload, type and meta.
  const doGetSizeScaleReduxAction = dispatch(doGetSizeScale(...));
  const doGetSizeScalesReduxAction = dispatch(doGetSizeScales(...));
  const fetchSizeScaleMappingsReduxAction = dispatch(fetchSizeScaleMappings(...));

  // Now
  import { fetchSizeScale, fetchSizeScales, fetchSizeScaleMappings } from "@farfetch/blackout-redux/sizeScales";

  // Raw endpoint response
  const fetchSizeScaleRawResponse = dispatch(fetchSizeScale(...));
  const fetchSizeScalesRawResponse = dispatch(fetchSizeScales(...));
  const fetchSizeScaleMappingsRawResponse = dispatch(fetchSizeScaleMappings(...));
  ```

- Rename the action types if you use them in any custom reducer/middleware:

  ```js
  // Previously
  import { actionTypes } from '@farfetch/blackout-core/sizeScales/redux';

  // ...
  actionTypes.GET_SIZESCALES_FAILURE;
  actionTypes.GET_SIZESCALES_REQUEST;
  actionTypes.GET_SIZESCALES_SUCCESS;
  actionTypes.GET_SIZESCALE_FAILURE;
  actionTypes.GET_SIZESCALE_REQUEST;
  actionTypes.GET_SIZESCALE_SUCCESS;
  actionTypes.RESET_SIZESCALES;

  // Change to:
  import { actionTypes } from '@farfetch/blackout-redux/sizeScales';

  // ...
  actionTypes.FETCH_SIZE_SCALES_FAILURE;
  actionTypes.FETCH_SIZE_SCALES_REQUEST;
  actionTypes.FETCH_SIZE_SCALES_SUCCESS;
  actionTypes.FETCH_SIZE_SCALE_FAILURE;
  actionTypes.FETCH_SIZE_SCALE_REQUEST;
  actionTypes.FETCH_SIZE_SCALE_SUCCESS;
  actionTypes.RESET_SIZE_SCALES_STATE;
  ```

- Rename the selectors and change the usage:

  ```js
  // Previously
  import {
    getSizeScales,
    getSizeScaleById,
    isSizeScaleLoadingByQuery,
    isSizeScaleLoadingById,
    getSizeScaleErrorByQuery,
    getSizeScaleErrorById,
  } from '@farfetch/blackout-core/sizeScales/redux';

  const isLoadingByQuery = isSizeScaleLoadingByQuery(state, query);
  const isLoadingById = isSizeScaleLoadingById(state, scaleId);
  const errorByQuery = getSizeScaleErrorByQuery(state, query);
  const errorById = getSizeScaleErrorById(state, scaleId);
  const sizeScales = getSizeScales(state);
  const sizeScale = getSizeScaleById(state, scaleId);

  // Change to:
  import {
    getSizeScale,
    getSizeScales,
  } from '@farfetch/blackout-redux/entities';
  import {
    isSizeScaleLoading,
    getSizeScaleError,
  } from '@farfetch/blackout-redux/sizeScales';

  const isLoadingByQuery = isSizeScaleLoading(state, query);
  const isLoadingById = isSizeScaleLoading(state, scaleId);
  const errorByQuery = getSizeScaleError(state, query);
  const errorById = getSizeScaleError(state, scaleId);
  const sizeScales = getSizeScales(state);
  const sizeScale = getSizeScale(state, scaleId);
  ```

## StaffMembers

### What's new

- The _internal_ selectors inside the `staffMembers` reducer were renamed from `getStaffMembersError`, `getAreStaffMembersLoading` and `getStaffMembers` to `getError`, `getIsLoading` and `getResult`, respectively. This change should not impact your code.
- The action `fetchStaffMember` is now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default `@farfetch/blackout-core` client provided)
- The module `fetchStaffMemberFactory` was created to support the use case where you need to provide a custom client for the action.

### What you need to change

- Rename action which require clients:

  ```jsx
  // Previously
  import { fetchStaffMember } from '@farfetch/blackout-core/staffMembers/redux';
  import { getStaffMember } from '@farfetch/blackout-core/staffMembers/client';

  const mapDispatchToProps = {
    getStaffMemberAction: fetchStaffMember(getStaffMember),
  };
  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchDesigners`, which is pre-configred with
  // our @farfetch/blackout-core client
  import { fetchStaffMember } from '@farfetch/blackout-redux/staffMembers';

  const mapDispatchToProps = {
    fetchStaffMember,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchStaffMemberFactory } from '@farfetch/blackout-redux/staffMembers';
  import getStaffMemberClient from 'my-staffMembers-client';

  const mapDispatchToProps = {
    fetchStaffMember: fetchStaffMemberFactory(getStaffMemberClient),
  };
  ```

## Users

### What's new

- Users is the new name of the profile area, since some of the requests aren't related to the profile
  but all of them are related to users and guest users.
- The action name were changed for more intuitive names reflecting its purpose and functionality instead of simply appending the do before the core/client name.

### What you need to change

- Rename the imports to use the new prefix:

  ```jsx
  // Previously
  import { doGetProfile } from '@farfetch/blackout-core/profile/redux';
  import { getProfile } from '@farfetch/blackout-core/profile/client';

  const mapDispatchToProps = {
    fetchProfile: doGetProfile(getProfile),
  };
  // Change to:

  // If you don't need a custom client, you can use the new
  // preset `fetchUser`, which is pre-configured with
  // our @farfetch/blackout-core client
  import { fetchUser } from '@farfetch/blackout-redux/users';

  const mapDispatchToProps = {
    fetchUser,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import { fetchUserFactory } from '@farfetch/blackout-redux/staffMembers';
  import getProfile from 'my-profile-client';

  const mapDispatchToProps = {
    fetchUser: fetchUserFactory(getProfile),
  };
  ```

- The following actions names were changed:

| Old action           | New action           |
| -------------------- | -------------------- |
| doCreateContact      | createContact        |
| doCreateGuestUser    | createGuestUser      |
| doGetGuestUser       | fetchGuestUser       |
| doDeleteContact      | removeContact        |
| doGetBenefits        | fetchBenefits        |
| doGetContacts        | fetchContacts        |
| doGetContact         | fetchContact         |
| doGetCredit          | fetchCredit          |
| doGetCreditMovements | fetchCreditMovements |
| doGetPreferences     | updatePreferences    |
| doGetProfile         | fetchUser            |
| doGetTitles          | fetchTitles          |
| doUpdateContact      | updateContact        |
| doUpdatePreferences  | updatePreferences    |
| doUpdateProfile      | updateUser           |

- The following selectors names were changed:

| Old selector     | New selector   |
| ---------------- | -------------- |
| isProfileLoading | isUsersLoading |
| getProfileError  | getUsersError  |
| getProfileId     | getUserId      |

````


## Wishlist

### What's new

- The function `createWishlistItemHash` was renamed.
- The action thunk creators `reset` and `resetState` were renamed to `resetWishlist` and `resetWishlistState`, respectively.
- The action creators `fetchWishlist`, `fetchWishlistSet`, `fetchWishlistSets`,`updateWishlistItem`, `updateWishlistSet`, `addWishlistItem`, `addWishlistSet`, `removeWishlistItem` and `removeWishlistSet` are now pre-configured with the respective client, so you don't need to configure the action creator anymore (if you use the default @farfetch/blackout-core client provided).
- The modules `fetchWishlistFactory`, `fetchWishlistSetFactory`, `fetchWishlistSetsFactory`, `updateWishlistItemFactory`, `updateWishlistSetFactory`, `addWishlistItemFactory`, `addWishlistSetFactory`, `removeWishlistItemFactory` and `removeWishlistSetFactory` were created to support the use case where you need to provide a custom client for the action.
- The action types `ADD_ITEM_TO_WISHLIST_{*}` , `DELETE_WISHLIST_ITEM_{*}`, `GET_WISHLIST_{*}`,
  `GET_WISHLIST_SETS_{*}`, `DELETE_WISHLIST_SET_{*}` and `GET_WISHLIST_SET_{*}` were renamed to
  `ADD_WISHLIST_ITEM_{*}`, `REMOVE_WISHLIST_ITEM_{*}`, `FETCH_WISHLIST_{*}`,
  `FETCH_WISHLIST_SETS_{*}`, `REMOVE_WISHLIST_SET_{*}` and `FETCH_WISHLIST_SET_{*}`, respectively.
- The selector `createGetItemInWishlist` was renamed to `findProductInWishlist`.
- The `createGetItemInWishlist` selector (now named `findProductInWishlist`) receives two
  arguments: state and productParams (an object with size and product) - instead of receiving state and
  returning a function that receives productParams.
- The selector `itemInWishlist` was removed.
- The `wishlist` entity was removed.
- The `wishlistSets` reducer, inside `wishlist` reducer, is now named `sets`.
- The `wishlistItems` reducer, inside `wishlist` reducer, is now named `items` and inside has an
  `item` object with the loading and error status for each wishlist item id.
- The `buildWishlistItem` util now receives as param an object with `product`, `quantity` and `size`, instead of three different params.

### What you need to change

- Rename `createWishlistItemHash` to `generateWishlistItemHash`

  ```js
  // Previously
  import { createWishlistItemHash } from '@farfetch/blackout-redux/wishlists/utils';

  // ...

  const hash = createWishlistItemHash(item);

  // Change to:
  import { generateWishlistItemHash } from '@farfetch/blackout-redux/wishlists/utils';

  // ...

  const hash = generateWishlistItemHash(item);
````

- Rename the actions without clients:

  ```jsx
  // Previously:
  import {
  reset,
  resetState,
  } from '@farfetch/blackout-core/wishlists/redux';

  // Now:
  import {
  resetWishlist
  resetWishlistState
  } from '@farfetch/blackout-redux/wishlists';
  ```

- Rename action which require clients:

  ```jsx
  // Previously:
  import {
    doGetWishlist,
    doGetWishlistSet,
    doGetWishlistSets,
    doUpdateWishlistItem,
    doUpdateWishlistSet,
    doAddWishlistItem,
    doAddWishlistSet,
    doDeleteWishlistItem,
    doDeleteWishlistSet,
  } from '@farfetch/blackout-core/wishlists/redux';
  import {
    getWishlist,
    getWishlistSet,
    getWishlistSets,
    patchWishlistItem,
    patchWishlistSet,
    postWishlistItem,
    postWishlistSet,
    deleteWishlistItem,
    deleteWishlistSet,
  } from '@farfetch/blackout-core/wishlists/client';

  const mapDispatchToProps = {
    fetchWishlistAction: doGetWishlist(getWishlist),
    fetchWishlistSetAction: doGetWishlistSet(getWishlistSet),
    fetchWishlistSetsAction: doGetWishlistSets(getWishlistSets),
    updateWishlistItemAction: doUpdateWishlistItem(patchWishlistItem),
    updateWishlistSetAction: doUpdateWishlistSet(
      patchWishlistSet,
      getWishlistSet,
    ),
    addWishlistItemAction: doAddWishlistItem(postWishlistItem),
    addWishlistSetAction: doAddWishlistSet(postWishlistSet),
    removeWishlistItemAction: doDeleteWishlistItem(deleteWishlistItem),
    removeWishlistSetAction: doDeleteWishlistSet(deleteWishlistSet),
  };

  // Change to:

  // If you don't need a custom client, you can use the new
  // presets, which are pre-configred with our `@farfetch/blackout-core` client
  import {
    fetchWishlist,
    fetchWishlistSet,
    fetchWishlistSets,
    updateWishlistItem,
    updateWishlistSet,
    addWishlistItem,
    addWishlistSet,
    removeWishlistItem,
    removeWishlistSet,
  } from '@farfetch/blackout-redux/wishlists';

  const mapDispatchToProps = {
    fetchWishlist,
    fetchWishlistSet,
    fetchWishlistSets,
    updateWishlistItem,
    updateWishlistSet,
    addWishlistItem,
    addWishlistSet,
    removeWishlistItem,
    removeWishlistSet,
  };

  // If you need a custom client, just append "Factory" to the desired action
  import {
    fetchWishlistFactory,
    fetchWishlistSetFactory,
    fetchWishlistSetsFactory,
    updateWishlistItemFactory,
    updateWishlistSetFactory,
    addWishlistItemFactory,
    addWishlistSetFactory,
    removeWishlistItemFactory,
    removeWishlistSetFactory,
  } from '@farfetch/blackout-redux/wishlists';
  import {
    getWishlistClient,
    getWishlistSetClient,
    getWishlistSetsClient,
    patchWishlistItemClient,
    patchWishlistSetClient,
    postWishlistItemClient,
    postWishlistSetClient,
    deleteWishlistItemClient,
    deleteWishlistSetClient,
  } from 'my-wishlists-client';

  const mapDispatchToProps = {
    fetchWishlistAction: fetchWishlistFactory(getWishlistClient),
    fetchWishlistSetAction: fetchWishlistSetFactory(getWishlistSetClient),
    fetchWishlistSetsAction: fetchWishlistSetsFactory(getWishlistSetsClient),
    updateWishlistItemAction: updateWishlistItemFactory(
      patchWishlistItemClient,
    ),
    updateWishlistSetAction: updateWishlistSetFactory(
      patchWishlistSetClient,
      getWishlistSetClient,
    ),
    addWishlistItemAction: addWishlistItemFactory(postWishlistItemClient),
    addWishlistSetAction: addWishlistSetFactory(postWishlistSetClient),
    removeWishlistItemAction: removeWishlistItemFactory(
      deleteWishlistItemClient,
    ),
    removeWishlistSetAction: removeWishlistSetFactory(deleteWishlistSetClient),
  };
  ```

- Rename action types:

  ```jsx
  // Previously:
  import {
    ADD_ITEM_TO_WISHLIST_FAILURE,
    ADD_ITEM_TO_WISHLIST_REQUEST,
    ADD_ITEM_TO_WISHLIST_SUCCESS,
    DELETE_WISHLIST_ITEM_FAILURE,
    DELETE_WISHLIST_ITEM_REQUEST,
    DELETE_WISHLIST_ITEM_SUCCESS,
    GET_WISHLIST_FAILURE,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_SETS_FAILURE,
    GET_WISHLIST_SETS_REQUEST,
    GET_WISHLIST_SETS_SUCCESS,
    DELETE_WISHLIST_SET_FAILURE,
    DELETE_WISHLIST_SET_REQUEST,
    DELETE_WISHLIST_SET_SUCCESS,
    GET_WISHLIST_SET_FAILURE,
    GET_WISHLIST_SET_REQUEST,
    GET_WISHLIST_SET_SUCCESS,
  } from '@farfetch/blackout-core/wishlists/redux';

  // Now:
  import {
    ADD_WISHLIST_ITEM_FAILURE,
    ADD_WISHLIST_ITEM_REQUEST,
    ADD_WISHLIST_ITEM_SUCCESS,
    REMOVE_WISHLIST_ITEM_FAILURE,
    REMOVE_WISHLIST_ITEM_REQUEST,
    REMOVE_WISHLIST_ITEM_SUCCESS,
    FETCH_WISHLIST_FAILURE,
    FETCH_WISHLIST_REQUEST,
    FETCH_WISHLIST_SUCCESS,
    FETCH_WISHLIST_SETS_FAILURE,
    FETCH_WISHLIST_SETS_REQUEST,
    FETCH_WISHLIST_SETS_SUCCESS,
    REMOVE_WISHLIST_SET_FAILURE,
    REMOVE_WISHLIST_SET_REQUEST,
    REMOVE_WISHLIST_SET_SUCCESS,
    FETCH_WISHLIST_SET_FAILURE,
    FETCH_WISHLIST_SET_REQUEST,
    FETCH_WISHLIST_SET_SUCCESS,
  } from '@farfetch/blackout-redux/wishlists';
  ```

- Rename selectors:

  ```jsx
  // Previously:
  import { createGetItemInWishlist } from '@farfetch/blackout-core/wishlists/redux';

  // Now:
  import { findProductInWishlist } from '@farfetch/blackout-redux/wishlists';
  ```

- Change `createGetItemInWishlist` params:

  ```jsx
  // Previously:
  import { createGetItemInWishlist } from '@farfetch/blackout-core/wishlists/redux';

  ...

  const getItemInWishlist = createGetItemInWishlist(state);
  const itemInWishlist = getItemInWishlist(productParams);

  // Now:
  import { findProductInWishlist } from '@farfetch/blackout-redux/wishlists';

  ...

  const itemInWishlists = findProductInWishlists(state, productParams);
  ```

- The reducer structure was changed:

  ```jsx
  // Previously:
  {
      entities: {
          products: {
              123456789: {}
          },
          wishlist: {
              'xxxx-xxxx-...': {
                  bagSummary: {...},
                  id: 'xxxx-xxxx-...',
                  items: [1234] // Array of bagItems ids
              }
          },
          wishlistItems: {
              1234: {
                  price: {...},
                  productId: 12346789
              }
          },
          wishlistSets: {
              '111-22-233-3-321': {
                  wishlistItems: {...},
                  name: 'super set!',
                  setId: '111-22-233-3-321'
              }
          }
      },
      wishlist: {
          isLoading: false,
          error: null,
          id: 'xxxx-xxxx-...',
          wishlistItems: {
              isLoading: {},
              error: {},
          },
          wishlistSets: {
              error: null,
              ids: null,
              isLoading: false,
              sets: {
                  error: {},
                  isLoading: {},
              },
          }
      }
  }

  // Now:
  {
      entities: {
          products: {
              123456789: {}
          },
          wishlistItems: {
              1234: {
                  price: {...},
                  productId: 12346789
              }
          },
          wishlistSets: {
              '111-22-233-3-321': {
                  wishlistItems: {...},
                  name: 'super set!',
                  setId: '111-22-233-3-321'
              }
          }
      },
      wishlist: {
          isLoading: false,
          error: null,
          id: 'xxxx-xxxx-...',
          result: {
              items: [], // Array of wishlist items ids
              ...
          },
          items: {
              ids: [], // Array of wishlist sets ids
              item: {
                  isLoading: {},
                  error: {}
              }
          },
          sets: {
              ids: [], // Array of wishlist sets ids
              isLoading: false,
              error: null,
              set: {
                  isLoading: {},
                  error: {}
              }
          }
      }
  }
  ```

- Wrap `buildWishlistItem` params in an object:

```jsx
// Previously
const wishlistItem = buildWishlistItem(product, quantity, size);

// Now
const wishlistItem = buildWishlistItem({ product, quantity, size });
```
