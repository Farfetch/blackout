import {
  getCheckoutEventGenericProperties,
  getCommonCheckoutStepTrackingData,
  getDeliveryInformationDetails,
  getGenderValueFromProperties,
  getProductLineItems,
  getProductLineItemsQuantity,
} from './omnitracking-helper.js';
import { getProductId, logger } from '../../utils/index.js';
import { isNil } from 'lodash-es';
import EventTypes from '../../types/EventTypes.js';
import InteractionTypes from '../../types/InteractionTypes.js';
import PageTypes from '../../types/PageTypes.js';
import type {
  EventData,
  EventProperties,
  TrackTypesValues,
} from '../../index.js';
import type {
  OmnitrackingPageEventsMapper,
  OmnitrackingTrackEventParameters,
  OmnitrackingTrackEventsMapper,
} from './types/Omnitracking.types.js';

export const PRODUCT_ID_PARAMETER = 'productId';

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
 * Returns the filter properties from an event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Object containing the filter properties.
 */
const getFilterParametersFromEvent = (eventProperties: EventProperties) =>
  eventProperties.filters ? JSON.stringify(eventProperties.filters) : undefined;

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
    PageTypes.PRODUCT_LISTING,
    PageTypes.SEARCH,
    'ProductList',
    'listing',
    'search',
    'sets',
  ],
  [pageViewEventTypes.ProductPageVisited]: [
    PageTypes.PRODUCT_DETAILS,
    'ProductDetail',
    'product',
  ],
  [pageViewEventTypes.CheckoutPageVisited]: [
    PageTypes.CHECKOUT,
    PageTypes.CHECKOUT_DELIVERY_METHOD,
    PageTypes.CHECKOUT_PAYMENT,
    PageTypes.CHECKOUT_REVIEW,
    PageTypes.CHECKOUT_SHIPPING,
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
  [EventTypes.ADDRESS_INFO_ADDED]: data => ({
    tid: 2911,
    ...getCheckoutEventGenericProperties(data),
    checkoutStep: data.properties?.step,
    deliveryInformationDetails: getDeliveryInformationDetails(data),
    interactionType: data.properties?.interactionType,
  }),
  [EventTypes.BILLING_INFO_ADDED]: data => ({
    tid: 3647,
    ...getCheckoutEventGenericProperties(data),
    checkoutStep: data.properties?.step,
    promocode: data.properties?.coupon,
    basketCurrency: data.properties?.currency,
    basketValue: data.properties?.total,
    addressFinder: data.properties?.addressFinder,
  }),
  [EventTypes.PLACE_ORDER_STARTED]: data => {
    return {
      tid: 188,
      ...getCheckoutEventGenericProperties(data),
      promocode: data.properties?.coupon,
      shippingTotalValue: data.properties?.shipping,
    };
  },
  [EventTypes.CHECKOUT_STARTED]: data => ({
    tid: 2918,
    ...getCheckoutEventGenericProperties(data),
    deliveryInformationDetails: getDeliveryInformationDetails(data),
    basketCurrency: data.properties?.currency,
    basketValue: data.properties?.total,
    checkoutStep: data.properties?.step,
    lineItems: getProductLineItems(data),
    paymentType: data.properties?.paymentType,
    shipping: data.properties?.shipping,
    orderVAT: data.properties?.tax,
    loginType: data.properties?.method,
  }),
  [EventTypes.DELIVERY_METHOD_ADDED]: data => ({
    tid: 3654,
    ...getCheckoutEventGenericProperties(data),
    ...getCommonCheckoutStepTrackingData(data),
    basketValue: data.properties.total,
    basketCurrency: data.properties.currency,
    promoCode: data.properties?.coupon,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.CHECKOUT_STEP_EDITING]: data => ({
    tid: 2923,
    ...getCheckoutEventGenericProperties(data),
    checkoutStep: data.properties?.step,
  }),
  [EventTypes.PAYMENT_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2912,
  }),
  [EventTypes.SHIPPING_INFO_ADDED]: data => ({
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2914,
  }),
  [EventTypes.SHIPPING_METHOD_ADDED]: data => ({
    ...getCheckoutEventGenericProperties(data),
    ...getCommonCheckoutStepTrackingData(data),
    tid: 2913,
  }),
  [EventTypes.ORDER_COMPLETED]: data => ({
    tid: 2831,
    ...getCheckoutEventGenericProperties(data),
  }),
  [EventTypes.LOGOUT]: () => ({
    tid: 431,
  }),
  [EventTypes.SIGNUP_NEWSLETTER]: data => ({
    tid: 1040,
    gender: getGenderValueFromProperties(data),
  }),
  [EventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 2916,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 2925,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    wishlistId: data.properties?.wishlistId,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.PRODUCT_LIST_VIEWED]: data => ({
    tid: 2832,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.CHECKOUT_ABANDONED]: data => ({
    tid: 2084,
    ...getCheckoutEventGenericProperties(data),
    deliveryInformationDetails: getDeliveryInformationDetails(data),
    checkoutStep: data.properties?.step,
    paymentType: data.properties?.paymentType,
    shipping: data.properties?.shipping,
    orderVAT: data.properties?.tax,
  }),
  [EventTypes.PROMOCODE_APPLIED]: data => ({
    tid: 311,
    ...getCheckoutEventGenericProperties(data),
    promoCode: data.properties?.coupon,
    hasError: !!data.properties?.errorMessage,
    errorMessage: data.properties?.errorMessage,
  }),
  [EventTypes.SHARE]: data => ({
    tid: 1205,
    actionArea: data.properties?.from,
    productId: getProductId(data.properties),
  }),
  [EventTypes.LOGIN]: data => ({
    tid: 2924,
    loginType: data.properties?.method,
  }),
  [EventTypes.SIGNUP_FORM_COMPLETED]: data => ({
    tid: 2927,
    loginType: data.properties?.method,
  }),
  [EventTypes.PRODUCT_CLICKED]: data => ({
    tid: 2926,
    actionArea: data.properties?.from,
    productId: getProductId(data.properties),
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.PRODUCT_ADDED_TO_CART]: data => ({
    tid: 2915,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.PRODUCT_REMOVED_FROM_CART]: (
    data: EventData<TrackTypesValues>,
  ) => ({
    tid: 131,
    actionArea: data.properties?.from,
    priceCurrency: data.properties?.currency,
    lineItems: getProductLineItems(data),
  }),
  [EventTypes.SELECT_CONTENT]: data => {
    const properties = data.properties;

    // Treat id=0 as a truthy value in this event
    if (!properties?.contentType || isNil(properties?.id)) {
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
      productId: properties?.productId,
    } as OmnitrackingTrackEventParameters;
  },
  [EventTypes.FILTERS_APPLIED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2917,
    filtersApplied: getFilterParametersFromEvent(data.properties),
  }),
  [EventTypes.FILTERS_CLEARED]: (data: EventData<TrackTypesValues>) => ({
    tid: 2921,
    filtersApplied: getFilterParametersFromEvent(data.properties),
  }),
  [EventTypes.INTERACT_CONTENT]: (data: EventData<TrackTypesValues>) => {
    if (data.properties?.interactionType === InteractionTypes.SCROLL) {
      if (data.properties?.target === document.body) {
        return {
          tid: 668,
          scrollDepth: data.properties?.percentageScrolled,
        };
      }

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
  [EventTypes.PRODUCT_UPDATED]: data => {
    const eventList = [];
    const properties = data.properties;

    if (properties.colour && properties.oldColour !== properties.colour) {
      // color changed event
      const additionalParameters = {} as Record<string, unknown>;

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
        productId: getProductId(properties),
        actionArea: properties?.from,
      });
    }

    if (properties.size && properties.oldSize !== properties.size) {
      // size changed event

      const additionalParameters = {} as Record<string, unknown>;

      if (properties?.oldSizeScaleId && properties?.sizeScaleId) {
        additionalParameters[
          'scaleList'
        ] = `${properties?.oldSizeScaleId}, ${properties?.sizeScaleId}`;
      } else {
        logger.warn(
          `[Omnitracking] - Event ${data.event} properties "oldSizeScaleId" and "sizeScaleId" should be sent on the
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
        productId: getProductId(properties),
        actionArea: properties?.from,
      });
    }

    if (
      isFinite(properties.quantity as number) &&
      properties.oldQuantity !== properties.quantity
    ) {
      // quantity changed event

      eventList.push({
        tid: 2919,
        productId: getProductId(properties),
        actionArea: properties?.from,
        itemQuantity: properties?.quantity,
      });
    }

    return eventList;
  },
} as const;

/**
 * Interested events for page tracking.
 * If there is a page event that can have specific rules or parameters,
 * make sure to define it in this mapper.
 */
export const pageEventsMapper: Readonly<OmnitrackingPageEventsMapper> = {
  [PageTypes.PRODUCT_DETAILS]: data => ({
    viewType: 'Product',
    viewSubType: 'Product',
    lineItems: getProductLineItems(data),
  }),
  [PageTypes.PRODUCT_LISTING]: data => ({
    viewType: 'Listing',
    viewSubType: 'Listing',
    lineItems: getProductLineItems(data),
  }),
  [PageTypes.CHECKOUT]: data => ({
    ...getCheckoutEventGenericProperties(data),
    viewType: 'Checkout SPA',
    viewSubType: 'Checkout SPA',
    orderValue: data.properties?.total,
    shippingTotalValue: data.properties?.shipping,
  }),
  [PageTypes.WISHLIST]: data => ({
    viewType: 'Wishlist',
    viewSubType: 'Wishlist',
    lineItems: getProductLineItems(data),
    wishlistQuantity: getProductLineItemsQuantity(data.properties?.products),
  }),
  [PageTypes.BAG]: data => ({
    viewType: 'Shopping Bag',
    viewSubType: 'Bag',
    lineItems: getProductLineItems(data),
    basketQuantity: getProductLineItemsQuantity(data.properties?.products),
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
} as const;

export const viewGenderValuesMapper = {
  Kids: 'Kids',
  Men: 'Men',
  Women: 'Women',
  Undefined: 'Undefined',
} as const;
