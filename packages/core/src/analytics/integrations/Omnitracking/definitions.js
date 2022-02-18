/**
 * @module Omnitracking/definitions
 * @private
 */

import {
  generatePaymentAttemptReferenceId,
  getParameterValueFromEvent,
  getValParameterForEvent,
} from './omnitracking-helper';
import eventTypes from '../../types/eventTypes';
import fromParameterTypes from '../../types/fromParameterTypes';
import pageTypes from '../../types/pageTypes';

export const PRODUCT_ID_PARAMETER = 'productId';
export const PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST = 'id';

/**
 * Common parameters to any event.
 * This list is extended by each page event definition.
 */
const commonPageParams = [
  'abTests',
  'accessTier',
  'actionArea',
  'assistantUserId',
  'basketCurrency',
  'basketId',
  'basketQuantity',
  'basketValue',
  'clientAdvertisingID',
  'clientCountry',
  'clientGender',
  'clientInstallId',
  'clientLanguage',
  'clientSDKVersion',
  'clientVersion',
  'department',
  'device',
  'deviceId',
  'deviceLanguage',
  'deviceOS',
  'dismiss',
  'domainUrl',
  'elementsSeen',
  'errorMessage',
  'exitInteraction',
  'geoLocation',
  'geoLocationCity',
  'geoLocationState',
  'httpStatusCode',
  'inStoreSessionId',
  'internalRequest',
  'ip',
  'isBot',
  'isCustomer',
  'isExclusive',
  'isLogged',
  'itemList',
  'itemStoreStockList',
  'loginType',
  'navigatedFrom',
  'ordersList',
  'pageId',
  'pageName',
  'parentId',
  'performanceTimings',
  'performanceTrackingIds',
  'previousUniqueViewId',
  'priceType',
  'productShippingOptions',
  'pushStatus',
  'referrerUnionId',
  'returnDetails',
  'returnItemsSelectionList',
  'screenHeight',
  'screenWidth',
  'searchQuery',
  'searchResultCount',
  'searchResultsType',
  'searchSuggestion',
  'searchType',
  'selectedPaymentMethod',
  'sessionId',
  'startedTyping',
  'status',
  'stockpointId',
  'storeId',
  'suggestionType',
  'uniqueViewId',
  'url',
  'userBenefits',
  'userCountryLocation',
  'userGender',
  'utmCampaign',
  'utmContent',
  'utmMedium',
  'utmSource',
  'utmTerm',
  'uuid',
  'val',
  'viewCurrency',
  'viewGender',
  'viewSubType',
  'viewType',
  'weChatOpenID',
  'weChatUnionId',
  'wishlistQuantity',
];

/**
 * Common `track` (PageAction) and `GenericPageVisited` (PageView) parameters.
 */
const commonTrackAndPageParams = [
  'attributesList',
  'categoryList',
  'colourList',
  'designerList',
  'discount',
  'filterType',
  'filtersApplied',
  'hasNewMessages',
  'integrationId',
  'interactionType',
  'itemPriceList',
  'itemSalePriceList',
  'itemStockList',
  'itemStoreList',
  'marketType',
  'merchantLocationId',
  'messageId',
  'messageNumber',
  'pageNumber',
  'priceFilter',
  'returnId',
  'scaleList',
  'selectableFieldsList',
  'sizeList',
  'skuItemList',
  'tagList',
  'variantId',
];

/**
 * Parameters dictionary by event type.
 */
export const pageDefinitions = {
  GenericPageVisited: [
    ...commonPageParams,
    ...commonTrackAndPageParams,
    'deliveryOptions',
    'deliveryOptionsDetails',
    'orderDetails',
    'orderList',
    'orderSummary',
    'paymentStatus',
    'selectedOrderType',
    'shippingTotalValue',
    'shippingTypeFee',
    'tagSkuList',
  ],
  CheckoutPageVisited: [
    ...commonPageParams,
    'availablePaymentOptions',
    'checkoutOrderId',
    'checkoutStep',
    'defaultPaymentMethod',
    'isShippingAddressClickAndCollect',
    'orderCode',
    'orderCurrency',
    'orderId',
    'orderVAT',
    'orderValue',
    'productCount',
    'promoCode',
    'saleProductCount',
    'selectableFieldsList',
    'shippingTotalValue',
    'shippingTypeFee',
    'userCheckoutType',
  ],
  ListingPageVisited: [
    ...commonPageParams,
    'categoryId',
    'categoryName',
    'collectionId',
    'designerId',
    'designerName',
    'didYouMean',
    'itemRankTypeList',
    'outfitId',
    'promotionId',
    'recsType',
    'saleType',
    'seasonId',
    'setId',
    'skuItemsListWithSimilar',
    'sortOption',
  ],
  ProductPageVisited: [
    ...commonPageParams,
    'applePayStatus',
    'categoryId',
    'categoryName',
    'collectionId',
    'complementaryLookType',
    'designerId',
    'designerName',
    'lookId',
    'numberOfSizes',
    'numberOfSizesInStore',
    'rankType',
    'recommendationSource',
    'seasonId',
    'totalStock',
    'totalStockInStore',
    'unitFullPrice',
    'unitSalePrice',
    PRODUCT_ID_PARAMETER,
  ],
};

export const pageActionParameters = [
  'accessTier',
  'actionArea',
  'advertiserId',
  'categoryId',
  'categoryName',
  'checkoutOrderId',
  'contentProvider',
  'contentType',
  'deliveryInformationDetails',
  'deliveryOptions',
  'deliveryOptionsDetails',
  'designerId',
  'designerName',
  'dismiss',
  'errorMessage',
  'hasError',
  'itemCoordinates',
  'itemQuantity',
  'itemSize',
  'moduleId',
  'moduleLoadTime',
  'moduleState',
  'moduleType',
  'moduleWasInteracted',
  'moduleWasSeen',
  'orderCode',
  'orderCodeId',
  'orderSummary',
  'priceCurrency',
  'productCount',
  'productId',
  'promoCode',
  'provider',
  'recommendationsId',
  'recommendationsProductList',
  'recsLoaded',
  'recsRequested',
  'recsStrategy',
  'recsType',
  'refundInformationDetails',
  'scrollDepth',
  'slotIndex',
  'sortOption',
  'sourceDescription',
  'sourceGroupDescription',
  'sourceId',
  'sourceType',
  'sourceWasSeen',
  'status',
  'storeConnections',
  'storeId',
  'targetId',
  'targetType',
  'totalStock',
  'totalStockInStore',
  'uniqueViewId',
  'unitFullPrice',
  'unitSalePrice',
  'uuid',
];

export const systemActionParameters = [];

export const trackDefinitions = [
  ...systemActionParameters,
  ...pageActionParameters,
  ...commonTrackAndPageParams,
  'val',
  'tid',
];

/**
 * Page action event types expected by Omnitracking to be sent
 * on the 'event' parameter.
 */
export const pageActionEventTypes = {
  PAGE_ACTION: 'PageAction',
  SYSTEM_ACTION: 'SystemAction',
};

/**
 * Page view event types expected by Omnitracking to be sent
 * on the 'event' parameter.
 */
export const pageViewEventTypes = {
  GenericPageVisited: 'GenericPageVisited',
  ProductPageVisited: 'ProductPageVisited',
  ListingPageVisited: 'ListingPageVisited',
  CheckoutPageVisited: 'CheckoutPageVisited',
};

/**
 * Events mapper with possible keywords for each event type.
 * This keywords can match both with `window.location.href` or the page name passed via `analytics.page(name, properties)`.
 */
export const pageEventsFilter = {
  [pageViewEventTypes.ListingPageVisited]: [
    pageTypes.PRODUCT_LISTING,
    pageTypes.SEARCH,
    'ProductList',
    'listing',
    'search',
    'sets',
  ],
  [pageViewEventTypes.ProductPageVisited]: [
    pageTypes.PRODUCT_DETAILS,
    'ProductDetail',
    'product',
  ],
  [pageViewEventTypes.CheckoutPageVisited]: [
    pageTypes.CHECKOUT,
    pageTypes.CHECKOUT_DELIVERY_METHOD,
    pageTypes.CHECKOUT_PAYMENT,
    pageTypes.CHECKOUT_REVIEW,
    pageTypes.CHECKOUT_SHIPPING,
    'Checkout',
    'confirm',
    'payment',
  ],
};

/**
 * Interested events for tracking.
 * If there is an event that can have different TIDs depending on the `from` parameter,
 * make sure to define it, along with any specific parameter, if applicable.
 */
export const trackEventsMapper = {
  [eventTypes.SIGNUP_FORM_VIEWED]: data => ({
    tid: 10097,
    val: getValParameterForEvent({
      type: 'REGISTER',
      paymentAttemptReferenceId: generatePaymentAttemptReferenceId(data),
    }),
  }),
  [eventTypes.CHECKOUT_STEP_VIEWED]: data => ({
    tid: 10097,
    val: getValParameterForEvent({
      type: 'SUBMIT',
      paymentAttemptReferenceId: generatePaymentAttemptReferenceId(data),
    }),
  }),
  [eventTypes.PLACE_ORDER_STARTED]: data => {
    const val = getValParameterForEvent({
      type: 'TRANSACTION',
      paymentAttemptReferenceId: generatePaymentAttemptReferenceId(data),
    });

    return [
      {
        tid: 10097,
        val,
      },
      {
        tid: 188,
        val,
      },
    ];
  },
  [eventTypes.LOGOUT]: () => ({
    tid: 431,
  }),
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => {
    const val =
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER) ||
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST);

    switch (data.properties?.from) {
      case fromParameterTypes.PDP:
        return {
          tid: 598,
          val,
        };

      default:
        return {
          tid: 16,
          val,
        };
    }
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => {
    const val =
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER) ||
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST);

    switch (data.properties?.from) {
      case fromParameterTypes.PDP:
        return {
          tid: 35,
          val,
        };

      case fromParameterTypes.BAG:
        return {
          tid: 135,
          val,
        };

      case fromParameterTypes.RECOMMENDATIONS:
        return {
          tid: 531,
          val,
        };

      case fromParameterTypes.RECENTLY_VIEWED:
        return {
          tid: 532,
          val,
        };

      default:
        return {
          tid: 35,
          val,
        };
    }
  },
};

export const userGenderValuesMapper = {
  0: 'NotDefined',
  1: 'Male',
  2: 'Female',
  // Cover the cases where we're already receiving the value instead of the ID and map for the omnitracking contract
  NotDefined: 'NotDefined',
  Male: 'Male',
  Female: 'Female',
};
