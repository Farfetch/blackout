import {
  generatePaymentAttemptReferenceId,
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getOmnitrackingProductId,
  getProductLineItems,
  getProductLineItemsQuantity,
  getValParameterForEvent,
} from './omnitracking-helper';
import { logger } from '../../utils';
import eventTypes from '../../types/eventTypes';
import interactionTypes from '../../types/interactionTypes';
import pageTypes from '../../types/pageTypes';
import type { EventData, TrackTypesValues } from '../..';
import type {
  OmnitrackingTrackEventParameters,
  OmnitrackingTrackEventsMapper,
} from './types/Omnitracking.types';

export const PRODUCT_ID_PARAMETER = 'productId';
export const PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST = 'id';

/**
 * Common parameters to any event. This list is extended by each page event
 * definition.
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
] as const;

/**
 * Common `track` (PageAction) and Page (PageView) parameters.
 */
export const commonTrackAndPageParams = [
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
] as const;

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
] as const;

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
    'orderId',
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
} as const;

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
] as const;

export const systemActionParameters = [] as const;

export const trackDefinitions = [
  ...systemActionParameters,
  ...pageActionParameters,
  ...commonTrackAndPageParams,
  ...commonTrackAndGenericPageParams,
  'val',
  'tid',
] as const;

/**
 * Page action event types expected by Omnitracking to be sent on the 'event'
 * parameter.
 */
export const pageActionEventTypes = {
  PAGE_ACTION: 'PageAction',
  SYSTEM_ACTION: 'SystemAction',
} as const;

/**
 * Page view event types expected by Omnitracking to be sent on the 'event'
 * parameter.
 */
export const pageViewEventTypes = {
  GenericPageVisited: 'GenericPageVisited',
  ProductPageVisited: 'ProductPageVisited',
  ListingPageVisited: 'ListingPageVisited',
  CheckoutPageVisited: 'CheckoutPageVisited',
} as const;

/**
 * Events mapper with possible keywords for each event type. This keywords can
 * match both with `window.location.href` or the page name passed via
 * `analytics.page(name, properties)`.
 */
export const pageEventsFilter: {
  [K in keyof Omit<typeof pageViewEventTypes, 'GenericPageVisited'>]: Readonly<
    Array<string>
  >;
} = {
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
} as const;

/**
 * Interested events for tracking. If there is an event that can have different
 * TIDs depending on the `from` parameter, make sure to define it, along with any
 * specific parameter, if applicable.
 */
export const trackEventsMapper: Readonly<OmnitrackingTrackEventsMapper> = {
  [eventTypes.SIGNUP_FORM_VIEWED]: (data: EventData<TrackTypesValues>) => ({
    tid: 10097,
    val: getValParameterForEvent({
      type: 'REGISTER',
      paymentAttemptReferenceId: generatePaymentAttemptReferenceId(data),
    }),
  }),
  [eventTypes.CHECKOUT_STEP_VIEWED]: (data: EventData<TrackTypesValues>) => ({
    tid: 10097,
    val: getValParameterForEvent({
      type: 'SUBMIT',
      paymentAttemptReferenceId: generatePaymentAttemptReferenceId(data),
    }),
  }),
  [eventTypes.ADDRESS_INFO_ADDED]: data => ({
    tid: 2911,
    checkoutStep: data.properties?.step,
    deliveryInformationDetails: getDeliveryInformationDetails(data),
    interactionType: data.properties?.interactionType,
  }),
  [eventTypes.PLACE_ORDER_STARTED]: (data: EventData<TrackTypesValues>) => {
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
        promocode: data.properties?.coupon,
        shippingTotalValue: data.properties?.shipping,
      },
    ];
  },
  [eventTypes.CHECKOUT_STARTED]: data => ({
    tid: 2918,
    basketValue: data.properties.total,
    basketCurrency: data.properties.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.CHECKOUT_STEP_EDITING]: data => ({
    tid: 2923,
    checkoutStep: data.properties.step,
  }),
  [eventTypes.PAYMENT_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2912,
  }),
  [eventTypes.SHIPPING_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2914,
  }),
  [eventTypes.SHIPPING_METHOD_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2913,
  }),
  [eventTypes.ORDER_COMPLETED]: data => ({
    tid: 2831,
    ...getCheckoutEventGenericProperties(data),
  }),
  [eventTypes.LOGOUT]: () => ({
    tid: 431,
  }),
  [eventTypes.SIGNUP_NEWSLETTER]: data => ({
    tid: 2831,
    gender: getGenderValueFromProperties(data),
  }),
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 2916,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 2925,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_LIST_VIEWED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2832,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.CHECKOUT_ABANDONED]: () => ({
    tid: 2084,
  }),
  [eventTypes.PROMOCODE_APPLIED]: (data: EventData<TrackTypesValues>) => ({
    tid: 311,
    promoCode: data.properties?.coupon,
    hasError: !!data.properties?.errorMessage,
    errorMessage: data.properties?.errorMessage,
  }),
  [eventTypes.SHARE]: (data: EventData<TrackTypesValues>) => ({
    tid: 1205,
    actionArea: data.properties?.from,
    productId: getOmnitrackingProductId(data),
  }),
  [eventTypes.LOGIN]: (data: EventData<TrackTypesValues>) => ({
    tid: 2924,
    loginType: data.properties?.method,
  }),
  [eventTypes.SIGNUP_FORM_COMPLETED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2927,
    loginType: data.properties?.method,
  }),
  [eventTypes.PRODUCT_CLICKED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2926,
    actionArea: data.properties?.from,
    productId: getOmnitrackingProductId(data),
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_ADDED_TO_CART]: (data: EventData<TrackTypesValues>) => ({
    tid: 2915,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 131,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [eventTypes.SELECT_CONTENT]: (data: EventData<TrackTypesValues>) => {
    const properties = data.properties;

    if (!properties?.contentType || !properties?.id) {
      logger.error(
        `[Omnitracking] - Event ${data.event} properties "contentType" and "id" should be sent 
                        on the payload when triggering a "select content" event. If you want to track this 
                        event, make sure to pass these two properties.`,
      );
      return undefined;
    }

    return {
      tid: 2895,
      contentType: properties?.contentType,
      interactionType: properties?.interactionType,
      val: properties?.id,
      productId: getOmnitrackingProductId(data, true),
    } as OmnitrackingTrackEventParameters;
  },
  [eventTypes.FILTERS_APPLIED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2921,
    filtersApplied: data.properties?.filters,
  }),
  [eventTypes.FILTERS_CLEARED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2917,
    filtersApplied: data.properties?.filters,
  }),
  [eventTypes.INTERACT_CONTENT]: (data: EventData<TrackTypesValues>) => {
    if (data.properties?.interactionType === interactionTypes.SCROLL) {
      if (data.properties?.target === document.body)
        return {
          tid: 668,
          scrollDepth: data.properties?.percentageScrolled,
        };

      return;
    }

    if (!data.properties?.contentType || !data.properties?.id) {
      logger.error(
        `[Omnitracking] - Event ${data.event} properties "contentType" and "id" should be sent 
                        on the payload when triggering a "select content" event. If you want to track this 
                        event, make sure to pass these two properties.`,
      );
      return;
    }

    return {
      tid: 2882,
      contentType: data.properties?.contentType,
      interactionType: data.properties?.interactionType,
      val: data.properties?.id,
      actionArea: data.properties?.state,
    } as OmnitrackingTrackEventParameters;
  },
} as const;

/**
 * Interested events for page tracking.
 * If there is a page event that can have specific rules or parameters,
 * make sure to define it in this mapper.
 */
export const pageEventsMapper = {
  [pageTypes.PRODUCT_DETAILS]: (data: EventData<TrackTypesValues>) => ({
    viewType: 'Product',
    viewSubType: 'Product',
    lineItems: getProductLineItems(data),
  }),
  [pageTypes.PRODUCT_LISTING]: (data: EventData<TrackTypesValues>) => ({
    viewType: 'Listing',
    viewSubType: 'Listing',
    lineItems: getProductLineItems(data),
  }),
  [pageTypes.CHECKOUT]: (data: EventData<TrackTypesValues>) => ({
    ...getCheckoutEventGenericProperties(data),
    viewType: 'Checkout SPA',
    viewSubType: 'Checkout SPA',
    orderValue: data.properties?.total,
    shippingTotalValue: data.properties?.shipping,
  }),
  [pageTypes.WISHLIST]: (data: EventData<TrackTypesValues>) => ({
    viewType: 'Wishlist',
    viewSubType: 'Wishlist',
    lineItems: getProductLineItems(data),
    wishlistQuantity: getProductLineItemsQuantity(data.properties.products),
  }),
  [pageTypes.BAG]: (data: EventData<TrackTypesValues>) => ({
    viewType: 'Shopping Bag',
    viewSubType: 'Bag',
    lineItems: getProductLineItems(data),
    basketQuantity: getProductLineItemsQuantity(data.properties.products),
    basketValue: data.properties.value,
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
} as const;

export const viewGenderValuesMapper = {
  Kids: 'Kids',
  Men: 'Men',
  Women: 'Women',
  Undefined: 'Undefined',
} as const;
