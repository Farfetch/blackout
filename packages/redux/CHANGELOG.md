# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.376](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.375...@farfetch/blackout-redux@1.0.0-next.376) (2023-02-23)


### Bug Fixes

* add "type": "module" to all packages ([71a07d9](https://github.com/Farfetch/blackout/commit/71a07d970cd00cf450ad4a23b63f07876c9ab6db))





# [1.0.0-next.375](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.374...@farfetch/blackout-redux@1.0.0-next.375) (2023-02-23)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.374](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.373...@farfetch/blackout-redux@1.0.0-next.374) (2023-02-20)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.373](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.372...@farfetch/blackout-redux@1.0.0-next.373) (2023-02-17)


### Features

* added raffles endpoints ([d28e48e](https://github.com/Farfetch/blackout/commit/d28e48ec90f17dfe3f04efff79fa0c7c9dd49c78))





# [1.0.0-next.372](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.371...@farfetch/blackout-redux@1.0.0-next.372) (2023-02-17)


### Features

* add set bag promocodes in bag ([ecd490d](https://github.com/Farfetch/blackout/commit/ecd490db9c77da939546f574b52e32c61b7a18d9))


### BREAKING CHANGES

* Bag middleware `fetchBagOperationsOnBagRequestSuccess`
must now be imported from `bagMiddlewares` export instead of directly
from the root of the package.





# [1.0.0-next.371](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.370...@farfetch/blackout-redux@1.0.0-next.371) (2023-02-17)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.370](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.369...@farfetch/blackout-redux@1.0.0-next.370) (2023-02-16)


### Features

* **analytics|react:** add forter and riskified integrations ([5fcf9bb](https://github.com/Farfetch/blackout/commit/5fcf9bb5d97affbfd92303e4df5934e4df188462))


### BREAKING CHANGES

* **analytics|react:** Vitorino was removed from the list of available
integrations and now there are separate Riskified and Forter integrations
that will need to be added separately to have the same behaviour
provided by Vitorino.





# [1.0.0-next.369](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.368...@farfetch/blackout-redux@1.0.0-next.369) (2023-02-15)


### Bug Fixes

* **redux:** fix checkout reducer ([48fe940](https://github.com/Farfetch/blackout/commit/48fe940ae7b70e1d7b6d216f99d89d194cf33113))


### BREAKING CHANGES

* **redux:** Now when the default login, register and fetch user
actions are dispatched to the store, no cleanup of any checkout
order state is performed.





# [1.0.0-next.368](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.367...@farfetch/blackout-redux@1.0.0-next.368) (2023-02-10)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.367](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.366...@farfetch/blackout-redux@1.0.0-next.367) (2023-02-09)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.366](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.365...@farfetch/blackout-redux@1.0.0-next.366) (2023-02-08)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.365](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.364...@farfetch/blackout-redux@1.0.0-next.365) (2023-02-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.364](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.363...@farfetch/blackout-redux@1.0.0-next.364) (2023-02-07)


### Features

* **redux:** add redux product outfits ([1df1612](https://github.com/Farfetch/blackout/commit/1df1612a02a0d9bd0723cc36fca93ccf476082fc))





# [1.0.0-next.363](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.362...@farfetch/blackout-redux@1.0.0-next.363) (2023-02-03)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.362](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.361...@farfetch/blackout-redux@1.0.0-next.362) (2023-02-02)


### Bug Fixes

* **redux:** fix product attributes server render ([88b650f](https://github.com/Farfetch/blackout/commit/88b650fe814015e926af05e6e1bd39fd1a029bb5))





# [1.0.0-next.361](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.360...@farfetch/blackout-redux@1.0.0-next.361) (2023-02-02)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.360](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.359...@farfetch/blackout-redux@1.0.0-next.360) (2023-01-31)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.359](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.358...@farfetch/blackout-redux@1.0.0-next.359) (2023-01-30)


### Features

* **redux:** add bag operations endpoints ([374b3e6](https://github.com/Farfetch/blackout/commit/374b3e652d22c384a19d11a5d7be4a7df45801dd))





# [1.0.0-next.358](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.357...@farfetch/blackout-redux@1.0.0-next.358) (2023-01-27)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.357](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.356...@farfetch/blackout-redux@1.0.0-next.357) (2023-01-23)


### Bug Fixes

* fix error handling ([0a2128d](https://github.com/Farfetch/blackout/commit/0a2128da7c1c425f826b793ddaebaa5053d13452))





# [1.0.0-next.356](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.355...@farfetch/blackout-redux@1.0.0-next.356) (2023-01-11)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.355](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.354...@farfetch/blackout-redux@1.0.0-next.355) (2023-01-09)


### Bug Fixes

* **redux|react:** fix createSelector types ([883a337](https://github.com/Farfetch/blackout/commit/883a33718428e9463fdcfcfe08dd7815d03f2038))





# [1.0.0-next.354](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.353...@farfetch/blackout-redux@1.0.0-next.354) (2023-01-02)


### Features

* **analytics|react|redux:** transform analytics types into enums ([cd551c3](https://github.com/Farfetch/blackout/commit/cd551c33713c40a30b36ee305913e944da9d2416))





# [1.0.0-next.353](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.352...@farfetch/blackout-redux@1.0.0-next.353) (2022-12-22)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.352](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.351...@farfetch/blackout-redux@1.0.0-next.352) (2022-12-21)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.351](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.350...@farfetch/blackout-redux@1.0.0-next.351) (2022-12-21)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.350](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.349...@farfetch/blackout-redux@1.0.0-next.350) (2022-12-15)


### Bug Fixes

* **redux|react|client:** fix product listing hook and filters related types ([baced32](https://github.com/Farfetch/blackout/commit/baced32db6c7155b25134c20927e88baef3e36bb))





# [1.0.0-next.349](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.348...@farfetch/blackout-redux@1.0.0-next.349) (2022-12-14)


### Features

* **redux:** add redux shared whislists ([581a76b](https://github.com/Farfetch/blackout/commit/581a76baae4dabf2534c24a92a75be062fab3054))





# [1.0.0-next.348](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.347...@farfetch/blackout-redux@1.0.0-next.348) (2022-12-13)


### Features

* **client|redux|react:** add support to metadata on bag and wishlist hooks ([ab9def2](https://github.com/Farfetch/blackout/commit/ab9def21429b812779c885fb87de7ec69964e7bb))





# [1.0.0-next.347](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.346...@farfetch/blackout-redux@1.0.0-next.347) (2022-12-13)


### Bug Fixes

* **react|redux:** fix wishlist and bag selectors ([071ed5d](https://github.com/Farfetch/blackout/commit/071ed5dea7351d83465ac92102d4df9f5eca188d))
* **redux:** add missing selectors exports ([c27ec21](https://github.com/Farfetch/blackout/commit/c27ec213433c282be7be52983a3420c30967384a))





# [1.0.0-next.346](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.345...@farfetch/blackout-redux@1.0.0-next.346) (2022-12-09)


### Bug Fixes

* fix unit tests typings ([8046bbd](https://github.com/Farfetch/blackout/commit/8046bbdc720bd1e280c1b11a0cf9c3e6891f9785))


### Features

* **react|redux:** add checkout hooks ([ca0f846](https://github.com/Farfetch/blackout/commit/ca0f846025afa9ebc91204e710babb88c469eaec))


### BREAKING CHANGES

* **react|redux:** The following modules were renamed:
- `ItemStatus` to `CheckoutOrderItemStatus`
- `arePaymentInstrumentsLoading` to `arePaymentIntentInstrumentsLoading`
- `getCheckoutDeliveryBundle` to `getCheckoutOrderDeliveryBundle`.
- `getCheckoutDeliveryBundleUpgrade` to `getCheckoutOrderDeliveryBundleUpgrade`
- `getCheckoutDeliveryBundleUpgrades` to `getCheckoutOrderDeliveryBundleUpgrades`
- `getCheckoutDeliveryBundleWindow` to `getCheckoutOrderDeliveryBundleWindow`
- `getCheckoutDeliveryBundles` to `getCheckoutOrderDeliveryBundles`
- `getCheckoutDeliveryBundlesIds` to `getCheckoutOrderDeliveryBundlesIds`
- `getCheckoutError` to `getCheckoutOrderError`
- `getCheckoutId` to `getCheckoutOrderId`
- `getCheckout` to `getCheckoutOrderResult`
- `getCheckoutOrderCollectPoints` to `getCollectPoints` (renamed back
to get `getCollectPoints` as it does not depend on the order).
- `getCheckoutSelectedDeliveryBundleId` to `getCheckoutOrderSelectedDeliveryBundleId`
- `getCheckoutShippingOptions` to `getCheckoutOrderShippingOptions`
- `getPaymentInstrument` to `getPaymentIntentInstrument`
- `getPaymentInstruments` to `getPaymentIntentInstruments`
- `getPaymentInstrumentsError` to `getPaymentIntentInstrumentsError`
- `getPaymentInstrumentsResult` to `getPaymentIntentInstrumentsResult`
- `isCheckoutLoading` to `isCheckoutOrderLoading`
- `resetPaymentInstrumentsState` to `resetPaymentIntentInstrumentsState`

The following checkout selectors were removed as they can be easily
replaced by looking at the checkout order
(returned by the getCheckoutOrder selector) directly:
- getCheckoutOrderItems
- getCheckoutOrderItemsIds

Removed `getCheckoutOrderCharge` selector as it
can be derived by the `isCheckoutOrderChargeLoading`,
`getCheckoutOrderChargeError`
 and `getCheckoutOrderChargeResult` selectors.





# [1.0.0-next.345](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.344...@farfetch/blackout-redux@1.0.0-next.345) (2022-12-07)


### Features

* **react|redux:** add getProductDenormalized selector ([1ea953b](https://github.com/Farfetch/blackout/commit/1ea953b5bd6f180eba1b5d5f3bb552492649716c))





# [1.0.0-next.344](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.343...@farfetch/blackout-redux@1.0.0-next.344) (2022-12-06)


### Features

* **react|redux:** improve order and returns hooks ([28b1aaf](https://github.com/Farfetch/blackout/commit/28b1aaf155ad1cdcb27fa4ea1fe4c869911acf9e))
* **react:** add returns hooks ([cd7738e](https://github.com/Farfetch/blackout/commit/cd7738e3fd918887dab00b77005e125b38b0c7c5))
* **redux|react:** add pickup reschedule hooks ([b0087e8](https://github.com/Farfetch/blackout/commit/b0087e8753aec5a756bc5c26a4f23cd42d85059d))


### BREAKING CHANGES

* **react:** The following modules were renamed:
`getReturnPickupCapabilities` -> `getReturnPickupCapability` (client)
`areReturnPickupCapabilitiesLoading` -> `isReturnPickupCapabilityLoading`
`fetchReturnPickupCapabilities` -> `fetchReturnPickupCapability`
`fetchReturnPickupCapabilitiesFactory` -> `fetchReturnPickupCapabilityFactory`
`getReturnItemsEntity` -> `getReturnItemsEntities`
`getReturnPickupCapabilitiesError` -> `getReturnPickupCapabilityError`
`getReturnsEntity` -> `getReturnsEntities`

The following modules were removed as they are not necessary anymore:
`areReturnsLoading`
`getReturnId`
`getReturnItems`
`getReturnItemsIds`
`getReturnsError`
`getTimeSlots` (use now `getReturnPickupCapability` to get all data
instead of only getting the time slots)





# [1.0.0-next.343](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.342...@farfetch/blackout-redux@1.0.0-next.343) (2022-12-05)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.342](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.341...@farfetch/blackout-redux@1.0.0-next.342) (2022-12-02)


### Features

* **react:** add base components contents ([7a75bd4](https://github.com/Farfetch/blackout/commit/7a75bd428b7da18783ff4249aedeeef5ab55c96d))





# [1.0.0-next.341](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.340...@farfetch/blackout-redux@1.0.0-next.341) (2022-11-29)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.340](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.339...@farfetch/blackout-redux@1.0.0-next.340) (2022-11-28)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.339](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.338...@farfetch/blackout-redux@1.0.0-next.339) (2022-11-22)


### Bug Fixes

* **redux:** fix countrySourceCode in locale initial state ([56939f7](https://github.com/Farfetch/blackout/commit/56939f74572b8dd6f948d002b285afdcb41828e9))





# [1.0.0-next.338](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.337...@farfetch/blackout-redux@1.0.0-next.338) (2022-11-21)


### Bug Fixes

* **analytics|redux:** fix analytics' setUser middleware on logout action ([8b5484d](https://github.com/Farfetch/blackout/commit/8b5484d1afad48a427dee8e7586893c6b8d41bb3))





# [1.0.0-next.337](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.336...@farfetch/blackout-redux@1.0.0-next.337) (2022-11-16)


### Bug Fixes

* **redux:** fix bag reducer ([299fcb8](https://github.com/Farfetch/blackout/commit/299fcb84d92f2bee7d35fbb9c0d42a69dfa68589))





# [1.0.0-next.336](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.335...@farfetch/blackout-redux@1.0.0-next.336) (2022-11-11)


### chore

* **react|redux:** remove checkout hooks ([36702bf](https://github.com/Farfetch/blackout/commit/36702bf412755c7b2ec92fe86ad670e5df0ded61))


### BREAKING CHANGES

* **react|redux:** - `useCheckout` hook was removed from @farfetch/blackout-react package.
- `getCheckoutOrderOperation` and `fetchCheckoutOrderOperation` signatures
have changed to accept separate parameters for the checkoutOrderId and
operationId values instead of using an object.
- `getPaymentMethods` client was renamed to `getCheckoutOrderPaymentMethods`.
- `fetchPaymentMethods` action was renamed to `fetchCheckoutOrderPaymentMethods`.





# [1.0.0-next.335](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.334...@farfetch/blackout-redux@1.0.0-next.335) (2022-11-10)


### Features

* **client|redux:** create new client fetch Content Page ([41834cd](https://github.com/Farfetch/blackout/commit/41834cd6bf25cd3da7a7d37ca1209bd5ed554bde))





# [1.0.0-next.334](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.333...@farfetch/blackout-redux@1.0.0-next.334) (2022-11-08)


### Features

* **react|redux|client:** add content hooks ([5c398a4](https://github.com/Farfetch/blackout/commit/5c398a4e1adc84cf435a1a66280f4d27d232da17))


### BREAKING CHANGES

* **react|redux|client:** commerce pages client endpoint updated and content hooks refactored





# [1.0.0-next.333](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.332...@farfetch/blackout-redux@1.0.0-next.333) (2022-11-03)


### Features

* **analytics|react|redux:** add omnitracking's product updated events mappings ([0d8d626](https://github.com/Farfetch/blackout/commit/0d8d626da17f16f1fac370985e154c60287c4de4))
* **analytics|redux:** add omnitracking's bag events mappings next ([18ddc86](https://github.com/Farfetch/blackout/commit/18ddc8686be3bdf88fe601eabc9a9a15a94794f7))
* **react|redux:** change analytics dependencies on react and redux projects ([1a529ab](https://github.com/Farfetch/blackout/commit/1a529ab3fee464c0b3393bf5a4a5ad7fbe89a6b9))





# [1.0.0-next.332](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.331...@farfetch/blackout-redux@1.0.0-next.332) (2022-10-25)


### Features

* **react|redux|client:** refactor and add seo metadata hooks and utils ([95864db](https://github.com/Farfetch/blackout/commit/95864db4b65f62dab1b65206a0ec4a5e587329c6))





# [1.0.0-next.331](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.330...@farfetch/blackout-redux@1.0.0-next.331) (2022-10-25)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.330](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.329...@farfetch/blackout-redux@1.0.0-next.330) (2022-10-24)


### Bug Fixes

* fix TS errors on redux selectors ([35e3525](https://github.com/Farfetch/blackout/commit/35e35259e6855cbae662cdc98d29f9dbf72a9ef4))
* ts errors on redux selectors ([52ea54b](https://github.com/Farfetch/blackout/commit/52ea54bd8e970e57356b3255dc7a6f6d2d714669))





# [1.0.0-next.329](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.328...@farfetch/blackout-redux@1.0.0-next.329) (2022-10-24)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.328](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.327...@farfetch/blackout-redux@1.0.0-next.328) (2022-10-20)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.327](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.326...@farfetch/blackout-redux@1.0.0-next.327) (2022-10-20)


### Features

* **redux:** configurations actions ([4f5d89b](https://github.com/Farfetch/blackout/commit/4f5d89b563aeddb0176f1967f703412aa57dfe69))





# [1.0.0-next.326](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.325...@farfetch/blackout-redux@1.0.0-next.326) (2022-10-18)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.325](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.324...@farfetch/blackout-redux@1.0.0-next.325) (2022-10-17)


### Features

* add useRecentlyViewedProducts hook ([702f311](https://github.com/Farfetch/blackout/commit/702f311c3d10e3557577c9436eb082b86e93d4fc))





# [1.0.0-next.324](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.323...@farfetch/blackout-redux@1.0.0-next.324) (2022-10-13)


### Bug Fixes

* **client|redux:** fix content redux exports ([690ec18](https://github.com/Farfetch/blackout/commit/690ec187aa982717a4f0cbee08b6658b69151fd8))





# [1.0.0-next.323](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.322...@farfetch/blackout-redux@1.0.0-next.323) (2022-10-07)


### Bug Fixes

* **redux:** fix reducers cleanup actions ([1a7d768](https://github.com/Farfetch/blackout/commit/1a7d7686904caf9b34b42e132dd8215dec3836fb))


### BREAKING CHANGES

* **redux:** - `resetCheckoutState` action was
renamed to `resetCheckout`.
- `resetReturn` action was renamed to `resetReturns`.
- `resetOrderDetailsState` now accepts an array of orderIds instead of
a single orderId to allow multiple resets at the same time.





# [1.0.0-next.322](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.321...@farfetch/blackout-redux@1.0.0-next.322) (2022-10-07)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.321](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.320...@farfetch/blackout-redux@1.0.0-next.321) (2022-10-06)


### Bug Fixes

* **client|react|redux:** refactor grouping and groupingProperties reducers and fix selectors ([d4f7d59](https://github.com/Farfetch/blackout/commit/d4f7d5963cb433a0f0c29c879d3f51ae93ca9c91))


### Features

* **client|react|redux:** add useProductGrouping and useProductGroupingProperties hooks ([d21352e](https://github.com/Farfetch/blackout/commit/d21352ef4f22877b37147daadd63b9a363587dd6))





# [1.0.0-next.320](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.319...@farfetch/blackout-redux@1.0.0-next.320) (2022-10-04)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.319](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.318...@farfetch/blackout-redux@1.0.0-next.319) (2022-09-29)


### Features

* **redux|client|react:** add brands hooks ([667cb69](https://github.com/Farfetch/blackout/commit/667cb69c3cdf38ae2a7354212c52a3b19f36c6f6))





# [1.0.0-next.318](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.317...@farfetch/blackout-redux@1.0.0-next.318) (2022-09-28)


### Features

* **redux|client|react:** add categories hooks ([e708dc4](https://github.com/Farfetch/blackout/commit/e708dc4f60e13bcf915b1d79993b0332e8d1ecfc))





# [1.0.0-next.317](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.316...@farfetch/blackout-redux@1.0.0-next.317) (2022-09-22)


### Features

* **react|redux|client:** add subscriptions hooks ([f03d4f2](https://github.com/Farfetch/blackout/commit/f03d4f2349ff5ec83d7135cf82237b4b27cd8a50))


### BREAKING CHANGES

* **react|redux|client:** Subscriptions reducer refactor





# [1.0.0-next.316](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.315...@farfetch/blackout-redux@1.0.0-next.316) (2022-09-22)


### Bug Fixes

* **redux:** fix resetProductsLists action ([c895a22](https://github.com/Farfetch/blackout/commit/c895a220d2f1d39dc02c792225c68c23e228f434))





# [1.0.0-next.315](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.314...@farfetch/blackout-redux@1.0.0-next.315) (2022-09-21)


### Bug Fixes

* **redux:** fix TS erros on redux reducers unit tests ([d6acf84](https://github.com/Farfetch/blackout/commit/d6acf8442c63412b06c574b68d076168b83f52b2))





# [1.0.0-next.314](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.313...@farfetch/blackout-redux@1.0.0-next.314) (2022-09-15)


### Bug Fixes

* **redux:** update getProductsListProducts selector to return brand data ([03bf002](https://github.com/Farfetch/blackout/commit/03bf002240fb8bd0bcebd2c867cdda44fb4aee4b))





# [1.0.0-next.313](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.312...@farfetch/blackout-redux@1.0.0-next.313) (2022-09-09)


### Bug Fixes

* **redux:** fix TS errors on redux actions unit tests ([2005870](https://github.com/Farfetch/blackout/commit/2005870a5e087cdade3fe6bb3cef9643c6a59db2))





# [1.0.0-next.312](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.311...@farfetch/blackout-redux@1.0.0-next.312) (2022-09-09)


### Bug Fixes

* **redux|client|react:** add search hooks ([828a0b4](https://github.com/Farfetch/blackout/commit/828a0b4016058efc1d4328da53968cb00d25eff7))


### BREAKING CHANGES

* **redux|client|react:** Search reducers refactor





# [1.0.0-next.311](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.310...@farfetch/blackout-redux@1.0.0-next.311) (2022-09-09)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.310](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.309...@farfetch/blackout-redux@1.0.0-next.310) (2022-09-08)


### Features

* **react:** add orders hooks ([06d39e7](https://github.com/Farfetch/blackout/commit/06d39e749e81cd512d50510f3ea3e06ab69b714b))


### BREAKING CHANGES

* **react:** The selectors `isOrdersListLoading` and
`getOrdersListError` were removed and replaced with the selectors
`areOrdersLoading` and `getOrdersError`.
The orders reducer was now changed as well and not it
will only change its root slice `isLoading` and `error` values only
when the fetchUserOrders and fetchGuestOrders actions are used.





# [1.0.0-next.309](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.308...@farfetch/blackout-redux@1.0.0-next.309) (2022-09-07)


### Bug Fixes

* **redux|client:** fix checkout and payments types ([63bf09f](https://github.com/Farfetch/blackout/commit/63bf09f578875be792b3404ade5be66b6151d6fc))





# [1.0.0-next.308](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.307...@farfetch/blackout-redux@1.0.0-next.308) (2022-09-02)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.307](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.306...@farfetch/blackout-redux@1.0.0-next.307) (2022-09-02)


### Bug Fixes

* **client|redux|react:** orders area fixes ([c5db8bc](https://github.com/Farfetch/blackout/commit/c5db8bcf1adbf3977c7c99e1c4a3afbd45265ec2))


### BREAKING CHANGES

* **client|redux|react:** The following exports were renamed:
- OrderStatus -> MerchantOrderStatus
- deleteRecipientFromTopic -> deleteSubscriptionTopicRecipient
- getOrders -> getUserOrders
- getUserCredit (client) -> getUserCredits
- clearAllUnsubscribeRecipientFromTopic -> clearAllUnsubscribeSubscriptionTopicRecipientRequests
- clearUnsubscribeRecipientFromTopic -> clearUnsubscribeSubscriptionTopicRecipientRequest
- fetchListing -> fetchProductListing
- fetchListingFactory -> fetchProductListingFactory
- fetchOrders -> fetchUserOrders
- fetchOrdersFactory -> fetchUserOrdersFactory
- fetchSet -> fetchProductSet
- fetchSetFactory -> fetchProductSetFactory
- fetchUserCredit -> fetchUserCredits
- getMerchantsFromOrder -> getOrderMerchants
- getReturnOptionsFromOrder -> getOrderReturnOptions
- getUserCredit (selector) -> getUserCredits
- unsubscribeFromSubscription -> unsubscribeSubscription
- unsubscribeFromSubscriptionFactory -> unsubscribeSubscriptionFactory
- unsubscribeRecipientFromTopic -> unsubscribeSubscriptionTopicRecipient
- unsubscribeRecipientFromTopicFactory -> unsubscribeSubscriptionTopicRecipientFactory





# [1.0.0-next.306](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.305...@farfetch/blackout-redux@1.0.0-next.306) (2022-08-30)


### Features

* **react:** add usePaymentTokens hook ([9deba6f](https://github.com/Farfetch/blackout/commit/9deba6fc9bd3e8b841b427028c057b51ab70718e))





# [1.0.0-next.305](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.304...@farfetch/blackout-redux@1.0.0-next.305) (2022-08-25)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.304](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.303...@farfetch/blackout-redux@1.0.0-next.304) (2022-08-24)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.303](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.302...@farfetch/blackout-redux@1.0.0-next.303) (2022-08-23)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.302](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.301...@farfetch/blackout-redux@1.0.0-next.302) (2022-08-23)


### Bug Fixes

* **client|react|redux:** rename locale selectors and action ([78cf7e3](https://github.com/Farfetch/blackout/commit/78cf7e3fbd16554376cca25010c0343b4441194f))


### BREAKING CHANGES

* **client|react|redux:** The following action was renamed:
fetchCountryCities -> fetchCountryStateCities

The following selectors were renamed:
getCountryCitiesError -> getCountryStateCitiesError
areCountryCitiesLoading -> areCountryStateCitiesLoading
getCountryCities -> getCountryStateCities
areCountryCitiesFetched -> areCountryStateCitiesFetched





# [1.0.0-next.301](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.300...@farfetch/blackout-redux@1.0.0-next.301) (2022-08-22)


### Bug Fixes

* **client:** fix client unit tests TS errors ([f68da8c](https://github.com/Farfetch/blackout/commit/f68da8c55bc3f7bf932d671644b54f08a2c1cffe))





# [1.0.0-next.300](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.299...@farfetch/blackout-redux@1.0.0-next.300) (2022-08-16)


### Features

* **react:** add user addresses hooks ([a1c8427](https://github.com/Farfetch/blackout/commit/a1c84270c3ca13455300e7b27eecd769830c4215))





# [1.0.0-next.299](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.298...@farfetch/blackout-redux@1.0.0-next.299) (2022-08-16)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.298](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.297...@farfetch/blackout-redux@1.0.0-next.298) (2022-08-12)


### chore

* **redux:** move entity selectors from entities folder ([34fdf43](https://github.com/Farfetch/blackout/commit/34fdf434599758885cfd1609aa04f8d869428ae9))


### BREAKING CHANGES

* **redux:** All entity selectors must now be imported from its
respective area instead of being import from the `entities` folder.





# [1.0.0-next.297](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.296...@farfetch/blackout-redux@1.0.0-next.297) (2022-08-12)


### Bug Fixes

* **redux|react:** rename checkout actions and selectors ([2e8a913](https://github.com/Farfetch/blackout/commit/2e8a91359c33704131ba1a3a37c6f272e41f9e4b))


### BREAKING CHANGES

* **redux|react:** The following actions were renamed:

createCheckout -> createCheckoutOrder
fetchCheckout -> fetchCheckoutOrder
fetchCheckoutDetails -> fetchCheckoutOrderDetails
fetchDeliveryBundleUpgrades -> fetchCheckoutOrderDeliveryBundleUpgrades
fetchItemDeliveryProvisioning -> fetchCheckoutOrderDeliveryBundleProvisioning
fetchUpgradeItemDeliveryProvisioning -> fetchCheckoutOrderDeliveryBundleUpgradeProvisioning
setItemTags -> setCheckoutOrderItemTags
setPromocode -> setCheckoutOrderPromocode
setTags -> setCheckoutOrderTags
updateCheckout -> updateCheckoutOrder
updateDeliveryBundleUpgrades -> updateCheckoutOrderDeliveryBundleUpgrades
updateGiftMessage -> updateCheckoutOrderItems

The following selectors were renamed:
`getCheckoutDetail` -> `getCheckoutOrderDetails`
`getCheckoutCollectPointEstimatedDeliveryPeriod` ->
 `getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod`
`areCheckoutDetailsLoading` -> `areCheckoutOrderDetailsLoading`
`getCheckoutDetailsError` -> `getCheckoutOrderDetailsError`
`isItemTagsLoading` -> `areCheckoutOrderItemTagsLoading`
`getItemTagsError` -> `getCheckoutOrderItemTagsError`
`isPromoCodeLoading` -> `isCheckoutOrderPromocodeLoading`
`getPromoCodeError` -> `getCheckoutOrderPromocodeError`
`isTagsLoading` -> `areCheckoutOrderTagsLoading`
`getTagsError` -> `getCheckoutOrderTagsError`
`isGiftMessageLoading` -> `areCheckoutOrderItemsUpdating`
`getGiftMessageError` -> `getCheckoutOrderItemsUpdateError`
`areDeliveryBundleUpgradesLoading` ->
 `areCheckoutOrderDeliveryBundleUpgradesLoading`
`getDeliveryBundleUpgradesError` ->
`getCheckoutOrderDeliveryBundleUpgradesError`
`isItemDeliveryProvisioningLoading` ->
`isCheckoutOrderDeliveryBundleProvisioningLoading`
`getItemDeliveryProvisioningError` ->
`getCheckoutOrderDeliveryBundleProvisioningError`
`isUpgradeItemDeliveryProvisioningLoading` ->
`isCheckoutOrderDeliveryBundleUpgradeProvisioningLoading`
`getUpgradeItemDeliveryProvisioningError` ->
`getCheckoutOrderDeliveryBundleUpgradeProvisioningError`
`getBundleDeliveryWindow` -> `getCheckoutDeliveryBundleWindow`
`isOperationLoading` -> `isCheckoutOrderOperationLoading`
`getOperationError` ->  `getCheckoutOrderOperationError`
`isOperationsLoading` -> `areCheckoutOrderOperationsLoading`
`getOperationsError` -> `getCheckoutOrderOperationsError`
`getOperationsPagination` -> `getCheckoutOrderOperationsPagination`
`isProgramsLoading` -> `areProgramsLoading`
`getMembership` -> `getProgramMembership`
`getMembershipError` -> `getProgramMembershipError`
`getMembershipResult` -> `getProgramMembershipResult`
`isMembershipLoading` -> `isProgramMembershipLoading`
`getReplacements` -> `getProgramMembershipReplacements`
`getReplacementsError` -> `getProgramMembershipReplacementsError`
`getReplacementsResult` -> `getProgramMembershipReplacementsResult`
`isReplacementsLoading` -> `areProgramMembershipReplacementsLoading`
`getConverts` -> `getProgramMembershipConverts`
`getConvertsError` -> `getProgramMembershipConvertsError`
`getConvertsResult` -> `getProgramMembershipConvertsResult`
`isConvertsLoading` -> `areProgramMembershipConvertsLoading`
`getStatements` -> `getProgramMembershipStatements`
`getStatementsError` -> `getProgramMembershipStatementsError`
`getStatementsResult` -> `getProgramMembershipStatementsResult`
`isStatementsLoading` -> `areProgramMembershipStatementsLoading`
`isReturnsLoading` -> `areReturnsLoading`
`isPickupCapabilitiesLoading` -> `areReturnPickupCapabilitiesLoading`
`getPickupCapabilitiesError` -> `getReturnPickupCapabilitiesError`
`isUserSubscriptionsLoading` -> `areUserSubscriptionsLoading`
`isUserDefaultAddressDetailsLoading` ->
`areUserDefaultAddressDetailsLoading`





# [1.0.0-next.296](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.295...@farfetch/blackout-redux@1.0.0-next.296) (2022-08-12)


### Bug Fixes

* **redux:** add productImgQueryParam to checkout order items ([a8cbf1b](https://github.com/Farfetch/blackout/commit/a8cbf1bc5e8264caba57f8e62198e77261c1f68f))





# [1.0.0-next.295](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.294...@farfetch/blackout-redux@1.0.0-next.295) (2022-08-11)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.294](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.293...@farfetch/blackout-redux@1.0.0-next.294) (2022-08-10)


### Bug Fixes

* **redux:** fix buildBagItem ([20e9cd0](https://github.com/Farfetch/blackout/commit/20e9cd03d08f874bdd15c0f8578839514735c326))





# [1.0.0-next.293](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.292...@farfetch/blackout-redux@1.0.0-next.293) (2022-08-10)


### Features

* **react:** add useProductSizeGuides hook ([1b1d7f9](https://github.com/Farfetch/blackout/commit/1b1d7f9d07632a620bc03c372e15a00940c9e0da))





# [1.0.0-next.292](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.291...@farfetch/blackout-redux@1.0.0-next.292) (2022-08-09)


### Features

* **react:** add locale hooks ([8e62032](https://github.com/Farfetch/blackout/commit/8e62032ada0d4e0d9ccf194219d3565bc868c5bc))


### BREAKING CHANGES

* **react:** locale selectors moved from entities folder to locale folder





# [1.0.0-next.291](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.290...@farfetch/blackout-redux@1.0.0-next.291) (2022-08-05)


### Bug Fixes

* change getCountries client ([2f1519a](https://github.com/Farfetch/blackout/commit/2f1519ab8319b434e35241ca5afb06a9575f1c9e))
* remove getProductColorGrouping client ([95d9cac](https://github.com/Farfetch/blackout/commit/95d9cac6aea2e750fcdf1be3467e7b64c4bd61d9))


### BREAKING CHANGES

* The getCountries client now does not return a paginated
response and does not accept any query parameters. The result is
an array of all the countries available.





# [1.0.0-next.290](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.289...@farfetch/blackout-redux@1.0.0-next.290) (2022-08-05)


### Features

* **redux:** add pagination to commerce pages structure response ([0a67a6e](https://github.com/Farfetch/blackout/commit/0a67a6ea2af372d57b46057a44aee2d182dff4ae))





# [1.0.0-next.289](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.288...@farfetch/blackout-redux@1.0.0-next.289) (2022-08-04)


### chore

* **client|redux:** rename orders files ([43cd3dd](https://github.com/Farfetch/blackout/commit/43cd3dd3e519d5788ee009faf6cfd8a019c2da35))


### BREAKING CHANGES

* **client|redux:** - The following files from client package were moved and renamed:client was moved
from the returns area to orders area. Update your imports accordingly:
  - The 'returns/getReturnsFromOrder' client was moved and renamed to 'orders/getOrderReturns'
  - The 'orders/getTrackings' client was renamed to 'orders/getShipmentTrackings'
  - The 'orders/getOrderDetails' client was renamed to 'orders/getOrder'

- The following selectors from redux package were renamed:
  - The 'orders/isTrackingsLoading' was renamed to 'orders/areShipmentTrackingsLoading'
  - The 'orders/isOrdersLoading' was renamed to 'orders/areOrdersLoading'
  - The 'orders/isOrderDetailsLoading' was renamed to 'orders/areOrderDetailsLoading'
  - The 'orders/isDocumentsLoading' was renamed to 'orders/areDocumentsLoading'
  - The 'orders/isAvailableItemsActivitiesLoading' was renamed to
  'orders/areAvailableItemsActivitiesLoading'
  - The 'orders/isOrderItemAvailableActivitiesLoading' was renamed to
  'orders/areOrderItemAvailableActivitiesLoading'

- Some Action types for the order returns were also renamed.
Update them in case you use them in any custom reducer/middleware:
```js
import { actionTypes } from "@farfetch/blackout-redux/returns";

// Previously
actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE;
actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST;
actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS;

// Change to
actionTypes.FETCH_ORDER_RETURNS_FAILURE;
actionTypes.FETCH_ORDER_RETURNS_REQUEST;
actionTypes.FETCH_ORDER_RETURNS_SUCCESS;
```





# [1.0.0-next.288](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.287...@farfetch/blackout-redux@1.0.0-next.288) (2022-08-03)


### Bug Fixes

* **redux|react:** fix fetched selectors ([810177e](https://github.com/Farfetch/blackout/commit/810177e171170a0a253e334fba2dec5e230bd398))





# [1.0.0-next.287](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.286...@farfetch/blackout-redux@1.0.0-next.287) (2022-08-03)


### Features

* allow partial product details state reset ([10e78ac](https://github.com/Farfetch/blackout/commit/10e78acebf3af02cfa1bf02ea467383e335aca4d))





# [1.0.0-next.286](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.285...@farfetch/blackout-redux@1.0.0-next.286) (2022-08-02)


### chore

* **client|react:** remove authentication interceptor ([3247708](https://github.com/Farfetch/blackout/commit/32477087c91d9b8673b7799a74b51154c0b46c62))


### BREAKING CHANGES

* **client|react:** Authentication interceptor is now removed from both
client and react packages as it only makes sense for native apps.





# [1.0.0-next.285](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.284...@farfetch/blackout-redux@1.0.0-next.285) (2022-08-01)

**Note:** Version bump only for package @farfetch/blackout-redux





# [1.0.0-next.284](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.283...@farfetch/blackout-redux@1.0.0-next.284) (2022-08-01)


### Bug Fixes

* **redux:** add reducer and selectors to personal ids ([94f1f52](https://github.com/Farfetch/blackout/commit/94f1f5289e47894e42f98c21d7be11785cf91b94))





# [1.0.0-next.283](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.282...@farfetch/blackout-redux@1.0.0-next.283) (2022-07-29)


### Bug Fixes

* **redux:** update keys on locale serverInitialState ([3c0b46b](https://github.com/Farfetch/blackout/commit/3c0b46b2d1c044a8bfd517f364878158c44dad8a))





# [1.0.0-next.282](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.281...@farfetch/blackout-redux@1.0.0-next.282) (2022-07-29)


### chore

* rename `postRegister` client ([902a601](https://github.com/Farfetch/blackout/commit/902a601ed2b746c9c78b9809e02be87c5dd7d209))


### BREAKING CHANGES

* `postRegister` client is now `postUser`.





# [1.0.0-next.281](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.280...@farfetch/blackout-redux@1.0.0-next.281) (2022-07-29)


### Features

* add support for metadata ([442f0d4](https://github.com/Farfetch/blackout/commit/442f0d4a951e44dc21523a8da6a04a368411d4a0))
* **react:** refactor useBag and useBagItem hooks ([037a364](https://github.com/Farfetch/blackout/commit/037a364dafb820dff79c5261a1d45a900e325b72))


### BREAKING CHANGES

* **react:** useBag and useBagItem hooks new interface





# [1.0.0-next.280](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.279...@farfetch/blackout-redux@1.0.0-next.280) (2022-07-28)


### Bug Fixes

* fix user typings ([1d96701](https://github.com/Farfetch/blackout/commit/1d967010909cc0d8061e6e194f48edef89d7d765))





# [1.0.0-next.279](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.278...@farfetch/blackout-redux@1.0.0-next.279) (2022-07-27)


### Bug Fixes

* **client|redux|redux:** fix account areas imports and exports ([e80b833](https://github.com/Farfetch/blackout/commit/e80b833a51f8f658ede1591da56589f863dd02a5))
* fix `useAction` hook type ([288c0e6](https://github.com/Farfetch/blackout/commit/288c0e6903fab00b103694749ca684d0253c0511))


### Features

* add support for passing metadata in wishlist and bag items actions ([167c2a2](https://github.com/Farfetch/blackout/commit/167c2a22944328c9aab097996255e7321ea412e7))
* implement next version ([9995600](https://github.com/Farfetch/blackout/commit/9995600a4620aa09e18c07ebaa0d4058fe70abb1))
* **react:** refactor useWishlist and useWishlistItem hooks ([89813a4](https://github.com/Farfetch/blackout/commit/89813a453e66e0e62450d5662d88aac6d3a07b76))


### BREAKING CHANGES

* **react:** useWishlist and useWishlistItem hooks new interface
* Many renames of actions and clients, as well as redux store
layout were implemented and will be described in a new migration file which
will be authored later.





# [1.0.0-next.278](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-redux@1.0.0-next.277...@farfetch/blackout-redux@1.0.0-next.278) (2022-07-15)

**Note:** Version bump only for package @farfetch/blackout-redux





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
