/**
 * @module Omnitracking/definitions
 * @private
 */

import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getGenderValueFromProperties,
  getOmnitrackingProductId,
  getProductLineItems,
  getProductLineItemsQuantity,
  getValParameterForEvent,
} from './omnitracking-helper';
import eventTypes from '../../types/eventTypes';
import logger from '../../utils/logger';
import pageTypes from '../../types/pageTypes';

export const PRODUCT_ID_PARAMETER = 'productId';
export const PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST = 'id';

/**
 * Common parameters to any event.
 * This list is extended by each page event definition.
 */
const commonPageParams = [
  'abTests',
  'assistantUserId',
  'baselinePolicies',
  'basketCurrency',
  'basketId',
  'basketQuantity',
  'basketValue',
  'categoryIdList',
  'clientAdvertisingID',
  'clientCountry',
  'clientCulture',
  'clientGender',
  'clientInstallId',
  'clientLanguage',
  'clientSDKVersion',
  'clientVersion',
  'communicationPreferences',
  'crossDeviceCorrelationId',
  'deeplinkSource',
  'designerIdList',
  'device',
  'deviceId',
  'deviceLanguage',
  'deviceOS',
  'domainUrl',
  'dropDownListOptions',
  'elementsSeen',
  'exitInteraction',
  'fittingRoomID',
  'fittingRoomList',
  'geoLocation',
  'geoLocationCity',
  'geoLocationState',
  'hasAttachment',
  'hashedIp',
  'httpStatusCode',
  'impersonateUserId',
  'inStoreSessionId',
  'internalRequest',
  'ip',
  'isBot',
  'isCustomer',
  'isExclusive',
  'isLogged',
  'isReviewAvailable',
  'itemList',
  'itemStoreStockList',
  'lineItems',
  'loginType',
  'merchantName',
  'navigatedFrom',
  'ordersList',
  'pageId',
  'pageName',
  'parentId',
  'performanceTimings',
  'performanceTrackingIds',
  'previousParentId',
  'previousUniqueViewId',
  'priceType',
  'pricingManagement',
  'productShippingOptions',
  'pushStatus',
  'recommendationSource',
  'referrer',
  'referrerHost',
  'referrerUnionId',
  'returnDetails',
  'returnItemsSelectionList',
  'rewardCardsInformation',
  'screenHeight',
  'screenWidth',
  'searchResultCount',
  'searchResultsType',
  'searchSuggestion',
  'searchType',
  'selectedPaymentMethod',
  'sessionId',
  'startedTyping',
  'stylistId',
  'stockpointId',
  'suggestionType',
  'url',
  'userAgent',
  'userBenefits',
  'userCountryLocation',
  'userGender',
  'userRole',
  'quantityList',
  'utmCampaign',
  'utmContent',
  'utmMedium',
  'utmSource',
  'utmTerm',
  'viewCurrency',
  'viewGender',
  'viewSubType',
  'viewType',
  'weChatOpenID',
  'weChatUnionId',
  'wishlistQuantity',
];

/**
 * Common `track` (PageAction) and page parameters.
 */
const commonTrackAndPageParams = [
  'accessTier',
  'actionArea',
  'advertisingConsent',
  'bookmarkId',
  'bookmarkItemList',
  'bundleAttributes',
  'bundleId',
  'categoryName',
  'clientTimestamp',
  'department',
  'dismiss',
  'errorMessage',
  'fittingRoomName',
  'functionalConsent',
  'hasError',
  'hasNewMessages',
  'integrationId',
  'itemPriceList',
  'itemSalePriceList',
  'itemStockList',
  'itemStoreList',
  'merchantLocationId',
  'messageComponentsList',
  'messageId',
  'messageNumber',
  'partnerDocuments',
  'performanceConsent',
  'pushPayload',
  'requestId',
  'requestStatus',
  'scrollDepth',
  'searchQuery',
  'skuItemList',
  'status',
  'storeConnections',
  'storeId',
  'tagList',
  'uniqueViewId',
  'uuid',
  'variantId',
];

/**
 * Common `track` (PageAction) and `GenericPageVisited` (PageView) parameters.
 */
const commonTrackAndGenericPageParams = [
  'attributesList',
  'categoryList',
  'colourList',
  'deliveryOptions',
  'deliveryOptionsDetails',
  'designerList',
  'discount',
  'filtersApplied',
  'filterType',
  'interactionType',
  'marketType',
  'orderSummary',
  'pageNumber',
  'priceFilter',
  'returnId',
  'scaleList',
  'selectableFieldsList',
  'selectedOrderType',
  'sizeList',
];

/**
 * Parameters dictionary by event type.
 */
export const pageDefinitions = {
  GenericPageVisited: [
    ...commonPageParams,
    ...commonTrackAndPageParams,
    ...commonTrackAndGenericPageParams,
    'orderDetails',
    'orderList',
    'paymentStatus',
    'shippingTotalValue',
    'shippingTypeFee',
    'tagSkuList',
  ],
  CheckoutPageVisited: [
    ...commonPageParams,
    ...commonTrackAndPageParams,
    'applePayStatus',
    'availablePaymentOptions',
    'checkoutOrderId',
    'checkoutStep',
    'defaultPaymentMethod',
    'isShippingAddressClickAndCollect',
    'orderCode',
    'orderCurrency',
    'orderValue',
    'orderVAT',
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
    ...commonTrackAndPageParams,
    'categoryId',
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
    ...commonTrackAndPageParams,
    'applePayStatus',
    'categoryId',
    'collectionId',
    'complementaryLookType',
    'designerId',
    'designerName',
    'hasVto',
    'itemColourId',
    'lookId',
    'numberOfColours',
    'numberOfSizes',
    'numberOfSizesInStore',
    'outfitId',
    'rankType',
    'reviews',
    'seasonId',
    'totalStock',
    'totalStockInStore',
    'unitFullPrice',
    'unitSalePrice',
    PRODUCT_ID_PARAMETER,
  ],
};

export const pageActionParameters = [
  'advertiserId',
  'categoryId',
  'checkoutOrderId',
  'contentProvider',
  'contentType',
  'deliveryInformationDetails',
  'designerId',
  'designerName',
  'dropDownListSelection',
  'fittingRoomQuantity',
  'isFixedMerchant',
  'itemColourId',
  'itemCoordinates',
  'itemQuantity',
  'itemSize',
  'loadItemCoordinate',
  'moduleContentID',
  'moduleContentName',
  'moduleId',
  'moduleLoadTime',
  'moduleState',
  'moduleType',
  'modulePublicationDate',
  'moduleVersion',
  'moduleWasInteracted',
  'moduleWasSeen',
  'numberOfColours',
  'orderCode',
  'orderCodeId',
  'partnersSubscriptionList',
  'productCount',
  'productPackagingOptions',
  'promoCode',
  'promotionDetails',
  'provider',
  'recommendationsId',
  'recommendationsProductList',
  'recsLoaded',
  'recsRequested',
  'recsStrategy',
  'recsType',
  'refundInformationDetails',
  'slotIndex',
  'sortOption',
  'sourceDescription',
  'sourceGroupDescription',
  'sourceId',
  'sourceType',
  'sourceWasSeen',
  'targetId',
  'targetType',
  'totalStock',
  'totalStockInStore',
  'unitFullPrice',
  'unitSalePrice',
  'wishlistId',
  PRODUCT_ID_PARAMETER,
];

export const systemActionParameters = [];

export const trackDefinitions = [
  ...systemActionParameters,
  ...pageActionParameters,
  ...commonTrackAndPageParams,
  ...commonTrackAndGenericPageParams,
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
        ...getCheckoutEventGenericProperties(data),
        promocode: data.properties.coupon,
        shippingTotalValue: data.properties?.shipping,
      },
    ];
  },
  [eventTypes.LOGOUT]: () => ({
    tid: 431,
  }),
  [eventTypes.PRODUCT_LIST_VIEWED]: data => ({
    tid: 2832,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.CHECKOUT_ABANDONED]: () => ({
    tid: 2084,
  }),
  [eventTypes.CHECKOUT_STEP_EDITING]: data => ({
    tid: 2923,
    checkoutStep: data.properties.step,
  }),
  [eventTypes.CHECKOUT_STARTED]: data => ({
    tid: 2918,
    basketValue: data.properties.total,
    basketCurrency: data.properties.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.SHARE]: data => ({
    tid: 1205,
    actionArea: data.properties?.method,
    productId: getOmnitrackingProductId(data),
  }),
  [eventTypes.PROMOCODE_APPLIED]: data => ({
    tid: 311,
    promoCode: data.properties.coupon,
    hasError: !!data.properties?.errorMessage,
    errorMessage: data.properties?.errorMessage,
  }),
  [eventTypes.ORDER_COMPLETED]: data => ({
    tid: 2831,
    ...getCheckoutEventGenericProperties(data),
  }),
  [eventTypes.SIGNUP_NEWSLETTER]: data => ({
    tid: 2831,
    gender: getGenderValueFromProperties(data),
  }),
  [eventTypes.ADDRESS_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2911,
  }),
  [eventTypes.PAYMENT_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2912,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.SHIPPING_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2914,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.SHIPPING_METHOD_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2913,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => ({
    tid: 2915,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: data => ({
    tid: 131,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => ({
    tid: 2916,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: data => ({
    tid: 2925,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_CLICKED]: data => ({
    tid: 2926,
    actionArea: data.properties?.from,
    productId: getOmnitrackingProductId(data),
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.FILTERS_APPLIED]: data => ({
    tid: 2921,
    actionArea: data.properties?.from,
    filtersApplied: data.properties?.filters
      ? JSON.stringify(data.properties?.filters)
      : undefined,
  }),
  [eventTypes.FILTERS_CLEARED]: data => ({
    tid: 2917,
    actionArea: data.properties?.from,
    filtersApplied: data.properties?.filters
      ? JSON.stringify(data.properties?.filters)
      : undefined,
  }),
  [eventTypes.PRODUCT_UPDATED]: data => {
    const eventList = [];
    const properties = data.properties;

    if (properties.colour && properties.oldColour !== properties.colour) {
      // color changed event
      const additionalParameters = {};
      if (properties?.oldColourId && properties?.colourId) {
        additionalParameters[
          'colourList'
        ] = `${properties?.oldColourId}, ${properties?.colourId}`;
      } else {
        logger.warn(
          `[Omnitracking] - Event ${data.event} properties "oldColourId" and "colourId" should be sent on the
                        payload when triggering a "change color" event. If you want to track this event, make sure to
                        pass these two properties.`,
        );
      }

      eventList.push({
        ...additionalParameters,
        tid: 2098,
        productId: getOmnitrackingProductId(data),
        actionArea: properties?.from,
      });
    }

    if (properties.size && properties.oldSize !== properties.size) {
      // size changed event

      const additionalParameters = {};
      if (properties?.oldSizeScaleId && properties?.sizeScaleId) {
        additionalParameters[
          'scaleList'
        ] = `${properties?.oldSizeScaleId}, ${properties?.sizeScaleId}`;
      } else {
        logger.warn(
          `[Omnitracking] - Event ${data.event} properties "oldSizeScaleId" and "scaleId" should be sent on the
                        payload when triggering a "change size" event. If you want to track this event, make sure to
                        pass these two properties.`,
        );
      }

      if (properties?.sizeId && properties?.oldSizeId) {
        additionalParameters[
          'sizeList'
        ] = `${properties?.oldSizeId}, ${properties?.sizeId}`;
      } else {
        logger.warn(
          `[Omnitracking] - Event ${data.event} properties "oldSizeId" and "sizeId" should be sent on the
                        payload when triggering a "change size" event. If you want to track this event, make sure to
                        pass these two properties.`,
        );
      }

      eventList.push({
        ...additionalParameters,
        tid: 2920,
        productId: getOmnitrackingProductId(data),
        actionArea: properties?.from,
      });
    }

    if (
      isFinite(properties.quantity) &&
      properties.oldQuantity !== properties.quantity
    ) {
      // quantity changed event

      eventList.push({
        tid: 2919,
        productId: getOmnitrackingProductId(data),
        actionArea: properties?.from,
        itemQuantity: properties?.quantity,
      });
    }

    return eventList;
  },
};

/**
 * Interested events for page tracking.
 * If there is a page event that can have specific rules or parameters,
 * make sure to define it in this mapper.
 */
export const pageEventsMapper = {
  [pageTypes.PRODUCT_DETAILS]: data => ({
    viewType: 'Product',
    viewSubType: 'Product',
    lineItems: getProductLineItems(data),
  }),
  [pageTypes.PRODUCT_LISTING]: data => ({
    viewType: 'Listing',
    viewSubType: 'Listing',
    lineItems: getProductLineItems(data),
  }),
  [pageTypes.WISHLIST]: data => ({
    viewType: 'Wishlist',
    viewSubType: 'Wishlist',
    lineItems: getProductLineItems(data),
    wishlistQuantity: getProductLineItemsQuantity(data.properties.products),
  }),
  [pageTypes.CHECKOUT]: data => ({
    ...getCheckoutEventGenericProperties(data, true),
    viewType: 'Checkout SPA',
    viewSubType: 'Checkout SPA',
    orderValue: data.properties?.total,
    shippingTotalValue: data.properties?.shipping,
  }),
  [pageTypes.BAG]: data => ({
    viewType: 'Shopping Bag',
    viewSubType: 'Bag',
    lineItems: getProductLineItems(data),
    basketQuantity: getProductLineItemsQuantity(data.properties.products),
    basketValue: data.properties?.value,
  }),
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

export const viewGenderValuesMapper = {
  Kids: 'Kids',
  Men: 'Men',
  Women: 'Women',
  Undefined: 'Undefined',
};
