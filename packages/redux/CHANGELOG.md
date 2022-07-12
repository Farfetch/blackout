# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.277](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.276...@farfetch/blackout-redux@1.0.0-next.277) (2022-07-12)


### Features

* **redux:** add defaultCulture and defaultSubfolder keys on locale ([c2d6954](https://github.com/Farfetch/blackout/commit/c2d695499e7aba35e87018559ccb0029e0aecdc4))





# [1.0.0-next.276](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.275...@farfetch/blackout-redux@1.0.0-next.276) (2022-07-06)


### Features

* **client|redux:** change return files exports ([02457ce](https://github.com/Farfetch/blackout/commit/02457ced5fa5e17011476d50e452d9257231d1a4))





# [1.0.0-next.275](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.274...@farfetch/blackout-redux@1.0.0-next.275) (2022-07-06)


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





# [1.0.0-next.274](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.273...@farfetch/blackout-redux@1.0.0-next.274) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.273](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.272...@farfetch/blackout-redux@1.0.0-next.273) (2022-07-04)


### Bug Fixes

* **blackout-client:** fix typescript errors ([4020e29](https://github.com/Farfetch/blackout/commit/4020e29450b7a5402ab516331bb5856e31e70b10))





# [1.0.0-next.272](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.271...@farfetch/blackout-redux@1.0.0-next.272) (2022-07-01)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.271](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.270...@farfetch/blackout-redux@1.0.0-next.271) (2022-07-01)


### Bug Fixes

* fix typings and renames ([494c84c](https://github.com/Farfetch/blackout/commit/494c84c6a76f31fb8f539427d82a0b2bc0604c92))


### Features

* **client|redux:** export subscription modules in client and redux root index file ([dc72eaf](https://github.com/Farfetch/blackout/commit/dc72eafb963b829b9413147cf6a17ea41a93180b))





# [1.0.0-next.270](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.269...@farfetch/blackout-redux@1.0.0-next.270) (2022-06-30)


### Features

* **client|redux:** recommendations in product's scope ([10ad661](https://github.com/Farfetch/blackout/commit/10ad6610dfa35eb13c3706f60a57de02813b53b1))





# [1.0.0-next.269](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.268...@farfetch/blackout-redux@1.0.0-next.269) (2022-06-30)


### Bug Fixes

* **redux:** merge entities and run duplicate keys ([941ae7e](https://github.com/Farfetch/blackout/commit/941ae7e8cb37702cc412d23873a3f431161bc4cc))


### BREAKING CHANGES

* **redux:** - entitiesMapper signature has changed. Now it receives an array
of extraMappers instead of an object.





# [1.0.0-next.268](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.267...@farfetch/blackout-redux@1.0.0-next.268) (2022-06-30)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.267](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.266...@farfetch/blackout-redux@1.0.0-next.267) (2022-06-29)


### Bug Fixes

* **redux:** add users reset actions to reducer ([fd60cb8](https://github.com/Farfetch/blackout/commit/fd60cb87d17776fc180493a70abb3859e226d416))





# [1.0.0-next.266](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.265...@farfetch/blackout-redux@1.0.0-next.266) (2022-06-29)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.265](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.264...@farfetch/blackout-redux@1.0.0-next.265) (2022-06-29)


### Features

* review users structure in clients ([551274f](https://github.com/Farfetch/blackout/commit/551274f0c1b3277918e17e03698f839550c9fb75))


### BREAKING CHANGES

* The users clients naming strategy and folders structure was changed.





# [1.0.0-next.264](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.263...@farfetch/blackout-redux@1.0.0-next.264) (2022-06-29)


### Bug Fixes

* **blackout-redux:** set customActionTypes as optional ([1a09ec7](https://github.com/Farfetch/blackout/commit/1a09ec7f7f8a1a4c10c92dfeaf439c0157f41607))





# [1.0.0-next.263](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.262...@farfetch/blackout-redux@1.0.0-next.263) (2022-06-28)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.262](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.261...@farfetch/blackout-redux@1.0.0-next.262) (2022-06-28)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.261](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.260...@farfetch/blackout-redux@1.0.0-next.261) (2022-06-27)


### Bug Fixes

* **blackout-redux:** fix reset recently viewed action naming ([9a90fef](https://github.com/Farfetch/blackout/commit/9a90fefd9bc7c28d9f8b1a54375d53fa2cedaa33))


### BREAKING CHANGES

* **blackout-redux:** - The following exports were renamed:

```js
// Previously
import { actionTypesProducts, entitiesMapperProducts,
serverInitialStateProducts } from '@farfetch/blackout-redux';

// Now
import { productsActionTypes, productsEntitiesMapper,
productsServerInitialState } from '@farfetch/blackout-redux';
```





# [1.0.0-next.260](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.259...@farfetch/blackout-redux@1.0.0-next.260) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.259](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.258...@farfetch/blackout-redux@1.0.0-next.259) (2022-06-27)


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





# [1.0.0-next.258](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.257...@farfetch/blackout-redux@1.0.0-next.258) (2022-06-27)


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





# [1.0.0-next.257](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.256...@farfetch/blackout-redux@1.0.0-next.257) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.256](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.255...@farfetch/blackout-redux@1.0.0-next.256) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.255](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.254...@farfetch/blackout-redux@1.0.0-next.255) (2022-06-27)


### Features

* **redux:** add `grouping` state management ([1398356](https://github.com/Farfetch/blackout/commit/1398356a49807446d67ce0dfaed039de87105639))





# [1.0.0-next.254](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.253...@farfetch/blackout-redux@1.0.0-next.254) (2022-06-22)


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





# [1.0.0-next.253](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.252...@farfetch/blackout-redux@1.0.0-next.253) (2022-06-22)


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





# [1.0.0-next.252](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.251...@farfetch/blackout-redux@1.0.0-next.252) (2022-06-21)


### Features

* add patch checkout order item and delete checkout order item action creators ([40baaa3](https://github.com/Farfetch/blackout/commit/40baaa392ffffc7a3bb3e26d70f0fccf47d922ca))





# [1.0.0-next.251](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.250...@farfetch/blackout-redux@1.0.0-next.251) (2022-06-20)


### Bug Fixes

* **redux:** add chargeId param on checkout fetchCharges action ([25709c7](https://github.com/Farfetch/blackout/commit/25709c79875c21147de9223c7cef525a03308c71))





# [1.0.0-next.250](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.249...@farfetch/blackout-redux@1.0.0-next.250) (2022-06-20)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.249](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.248...@farfetch/blackout-redux@1.0.0-next.249) (2022-06-15)


### Features

* add logic for operation endpoints ([5f3d28b](https://github.com/Farfetch/blackout/commit/5f3d28b6d1702b9ba0c2146f606194ab92cab368))





# [1.0.0-next.248](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.247...@farfetch/blackout-redux@1.0.0-next.248) (2022-06-15)


### Features

* add `totalQuantity` and `itemsCount` to `useBag` hook ([e71fd5b](https://github.com/Farfetch/blackout/commit/e71fd5bb91bef6c194d215a86d28c76c94006e91))





# [1.0.0-next.247](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.246...@farfetch/blackout-redux@1.0.0-next.247) (2022-06-15)


### Bug Fixes

* **redux:** remove setUser middleware mandatory parameter ([1bd38bc](https://github.com/Farfetch/blackout/commit/1bd38bceaa63c0191986faa2b86af82c598beb9e))





# [1.0.0-next.246](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.245...@farfetch/blackout-redux@1.0.0-next.246) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.245](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.244...@farfetch/blackout-redux@1.0.0-next.245) (2022-06-15)


### Features

* add `facetId` to `filterSegments` in `productsList` entity ([f8bdfd8](https://github.com/Farfetch/blackout/commit/f8bdfd854e2ebdecbaed589590f9524929344cdb))





# [1.0.0-next.244](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.243...@farfetch/blackout-redux@1.0.0-next.244) (2022-06-15)


### Features

* **redux:** add reset action for users ([b958eb8](https://github.com/Farfetch/blackout/commit/b958eb8e62b71bb4fdaadc0cb6802e0565a7c04a))





# [1.0.0-next.243](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.242...@farfetch/blackout-redux@1.0.0-next.243) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.242](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.241...@farfetch/blackout-redux@1.0.0-next.242) (2022-06-14)


### Bug Fixes

* **blackout-client|blackout-redux:** fix getFormSchemaByCode selector ([5e209c4](https://github.com/Farfetch/blackout/commit/5e209c467f091496b02446e64f78e45667c167d5))





# [1.0.0-next.241](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.240...@farfetch/blackout-redux@1.0.0-next.241) (2022-06-14)


### Bug Fixes

* **redux:** remove unsupported params from FetchUserFactory ([7278675](https://github.com/Farfetch/blackout/commit/7278675df9baf8e488ca464f8f33296c053ebad9))





# [1.0.0-next.240](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.239...@farfetch/blackout-redux@1.0.0-next.240) (2022-06-09)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.239](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.238...@farfetch/blackout-redux@1.0.0-next.239) (2022-06-09)


### Features

* **blackout-client|blackout-redux:** fix error handling on blackout client and redux ([7b1f92f](https://github.com/Farfetch/blackout/commit/7b1f92fa3d7d03ca3085087d4ac1574d254fe5c0))





# [1.0.0-next.238](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.237...@farfetch/blackout-redux@1.0.0-next.238) (2022-06-09)


### Features

* **blackout-*:** convert jsdocs to tsdocs ([7936d24](https://github.com/Farfetch/blackout/commit/7936d24fad2138d5cd0610da624116d31a9cdb93))





# [1.0.0-next.237](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.236...@farfetch/blackout-redux@1.0.0-next.237) (2022-06-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.236](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.235...@farfetch/blackout-redux@1.0.0-next.236) (2022-06-03)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.235](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.234...@farfetch/blackout-redux@1.0.0-next.235) (2022-06-02)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.234](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.233...@farfetch/blackout-redux@1.0.0-next.234) (2022-06-02)


### Bug Fixes

* **redux:** get entity selectors errors ([30ef8e4](https://github.com/Farfetch/blackout/commit/30ef8e4cd8777fa4de03d15d9f226974bebd959b))





# [1.0.0-next.233](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.232...@farfetch/blackout-redux@1.0.0-next.233) (2022-05-25)


### Features

* **blackout-*:** fix issues for the release blackout 2 ([8fb3d11](https://github.com/Farfetch/blackout/commit/8fb3d11ca5da34f131cbd021f5751c468dbb43d4))





# [1.0.0-next.232](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.231...@farfetch/blackout-redux@1.0.0-next.232) (2022-05-17)


### Features

* **client|redux:** add reschedule endpoints ([2365af9](https://github.com/Farfetch/blackout/commit/2365af968fd8ae6578acf0ac4af008bfd90b8b8a))





# [1.0.0-next.231](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.230...@farfetch/blackout-redux@1.0.0-next.231) (2022-05-16)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.230](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.229...@farfetch/blackout-redux@1.0.0-next.230) (2022-05-12)


### Features

* **client|redux:** add personal id and image endpoints ([d295f55](https://github.com/Farfetch/blackout/commit/d295f5576a23d8b1bd8b057ef392fe23234f1961))





# [1.0.0-next.229](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.228...@farfetch/blackout-redux@1.0.0-next.229) (2022-05-11)


### Features

* **client|redux:** add personal ids endpoints ([02d7371](https://github.com/Farfetch/blackout/commit/02d7371230c93b682c1a3da8866883d91c3e2617))





# [1.0.0-next.228](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.227...@farfetch/blackout-redux@1.0.0-next.228) (2022-05-10)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.227](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.226...@farfetch/blackout-redux@1.0.0-next.227) (2022-05-10)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.226](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.225...@farfetch/blackout-redux@1.0.0-next.226) (2022-05-04)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.225](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.224...@farfetch/blackout-redux@1.0.0-next.225) (2022-05-02)


### Features

* **analytics|client|react:** transform Omnitracking integration to typescript ([c987863](https://github.com/Farfetch/blackout/commit/c98786396f6c82a07f6f3359fb994128bdb5f37e))





# [1.0.0-next.224](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.223...@farfetch/blackout-redux@1.0.0-next.224) (2022-04-28)


### Features

* **blackout-redux:** convert analytic's wishlist middleware to typescript ([ab2e7a2](https://github.com/Farfetch/blackout/commit/ab2e7a20810f7548892f4c3964dc3a0946bb3d71))





# [1.0.0-next.223](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.222...@farfetch/blackout-redux@1.0.0-next.223) (2022-04-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.222](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.221...@farfetch/blackout-redux@1.0.0-next.222) (2022-04-27)


### Features

* **blackout-redux:** convert analytic's bag middleware to typescript ([c3f89fd](https://github.com/Farfetch/blackout/commit/c3f89fd27c987f5afbaf3929967fb5b1190c626e))





# [1.0.0-next.221](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.220...@farfetch/blackout-redux@1.0.0-next.221) (2022-04-21)


### Features

* **client|redux:** add phone token validation endpoints on next ([58edd6c](https://github.com/Farfetch/blackout/commit/58edd6c10b83890255ea93674aea42c411a2fc7b))





# [1.0.0-next.220](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.219...@farfetch/blackout-redux@1.0.0-next.220) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.219](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.218...@farfetch/blackout-redux@1.0.0-next.219) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.218](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.217...@farfetch/blackout-redux@1.0.0-next.218) (2022-04-11)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.217](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.216...@farfetch/blackout-redux@1.0.0-next.217) (2022-04-08)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.216](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.215...@farfetch/blackout-redux@1.0.0-next.216) (2022-04-06)


### Features

* **blackout-analytics|blackout-redux:** convert analytic's user middleware to typescript ([3a6433d](https://github.com/Farfetch/blackout/commit/3a6433d72625737a24f54797f090f279c95d2e91))





# [1.0.0-next.215](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.214...@farfetch/blackout-redux@1.0.0-next.215) (2022-04-05)


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





# [1.0.0-next.214](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.213...@farfetch/blackout-redux@1.0.0-next.214) (2022-04-04)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.213](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.212...@farfetch/blackout-redux@1.0.0-next.213) (2022-04-04)


### Bug Fixes

* **blackout-core:** fix `getWishlistItemIdFromAction` function ([a8e7256](https://github.com/Farfetch/blackout/commit/a8e72565008e7321bbaf5fa58121f532ec41cdbb))





# [1.0.0-next.212](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.211...@farfetch/blackout-redux@1.0.0-next.212) (2022-03-29)


### Bug Fixes

* **react:** add lodash map render content ([8b8a5cc](https://github.com/Farfetch/blackout/commit/8b8a5ccc9304d38e750bea1d00d84c5cc4258388))


### Features

* **core|react|redux:** fix typescript issues for authentication and users ([84920d2](https://github.com/Farfetch/blackout/commit/84920d2384ab387eb48e623a63beec6000cf78e7))





# [1.0.0-next.211](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.210...@farfetch/blackout-redux@1.0.0-next.211) (2022-03-28)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.210](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.209...@farfetch/blackout-redux@1.0.0-next.210) (2022-03-28)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.209](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.208...@farfetch/blackout-redux@1.0.0-next.209) (2022-03-25)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.208](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.207...@farfetch/blackout-redux@1.0.0-next.208) (2022-03-21)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.207](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.206...@farfetch/blackout-redux@1.0.0-next.207) (2022-03-21)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.206](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.205...@farfetch/blackout-redux@1.0.0-next.206) (2022-03-18)


### Bug Fixes

* **analytics|react:** fix typescript typings ([0294198](https://github.com/Farfetch/blackout/commit/02941985161075aa676cd51183480cfcfe2900dd))





# [1.0.0-next.205](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.204...@farfetch/blackout-redux@1.0.0-next.205) (2022-03-04)


### Features

* **redux:** update order of components and fix ranking on merge strategy for commerce pages next ([ad96bda](https://github.com/Farfetch/blackout/commit/ad96bdaeb0ca993b03e4e80e25ac7263555f3667))





# [1.0.0-next.204](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.203...@farfetch/blackout-redux@1.0.0-next.204) (2022-03-03)


### Bug Fixes

* **core:** add `groupsOn` to the sizes facet's entity id ([884138a](https://github.com/Farfetch/blackout/commit/884138ab2cd4b8d69744a2480a3695d85c0a5d51))





# [1.0.0-next.203](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.202...@farfetch/blackout-redux@1.0.0-next.203) (2022-03-01)


### Bug Fixes

* **redux:** add missing reducers and selectors for activities endpoints on next ([620ec34](https://github.com/Farfetch/blackout/commit/620ec34c45d249648cd77abe610b344e956533ab))





# [1.0.0-next.202](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.201...@farfetch/blackout-redux@1.0.0-next.202) (2022-02-24)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.201](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.200...@farfetch/blackout-redux@1.0.0-next.201) (2022-02-22)


### Features

* **client|redux:** add order activities endpoints ([e15afcd](https://github.com/Farfetch/blackout/commit/e15afcdab73339dd3873e3145d2004766cfbcf10))





# [1.0.0-next.200](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.199...@farfetch/blackout-redux@1.0.0-next.200) (2022-02-22)


### Features

* **client|redux:** convert subscription area from js to ts ([6b623e4](https://github.com/Farfetch/blackout/commit/6b623e4b580c93089e82dbdc702442305cc9ff44))





# [1.0.0-next.199](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.198...@farfetch/blackout-redux@1.0.0-next.199) (2022-02-15)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.198](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.197...@farfetch/blackout-redux@1.0.0-next.198) (2022-02-14)


### Features

* **client|redux:** convert orders files to typescript ([6066925](https://github.com/Farfetch/blackout/commit/6066925eb8c9bb01341d8809cee93634ce413e74))





# [1.0.0-next.197](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.196...@farfetch/blackout-redux@1.0.0-next.197) (2022-02-11)


### Features

* **react:** move `handleAddOrUpdateItem` method to new hook ([2e29fb9](https://github.com/Farfetch/blackout/commit/2e29fb905d7cfc0f693a67a19a8b21d5c08830c2)), closes [#16](https://github.com/Farfetch/blackout/issues/16)


### BREAKING CHANGES

* **react:** This moves the method `handleAddOrUpdateItem` to a new
hook `useAddOrUpdateBagItem`. The new hook is necessary since we are using
selectors and actions outside a React component.





# [1.0.0-next.196](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.195...@farfetch/blackout-redux@1.0.0-next.196) (2022-02-11)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.195](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.194...@farfetch/blackout-redux@1.0.0-next.195) (2022-02-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.194](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.193...@farfetch/blackout-redux@1.0.0-next.194) (2022-02-07)


### Bug Fixes

* **react|redux:** fixed GA4 mappings and improved wishlist middleware ([7f989e1](https://github.com/Farfetch/blackout/commit/7f989e137746a22cee375193a243bb751ff2017b))





# [1.0.0-next.193](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.192...@farfetch/blackout-redux@1.0.0-next.193) (2022-02-07)


### Bug Fixes

* **redux:** fix fetchWishlistSetFactory ([138ef0a](https://github.com/Farfetch/blackout/commit/138ef0a2cf7cfc6417ce9ffeb115afbb7791e3e9))





# [1.0.0-next.192](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.191...@farfetch/blackout-redux@1.0.0-next.192) (2022-02-04)


### Features

* **redux:** reset users data on logout ([f123cb8](https://github.com/Farfetch/blackout/commit/f123cb8a51cea82c5ee67108c102f54c1113d21a))





# [1.0.0-next.191](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.190...@farfetch/blackout-redux@1.0.0-next.191) (2022-02-04)


### Features

* **redux:** improve actions of 'users' ([aa976a2](https://github.com/Farfetch/blackout/commit/aa976a2e0abd4040b6644beb799db1468ec7135e))





# [1.0.0-next.190](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.189...@farfetch/blackout-redux@1.0.0-next.190) (2022-02-03)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.189](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.188...@farfetch/blackout-redux@1.0.0-next.189) (2022-02-02)


### Bug Fixes

* **client|redux:** save pickup capabilities time slots ([80bcdb8](https://github.com/Farfetch/blackout/commit/80bcdb842696616b61a8915dd6a7aa195161e837))





# [1.0.0-next.188](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.187...@farfetch/blackout-redux@1.0.0-next.188) (2022-02-01)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.187](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.186...@farfetch/blackout-redux@1.0.0-next.187) (2022-01-31)


### Features

* **client|redux:** add new unsubscribe client ([a82f004](https://github.com/Farfetch/blackout/commit/a82f00481100fa74d03c124a39f2a8b5e7978ad2))





# [1.0.0-next.186](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.185...@farfetch/blackout-redux@1.0.0-next.186) (2022-01-28)


### Features

* **client|redux:** orders - split core and redux ([60580f6](https://github.com/Farfetch/blackout/commit/60580f603d6db9691baff76b1390024572c637d2))





# [1.0.0-next.185](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.184...@farfetch/blackout-redux@1.0.0-next.185) (2022-01-26)


### Features

* **client|redux:** reset orders data on logout ([cd23bdd](https://github.com/Farfetch/blackout/commit/cd23bddb63606f10aced2a9ade0965765192cee1))





# [1.0.0-next.184](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.183...@farfetch/blackout-redux@1.0.0-next.184) (2022-01-26)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.183](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.182...@farfetch/blackout-redux@1.0.0-next.183) (2022-01-25)


### Bug Fixes

* **redux:** multiple entries generates same hash contents ([597fa06](https://github.com/Farfetch/blackout/commit/597fa061d39d8bd49ba2d69e2a4ad904a91c729b))





# [1.0.0-next.182](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.181...@farfetch/blackout-redux@1.0.0-next.182) (2022-01-24)


### Features

* **redux:** add isWishlistSetFetched selector ([89115c9](https://github.com/Farfetch/blackout/commit/89115c9b707c4adf41b54ae1bd961a8925b4241c))





# [1.0.0-next.181](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.180...@farfetch/blackout-redux@1.0.0-next.181) (2022-01-20)


### Features

* **client|redux:** convert recommended area from js to ts  … ([d86eca2](https://github.com/Farfetch/blackout/commit/d86eca2e9dc84f587d16b96cee701c1b56d2882e))





# [1.0.0-next.180](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.179...@farfetch/blackout-redux@1.0.0-next.180) (2022-01-20)


### Features

* **client|redux:** implement new return endpoint ([3442fe4](https://github.com/Farfetch/blackout/commit/3442fe4d8d6da46b427e6104a20cfdcd184767f2))


### BREAKING CHANGES

* **client|redux:** - Changed pickupCapabilities endpoint. Instead of a query, now
it should receive the pickup day in the format YYYY-MM-DD.





# [1.0.0-next.179](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.178...@farfetch/blackout-redux@1.0.0-next.179) (2022-01-20)


### Features

* **redux:** reset loyalty data on logout ([877dc08](https://github.com/Farfetch/blackout/commit/877dc08e31d066a787e57ea3253836e576d9227f))





# [1.0.0-next.178](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.177...@farfetch/blackout-redux@1.0.0-next.178) (2022-01-19)


### Features

* **client|redux:** convert recently viewed area from js to ts ([869a576](https://github.com/Farfetch/blackout/commit/869a576b9b5a0fd4bd3075d5a7d1a93a5eb8224b))
* **client|redux:** convert recently viewed area from js to ts ([d80258c](https://github.com/Farfetch/blackout/commit/d80258c3c21038f3464f32f61b53b7398a8da9ff))





# [1.0.0-next.177](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.176...@farfetch/blackout-redux@1.0.0-next.177) (2022-01-19)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.176](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.175...@farfetch/blackout-redux@1.0.0-next.176) (2022-01-19)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.175](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.174...@farfetch/blackout-redux@1.0.0-next.175) (2022-01-17)


### Bug Fixes

* **redux:** add `id` to the lists server initial state ([83948bb](https://github.com/Farfetch/blackout/commit/83948bbbb6e130b6aff5905035f6ba4ec5f97874))





# [1.0.0-next.174](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.173...@farfetch/blackout-redux@1.0.0-next.174) (2022-01-14)


### Features

* **redux:** add selectors types for `wishlistsSets`` ([a85a00f](https://github.com/Farfetch/blackout/commit/a85a00f69e143e36ab7d9df97e630e4439ca2041))





# [1.0.0-next.173](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.172...@farfetch/blackout-redux@1.0.0-next.173) (2022-01-14)


### Features

* **react:** add useProductDetails hook ([e373f6a](https://github.com/Farfetch/blackout/commit/e373f6a0c0ef0a5a8a52a13ff9b596e01cff77e1))





# [1.0.0-next.172](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.171...@farfetch/blackout-redux@1.0.0-next.172) (2022-01-13)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.171](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.170...@farfetch/blackout-redux@1.0.0-next.171) (2022-01-13)


### Features

* **redux:** reset returns data on logout ([b52f8c2](https://github.com/Farfetch/blackout/commit/b52f8c201f61825624d257b6290459fa4accae1d))





# [1.0.0-next.170](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.169...@farfetch/blackout-redux@1.0.0-next.170) (2022-01-12)


### Features

* **redux:** add commerce pages to redux ([2924ec3](https://github.com/Farfetch/blackout/commit/2924ec355572e2755c9137985a7ae4200e877294))





# [1.0.0-next.169](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.168...@farfetch/blackout-redux@1.0.0-next.169) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.168](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.167...@farfetch/blackout-redux@1.0.0-next.168) (2022-01-12)


### chore

* **redux:** returns - rename api ([eac274a](https://github.com/Farfetch/blackout/commit/eac274aa8df08be2613aa49483c3915eb96d78a0))


### Features

* **redux:** provide returns actions with client ([73af24c](https://github.com/Farfetch/blackout/commit/73af24c79adb9f4a1e2045c9eb1fc8ab3353cf26))


### BREAKING CHANGES

* **redux:** - Rename the action types if you use them in any custom reducer/middleware:

```js
import { actionTypes } from "@farfetch/blackout-client/returns/redux";

// Previously
actionTypes.GET_PICKUP_CAPABILITIES_FAILURE;
actionTypes.GET_PICKUP_CAPABILITIES_REQUEST;
actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS;

actionTypes.GET_REFERENCES_FAILURE;
actionTypes.GET_REFERENCES_REQUEST;
actionTypes.GET_REFERENCES_SUCCESS;

actionTypes.GET_RETURN_FAILURE;
actionTypes.GET_RETURN_REQUEST;
actionTypes.GET_RETURN_SUCCESS;

actionTypes.GET_RETURNS_FROM_ORDER_FAILURE;
actionTypes.GET_RETURNS_FROM_ORDER_REQUEST;
actionTypes.GET_RETURNS_FROM_ORDER_SUCCESS;

// Change to
actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE;
actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST;
actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS;

actionTypes.FETCH_REFERENCES_FAILURE;
actionTypes.FETCH_REFERENCES_REQUEST;
actionTypes.FETCH_REFERENCES_SUCCESS;

actionTypes.FETCH_RETURN_FAILURE;
actionTypes.FETCH_RETURN_REQUEST;
actionTypes.FETCH_RETURN_SUCCESS;

actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE;
actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST;
actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS;
```

- Rename the action thunk creators:
```js
// Previously
import {
  doCreateReturn,
  doGetReturn,
  doGetPickupCapabilities,
  doGetReferences,
  doGetReturnsFromOrder,
  doResetReturn,
  doUpdateReturn,
} from "@farfetch/blackout-redux/returns";

// Change to
import {
  createReturn,
  fetchReturn,
  fetchPickupCapabilities,
  fetchReferences,
  fetchReturnsFromOrder,
  resetReturn,
  updateReturn,
} from "@farfetch/blackout-redux/returns";
```





# [1.0.0-next.167](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.166...@farfetch/blackout-redux@1.0.0-next.167) (2022-01-11)


### Features

* **client|redux:** convert forms area to ts ([43c4a73](https://github.com/Farfetch/blackout/commit/43c4a7353f2bb36cab43bbcdc8c70cd61c06aef7))





# [1.0.0-next.166](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.165...@farfetch/blackout-redux@1.0.0-next.166) (2022-01-11)


### Features

* **redux|client:** add additional user attributes client ([86f2455](https://github.com/Farfetch/blackout/commit/86f2455a9730ad457dd049a8a59d21f31d83f1b7))





# [1.0.0-next.165](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.164...@farfetch/blackout-redux@1.0.0-next.165) (2022-01-10)


### Bug Fixes

* `useBag` hook types ([b1a480a](https://github.com/Farfetch/blackout/commit/b1a480a9f9e95690895f73b77f678d470111a241))





# [1.0.0-next.164](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.163...@farfetch/blackout-redux@1.0.0-next.164) (2022-01-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.163](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.162...@farfetch/blackout-redux@1.0.0-next.163) (2021-12-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.162](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.161...@farfetch/blackout-redux@1.0.0-next.162) (2021-12-23)


### Features

* **redux:** provide loyalty actions with a client ([2e98225](https://github.com/Farfetch/blackout/commit/2e982255eb5b09604047569e10526da3205a23cf))





# [1.0.0-next.161](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.160...@farfetch/blackout-redux@1.0.0-next.161) (2021-12-23)


### Features

* change loyalty actions nomenclature ([bad8581](https://github.com/Farfetch/blackout/commit/bad8581febc9b5a645f2d1ceabe82285653f71a0))





# [1.0.0-next.160](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.159...@farfetch/blackout-redux@1.0.0-next.160) (2021-12-21)


### Features

* **client|redux:** general mocks - returns ([1d385be](https://github.com/Farfetch/blackout/commit/1d385be8ff8d3c9e0b88e0f0e746d53ef3cefdc4))
* **client|redux:** split core & redux returns ([ebff34d](https://github.com/Farfetch/blackout/commit/ebff34d2faa547be6aeaa3b19294959f97ce9992))
* **redux:** return statements - returns ([4ae2e50](https://github.com/Farfetch/blackout/commit/4ae2e506bcfb0c07fb0cd427c6b4493d54fe6024))





# [1.0.0-next.159](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.158...@farfetch/blackout-redux@1.0.0-next.159) (2021-12-16)


### Bug Fixes

* **redux:** remove circular dependency from recently viewed ([9a69cc1](https://github.com/Farfetch/blackout/commit/9a69cc188005a5ebf34cd3b041604e7b027946eb))





# [1.0.0-next.158](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.157...@farfetch/blackout-redux@1.0.0-next.158) (2021-12-16)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.157](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.156...@farfetch/blackout-redux@1.0.0-next.157) (2021-12-15)


### Features

* **redux:** add `promotionEvaluations` redux logic ([da63b77](https://github.com/Farfetch/blackout/commit/da63b775e5ff4803c0820b6fcb3a6a4f65b47480))





# [1.0.0-next.156](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.155...@farfetch/blackout-redux@1.0.0-next.156) (2021-12-14)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.155](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.154...@farfetch/blackout-redux@1.0.0-next.155) (2021-12-13)


### Features

* **analytics|react|redux:** add ga4 custom events support ([29eccb3](https://github.com/Farfetch/blackout/commit/29eccb354e3af15dceadb361eb52445cd4f3718c))





# [1.0.0-next.154](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.153...@farfetch/blackout-redux@1.0.0-next.154) (2021-12-10)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.153](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.152...@farfetch/blackout-redux@1.0.0-next.153) (2021-12-10)


### Features

* add selector to get all product sizes with remaining quantity ([28fc8a6](https://github.com/Farfetch/blackout/commit/28fc8a68952b88075821a3d40d04f110b3a09585))





# [1.0.0-next.152](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.151...@farfetch/blackout-redux@1.0.0-next.152) (2021-12-09)


### Features

* **client|redux:** loyalty - split client ([6d36e03](https://github.com/Farfetch/blackout/commit/6d36e035865916cdf5aa5b6e5341f9ca3963d632))





# [1.0.0-next.151](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.150...@farfetch/blackout-redux@1.0.0-next.151) (2021-12-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.150](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.149...@farfetch/blackout-redux@1.0.0-next.150) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.149](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.148...@farfetch/blackout-redux@1.0.0-next.149) (2021-12-06)


### Bug Fixes

* **redux:** make `getBagItems` return empty array ([c339a06](https://github.com/Farfetch/blackout/commit/c339a0601af8be973c6aea526197a7254ed76008))


### Features

* **client|redux:** profile - rename API and  client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))





# [1.0.0-next.148](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.147...@farfetch/blackout-redux@1.0.0-next.148) (2021-12-03)


### Bug Fixes

* **redux:** remove entries in server initial state of product/details ([d73b71f](https://github.com/Farfetch/blackout/commit/d73b71fb74de06f5b569b9ab6c893376d8dd1aca))





# [1.0.0-next.147](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.146...@farfetch/blackout-redux@1.0.0-next.147) (2021-12-02)


### Features

* **redux:** add productAggregatorId to add to bag requests ([e661332](https://github.com/Farfetch/blackout/commit/e6613321764a7769957fc3e237d1c880cc533994))





# [1.0.0-next.146](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.145...@farfetch/blackout-redux@1.0.0-next.146) (2021-12-02)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.145](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.144...@farfetch/blackout-redux@1.0.0-next.145) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-redux





# 1.0.0-next.144 (2021-11-29)


### Features

* migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))
