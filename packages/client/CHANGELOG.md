# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-next.181](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.180...@farfetch/blackout-client@2.0.0-next.181) (2022-07-15)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.180](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.179...@farfetch/blackout-client@2.0.0-next.180) (2022-07-06)


### Features

* **client|redux:** change return files exports ([02457ce](https://github.com/Farfetch/blackout/commit/02457ced5fa5e17011476d50e452d9257231d1a4))





# [2.0.0-next.179](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.178...@farfetch/blackout-client@2.0.0-next.179) (2022-07-06)


### Features

* export `helpers` and `authentication` modules in client's root index file ([0efea8b](https://github.com/Farfetch/blackout/commit/0efea8bb6217886f9f3af3dea680d1bafa1e490a))


### BREAKING CHANGES

* - Imports from the `helpers` and `authentication`
folders of the `@farfetch/blackout-core` package
must now be changed to import from the `@farfetch/blackout-client` package:

 ```js
// Previously
import client, { configApiBlackAndWhite, headers }
from '@farfetch/blackout-core/helpers';
import { postGuestTokens, postRegister, postTokens }
from '@farfetch/blackout-core/authentication';

// Now
import { client, configApiBlackAndWhite, headers,
postGuestTokens, postRegister, postTokens } from '@farfetch/blackout-client';
```

- `parsePickupDate` module was removed.

- `AxiosAuthenticationTokenManager` was renamed to
`AuthenticationTokenManager` besides having to be imported from the root
of the `@farfetch/blackout-client` package:

```js

// Previously
import { AxiosAuthenticationTokenManager } from
'@farfetch/blackout-core/helpers/client/interceptors/authentication';

// Now
import { AuthenticationTokenManager } from '@farfetch/blackout-client';
```





# [2.0.0-next.178](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.177...@farfetch/blackout-client@2.0.0-next.178) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.177](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.176...@farfetch/blackout-client@2.0.0-next.177) (2022-07-04)


### Bug Fixes

* **blackout-client:** fix typescript errors ([4020e29](https://github.com/Farfetch/blackout/commit/4020e29450b7a5402ab516331bb5856e31e70b10))





# [2.0.0-next.176](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.175...@farfetch/blackout-client@2.0.0-next.176) (2022-07-01)


### Features

* **client:** change e-commerce clients naming ([aa65b31](https://github.com/Farfetch/blackout/commit/aa65b31472e52a82728068d88faa6fd3a2873abc))


### BREAKING CHANGES

* **client:** The following clients, imported from
`@farfetch/blackout-client/products`, changed its name to:

getProductsDetails → getProduct
getProductVariantsByMerchantsLocations → getProductVariantMerchantsLocations
getListing → getProductListing
getSets → getProductSets
getRecommendedSets → getProductRecommendedSets





# [2.0.0-next.175](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.174...@farfetch/blackout-client@2.0.0-next.175) (2022-07-01)


### Bug Fixes

* fix typings and renames ([494c84c](https://github.com/Farfetch/blackout/commit/494c84c6a76f31fb8f539427d82a0b2bc0604c92))


### Features

* **client|redux:** export subscription modules in client and redux root index file ([dc72eaf](https://github.com/Farfetch/blackout/commit/dc72eafb963b829b9413147cf6a17ea41a93180b))





# [2.0.0-next.174](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.173...@farfetch/blackout-client@2.0.0-next.174) (2022-06-30)


### Features

* **client|redux:** recommendations in product's scope ([10ad661](https://github.com/Farfetch/blackout/commit/10ad6610dfa35eb13c3706f60a57de02813b53b1))





# [2.0.0-next.173](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.172...@farfetch/blackout-client@2.0.0-next.173) (2022-06-30)


### chore

* **client:** update checkout client names ([69b8961](https://github.com/Farfetch/blackout/commit/69b896166d8690014af737474842803259d9b102))


### BREAKING CHANGES

* **client:** The following clients, imported from
`@farfetch/blackout-client/checkout`

changed its name to:
- getCheckout → getCheckoutOrder
- getCharges → getCheckoutOrderCharges
- getDeliveryBundleUpgrades → getCheckoutOrderDeliveryBundleUpgrades
- getItemDeliveryProvisioning → getCheckoutOrderDeliveryBundleProvisioning
- getOperation → getCheckoutOrderOperation
- getOperations → getCheckoutOrderOperations
- getUpgradeItemDeliveryProvisioning → getCheckoutOrderDeliveryBundleUpgradeProvisioning
- patchCheckout → patchCheckoutOrder
- patchDeliveryBundleUpgrades → patchCheckoutOrderDeliveryBundleUpgrades
- patchGiftMessage → patchCheckoutOrderItems
- postCharges → postCheckoutOrderCharges
- postCheckout → postCheckoutOrder
- putItemTags → putCheckoutOrderItemTags
- putPromocode → putCheckoutOrderPromocode
- putTags → putCheckoutOrderTags

removed:
- patchCheckoutCompletePayment

All checkout client functions should be now imported
direcly from '@farfetch/blackout-client'

// example
import {
  getCheckoutOrder,
  getCheckoutOrderCharges,
  patchCheckoutOrderItems,
  putCheckoutOrderPromocode,
} from '@farfetch/blackout-client';
```





# [2.0.0-next.172](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.171...@farfetch/blackout-client@2.0.0-next.172) (2022-06-29)


### Bug Fixes

* fix `adaptProductImages` type ([24e5e04](https://github.com/Farfetch/blackout/commit/24e5e0431adb578491bad7d15aecda4675ceb1c5))





# [2.0.0-next.171](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.170...@farfetch/blackout-client@2.0.0-next.171) (2022-06-29)


### Features

* review users structure in clients ([551274f](https://github.com/Farfetch/blackout/commit/551274f0c1b3277918e17e03698f839550c9fb75))


### BREAKING CHANGES

* The users clients naming strategy and folders structure was changed.





# [2.0.0-next.170](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.169...@farfetch/blackout-client@2.0.0-next.170) (2022-06-28)


### Bug Fixes

* update size prop to optional ([1f5e6b6](https://github.com/Farfetch/blackout/commit/1f5e6b6bd65b7d6ea3100dcb6a1fb664b34ee553))





# [2.0.0-next.169](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.168...@farfetch/blackout-client@2.0.0-next.169) (2022-06-28)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.168](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.167...@farfetch/blackout-client@2.0.0-next.168) (2022-06-27)


### Features

* **blackout-client|blackout-redux:** export forms modules in root index file ([1180d3e](https://github.com/Farfetch/blackout/commit/1180d3e3b18e1d2337e302dfe194c691479b422c))


### BREAKING CHANGES

* **blackout-client|blackout-redux:** - Imports of form modules now must be done from the root
for both @farfetch/blackout-client and @farfetch/blackout-redux
packages.

```js
// Previously

import {
getFormSchema,
postFormData,
} from '@farfetch/blackout-core/forms/client';

import {
  fetchFormSchema,
  getFormSchemaByCode,
  getFormSchemaError,
  getSubmitFormDataError,
  isFormSchemaLoading,
  isSubmitFormDataLoading,
  resetFormSchema,
  submitFormData,
} from '@farfetch/blackout-core/forms/redux';

// Now

import {
getFormSchema,
postFormData,
} from '@farfetch/blackout-client';

import {
  fetchFormSchema,
  getFormSchemaByCode,
  getFormSchemaError,
  getSubmitFormDataError,
  isFormSchemaLoading,
  isSubmitFormDataLoading,
  resetFormSchema,
  submitFormData,
} from '@farfetch/blackout-redux';
```

- The modules `actionTypes` and `reducer` from `@farfetch/blackout-core/forms/redux`
were renamed to `formsActionTypes` and `formsReducer` respectively.

```js

// Previously
import reducer, { actionTypes } from '@farfetch/blackout-core/forms/redux;

// Now
import { actionTypesForms, formsReducer } from '@farfetch/blackout-redux';
```

- The action type `RESET_SCHEMAS` was renamed to `RESET_FORM_SCHEMAS`

```js

// Previously
import { RESET_SCHEMAS } from '@farfetch/blackout-core/forms/redux';

// Now
import { RESET_FORM_SCHEMAS } from '@farfetch/blackout-redux';

```





# [2.0.0-next.167](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.166...@farfetch/blackout-client@2.0.0-next.167) (2022-06-27)


### Features

* **blackout-client|blackout-react|blackout-redux:** export analytics modules in root index file ([45e97d2](https://github.com/Farfetch/blackout/commit/45e97d27f42ae4137d99a3015a04590d4991820e))


### BREAKING CHANGES

* **blackout-client|blackout-react|blackout-redux:** - Analytics imports from `@farfetch/blackout-react/analytics`

All analytics modules that were being imported from
`@farfetch/blackout-react/analytics` must now be imported
from the root of the package:

```js
// Previously
import analytics, { eventTypes } from "@farfetch/blackout-
react/analytics"

// Now
import { analytics, eventTypes } from "@farfetch/blackout-
react"
```

- Analytics redux middlewares from @farfetch/blackout-core/analytics/redux/middlewares

All analytics middlewares that were being imported from
`@farfetch/blackout-core/analytics/redux/middlewares` were renamed and moved
to the `@farfetch/blackout-redux` package:

```js
// Previously
import {
  bagMiddleware,
  setUserMiddleware,
  wishlistMiddleware,
} from '@farfetch/blackout-core/analytics/redux/middlewares';

// Now
import {
  analyticsBagMiddleware,
  analyticsSetUserMiddleware,
  analyticsWishlistMiddleware,
} from '@farfetch/blackout-redux';
```

- Omnitracking clients

Omnitracking clients `postTrackings` and `postBatchTrackings` now
must be imported from `@farfetch/blackout-client` package:

```js
// Previously
import { postTrackings } from "@farfetch/blackout-core/analytics/integrations/Omnitracking/client"
import { postBatchTrackings }
	from "@farfetch/blackout-core/analytics/integrations/Omnitracking/client"

// Now
import { postTrackings } from "@farfetch/blackout-client"
import { postBatchTrackings } from "@farfetch/blackout-client"
```





# [2.0.0-next.166](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.165...@farfetch/blackout-client@2.0.0-next.166) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.165](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.164...@farfetch/blackout-client@2.0.0-next.165) (2022-06-27)


### Features

* **client:** add product grouping client ([f69e9bc](https://github.com/Farfetch/blackout/commit/f69e9bc5769c1f34163e0a43434fed5e889ed0c6))





# [2.0.0-next.164](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.163...@farfetch/blackout-client@2.0.0-next.164) (2022-06-22)


### Features

* **client|redux:** recently viewed in product's scope ([8ad16e6](https://github.com/Farfetch/blackout/commit/8ad16e6ffb79fe45fac8b960cffb2bdae1c07abb))
* **redux:** refactoring of exports in products ([a17e25a](https://github.com/Farfetch/blackout/commit/a17e25ad07cb40d7112f986a3d8a7d4866b377fd))


### BREAKING CHANGES

* **redux:** - Client:
    - All modules related to recently viewed must now be imported from the root of the package.
        ```js
       // previously
       import{ getRecentlyViewedProducts } from ‘@farfetch/blackout-client/recentlyViewed’;

       // now
       import{ getRecentlyViewedProducts } from ‘@farfetch/blackout-client’;
       ```

- Redux:
    - Like client package, recentlyViewed now be imported from root package: Applied
to reducer, actions, selectors, and types as well.
        - imports from products now can be imported from root package. Product's `actionTypes`,
`entitiesMapper`, and `serverInitialState`, need to be changed to `actionTypesProducts`,
`entitiesMapperProducts`, and `serverInitialStateProducts`, to deal with name ambiguity as
a result of allowing import from the root of each blackout package

        ```js
       // previously
       import {
          fetchRecentlyViewedProducts,
          areRecentlyViewedProductsFetched
       } from ‘@farfetch/blackout-redux/recentlyViewed’;
       import {
           actionTypes,
           serverInitialState,
           entitiesMapper
       } from ‘@farfetch/blackout-redux/products’;

       // now
       import {
            fetchRecentlyViewedProducts,
            areRecentlyViewedProductsFetched,
            actionTypesProducts,
            serverInitialStateProducts,
            entitiesMapperProducts
       } from ‘@farfetch/blackout-redux’;
       ```





# [2.0.0-next.163](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.162...@farfetch/blackout-client@2.0.0-next.163) (2022-06-22)


### Features

* **client|redux:** export clients and actions on root for content area ([3e4913f](https://github.com/Farfetch/blackout/commit/3e4913f972e5bcfeede59c97a790e0062395fb20))


### BREAKING CHANGES

* **client|redux:** renamed exports and removed default exports on contents folder.

package/redux
- removed reducer default export
- all exports are now in the following format '*Content'.
- actionTypes to actionTypesContent
- reducer to reducerContent
- serverInitialState to serverInitialStateContent





# [2.0.0-next.162](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.161...@farfetch/blackout-client@2.0.0-next.162) (2022-06-20)


### Bug Fixes

* **client:** checkout getCheckoutOrderCharge with chargeId param ([d597a31](https://github.com/Farfetch/blackout/commit/d597a31a2f9fc53cb77a2b556079f357453098e3))





# [2.0.0-next.161](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.160...@farfetch/blackout-client@2.0.0-next.161) (2022-06-20)


### Features

* add patch checkout order item and delete checkout order item ([e1e709e](https://github.com/Farfetch/blackout/commit/e1e709e3a1545560e7ace6974334c3f07389f23e))





# [2.0.0-next.160](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.159...@farfetch/blackout-client@2.0.0-next.160) (2022-06-15)


### Features

* add logic for operation endpoints ([5f3d28b](https://github.com/Farfetch/blackout/commit/5f3d28b6d1702b9ba0c2146f606194ab92cab368))





# [2.0.0-next.159](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.158...@farfetch/blackout-client@2.0.0-next.159) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.158](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.157...@farfetch/blackout-client@2.0.0-next.158) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.157](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.156...@farfetch/blackout-client@2.0.0-next.157) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.156](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.155...@farfetch/blackout-client@2.0.0-next.156) (2022-06-14)


### Bug Fixes

* **blackout-client|blackout-redux:** fix getFormSchemaByCode selector ([5e209c4](https://github.com/Farfetch/blackout/commit/5e209c467f091496b02446e64f78e45667c167d5))





# [2.0.0-next.155](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.154...@farfetch/blackout-client@2.0.0-next.155) (2022-06-14)


### Bug Fixes

* **redux:** remove unsupported params from FetchUserFactory ([7278675](https://github.com/Farfetch/blackout/commit/7278675df9baf8e488ca464f8f33296c053ebad9))





# [2.0.0-next.154](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.153...@farfetch/blackout-client@2.0.0-next.154) (2022-06-09)


### Features

* **client:** new reset password endpoint ([5d0ced9](https://github.com/Farfetch/blackout/commit/5d0ced90c31a8ea5473a1c88496484f63b30ef2c))





# [2.0.0-next.153](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.152...@farfetch/blackout-client@2.0.0-next.153) (2022-06-09)


### Features

* **blackout-client|blackout-redux:** fix error handling on blackout client and redux ([7b1f92f](https://github.com/Farfetch/blackout/commit/7b1f92fa3d7d03ca3085087d4ac1574d254fe5c0))





# [2.0.0-next.152](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.151...@farfetch/blackout-client@2.0.0-next.152) (2022-06-09)


### Features

* **blackout-*:** convert jsdocs to tsdocs ([7936d24](https://github.com/Farfetch/blackout/commit/7936d24fad2138d5cd0610da624116d31a9cdb93))





# [2.0.0-next.151](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.150...@farfetch/blackout-client@2.0.0-next.151) (2022-06-07)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.150](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.149...@farfetch/blackout-client@2.0.0-next.150) (2022-06-03)


### Features

* **blackout-react:** add checkout events mappings to Zaraz ([9c166db](https://github.com/Farfetch/blackout/commit/9c166dba3bebee23b99d920a99597923f0f791b5))





# [2.0.0-next.149](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.148...@farfetch/blackout-client@2.0.0-next.149) (2022-06-02)


### Features

* **client:** add checkout operation clients ([02e902b](https://github.com/Farfetch/blackout/commit/02e902b01ef97d699e2315645f78cdccd3442154))





# [2.0.0-next.148](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.147...@farfetch/blackout-client@2.0.0-next.148) (2022-05-25)


### Features

* **blackout-*:** fix issues for the release blackout 2 ([8fb3d11](https://github.com/Farfetch/blackout/commit/8fb3d11ca5da34f131cbd021f5751c468dbb43d4))





# [2.0.0-next.147](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.146...@farfetch/blackout-client@2.0.0-next.147) (2022-05-17)


### Features

* **client|redux:** add reschedule endpoints ([2365af9](https://github.com/Farfetch/blackout/commit/2365af968fd8ae6578acf0ac4af008bfd90b8b8a))





# [2.0.0-next.146](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.145...@farfetch/blackout-client@2.0.0-next.146) (2022-05-12)


### Features

* **client|redux:** add personal id and image endpoints ([d295f55](https://github.com/Farfetch/blackout/commit/d295f5576a23d8b1bd8b057ef392fe23234f1961))





# [2.0.0-next.145](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.144...@farfetch/blackout-client@2.0.0-next.145) (2022-05-11)


### Features

* **client|redux:** add personal ids endpoints ([02d7371](https://github.com/Farfetch/blackout/commit/02d7371230c93b682c1a3da8866883d91c3e2617))





# [2.0.0-next.144](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.143...@farfetch/blackout-client@2.0.0-next.144) (2022-05-10)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.143](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.142...@farfetch/blackout-client@2.0.0-next.143) (2022-05-02)


### Features

* **analytics|client|react:** transform Omnitracking integration to typescript ([c987863](https://github.com/Farfetch/blackout/commit/c98786396f6c82a07f6f3359fb994128bdb5f37e))





# [2.0.0-next.142](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.141...@farfetch/blackout-client@2.0.0-next.142) (2022-04-27)


### Bug Fixes

* **client:** fix phone tokens endpoints requests ([b6ea348](https://github.com/Farfetch/blackout/commit/b6ea3485a9725c6f4249262e90a0c2320299b6d1))





# [2.0.0-next.141](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.140...@farfetch/blackout-client@2.0.0-next.141) (2022-04-21)


### Features

* **client|redux:** add phone token validation endpoints on next ([58edd6c](https://github.com/Farfetch/blackout/commit/58edd6c10b83890255ea93674aea42c411a2fc7b))





# [2.0.0-next.140](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.139...@farfetch/blackout-client@2.0.0-next.140) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.139](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.138...@farfetch/blackout-client@2.0.0-next.139) (2022-04-08)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.138](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.137...@farfetch/blackout-client@2.0.0-next.138) (2022-04-05)


### Bug Fixes

* **blackout-client|blackout-redux:** fix updateUserSubscriptions action ([97467d1](https://github.com/Farfetch/blackout/commit/97467d1fcda36fbe15169c95ba798a2d129fb9db))


### BREAKING CHANGES

* **blackout-client|blackout-redux:** The `getUserSubscriptionsError` selector will
not return the error when there is an error
for the `updateUserSubscriptions`
action. To check if there was an error
for that action, you will need to use the
`getUpdateSubscriptionsError` selector as the following example shows:

```
// Previously

import {
    getUserSubscriptionsError,
} from '@farfetch/blackout-redux/subscriptions';

const mapStateToProps = state => {
    return {
      // errorLoadingUserSubscriptions would return all errors
      errorLoadingUserSubscriptions: getUserSubscriptionsError(state),
    };
};

// Change to

import {
    getUserSubscriptionsError,
    getUpdateSubscriptionsError,
} from '@farfetch/blackout-redux/subscriptions';

const mapStateToProps = state => {
    return {
      // Now getUserSubscriptionsError will return errors for loading / deleting actions
      errorLoadingUserSubscriptions: getUserSubscriptionsError(state),
      // getUpdateSubscriptionsError will return the error for the update action
      errorUpdatingUserSubscriptions: getUpdateSubscriptionsError(state)
   };
};
```





# [2.0.0-next.137](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.136...@farfetch/blackout-client@2.0.0-next.137) (2022-04-04)


### Bug Fixes

* **blackout-client:** fix logout in axios interceptor ([e7352d7](https://github.com/Farfetch/blackout/commit/e7352d79dca85d84598b59bf0216ff71400cbf3c))





# [2.0.0-next.136](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.135...@farfetch/blackout-client@2.0.0-next.136) (2022-03-29)


### Bug Fixes

* **react:** add lodash map render content ([8b8a5cc](https://github.com/Farfetch/blackout/commit/8b8a5ccc9304d38e750bea1d00d84c5cc4258388))


### Features

* **core|react|redux:** fix typescript issues for authentication and users ([84920d2](https://github.com/Farfetch/blackout/commit/84920d2384ab387eb48e623a63beec6000cf78e7))





# [2.0.0-next.135](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.134...@farfetch/blackout-client@2.0.0-next.135) (2022-03-21)


### Features

* **react:** update renderContent method ([48911a4](https://github.com/Farfetch/blackout/commit/48911a49eaeb09f82781ae776479ba22a8cff8eb))





# [2.0.0-next.134](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.133...@farfetch/blackout-client@2.0.0-next.134) (2022-03-18)


### Bug Fixes

* **analytics|react:** fix typescript typings ([0294198](https://github.com/Farfetch/blackout/commit/02941985161075aa676cd51183480cfcfe2900dd))





# [2.0.0-next.133](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.132...@farfetch/blackout-client@2.0.0-next.133) (2022-02-22)


### Features

* **client|redux:** add order activities endpoints ([e15afcd](https://github.com/Farfetch/blackout/commit/e15afcdab73339dd3873e3145d2004766cfbcf10))





# [2.0.0-next.132](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.131...@farfetch/blackout-client@2.0.0-next.132) (2022-02-22)


### Features

* **client|redux:** convert subscription area from js to ts ([6b623e4](https://github.com/Farfetch/blackout/commit/6b623e4b580c93089e82dbdc702442305cc9ff44))





# [2.0.0-next.131](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.130...@farfetch/blackout-client@2.0.0-next.131) (2022-02-14)


### Features

* **client|redux:** convert orders files to typescript ([6066925](https://github.com/Farfetch/blackout/commit/6066925eb8c9bb01341d8809cee93634ce413e74))





# [2.0.0-next.130](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.129...@farfetch/blackout-client@2.0.0-next.130) (2022-02-11)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.129](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.128...@farfetch/blackout-client@2.0.0-next.129) (2022-02-04)


### Features

* **redux:** improve actions of 'users' ([aa976a2](https://github.com/Farfetch/blackout/commit/aa976a2e0abd4040b6644beb799db1468ec7135e))





# [2.0.0-next.128](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.127...@farfetch/blackout-client@2.0.0-next.128) (2022-02-03)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.127](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.126...@farfetch/blackout-client@2.0.0-next.127) (2022-02-02)


### Bug Fixes

* **client|redux:** save pickup capabilities time slots ([80bcdb8](https://github.com/Farfetch/blackout/commit/80bcdb842696616b61a8915dd6a7aa195161e837))





# [2.0.0-next.126](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.125...@farfetch/blackout-client@2.0.0-next.126) (2022-01-31)


### Features

* **client|redux:** add new unsubscribe client ([a82f004](https://github.com/Farfetch/blackout/commit/a82f00481100fa74d03c124a39f2a8b5e7978ad2))





# [2.0.0-next.125](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.124...@farfetch/blackout-client@2.0.0-next.125) (2022-01-28)


### Features

* **client|redux:** orders - split core and redux ([60580f6](https://github.com/Farfetch/blackout/commit/60580f603d6db9691baff76b1390024572c637d2))





# [2.0.0-next.124](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.123...@farfetch/blackout-client@2.0.0-next.124) (2022-01-26)


### Features

* **client|redux:** reset orders data on logout ([cd23bdd](https://github.com/Farfetch/blackout/commit/cd23bddb63606f10aced2a9ade0965765192cee1))





# [2.0.0-next.123](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.122...@farfetch/blackout-client@2.0.0-next.123) (2022-01-20)


### Features

* **client|redux:** convert recommended area from js to ts  … ([d86eca2](https://github.com/Farfetch/blackout/commit/d86eca2e9dc84f587d16b96cee701c1b56d2882e))





# [2.0.0-next.122](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.121...@farfetch/blackout-client@2.0.0-next.122) (2022-01-20)


### Features

* **client|redux:** implement new return endpoint ([3442fe4](https://github.com/Farfetch/blackout/commit/3442fe4d8d6da46b427e6104a20cfdcd184767f2))


### BREAKING CHANGES

* **client|redux:** - Changed pickupCapabilities endpoint. Instead of a query, now
it should receive the pickup day in the format YYYY-MM-DD.





# [2.0.0-next.121](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.120...@farfetch/blackout-client@2.0.0-next.121) (2022-01-19)


### Features

* **client|redux:** convert recently viewed area from js to ts ([d80258c](https://github.com/Farfetch/blackout/commit/d80258c3c21038f3464f32f61b53b7398a8da9ff))





# [2.0.0-next.120](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.119...@farfetch/blackout-client@2.0.0-next.120) (2022-01-19)


### Features

* **client:** create client search translations ([997a703](https://github.com/Farfetch/blackout/commit/997a703e893a2146d1d0c70b0b1c56baabdd4cde))





# [2.0.0-next.119](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.118...@farfetch/blackout-client@2.0.0-next.119) (2022-01-19)


### Features

* **client:** add mock service worker contents ([54b78da](https://github.com/Farfetch/blackout/commit/54b78da5ef471e25bf31a51a000431e2eecfe81f))





# [2.0.0-next.118](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.117...@farfetch/blackout-client@2.0.0-next.118) (2022-01-17)


### Bug Fixes

* **client:** add `id` to the set type ([b1bb52c](https://github.com/Farfetch/blackout/commit/b1bb52ce13f06e0f4de510c6c8b3f1769a54a252))





# [2.0.0-next.117](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.116...@farfetch/blackout-client@2.0.0-next.117) (2022-01-14)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.116](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.115...@farfetch/blackout-client@2.0.0-next.116) (2022-01-13)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.115](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.114...@farfetch/blackout-client@2.0.0-next.115) (2022-01-12)


### Features

* **client:** add more commerce pages types ([66bcc2c](https://github.com/Farfetch/blackout/commit/66bcc2cf28925c64ecc0bc687012d03547a7c3b4))





# [2.0.0-next.114](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.113...@farfetch/blackout-client@2.0.0-next.114) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.113](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.112...@farfetch/blackout-client@2.0.0-next.113) (2022-01-11)


### Features

* **client|redux:** convert forms area to ts ([43c4a73](https://github.com/Farfetch/blackout/commit/43c4a7353f2bb36cab43bbcdc8c70cd61c06aef7))





# [2.0.0-next.112](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.111...@farfetch/blackout-client@2.0.0-next.112) (2022-01-11)


### Features

* **redux|client:** add additional user attributes client ([86f2455](https://github.com/Farfetch/blackout/commit/86f2455a9730ad457dd049a8a59d21f31d83f1b7))





# [2.0.0-next.111](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.110...@farfetch/blackout-client@2.0.0-next.111) (2022-01-07)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.110](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.109...@farfetch/blackout-client@2.0.0-next.110) (2021-12-27)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.109](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.108...@farfetch/blackout-client@2.0.0-next.109) (2021-12-23)


### Features

* change loyalty actions nomenclature ([bad8581](https://github.com/Farfetch/blackout/commit/bad8581febc9b5a645f2d1ceabe82285653f71a0))





# [2.0.0-next.108](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.107...@farfetch/blackout-client@2.0.0-next.108) (2021-12-21)


### Features

* **client|redux:** general mocks - returns ([1d385be](https://github.com/Farfetch/blackout/commit/1d385be8ff8d3c9e0b88e0f0e746d53ef3cefdc4))
* **client|redux:** split core & redux returns ([ebff34d](https://github.com/Farfetch/blackout/commit/ebff34d2faa547be6aeaa3b19294959f97ce9992))





# [2.0.0-next.107](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.106...@farfetch/blackout-client@2.0.0-next.107) (2021-12-15)


### Features

* **client:** add `promotionEvaluations` client ([7db4408](https://github.com/Farfetch/blackout/commit/7db440808e90ab83a398e7c929d4b6b5c97cfab1))





# [2.0.0-next.106](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.105...@farfetch/blackout-client@2.0.0-next.106) (2021-12-14)


### Features

* **client|redux:** remove getGuestOrderDetails from next ([36a9660](https://github.com/Farfetch/blackout/commit/36a96606e66190c96114ed0e1741d8a1af462a2b))





# [2.0.0-next.105](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.104...@farfetch/blackout-client@2.0.0-next.105) (2021-12-09)


### Features

* **client|redux:** loyalty - split client ([6d36e03](https://github.com/Farfetch/blackout/commit/6d36e035865916cdf5aa5b6e5341f9ca3963d632))





# [2.0.0-next.104](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.103...@farfetch/blackout-client@2.0.0-next.104) (2021-12-07)


### Bug Fixes

* **core|react:** handle guest users expired in authentication provider ([447ed49](https://github.com/Farfetch/blackout/commit/447ed4962b696bf992052424e94f2a211ebc06d9))





# [2.0.0-next.103](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.102...@farfetch/blackout-client@2.0.0-next.103) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.102](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.101...@farfetch/blackout-client@2.0.0-next.102) (2021-12-06)


### Features

* **client|redux:** profile - rename API and  client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))





# [2.0.0-next.101](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.100...@farfetch/blackout-client@2.0.0-next.101) (2021-12-02)


### Features

* **client:** change nomenclature and improve orders actions ([312ca96](https://github.com/Farfetch/blackout/commit/312ca9671ff194894105e758be9d0b4a3f013357))


### BREAKING CHANGES

* **client:** - Rename the action types if you use them in any custom reducer/middleware:

```js
import { actionTypes } from "@farfetch/blackout-client/orders/redux";

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
actionTypes.FETCH_ORDER_FAILURE;
actionTypes.FETCH_ORDER_REQUEST;
actionTypes.FETCH_ORDER_SUCCESS;

actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS;

actionTypes.FETCH_ORDERS_FAILURE;
actionTypes.FETCH_ORDERS_REQUEST;
actionTypes.FETCH_ORDERS_SUCCESS;

actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE;
actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST;
actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS;

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
} from "@farfetch/blackout-core/orders/redux";

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
} from "@farfetch/blackout-client/orders/redux";
```





# [2.0.0-next.100](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.99...@farfetch/blackout-client@2.0.0-next.100) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-client





# 2.0.0-next.99 (2021-11-29)


### Features

* migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))
