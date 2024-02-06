# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.21.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.20.0...@farfetch/blackout-react@1.21.0) (2024-02-06)

### Bug Fixes

- fix useUser hook infinite loading ([bc7bc5d](https://github.com/Farfetch/blackout/commit/bc7bc5df4150955372327cac46627cabc35a4503))

### Features

- add parity between ga4 and gtm for main ([7359ea3](https://github.com/Farfetch/blackout/commit/7359ea3c1629eeaf434ed23f57bc789a1b4b8177))

# [1.20.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.19.3...@farfetch/blackout-react@1.20.0) (2024-01-30)

### Bug Fixes

- fix tracking of uniqueViewId and previousUniqueViewId in analytics ([5873590](https://github.com/Farfetch/blackout/commit/5873590468b03d1c18cb441e0d34a36f98a93876))

### Features

- analytics referrer attribution spa on `main` ([e9b73a8](https://github.com/Farfetch/blackout/commit/e9b73a840e71a61ea276afb68f08509617e51399))
- create useUserCredit hook ([5bb8b29](https://github.com/Farfetch/blackout/commit/5bb8b297b08ff976b4cb19a88a840187f00aba58))
- join relatedCommercedata with editorial data ([6df0a30](https://github.com/Farfetch/blackout/commit/6df0a3064638ab92529f97b3847e4704adb828c7))

## [1.19.3](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.19.2...@farfetch/blackout-react@1.19.3) (2024-01-17)

**Note:** Version bump only for package @farfetch/blackout-react

## [1.19.2](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.19.1...@farfetch/blackout-react@1.19.2) (2024-01-16)

**Note:** Version bump only for package @farfetch/blackout-react

## [1.19.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.19.0...@farfetch/blackout-react@1.19.1) (2024-01-15)

### Bug Fixes

- fix `productsList` schema ([c9e0f50](https://github.com/Farfetch/blackout/commit/c9e0f50d0b1203c20da7ecfcd77278c211197a05))

# [1.19.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.18.1...@farfetch/blackout-react@1.19.0) (2024-01-09)

### Bug Fixes

- add profix: add product aggregator id to the add item to bag ([668c67e](https://github.com/Farfetch/blackout/commit/668c67e8cbd4447e56aaf5f1243687c580e9efc6))
- **react:** add id validation before add to bag and wishlist ([f17eb9e](https://github.com/Farfetch/blackout/commit/f17eb9e23d8d7eabbad4e61feef5d48ce4b6f4f9))

### Features

- add search changes to analytics events for main ([c97cb9a](https://github.com/Farfetch/blackout/commit/c97cb9a7b29db338962416e6a8a1aa21b3cdca38))
- add support to consent management protocol v2 to `main` ([005c894](https://github.com/Farfetch/blackout/commit/005c894716c0ff10156bd41be0511bc6457dbd2e))

## [1.18.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.18.0...@farfetch/blackout-react@1.18.1) (2023-12-15)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.18.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.17.0...@farfetch/blackout-react@1.18.0) (2023-12-12)

### Features

- add itemListName parameter to analytics events main ([192ab69](https://github.com/Farfetch/blackout/commit/192ab69856720f1da6ec23ab0a880289326397db))

# [1.17.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.16.0...@farfetch/blackout-react@1.17.0) (2023-12-05)

### Bug Fixes

- url encode text resources in getSearchRedirectUrl ([38be180](https://github.com/Farfetch/blackout/commit/38be18039f1ac7bb85337e51577fdecfe9eb4cdc))

### Features

- add new parameters to interact content event main ([b853f03](https://github.com/Farfetch/blackout/commit/b853f03f16b9076af1d93647be46a21934c91ad5))
- add type in delivery bundle ([3277960](https://github.com/Farfetch/blackout/commit/327796031fdc75d93713d60c1a5f4f9b58da9dfd))
- **react-client:** Exposes delivery bundles in hook of use checkout ([3f6ed8b](https://github.com/Farfetch/blackout/commit/3f6ed8b7535c59aee2902ee915116d5298d0974f))

# [1.16.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.15.0...@farfetch/blackout-react@1.16.0) (2023-11-21)

### Bug Fixes

- **react:** fix hooks making multiple requests ([d2c6b9d](https://github.com/Farfetch/blackout/commit/d2c6b9dc6e55ce391b699279dff53ab4cfdf0c29))
- save exchanges filters by id ([e1959ba](https://github.com/Farfetch/blackout/commit/e1959bac6eefb6405d9e623d38b2f7a698e21c07))

### BREAKING CHANGES

- - Exchange filters are now stored under entities by orderItemUuid (shippingOrderLineId).
    Previously the user wasn't able to fetch multiple filters because each request cleared
    the previous data, which this PR aims to fix.

* useCreateExchangeFilter hook renamed to useExchangeFilters.
* isCreating selector from the hook, renamed to isLoading.

# [1.15.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.14.0...@farfetch/blackout-react@1.15.0) (2023-11-15)

### Features

- add review checkout analytics event to main ([4a080eb](https://github.com/Farfetch/blackout/commit/4a080ebd70734e945074514ef728d41273ca182a))

# [1.14.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.12.0...@farfetch/blackout-react@1.14.0) (2023-11-08)

### Features

- add checkout step to analytics events main ([2d4bd6a](https://github.com/Farfetch/blackout/commit/2d4bd6a78b29771e48e782c91c16f27713e15e40))
- add isMainWishlist parameter to main ([923a37c](https://github.com/Farfetch/blackout/commit/923a37c93aedd76eb8ebee453429f250b39562d4))
- add new locations to Analytics FROM types for `main` ([7193846](https://github.com/Farfetch/blackout/commit/7193846699e4f3ba9eb3045de35242355de012fb))
- add parameters to interact content event for `main` ([e4bd28e](https://github.com/Farfetch/blackout/commit/e4bd28ef88c812ae62c499231e91271220a25ad1))
- add parameters to payment info added event ([42e5ea1](https://github.com/Farfetch/blackout/commit/42e5ea143aaf5ea3b436909efeebad0c070ced83))
- add site performance measuring event to analytics ([ed9dec1](https://github.com/Farfetch/blackout/commit/ed9dec17ab982532c323e3455abb67c8f067fc80))
- **analytics|react:** update recommendations tracking parameters ([3ec76e2](https://github.com/Farfetch/blackout/commit/3ec76e24db505697af618f78b7a840b8b7ddd9b2))
- update forter script ([3759e65](https://github.com/Farfetch/blackout/commit/3759e65c8315f58163c51a91de842f928caba8b4))

# [1.13.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.12.0...@farfetch/blackout-react@1.13.0) (2023-11-08)

### Features

- add checkout step to analytics events main ([2d4bd6a](https://github.com/Farfetch/blackout/commit/2d4bd6a78b29771e48e782c91c16f27713e15e40))
- add isMainWishlist parameter to main ([923a37c](https://github.com/Farfetch/blackout/commit/923a37c93aedd76eb8ebee453429f250b39562d4))
- add new locations to Analytics FROM types for `main` ([7193846](https://github.com/Farfetch/blackout/commit/7193846699e4f3ba9eb3045de35242355de012fb))
- add parameters to interact content event for `main` ([e4bd28e](https://github.com/Farfetch/blackout/commit/e4bd28ef88c812ae62c499231e91271220a25ad1))
- add parameters to payment info added event ([42e5ea1](https://github.com/Farfetch/blackout/commit/42e5ea143aaf5ea3b436909efeebad0c070ced83))
- add site performance measuring event to analytics ([ed9dec1](https://github.com/Farfetch/blackout/commit/ed9dec17ab982532c323e3455abb67c8f067fc80))
- **analytics|react:** update recommendations tracking parameters ([3ec76e2](https://github.com/Farfetch/blackout/commit/3ec76e24db505697af618f78b7a840b8b7ddd9b2))
- update forter script ([3759e65](https://github.com/Farfetch/blackout/commit/3759e65c8315f58163c51a91de842f928caba8b4))

# [1.12.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.11.1...@farfetch/blackout-react@1.12.0) (2023-09-19)

### Features

- **react:** user closets hooks ([4ff2dce](https://github.com/Farfetch/blackout/commit/4ff2dce047dfff071ee1b89c4912918d5222765d))

## [1.11.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.11.0...@farfetch/blackout-react@1.11.1) (2023-09-13)

### Bug Fixes

- **analytics:** remove analytics API consent dependency ([833782b](https://github.com/Farfetch/blackout/commit/833782bfe3dfc5ecb59d19219385e5d7baa939e8))
- fix social login actions ([88ead15](https://github.com/Farfetch/blackout/commit/88ead15539170524ae852041e1b50a653e72b8b1))

# [1.11.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.10.0...@farfetch/blackout-react@1.11.0) (2023-09-07)

### Features

- **react:** add useSocialLogin hook ([6ecbd58](https://github.com/Farfetch/blackout/commit/6ecbd58c67a38787903e24bd5fec22bf9c358778))

# [1.10.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.9.0...@farfetch/blackout-react@1.10.0) (2023-08-31)

### Features

- **analytics|react:** update omnitracking integration to work on the server ([55337b5](https://github.com/Farfetch/blackout/commit/55337b5f4617d2b546e30f4e956e538fc7ce2ddf))

# [1.9.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.8.1...@farfetch/blackout-react@1.9.0) (2023-08-28)

### Features

- add delete promocode endpoint ([5ccde47](https://github.com/Farfetch/blackout/commit/5ccde47bb74253d51da04d5beb8ac39dcd6d0fe7))

## [1.8.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.8.0...@farfetch/blackout-react@1.8.1) (2023-08-18)

### Bug Fixes

- thumbnail index export ([24997a2](https://github.com/Farfetch/blackout/commit/24997a2b0be4e646b1150c893916cb4f312604c7))

# [1.8.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.7.0...@farfetch/blackout-react@1.8.0) (2023-08-17)

### Features

- add thumbnail component and adapt components to it ([7b1948a](https://github.com/Farfetch/blackout/commit/7b1948afb5bdb65cbb5675482ee8286e143e2b8c))

# [1.7.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.6.1...@farfetch/blackout-react@1.7.0) (2023-08-08)

### Features

- **react:** use contacts hook ([9ace3f3](https://github.com/Farfetch/blackout/commit/9ace3f30b21b22d13bc170b434bd8b63e6ac8aea))

## [1.6.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.6.0...@farfetch/blackout-react@1.6.1) (2023-08-03)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.6.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.5.1...@farfetch/blackout-react@1.6.0) (2023-08-02)

### Features

- remove invalid fields on ga4 integration for main ([31bead4](https://github.com/Farfetch/blackout/commit/31bead43774df2d1ea41185f5c6853457685ce61))

## [1.5.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.5.0...@farfetch/blackout-react@1.5.1) (2023-07-25)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.5.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.4.3...@farfetch/blackout-react@1.5.0) (2023-07-25)

### Features

- setup product listing facets redux structure ([3d759ce](https://github.com/Farfetch/blackout/commit/3d759ced9902d5dec89e166e7bc8e7282b770821))

## [1.4.3](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.4.2...@farfetch/blackout-react@1.4.3) (2023-07-17)

**Note:** Version bump only for package @farfetch/blackout-react

## [1.4.2](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.4.1...@farfetch/blackout-react@1.4.2) (2023-07-13)

### Bug Fixes

- fix types ([8ee62ae](https://github.com/Farfetch/blackout/commit/8ee62aed175b371d1914b9899d6226b92d3d1fd3))

## [1.4.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.4.0...@farfetch/blackout-react@1.4.1) (2023-07-06)

### Bug Fixes

- fix `useBag` wrong call to `handleFullUpdate` ([62570fe](https://github.com/Farfetch/blackout/commit/62570fe78cf4e718cf8a797c9b82f4d2b8622444))

# [1.4.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.3.0...@farfetch/blackout-react@1.4.0) (2023-06-29)

### Features

- implement eircode validation ([954d9ee](https://github.com/Farfetch/blackout/commit/954d9ee651b72bfc05171513ad08b1a56c25650a))
- **react:** create useOrderShippingAddressChangeRequest hook ([679c16c](https://github.com/Farfetch/blackout/commit/679c16c2c088dd47fc1715e6d15dd6e7bab66d6c))

# [1.3.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.2.2...@farfetch/blackout-react@1.3.0) (2023-06-21)

### Bug Fixes

- add promocodes prop in bag types ([b8eb870](https://github.com/Farfetch/blackout/commit/b8eb87067938d829948c5faae120c80e50577f53))

### Features

- **react:** add exchanges hooks ([15db4fc](https://github.com/Farfetch/blackout/commit/15db4fc23938581a7aba2e813fc7cecb4b0cccde))
- **react:** add new hook for themes ([866f74a](https://github.com/Farfetch/blackout/commit/866f74aa671a5bd96f57db31e083899cfa9808b7))

## [1.2.2](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.2.1...@farfetch/blackout-react@1.2.2) (2023-06-14)

**Note:** Version bump only for package @farfetch/blackout-react

## [1.2.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.2.0...@farfetch/blackout-react@1.2.1) (2023-06-06)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.2.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.1.2...@farfetch/blackout-react@1.2.0) (2023-06-06)

### Features

- add checkout step to analytics event ([ef79cbb](https://github.com/Farfetch/blackout/commit/ef79cbb36a84d7f470a3e752bf518a0adcca66e1))
- **react:** add legacy guest flow to useUserReturns hook ([0e01ccf](https://github.com/Farfetch/blackout/commit/0e01ccf726a4718c02ecc67ce3978ae05bbe9b14))

## [1.1.2](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.1.1...@farfetch/blackout-react@1.1.2) (2023-05-30)

**Note:** Version bump only for package @farfetch/blackout-react

## [1.1.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.1.0...@farfetch/blackout-react@1.1.1) (2023-05-30)

### Bug Fixes

- send metadata to bag endpoints in useBag hook ([3bbc65c](https://github.com/Farfetch/blackout/commit/3bbc65c555b8718ba75e9f4c893f7d4519c33f57))
- separate internal metadata parameters from external in useBag ([e9f8b59](https://github.com/Farfetch/blackout/commit/e9f8b597d9c5ddf20219e22f13a927a918ee4ab4))

# [1.1.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.1...@farfetch/blackout-react@1.1.0) (2023-05-23)

### Features

- **analytics|react:** update order completed analytics event ([b65d7a5](https://github.com/Farfetch/blackout/commit/b65d7a5ad26b962749c4cfecdfcbb4e0fcb6a4b2))

## [1.0.1](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0...@farfetch/blackout-react@1.0.1) (2023-05-19)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.429...@farfetch/blackout-react@1.0.0) (2023-05-18)

### Bug Fixes

- added reset function to reset auth state on react-core ([92f68fc](https://github.com/Farfetch/blackout/commit/92f68fc773403b16944d08bba755d3a0adfc6620))
- **blackout-core:** fix logout in axios interceptor ([ebe7738](https://github.com/Farfetch/blackout/commit/ebe7738e4b09f412a049d5938816709229a2c1f3))
- **blackout-react:** fix Castle2.0 createdDate parameter ([ed0906e](https://github.com/Farfetch/blackout/commit/ed0906e9dc3d4bc27e3dbc30a1cfa5cf05dccb5e))
- **blackout-react:** fix missing event name parameter for Zaraz events ([f122207](https://github.com/Farfetch/blackout/commit/f122207222dd06a04861f413a3c68d7aae298663))
- **blackout-react:** fix missing ga4 sort option schema ([6a58db7](https://github.com/Farfetch/blackout/commit/6a58db7f3946beeda81f67ca99bb223cfe92f12f))
- **blackout-react:** ignore unhandled events in ga/ga4 ([27662d1](https://github.com/Farfetch/blackout/commit/27662d1517c02db92487ca31c960343302f0298e))
- **blackout-react:** remove Castle's default Date when no valid 'createdDate' is passed ([66b8517](https://github.com/Farfetch/blackout/commit/66b8517a6384177effd326a21dfd376567928251))
- **blackout-react:** use env instead of host ([2f24011](https://github.com/Farfetch/blackout/commit/2f24011e748099c2e38dc6d1e2c194a3157d2b1c))
- change to 'live' ([cf2204d](https://github.com/Farfetch/blackout/commit/cf2204dffe49ae3e59a2f5edc2bc0ce87e77680a))
- **core|react:** fix checkout steps mapping for GA4 and omnitracking parity ([9b2faad](https://github.com/Farfetch/blackout/commit/9b2faadaa43e0d7ce40016fec0b940e6ceb79900))
- **core|react:** fix filters events ([5c64476](https://github.com/Farfetch/blackout/commit/5c64476c624cf21d2d0acc78acd749eb7bf1ca6e))
- **core|react:** fix omnitracking's clientLanguage and clientCountry parameters ([fa79072](https://github.com/Farfetch/blackout/commit/fa7907294224757e14d0d3e7ebbf5ad54241148a))
- **core|react:** fixed GA4 mappings and improved wishlist middleware ([10cb459](https://github.com/Farfetch/blackout/commit/10cb4599b4e7157461c771f142882d8ee86edf01))
- **core|react:** handle guest users expired in authentication provider ([5270108](https://github.com/Farfetch/blackout/commit/527010839b0453b91454a293d5805740f7bdcbac))
- **core|react:** hash creation on content pages ([b5ea2b9](https://github.com/Farfetch/blackout/commit/b5ea2b9a74ac6ec3505fed4f4f5af96d3ed08735))
- **core|redux:** fix hash creation for pagination props and commercepages ([1948e2d](https://github.com/Farfetch/blackout/commit/1948e2df571bbff80a450519c4d0347ee269bcba))
- fix analytics 'pageLocationReferrer' context ([7cb7824](https://github.com/Farfetch/blackout/commit/7cb7824e9309528d1230e4e621095be402ea279a))
- fix ga4 events ([266f694](https://github.com/Farfetch/blackout/commit/266f6948a2077ccd7753c4dc6ae9e4816a8b7be2))
- fix ga4 promocode_applied event schema ([dea348e](https://github.com/Farfetch/blackout/commit/dea348e2d2c4e3697c90808c4791bd06be8af801))
- only use the `resources` to build the `searchRedirectUrl` if they exist ([06912f6](https://github.com/Farfetch/blackout/commit/06912f67dafd8e4b188cf440350d3b769fd729e7))
- **react|redux:** useSEO hook looping requests ([4dc53dd](https://github.com/Farfetch/blackout/commit/4dc53dda9f142bf24c7e932d5e2a5a75ed1af5fc))
- **react:** add `from` to PRODUCT_CLICKED event mapping in GA4 ([b99b74d](https://github.com/Farfetch/blackout/commit/b99b74d615f0d209fc03473fa4ad7950d46227a5))
- **react:** add lodash map to render content ([1dc1a74](https://github.com/Farfetch/blackout/commit/1dc1a74c0a6a12e06debeb785880f77f3e4e44fe))
- **react:** add missing export on vitorino ([10ba46a](https://github.com/Farfetch/blackout/commit/10ba46a4174512c70ba92c354de5995822adedbf))
- **react:** add missing orderId parameter on order_completed event ([0865cf7](https://github.com/Farfetch/blackout/commit/0865cf7167ab5b020ae7b4ae76978e0e72c3e279))
- **react:** add page context to GA4 events ([582da03](https://github.com/Farfetch/blackout/commit/582da03a28eecff7dc5a608d0b0abcb1dd499a59))
- **react:** add set user on ga4 initialization ([3d4c6e9](https://github.com/Farfetch/blackout/commit/3d4c6e90854ced92afcbbe23b13a8426fef93195))
- **react:** added isLoading to content page hook to prevent infinite loops ([73f30bd](https://github.com/Farfetch/blackout/commit/73f30bd7ab04a16d05d28841ed53206c37e4e536))
- **react:** allow `useBagItem`'s to work without `productAggregator` ([b5c4d04](https://github.com/Farfetch/blackout/commit/b5c4d0418d29a5c656cb4325b8a498077f8a4c43))
- **react:** base components ([07bbf2b](https://github.com/Farfetch/blackout/commit/07bbf2b7dae6ab65de8f80a35eb02d8caf681789))
- **react:** change handle delete bag item parameters ([6a1ce1c](https://github.com/Farfetch/blackout/commit/6a1ce1c8dc3fd128b0d71e46ae24e45374520890))
- **react:** change percentageScrolled parameter type to number ([8dfbc10](https://github.com/Farfetch/blackout/commit/8dfbc10e03c60dbb0762169cfc8cd376d9c3cd13))
- **react:** fix GA4 integration not firing PRODUCT_UPDATED.CHANGE_QUANTITY when quantity is 0 ([8353e42](https://github.com/Farfetch/blackout/commit/8353e4208f441d51f1e1c180eacf4bde451a2832))
- **react:** fix GA4 page and event tracking ([b736515](https://github.com/Farfetch/blackout/commit/b736515577f7d5887ea436503f33810e1e6fe45f))
- **react:** fix interact content payload in GA4 ([91652f6](https://github.com/Farfetch/blackout/commit/91652f666c024ec702f89d680d414af72bd99be2))
- **react:** minor fixes to custom events schemas and mappings ([23a59fe](https://github.com/Farfetch/blackout/commit/23a59fed253f2567c933f23e4e7a71e02fb24f40))
- **react:** remove `items` parameter workaround for custom events ([6b15984](https://github.com/Farfetch/blackout/commit/6b159848278723a6b6694270da9009a9c357d6cb))
- **react:** remove sandbox forter shop ([1c87c5a](https://github.com/Farfetch/blackout/commit/1c87c5ac757e7742a3ddec4fc2fb2d6c8cacc79a))
- **react:** remove unnecessary custom GA script validation ([3b4d95d](https://github.com/Farfetch/blackout/commit/3b4d95da21ed947eebde6333fd931da314fb81ea))
- **react:** resolving ga4 value field floating point issue ([0e008f6](https://github.com/Farfetch/blackout/commit/0e008f6e60fc8dc2e0485941b9eef3edd0ea28ce))
- **react:** truncate categories if the categories sent are greater than limit ([7181b2f](https://github.com/Farfetch/blackout/commit/7181b2f95556abb8a1bea0c1984320e68f573699))
- **react:** update integration options contract ([219459b](https://github.com/Farfetch/blackout/commit/219459ba920220cc2737d576b3cdb3bd5155742d))
- refactor serverInitialState ([f1a1f87](https://github.com/Farfetch/blackout/commit/f1a1f878ff98833e0fe818f51a0eb9368e601dd8))
- remove GA4 non essential events ([c053eda](https://github.com/Farfetch/blackout/commit/c053eda69b124995444422f7b9ff5a60a97e3c03))

### Features

- add index parameter to events ([2f9b0e8](https://github.com/Farfetch/blackout/commit/2f9b0e8392db4fc43a6d00751557e78f2e4de1f8))
- add parameters add address info event ([5c75846](https://github.com/Farfetch/blackout/commit/5c758466c2a8ae9c13c3f22073d79d27a7b2af6b))
- add parameters add shipping info event ([95cd456](https://github.com/Farfetch/blackout/commit/95cd456c16099ab19b8a7ee4b68a4cdfd8cc35fc))
- add parameters add shipping method event ([037712c](https://github.com/Farfetch/blackout/commit/037712c1c3c17eaf0076042e0c0686beb79421cf))
- add parameters checkout abandoned event ([b4aae5c](https://github.com/Farfetch/blackout/commit/b4aae5c4a5e5bcf6ac4cb524293e96a59fcfacf1))
- **analytics:** remove percentage in scroll event ([dd7875e](https://github.com/Farfetch/blackout/commit/dd7875e54565913d7721f4e1901af68cd37933ce))
- **blackout-react:** add checkout events mappings to Zaraz ([9bfa98c](https://github.com/Farfetch/blackout/commit/9bfa98c71286544534c71d88f5aa8d9917181117))
- **blackout-react:** add product added to cart/wishlist mappings in Zaraz ([f4639f2](https://github.com/Farfetch/blackout/commit/f4639f2b7cf2b63663058a7487d6134e7f3aa6d6))
- **blackout-react:** add product viewed/search mappings in Zaraz ([94337a4](https://github.com/Farfetch/blackout/commit/94337a47a980844ee54711a9a0fade7a33b85d65))
- **blackout-react:** add support multigender ga4's signup newsletter ([6feae4f](https://github.com/Farfetch/blackout/commit/6feae4f451374ce1c75f688b346cfefa3b670372))
- **blackout-react:** add Zaraz integration ([f29a445](https://github.com/Farfetch/blackout/commit/f29a44590ebfecdd85b3cc1940ba8f52efc5b18c))
- **blackout-react:** implement signup form completed mappings in zaraz ([ad66df0](https://github.com/Farfetch/blackout/commit/ad66df0a188f34cacfeb5f510ddea9e0a2c266d7))
- **core|react:** add analytics SPA page referrer context ([8d3005d](https://github.com/Farfetch/blackout/commit/8d3005da2ee48bd7f6c2fc62844bf751278dceaf))
- **core|react:** add billing info added event ([8027181](https://github.com/Farfetch/blackout/commit/8027181700d05cf341a4401920bf5557b209f1c5))
- **core|react:** add delivery method added event ([513b446](https://github.com/Farfetch/blackout/commit/513b44670f27d6b3b8ae75442e6b316ed98b048d))
- **core|react:** add location id parameter on analytics product events ([54ca354](https://github.com/Farfetch/blackout/commit/54ca354a941b97071af95b6da4c0fbb43f96b146))
- **core|react:** add package version to analytics ([788a10c](https://github.com/Farfetch/blackout/commit/788a10c1b1d5140cb6df5f2bd92e79ed1c648eb3))
- **core|react:** add parameters checkout started event ([82eb362](https://github.com/Farfetch/blackout/commit/82eb362ba887af387c31fa1685f5742969e5df98))
- **core|react:** add parameters edit checkout step event ([d6d5cad](https://github.com/Farfetch/blackout/commit/d6d5cada556cddafaa462310419908f7e87695b4))
- **core|react:** add signup newsletter event mappings in GA4 ([3603cc7](https://github.com/Farfetch/blackout/commit/3603cc7aab1affa545f3c8f37b09325f12826a0f))
- **core|react:** add support for GA4 custom events ([e8416ca](https://github.com/Farfetch/blackout/commit/e8416ca9011de97b567e8ffc3d34bf93c9229eda))
- **core|react:** add unique id to GTM integration ([0e535e9](https://github.com/Farfetch/blackout/commit/0e535e9c5cd233edffef6ee9371c6c3b70daaeee))
- **core|react:** allow analytics to work with any consent categories ([18ee8f3](https://github.com/Farfetch/blackout/commit/18ee8f322ca176760ef77d5185567f85ed235547))
- **core|react:** analytics improvements ([d461155](https://github.com/Farfetch/blackout/commit/d461155f8400e5beef34039b1c39a21b9f4cc01d))
- **core|react:** normalize property of productId on Analytics ([cd4ef37](https://github.com/Farfetch/blackout/commit/cd4ef37b2f9a17627b545950efe6d48ecda6c9b2))
- **core|react:** setup promocode applied analytics event ([ec78acc](https://github.com/Farfetch/blackout/commit/ec78acc9fd8446196a2dc3c0b2be6fd918cd3f2e))
- **core|react:** share uuid between omnitracking and google analytics 4 ([178f15e](https://github.com/Farfetch/blackout/commit/178f15e42c2ad5158ada84d2701afea145920044))
- **core:** add exchanges endpoints ([9add8b4](https://github.com/Farfetch/blackout/commit/9add8b4619848b2747deeed2d59b940f6d95be89))
- **core:** add new client contentpages ([c21896c](https://github.com/Farfetch/blackout/commit/c21896c80a4b0afecfc57c53b0ed09d443cbe077))
- **core:** add omnitracking's signup newsletter mappings ([0ad25d4](https://github.com/Farfetch/blackout/commit/0ad25d497c349555996a0383850b8bfe3fb55e1b))
- **core:** add post guest orders endpoint ([a6d753e](https://github.com/Farfetch/blackout/commit/a6d753ebe0a54ef3956d214fdae8a5633ef07a58))
- **react:** add allow trigger ga4's change size event on first selection of size ([d216943](https://github.com/Farfetch/blackout/commit/d216943d65812319fd387371784a0fc3ac7ce431))
- **react:** add base components to render components ([698b3f0](https://github.com/Farfetch/blackout/commit/698b3f05cebd514b516ad6db95334b44425b82e7))
- **react:** add castle 2.0 analytics' integration ([66d7b7e](https://github.com/Farfetch/blackout/commit/66d7b7e6c07384720fa47d0b78d7359ea2eafc8b))
- **react:** add custom user id property option ([3c83db9](https://github.com/Farfetch/blackout/commit/3c83db93624a688fdf47683552a9a21492a0f8db))
- **react:** add deprecation warning for Zaraz ([f5815be](https://github.com/Farfetch/blackout/commit/f5815be69ec199e63780a3a7a7e3e8589a7694dc))
- **react:** add exports contents ([bda521a](https://github.com/Farfetch/blackout/commit/bda521a4caf30a220c720c723c4254b44352b1ed))
- **react:** add GA4 custom scroll event mappings ([097fc52](https://github.com/Farfetch/blackout/commit/097fc522e3debc1be7dd23c17ced5c24d5c37f69))
- **react:** add more base components ([397d2e2](https://github.com/Farfetch/blackout/commit/397d2e2d33b8f5fff7189f95fb5ed6a8e79d5a92))
- **react:** add parameter path_clean on GA4 view_page event ([e5dd7f0](https://github.com/Farfetch/blackout/commit/e5dd7f0ee9185b69030e4797ca0d9f5ad510509a))
- **react:** add password strength helper ([11a3e72](https://github.com/Farfetch/blackout/commit/11a3e727a8a4fde4c95b4a294afeba61e4311d11))
- **react:** add productAggregatorId to add to bag requests ([22f86e6](https://github.com/Farfetch/blackout/commit/22f86e66e8a32e9dd124c5b4a3be0343c12ecdc6))
- **react:** create hook commerce pages ([fe333d2](https://github.com/Farfetch/blackout/commit/fe333d21c72b09823170745303e2463de17b1df1))
- **react:** expose Vitorino network option ([458d1a5](https://github.com/Farfetch/blackout/commit/458d1a5923f0137b9971078432c9d31b243ba2d4))
- **react:** include new params hook useContentType ([c6e51bc](https://github.com/Farfetch/blackout/commit/c6e51bc7109b2d584c74e579edaec3792ebdc199))
- **react:** remove castle pageview event tracking ([b2143a4](https://github.com/Farfetch/blackout/commit/b2143a497bb17842d88532d9a27bf7ae9c9f4ccc))
- **react:** remove vitorino from external script ([c65c5d2](https://github.com/Farfetch/blackout/commit/c65c5d201492216d42773099dd62e1c506ae5199))
- **react:** update GA4 page view command ([cce42c8](https://github.com/Farfetch/blackout/commit/cce42c8491ea0a31e4e9b7dc31a75a0200ed50f0))
- **react:** update renderContent method ([5424912](https://github.com/Farfetch/blackout/commit/542491209226e3ed5825021307ab6921d42f0ca6))
- setup analytics api integration ([6f38991](https://github.com/Farfetch/blackout/commit/6f389910259a8a61be3e7b4a44be6873772f0fa5))

### Reverts

- Revert "feat(core|redux): add order change address endpoints" ([41b94e9](https://github.com/Farfetch/blackout/commit/41b94e917f81d6aabbcfbdc8386fc231de29ccc8))
- Revert "fix(core|redux): fix hash creation for pagination props and commercepages" ([b2f00e4](https://github.com/Farfetch/blackout/commit/b2f00e446f233556073f918de7a89277596c1873))

# [1.0.0-next.429](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.428...@farfetch/blackout-react@1.0.0-next.429) (2023-05-17)

### Bug Fixes

- add consistency fixes ([67724fc](https://github.com/Farfetch/blackout/commit/67724fcb2d8493a46c82f96572ee6093bd045dca))
- **client|redux:** type fixes ([4d9e537](https://github.com/Farfetch/blackout/commit/4d9e537c4acce15caecf638c69567184cf02ebff))
- fix AnalyticsAPI options ([7a50ddf](https://github.com/Farfetch/blackout/commit/7a50ddfceb245c347cdeeef78d5f80427867519d))
- fix useProductListing auto fetch check ([a6f8bba](https://github.com/Farfetch/blackout/commit/a6f8bba048cf54077ae28183cbbb89dbae174304))
- fix useWishlistSets hook ([9251d66](https://github.com/Farfetch/blackout/commit/9251d6699b36274cb7df7935048b0eb9e52b8352))

### chore

- add reset actions consistency changes ([e58e690](https://github.com/Farfetch/blackout/commit/e58e69042a957086af95f4b5a4648dbd415fe194))
- change fetchCollectPoints action ([7025cdd](https://github.com/Farfetch/blackout/commit/7025cdde04d37f4e5cc60fb57fac59cc6b1ecfdd))
- change put checkout promocode client to support multiple promocodes ([16abc6a](https://github.com/Farfetch/blackout/commit/16abc6a99c42366e229cffe33ff4bb68e4119be4))
- more consistency changes ([5df13f3](https://github.com/Farfetch/blackout/commit/5df13f3035dd01310f7427ea61d449f28ff43329))
- more renames ([08f08c0](https://github.com/Farfetch/blackout/commit/08f08c05e29dc7085214fb6f34b4a3d2ac25f0a5))
- product selectors rename and more changes ([823298e](https://github.com/Farfetch/blackout/commit/823298eff2b9ece63f34f90e461edd1b10109d3c))
- rename contents exports ([16695ba](https://github.com/Farfetch/blackout/commit/16695ba447efd503a034ba00e7c8e06344eca03d))

### BREAKING CHANGES

- The following public exports were renamed:

`DeliveryWindowType` -> `CheckoutOrderDeliveryWindowType`
`getOrderItemProductQuantity` -> `getOrderProductQuantity`

- reset actions that only reset either the entities or
  the internal state were now removed. All reset actions provided now
  remove both entities and state simultaneously.
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

# [1.0.0-next.428](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.427...@farfetch/blackout-react@1.0.0-next.428) (2023-05-12)

### Bug Fixes

- remove `contentTypeCode` as required parameter ([f32f7c0](https://github.com/Farfetch/blackout/commit/f32f7c0116df3e0ec9f2af957ccd58b6d229e14a))

### BREAKING CHANGES

- `useContentType` hook is now called `useContents`
  and the `contentTypeCode` parameter was removed. You will need to pass
  the `contentTypeCode` property in the options parameter now.

# [1.0.0-next.427](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.426...@farfetch/blackout-react@1.0.0-next.427) (2023-05-12)

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

# [1.0.0-next.426](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.425...@farfetch/blackout-react@1.0.0-next.426) (2023-05-12)

### Features

- **react:** remove castle pageview event tracking ([c23f711](https://github.com/Farfetch/blackout/commit/c23f711da37fc5588fd50113add93fabdd220d37))

# [1.0.0-next.425](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.424...@farfetch/blackout-react@1.0.0-next.425) (2023-05-12)

### Features

- **react|redux:** analytics improvements ([d72a4de](https://github.com/Farfetch/blackout/commit/d72a4de7b216ff914b1fe868d8d7702b87492712))

# [1.0.0-next.424](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.423...@farfetch/blackout-react@1.0.0-next.424) (2023-05-12)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.423](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.422...@farfetch/blackout-react@1.0.0-next.423) (2023-05-12)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.422](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.421...@farfetch/blackout-react@1.0.0-next.422) (2023-05-11)

### Features

- **client|redux|react:** add post guest orders endpoint ([21c0fec](https://github.com/Farfetch/blackout/commit/21c0fece8225ac728acf4e8be8ad4074bab067aa))

### BREAKING CHANGES

- **client|redux|react:** The fetchGuestOrdersLegacy is now a POST to prevent from leaking
  query data to google analytics. Now it accepts an object as data with the user email
  instead of passing the email as query.

# [1.0.0-next.421](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.420...@farfetch/blackout-react@1.0.0-next.421) (2023-05-10)

### Bug Fixes

- fix possible infinite loop in `useCheckoutOrderDetails` ([2956441](https://github.com/Farfetch/blackout/commit/2956441b593a55dd2390b0164c800398f0c321e3))

# [1.0.0-next.420](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.419...@farfetch/blackout-react@1.0.0-next.420) (2023-05-05)

### Features

- setup analytics api integration next ([cb8b693](https://github.com/Farfetch/blackout/commit/cb8b6930cd6dd4502d3d88afc89225313b663407))

# [1.0.0-next.419](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.418...@farfetch/blackout-react@1.0.0-next.419) (2023-05-05)

### Bug Fixes

- **react:** add missing orderId parameter on order_completed event ([9d5d119](https://github.com/Farfetch/blackout/commit/9d5d1194089aab1ccb447667a3182136299f4ff2))

# [1.0.0-next.418](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.417...@farfetch/blackout-react@1.0.0-next.418) (2023-05-05)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.417](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.416...@farfetch/blackout-react@1.0.0-next.417) (2023-04-28)

### Features

- **analytics|react:** add location id parameter on analytics product events next ([e61d2f7](https://github.com/Farfetch/blackout/commit/e61d2f7107a179b7b045e62cf289a4d9b7ddc9d3))

# [1.0.0-next.416](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.415...@farfetch/blackout-react@1.0.0-next.416) (2023-04-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.415](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.414...@farfetch/blackout-react@1.0.0-next.415) (2023-04-21)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.414](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.413...@farfetch/blackout-react@1.0.0-next.414) (2023-04-20)

### Features

- **analytics|react:** add package version to analytics next ([877c54d](https://github.com/Farfetch/blackout/commit/877c54d94cc10dd49731e4b0be57322de578d21a))

# [1.0.0-next.413](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.412...@farfetch/blackout-react@1.0.0-next.413) (2023-04-20)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.412](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.411...@farfetch/blackout-react@1.0.0-next.412) (2023-04-19)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.411](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.410...@farfetch/blackout-react@1.0.0-next.411) (2023-04-18)

### Features

- add index parameter to events next ([f21b5fa](https://github.com/Farfetch/blackout/commit/f21b5fa5d664a8da05a83c8ad2a2d6dcd12ec895))
- add parameters add address info event next ([20ca6a4](https://github.com/Farfetch/blackout/commit/20ca6a4377c26c51b56297c1ce02c445d2feec79))
- add parameters add shipping info event next ([9373522](https://github.com/Farfetch/blackout/commit/9373522d7047c02164d86cf6531521bd447a207b))

# [1.0.0-next.410](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.409...@farfetch/blackout-react@1.0.0-next.410) (2023-04-14)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.409](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.408...@farfetch/blackout-react@1.0.0-next.409) (2023-04-11)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.408](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.407...@farfetch/blackout-react@1.0.0-next.408) (2023-04-10)

### Features

- add parameters add shipping method event next ([f9a811f](https://github.com/Farfetch/blackout/commit/f9a811f872f24005305193d81ae113ad8d980a39))

# [1.0.0-next.407](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.406...@farfetch/blackout-react@1.0.0-next.407) (2023-04-05)

### Features

- **analytics|react:** add parameters edit checkout step event next ([c795494](https://github.com/Farfetch/blackout/commit/c7954949775267ab970ba4fffc9e569e489e47cf))

# [1.0.0-next.406](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.405...@farfetch/blackout-react@1.0.0-next.406) (2023-04-05)

### Features

- add config parameter to `useBag` and `useBagItem` actions ([3bcfca9](https://github.com/Farfetch/blackout/commit/3bcfca9a0824293e0dbb60aef4f701c821973ad7))

# [1.0.0-next.405](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.404...@farfetch/blackout-react@1.0.0-next.405) (2023-04-03)

### Features

- **analytics|react:** add billing info added event next ([dcdabc9](https://github.com/Farfetch/blackout/commit/dcdabc9266e2d09c2e23e09a8586d6631e7b0a3b))

# [1.0.0-next.404](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.403...@farfetch/blackout-react@1.0.0-next.404) (2023-04-03)

### Bug Fixes

- **analytics|react:** fix filters events next ([14c1b18](https://github.com/Farfetch/blackout/commit/14c1b181340074f5e69bbc44834d76efc1688911))

### Features

- **analytics|react:** add delivery method added event next ([e493491](https://github.com/Farfetch/blackout/commit/e493491fbe0fa1fdc22230c1af6c1aff2599306e))

# [1.0.0-next.403](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.402...@farfetch/blackout-react@1.0.0-next.403) (2023-03-28)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.402](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.401...@farfetch/blackout-react@1.0.0-next.402) (2023-03-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.401](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.400...@farfetch/blackout-react@1.0.0-next.401) (2023-03-17)

### Features

- **analytics|react:** add parameters checkout abandoned event next ([e42f5bb](https://github.com/Farfetch/blackout/commit/e42f5bbe52c3d7ed0adc0da072d0d54537588716))

# [1.0.0-next.400](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.399...@farfetch/blackout-react@1.0.0-next.400) (2023-03-16)

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

# [1.0.0-next.399](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.398...@farfetch/blackout-react@1.0.0-next.399) (2023-03-16)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.398](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.397...@farfetch/blackout-react@1.0.0-next.398) (2023-03-14)

### Bug Fixes

- subfolder on useLocale & serverInitialState ([da52aa6](https://github.com/Farfetch/blackout/commit/da52aa65eb34c85a61c0a39d50166740f2d446d6))

# [1.0.0-next.397](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.396...@farfetch/blackout-react@1.0.0-next.397) (2023-03-14)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.396](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.395...@farfetch/blackout-react@1.0.0-next.396) (2023-03-14)

### Features

- **analytics|react:** add parameters checkout started event next ([fc2879a](https://github.com/Farfetch/blackout/commit/fc2879a37d4c87a9d5743da5bd2f69ac910d04d7))

# [1.0.0-next.395](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.394...@farfetch/blackout-react@1.0.0-next.395) (2023-03-13)

### Features

- **analytics|react:** add unique id to GTM integration ([05885bb](https://github.com/Farfetch/blackout/commit/05885bb2714c5fd9bcf5ec501f7c3e85654d5727))

# [1.0.0-next.394](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.393...@farfetch/blackout-react@1.0.0-next.394) (2023-03-03)

### Bug Fixes

- **client:** add metadata in post checkout order request and types ([88b956f](https://github.com/Farfetch/blackout/commit/88b956f65dc3f35c063d7be76153d234fee710c8))

# [1.0.0-next.393](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.392...@farfetch/blackout-react@1.0.0-next.393) (2023-03-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.392](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.391...@farfetch/blackout-react@1.0.0-next.392) (2023-03-01)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.391](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.390...@farfetch/blackout-react@1.0.0-next.391) (2023-02-28)

### Bug Fixes

- **redux:** fix useBag hook actions ([3374551](https://github.com/Farfetch/blackout/commit/337455182b725a028f80933dcccdfa21f933ae32))

# [1.0.0-next.390](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.389...@farfetch/blackout-react@1.0.0-next.390) (2023-02-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.389](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.388...@farfetch/blackout-react@1.0.0-next.389) (2023-02-24)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.388](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.387...@farfetch/blackout-react@1.0.0-next.388) (2023-02-23)

### Bug Fixes

- add "type": "module" to all packages ([71a07d9](https://github.com/Farfetch/blackout/commit/71a07d970cd00cf450ad4a23b63f07876c9ab6db))

# [1.0.0-next.387](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.386...@farfetch/blackout-react@1.0.0-next.387) (2023-02-23)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.386](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.385...@farfetch/blackout-react@1.0.0-next.386) (2023-02-20)

### Features

- **analytics|react:** setup promocode applied event next ([c88b08f](https://github.com/Farfetch/blackout/commit/c88b08f108d562c99e633a7a11e17eb0ad14607d))

### BREAKING CHANGES

- **analytics|react:** - The omnitracking integration will no longer remap the
  "orderId" parameter on checkout events in case its value is not a valid
  order code and will log an error instead of a warning, in
  case it is invalid.

# [1.0.0-next.385](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.384...@farfetch/blackout-react@1.0.0-next.385) (2023-02-17)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.384](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.383...@farfetch/blackout-react@1.0.0-next.384) (2023-02-17)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.383](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.382...@farfetch/blackout-react@1.0.0-next.383) (2023-02-17)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.382](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.381...@farfetch/blackout-react@1.0.0-next.382) (2023-02-16)

### Features

- **analytics|react:** add forter and riskified integrations ([5fcf9bb](https://github.com/Farfetch/blackout/commit/5fcf9bb5d97affbfd92303e4df5934e4df188462))

### BREAKING CHANGES

- **analytics|react:** Vitorino was removed from the list of available
  integrations and now there are separate Riskified and Forter integrations
  that will need to be added separately to have the same behaviour
  provided by Vitorino.

# [1.0.0-next.381](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.380...@farfetch/blackout-react@1.0.0-next.381) (2023-02-15)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.380](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.379...@farfetch/blackout-react@1.0.0-next.380) (2023-02-10)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.379](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.378...@farfetch/blackout-react@1.0.0-next.379) (2023-02-09)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.378](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.377...@farfetch/blackout-react@1.0.0-next.378) (2023-02-08)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.377](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.376...@farfetch/blackout-react@1.0.0-next.377) (2023-02-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.376](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.375...@farfetch/blackout-react@1.0.0-next.376) (2023-02-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.375](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.374...@farfetch/blackout-react@1.0.0-next.375) (2023-02-03)

### Features

- **analytics|react:** allow analytics to work with any consent categories ([b39bec3](https://github.com/Farfetch/blackout/commit/b39bec33b27ee9f7139a95643750fb602d5a91f1))

# [1.0.0-next.374](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.373...@farfetch/blackout-react@1.0.0-next.374) (2023-02-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.373](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.372...@farfetch/blackout-react@1.0.0-next.373) (2023-02-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.372](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.371...@farfetch/blackout-react@1.0.0-next.372) (2023-01-31)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.371](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.370...@farfetch/blackout-react@1.0.0-next.371) (2023-01-30)

### Features

- **redux:** add bag operations endpoints ([374b3e6](https://github.com/Farfetch/blackout/commit/374b3e652d22c384a19d11a5d7be4a7df45801dd))

# [1.0.0-next.370](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.369...@farfetch/blackout-react@1.0.0-next.370) (2023-01-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.369](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.368...@farfetch/blackout-react@1.0.0-next.369) (2023-01-23)

### Bug Fixes

- fix error handling ([0a2128d](https://github.com/Farfetch/blackout/commit/0a2128da7c1c425f826b793ddaebaa5053d13452))

# [1.0.0-next.368](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.367...@farfetch/blackout-react@1.0.0-next.368) (2023-01-13)

### Features

- **react:** add password strength helper ([73b86ee](https://github.com/Farfetch/blackout/commit/73b86eedc7fbc46e6792aedb7ecc9fc3480bfe0d))

# [1.0.0-next.367](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.366...@farfetch/blackout-react@1.0.0-next.367) (2023-01-11)

### Features

- **client:** add new get user returns endpoints ([1042b4c](https://github.com/Farfetch/blackout/commit/1042b4cf02bb7698f9b59516ee816967bcd52d5f))

# [1.0.0-next.366](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.365...@farfetch/blackout-react@1.0.0-next.366) (2023-01-09)

### Bug Fixes

- **redux|react:** fix createSelector types ([883a337](https://github.com/Farfetch/blackout/commit/883a33718428e9463fdcfcfe08dd7815d03f2038))

# [1.0.0-next.365](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.364...@farfetch/blackout-react@1.0.0-next.365) (2023-01-02)

### Features

- **analytics|react|redux:** transform analytics types into enums ([cd551c3](https://github.com/Farfetch/blackout/commit/cd551c33713c40a30b36ee305913e944da9d2416))

# [1.0.0-next.364](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.363...@farfetch/blackout-react@1.0.0-next.364) (2022-12-22)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.363](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.362...@farfetch/blackout-react@1.0.0-next.363) (2022-12-21)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.362](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.361...@farfetch/blackout-react@1.0.0-next.362) (2022-12-21)

### Bug Fixes

- **react:** add page context to GA4 events ([b1cf4c0](https://github.com/Farfetch/blackout/commit/b1cf4c046eb8acb123c63a736441da2f202a7287))

### Features

- **analytics|react:** normalize property of productId on Analytics for next ([1833eb3](https://github.com/Farfetch/blackout/commit/1833eb324b6ca51c9a46bacb7dd27ddc7179af78))

# [1.0.0-next.361](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.360...@farfetch/blackout-react@1.0.0-next.361) (2022-12-15)

### Bug Fixes

- **redux|react|client:** fix product listing hook and filters related types ([baced32](https://github.com/Farfetch/blackout/commit/baced32db6c7155b25134c20927e88baef3e36bb))

# [1.0.0-next.360](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.359...@farfetch/blackout-react@1.0.0-next.360) (2022-12-14)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.359](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.358...@farfetch/blackout-react@1.0.0-next.359) (2022-12-13)

### Bug Fixes

- **react:** fix getListingSeoMetadataParams ([dd17607](https://github.com/Farfetch/blackout/commit/dd176073f5da212db36c3ab28b27b672469f860a))

# [1.0.0-next.358](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.357...@farfetch/blackout-react@1.0.0-next.358) (2022-12-13)

### Features

- **client|redux|react:** add support to metadata on bag and wishlist hooks ([ab9def2](https://github.com/Farfetch/blackout/commit/ab9def21429b812779c885fb87de7ec69964e7bb))

# [1.0.0-next.357](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.356...@farfetch/blackout-react@1.0.0-next.357) (2022-12-13)

### Bug Fixes

- **react|redux:** fix wishlist and bag selectors ([071ed5d](https://github.com/Farfetch/blackout/commit/071ed5dea7351d83465ac92102d4df9f5eca188d))

# [1.0.0-next.356](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.355...@farfetch/blackout-react@1.0.0-next.356) (2022-12-09)

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

# [1.0.0-next.355](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.354...@farfetch/blackout-react@1.0.0-next.355) (2022-12-07)

### Features

- **react|redux:** add getProductDenormalized selector ([1ea953b](https://github.com/Farfetch/blackout/commit/1ea953b5bd6f180eba1b5d5f3bb552492649716c))

# [1.0.0-next.354](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.353...@farfetch/blackout-react@1.0.0-next.354) (2022-12-06)

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

# [1.0.0-next.353](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.352...@farfetch/blackout-react@1.0.0-next.353) (2022-12-05)

### Bug Fixes

- **analytics:** reset analytics' setUser promise when user is anonymised ([6d0160b](https://github.com/Farfetch/blackout/commit/6d0160b2ce3641e5bb38f3f44f29f9100a34d224))

# [1.0.0-next.352](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.351...@farfetch/blackout-react@1.0.0-next.352) (2022-12-02)

### Features

- **react:** add base components contents ([7a75bd4](https://github.com/Farfetch/blackout/commit/7a75bd428b7da18783ff4249aedeeef5ab55c96d))

# [1.0.0-next.351](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.350...@farfetch/blackout-react@1.0.0-next.351) (2022-11-29)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.350](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.349...@farfetch/blackout-react@1.0.0-next.350) (2022-11-28)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.349](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.348...@farfetch/blackout-react@1.0.0-next.349) (2022-11-22)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.348](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.347...@farfetch/blackout-react@1.0.0-next.348) (2022-11-21)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.347](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.346...@farfetch/blackout-react@1.0.0-next.347) (2022-11-17)

### Bug Fixes

- **react:** fix add/update bag item errors in useBag hook ([77bd35c](https://github.com/Farfetch/blackout/commit/77bd35c1f87bd52e0c0f79e88418d4b076f327bf))

# [1.0.0-next.346](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.345...@farfetch/blackout-react@1.0.0-next.346) (2022-11-16)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.345](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.344...@farfetch/blackout-react@1.0.0-next.345) (2022-11-16)

### Bug Fixes

- **react:** remove useSeoMedata default app links and fix useProductDetails ([96c463b](https://github.com/Farfetch/blackout/commit/96c463bee8c843dc09b4d721957ad8b93f786652))

# [1.0.0-next.344](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.343...@farfetch/blackout-react@1.0.0-next.344) (2022-11-11)

### chore

- **react|redux:** remove checkout hooks ([36702bf](https://github.com/Farfetch/blackout/commit/36702bf412755c7b2ec92fe86ad670e5df0ded61))

### BREAKING CHANGES

- **react|redux:** - `useCheckout` hook was removed from @farfetch/blackout-react package.

* `getCheckoutOrderOperation` and `fetchCheckoutOrderOperation` signatures
  have changed to accept separate parameters for the checkoutOrderId and
  operationId values instead of using an object.
* `getPaymentMethods` client was renamed to `getCheckoutOrderPaymentMethods`.
* `fetchPaymentMethods` action was renamed to `fetchCheckoutOrderPaymentMethods`.

# [1.0.0-next.343](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.342...@farfetch/blackout-react@1.0.0-next.343) (2022-11-10)

### Features

- **client|redux:** create new client fetch Content Page ([41834cd](https://github.com/Farfetch/blackout/commit/41834cd6bf25cd3da7a7d37ca1209bd5ed554bde))

# [1.0.0-next.342](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.341...@farfetch/blackout-react@1.0.0-next.342) (2022-11-08)

### Features

- **react|redux|client:** add content hooks ([5c398a4](https://github.com/Farfetch/blackout/commit/5c398a4e1adc84cf435a1a66280f4d27d232da17))

### BREAKING CHANGES

- **react|redux|client:** commerce pages client endpoint updated and content hooks refactored

# [1.0.0-next.341](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.340...@farfetch/blackout-react@1.0.0-next.341) (2022-11-08)

### Bug Fixes

- **react:** remove unnecessary castle.io tracking requests ([e65b529](https://github.com/Farfetch/blackout/commit/e65b5295a3765a7583fad7c8087ed3c64bfef0b8))

# [1.0.0-next.340](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.339...@farfetch/blackout-react@1.0.0-next.340) (2022-11-03)

### Features

- **analytics|react|redux:** add omnitracking's product updated events mappings ([0d8d626](https://github.com/Farfetch/blackout/commit/0d8d626da17f16f1fac370985e154c60287c4de4))
- **analytics|react:** add omnitracking's signup newsletter mappings ([bc9a7f0](https://github.com/Farfetch/blackout/commit/bc9a7f03def5c80b1c1149808e6b5aa8b27e8389))
- **analytics:** add omnitracking's interact content events mappings next ([3c7f930](https://github.com/Farfetch/blackout/commit/3c7f930c5fb117cf247827af94a34b3c7465bcad))
- **react|redux:** change analytics dependencies on react and redux projects ([1a529ab](https://github.com/Farfetch/blackout/commit/1a529ab3fee464c0b3393bf5a4a5ad7fbe89a6b9))

# [1.0.0-next.339](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.338...@farfetch/blackout-react@1.0.0-next.339) (2022-11-02)

### Features

- **react:** update GA4 page view command ([13a0297](https://github.com/Farfetch/blackout/commit/13a0297acd017d13100af3337a61f498065c0577))

# [1.0.0-next.338](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.337...@farfetch/blackout-react@1.0.0-next.338) (2022-10-26)

### Features

- **react:** settings hooks ([ba1a0c8](https://github.com/Farfetch/blackout/commit/ba1a0c82b00dcf31e7fb5369692cde779cbf9e1a))

# [1.0.0-next.337](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.336...@farfetch/blackout-react@1.0.0-next.337) (2022-10-26)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.336](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.335...@farfetch/blackout-react@1.0.0-next.336) (2022-10-26)

### Bug Fixes

- **react:** fix getListingSeoMetadataParams params ([7cedcfe](https://github.com/Farfetch/blackout/commit/7cedcfee94233583fb3a20bdc037e963ebff9b0b))

# [1.0.0-next.335](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.334...@farfetch/blackout-react@1.0.0-next.335) (2022-10-25)

### Features

- **react|redux|client:** refactor and add seo metadata hooks and utils ([95864db](https://github.com/Farfetch/blackout/commit/95864db4b65f62dab1b65206a0ec4a5e587329c6))

# [1.0.0-next.334](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.333...@farfetch/blackout-react@1.0.0-next.334) (2022-10-25)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.333](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.332...@farfetch/blackout-react@1.0.0-next.333) (2022-10-24)

### Features

- **react:** sort recently viewed products ([1dad8ce](https://github.com/Farfetch/blackout/commit/1dad8ceeba744204f34a8a0151f53bf31e35198e))

# [1.0.0-next.332](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.331...@farfetch/blackout-react@1.0.0-next.332) (2022-10-24)

### Bug Fixes

- fix TS errors on redux selectors ([35e3525](https://github.com/Farfetch/blackout/commit/35e35259e6855cbae662cdc98d29f9dbf72a9ef4))
- ts errors on redux selectors ([52ea54b](https://github.com/Farfetch/blackout/commit/52ea54bd8e970e57356b3255dc7a6f6d2d714669))

# [1.0.0-next.331](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.330...@farfetch/blackout-react@1.0.0-next.331) (2022-10-24)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.330](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.329...@farfetch/blackout-react@1.0.0-next.330) (2022-10-20)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.329](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.328...@farfetch/blackout-react@1.0.0-next.329) (2022-10-20)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.328](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.327...@farfetch/blackout-react@1.0.0-next.328) (2022-10-18)

### Bug Fixes

- **analytics|react:** fix omnitracking's clientLanguage and clientCountry parameters ([5431a58](https://github.com/Farfetch/blackout/commit/5431a5878c9c964720d76702d5f0bd378be05a42))

### Features

- **analytics|react:** add omnitracking's order completed mappings ([4de1fc3](https://github.com/Farfetch/blackout/commit/4de1fc329144286b27b7f48400ffe66e65ee0b8f))
- **analytics|react:** add product details and listing pages to omnitracking ([74677ab](https://github.com/Farfetch/blackout/commit/74677ab093a2701f794fbdaae1abc37e030af065))
- **analytics|react:** share uniqueEventId between analytics' integrations ([1af80f5](https://github.com/Farfetch/blackout/commit/1af80f5444819760e0ef9e7b015faf249aaecbde))
- **analytics:** add omnitracking's address info mappings ([4e0b8d0](https://github.com/Farfetch/blackout/commit/4e0b8d0fcb2949de35d74a5b581198171558dfe2))
- **analytics:** add omnitracking's shipping and payment mappings ([1c8d11d](https://github.com/Farfetch/blackout/commit/1c8d11dc8fe64b87b8d022417fc7d1d06e39b0fb))
- **analytics:** add omnitracking's wishlist page tracking mappings ([7a7e8d6](https://github.com/Farfetch/blackout/commit/7a7e8d6520cc8a6f6d878ba00beb09548d7d7305))

# [1.0.0-next.327](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.326...@farfetch/blackout-react@1.0.0-next.327) (2022-10-17)

### Features

- add useRecentlyViewedProducts hook ([702f311](https://github.com/Farfetch/blackout/commit/702f311c3d10e3557577c9436eb082b86e93d4fc))

# [1.0.0-next.326](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.325...@farfetch/blackout-react@1.0.0-next.326) (2022-10-13)

### Bug Fixes

- **client|redux:** fix content redux exports ([690ec18](https://github.com/Farfetch/blackout/commit/690ec187aa982717a4f0cbee08b6658b69151fd8))

# [1.0.0-next.325](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.324...@farfetch/blackout-react@1.0.0-next.325) (2022-10-07)

### Bug Fixes

- **redux:** fix reducers cleanup actions ([1a7d768](https://github.com/Farfetch/blackout/commit/1a7d7686904caf9b34b42e132dd8215dec3836fb))

### BREAKING CHANGES

- **redux:** - `resetCheckoutState` action was
  renamed to `resetCheckout`.

* `resetReturn` action was renamed to `resetReturns`.
* `resetOrderDetailsState` now accepts an array of orderIds instead of
  a single orderId to allow multiple resets at the same time.

# [1.0.0-next.324](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.323...@farfetch/blackout-react@1.0.0-next.324) (2022-10-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.323](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.322...@farfetch/blackout-react@1.0.0-next.323) (2022-10-06)

### Bug Fixes

- **client|react|redux:** refactor grouping and groupingProperties reducers and fix selectors ([d4f7d59](https://github.com/Farfetch/blackout/commit/d4f7d5963cb433a0f0c29c879d3f51ae93ca9c91))

### Features

- **client|react|redux:** add useProductGrouping and useProductGroupingProperties hooks ([d21352e](https://github.com/Farfetch/blackout/commit/d21352ef4f22877b37147daadd63b9a363587dd6))

# [1.0.0-next.322](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.321...@farfetch/blackout-react@1.0.0-next.322) (2022-10-04)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.321](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.320...@farfetch/blackout-react@1.0.0-next.321) (2022-09-29)

### Features

- **redux|client|react:** add brands hooks ([667cb69](https://github.com/Farfetch/blackout/commit/667cb69c3cdf38ae2a7354212c52a3b19f36c6f6))

# [1.0.0-next.320](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.319...@farfetch/blackout-react@1.0.0-next.320) (2022-09-28)

### Features

- **redux|client|react:** add categories hooks ([e708dc4](https://github.com/Farfetch/blackout/commit/e708dc4f60e13bcf915b1d79993b0332e8d1ecfc))

# [1.0.0-next.319](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.318...@farfetch/blackout-react@1.0.0-next.319) (2022-09-22)

### Features

- **react|redux|client:** add subscriptions hooks ([f03d4f2](https://github.com/Farfetch/blackout/commit/f03d4f2349ff5ec83d7135cf82237b4b27cd8a50))

### BREAKING CHANGES

- **react|redux|client:** Subscriptions reducer refactor

# [1.0.0-next.318](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.317...@farfetch/blackout-react@1.0.0-next.318) (2022-09-22)

### Bug Fixes

- **redux:** fix resetProductsLists action ([c895a22](https://github.com/Farfetch/blackout/commit/c895a220d2f1d39dc02c792225c68c23e228f434))

# [1.0.0-next.317](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.316...@farfetch/blackout-react@1.0.0-next.317) (2022-09-21)

### Bug Fixes

- **react:** remove `useAction` from public exports ([9252f65](https://github.com/Farfetch/blackout/commit/9252f65f24d3b59f4b74799dbc4e6838d8589e40))

### BREAKING CHANGES

- **react:** `useAction` hook is not available from
  react package. Use `useDispatch` hook from `react-redux` directly instead.

# [1.0.0-next.316](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.315...@farfetch/blackout-react@1.0.0-next.316) (2022-09-21)

### Bug Fixes

- **redux:** fix TS erros on redux reducers unit tests ([d6acf84](https://github.com/Farfetch/blackout/commit/d6acf8442c63412b06c574b68d076168b83f52b2))

# [1.0.0-next.315](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.314...@farfetch/blackout-react@1.0.0-next.315) (2022-09-15)

### Bug Fixes

- **redux:** update getProductsListProducts selector to return brand data ([03bf002](https://github.com/Farfetch/blackout/commit/03bf002240fb8bd0bcebd2c867cdda44fb4aee4b))

# [1.0.0-next.314](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.313...@farfetch/blackout-react@1.0.0-next.314) (2022-09-09)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.313](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.312...@farfetch/blackout-react@1.0.0-next.313) (2022-09-09)

### Bug Fixes

- **redux|client|react:** add search hooks ([828a0b4](https://github.com/Farfetch/blackout/commit/828a0b4016058efc1d4328da53968cb00d25eff7))

### BREAKING CHANGES

- **redux|client|react:** Search reducers refactor

# [1.0.0-next.312](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.311...@farfetch/blackout-react@1.0.0-next.312) (2022-09-09)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.311](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.310...@farfetch/blackout-react@1.0.0-next.311) (2022-09-08)

### Features

- **react:** add orders hooks ([06d39e7](https://github.com/Farfetch/blackout/commit/06d39e749e81cd512d50510f3ea3e06ab69b714b))

### BREAKING CHANGES

- **react:** The selectors `isOrdersListLoading` and
  `getOrdersListError` were removed and replaced with the selectors
  `areOrdersLoading` and `getOrdersError`.
  The orders reducer was now changed as well and not it
  will only change its root slice `isLoading` and `error` values only
  when the fetchUserOrders and fetchGuestOrders actions are used.

# [1.0.0-next.310](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.309...@farfetch/blackout-react@1.0.0-next.310) (2022-09-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.309](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.308...@farfetch/blackout-react@1.0.0-next.309) (2022-09-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.308](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.307...@farfetch/blackout-react@1.0.0-next.308) (2022-09-02)

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

# [1.0.0-next.307](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.306...@farfetch/blackout-react@1.0.0-next.307) (2022-08-30)

### Features

- **react:** add usePaymentTokens hook ([9deba6f](https://github.com/Farfetch/blackout/commit/9deba6fc9bd3e8b841b427028c057b51ab70718e))

# [1.0.0-next.306](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.305...@farfetch/blackout-react@1.0.0-next.306) (2022-08-25)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.305](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.304...@farfetch/blackout-react@1.0.0-next.305) (2022-08-24)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.304](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.303...@farfetch/blackout-react@1.0.0-next.304) (2022-08-23)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.303](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.302...@farfetch/blackout-react@1.0.0-next.303) (2022-08-23)

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

# [1.0.0-next.302](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.301...@farfetch/blackout-react@1.0.0-next.302) (2022-08-22)

### Bug Fixes

- **client:** fix client unit tests TS errors ([f68da8c](https://github.com/Farfetch/blackout/commit/f68da8c55bc3f7bf932d671644b54f08a2c1cffe))

# [1.0.0-next.301](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.300...@farfetch/blackout-react@1.0.0-next.301) (2022-08-16)

### Features

- **react:** add user addresses hooks ([a1c8427](https://github.com/Farfetch/blackout/commit/a1c84270c3ca13455300e7b27eecd769830c4215))

# [1.0.0-next.300](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.299...@farfetch/blackout-react@1.0.0-next.300) (2022-08-16)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.299](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.298...@farfetch/blackout-react@1.0.0-next.299) (2022-08-12)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.298](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.297...@farfetch/blackout-react@1.0.0-next.298) (2022-08-12)

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

# [1.0.0-next.297](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.296...@farfetch/blackout-react@1.0.0-next.297) (2022-08-12)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.296](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.295...@farfetch/blackout-react@1.0.0-next.296) (2022-08-11)

### Features

- **react:** refactor useProductListing hook ([e27b0ae](https://github.com/Farfetch/blackout/commit/e27b0ae7baa8e6c65769a1734a6e551ae19b5537))

### BREAKING CHANGES

- **react:** useProductListing hook new interface

# [1.0.0-next.295](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.294...@farfetch/blackout-react@1.0.0-next.295) (2022-08-10)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.294](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.293...@farfetch/blackout-react@1.0.0-next.294) (2022-08-10)

### Features

- **react:** add useProductAttributes hook ([3fcb07c](https://github.com/Farfetch/blackout/commit/3fcb07c8e1a2840407e346fc4be4bee167b8c23b))

# [1.0.0-next.293](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.292...@farfetch/blackout-react@1.0.0-next.293) (2022-08-10)

### Features

- **react:** add useProductSizeGuides hook ([1b1d7f9](https://github.com/Farfetch/blackout/commit/1b1d7f9d07632a620bc03c372e15a00940c9e0da))

# [1.0.0-next.292](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.291...@farfetch/blackout-react@1.0.0-next.292) (2022-08-09)

### Features

- **react:** add locale hooks ([8e62032](https://github.com/Farfetch/blackout/commit/8e62032ada0d4e0d9ccf194219d3565bc868c5bc))

### BREAKING CHANGES

- **react:** locale selectors moved from entities folder to locale folder

# [1.0.0-next.291](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.290...@farfetch/blackout-react@1.0.0-next.291) (2022-08-05)

### Bug Fixes

- remove getProductColorGrouping client ([95d9cac](https://github.com/Farfetch/blackout/commit/95d9cac6aea2e750fcdf1be3467e7b64c4bd61d9))

# [1.0.0-next.290](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.289...@farfetch/blackout-react@1.0.0-next.290) (2022-08-05)

### Features

- **redux:** add pagination to commerce pages structure response ([0a67a6e](https://github.com/Farfetch/blackout/commit/0a67a6ea2af372d57b46057a44aee2d182dff4ae))

# [1.0.0-next.289](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.288...@farfetch/blackout-react@1.0.0-next.289) (2022-08-04)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.288](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.287...@farfetch/blackout-react@1.0.0-next.288) (2022-08-03)

### Bug Fixes

- **redux|react:** fix fetched selectors ([810177e](https://github.com/Farfetch/blackout/commit/810177e171170a0a253e334fba2dec5e230bd398))

# [1.0.0-next.287](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.286...@farfetch/blackout-react@1.0.0-next.287) (2022-08-03)

### Features

- allow partial product details state reset ([10e78ac](https://github.com/Farfetch/blackout/commit/10e78acebf3af02cfa1bf02ea467383e335aca4d))
- **react:** refactor useProductDetails hook ([a9a4387](https://github.com/Farfetch/blackout/commit/a9a4387de14e093f7006213e52d7497212b492c8))

### BREAKING CHANGES

- **react:** useProductDetails hook new interface

# [1.0.0-next.286](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.285...@farfetch/blackout-react@1.0.0-next.286) (2022-08-02)

### chore

- **client|react:** remove authentication interceptor ([3247708](https://github.com/Farfetch/blackout/commit/32477087c91d9b8673b7799a74b51154c0b46c62))

### BREAKING CHANGES

- **client|react:** Authentication interceptor is now removed from both
  client and react packages as it only makes sense for native apps.

# [1.0.0-next.285](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.284...@farfetch/blackout-react@1.0.0-next.285) (2022-08-01)

### Features

- **react:** add useUser react hook ([a827f8b](https://github.com/Farfetch/blackout/commit/a827f8bdb7f1dc4c24fe6b0ac623d3ca0b32c5fd))

# [1.0.0-next.284](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.283...@farfetch/blackout-react@1.0.0-next.284) (2022-08-01)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.283](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.282...@farfetch/blackout-react@1.0.0-next.283) (2022-08-01)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.282](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.281...@farfetch/blackout-react@1.0.0-next.282) (2022-07-29)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.281](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.280...@farfetch/blackout-react@1.0.0-next.281) (2022-07-29)

### chore

- rename `postRegister` client ([902a601](https://github.com/Farfetch/blackout/commit/902a601ed2b746c9c78b9809e02be87c5dd7d209))

### BREAKING CHANGES

- `postRegister` client is now `postUser`.

# [1.0.0-next.280](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.279...@farfetch/blackout-react@1.0.0-next.280) (2022-07-29)

### Features

- add support for metadata ([442f0d4](https://github.com/Farfetch/blackout/commit/442f0d4a951e44dc21523a8da6a04a368411d4a0))
- **react:** refactor useBag and useBagItem hooks ([037a364](https://github.com/Farfetch/blackout/commit/037a364dafb820dff79c5261a1d45a900e325b72))

### BREAKING CHANGES

- **react:** useBag and useBagItem hooks new interface

# [1.0.0-next.279](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.278...@farfetch/blackout-react@1.0.0-next.279) (2022-07-28)

### Bug Fixes

- fix user typings ([1d96701](https://github.com/Farfetch/blackout/commit/1d967010909cc0d8061e6e194f48edef89d7d765))

# [1.0.0-next.278](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.277...@farfetch/blackout-react@1.0.0-next.278) (2022-07-27)

### Bug Fixes

- **client|redux|redux:** fix account areas imports and exports ([e80b833](https://github.com/Farfetch/blackout/commit/e80b833a51f8f658ede1591da56589f863dd02a5))
- fix `useAction` hook type ([288c0e6](https://github.com/Farfetch/blackout/commit/288c0e6903fab00b103694749ca684d0253c0511))

### Features

- add support for passing metadata in wishlist and bag items actions ([167c2a2](https://github.com/Farfetch/blackout/commit/167c2a22944328c9aab097996255e7321ea412e7))
- implement next version ([9995600](https://github.com/Farfetch/blackout/commit/9995600a4620aa09e18c07ebaa0d4058fe70abb1))
- **react:** refactor useWishlist and useWishlistItem hooks ([89813a4](https://github.com/Farfetch/blackout/commit/89813a453e66e0e62450d5662d88aac6d3a07b76))

### BREAKING CHANGES

- **react:** useWishlist and useWishlistItem hooks new interface
- Many renames of actions and clients, as well as redux store
  layout were implemented and will be described in a new migration file which
  will be authored later.

# [1.0.0-next.277](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.276...@farfetch/blackout-react@1.0.0-next.277) (2022-07-15)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.276](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.275...@farfetch/blackout-react@1.0.0-next.276) (2022-07-12)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.275](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.274...@farfetch/blackout-react@1.0.0-next.275) (2022-07-06)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.274](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.273...@farfetch/blackout-react@1.0.0-next.274) (2022-07-06)

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

- **react:** add `addBagItem` to `useBag` ([00b24c5](https://github.com/Farfetch/blackout/commit/00b24c5ea02b02f54fb552e42597a784dbd6deae))
- **react:** remove `addBagItem` from `useBagItem` ([45d41ac](https://github.com/Farfetch/blackout/commit/45d41ac275f0ed9658afb84718e7a2e35e293ef0))

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

- **react:** fix useAddresses functions and export types ([d1941d5](https://github.com/Farfetch/blackout/commit/d1941d5e00d54e9da0bc0512d8106d58322bb9c2))

### BREAKING CHANGES

- **react:** - Now the hook receives an object as a parameter, since the number of properties
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

# [1.0.0-next.254](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.253...@farfetch/blackout-react@1.0.0-next.254) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.253](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.252...@farfetch/blackout-react@1.0.0-next.253) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.252](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.251...@farfetch/blackout-react@1.0.0-next.252) (2022-06-27)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.251](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.250...@farfetch/blackout-react@1.0.0-next.251) (2022-06-23)

### Bug Fixes

- **react:** remove unnecessary custom GA script validation ([07d0c5f](https://github.com/Farfetch/blackout/commit/07d0c5f25c1095fca8f7e9a6faffb75dd76de8db))

# [1.0.0-next.250](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.249...@farfetch/blackout-react@1.0.0-next.250) (2022-06-22)

### Features

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

- add `totalQuantity` and `itemsCount` to `useBag` hook ([e71fd5b](https://github.com/Farfetch/blackout/commit/e71fd5bb91bef6c194d215a86d28c76c94006e91))

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

- **blackout-client|blackout-redux:** fix error handling on blackout client and redux ([7b1f92f](https://github.com/Farfetch/blackout/commit/7b1f92fa3d7d03ca3085087d4ac1574d254fe5c0))

# [1.0.0-next.234](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.233...@farfetch/blackout-react@1.0.0-next.234) (2022-06-09)

### Features

- **blackout-\*:** convert jsdocs to tsdocs ([7936d24](https://github.com/Farfetch/blackout/commit/7936d24fad2138d5cd0610da624116d31a9cdb93))

# [1.0.0-next.233](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.232...@farfetch/blackout-react@1.0.0-next.233) (2022-06-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.232](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.231...@farfetch/blackout-react@1.0.0-next.232) (2022-06-07)

### Features

- **blackout-react:** implement signup form completed mappings in zaraz ([2cde967](https://github.com/Farfetch/blackout/commit/2cde9676155dab915e2f09d032133d10457df2fd))

# [1.0.0-next.231](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.230...@farfetch/blackout-react@1.0.0-next.231) (2022-06-03)

### Features

- **blackout-react:** add checkout events mappings to Zaraz ([9c166db](https://github.com/Farfetch/blackout/commit/9c166dba3bebee23b99d920a99597923f0f791b5))

# [1.0.0-next.230](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.229...@farfetch/blackout-react@1.0.0-next.230) (2022-06-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.229](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.228...@farfetch/blackout-react@1.0.0-next.229) (2022-06-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.228](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.227...@farfetch/blackout-react@1.0.0-next.228) (2022-05-31)

### Bug Fixes

- **blackout-react:** fix missing event name parameter for Zaraz events ([a945430](https://github.com/Farfetch/blackout/commit/a94543080cee99c4dc36899f9a3a9df539ba3b37))

### Features

- **blackout-react:** add product viewed/search mappings in Zaraz ([d861fa8](https://github.com/Farfetch/blackout/commit/d861fa8adc4b67bba86aa6bc3f2fb6495b97c6ef))

# [1.0.0-next.227](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.226...@farfetch/blackout-react@1.0.0-next.227) (2022-05-27)

### Features

- **blackout-react:** add product added to cart/wishlist mappings in Zaraz ([4a56722](https://github.com/Farfetch/blackout/commit/4a56722183d6c8f9f8179231eeebdda539d6c43d))

# [1.0.0-next.226](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.225...@farfetch/blackout-react@1.0.0-next.226) (2022-05-25)

### Features

- **blackout-\*:** fix issues for the release blackout 2 ([8fb3d11](https://github.com/Farfetch/blackout/commit/8fb3d11ca5da34f131cbd021f5751c468dbb43d4))

# [1.0.0-next.225](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.224...@farfetch/blackout-react@1.0.0-next.225) (2022-05-25)

### Bug Fixes

- **blackout-react:** use env instead of host ([4923762](https://github.com/Farfetch/blackout/commit/4923762d7437a372f940634e8668babc63195df8))

### Features

- **blackout-react:** add Zaraz integration ([d91710c](https://github.com/Farfetch/blackout/commit/d91710c50fc4260cc4bbd36876478df539d344de))

# [1.0.0-next.224](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.223...@farfetch/blackout-react@1.0.0-next.224) (2022-05-17)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.223](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.222...@farfetch/blackout-react@1.0.0-next.223) (2022-05-16)

### Bug Fixes

- only use the `resources` to build the `searchRedirectUrl` if they exist ([c31c87d](https://github.com/Farfetch/blackout/commit/c31c87d9a446655b455fae64aa2046301127355a))

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

- **blackout-react:** convert ga4 integration to typescript ([547de0a](https://github.com/Farfetch/blackout/commit/547de0a80d0380737af786ced86f993a9509cd86))

# [1.0.0-next.217](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.216...@farfetch/blackout-react@1.0.0-next.217) (2022-05-04)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.216](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.215...@farfetch/blackout-react@1.0.0-next.216) (2022-05-03)

### Features

- add `useSearchSuggestions` hook ([a4cff18](https://github.com/Farfetch/blackout/commit/a4cff187cb722e36c1d7228c8bfdd4cdb134e13b))

# [1.0.0-next.215](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.214...@farfetch/blackout-react@1.0.0-next.215) (2022-05-02)

### Features

- **react:** convert Vitorino integration to typescript ([021f12f](https://github.com/Farfetch/blackout/commit/021f12f084e63bb62cc42d5c3d48c75865480993))

### BREAKING CHANGES

- **react:** - Removed unnecessary logic for sensitive and secret fields - now the
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

- **analytics|client|react:** transform Omnitracking integration to typescript ([c987863](https://github.com/Farfetch/blackout/commit/c98786396f6c82a07f6f3359fb994128bdb5f37e))

# [1.0.0-next.213](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.212...@farfetch/blackout-react@1.0.0-next.213) (2022-04-29)

### Features

- **blackout-react:** add support multigender ga4's signup newsletter ([8ac1b9a](https://github.com/Farfetch/blackout/commit/8ac1b9a92ab698fe6297d0948a122dc59dafd434))

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

- **react:** add castle 2.0 analytics' integration ([8d5fd35](https://github.com/Farfetch/blackout/commit/8d5fd35a4675e39d0fbadd70d93834f7911b2cbc))

### BREAKING CHANGES

- **react:** From now on, the `appId` option is no longer valid.
  Please be sure to pass the new `pk` option (castle publishable key).

# [1.0.0-next.205](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.204...@farfetch/blackout-react@1.0.0-next.205) (2022-04-08)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.204](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.203...@farfetch/blackout-react@1.0.0-next.204) (2022-04-06)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.203](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.202...@farfetch/blackout-react@1.0.0-next.203) (2022-04-05)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.202](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.201...@farfetch/blackout-react@1.0.0-next.202) (2022-04-04)

### Bug Fixes

- **blackout-client:** fix logout in axios interceptor ([e7352d7](https://github.com/Farfetch/blackout/commit/e7352d79dca85d84598b59bf0216ff71400cbf3c))

# [1.0.0-next.201](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.200...@farfetch/blackout-react@1.0.0-next.201) (2022-04-04)

### Bug Fixes

- **blackout-react:** ignore unhandled events in ga/ga4 ([029ee62](https://github.com/Farfetch/blackout/commit/029ee6248b84ff57516f8cdb4381da4b00b49df5))

# [1.0.0-next.200](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.199...@farfetch/blackout-react@1.0.0-next.200) (2022-03-30)

### Features

- **react:** include new params hook useContentType ([eebaf11](https://github.com/Farfetch/blackout/commit/eebaf11ad0dbad6968d01c72676e216f8ff9f644))

# [1.0.0-next.199](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.198...@farfetch/blackout-react@1.0.0-next.199) (2022-03-29)

### Bug Fixes

- **react:** add lodash map render content ([8b8a5cc](https://github.com/Farfetch/blackout/commit/8b8a5ccc9304d38e750bea1d00d84c5cc4258388))

### Features

- **core|react|redux:** fix typescript issues for authentication and users ([84920d2](https://github.com/Farfetch/blackout/commit/84920d2384ab387eb48e623a63beec6000cf78e7))

# [1.0.0-next.198](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.197...@farfetch/blackout-react@1.0.0-next.198) (2022-03-28)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.197](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.196...@farfetch/blackout-react@1.0.0-next.197) (2022-03-28)

### Features

- **blackout-analytics|blackout-react:** convert GTM integration to typescript ([bf53842](https://github.com/Farfetch/blackout/commit/bf53842720985bed8c7a2ef147c651f1f02d6ace))

# [1.0.0-next.196](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.195...@farfetch/blackout-react@1.0.0-next.196) (2022-03-25)

### Bug Fixes

- **blackout-analytics|blackout-react:** fix ga typings ([a107de5](https://github.com/Farfetch/blackout/commit/a107de59fdc4bfc7c0a5d8ac814fa8ce9d0e76f1))

### Features

- **analytics|react:** convert google analytics integration to ts ([a785187](https://github.com/Farfetch/blackout/commit/a78518734550c2ac42a06519640726a45214dd0c))

# [1.0.0-next.195](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.194...@farfetch/blackout-react@1.0.0-next.195) (2022-03-21)

### Features

- **react:** update renderContent method ([48911a4](https://github.com/Farfetch/blackout/commit/48911a49eaeb09f82781ae776479ba22a8cff8eb))

# [1.0.0-next.194](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.193...@farfetch/blackout-react@1.0.0-next.194) (2022-03-21)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.193](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.192...@farfetch/blackout-react@1.0.0-next.193) (2022-03-18)

### Bug Fixes

- **analytics|react:** fix typescript typings ([0294198](https://github.com/Farfetch/blackout/commit/02941985161075aa676cd51183480cfcfe2900dd))

### Features

- **analytics|react:** convert Analytics area from js to ts ([f95e7b0](https://github.com/Farfetch/blackout/commit/f95e7b015f7fdc76f88a70dfcced4668dfe50ea3))

# [1.0.0-next.192](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.191...@farfetch/blackout-react@1.0.0-next.192) (2022-03-17)

### Bug Fixes

- **react:** fix useAddresses hook selectors ([ef3f4d2](https://github.com/Farfetch/blackout/commit/ef3f4d2f4975c771a01ff603c7e7826478f6953e))

# [1.0.0-next.191](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.190...@farfetch/blackout-react@1.0.0-next.191) (2022-03-15)

### Features

- **react:** implement missing selectors and actions in address hook ([ab6fb49](https://github.com/Farfetch/blackout/commit/ab6fb49b1e40dbeebc7988518b4c4a3534e32378))

# [1.0.0-next.190](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.189...@farfetch/blackout-react@1.0.0-next.190) (2022-03-04)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.189](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.188...@farfetch/blackout-react@1.0.0-next.189) (2022-03-03)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.188](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.187...@farfetch/blackout-react@1.0.0-next.188) (2022-03-02)

### Bug Fixes

- remove condition from `useProductsList` ([e078308](https://github.com/Farfetch/blackout/commit/e078308ce93c7e3efdedc4f30c8228aef18efd2b))

# [1.0.0-next.187](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.186...@farfetch/blackout-react@1.0.0-next.187) (2022-03-01)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.186](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.185...@farfetch/blackout-react@1.0.0-next.186) (2022-02-28)

### Bug Fixes

- **blackout-react:** fix `from` parameter in useAddOrUpdateBagItem hook ([a9e5379](https://github.com/Farfetch/blackout/commit/a9e53792ecd3d6555e71592b54e53250b91f0a6d))

# [1.0.0-next.185](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.184...@farfetch/blackout-react@1.0.0-next.185) (2022-02-24)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.184](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.183...@farfetch/blackout-react@1.0.0-next.184) (2022-02-22)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.183](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.182...@farfetch/blackout-react@1.0.0-next.183) (2022-02-22)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.182](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.181...@farfetch/blackout-react@1.0.0-next.182) (2022-02-21)

### Bug Fixes

- **react:** fix interact content payload in GA4 ([9ce0edc](https://github.com/Farfetch/blackout/commit/9ce0edc3db70fbf2e4146c999cc5da4a035132e4))

# [1.0.0-next.181](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.180...@farfetch/blackout-react@1.0.0-next.181) (2022-02-15)

### Bug Fixes

- **react:** change `percentageScrolled` parameter type to number ([fa657ae](https://github.com/Farfetch/blackout/commit/fa657aeb1ed917f187c9c4e43fd6880a9ab90c82))

### Features

- **react:** add GA4 custom scroll event mappings ([3cc5571](https://github.com/Farfetch/blackout/commit/3cc5571fa5671e8cecdd92686e19c19d8fced9be))

# [1.0.0-next.180](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.179...@farfetch/blackout-react@1.0.0-next.180) (2022-02-15)

### Bug Fixes

- remove GA4 non essential events ([3470c12](https://github.com/Farfetch/blackout/commit/3470c121351e1a00c42c17f76e0ef239466dc9de))

# [1.0.0-next.179](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.178...@farfetch/blackout-react@1.0.0-next.179) (2022-02-14)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.178](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.177...@farfetch/blackout-react@1.0.0-next.178) (2022-02-11)

### Features

- **react:** move `handleAddOrUpdateItem` method to new hook ([2e29fb9](https://github.com/Farfetch/blackout/commit/2e29fb905d7cfc0f693a67a19a8b21d5c08830c2)), closes [#16](https://github.com/Farfetch/blackout/issues/16)

### BREAKING CHANGES

- **react:** This moves the method `handleAddOrUpdateItem` to a new
  hook `useAddOrUpdateBagItem`. The new hook is necessary since we are using
  selectors and actions outside a React component.

# [1.0.0-next.177](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.176...@farfetch/blackout-react@1.0.0-next.177) (2022-02-11)

### Features

- **react:** add useWishlistSet hook ([e1401ba](https://github.com/Farfetch/blackout/commit/e1401bae3886caa5efab5e1960b4d5a6bcac1fad))

# [1.0.0-next.176](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.175...@farfetch/blackout-react@1.0.0-next.176) (2022-02-08)

### Bug Fixes

- **react:** add set user on ga4 initialization ([54ee917](https://github.com/Farfetch/blackout/commit/54ee917684bc5d5b4a3e10db09ca20b8d181dad9))

# [1.0.0-next.175](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.174...@farfetch/blackout-react@1.0.0-next.175) (2022-02-07)

### Features

- **analytics|react:** add signup newsletter event mappings in GA4 ([0b5dd7f](https://github.com/Farfetch/blackout/commit/0b5dd7f22c57dde94012eaef860dc03a744d1856))

# [1.0.0-next.174](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.173...@farfetch/blackout-react@1.0.0-next.174) (2022-02-07)

### Bug Fixes

- **react:** minor fixes to custom events schemas and mappings ([f12ae1d](https://github.com/Farfetch/blackout/commit/f12ae1dcfc0b3e3c0b3f4b97d621c89a413a96e4))
- **react:** remove `items` parameter workaround for custom events ([b584563](https://github.com/Farfetch/blackout/commit/b584563c2f55e3b29e67317691e52d8512f5d9a3))
- **react:** truncate categories if the categories sent are greater than limit ([043aa5e](https://github.com/Farfetch/blackout/commit/043aa5e44521b003002b2f75706da8463d371fd9))
- **react|redux:** fixed GA4 mappings and improved wishlist middleware ([7f989e1](https://github.com/Farfetch/blackout/commit/7f989e137746a22cee375193a243bb751ff2017b))

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

- **react:** add `useProductsList` hook ([8343500](https://github.com/Farfetch/blackout/commit/8343500c137623a179093776502bb0211a820d72))

# [1.0.0-next.163](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.162...@farfetch/blackout-react@1.0.0-next.163) (2022-01-26)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.162](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.161...@farfetch/blackout-react@1.0.0-next.162) (2022-01-26)

### Features

- **react:** add `useWishlistItem` hook ([9c98c00](https://github.com/Farfetch/blackout/commit/9c98c00c35f4142bdd6c9ed80259b0c0f25e6002))

# [1.0.0-next.161](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.160...@farfetch/blackout-react@1.0.0-next.161) (2022-01-25)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.160](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.159...@farfetch/blackout-react@1.0.0-next.160) (2022-01-24)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.159](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.158...@farfetch/blackout-react@1.0.0-next.159) (2022-01-24)

### Features

- **react:** add allow trigger ga4's change size event on first selection of size ([192e634](https://github.com/Farfetch/blackout/commit/192e6346348cb6cd77f57b5de5a450fcd94d3d12))
- **react:** add parameter path_clean on GA4 view_page event ([82bf8b5](https://github.com/Farfetch/blackout/commit/82bf8b52cf7ce6d980d446f105b0758579bcac71))

# [1.0.0-next.158](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.157...@farfetch/blackout-react@1.0.0-next.158) (2022-01-21)

### Features

- **react:** update billing support on handleSetShippingAddress ([1ec2a78](https://github.com/Farfetch/blackout/commit/1ec2a78820b793f3d8781e52ed5bbde6a3afe0e6))

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

- **react:** add custom user id property option ([9924e85](https://github.com/Farfetch/blackout/commit/9924e8550677ca2033d2ce70f03ecc9ad3827040))

# [1.0.0-next.150](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.149...@farfetch/blackout-react@1.0.0-next.150) (2022-01-17)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.149](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.148...@farfetch/blackout-react@1.0.0-next.149) (2022-01-17)

### Features

- **react:** add commerce pages hook next ([2ff81c6](https://github.com/Farfetch/blackout/commit/2ff81c6cc3a18bd092cb7a6e091ce3d0bff3089c))

# [1.0.0-next.148](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.147...@farfetch/blackout-react@1.0.0-next.148) (2022-01-17)

### Features

- add `addWishlistItem` to useWishlist hook ([2a56abb](https://github.com/Farfetch/blackout/commit/2a56abbc198eda24d460493a7176a3be3390e6ac))

# [1.0.0-next.147](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.146...@farfetch/blackout-react@1.0.0-next.147) (2022-01-14)

### Features

- **react:** add `useWishlistSets` hook ([9843f24](https://github.com/Farfetch/blackout/commit/9843f24b252a98c9afaf23ba77d63c23c6857e81))

# [1.0.0-next.146](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.145...@farfetch/blackout-react@1.0.0-next.146) (2022-01-14)

### Features

- **react:** add useProductDetails hook ([e373f6a](https://github.com/Farfetch/blackout/commit/e373f6a0c0ef0a5a8a52a13ff9b596e01cff77e1))

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

- **react:** add index file to export everything from the wishlist chunk ([0d7fd79](https://github.com/Farfetch/blackout/commit/0d7fd79096c29e9f6d663d6c9a010b530b437318))

# [1.0.0-next.137](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.136...@farfetch/blackout-react@1.0.0-next.137) (2022-01-10)

### Bug Fixes

- `useBag` hook types ([b1a480a](https://github.com/Farfetch/blackout/commit/b1a480a9f9e95690895f73b77f678d470111a241))

# [1.0.0-next.136](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.135...@farfetch/blackout-react@1.0.0-next.136) (2022-01-10)

### Features

- **react:** add `useWishlist` hook ([2686b9c](https://github.com/Farfetch/blackout/commit/2686b9cc7a51a55f204270610e57f64e811f256a))

# [1.0.0-next.135](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.134...@farfetch/blackout-react@1.0.0-next.135) (2022-01-07)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.134](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.133...@farfetch/blackout-react@1.0.0-next.134) (2022-01-07)

### Features

- **react:** add useBag hook ([6da0047](https://github.com/Farfetch/blackout/commit/6da0047c484100ad8e32c64e7364f67ca843a822))

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

- **react:** add from to PRODUCT_CLICKED event mapping in GA4 ([db98850](https://github.com/Farfetch/blackout/commit/db98850969a402f2807c02a133c60f630a14f7ce))

# [1.0.0-next.128](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.127...@farfetch/blackout-react@1.0.0-next.128) (2021-12-16)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.127](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.126...@farfetch/blackout-react@1.0.0-next.127) (2021-12-15)

### Bug Fixes

- fix ga4 promocode_applied event schema ([61c1e72](https://github.com/Farfetch/blackout/commit/61c1e72f136429a00d4894719300f02c3a745d43))

# [1.0.0-next.126](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.125...@farfetch/blackout-react@1.0.0-next.126) (2021-12-15)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.125](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.124...@farfetch/blackout-react@1.0.0-next.125) (2021-12-14)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.124](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.123...@farfetch/blackout-react@1.0.0-next.124) (2021-12-13)

### Features

- **analytics|react|redux:** add ga4 custom events support ([29eccb3](https://github.com/Farfetch/blackout/commit/29eccb354e3af15dceadb361eb52445cd4f3718c))

# [1.0.0-next.123](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.122...@farfetch/blackout-react@1.0.0-next.123) (2021-12-10)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.122](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.121...@farfetch/blackout-react@1.0.0-next.122) (2021-12-10)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.121](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.120...@farfetch/blackout-react@1.0.0-next.121) (2021-12-09)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.120](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.119...@farfetch/blackout-react@1.0.0-next.120) (2021-12-07)

### Bug Fixes

- **core|react:** handle guest users expired in authentication provider ([447ed49](https://github.com/Farfetch/blackout/commit/447ed4962b696bf992052424e94f2a211ebc06d9))

# [1.0.0-next.119](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.118...@farfetch/blackout-react@1.0.0-next.119) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.118](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.117...@farfetch/blackout-react@1.0.0-next.118) (2021-12-06)

### Features

- **client|redux:** profile - rename API and client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))

# [1.0.0-next.117](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.116...@farfetch/blackout-react@1.0.0-next.117) (2021-12-03)

### Bug Fixes

- **react:** creating checkout just runs on mount ([db3ae73](https://github.com/Farfetch/blackout/commit/db3ae73414ae1c156d9ff807893ab56a854ba7c8))

# [1.0.0-next.116](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.115...@farfetch/blackout-react@1.0.0-next.116) (2021-12-02)

### Features

- **react:** add productAggregatorId to add to bag requests ([a5fac7f](https://github.com/Farfetch/blackout/commit/a5fac7fa7c30a504f872c37f5e6b2d312349097b))

# [1.0.0-next.115](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.114...@farfetch/blackout-react@1.0.0-next.115) (2021-12-02)

### Bug Fixes

- **react:** update handleSize function on the useBagItem function ([854d4f3](https://github.com/Farfetch/blackout/commit/854d4f36e9bb17c35dcf72869727a6bd491a2116))

# [1.0.0-next.114](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.113...@farfetch/blackout-react@1.0.0-next.114) (2021-12-02)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.113](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@1.0.0-next.112...@farfetch/blackout-react@1.0.0-next.113) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-react

# [1.0.0-next.112](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-react@0.25.1...@farfetch/blackout-react@1.0.0-next.112) (2021-11-29)

### Features

- migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))
