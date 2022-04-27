# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
