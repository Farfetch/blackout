/**
 * @module Omnitracking/definitions
 * @private
 */

import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getProductLineItems,
  getProductLineItemsQuantity,
  getRecommendationsTrackingData,
  getValParameterForEvent,
} from './omnitracking-helper';
import { getProductId } from '../../utils/getters';
import eventTypes from '../../types/eventTypes';
import interactionTypes from '../../types/interactionTypes';
import logger from '../../utils/logger';
import pageTypes from '../../types/pageTypes';

export const PRODUCT_ID_PARAMETER = 'productId';

/**
 * Common parameters to any event.
 * This list is extended by each page event definition.
 */
const commonPageParams = [
  'abTests',
  'assistantUserId',
  'baselinePolicies',
  'basketId',
  'basketQuantity',
  'categoryIdList',
  'checkboxFilter',
  'clientAdvertisingID',
  'clientCulture',
  'clientGender',
  'clientInstallId',
  'clientLanguage',
  'clientSDKVersion',
  'communicationPreferences',
  'crossDeviceCorrelationId',
  'designerIdList',
  'device',
  'deviceId',
  'deviceLanguage',
  'deviceOS',
  'domainUrl',
  'elementsSeen',
  'exitInteraction',
  'fittingRoomID',
  'fittingRoomList',
  'geoLocationCity',
  'geoLocationState',
  'hasAttachment',
  'hashedIp',
  'httpStatusCode',
  'impersonateUserId',
  'inStoreSessionId',
  'internalRequest',
  'isBot',
  'isExclusive',
  'isLogged',
  'isReviewAvailable',
  'itemList',
  'itemStoreStockList',
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
  'quantityList',
  'recommendationSource',
  'referrer',
  'referrerHost',
  'referrerUnionId',
  'returnDetails',
  'returnItemsSelectionList',
  'rewardCardsInformation',
  'screenHeight',
  'screenWidth',
  'searchResultsType',
  'searchSuggestion',
  'searchType',
  'sessionId',
  'startedTyping',
  'stockpointId',
  'stylistId',
  'suggestionType',
  'url',
  'userBenefits',
  'userCountryLocation',
  'userGender',
  'userRole',
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
  'analyticsPackageVersion',
  'appointmentDetails',
  'basketCurrency',
  'basketValue',
  'bookmarkId',
  'bookmarkItemList',
  'boostRanking',
  'bundleAttributes',
  'bundleId',
  'categoryName',
  'clientCountry',
  'clientTimestamp',
  'clientVersion',
  'department',
  'dismiss',
  'dropDownListOptions',
  'errorMessage',
  'fittingRoomName',
  'functionalConsent',
  'geoLocation',
  'hasError',
  'hasNewMessages',
  'inputType',
  'integrationId',
  'ip',
  'isCustomer',
  'isMainWishlist',
  'itemPriceList',
  'itemSalePriceList',
  'itemStockList',
  'itemStoreList',
  'lineItems',
  'listIndex',
  'loginType',
  'merchantLocationId',
  'messageComponentsList',
  'messageId',
  'messageNumber',
  'partnerDocuments',
  'performanceConsent',
  'promotionValue',
  'pushPayload',
  'requestId',
  'requestStatus',
  'scrollDepth',
  'searchQuery',
  'searchResultCount',
  'selectedPaymentMethod',
  'shipmentIndex',
  'shipmentQuantity',
  'skuItemList',
  'status',
  'storeConnections',
  'storeId',
  'submittedQuery',
  'subscriptionId',
  'tagList',
  'taskManager',
  'uniqueViewId',
  'userAgent',
  'utmCampaign',
  'utmContent',
  'utmMedium',
  'utmSource',
  'utmTerm',
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
    PRODUCT_ID_PARAMETER,
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
  'categoryId',
  'checkoutOrderId',
  'contentProvider',
  'contentType',
  'countPromoProducts',
  'countSaleProducts',
  'deeplinkSource',
  'deliveryInformationDetails',
  'designerId',
  'designerName',
  'dropDownListSelection',
  'filterArea',
  'filtersAutoAppliedSource',
  'filtersAvailable',
  'filtersCoordinates',
  'filtersIsVisible',
  'fittingRoomQuantity',
  'imageNumber',
  'isFixedMerchant',
  'itemColourId',
  'itemCoordinates',
  'itemListName',
  'itemQuantity',
  'itemSize',
  'loadItemCoordinate',
  'moduleBenefit',
  'moduleContentDepartment',
  'moduleContentID',
  'moduleContentName',
  'moduleContentPublicationDate',
  'moduleContentVersion',
  'moduleId',
  'moduleLoadTime',
  'modulePublicationDate',
  'moduleState',
  'moduleType',
  'moduleVersion',
  'moduleWasInteracted',
  'moduleWasSeen',
  'numberOfColours',
  'orderCode',
  'orderCodeId',
  'orderValue',
  'orderVAT',
  'partnersSubscriptionList',
  'productCount',
  'productPackagingOptions',
  'promoCode',
  'promotionDetails',
  'provider',
  'recommendationsId',
  'recommendationsModuleName',
  'recommendationsProductList',
  'recommendationsStrategy',
  'recsLoaded',
  'recsRequested',
  'recsStrategy',
  'recsType',
  'refundInformationDetails',
  'shippingTotalValue',
  'slotIndex',
  'sortOption',
  'sourceDescription',
  'sourceGroupDescription',
  'sourceId',
  'sourceType',
  'sourceWasSeen',
  'targetId',
  'targetType',
  'totalOriginalAmount',
  'totalSaleDiscount',
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
    actionArea: data.properties?.from,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.CHECKOUT_ABANDONED]: data => ({
    tid: 2084,
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    paymentType: data.properties?.paymentType,
    shipping: data.properties?.shipping,
    orderVAT: data.properties?.tax,
  }),
  [eventTypes.CHECKOUT_STEP_EDITING]: data => ({
    tid: 2923,
    ...getCheckoutEventGenericProperties(data, true),
    checkoutStep: data.properties.step,
  }),
  [eventTypes.CHECKOUT_STARTED]: data => ({
    tid: 2918,
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    basketValue: data.properties.total,
    basketCurrency: data.properties.currency,
    lineItems: getProductLineItems(data),
    paymentType: data.properties?.paymentType,
    shipping: data.properties?.shipping,
    orderVAT: data.properties?.tax,
    loginType: data.properties?.method,
  }),
  [eventTypes.DELIVERY_METHOD_ADDED]: data => ({
    tid: 3654,
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    basketValue: data.properties.total,
    basketCurrency: data.properties.currency,
    promoCode: data.properties.coupon,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.SHARE]: data => ({
    tid: 1205,
    actionArea: data.properties?.method,
    productId: getProductId(data.properties),
  }),
  [eventTypes.PROMOCODE_APPLIED]: data => ({
    tid: 311,
    ...getCheckoutEventGenericProperties(data, true),
    promoCode: data.properties.coupon,
    hasError: !!data.properties?.errorMessage,
    errorMessage: data.properties?.errorMessage,
  }),
  [eventTypes.ORDER_COMPLETED]: data => ({
    tid: 2831,
    ...getCheckoutEventGenericProperties(data, true),
    addressFinder: data.properties?.addressFinder,
    checkoutStep: data.properties?.step,
    paymentType: data.properties?.paymentType,
    deliveryInformationDetails: getDeliveryInformationDetails(data),
  }),
  [eventTypes.SIGNUP_NEWSLETTER]: data => ({
    tid: 1040,
    gender: getGenderValueFromProperties(data),
  }),
  [eventTypes.ADDRESS_INFO_ADDED]: data => ({
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2911,
  }),
  [eventTypes.BILLING_INFO_ADDED]: data => ({
    tid: 3647,
    ...getCheckoutEventGenericProperties(data),
    addressFinder: data.properties.addressFinder,
    basketCurrency: data.properties.currency,
    basketValue: data.properties.total,
    checkoutStep: data.properties.step,
    promocode: data.properties.coupon,
  }),
  [eventTypes.PAYMENT_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2912,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.SHIPPING_INFO_ADDED]: data => ({
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2914,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.SHIPPING_METHOD_ADDED]: data => ({
    ...getCheckoutEventGenericProperties(data, true),
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2913,
    selectedPaymentMethod: data.properties?.paymentType,
  }),
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => ({
    tid: 2915,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: data => ({
    tid: 131,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => ({
    tid: 2916,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: data => ({
    tid: 2925,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.PRODUCT_CLICKED]: data => ({
    tid: 2926,
    actionArea: data.properties?.from,
    productId: getProductId(data.properties),
    lineItems: getProductLineItems(data),
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
  }),
  [eventTypes.FILTERS_APPLIED]: data => ({
    tid: 2917,
    actionArea: data.properties?.from,
    filtersApplied: data.properties?.filters
      ? JSON.stringify(data.properties?.filters)
      : undefined,
  }),
  [eventTypes.FILTERS_CLEARED]: data => ({
    tid: 2921,
    actionArea: data.properties?.from,
    filtersApplied: data.properties?.filters
      ? JSON.stringify(data.properties?.filters)
      : undefined,
  }),
  [eventTypes.LOGIN]: data => ({
    tid: 2924,
    loginType: data.properties?.method,
  }),
  [eventTypes.SIGNUP_FORM_COMPLETED]: data => ({
    tid: 2927,
    loginType: data.properties?.method,
  }),
  [eventTypes.INTERACT_CONTENT]: data => {
    const properties = data.properties;

    if (properties?.interactionType === interactionTypes.SCROLL) {
      if (properties.target === document.body)
        return {
          tid: 668,
          scrollDepth: properties.percentageScrolled,
        };

      return;
    }

    if (!properties?.contentType || !properties?.interactionType) {
      logger.error(
        `[Omnitracking] - Event ${data.event} properties "contentType" and "interactionType" should be sent
                        on the payload when triggering a "interact content" event. If you want to track this event, make
                        sure to pass these two properties.`,
      );
      return;
    }

    return {
      tid: 2882,
      contentType: properties?.contentType,
      interactionType: properties?.interactionType,
      val: properties?.id,
      actionArea: properties?.state,
    };
  },
  [eventTypes.SELECT_CONTENT]: data => {
    const properties = data.properties;

    if (!properties?.contentType || !properties?.id) {
      logger.error(
        `[Omnitracking] - Event ${data.event} properties "contentType" and "id" should be sent
                        on the payload when triggering a "select content" event. If you want to track this
                        event, make sure to pass these two properties.`,
      );
      return;
    }

    return {
      tid: 2895,
      contentType: properties?.contentType,
      interactionType: properties?.interactionType,
      val: properties?.id,
      productId: properties?.productId,
    };
  },
  [eventTypes.PRODUCT_UPDATED]: data => {
    const eventList = [];
    const properties = data.properties;
    const genericEventProperties = {
      productId: getProductId(properties),
      actionArea: properties?.from,
      listIndex: properties?.position,
      storeID: properties?.locationId,
    };

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
        ...genericEventProperties,
        ...additionalParameters,
        tid: 2098,
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
        ...genericEventProperties,
        ...additionalParameters,
        tid: 2920,
      });
    }

    if (
      isFinite(properties.quantity) &&
      properties.oldQuantity !== properties.quantity
    ) {
      // quantity changed event

      eventList.push({
        ...genericEventProperties,
        tid: 2919,
        itemQuantity: properties?.quantity,
      });
    }

    return eventList;
  },
  [eventTypes.SITE_PERFORMANCE]: data => {
    const performanceStats = data?.properties?.performanceStats;
    if (performanceStats && typeof performanceStats === 'object') {
      return {
        tid: 1217,
        performanceTimings: JSON.stringify(performanceStats),
      };
    }

    logger.error(
      `[Omnitracking] - Event "${data.event}": To track this event, a valid "performanceStats" property should be added to the payload.`,
    );
    return;
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
    listIndex: data.properties?.position,
    ...getRecommendationsTrackingData(data),
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
