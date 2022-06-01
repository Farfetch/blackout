import {
  generatePaymentAttemptReferenceId,
  getParameterValueFromEvent,
  getValParameterForEvent,
} from './omnitracking-helper';
import eventTypes from '../../types/eventTypes';
import fromParameterTypes from '../../types/fromParameterTypes';
import pageTypes from '../../types/pageTypes';
import type { EventData, TrackTypesValues } from '../..';
import type { OmnitrackingTrackEventsMapper } from './types/Omnitracking.types';

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
  'stockpointId',
  'suggestionType',
  'url',
  'userAgent',
  'userBenefits',
  'userCountryLocation',
  'userGender',
  'userRole',
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
  'bookmarkId',
  'bookmarkItemList',
  'categoryName',
  'clientTimestamp',
  'department',
  'dismiss',
  'errorMessage',
  'fittingRoomName',
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
  'moduleWasInteracted',
  'moduleWasSeen',
  'numberOfColours',
  'orderCode',
  'orderCodeId',
  'partnersSubscriptionList',
  'priceCurrency',
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
  'tid',
  'totalStock',
  'totalStockInStore',
  'unitFullPrice',
  'unitSalePrice',
  'val',
  PRODUCT_ID_PARAMETER,
] as const;

export const systemActionParameters = [] as const;

export const trackDefinitions = [
  ...systemActionParameters,
  ...pageActionParameters,
  ...commonTrackAndPageParams,
  ...commonTrackAndGenericPageParams,
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
      },
    ];
  },
  [eventTypes.LOGOUT]: () => ({
    tid: 431,
  }),
  [eventTypes.PRODUCT_ADDED_TO_CART]: (data: EventData<TrackTypesValues>) => {
    const val = `${
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER) ||
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST)
    }`;

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
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const val = `${
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER) ||
      getParameterValueFromEvent(data, PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST)
    }`;

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
} as const;

export const userGenderValuesMapper = {
  0: 'NotDefined',
  1: 'Male',
  2: 'Female',
  // Cover the cases where we're already receiving the value instead of the ID and map for the omnitracking contract
  NotDefined: 'NotDefined',
  Male: 'Male',
  Female: 'Female',
} as const;
