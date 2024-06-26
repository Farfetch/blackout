# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.19.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.19.0...@farfetch/blackout-client@2.19.1) (2024-04-03)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.19.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.18.0...@farfetch/blackout-client@2.19.0) (2024-02-14)

### Features

- **client:** add packaging options client ([51658d6](https://github.com/Farfetch/blackout/commit/51658d6c4a6579942bc1aa1da13ae5c450e6b17d))

# [2.18.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.17.1...@farfetch/blackout-client@2.18.0) (2024-01-16)

### Features

- expose missing address endpoints ([7c37f1b](https://github.com/Farfetch/blackout/commit/7c37f1b5e505131fc4b165888825d451f913c702))

## [2.17.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.17.0...@farfetch/blackout-client@2.17.1) (2024-01-15)

### Bug Fixes

- fix `productsList` schema ([c9e0f50](https://github.com/Farfetch/blackout/commit/c9e0f50d0b1203c20da7ecfcd77278c211197a05))

# [2.17.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.16.1...@farfetch/blackout-client@2.17.0) (2024-01-09)

### Features

- **client:** draft orders endpoints ([3a50465](https://github.com/Farfetch/blackout/commit/3a504655bd1e320bdecff9725cb5415b66d2f2ce))

## [2.16.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.16.0...@farfetch/blackout-client@2.16.1) (2023-12-15)

### Bug Fixes

- **client|redux:** account settings type and reducer export ([685f64e](https://github.com/Farfetch/blackout/commit/685f64e7dacc40f6a60947834366e6ba0b003754))

# [2.16.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.15.1...@farfetch/blackout-client@2.16.0) (2023-12-12)

### Features

- **client|redux:** add settings endpoints ([043c9a9](https://github.com/Farfetch/blackout/commit/043c9a9226b1d3cf727bfc4bf0d1d392bbfe4f83))

## [2.15.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.15.0...@farfetch/blackout-client@2.15.1) (2023-12-05)

### Bug Fixes

- fix `getProductListingFacetGroups` selector ([6f19eca](https://github.com/Farfetch/blackout/commit/6f19ecaa51f88d1ebeea2f3d83f262e159b0f523))

# [2.15.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.14.3...@farfetch/blackout-client@2.15.0) (2023-11-21)

### Bug Fixes

- save exchanges filters by id ([e1959ba](https://github.com/Farfetch/blackout/commit/e1959bac6eefb6405d9e623d38b2f7a698e21c07))

### BREAKING CHANGES

- - Exchange filters are now stored under entities by orderItemUuid (shippingOrderLineId).
    Previously the user wasn't able to fetch multiple filters because each request cleared
    the previous data, which this PR aims to fix.

* useCreateExchangeFilter hook renamed to useExchangeFilters.
* isCreating selector from the hook, renamed to isLoading.

## [2.14.3](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.14.2...@farfetch/blackout-client@2.14.3) (2023-11-15)

### Bug Fixes

- add segments and benefits targets to commerce pages fetch ([3616f28](https://github.com/Farfetch/blackout/commit/3616f2871bbbf1091f048f813ca0c9e11298f63a))
- fix `productsList` schema handling of `filterSegments` ([14e1652](https://github.com/Farfetch/blackout/commit/14e1652c7ba0b538f4199c75bc55df8f46477e3a))

## [2.14.2](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.14.0...@farfetch/blackout-client@2.14.2) (2023-11-08)

**Note:** Version bump only for package @farfetch/blackout-client

## [2.14.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.14.0...@farfetch/blackout-client@2.14.1) (2023-11-08)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.14.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.13.0...@farfetch/blackout-client@2.14.0) (2023-09-19)

### Features

- **client:** add checkout session tags endpoints ([92c08f9](https://github.com/Farfetch/blackout/commit/92c08f93ac3acf131985f29a72b4a6cb1cc9d6ae))
- **client:** put checkoutSessions promocodes ([6a85c0b](https://github.com/Farfetch/blackout/commit/6a85c0bba61d79cc4faaeca8435606b5c4d9bbfd))
- **client:** update payment installments types ([7f99817](https://github.com/Farfetch/blackout/commit/7f99817a68ffe206fa1bb3e574dfa8082a8c1740))

# [2.13.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.12.1...@farfetch/blackout-client@2.13.0) (2023-09-13)

### Bug Fixes

- fix social login and account link endpoint paths ([5149c44](https://github.com/Farfetch/blackout/commit/5149c44318ba6089dc24347059f02255ce436861))

### Features

- **client|redux:** expose closet endpoints ([9653a5f](https://github.com/Farfetch/blackout/commit/9653a5fe580acbab9c3098887a311c75ba7d70ba))
- **client:** add delivery bundles endpoints ([c0d1c5b](https://github.com/Farfetch/blackout/commit/c0d1c5b45dbd7ec82940bb5907601aebdf0ccee5))

## [2.12.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.12.0...@farfetch/blackout-client@2.12.1) (2023-09-07)

### Bug Fixes

- content metadata type ([59e3ef5](https://github.com/Farfetch/blackout/commit/59e3ef5452cb6560e8fdadc11d4ba25c246cf8a5))
- fix user addresses put requests ([c61b02f](https://github.com/Farfetch/blackout/commit/c61b02f208dd0748e73eddc96dcf72eea84ab614))

# [2.12.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.11.0...@farfetch/blackout-client@2.12.0) (2023-08-28)

### Features

- add delete promocode endpoint ([5ccde47](https://github.com/Farfetch/blackout/commit/5ccde47bb74253d51da04d5beb8ac39dcd6d0fe7))

# [2.11.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.10.0...@farfetch/blackout-client@2.11.0) (2023-08-17)

### Features

- **client:** add checkout session patch ([c21feed](https://github.com/Farfetch/blackout/commit/c21feed31fcd522dcb78a4b402f21ff986313fae))

# [2.10.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.9.0...@farfetch/blackout-client@2.10.0) (2023-08-08)

### Bug Fixes

- checkout session types ([9e93ecc](https://github.com/Farfetch/blackout/commit/9e93ecc939649d7b501cdf14f3f9eb969e17efdc))

### Features

- add bagId property to postCheckoutSession body ([50dfe83](https://github.com/Farfetch/blackout/commit/50dfe8357d56aeb803eb8fd41802673d8c078a94))

# [2.9.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.8.0...@farfetch/blackout-client@2.9.0) (2023-08-03)

### Features

- add postApplePaySession client ([156483b](https://github.com/Farfetch/blackout/commit/156483b99efe2f5edbb2546ae6881d95bb019897))

# [2.8.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.7.1...@farfetch/blackout-client@2.8.0) (2023-08-02)

### Features

- **client:** add social login endpoints ([03283de](https://github.com/Farfetch/blackout/commit/03283de3b765035c6788764172725c35cf71f42c))

## [2.7.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.7.0...@farfetch/blackout-client@2.7.1) (2023-07-25)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.7.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.6.1...@farfetch/blackout-client@2.7.0) (2023-07-25)

### Features

- setup product listing facets redux structure ([3d759ce](https://github.com/Farfetch/blackout/commit/3d759ced9902d5dec89e166e7bc8e7282b770821))

## [2.6.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.6.0...@farfetch/blackout-client@2.6.1) (2023-07-17)

### Bug Fixes

- fix recommended product sets slice name ([7003e4f](https://github.com/Farfetch/blackout/commit/7003e4fe23bf245a9f5366ea22e00c94c7f67218))

# [2.6.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.5.1...@farfetch/blackout-client@2.6.0) (2023-07-13)

### Bug Fixes

- fix types ([8ee62ae](https://github.com/Farfetch/blackout/commit/8ee62aed175b371d1914b9899d6226b92d3d1fd3))

### Features

- add postPaymentSession client ([178789f](https://github.com/Farfetch/blackout/commit/178789f0da1872adabe16013a705c4b2e422b0dd))

## [2.5.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.5.0...@farfetch/blackout-client@2.5.1) (2023-07-06)

### Bug Fixes

- **client:** add isExchangeAvailable to orderItem property ([77f2b93](https://github.com/Farfetch/blackout/commit/77f2b931af24d6d56fc51bdd3901e1f955f591e4))

# [2.5.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.4.0...@farfetch/blackout-client@2.5.0) (2023-06-21)

### Bug Fixes

- add promocodes prop in bag types ([b8eb870](https://github.com/Farfetch/blackout/commit/b8eb87067938d829948c5faae120c80e50577f53))

### Features

- **client:** add new themes endpoint ([acc3e69](https://github.com/Farfetch/blackout/commit/acc3e69c3474a020672e0456288a50564cb8f145))
- **react:** add exchanges hooks ([15db4fc](https://github.com/Farfetch/blackout/commit/15db4fc23938581a7aba2e813fc7cecb4b0cccde))
- **redux:** add redux for themes ([ab0f5b7](https://github.com/Farfetch/blackout/commit/ab0f5b7af73537171dbd6b9ff8134fe38f56a8fa))

# [2.4.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.3.1...@farfetch/blackout-client@2.4.0) (2023-06-14)

### Features

- checkout payment capture upon shipment ([4647dad](https://github.com/Farfetch/blackout/commit/4647dadcb06af015bd2c612fb5e254c400fa6f3f))
- **client:** add filters property to exchange filters ([bce3089](https://github.com/Farfetch/blackout/commit/bce308908e875f0daf2ca73a4870c9c7c7b3156c))

## [2.3.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.3.0...@farfetch/blackout-client@2.3.1) (2023-06-06)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.3.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.2.1...@farfetch/blackout-client@2.3.0) (2023-06-06)

### Features

- add historical orders properties ([c5a5516](https://github.com/Farfetch/blackout/commit/c5a551629db0620c54dca36d6f3be5506c1c5974))
- **client:** add checkoutSessions clients ([5df29b4](https://github.com/Farfetch/blackout/commit/5df29b49ccc8e75391b10aeb9b7521d54af4e1d3))

## [2.2.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.2.0...@farfetch/blackout-client@2.2.1) (2023-05-30)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.2.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.1.0...@farfetch/blackout-client@2.2.0) (2023-05-23)

### Features

- **client:** add backorder types to order item ([009cda6](https://github.com/Farfetch/blackout/commit/009cda6a4c0a332d8cfab6a376be57a96798ee13))

# [2.1.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0...@farfetch/blackout-client@2.1.0) (2023-05-19)

### Features

- add checkoutOrder context endpoint ([3e77b7c](https://github.com/Farfetch/blackout/commit/3e77b7cb8755b06d9225512d5c8de909eb571d36))

# [2.0.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.259...@farfetch/blackout-client@2.0.0) (2023-05-18)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.259](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.258...@farfetch/blackout-client@2.0.0-next.259) (2023-05-17)

### Bug Fixes

- add consistency fixes ([67724fc](https://github.com/Farfetch/blackout/commit/67724fcb2d8493a46c82f96572ee6093bd045dca))
- **client|redux:** type fixes ([4d9e537](https://github.com/Farfetch/blackout/commit/4d9e537c4acce15caecf638c69567184cf02ebff))
- fix useWishlistSets hook ([9251d66](https://github.com/Farfetch/blackout/commit/9251d6699b36274cb7df7935048b0eb9e52b8352))
- more consistency fixes ([622a6c0](https://github.com/Farfetch/blackout/commit/622a6c00b4691a864d253d05e200e2604e215c2b))

### chore

- change fetchCollectPoints action ([7025cdd](https://github.com/Farfetch/blackout/commit/7025cdde04d37f4e5cc60fb57fac59cc6b1ecfdd))
- change put checkout promocode client to support multiple promocodes ([16abc6a](https://github.com/Farfetch/blackout/commit/16abc6a99c42366e229cffe33ff4bb68e4119be4))
- more consistency changes ([5df13f3](https://github.com/Farfetch/blackout/commit/5df13f3035dd01310f7427ea61d449f28ff43329))
- more renames ([08f08c0](https://github.com/Farfetch/blackout/commit/08f08c05e29dc7085214fb6f34b4a3d2ac25f0a5))
- product selectors rename and more changes ([823298e](https://github.com/Farfetch/blackout/commit/823298eff2b9ece63f34f90e461edd1b10109d3c))
- rename `getProductRecommendedSet` client and its dependents ([7c0b74d](https://github.com/Farfetch/blackout/commit/7c0b74d9bdb67e43d4f6aa13c463fa6763d97aae))
- rename contents exports ([16695ba](https://github.com/Farfetch/blackout/commit/16695ba447efd503a034ba00e7c8e06344eca03d))
- rename token actions and selectors ([12237b3](https://github.com/Farfetch/blackout/commit/12237b3e0a2c036ee72aed772c545dee6d8d1f43))

### BREAKING CHANGES

- The following public exports were renamed:

`DeliveryWindowType` -> `CheckoutOrderDeliveryWindowType`
`getOrderItemProductQuantity` -> `getOrderProductQuantity`

- Actions that add/remove/update both bag items, wishlist items and
  wishlist sets now require that the bagId and wishlistId parameters
  respectively be passed explicitly.
  `useBag`, `useWishlist` and `useWishlistSets` actions now assume the
  user's bagId and wishlistId as the parameter to perform an operation
  on so it is not necessary to pass that parameter anymore.
- Check the message body of this commit to know the changes.
- - The following exports were renamed:
    `buildSubscriptionPackagesHash` -> `generateSubscriptionPackagesHash`
    `generateProductsListHash` -> `generateProductListingHash`
    `getProductsListActiveFilters` -> `getProductListingActiveFilters`
    `getProductsListBreadcrumbs` -> `getProductListingBreadcrumbs`
    `getProductsListError` -> `getProductListingError`
    `getProductsListFacetGroups` -> `getProductListingFacetGroups`
    `getProductsListFacetsByFacetGroupType` -> `getProductListingFacetsByFacetGroupType`
    `getProductsListFacetsGroupsByType` -> `getProductListingFacetsGroupsByType`
    `getProductsListHash` -> `getProductListingHash`
    `getProductsListPagination` -> `getProductListingPagination`
    `getProductsListProducts` -> `getProductListingProducts`
    `getProductsListProductsFromAllPages` -> `getProductListingProductsFromAllPages`
    `getProductsListProductsIds` -> `getProductListingProductsIds`
    `getProductsListResult` -> `getProductListingResult`
    `getProductsListSelectedFiltersCount` -> `getProductListingSelectedFiltersCount`
    `getProductsListSort` -> `getProductListingSort`
    `isProductsListCached` -> `isProductListingCached`
    `isProductsListFetched` -> `isProductListingFetched`
    `isProductsListHydrated` -> `isProductListingHydrated`
    `isProductsListLoading` -> `isProductListingLoading`

* The following exports were removed:
  `getBrandsHash` -> No need since the brands selectors now use the query
  as their parameter instead of a hash.
  `getSearchDidYouMeanQuery`, `getSearchIntentsQuery` and
  `getSearchSuggestionsQuery` -> removed as they are redundant since
  their selectors already specify the query now instead of a hash.

* The selectors from the
  following areas now receive a query parameter instead of
  a hash:

`searchSuggestions`
`productGrouping`
`productGroupingProperties`
`searchDidYouMean`
`searchIntents`
`subscriptionPackages`
`brands`

- `fetchBrands` action now does not clear the brands that are in store
  when the `useCache` parameter is set to `false`. Also the
  `setBrandsHash` parameter was removed since that functionality does
  not exist anymore.

- The hooks `useSearchIntents`, `useSearchSuggestions` and
  `useSearchDidYouMean` now expose the data directly on the `data`
  property instead of being wrapped in another object.

* The following exports were renamed:

`ENVIRONMENT_CODES` -> `ContentEnvironmentCode`
`getRankedCommercePage` -> `applyCommercePagesRankingStrategy`
`CommercePagesStrategy` -> `CommercePagesRankingStrategy`

- The following exports were renamed:
  `putCheckoutOrderPromocode` -> `putCheckoutOrderPromocodes`
  `setCheckoutOrderPromocode` -> `setCheckoutOrderPromocodes`
  `setCheckoutOrderPromocodeFactory` -> `setCheckoutOrderPromocodesFactory`
  `isCheckoutOrderPromocodeLoading` -> `areCheckoutOrderPromocodesLoading`
  `getCheckoutOrderPromocodeError` -> `getCheckoutOrderPromocodesError`
  `resetCheckoutOrderPromocodeState` -> `resetCheckoutOrderPromocodesState`
- The `fetchCollectPoints` action now does not
  require the `query` parameter.
  The following selectors to obtain state of collect points requests now requires
  the query
  parameter to match the query of the request:

* getCollectPoints
* areCollectPointsLoading
* getCollectPointsError
* areCollectPointsFetched

* The checkoutOrder returned by `getCheckoutOrder` selector now does
  not contain the collectPoints property.

- The following exports were renamed:

`getUserTokenError` -> `getTokenError`
`getUserTokenResult` -> `getTokenResult`
`isUserTokenLoading` -> `isTokenLoading`
`removeUserToken` -> `removeToken`
`removeUserTokenFactory` -> `removeTokenFactory`

- The following exports were renamed:
  `getProductRecommendedSet` to `getRecommendedProductSet`
  `fetchRecommendedSet` to `fetchRecommendedProductSet`
  `fetchRecommendedSetFactory` to `fetchRecommendedProductSetFactory`
  `getRecommendedSet` to `getRecommendedProductSet`
  `getRecommendedSetError` to `getRecommendedProductSetError`
  `isRecommendedSetFetched` to `isRecommendedProductSetFetched`
  `isRecommendedSetLoading` to `isRecommendedProductSetLoading`
  `FETCH_RECOMMENDED_SET_FAILURE` to `FETCH_RECOMMENDED_PRODUCT_SET_FAILURE`
  `FETCH_RECOMMENDED_SET_REQUEST` to `FETCH_RECOMMENDED_PRODUCT_SET_REQUEST`
  `FETCH_RECOMMENDED_SET_SUCCESS` to `FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS`
- `bagMiddleware` export was renamed to
  `bagsMiddleware`. Also all redux modules related to
  `returnPickupRequests` were removed. You will need to use the
  `useReturnPickupRescheduleRequests` and
  `useReturnPickupRescheduleRequest` hooks instead.
- - `useOrders` and `useReturns` were renamed to
    `useUserOrders` and `useUserReturns` respectively.

* `useBag`, `useBagItem`, `useWishlist`, `useWishlistItem`, `useUser`,
  `useWishlistSet`, `useWishlistSets` `useReturnPickupCapability`,
  `useReturnPickupRescheduleRequest`,
  `useReturnPickupRescheduleRequests`, `useReturn`, `useOrder`,
  `useOrderReturnOptions` and `useOrderReturns` have some changes in its
  public properties/actions. Check the description for more information.
* `putUserDefaultShippingAddress` and `putUserDefaultBillingAddress`
  signatures changed. Now, instead of receiving an object containing the
  userId and id properties, there is a specific parameter for both of
  those properties.
* `fetchContentPage` action and `useContentPage` hook now discard the
  query string from the `codes` in query when generating the hash.
* Type `BreadCrumb` used in product listings was renamed to
  `ProductsBreadcrumb`. Do not confuse with the type `Breadcrumb` (with
  lowercase c) which is to be used with contents modules.
* Type `PasswordValidationErrorsConstants` was replaced with
  `PasswordValidationErrors` type which is now an enum.

# [2.0.0-next.258](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.257...@farfetch/blackout-client@2.0.0-next.258) (2023-05-12)

### Bug Fixes

- remove `contentTypeCode` as required parameter ([f32f7c0](https://github.com/Farfetch/blackout/commit/f32f7c0116df3e0ec9f2af957ccd58b6d229e14a))

### BREAKING CHANGES

- `useContentType` hook is now called `useContents`
  and the `contentTypeCode` parameter was removed. You will need to pass
  the `contentTypeCode` property in the options parameter now.

# [2.0.0-next.257](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.256...@farfetch/blackout-client@2.0.0-next.257) (2023-05-12)

### Features

- implement and review both orders and returns area to integrate the order split and multiple returns flow ([22cd9f2](https://github.com/Farfetch/blackout/commit/22cd9f230c3612c8fd194570fb41ace20c75f2d8))

### BREAKING CHANGES

- - Removed the entities mapper specific fetch order logic to merge
    information since we no longer have merging issues.

* getOrder was reviewed
* getOrderReturns was migrated and reviewed on the returns area.
* getOrderMerchants was deleted and a new selector was born to replace it called
  `getOrderSummaries` that returns all the order summaries of a certain order id.
* getOrderItemsByMerchant was renamed to getOrderItemsBySummary and it now returns
  the order items of an order summary instead of splitting them by merchant.
* getOrderItemQuantity was reviewed to remove an unnecessary restriction
* getUserOrder is now normalising the date
* getOrderItems is now normalising the result
* getOrderItem is now normalising the result
* Tests were adapted and added to test the mentioned changes
* Removed the reset of the return options since they are already resetted when a
  new user is fetches or when a user logins. There is no use case to manually reset
  this data for a user.
* Revamped the returnOption schema to wrap around the entire object that contains
  sub returnOptions per type. The older schematisation implied that there was a
  need to reference each of the sub returnOption and there is none. Also the
  identifier of the this entity has been changed to be the `merchantOrderId` property
  so we can link it to the order items if needed.
* Removed the artificial merchant normalization.
* getOrderReturnOptions selector now returns a list of return options denormalized
  organised by `merchantOrderId` this id can be linked to order items.
* getReturnOption is now normalising the result. You now need to provide a
  `merchantOrderId` to fetch it.
* fetchOrderReturnOptions now saves the array with the merchantOrderIds identifying
  the returnOptions entities in the Orders area of the redux store.
* Removed getGuestOrder clienta nd fetchGuestOrder action since it works the same way as getOrder and fetchOrder.

# [2.0.0-next.256](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.255...@farfetch/blackout-client@2.0.0-next.256) (2023-05-12)

### Features

- **client:** add package to unsubcribe action ([7a4211c](https://github.com/Farfetch/blackout/commit/7a4211cbda905ba5fdf64d6b9ef3ecce449eb981))

# [2.0.0-next.255](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.254...@farfetch/blackout-client@2.0.0-next.255) (2023-05-11)

### Features

- **client|redux|react:** add post guest orders endpoint ([21c0fec](https://github.com/Farfetch/blackout/commit/21c0fece8225ac728acf4e8be8ad4074bab067aa))

### BREAKING CHANGES

- **client|redux|react:** The fetchGuestOrdersLegacy is now a POST to prevent from leaking
  query data to google analytics. Now it accepts an object as data with the user email
  instead of passing the email as query.

# [2.0.0-next.254](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.253...@farfetch/blackout-client@2.0.0-next.254) (2023-05-05)

### Features

- **client|redux:** add exchanges endpoints ([ea34545](https://github.com/Farfetch/blackout/commit/ea3454562cce8638a5fdcbc82eca5d413fa1f260))

# [2.0.0-next.253](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.252...@farfetch/blackout-client@2.0.0-next.253) (2023-04-27)

### Bug Fixes

- fix Variation type mispelling ([b5a7620](https://github.com/Farfetch/blackout/commit/b5a7620b2ffe88c8b4d7702bfd0bedb889f46705))

# [2.0.0-next.252](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.251...@farfetch/blackout-client@2.0.0-next.252) (2023-04-21)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.251](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.250...@farfetch/blackout-client@2.0.0-next.251) (2023-04-20)

### Bug Fixes

- fix unit tests failing ([f729a61](https://github.com/Farfetch/blackout/commit/f729a61d2836915b1c9930becd701e1bbce1da95))

# [2.0.0-next.250](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.249...@farfetch/blackout-client@2.0.0-next.250) (2023-04-14)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.249](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.248...@farfetch/blackout-client@2.0.0-next.249) (2023-04-11)

### Bug Fixes

- fix `patchCheckoutOrderItems` types ([8237eca](https://github.com/Farfetch/blackout/commit/8237eca2c30427980fb462b1514f7d34bee68623))

# [2.0.0-next.248](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.247...@farfetch/blackout-client@2.0.0-next.248) (2023-03-28)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.247](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.246...@farfetch/blackout-client@2.0.0-next.247) (2023-03-27)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.246](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.245...@farfetch/blackout-client@2.0.0-next.246) (2023-03-16)

### Features

- add support for esm module resolution algorithm in node ([9c9e32b](https://github.com/Farfetch/blackout/commit/9c9e32b75437cd64659e01dd957f8c5ee27f3ce2))

### BREAKING CHANGES

- Now the package is fully ESM-compliant which means
  it is not necessary anymore to run in node with
  `--experimental-specifier-resolution=node` to make it work.
  For web projects, it might be necessary to tweak some bundler
  settings to make it work, depending on the bundler/framework used.
  `lodash-es` and `crypto-es` packages replaced `lodash` and `crypto-js`
  respectively, so you might need to install these peer dependencies
  if your project does not use them.
  axios peer dependency version is now `1.3.1` which should be installed
  as well. In our tests, no breaking changes were found by using this
  version of axios.
  Node version was bumped to 14 so if you need to use an older version
  you will need to transpile the code.
  React 18 is now the peer dependency of `@farfetch/blackout-react`
  package but if you are transpiling the code you can use the package
  safely in previous 16 and 17 versions.

# [2.0.0-next.245](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.244...@farfetch/blackout-client@2.0.0-next.245) (2023-03-14)

### Features

- **client:** add get return workflow endpoint ([dce3535](https://github.com/Farfetch/blackout/commit/dce35351851613487216c8898389d0a5932839fa))

# [2.0.0-next.244](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.243...@farfetch/blackout-client@2.0.0-next.244) (2023-03-03)

### Bug Fixes

- **client:** add metadata in post checkout order request and types ([88b956f](https://github.com/Farfetch/blackout/commit/88b956f65dc3f35c063d7be76153d234fee710c8))

# [2.0.0-next.243](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.242...@farfetch/blackout-client@2.0.0-next.243) (2023-03-01)

### Features

- **client:** add metadata to bag item and requests types ([d2959c9](https://github.com/Farfetch/blackout/commit/d2959c987747fb46dc5968676540e0beeaeabdbf))

# [2.0.0-next.242](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.241...@farfetch/blackout-client@2.0.0-next.242) (2023-02-23)

### Bug Fixes

- add "type": "module" to all packages ([71a07d9](https://github.com/Farfetch/blackout/commit/71a07d970cd00cf450ad4a23b63f07876c9ab6db))

# [2.0.0-next.241](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.240...@farfetch/blackout-client@2.0.0-next.241) (2023-02-23)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.240](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.239...@farfetch/blackout-client@2.0.0-next.240) (2023-02-17)

### Features

- added raffles endpoints ([d28e48e](https://github.com/Farfetch/blackout/commit/d28e48ec90f17dfe3f04efff79fa0c7c9dd49c78))

# [2.0.0-next.239](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.238...@farfetch/blackout-client@2.0.0-next.239) (2023-02-17)

### Features

- add set bag promocodes in bag ([ecd490d](https://github.com/Farfetch/blackout/commit/ecd490db9c77da939546f574b52e32c61b7a18d9))

### BREAKING CHANGES

- Bag middleware `fetchBagOperationsOnBagRequestSuccess`
  must now be imported from `bagMiddlewares` export instead of directly
  from the root of the package.

# [2.0.0-next.238](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.237...@farfetch/blackout-client@2.0.0-next.238) (2023-02-17)

### Bug Fixes

- remove deprecated params from translations ([447a989](https://github.com/Farfetch/blackout/commit/447a98993b0e9ae5183d25101907b175fbfbee2b))

### BREAKING CHANGES

- 'client_id' and 'tenant_id' parameters were removed from 'Translation' type.
  They are now inferred from the token.

# [2.0.0-next.237](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.236...@farfetch/blackout-client@2.0.0-next.237) (2023-02-10)

### Bug Fixes

- **client:** add crypto-js to client's dependencies ([bc7e27e](https://github.com/Farfetch/blackout/commit/bc7e27e1d568c5335730fe5cb801e77533bb91fe))

# [2.0.0-next.236](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.235...@farfetch/blackout-client@2.0.0-next.236) (2023-02-09)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.235](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.234...@farfetch/blackout-client@2.0.0-next.235) (2023-02-07)

### Features

- **client:** add product outfits endpoints ([20efbdd](https://github.com/Farfetch/blackout/commit/20efbdd976eba31a8533065d6291c4d432b70a4f))

# [2.0.0-next.234](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.233...@farfetch/blackout-client@2.0.0-next.234) (2023-02-02)

### Bug Fixes

- **redux:** fix product attributes server render ([88b650f](https://github.com/Farfetch/blackout/commit/88b650fe814015e926af05e6e1bd39fd1a029bb5))

# [2.0.0-next.233](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.232...@farfetch/blackout-client@2.0.0-next.233) (2023-02-02)

### Features

- add segment at targets on searchContents ([d81a96a](https://github.com/Farfetch/blackout/commit/d81a96a542d35c41d60bb55f8ef29a6e9b3961c9))

# [2.0.0-next.232](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.231...@farfetch/blackout-client@2.0.0-next.232) (2023-01-30)

### Features

- **client:** add bag operations endpoints ([c630500](https://github.com/Farfetch/blackout/commit/c630500a51d5b1285ae52f9bb1d02c4644137f3f))

# [2.0.0-next.231](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.230...@farfetch/blackout-client@2.0.0-next.231) (2023-01-27)

### Features

- add baseUrl to seo metadata ([6e663dc](https://github.com/Farfetch/blackout/commit/6e663dc11cffe1e98b1a81ad220e2ae42d147bb9))

# [2.0.0-next.230](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.229...@farfetch/blackout-client@2.0.0-next.230) (2023-01-23)

### Bug Fixes

- fix error handling ([0a2128d](https://github.com/Farfetch/blackout/commit/0a2128da7c1c425f826b793ddaebaa5053d13452))

# [2.0.0-next.229](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.228...@farfetch/blackout-client@2.0.0-next.229) (2023-01-11)

### Features

- **client:** add new get user returns endpoints ([1042b4c](https://github.com/Farfetch/blackout/commit/1042b4cf02bb7698f9b59516ee816967bcd52d5f))

# [2.0.0-next.228](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.227...@farfetch/blackout-client@2.0.0-next.228) (2023-01-09)

### Bug Fixes

- **redux|react:** fix createSelector types ([883a337](https://github.com/Farfetch/blackout/commit/883a33718428e9463fdcfcfe08dd7815d03f2038))

# [2.0.0-next.227](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.226...@farfetch/blackout-client@2.0.0-next.227) (2022-12-21)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.226](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.225...@farfetch/blackout-client@2.0.0-next.226) (2022-12-15)

### Bug Fixes

- **redux|react|client:** fix product listing hook and filters related types ([baced32](https://github.com/Farfetch/blackout/commit/baced32db6c7155b25134c20927e88baef3e36bb))

# [2.0.0-next.225](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.224...@farfetch/blackout-client@2.0.0-next.225) (2022-12-14)

### Features

- **client:** add share wishlist endpoints ([60b3b8a](https://github.com/Farfetch/blackout/commit/60b3b8a3751633a23690746b0c0bbe65643c670b))

# [2.0.0-next.224](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.223...@farfetch/blackout-client@2.0.0-next.224) (2022-12-13)

### Features

- **client|redux|react:** add support to metadata on bag and wishlist hooks ([ab9def2](https://github.com/Farfetch/blackout/commit/ab9def21429b812779c885fb87de7ec69964e7bb))

# [2.0.0-next.223](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.222...@farfetch/blackout-client@2.0.0-next.223) (2022-12-09)

### Bug Fixes

- fix unit tests typings ([8046bbd](https://github.com/Farfetch/blackout/commit/8046bbdc720bd1e280c1b11a0cf9c3e6891f9785))

### Features

- **react|redux:** add checkout hooks ([ca0f846](https://github.com/Farfetch/blackout/commit/ca0f846025afa9ebc91204e710babb88c469eaec))

### BREAKING CHANGES

- **react|redux:** The following modules were renamed:

* `ItemStatus` to `CheckoutOrderItemStatus`
* `arePaymentInstrumentsLoading` to `arePaymentIntentInstrumentsLoading`
* `getCheckoutDeliveryBundle` to `getCheckoutOrderDeliveryBundle`.
* `getCheckoutDeliveryBundleUpgrade` to `getCheckoutOrderDeliveryBundleUpgrade`
* `getCheckoutDeliveryBundleUpgrades` to `getCheckoutOrderDeliveryBundleUpgrades`
* `getCheckoutDeliveryBundleWindow` to `getCheckoutOrderDeliveryBundleWindow`
* `getCheckoutDeliveryBundles` to `getCheckoutOrderDeliveryBundles`
* `getCheckoutDeliveryBundlesIds` to `getCheckoutOrderDeliveryBundlesIds`
* `getCheckoutError` to `getCheckoutOrderError`
* `getCheckoutId` to `getCheckoutOrderId`
* `getCheckout` to `getCheckoutOrderResult`
* `getCheckoutOrderCollectPoints` to `getCollectPoints` (renamed back
  to get `getCollectPoints` as it does not depend on the order).
* `getCheckoutSelectedDeliveryBundleId` to `getCheckoutOrderSelectedDeliveryBundleId`
* `getCheckoutShippingOptions` to `getCheckoutOrderShippingOptions`
* `getPaymentInstrument` to `getPaymentIntentInstrument`
* `getPaymentInstruments` to `getPaymentIntentInstruments`
* `getPaymentInstrumentsError` to `getPaymentIntentInstrumentsError`
* `getPaymentInstrumentsResult` to `getPaymentIntentInstrumentsResult`
* `isCheckoutLoading` to `isCheckoutOrderLoading`
* `resetPaymentInstrumentsState` to `resetPaymentIntentInstrumentsState`

The following checkout selectors were removed as they can be easily
replaced by looking at the checkout order
(returned by the getCheckoutOrder selector) directly:

- getCheckoutOrderItems
- getCheckoutOrderItemsIds

Removed `getCheckoutOrderCharge` selector as it
can be derived by the `isCheckoutOrderChargeLoading`,
`getCheckoutOrderChargeError`
and `getCheckoutOrderChargeResult` selectors.

# [2.0.0-next.222](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.221...@farfetch/blackout-client@2.0.0-next.222) (2022-12-06)

### Features

- **react|redux:** improve order and returns hooks ([28b1aaf](https://github.com/Farfetch/blackout/commit/28b1aaf155ad1cdcb27fa4ea1fe4c869911acf9e))
- **react:** add returns hooks ([cd7738e](https://github.com/Farfetch/blackout/commit/cd7738e3fd918887dab00b77005e125b38b0c7c5))
- **redux|react:** add pickup reschedule hooks ([b0087e8](https://github.com/Farfetch/blackout/commit/b0087e8753aec5a756bc5c26a4f23cd42d85059d))

### BREAKING CHANGES

- **react:** The following modules were renamed:
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

# [2.0.0-next.221](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.220...@farfetch/blackout-client@2.0.0-next.221) (2022-12-02)

### Features

- **react:** add base components contents ([7a75bd4](https://github.com/Farfetch/blackout/commit/7a75bd428b7da18783ff4249aedeeef5ab55c96d))

# [2.0.0-next.220](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.219...@farfetch/blackout-client@2.0.0-next.220) (2022-11-29)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.219](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.218...@farfetch/blackout-client@2.0.0-next.219) (2022-11-11)

### chore

- **react|redux:** remove checkout hooks ([36702bf](https://github.com/Farfetch/blackout/commit/36702bf412755c7b2ec92fe86ad670e5df0ded61))

### BREAKING CHANGES

- **react|redux:** - `useCheckout` hook was removed from @farfetch/blackout-react package.

* `getCheckoutOrderOperation` and `fetchCheckoutOrderOperation` signatures
  have changed to accept separate parameters for the checkoutOrderId and
  operationId values instead of using an object.
* `getPaymentMethods` client was renamed to `getCheckoutOrderPaymentMethods`.
* `fetchPaymentMethods` action was renamed to `fetchCheckoutOrderPaymentMethods`.

# [2.0.0-next.218](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.217...@farfetch/blackout-client@2.0.0-next.218) (2022-11-10)

### Features

- **client|redux:** create new client fetch Content Page ([41834cd](https://github.com/Farfetch/blackout/commit/41834cd6bf25cd3da7a7d37ca1209bd5ed554bde))

# [2.0.0-next.217](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.216...@farfetch/blackout-client@2.0.0-next.217) (2022-11-08)

### Features

- **react|redux|client:** add content hooks ([5c398a4](https://github.com/Farfetch/blackout/commit/5c398a4e1adc84cf435a1a66280f4d27d232da17))

### BREAKING CHANGES

- **react|redux|client:** commerce pages client endpoint updated and content hooks refactored

# [2.0.0-next.216](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.215...@farfetch/blackout-client@2.0.0-next.216) (2022-10-25)

### Features

- **react|redux|client:** refactor and add seo metadata hooks and utils ([95864db](https://github.com/Farfetch/blackout/commit/95864db4b65f62dab1b65206a0ec4a5e587329c6))

# [2.0.0-next.215](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.214...@farfetch/blackout-client@2.0.0-next.215) (2022-10-24)

### Bug Fixes

- ts errors on redux selectors ([52ea54b](https://github.com/Farfetch/blackout/commit/52ea54bd8e970e57356b3255dc7a6f6d2d714669))

# [2.0.0-next.214](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.213...@farfetch/blackout-client@2.0.0-next.214) (2022-10-20)

### Features

- **redux:** configurations actions ([4f5d89b](https://github.com/Farfetch/blackout/commit/4f5d89b563aeddb0176f1967f703412aa57dfe69))

# [2.0.0-next.213](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.212...@farfetch/blackout-client@2.0.0-next.213) (2022-10-13)

### Bug Fixes

- **client|redux:** fix content redux exports ([690ec18](https://github.com/Farfetch/blackout/commit/690ec187aa982717a4f0cbee08b6658b69151fd8))

# [2.0.0-next.212](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.211...@farfetch/blackout-client@2.0.0-next.212) (2022-10-07)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.211](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.210...@farfetch/blackout-client@2.0.0-next.211) (2022-10-06)

### Features

- **client|react|redux:** add useProductGrouping and useProductGroupingProperties hooks ([d21352e](https://github.com/Farfetch/blackout/commit/d21352ef4f22877b37147daadd63b9a363587dd6))

# [2.0.0-next.210](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.209...@farfetch/blackout-client@2.0.0-next.210) (2022-10-04)

### Features

- **client:** add getConfiguration client ([1e89f0f](https://github.com/Farfetch/blackout/commit/1e89f0f3cf20eaec82676c2c2f530e893e7fdbef))
- **redux|client|react:** add brands hooks ([667cb69](https://github.com/Farfetch/blackout/commit/667cb69c3cdf38ae2a7354212c52a3b19f36c6f6))

# [2.0.0-next.209](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.208...@farfetch/blackout-client@2.0.0-next.209) (2022-09-28)

### Bug Fixes

- fix locale types ([f7441c7](https://github.com/Farfetch/blackout/commit/f7441c71f7b21aa66fe7810749df810b947c4562))

### Features

- **redux|client|react:** add categories hooks ([e708dc4](https://github.com/Farfetch/blackout/commit/e708dc4f60e13bcf915b1d79993b0332e8d1ecfc))

# [2.0.0-next.208](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.207...@farfetch/blackout-client@2.0.0-next.208) (2022-09-22)

### Features

- **react|redux|client:** add subscriptions hooks ([f03d4f2](https://github.com/Farfetch/blackout/commit/f03d4f2349ff5ec83d7135cf82237b4b27cd8a50))

### BREAKING CHANGES

- **react|redux|client:** Subscriptions reducer refactor

# [2.0.0-next.207](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.206...@farfetch/blackout-client@2.0.0-next.207) (2022-09-21)

### Bug Fixes

- **redux:** fix TS erros on redux reducers unit tests ([d6acf84](https://github.com/Farfetch/blackout/commit/d6acf8442c63412b06c574b68d076168b83f52b2))

# [2.0.0-next.206](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.205...@farfetch/blackout-client@2.0.0-next.206) (2022-09-09)

### Bug Fixes

- **redux:** fix TS errors on redux actions unit tests ([2005870](https://github.com/Farfetch/blackout/commit/2005870a5e087cdade3fe6bb3cef9643c6a59db2))

# [2.0.0-next.205](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.204...@farfetch/blackout-client@2.0.0-next.205) (2022-09-09)

### Bug Fixes

- **redux|client|react:** add search hooks ([828a0b4](https://github.com/Farfetch/blackout/commit/828a0b4016058efc1d4328da53968cb00d25eff7))

### BREAKING CHANGES

- **redux|client|react:** Search reducers refactor

# [2.0.0-next.204](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.203...@farfetch/blackout-client@2.0.0-next.204) (2022-09-08)

### Features

- **react:** add orders hooks ([06d39e7](https://github.com/Farfetch/blackout/commit/06d39e749e81cd512d50510f3ea3e06ab69b714b))

### BREAKING CHANGES

- **react:** The selectors `isOrdersListLoading` and
  `getOrdersListError` were removed and replaced with the selectors
  `areOrdersLoading` and `getOrdersError`.
  The orders reducer was now changed as well and not it
  will only change its root slice `isLoading` and `error` values only
  when the fetchUserOrders and fetchGuestOrders actions are used.

# [2.0.0-next.203](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.202...@farfetch/blackout-client@2.0.0-next.203) (2022-09-07)

### Bug Fixes

- **redux|client:** fix checkout and payments types ([63bf09f](https://github.com/Farfetch/blackout/commit/63bf09f578875be792b3404ade5be66b6151d6fc))

# [2.0.0-next.202](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.201...@farfetch/blackout-client@2.0.0-next.202) (2022-09-02)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.201](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.200...@farfetch/blackout-client@2.0.0-next.201) (2022-09-02)

### Bug Fixes

- **client|redux|react:** orders area fixes ([c5db8bc](https://github.com/Farfetch/blackout/commit/c5db8bcf1adbf3977c7c99e1c4a3afbd45265ec2))

### BREAKING CHANGES

- **client|redux|react:** The following exports were renamed:

* OrderStatus -> MerchantOrderStatus
* deleteRecipientFromTopic -> deleteSubscriptionTopicRecipient
* getOrders -> getUserOrders
* getUserCredit (client) -> getUserCredits
* clearAllUnsubscribeRecipientFromTopic -> clearAllUnsubscribeSubscriptionTopicRecipientRequests
* clearUnsubscribeRecipientFromTopic -> clearUnsubscribeSubscriptionTopicRecipientRequest
* fetchListing -> fetchProductListing
* fetchListingFactory -> fetchProductListingFactory
* fetchOrders -> fetchUserOrders
* fetchOrdersFactory -> fetchUserOrdersFactory
* fetchSet -> fetchProductSet
* fetchSetFactory -> fetchProductSetFactory
* fetchUserCredit -> fetchUserCredits
* getMerchantsFromOrder -> getOrderMerchants
* getReturnOptionsFromOrder -> getOrderReturnOptions
* getUserCredit (selector) -> getUserCredits
* unsubscribeFromSubscription -> unsubscribeSubscription
* unsubscribeFromSubscriptionFactory -> unsubscribeSubscriptionFactory
* unsubscribeRecipientFromTopic -> unsubscribeSubscriptionTopicRecipient
* unsubscribeRecipientFromTopicFactory -> unsubscribeSubscriptionTopicRecipientFactory

# [2.0.0-next.200](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.199...@farfetch/blackout-client@2.0.0-next.200) (2022-08-25)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.199](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.198...@farfetch/blackout-client@2.0.0-next.199) (2022-08-24)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.198](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.197...@farfetch/blackout-client@2.0.0-next.198) (2022-08-23)

### Bug Fixes

- **client|react|redux:** rename locale selectors and action ([78cf7e3](https://github.com/Farfetch/blackout/commit/78cf7e3fbd16554376cca25010c0343b4441194f))

### BREAKING CHANGES

- **client|react|redux:** The following action was renamed:
  fetchCountryCities -> fetchCountryStateCities

The following selectors were renamed:
getCountryCitiesError -> getCountryStateCitiesError
areCountryCitiesLoading -> areCountryStateCitiesLoading
getCountryCities -> getCountryStateCities
areCountryCitiesFetched -> areCountryStateCitiesFetched

# [2.0.0-next.197](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.196...@farfetch/blackout-client@2.0.0-next.197) (2022-08-22)

### Bug Fixes

- **client:** fix client unit tests TS errors ([f68da8c](https://github.com/Farfetch/blackout/commit/f68da8c55bc3f7bf932d671644b54f08a2c1cffe))

# [2.0.0-next.196](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.195...@farfetch/blackout-client@2.0.0-next.196) (2022-08-16)

### Features

- **react:** add user addresses hooks ([a1c8427](https://github.com/Farfetch/blackout/commit/a1c84270c3ca13455300e7b27eecd769830c4215))

# [2.0.0-next.195](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.194...@farfetch/blackout-client@2.0.0-next.195) (2022-08-16)

### Bug Fixes

- **client:** fix adaptError for errors with no response description ([b69b487](https://github.com/Farfetch/blackout/commit/b69b487f1e9ba92dd1c73f02a05c62979842c972))

# [2.0.0-next.194](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.193...@farfetch/blackout-client@2.0.0-next.194) (2022-08-12)

### chore

- **redux:** move entity selectors from entities folder ([34fdf43](https://github.com/Farfetch/blackout/commit/34fdf434599758885cfd1609aa04f8d869428ae9))

### BREAKING CHANGES

- **redux:** All entity selectors must now be imported from its
  respective area instead of being import from the `entities` folder.

# [2.0.0-next.193](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.192...@farfetch/blackout-client@2.0.0-next.193) (2022-08-12)

### Bug Fixes

- **redux|react:** rename checkout actions and selectors ([2e8a913](https://github.com/Farfetch/blackout/commit/2e8a91359c33704131ba1a3a37c6f272e41f9e4b))

### BREAKING CHANGES

- **redux|react:** The following actions were renamed:

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
`getOperationError` -> `getCheckoutOrderOperationError`
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

# [2.0.0-next.192](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.191...@farfetch/blackout-client@2.0.0-next.192) (2022-08-11)

### Features

- **react:** refactor useProductListing hook ([e27b0ae](https://github.com/Farfetch/blackout/commit/e27b0ae7baa8e6c65769a1734a6e551ae19b5537))

### BREAKING CHANGES

- **react:** useProductListing hook new interface

# [2.0.0-next.191](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.190...@farfetch/blackout-client@2.0.0-next.191) (2022-08-10)

### Bug Fixes

- **redux:** fix buildBagItem ([20e9cd0](https://github.com/Farfetch/blackout/commit/20e9cd03d08f874bdd15c0f8578839514735c326))

# [2.0.0-next.190](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.189...@farfetch/blackout-client@2.0.0-next.190) (2022-08-09)

### Features

- **react:** add locale hooks ([8e62032](https://github.com/Farfetch/blackout/commit/8e62032ada0d4e0d9ccf194219d3565bc868c5bc))

### BREAKING CHANGES

- **react:** locale selectors moved from entities folder to locale folder

# [2.0.0-next.189](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.188...@farfetch/blackout-client@2.0.0-next.189) (2022-08-05)

### Bug Fixes

- change getCountries client ([2f1519a](https://github.com/Farfetch/blackout/commit/2f1519ab8319b434e35241ca5afb06a9575f1c9e))
- remove getProductColorGrouping client ([95d9cac](https://github.com/Farfetch/blackout/commit/95d9cac6aea2e750fcdf1be3467e7b64c4bd61d9))

### BREAKING CHANGES

- The getCountries client now does not return a paginated
  response and does not accept any query parameters. The result is
  an array of all the countries available.

# [2.0.0-next.188](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.187...@farfetch/blackout-client@2.0.0-next.188) (2022-08-05)

### Features

- **redux:** add pagination to commerce pages structure response ([0a67a6e](https://github.com/Farfetch/blackout/commit/0a67a6ea2af372d57b46057a44aee2d182dff4ae))

# [2.0.0-next.187](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.186...@farfetch/blackout-client@2.0.0-next.187) (2022-08-04)

### chore

- **client|redux:** rename orders files ([43cd3dd](https://github.com/Farfetch/blackout/commit/43cd3dd3e519d5788ee009faf6cfd8a019c2da35))

### BREAKING CHANGES

- **client|redux:** - The following files from client package were moved and renamed:client was moved
  from the returns area to orders area. Update your imports accordingly:
  - The 'returns/getReturnsFromOrder' client was moved and renamed to 'orders/getOrderReturns'
  - The 'orders/getTrackings' client was renamed to 'orders/getShipmentTrackings'
  - The 'orders/getOrderDetails' client was renamed to 'orders/getOrder'

* The following selectors from redux package were renamed:

  - The 'orders/isTrackingsLoading' was renamed to 'orders/areShipmentTrackingsLoading'
  - The 'orders/isOrdersLoading' was renamed to 'orders/areOrdersLoading'
  - The 'orders/isOrderDetailsLoading' was renamed to 'orders/areOrderDetailsLoading'
  - The 'orders/isDocumentsLoading' was renamed to 'orders/areDocumentsLoading'
  - The 'orders/isAvailableItemsActivitiesLoading' was renamed to
    'orders/areAvailableItemsActivitiesLoading'
  - The 'orders/isOrderItemAvailableActivitiesLoading' was renamed to
    'orders/areOrderItemAvailableActivitiesLoading'

* Some Action types for the order returns were also renamed.
  Update them in case you use them in any custom reducer/middleware:

```js
import { actionTypes } from '@farfetch/blackout-redux/returns';

// Previously
actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE;
actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST;
actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS;

// Change to
actionTypes.FETCH_ORDER_RETURNS_FAILURE;
actionTypes.FETCH_ORDER_RETURNS_REQUEST;
actionTypes.FETCH_ORDER_RETURNS_SUCCESS;
```

# [2.0.0-next.186](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.185...@farfetch/blackout-client@2.0.0-next.186) (2022-08-02)

### chore

- **client|react:** remove authentication interceptor ([3247708](https://github.com/Farfetch/blackout/commit/32477087c91d9b8673b7799a74b51154c0b46c62))

### BREAKING CHANGES

- **client|react:** Authentication interceptor is now removed from both
  client and react packages as it only makes sense for native apps.

# [2.0.0-next.185](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.184...@farfetch/blackout-client@2.0.0-next.185) (2022-08-01)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.184](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.183...@farfetch/blackout-client@2.0.0-next.184) (2022-07-29)

### chore

- rename `postRegister` client ([902a601](https://github.com/Farfetch/blackout/commit/902a601ed2b746c9c78b9809e02be87c5dd7d209))

### BREAKING CHANGES

- `postRegister` client is now `postUser`.

# [2.0.0-next.183](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.182...@farfetch/blackout-client@2.0.0-next.183) (2022-07-28)

### Bug Fixes

- fix user typings ([1d96701](https://github.com/Farfetch/blackout/commit/1d967010909cc0d8061e6e194f48edef89d7d765))

# [2.0.0-next.182](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.181...@farfetch/blackout-client@2.0.0-next.182) (2022-07-27)

### Bug Fixes

- **client|redux|redux:** fix account areas imports and exports ([e80b833](https://github.com/Farfetch/blackout/commit/e80b833a51f8f658ede1591da56589f863dd02a5))
- **client:** add required @types/\* and remove unnecessary dependencies ([4c20f28](https://github.com/Farfetch/blackout/commit/4c20f28ad402b6b41648a80d221b9662d3a138d6))
- **client:** update PostGuestTokens type ([a4af154](https://github.com/Farfetch/blackout/commit/a4af1549fb191c07bcbd8cf4a5478d87e38fa313))
- fix `useAction` hook type ([288c0e6](https://github.com/Farfetch/blackout/commit/288c0e6903fab00b103694749ca684d0253c0511))

### Features

- add support for passing metadata in wishlist and bag items actions ([167c2a2](https://github.com/Farfetch/blackout/commit/167c2a22944328c9aab097996255e7321ea412e7))
- implement next version ([9995600](https://github.com/Farfetch/blackout/commit/9995600a4620aa09e18c07ebaa0d4058fe70abb1))

### BREAKING CHANGES

- Many renames of actions and clients, as well as redux store
  layout were implemented and will be described in a new migration file which
  will be authored later.

# [2.0.0-next.181](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.180...@farfetch/blackout-client@2.0.0-next.181) (2022-07-15)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.180](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.179...@farfetch/blackout-client@2.0.0-next.180) (2022-07-06)

### Features

- **client|redux:** change return files exports ([02457ce](https://github.com/Farfetch/blackout/commit/02457ced5fa5e17011476d50e452d9257231d1a4))

# [2.0.0-next.179](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.178...@farfetch/blackout-client@2.0.0-next.179) (2022-07-06)

### Features

- export `helpers` and `authentication` modules in client's root index file ([0efea8b](https://github.com/Farfetch/blackout/commit/0efea8bb6217886f9f3af3dea680d1bafa1e490a))

### BREAKING CHANGES

- - Imports from the `helpers` and `authentication`
    folders of the `@farfetch/blackout-core` package
    must now be changed to import from the `@farfetch/blackout-client` package:

```js
// Previously
import client, {
  configApiBlackAndWhite,
  headers,
} from '@farfetch/blackout-core/helpers';
import {
  postGuestTokens,
  postRegister,
  postTokens,
} from '@farfetch/blackout-core/authentication';

// Now
import {
  client,
  configApiBlackAndWhite,
  headers,
  postGuestTokens,
  postRegister,
  postTokens,
} from '@farfetch/blackout-client';
```

- `parsePickupDate` module was removed.

- `AxiosAuthenticationTokenManager` was renamed to
  `AuthenticationTokenManager` besides having to be imported from the root
  of the `@farfetch/blackout-client` package:

```js
// Previously
import { AxiosAuthenticationTokenManager } from '@farfetch/blackout-core/helpers/client/interceptors/authentication';

// Now
import { AuthenticationTokenManager } from '@farfetch/blackout-client';
```

# [2.0.0-next.178](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.177...@farfetch/blackout-client@2.0.0-next.178) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.177](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.176...@farfetch/blackout-client@2.0.0-next.177) (2022-07-04)

### Bug Fixes

- **blackout-client:** fix typescript errors ([4020e29](https://github.com/Farfetch/blackout/commit/4020e29450b7a5402ab516331bb5856e31e70b10))

# [2.0.0-next.176](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.175...@farfetch/blackout-client@2.0.0-next.176) (2022-07-01)

### Features

- **client:** change e-commerce clients naming ([aa65b31](https://github.com/Farfetch/blackout/commit/aa65b31472e52a82728068d88faa6fd3a2873abc))

### BREAKING CHANGES

- **client:** The following clients, imported from
  `@farfetch/blackout-client/products`, changed its name to:

getProductsDetails → getProduct
getProductVariantsByMerchantsLocations → getProductVariantMerchantsLocations
getListing → getProductListing
getSets → getProductSets
getRecommendedSets → getProductRecommendedSets

# [2.0.0-next.175](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.174...@farfetch/blackout-client@2.0.0-next.175) (2022-07-01)

### Bug Fixes

- fix typings and renames ([494c84c](https://github.com/Farfetch/blackout/commit/494c84c6a76f31fb8f539427d82a0b2bc0604c92))

### Features

- **client|redux:** export subscription modules in client and redux root index file ([dc72eaf](https://github.com/Farfetch/blackout/commit/dc72eafb963b829b9413147cf6a17ea41a93180b))

# [2.0.0-next.174](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.173...@farfetch/blackout-client@2.0.0-next.174) (2022-06-30)

### Features

- **client|redux:** recommendations in product's scope ([10ad661](https://github.com/Farfetch/blackout/commit/10ad6610dfa35eb13c3706f60a57de02813b53b1))

# [2.0.0-next.173](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.172...@farfetch/blackout-client@2.0.0-next.173) (2022-06-30)

### chore

- **client:** update checkout client names ([69b8961](https://github.com/Farfetch/blackout/commit/69b896166d8690014af737474842803259d9b102))

### BREAKING CHANGES

- **client:** The following clients, imported from
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

````





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
````

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

- **blackout-client|blackout-react|blackout-redux:** export analytics modules in root index file ([45e97d2](https://github.com/Farfetch/blackout/commit/45e97d27f42ae4137d99a3015a04590d4991820e))

### BREAKING CHANGES

- **blackout-client|blackout-react|blackout-redux:** - Analytics imports from `@farfetch/blackout-react/analytics`

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
import { postTrackings } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';
import { postBatchTrackings } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';

// Now
import { postTrackings } from '@farfetch/blackout-client';
import { postBatchTrackings } from '@farfetch/blackout-client';
```

# [2.0.0-next.166](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.165...@farfetch/blackout-client@2.0.0-next.166) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.165](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.164...@farfetch/blackout-client@2.0.0-next.165) (2022-06-27)

### Features

- **client:** add product grouping client ([f69e9bc](https://github.com/Farfetch/blackout/commit/f69e9bc5769c1f34163e0a43434fed5e889ed0c6))

# [2.0.0-next.164](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.163...@farfetch/blackout-client@2.0.0-next.164) (2022-06-22)

### Features

- **client|redux:** recently viewed in product's scope ([8ad16e6](https://github.com/Farfetch/blackout/commit/8ad16e6ffb79fe45fac8b960cffb2bdae1c07abb))
- **redux:** refactoring of exports in products ([a17e25a](https://github.com/Farfetch/blackout/commit/a17e25ad07cb40d7112f986a3d8a7d4866b377fd))

### BREAKING CHANGES

- **redux:** - Client:

  - All modules related to recently viewed must now be imported from the root of the package.

    ```js
    // previously
    import{ getRecentlyViewedProducts } from ‘@farfetch/blackout-client/recentlyViewed’;

    // now
    import{ getRecentlyViewedProducts } from ‘@farfetch/blackout-client’;
    ```

* Redux: - Like client package, recentlyViewed now be imported from root package: Applied
  to reducer, actions, selectors, and types as well. - imports from products now can be imported from root package. Product's `actionTypes`,
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

- **client|redux:** export clients and actions on root for content area ([3e4913f](https://github.com/Farfetch/blackout/commit/3e4913f972e5bcfeede59c97a790e0062395fb20))

### BREAKING CHANGES

- **client|redux:** renamed exports and removed default exports on contents folder.

package/redux

- removed reducer default export
- all exports are now in the following format '\*Content'.
- actionTypes to actionTypesContent
- reducer to reducerContent
- serverInitialState to serverInitialStateContent

# [2.0.0-next.162](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.161...@farfetch/blackout-client@2.0.0-next.162) (2022-06-20)

### Bug Fixes

- **client:** checkout getCheckoutOrderCharge with chargeId param ([d597a31](https://github.com/Farfetch/blackout/commit/d597a31a2f9fc53cb77a2b556079f357453098e3))

# [2.0.0-next.161](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.160...@farfetch/blackout-client@2.0.0-next.161) (2022-06-20)

### Features

- add patch checkout order item and delete checkout order item ([e1e709e](https://github.com/Farfetch/blackout/commit/e1e709e3a1545560e7ace6974334c3f07389f23e))

# [2.0.0-next.160](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.159...@farfetch/blackout-client@2.0.0-next.160) (2022-06-15)

### Features

- add logic for operation endpoints ([5f3d28b](https://github.com/Farfetch/blackout/commit/5f3d28b6d1702b9ba0c2146f606194ab92cab368))

# [2.0.0-next.159](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.158...@farfetch/blackout-client@2.0.0-next.159) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.158](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.157...@farfetch/blackout-client@2.0.0-next.158) (2022-06-15)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.157](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.156...@farfetch/blackout-client@2.0.0-next.157) (2022-06-14)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.156](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.155...@farfetch/blackout-client@2.0.0-next.156) (2022-06-14)

### Bug Fixes

- **blackout-client|blackout-redux:** fix getFormSchemaByCode selector ([5e209c4](https://github.com/Farfetch/blackout/commit/5e209c467f091496b02446e64f78e45667c167d5))

# [2.0.0-next.155](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.154...@farfetch/blackout-client@2.0.0-next.155) (2022-06-14)

### Bug Fixes

- **redux:** remove unsupported params from FetchUserFactory ([7278675](https://github.com/Farfetch/blackout/commit/7278675df9baf8e488ca464f8f33296c053ebad9))

# [2.0.0-next.154](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.153...@farfetch/blackout-client@2.0.0-next.154) (2022-06-09)

### Features

- **client:** new reset password endpoint ([5d0ced9](https://github.com/Farfetch/blackout/commit/5d0ced90c31a8ea5473a1c88496484f63b30ef2c))

# [2.0.0-next.153](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.152...@farfetch/blackout-client@2.0.0-next.153) (2022-06-09)

### Features

- **blackout-client|blackout-redux:** fix error handling on blackout client and redux ([7b1f92f](https://github.com/Farfetch/blackout/commit/7b1f92fa3d7d03ca3085087d4ac1574d254fe5c0))

# [2.0.0-next.152](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.151...@farfetch/blackout-client@2.0.0-next.152) (2022-06-09)

### Features

- **blackout-\*:** convert jsdocs to tsdocs ([7936d24](https://github.com/Farfetch/blackout/commit/7936d24fad2138d5cd0610da624116d31a9cdb93))

# [2.0.0-next.151](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.150...@farfetch/blackout-client@2.0.0-next.151) (2022-06-07)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.150](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.149...@farfetch/blackout-client@2.0.0-next.150) (2022-06-03)

### Features

- **blackout-react:** add checkout events mappings to Zaraz ([9c166db](https://github.com/Farfetch/blackout/commit/9c166dba3bebee23b99d920a99597923f0f791b5))

# [2.0.0-next.149](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.148...@farfetch/blackout-client@2.0.0-next.149) (2022-06-02)

### Features

- **client:** add checkout operation clients ([02e902b](https://github.com/Farfetch/blackout/commit/02e902b01ef97d699e2315645f78cdccd3442154))

# [2.0.0-next.148](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.147...@farfetch/blackout-client@2.0.0-next.148) (2022-05-25)

### Features

- **blackout-\*:** fix issues for the release blackout 2 ([8fb3d11](https://github.com/Farfetch/blackout/commit/8fb3d11ca5da34f131cbd021f5751c468dbb43d4))

# [2.0.0-next.147](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.146...@farfetch/blackout-client@2.0.0-next.147) (2022-05-17)

### Features

- **client|redux:** add reschedule endpoints ([2365af9](https://github.com/Farfetch/blackout/commit/2365af968fd8ae6578acf0ac4af008bfd90b8b8a))

# [2.0.0-next.146](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.145...@farfetch/blackout-client@2.0.0-next.146) (2022-05-12)

### Features

- **client|redux:** add personal id and image endpoints ([d295f55](https://github.com/Farfetch/blackout/commit/d295f5576a23d8b1bd8b057ef392fe23234f1961))

# [2.0.0-next.145](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.144...@farfetch/blackout-client@2.0.0-next.145) (2022-05-11)

### Features

- **client|redux:** add personal ids endpoints ([02d7371](https://github.com/Farfetch/blackout/commit/02d7371230c93b682c1a3da8866883d91c3e2617))

# [2.0.0-next.144](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.143...@farfetch/blackout-client@2.0.0-next.144) (2022-05-10)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.143](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.142...@farfetch/blackout-client@2.0.0-next.143) (2022-05-02)

### Features

- **analytics|client|react:** transform Omnitracking integration to typescript ([c987863](https://github.com/Farfetch/blackout/commit/c98786396f6c82a07f6f3359fb994128bdb5f37e))

# [2.0.0-next.142](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.141...@farfetch/blackout-client@2.0.0-next.142) (2022-04-27)

### Bug Fixes

- **client:** fix phone tokens endpoints requests ([b6ea348](https://github.com/Farfetch/blackout/commit/b6ea3485a9725c6f4249262e90a0c2320299b6d1))

# [2.0.0-next.141](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.140...@farfetch/blackout-client@2.0.0-next.141) (2022-04-21)

### Features

- **client|redux:** add phone token validation endpoints on next ([58edd6c](https://github.com/Farfetch/blackout/commit/58edd6c10b83890255ea93674aea42c411a2fc7b))

# [2.0.0-next.140](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.139...@farfetch/blackout-client@2.0.0-next.140) (2022-04-19)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.139](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.138...@farfetch/blackout-client@2.0.0-next.139) (2022-04-08)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.138](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.137...@farfetch/blackout-client@2.0.0-next.138) (2022-04-05)

### Bug Fixes

- **blackout-client|blackout-redux:** fix updateUserSubscriptions action ([97467d1](https://github.com/Farfetch/blackout/commit/97467d1fcda36fbe15169c95ba798a2d129fb9db))

### BREAKING CHANGES

- **blackout-client|blackout-redux:** The `getUserSubscriptionsError` selector will
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

- **blackout-client:** fix logout in axios interceptor ([e7352d7](https://github.com/Farfetch/blackout/commit/e7352d79dca85d84598b59bf0216ff71400cbf3c))

# [2.0.0-next.136](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.135...@farfetch/blackout-client@2.0.0-next.136) (2022-03-29)

### Bug Fixes

- **react:** add lodash map render content ([8b8a5cc](https://github.com/Farfetch/blackout/commit/8b8a5ccc9304d38e750bea1d00d84c5cc4258388))

### Features

- **core|react|redux:** fix typescript issues for authentication and users ([84920d2](https://github.com/Farfetch/blackout/commit/84920d2384ab387eb48e623a63beec6000cf78e7))

# [2.0.0-next.135](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.134...@farfetch/blackout-client@2.0.0-next.135) (2022-03-21)

### Features

- **react:** update renderContent method ([48911a4](https://github.com/Farfetch/blackout/commit/48911a49eaeb09f82781ae776479ba22a8cff8eb))

# [2.0.0-next.134](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.133...@farfetch/blackout-client@2.0.0-next.134) (2022-03-18)

### Bug Fixes

- **analytics|react:** fix typescript typings ([0294198](https://github.com/Farfetch/blackout/commit/02941985161075aa676cd51183480cfcfe2900dd))

# [2.0.0-next.133](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.132...@farfetch/blackout-client@2.0.0-next.133) (2022-02-22)

### Features

- **client|redux:** add order activities endpoints ([e15afcd](https://github.com/Farfetch/blackout/commit/e15afcdab73339dd3873e3145d2004766cfbcf10))

# [2.0.0-next.132](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.131...@farfetch/blackout-client@2.0.0-next.132) (2022-02-22)

### Features

- **client|redux:** convert subscription area from js to ts ([6b623e4](https://github.com/Farfetch/blackout/commit/6b623e4b580c93089e82dbdc702442305cc9ff44))

# [2.0.0-next.131](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.130...@farfetch/blackout-client@2.0.0-next.131) (2022-02-14)

### Features

- **client|redux:** convert orders files to typescript ([6066925](https://github.com/Farfetch/blackout/commit/6066925eb8c9bb01341d8809cee93634ce413e74))

# [2.0.0-next.130](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.129...@farfetch/blackout-client@2.0.0-next.130) (2022-02-11)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.129](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.128...@farfetch/blackout-client@2.0.0-next.129) (2022-02-04)

### Features

- **redux:** improve actions of 'users' ([aa976a2](https://github.com/Farfetch/blackout/commit/aa976a2e0abd4040b6644beb799db1468ec7135e))

# [2.0.0-next.128](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.127...@farfetch/blackout-client@2.0.0-next.128) (2022-02-03)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.127](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.126...@farfetch/blackout-client@2.0.0-next.127) (2022-02-02)

### Bug Fixes

- **client|redux:** save pickup capabilities time slots ([80bcdb8](https://github.com/Farfetch/blackout/commit/80bcdb842696616b61a8915dd6a7aa195161e837))

# [2.0.0-next.126](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.125...@farfetch/blackout-client@2.0.0-next.126) (2022-01-31)

### Features

- **client|redux:** add new unsubscribe client ([a82f004](https://github.com/Farfetch/blackout/commit/a82f00481100fa74d03c124a39f2a8b5e7978ad2))

# [2.0.0-next.125](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.124...@farfetch/blackout-client@2.0.0-next.125) (2022-01-28)

### Features

- **client|redux:** orders - split core and redux ([60580f6](https://github.com/Farfetch/blackout/commit/60580f603d6db9691baff76b1390024572c637d2))

# [2.0.0-next.124](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.123...@farfetch/blackout-client@2.0.0-next.124) (2022-01-26)

### Features

- **client|redux:** reset orders data on logout ([cd23bdd](https://github.com/Farfetch/blackout/commit/cd23bddb63606f10aced2a9ade0965765192cee1))

# [2.0.0-next.123](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.122...@farfetch/blackout-client@2.0.0-next.123) (2022-01-20)

### Features

- **client|redux:** convert recommended area from js to ts … ([d86eca2](https://github.com/Farfetch/blackout/commit/d86eca2e9dc84f587d16b96cee701c1b56d2882e))

# [2.0.0-next.122](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.121...@farfetch/blackout-client@2.0.0-next.122) (2022-01-20)

### Features

- **client|redux:** implement new return endpoint ([3442fe4](https://github.com/Farfetch/blackout/commit/3442fe4d8d6da46b427e6104a20cfdcd184767f2))

### BREAKING CHANGES

- **client|redux:** - Changed pickupCapabilities endpoint. Instead of a query, now
  it should receive the pickup day in the format YYYY-MM-DD.

# [2.0.0-next.121](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.120...@farfetch/blackout-client@2.0.0-next.121) (2022-01-19)

### Features

- **client|redux:** convert recently viewed area from js to ts ([d80258c](https://github.com/Farfetch/blackout/commit/d80258c3c21038f3464f32f61b53b7398a8da9ff))

# [2.0.0-next.120](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.119...@farfetch/blackout-client@2.0.0-next.120) (2022-01-19)

### Features

- **client:** create client search translations ([997a703](https://github.com/Farfetch/blackout/commit/997a703e893a2146d1d0c70b0b1c56baabdd4cde))

# [2.0.0-next.119](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.118...@farfetch/blackout-client@2.0.0-next.119) (2022-01-19)

### Features

- **client:** add mock service worker contents ([54b78da](https://github.com/Farfetch/blackout/commit/54b78da5ef471e25bf31a51a000431e2eecfe81f))

# [2.0.0-next.118](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.117...@farfetch/blackout-client@2.0.0-next.118) (2022-01-17)

### Bug Fixes

- **client:** add `id` to the set type ([b1bb52c](https://github.com/Farfetch/blackout/commit/b1bb52ce13f06e0f4de510c6c8b3f1769a54a252))

# [2.0.0-next.117](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.116...@farfetch/blackout-client@2.0.0-next.117) (2022-01-14)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.116](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.115...@farfetch/blackout-client@2.0.0-next.116) (2022-01-13)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.115](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.114...@farfetch/blackout-client@2.0.0-next.115) (2022-01-12)

### Features

- **client:** add more commerce pages types ([66bcc2c](https://github.com/Farfetch/blackout/commit/66bcc2cf28925c64ecc0bc687012d03547a7c3b4))

# [2.0.0-next.114](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.113...@farfetch/blackout-client@2.0.0-next.114) (2022-01-12)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.113](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.112...@farfetch/blackout-client@2.0.0-next.113) (2022-01-11)

### Features

- **client|redux:** convert forms area to ts ([43c4a73](https://github.com/Farfetch/blackout/commit/43c4a7353f2bb36cab43bbcdc8c70cd61c06aef7))

# [2.0.0-next.112](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.111...@farfetch/blackout-client@2.0.0-next.112) (2022-01-11)

### Features

- **redux|client:** add additional user attributes client ([86f2455](https://github.com/Farfetch/blackout/commit/86f2455a9730ad457dd049a8a59d21f31d83f1b7))

# [2.0.0-next.111](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.110...@farfetch/blackout-client@2.0.0-next.111) (2022-01-07)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.110](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.109...@farfetch/blackout-client@2.0.0-next.110) (2021-12-27)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.109](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.108...@farfetch/blackout-client@2.0.0-next.109) (2021-12-23)

### Features

- change loyalty actions nomenclature ([bad8581](https://github.com/Farfetch/blackout/commit/bad8581febc9b5a645f2d1ceabe82285653f71a0))

# [2.0.0-next.108](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.107...@farfetch/blackout-client@2.0.0-next.108) (2021-12-21)

### Features

- **client|redux:** general mocks - returns ([1d385be](https://github.com/Farfetch/blackout/commit/1d385be8ff8d3c9e0b88e0f0e746d53ef3cefdc4))
- **client|redux:** split core & redux returns ([ebff34d](https://github.com/Farfetch/blackout/commit/ebff34d2faa547be6aeaa3b19294959f97ce9992))

# [2.0.0-next.107](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.106...@farfetch/blackout-client@2.0.0-next.107) (2021-12-15)

### Features

- **client:** add `promotionEvaluations` client ([7db4408](https://github.com/Farfetch/blackout/commit/7db440808e90ab83a398e7c929d4b6b5c97cfab1))

# [2.0.0-next.106](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.105...@farfetch/blackout-client@2.0.0-next.106) (2021-12-14)

### Features

- **client|redux:** remove getGuestOrderDetails from next ([36a9660](https://github.com/Farfetch/blackout/commit/36a96606e66190c96114ed0e1741d8a1af462a2b))

# [2.0.0-next.105](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.104...@farfetch/blackout-client@2.0.0-next.105) (2021-12-09)

### Features

- **client|redux:** loyalty - split client ([6d36e03](https://github.com/Farfetch/blackout/commit/6d36e035865916cdf5aa5b6e5341f9ca3963d632))

# [2.0.0-next.104](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.103...@farfetch/blackout-client@2.0.0-next.104) (2021-12-07)

### Bug Fixes

- **core|react:** handle guest users expired in authentication provider ([447ed49](https://github.com/Farfetch/blackout/commit/447ed4962b696bf992052424e94f2a211ebc06d9))

# [2.0.0-next.103](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.102...@farfetch/blackout-client@2.0.0-next.103) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-client

# [2.0.0-next.102](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.101...@farfetch/blackout-client@2.0.0-next.102) (2021-12-06)

### Features

- **client|redux:** profile - rename API and client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))

# [2.0.0-next.101](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.100...@farfetch/blackout-client@2.0.0-next.101) (2021-12-02)

### Features

- **client:** change nomenclature and improve orders actions ([312ca96](https://github.com/Farfetch/blackout/commit/312ca9671ff194894105e758be9d0b4a3f013357))

### BREAKING CHANGES

- **client:** - Rename the action types if you use them in any custom reducer/middleware:

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

# [2.0.0-next.100](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.99...@farfetch/blackout-client@2.0.0-next.100) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-client

# 2.0.0-next.99 (2021-11-29)

### Features

- migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))
