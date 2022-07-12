# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.276](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.275...@farfetch/blackout-react@1.0.0-next.276) (2022-07-12)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.275](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.274...@farfetch/blackout-react@1.0.0-next.275) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.274](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.273...@farfetch/blackout-react@1.0.0-next.274) (2022-07-06)


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





# [1.0.0-next.273](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.272...@farfetch/blackout-react@1.0.0-next.273) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.272](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.271...@farfetch/blackout-react@1.0.0-next.272) (2022-07-04)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.271](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.270...@farfetch/blackout-react@1.0.0-next.271) (2022-07-01)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.270](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.269...@farfetch/blackout-react@1.0.0-next.270) (2022-07-01)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.269](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.268...@farfetch/blackout-react@1.0.0-next.269) (2022-06-30)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.268](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.267...@farfetch/blackout-react@1.0.0-next.268) (2022-06-30)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.267](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.266...@farfetch/blackout-react@1.0.0-next.267) (2022-06-30)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.266](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.265...@farfetch/blackout-react@1.0.0-next.266) (2022-06-30)


### Features

* **react:** add `addBagItem` to `useBag` ([00b24c5](https://github.com/Farfetch/blackout/commit/00b24c5ea02b02f54fb552e42597a784dbd6deae))
* **react:** remove `addBagItem` from `useBagItem` ([45d41ac](https://github.com/Farfetch/blackout/commit/45d41ac275f0ed9658afb84718e7a2e35e293ef0))





# [1.0.0-next.265](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.264...@farfetch/blackout-react@1.0.0-next.265) (2022-06-29)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.264](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.263...@farfetch/blackout-react@1.0.0-next.264) (2022-06-29)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.263](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.262...@farfetch/blackout-react@1.0.0-next.263) (2022-06-29)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.262](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.261...@farfetch/blackout-react@1.0.0-next.262) (2022-06-29)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.261](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.260...@farfetch/blackout-react@1.0.0-next.261) (2022-06-28)


### Bug Fixes

* **react:** fix useAddresses functions and export types ([d1941d5](https://github.com/Farfetch/blackout/commit/d1941d5e00d54e9da0bc0512d8106d58322bb9c2))


### BREAKING CHANGES

* **react:** - Now the hook receives an object as a parameter, since the number of properties
increased and are all optional. Its easier to manage as an object other than passing
all properties as undefined if you want to use only the last one.





# [1.0.0-next.260](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.259...@farfetch/blackout-react@1.0.0-next.260) (2022-06-28)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.259](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.258...@farfetch/blackout-react@1.0.0-next.259) (2022-06-28)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.258](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.257...@farfetch/blackout-react@1.0.0-next.258) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.257](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.256...@farfetch/blackout-react@1.0.0-next.257) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.256](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.255...@farfetch/blackout-react@1.0.0-next.256) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.255](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.254...@farfetch/blackout-react@1.0.0-next.255) (2022-06-27)


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





# [1.0.0-next.254](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.253...@farfetch/blackout-react@1.0.0-next.254) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.253](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.252...@farfetch/blackout-react@1.0.0-next.253) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.252](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.251...@farfetch/blackout-react@1.0.0-next.252) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.251](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.250...@farfetch/blackout-react@1.0.0-next.251) (2022-06-23)


### Bug Fixes

* **react:** remove unnecessary custom GA script validation ([07d0c5f](https://github.com/Farfetch/blackout/commit/07d0c5f25c1095fca8f7e9a6faffb75dd76de8db))





# [1.0.0-next.250](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.249...@farfetch/blackout-react@1.0.0-next.250) (2022-06-22)


### Features

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





# [1.0.0-next.249](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.248...@farfetch/blackout-react@1.0.0-next.249) (2022-06-22)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.248](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.247...@farfetch/blackout-react@1.0.0-next.248) (2022-06-21)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.247](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.246...@farfetch/blackout-react@1.0.0-next.247) (2022-06-20)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.246](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.245...@farfetch/blackout-react@1.0.0-next.246) (2022-06-20)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.245](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.244...@farfetch/blackout-react@1.0.0-next.245) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.244](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.243...@farfetch/blackout-react@1.0.0-next.244) (2022-06-15)


### Features

* add `totalQuantity` and `itemsCount` to `useBag` hook ([e71fd5b](https://github.com/Farfetch/blackout/commit/e71fd5bb91bef6c194d215a86d28c76c94006e91))





# [1.0.0-next.243](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.242...@farfetch/blackout-react@1.0.0-next.243) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.242](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.241...@farfetch/blackout-react@1.0.0-next.242) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.241](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.240...@farfetch/blackout-react@1.0.0-next.241) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.240](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.239...@farfetch/blackout-react@1.0.0-next.240) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.239](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.238...@farfetch/blackout-react@1.0.0-next.239) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.238](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.237...@farfetch/blackout-react@1.0.0-next.238) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.237](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.236...@farfetch/blackout-react@1.0.0-next.237) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.236](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.235...@farfetch/blackout-react@1.0.0-next.236) (2022-06-09)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.235](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.234...@farfetch/blackout-react@1.0.0-next.235) (2022-06-09)


### Features

* **blackout-client|blackout-redux:** fix error handling on blackout client and redux ([7b1f92f](https://github.com/Farfetch/blackout/commit/7b1f92fa3d7d03ca3085087d4ac1574d254fe5c0))





# [1.0.0-next.234](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.233...@farfetch/blackout-react@1.0.0-next.234) (2022-06-09)


### Features

* **blackout-*:** convert jsdocs to tsdocs ([7936d24](https://github.com/Farfetch/blackout/commit/7936d24fad2138d5cd0610da624116d31a9cdb93))





# [1.0.0-next.233](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.232...@farfetch/blackout-react@1.0.0-next.233) (2022-06-07)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.232](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.231...@farfetch/blackout-react@1.0.0-next.232) (2022-06-07)


### Features

* **blackout-react:** implement signup form completed mappings in zaraz ([2cde967](https://github.com/Farfetch/blackout/commit/2cde9676155dab915e2f09d032133d10457df2fd))





# [1.0.0-next.231](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.230...@farfetch/blackout-react@1.0.0-next.231) (2022-06-03)


### Features

* **blackout-react:** add checkout events mappings to Zaraz ([9c166db](https://github.com/Farfetch/blackout/commit/9c166dba3bebee23b99d920a99597923f0f791b5))





# [1.0.0-next.230](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.229...@farfetch/blackout-react@1.0.0-next.230) (2022-06-02)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.229](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.228...@farfetch/blackout-react@1.0.0-next.229) (2022-06-02)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.228](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.227...@farfetch/blackout-react@1.0.0-next.228) (2022-05-31)


### Bug Fixes

* **blackout-react:** fix missing event name parameter for Zaraz events ([a945430](https://github.com/Farfetch/blackout/commit/a94543080cee99c4dc36899f9a3a9df539ba3b37))


### Features

* **blackout-react:** add product viewed/search mappings in Zaraz ([d861fa8](https://github.com/Farfetch/blackout/commit/d861fa8adc4b67bba86aa6bc3f2fb6495b97c6ef))





# [1.0.0-next.227](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.226...@farfetch/blackout-react@1.0.0-next.227) (2022-05-27)


### Features

* **blackout-react:** add product added to cart/wishlist mappings in Zaraz ([4a56722](https://github.com/Farfetch/blackout/commit/4a56722183d6c8f9f8179231eeebdda539d6c43d))





# [1.0.0-next.226](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.225...@farfetch/blackout-react@1.0.0-next.226) (2022-05-25)


### Features

* **blackout-*:** fix issues for the release blackout 2 ([8fb3d11](https://github.com/Farfetch/blackout/commit/8fb3d11ca5da34f131cbd021f5751c468dbb43d4))





# [1.0.0-next.225](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.224...@farfetch/blackout-react@1.0.0-next.225) (2022-05-25)


### Bug Fixes

* **blackout-react:** use env instead of host ([4923762](https://github.com/Farfetch/blackout/commit/4923762d7437a372f940634e8668babc63195df8))


### Features

* **blackout-react:** add Zaraz integration ([d91710c](https://github.com/Farfetch/blackout/commit/d91710c50fc4260cc4bbd36876478df539d344de))





# [1.0.0-next.224](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.223...@farfetch/blackout-react@1.0.0-next.224) (2022-05-17)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.223](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.222...@farfetch/blackout-react@1.0.0-next.223) (2022-05-16)


### Bug Fixes

* only use the `resources` to build the `searchRedirectUrl` if they exist ([c31c87d](https://github.com/Farfetch/blackout/commit/c31c87d9a446655b455fae64aa2046301127355a))





# [1.0.0-next.222](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.221...@farfetch/blackout-react@1.0.0-next.222) (2022-05-16)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.221](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.220...@farfetch/blackout-react@1.0.0-next.221) (2022-05-12)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.220](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.219...@farfetch/blackout-react@1.0.0-next.220) (2022-05-11)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.219](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.218...@farfetch/blackout-react@1.0.0-next.219) (2022-05-10)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.218](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.217...@farfetch/blackout-react@1.0.0-next.218) (2022-05-10)


### Features

* **blackout-react:** convert ga4 integration to typescript ([547de0a](https://github.com/Farfetch/blackout/commit/547de0a80d0380737af786ced86f993a9509cd86))





# [1.0.0-next.217](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.216...@farfetch/blackout-react@1.0.0-next.217) (2022-05-04)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.216](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.215...@farfetch/blackout-react@1.0.0-next.216) (2022-05-03)


### Features

* add `useSearchSuggestions` hook ([a4cff18](https://github.com/Farfetch/blackout/commit/a4cff187cb722e36c1d7228c8bfdd4cdb134e13b))





# [1.0.0-next.215](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.214...@farfetch/blackout-react@1.0.0-next.215) (2022-05-02)


### Features

* **react:** convert Vitorino integration to typescript ([021f12f](https://github.com/Farfetch/blackout/commit/021f12f084e63bb62cc42d5c3d48c75865480993))


### BREAKING CHANGES

* **react:** - Removed unnecessary logic for sensitive and secret fields - now the
integration accepts the array of IDs on both options, regardless of
the events logic.

```
// Previously

analytics.addIntegration('vitorino', Vitorino, {
    sensitiveFields: {
        [eventTypes.LOGIN]: ['passwordInput']
    },
    secretFields: {
        [eventTypes.PURCHASE]: ['cvv']
    }
});

// Change to

analytics.addIntegration('vitorino', Vitorino, {
    sensitiveFields: ['passwordInput'],
    secretFields: ['cvv']
});
```





# [1.0.0-next.214](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.213...@farfetch/blackout-react@1.0.0-next.214) (2022-05-02)


### Features

* **analytics|client|react:** transform Omnitracking integration to typescript ([c987863](https://github.com/Farfetch/blackout/commit/c98786396f6c82a07f6f3359fb994128bdb5f37e))





# [1.0.0-next.213](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.212...@farfetch/blackout-react@1.0.0-next.213) (2022-04-29)


### Features

* **blackout-react:** add support multigender ga4's signup newsletter ([8ac1b9a](https://github.com/Farfetch/blackout/commit/8ac1b9a92ab698fe6297d0948a122dc59dafd434))





# [1.0.0-next.212](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.211...@farfetch/blackout-react@1.0.0-next.212) (2022-04-28)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.211](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.210...@farfetch/blackout-react@1.0.0-next.211) (2022-04-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.210](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.209...@farfetch/blackout-react@1.0.0-next.210) (2022-04-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.209](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.208...@farfetch/blackout-react@1.0.0-next.209) (2022-04-21)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.208](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.207...@farfetch/blackout-react@1.0.0-next.208) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.207](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.206...@farfetch/blackout-react@1.0.0-next.207) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.206](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.205...@farfetch/blackout-react@1.0.0-next.206) (2022-04-11)


### Features

* **react:** add castle 2.0 analytics' integration ([8d5fd35](https://github.com/Farfetch/blackout/commit/8d5fd35a4675e39d0fbadd70d93834f7911b2cbc))


### BREAKING CHANGES

* **react:** From now on, the `appId` option is no longer valid.
Please be sure to pass the new `pk` option (castle publishable key).





# [1.0.0-next.205](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.204...@farfetch/blackout-react@1.0.0-next.205) (2022-04-08)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.204](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.203...@farfetch/blackout-react@1.0.0-next.204) (2022-04-06)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.203](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.202...@farfetch/blackout-react@1.0.0-next.203) (2022-04-05)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.202](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.201...@farfetch/blackout-react@1.0.0-next.202) (2022-04-04)


### Bug Fixes

* **blackout-client:** fix logout in axios interceptor ([e7352d7](https://github.com/Farfetch/blackout/commit/e7352d79dca85d84598b59bf0216ff71400cbf3c))





# [1.0.0-next.201](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.200...@farfetch/blackout-react@1.0.0-next.201) (2022-04-04)


### Bug Fixes

* **blackout-react:** ignore unhandled events in ga/ga4 ([029ee62](https://github.com/Farfetch/blackout/commit/029ee6248b84ff57516f8cdb4381da4b00b49df5))





# [1.0.0-next.200](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.199...@farfetch/blackout-react@1.0.0-next.200) (2022-03-30)


### Features

* **react:** include new params hook useContentType ([eebaf11](https://github.com/Farfetch/blackout/commit/eebaf11ad0dbad6968d01c72676e216f8ff9f644))





# [1.0.0-next.199](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.198...@farfetch/blackout-react@1.0.0-next.199) (2022-03-29)


### Bug Fixes

* **react:** add lodash map render content ([8b8a5cc](https://github.com/Farfetch/blackout/commit/8b8a5ccc9304d38e750bea1d00d84c5cc4258388))


### Features

* **core|react|redux:** fix typescript issues for authentication and users ([84920d2](https://github.com/Farfetch/blackout/commit/84920d2384ab387eb48e623a63beec6000cf78e7))





# [1.0.0-next.198](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.197...@farfetch/blackout-react@1.0.0-next.198) (2022-03-28)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.197](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.196...@farfetch/blackout-react@1.0.0-next.197) (2022-03-28)


### Features

* **blackout-analytics|blackout-react:** convert GTM integration to typescript ([bf53842](https://github.com/Farfetch/blackout/commit/bf53842720985bed8c7a2ef147c651f1f02d6ace))





# [1.0.0-next.196](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.195...@farfetch/blackout-react@1.0.0-next.196) (2022-03-25)


### Bug Fixes

* **blackout-analytics|blackout-react:** fix ga typings ([a107de5](https://github.com/Farfetch/blackout/commit/a107de59fdc4bfc7c0a5d8ac814fa8ce9d0e76f1))


### Features

* **analytics|react:** convert google analytics integration to ts ([a785187](https://github.com/Farfetch/blackout/commit/a78518734550c2ac42a06519640726a45214dd0c))





# [1.0.0-next.195](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.194...@farfetch/blackout-react@1.0.0-next.195) (2022-03-21)


### Features

* **react:** update renderContent method ([48911a4](https://github.com/Farfetch/blackout/commit/48911a49eaeb09f82781ae776479ba22a8cff8eb))





# [1.0.0-next.194](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.193...@farfetch/blackout-react@1.0.0-next.194) (2022-03-21)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.193](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.192...@farfetch/blackout-react@1.0.0-next.193) (2022-03-18)


### Bug Fixes

* **analytics|react:** fix typescript typings ([0294198](https://github.com/Farfetch/blackout/commit/02941985161075aa676cd51183480cfcfe2900dd))


### Features

* **analytics|react:** convert Analytics area from js to ts ([f95e7b0](https://github.com/Farfetch/blackout/commit/f95e7b015f7fdc76f88a70dfcced4668dfe50ea3))





# [1.0.0-next.192](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.191...@farfetch/blackout-react@1.0.0-next.192) (2022-03-17)


### Bug Fixes

* **react:** fix useAddresses hook selectors ([ef3f4d2](https://github.com/Farfetch/blackout/commit/ef3f4d2f4975c771a01ff603c7e7826478f6953e))





# [1.0.0-next.191](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.190...@farfetch/blackout-react@1.0.0-next.191) (2022-03-15)


### Features

* **react:** implement missing selectors and actions in address hook ([ab6fb49](https://github.com/Farfetch/blackout/commit/ab6fb49b1e40dbeebc7988518b4c4a3534e32378))





# [1.0.0-next.190](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.189...@farfetch/blackout-react@1.0.0-next.190) (2022-03-04)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.189](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.188...@farfetch/blackout-react@1.0.0-next.189) (2022-03-03)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.188](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.187...@farfetch/blackout-react@1.0.0-next.188) (2022-03-02)


### Bug Fixes

* remove condition from `useProductsList` ([e078308](https://github.com/Farfetch/blackout/commit/e078308ce93c7e3efdedc4f30c8228aef18efd2b))





# [1.0.0-next.187](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.186...@farfetch/blackout-react@1.0.0-next.187) (2022-03-01)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.186](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.185...@farfetch/blackout-react@1.0.0-next.186) (2022-02-28)


### Bug Fixes

* **blackout-react:** fix `from` parameter in useAddOrUpdateBagItem hook ([a9e5379](https://github.com/Farfetch/blackout/commit/a9e53792ecd3d6555e71592b54e53250b91f0a6d))





# [1.0.0-next.185](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.184...@farfetch/blackout-react@1.0.0-next.185) (2022-02-24)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.184](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.183...@farfetch/blackout-react@1.0.0-next.184) (2022-02-22)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.183](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.182...@farfetch/blackout-react@1.0.0-next.183) (2022-02-22)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.182](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.181...@farfetch/blackout-react@1.0.0-next.182) (2022-02-21)


### Bug Fixes

* **react:** fix interact content payload in GA4 ([9ce0edc](https://github.com/Farfetch/blackout/commit/9ce0edc3db70fbf2e4146c999cc5da4a035132e4))





# [1.0.0-next.181](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.180...@farfetch/blackout-react@1.0.0-next.181) (2022-02-15)


### Bug Fixes

* **react:** change `percentageScrolled` parameter type to number ([fa657ae](https://github.com/Farfetch/blackout/commit/fa657aeb1ed917f187c9c4e43fd6880a9ab90c82))


### Features

* **react:** add GA4 custom scroll event mappings ([3cc5571](https://github.com/Farfetch/blackout/commit/3cc5571fa5671e8cecdd92686e19c19d8fced9be))





# [1.0.0-next.180](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.179...@farfetch/blackout-react@1.0.0-next.180) (2022-02-15)


### Bug Fixes

* remove GA4 non essential events ([3470c12](https://github.com/Farfetch/blackout/commit/3470c121351e1a00c42c17f76e0ef239466dc9de))





# [1.0.0-next.179](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.178...@farfetch/blackout-react@1.0.0-next.179) (2022-02-14)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.178](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.177...@farfetch/blackout-react@1.0.0-next.178) (2022-02-11)


### Features

* **react:** move `handleAddOrUpdateItem` method to new hook ([2e29fb9](https://github.com/Farfetch/blackout/commit/2e29fb905d7cfc0f693a67a19a8b21d5c08830c2)), closes [#16](https://github.com/Farfetch/blackout/issues/16)


### BREAKING CHANGES

* **react:** This moves the method `handleAddOrUpdateItem` to a new
hook `useAddOrUpdateBagItem`. The new hook is necessary since we are using
selectors and actions outside a React component.





# [1.0.0-next.177](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.176...@farfetch/blackout-react@1.0.0-next.177) (2022-02-11)


### Features

* **react:** add useWishlistSet hook ([e1401ba](https://github.com/Farfetch/blackout/commit/e1401bae3886caa5efab5e1960b4d5a6bcac1fad))





# [1.0.0-next.176](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.175...@farfetch/blackout-react@1.0.0-next.176) (2022-02-08)


### Bug Fixes

* **react:** add set user on ga4 initialization ([54ee917](https://github.com/Farfetch/blackout/commit/54ee917684bc5d5b4a3e10db09ca20b8d181dad9))





# [1.0.0-next.175](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.174...@farfetch/blackout-react@1.0.0-next.175) (2022-02-07)


### Features

* **analytics|react:** add signup newsletter event mappings in GA4 ([0b5dd7f](https://github.com/Farfetch/blackout/commit/0b5dd7f22c57dde94012eaef860dc03a744d1856))





# [1.0.0-next.174](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.173...@farfetch/blackout-react@1.0.0-next.174) (2022-02-07)


### Bug Fixes

* **react:** minor fixes to custom events schemas and mappings ([f12ae1d](https://github.com/Farfetch/blackout/commit/f12ae1dcfc0b3e3c0b3f4b97d621c89a413a96e4))
* **react:** remove `items` parameter workaround for custom events ([b584563](https://github.com/Farfetch/blackout/commit/b584563c2f55e3b29e67317691e52d8512f5d9a3))
* **react:** truncate categories if the categories sent are greater than limit ([043aa5e](https://github.com/Farfetch/blackout/commit/043aa5e44521b003002b2f75706da8463d371fd9))
* **react|redux:** fixed GA4 mappings and improved wishlist middleware ([7f989e1](https://github.com/Farfetch/blackout/commit/7f989e137746a22cee375193a243bb751ff2017b))





# [1.0.0-next.173](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.172...@farfetch/blackout-react@1.0.0-next.173) (2022-02-07)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.172](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.171...@farfetch/blackout-react@1.0.0-next.172) (2022-02-04)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.171](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.170...@farfetch/blackout-react@1.0.0-next.171) (2022-02-04)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.170](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.169...@farfetch/blackout-react@1.0.0-next.170) (2022-02-03)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.169](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.168...@farfetch/blackout-react@1.0.0-next.169) (2022-02-02)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.168](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.167...@farfetch/blackout-react@1.0.0-next.168) (2022-02-01)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.167](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.166...@farfetch/blackout-react@1.0.0-next.167) (2022-02-01)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.166](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.165...@farfetch/blackout-react@1.0.0-next.166) (2022-01-31)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.165](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.164...@farfetch/blackout-react@1.0.0-next.165) (2022-01-28)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.164](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.163...@farfetch/blackout-react@1.0.0-next.164) (2022-01-27)


### Features

* **react:** add `useProductsList` hook ([8343500](https://github.com/Farfetch/blackout/commit/8343500c137623a179093776502bb0211a820d72))





# [1.0.0-next.163](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.162...@farfetch/blackout-react@1.0.0-next.163) (2022-01-26)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.162](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.161...@farfetch/blackout-react@1.0.0-next.162) (2022-01-26)


### Features

* **react:** add `useWishlistItem` hook ([9c98c00](https://github.com/Farfetch/blackout/commit/9c98c00c35f4142bdd6c9ed80259b0c0f25e6002))





# [1.0.0-next.161](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.160...@farfetch/blackout-react@1.0.0-next.161) (2022-01-25)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.160](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.159...@farfetch/blackout-react@1.0.0-next.160) (2022-01-24)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.159](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.158...@farfetch/blackout-react@1.0.0-next.159) (2022-01-24)


### Features

* **react:** add allow trigger ga4's change size event on first selection of size ([192e634](https://github.com/Farfetch/blackout/commit/192e6346348cb6cd77f57b5de5a450fcd94d3d12))
* **react:** add parameter path_clean on GA4 view_page event ([82bf8b5](https://github.com/Farfetch/blackout/commit/82bf8b52cf7ce6d980d446f105b0758579bcac71))





# [1.0.0-next.158](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.157...@farfetch/blackout-react@1.0.0-next.158) (2022-01-21)


### Features

* **react:** update billing support on handleSetShippingAddress ([1ec2a78](https://github.com/Farfetch/blackout/commit/1ec2a78820b793f3d8781e52ed5bbde6a3afe0e6))





# [1.0.0-next.157](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.156...@farfetch/blackout-react@1.0.0-next.157) (2022-01-20)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.156](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.155...@farfetch/blackout-react@1.0.0-next.156) (2022-01-20)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.155](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.154...@farfetch/blackout-react@1.0.0-next.155) (2022-01-20)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.154](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.153...@farfetch/blackout-react@1.0.0-next.154) (2022-01-19)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.153](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.152...@farfetch/blackout-react@1.0.0-next.153) (2022-01-19)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.152](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.151...@farfetch/blackout-react@1.0.0-next.152) (2022-01-19)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.151](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.150...@farfetch/blackout-react@1.0.0-next.151) (2022-01-18)


### Features

* **react:** add custom user id property option ([9924e85](https://github.com/Farfetch/blackout/commit/9924e8550677ca2033d2ce70f03ecc9ad3827040))





# [1.0.0-next.150](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.149...@farfetch/blackout-react@1.0.0-next.150) (2022-01-17)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.149](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.148...@farfetch/blackout-react@1.0.0-next.149) (2022-01-17)


### Features

* **react:** add commerce pages hook next ([2ff81c6](https://github.com/Farfetch/blackout/commit/2ff81c6cc3a18bd092cb7a6e091ce3d0bff3089c))





# [1.0.0-next.148](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.147...@farfetch/blackout-react@1.0.0-next.148) (2022-01-17)


### Features

* add `addWishlistItem` to useWishlist hook ([2a56abb](https://github.com/Farfetch/blackout/commit/2a56abbc198eda24d460493a7176a3be3390e6ac))





# [1.0.0-next.147](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.146...@farfetch/blackout-react@1.0.0-next.147) (2022-01-14)


### Features

* **react:** add `useWishlistSets` hook ([9843f24](https://github.com/Farfetch/blackout/commit/9843f24b252a98c9afaf23ba77d63c23c6857e81))





# [1.0.0-next.146](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.145...@farfetch/blackout-react@1.0.0-next.146) (2022-01-14)


### Features

* **react:** add useProductDetails hook ([e373f6a](https://github.com/Farfetch/blackout/commit/e373f6a0c0ef0a5a8a52a13ff9b596e01cff77e1))





# [1.0.0-next.145](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.144...@farfetch/blackout-react@1.0.0-next.145) (2022-01-13)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.144](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.143...@farfetch/blackout-react@1.0.0-next.144) (2022-01-13)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.143](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.142...@farfetch/blackout-react@1.0.0-next.143) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.142](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.141...@farfetch/blackout-react@1.0.0-next.142) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.141](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.140...@farfetch/blackout-react@1.0.0-next.141) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.140](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.139...@farfetch/blackout-react@1.0.0-next.140) (2022-01-11)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.139](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.138...@farfetch/blackout-react@1.0.0-next.139) (2022-01-11)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.138](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.137...@farfetch/blackout-react@1.0.0-next.138) (2022-01-10)


### Features

* **react:** add index file to export everything from the wishlist chunk ([0d7fd79](https://github.com/Farfetch/blackout/commit/0d7fd79096c29e9f6d663d6c9a010b530b437318))





# [1.0.0-next.137](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.136...@farfetch/blackout-react@1.0.0-next.137) (2022-01-10)


### Bug Fixes

* `useBag` hook types ([b1a480a](https://github.com/Farfetch/blackout/commit/b1a480a9f9e95690895f73b77f678d470111a241))





# [1.0.0-next.136](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.135...@farfetch/blackout-react@1.0.0-next.136) (2022-01-10)


### Features

* **react:** add `useWishlist` hook ([2686b9c](https://github.com/Farfetch/blackout/commit/2686b9cc7a51a55f204270610e57f64e811f256a))





# [1.0.0-next.135](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.134...@farfetch/blackout-react@1.0.0-next.135) (2022-01-07)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.134](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.133...@farfetch/blackout-react@1.0.0-next.134) (2022-01-07)


### Features

* **react:** add useBag hook ([6da0047](https://github.com/Farfetch/blackout/commit/6da0047c484100ad8e32c64e7364f67ca843a822))





# [1.0.0-next.133](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.132...@farfetch/blackout-react@1.0.0-next.133) (2021-12-27)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.132](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.131...@farfetch/blackout-react@1.0.0-next.132) (2021-12-23)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.131](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.130...@farfetch/blackout-react@1.0.0-next.131) (2021-12-23)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.130](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.129...@farfetch/blackout-react@1.0.0-next.130) (2021-12-21)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.129](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.128...@farfetch/blackout-react@1.0.0-next.129) (2021-12-16)


### Bug Fixes

* **react:** add from to PRODUCT_CLICKED event mapping in GA4 ([db98850](https://github.com/Farfetch/blackout/commit/db98850969a402f2807c02a133c60f630a14f7ce))





# [1.0.0-next.128](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.127...@farfetch/blackout-react@1.0.0-next.128) (2021-12-16)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.127](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.126...@farfetch/blackout-react@1.0.0-next.127) (2021-12-15)


### Bug Fixes

* fix ga4 promocode_applied event schema ([61c1e72](https://github.com/Farfetch/blackout/commit/61c1e72f136429a00d4894719300f02c3a745d43))





# [1.0.0-next.126](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.125...@farfetch/blackout-react@1.0.0-next.126) (2021-12-15)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.125](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.124...@farfetch/blackout-react@1.0.0-next.125) (2021-12-14)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.124](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.123...@farfetch/blackout-react@1.0.0-next.124) (2021-12-13)


### Features

* **analytics|react|redux:** add ga4 custom events support ([29eccb3](https://github.com/Farfetch/blackout/commit/29eccb354e3af15dceadb361eb52445cd4f3718c))





# [1.0.0-next.123](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.122...@farfetch/blackout-react@1.0.0-next.123) (2021-12-10)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.122](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.121...@farfetch/blackout-react@1.0.0-next.122) (2021-12-10)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.121](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.120...@farfetch/blackout-react@1.0.0-next.121) (2021-12-09)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.120](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.119...@farfetch/blackout-react@1.0.0-next.120) (2021-12-07)


### Bug Fixes

* **core|react:** handle guest users expired in authentication provider ([447ed49](https://github.com/Farfetch/blackout/commit/447ed4962b696bf992052424e94f2a211ebc06d9))





# [1.0.0-next.119](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.118...@farfetch/blackout-react@1.0.0-next.119) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.118](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.117...@farfetch/blackout-react@1.0.0-next.118) (2021-12-06)


### Features

* **client|redux:** profile - rename API and  client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))





# [1.0.0-next.117](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.116...@farfetch/blackout-react@1.0.0-next.117) (2021-12-03)


### Bug Fixes

* **react:** creating checkout just runs on mount ([db3ae73](https://github.com/Farfetch/blackout/commit/db3ae73414ae1c156d9ff807893ab56a854ba7c8))





# [1.0.0-next.116](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.115...@farfetch/blackout-react@1.0.0-next.116) (2021-12-02)


### Features

* **react:** add productAggregatorId to add to bag requests ([a5fac7f](https://github.com/Farfetch/blackout/commit/a5fac7fa7c30a504f872c37f5e6b2d312349097b))





# [1.0.0-next.115](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.114...@farfetch/blackout-react@1.0.0-next.115) (2021-12-02)


### Bug Fixes

* **react:** update handleSize function on the useBagItem function ([854d4f3](https://github.com/Farfetch/blackout/commit/854d4f36e9bb17c35dcf72869727a6bd491a2116))





# [1.0.0-next.114](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.113...@farfetch/blackout-react@1.0.0-next.114) (2021-12-02)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.113](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.112...@farfetch/blackout-react@1.0.0-next.113) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-react





# [1.0.0-next.112](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@0.25.1...@farfetch/blackout-react@1.0.0-next.112) (2021-11-29)


### Features

* migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))
