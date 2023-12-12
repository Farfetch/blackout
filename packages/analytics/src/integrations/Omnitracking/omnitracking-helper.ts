import {
  ANALYTICS_UNIQUE_EVENT_ID,
  getCheckoutOrderIdentificationProperties,
  getProductId,
  logger,
} from '../../utils/index.js';
import {
  type AnalyticsProduct,
  type EventData,
  FromParameterType,
  SignupNewsletterGenderType,
  type TrackType,
  type TrackTypesValues,
} from '../../index.js';
import {
  CLIENT_LANGUAGES_LIST,
  DEFAULT_CLIENT_LANGUAGE,
  DEFAULT_SEARCH_QUERY_PARAMETERS,
} from './constants.js';
import { get, pick } from 'lodash-es';
import {
  isPageEventType,
  isScreenEventType,
} from '../../utils/typePredicates.js';
import {
  pageActionEventTypes,
  pageDefinitions,
  pageEventsFilter,
  pageViewEventTypes,
  trackDefinitions,
} from './definitions.js';
import PlatformType from '../../types/PlatformType.js';
import type {
  OmnitrackingCommonEventParameters,
  OmnitrackingPageEventParameters,
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventParameters,
  PageActionEvents,
  PageViewEvents,
  SearchQueryParameters,
  SpecificParametersBuilderByPlatform,
  SpecificParametersForEventType,
  ValParameter,
} from './types/Omnitracking.types.js';
import type URLParse from 'url-parse';

/**
 * Adds common parameters to all kinds of message types.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Object containing common parameters.
 */
export const getCommonParameters = (
  data: EventData<TrackTypesValues>,
): OmnitrackingCommonEventParameters => {
  const parameters: OmnitrackingCommonEventParameters = {
    clientTimestamp: new Date(data.timestamp).toJSON(),
    uuid: get(data, `context.event.${ANALYTICS_UNIQUE_EVENT_ID}`),
  };

  return parameters;
};

/**
 * This method tries to match the name passed by `analytics.page(name)` with the
 * `pageEventsFilter` keywords.
 *
 * @param pageType - Page type passed to analytics.
 *
 * @returns The event for the page type.
 */
export const getPageEventFromPageType = (
  pageType: EventData<TrackTypesValues>['event'],
): PageViewEvents | null => {
  let event: PageViewEvents | null = null;

  (
    Object.keys(pageEventsFilter) as Array<keyof typeof pageEventsFilter>
  ).forEach(key => {
    if (pageEventsFilter[key].indexOf(pageType) >= 0) {
      event = key;
    }
  });

  return event;
};

/**
 * This method tries to match some keyword from `eventMapper` with any word on the
 * `location.href`.
 *
 * @param location - Location object to check if there is any keyword that matches the `eventMapper`.
 *
 * @returns The event for the page.
 */
export const getPageEventFromLocation = (
  location?: URLParse<Record<string, string | undefined>>,
): PageViewEvents | null => {
  if (!location || !location.href) {
    return null;
  }

  let event = null;

  (
    Object.keys(pageEventsFilter) as Array<keyof typeof pageEventsFilter>
  ).forEach(key => {
    pageEventsFilter[key].forEach(keyword => {
      if (
        location.href.toLowerCase().indexOf(keyword.toLocaleLowerCase()) >= 0
      ) {
        event = key;
      }
    });
  });

  return event;
};

/**
 * Returns the correct event according the page the user is in.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Name of the event.
 */
export const getPageEvent = (
  data: EventData<TrackTypesValues>,
): PageViewEvents => {
  const location = get(data, 'context.web.window.location', {}) as URLParse<
    Record<string, string | undefined>
  >;
  const event =
    getPageEventFromPageType(data.event) || getPageEventFromLocation(location);

  return event || pageViewEventTypes.GenericPageVisited;
};

/**
 * Creates an object with specific parameters for a web app.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
function getSpecificWebParameters<T extends EventData<TrackTypesValues>>(
  data: T,
): SpecificParametersForEventType<T> {
  let commonParameters: SpecificParametersForEventType<T> =
    {} as SpecificParametersForEventType<T>;

  if (isPageEventType(data)) {
    const referrer = get(
      data,
      'context.web.pageLocationReferrer',
      '',
    ) as string;
    const location = get(data, 'context.web.window.location', {}) as URLParse<
      Record<string, string | undefined>
    >;
    const query = get(location, 'query', {}) as Record<string, string>;
    const internalRequest =
      referrer.indexOf(`${location.protocol}//${location.host}`) === 0;
    const pathname = get(
      data,
      'context.web.window.location.pathname',
      '',
    ) as string;

    const url = pathname.split('/');
    const subfolder = url[1]?.split('-');
    const userCountryLocation = (
      subfolder?.[1] ? subfolder?.[1] : subfolder?.[0]
    )?.toLowerCase();

    commonParameters = {
      referrer,
      internalRequest,
      url: location.href,
      userAgent: get(data, 'context.web.window.navigator.userAgent'),
      referrerHost: referrer.split('/')[2],
      screenWidth: get(data, 'context.web.window.screen.width'),
      screenHeight: get(data, 'context.web.window.screen.height'),
      deviceLanguage: get(data, 'context.web.window.navigator.language'),
      userCountryLocation,
      utmTerm: query.utm_term,
      utmSource: query.utm_source,
      utmMedium: query.utm_medium,
      utmContent: query.utm_content,
      utmCampaign: query.utm_campaign,
    } as SpecificParametersForEventType<typeof data>;
  }

  return commonParameters;
}

/**
 * Creates an object with specific parameters for a native app.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
function getSpecificMobileParameters<T extends EventData<TrackTypesValues>>(
  data: T,
): SpecificParametersForEventType<T> {
  const commonParameters: SpecificParametersForEventType<T> =
    {} as SpecificParametersForEventType<T>;

  if (isScreenEventType(data)) {
    const screenParameters = commonParameters as SpecificParametersForEventType<
      EventData<TrackType.Screen>
    >;
    // Referrer must be sent with an empty string when we don't have a value for it.
    const referrer = get(data, 'context.app.referrer', '');

    screenParameters.referrer = referrer;
  }

  return commonParameters;
}

/**
 * Defines the common parameters builder by platform.
 */
const specificParametersBuilderByPlatform: SpecificParametersBuilderByPlatform =
  {
    [PlatformType.Web]: getSpecificWebParameters,
    [PlatformType.Mobile]: getSpecificMobileParameters,
  } as const;

/**
 * Creates an object with parameters that are specific to a platform. These
 * parameters are collected and inferred by analytics `data` object, so there's no
 * need to pass these properties via `analytics.page()` or `analytics.track()`.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
export const getPlatformSpecificParameters = (
  data: EventData<TrackTypesValues>,
): SpecificParametersForEventType<typeof data> => {
  const platform = get(data, 'platform', PlatformType.Web);

  const specificPlatformParametersBuilder =
    specificParametersBuilderByPlatform[
      platform as (typeof PlatformType)[keyof typeof PlatformType]
    ];

  if (!specificPlatformParametersBuilder) {
    return {};
  }

  return specificPlatformParametersBuilder(data);
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass
 * unnecessary information for the event. We search for parameters in many
 * locations: context -\> device -\> app -\> event -\> properties Each location can
 * override the values of the previous one.
 *
 * @param data  - Event data passed by analytics.
 * @param event - Event name to filter properties by.
 *
 * @returns Result of the `pick()` method.
 */
export const pickPageParameters = (
  data: EventData<TrackTypesValues>,
  event: PageViewEvents,
): OmnitrackingPageEventParameters => {
  const eventPageDefinitions = pageDefinitions[event];

  return {
    ...pick(data.context, eventPageDefinitions),
    ...pick(data.context.app, eventPageDefinitions),
    ...pick(data.context.event, eventPageDefinitions),
    ...pick(data.properties, eventPageDefinitions),
  };
};

/**
 * @param data      - Event data passed by analytics.
 * @param parameter - Name of the parameter to obtain.
 *
 * @returns The value of the parameter if found in event data or null if not found.
 */
export const getParameterValueFromEvent = (
  data: EventData<TrackTypesValues>,
  parameter: string,
): unknown => {
  let value;

  const searchLocations = [
    data.context,
    data.context.app,
    data.context.event,
    data.properties,
  ];

  for (const location of searchLocations) {
    value = get(location, parameter);

    if (value) {
      return value;
    }
  }

  return null;
};

/**
 * @param valParameters - Properties to be appended to the stringified "val" parameter.
 *
 * @returns The object stringified.
 */
export const getValParameterForEvent = (
  valParameters: ValParameter = {},
): string => {
  return JSON.stringify(valParameters);
};

/**
 * Get the product unit sale price from a specific product.
 *
 * @param productData - Product data.
 *
 * @returns The unit sale price value, or undefined if no pricing data was found in productData argument.
 */
export const getProductUnitSalePrice = (
  productData: AnalyticsProduct,
): number | undefined => {
  if (typeof productData.unitSalePrice === 'number') {
    return productData.unitSalePrice;
  }

  if (
    typeof productData.priceWithoutDiscount === 'number' &&
    typeof productData.discountValue === 'number'
  ) {
    return productData.priceWithoutDiscount - productData.discountValue;
  }

  return undefined;
};

/**
 * Generates a payment attempt reference ID based on the correlationID (user local
 * ID) and the timestamp of the event.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns The payment attempt reference ID.
 */
export const generatePaymentAttemptReferenceId = (
  data: EventData<TrackTypesValues>,
): string => {
  const correlationId = get(data, 'user.localId', null);
  const timestamp = data.timestamp;

  return `${correlationId}_${timestamp}`;
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass
 * unnecessary information for the event. We search for parameters in many
 * locations: context -\> device -\> app -\> event -\> properties Each location can
 * override the values of the previous one.
 *
 * @param data             - Event data passed by analytics.
 * @param propertiesToPick - Array of property strings to pick. By default will pick all properties
 *                           defined in trackDefinitions variable.
 *
 * @returns Result of the `pick()` method.
 */
export const pickTrackParameters = (
  data: EventData<TrackTypesValues>,
  propertiesToPick = trackDefinitions,
): OmnitrackingTrackEventParameters => {
  return {
    ...pick(data.context, propertiesToPick),
    ...pick(data.context.app, propertiesToPick),
    ...pick(data.context.event, propertiesToPick),
    ...pick(data.properties, propertiesToPick),
  } as OmnitrackingTrackEventParameters;
};

/**
 * Type predicate that narrows the type of the passed in payload to a page action
 * payload.
 *
 * @param payload - Omnitracking payload to validate
 *
 * @returns True if the payload is for a page action.
 */
const isPageActionPayload = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
): payload is OmnitrackingRequestPayload<PageActionEvents> => {
  const event = get(payload, 'event', '');

  return Object.values(pageActionEventTypes).some(value => value === event);
};

/**
 * Validates if the payload to be sent to Omnitracking is correctly formed. For
 * now, it will only check if PageAction events contains the required tid
 * parameter.
 *
 * @param payload - Object corresponding to the payload that Omnitracking service expects.
 *
 * @returns True if the payload is correctly formed, false otherwise.
 */
export const validateOutgoingOmnitrackingPayload = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
) => {
  const isPageAction = isPageActionPayload(payload);

  if (isPageAction) {
    const parameters = get(
      payload,
      'parameters',
      {},
    ) as OmnitrackingTrackEventParameters;

    return !!parameters.tid;
  }

  return true;
};

/**
 * Fetches the searchQuery taking in account the option searchQueryParameters
 * passed by the user or by the default ones.
 *
 * @param data                  - Object corresponding to the payload that Omnitracking service
 *                                expects.
 * @param searchQueryParameters - List of possible searchQueryParameters passed by user.
 *
 * @returns The searchQuery used on the page.
 */
export const getSearchQuery = (
  data: EventData<TrackTypesValues>,
  searchQueryParameters: SearchQueryParameters | undefined | null,
): string | void => {
  const searchQueryParams =
    searchQueryParameters ?? DEFAULT_SEARCH_QUERY_PARAMETERS;

  for (let i = 0; i < searchQueryParams.length; i++) {
    const searchQuery = get(
      data,
      `context.web.window.location.query.${searchQueryParams[i]}`,
    );

    if (searchQuery) {
      return searchQuery;
    }
  }
};

/**
 * Returns the client language from the culture code, if matches one of the
 * possible client language values. If not, return the default one (en).
 *
 * @param culture - The current culture code.
 *
 * @returns The clientLanguage to be sent on the event.
 */
export const getClientLanguageFromCulture = (culture = '') => {
  const cultureSplit = culture.split('-');
  const clientLanguage = cultureSplit[0];

  return CLIENT_LANGUAGES_LIST.includes(clientLanguage as string)
    ? clientLanguage
    : DEFAULT_CLIENT_LANGUAGE;
};

/**
 * Mapper from product item to omnitracking product line item.
 *
 * @param productData - The product data.
 *
 * @returns The mapped `lineItems` in omnitracking contract.
 */
export const getOmnitrackingProductMapper = (
  productData: AnalyticsProduct,
) => ({
  productId: getProductId(productData),
  itemPromotion: productData.discountValue,
  designerName: productData.brand,
  category: (productData.category || '').split('/')[0],
  itemFullPrice: productData.priceWithoutDiscount,
  sizeId: productData.sizeId,
  itemQuantity: productData.quantity,
  promoCode: productData.coupon,
  storeId: productData.locationId,
  listIndex: productData.position,
  unitSalePrice: getProductUnitSalePrice(productData),
});

/**
 * Returns the client country from the subfolder code.
 *
 * @param subfolder - The current subfolder code.
 *
 * @returns The clientCountry to be sent on the event.
 */
export const getClientCountryFromSubfolder = (subfolder = '') => {
  const subfolderHasLanguage = subfolder.includes('-');

  // If the subfolder is only composed by country, return undefined.
  if (!subfolderHasLanguage) {
    return undefined;
  }

  const subfolderSplit = subfolder.split('-');
  const clientCountry = subfolderSplit[1];

  return clientCountry ? clientCountry.toUpperCase() : undefined;
};

/**
 * Transforms the product list payload into `lineItems` omnitracking parameter.
 *
 * @param data - The event tracking data.
 *
 * @returns The mapped `lineItems` in json format.
 */
export const getProductLineItems = (data: EventData<TrackTypesValues>) => {
  const properties = data?.properties || {};
  const productsList = properties.products;
  const productId = getProductId(properties);

  if (productsList && productsList.length) {
    const mappedProductList = productsList.map(getOmnitrackingProductMapper);

    return JSON.stringify(mappedProductList);
  }

  if (productId) {
    return JSON.stringify([getOmnitrackingProductMapper(properties)]);
  }

  return undefined;
};

/**
 * Get the first product id from line items omnitracking parameter.
 *
 * @param data - The event tracking data.
 *
 * @returns The first product id from line items parameter.
 */
export const getProductIdFromLineItems = (
  data: EventData<TrackTypesValues>,
) => {
  const lineItems = getProductLineItems(data);

  if (lineItems) {
    const products = JSON.parse(lineItems);

    if (Array.isArray(products) && products.length) {
      return products[0]['productId'];
    }
  }

  return undefined;
};

/**
 * Obtain checkout generic omnitracking's properties.
 *
 * @param data - The event's data.
 * @returns The checkout omnitracking order data.
 */
export const getCheckoutEventGenericProperties = (
  data: EventData<TrackTypesValues>,
) => {
  const orderInfo = getCheckoutOrderIdentificationProperties(data.properties);

  if (orderInfo.orderCode === undefined) {
    logger.error(
      `[Omnitracking] - Event ${data.event} property "orderId" should be an alphanumeric value.
                        If you want to send the internal "orderId", please use "orderId" (e.g.: 5H5QYB)
                        and 'checkoutOrderId' (e.g.:123123123)`,
    );
  }

  return {
    orderCode: orderInfo.orderCode,
    checkoutOrderId: orderInfo.orderId,
  };
};

/**
 * Obtain sum all quantities from product line item list.
 *
 * @param productList - The item list with quantity inside each element.
 *
 * @returns The sum of all product quantities.
 */
export const getProductLineItemsQuantity = (
  productList?: Array<AnalyticsProduct>,
) => {
  return (productList || []).reduce(
    (acc, curr) => acc + (curr.quantity || 0),
    0,
  );
};

/**
 * Obtain Delivery Information Details using event properties data in JSON Format.
 *
 * @param data - The event's data.
 *
 * @returns - Delivery Information Details in Json Format.
 */
export const getDeliveryInformationDetails = (
  data: EventData<TrackTypesValues>,
) => {
  if (
    data.properties?.deliveryType ||
    data.properties?.shippingTier ||
    data.properties?.packagingType
  ) {
    return JSON.stringify({
      deliveryType: data.properties.deliveryType,
      courierType: data.properties.shippingTier,
      packagingType: data.properties.packagingType,
    });
  }

  return undefined;
};

/**
 * Obtain Common Checkout Details.
 *
 * @param data - The event's data.
 *
 * @returns - Omnitracking's common checkout parameters.
 */
export const getCommonCheckoutStepTrackingData = (
  data: EventData<TrackTypesValues>,
) => ({
  checkoutStep: data.properties?.step,
  deliveryInformationDetails: getDeliveryInformationDetails(data),
  interactionType: data.properties?.interactionType,
  selectedPaymentMethod: data.properties?.paymentType,
});

/**
 * Obtain gender value from properties.
 *
 * @param data - The event's data.
 *
 * @returns Gender string.
 */
export const getGenderValueFromProperties = (
  data: EventData<TrackTypesValues>,
) => {
  type GenderObject = { id: SignupNewsletterGenderType; name?: string };

  const genderArray: Array<string | undefined> = (
    Array.isArray(data.properties?.gender)
      ? data.properties?.gender
      : [data.properties?.gender]
  ).map((gender: SignupNewsletterGenderType | GenderObject) => {
    return (
      (gender as GenderObject).name ||
      SignupNewsletterGenderType[(gender as GenderObject).id ?? gender]
    );
  });

  return genderArray.reduce((acc, item) => `${acc},${item}`);
};

/**
 * Obtain Product Recommendation Data.
 *
 * @param data - The event's data.
 *
 * @returns product recommendation parameters.
 */
export const getRecommendationsTrackingData = (
  data: EventData<TrackTypesValues>,
) => {
  if (data.properties.from === FromParameterType.Recommendations) {
    const recommendationsParameters: Record<string, unknown> = {};

    if (data.properties?.listId) {
      recommendationsParameters['moduleId'] = JSON.stringify([
        data.properties?.listId,
      ]);
    }

    if (data.properties?.list) {
      recommendationsParameters['moduleTitle'] = JSON.stringify([
        data.properties?.list,
      ]);
    }

    return recommendationsParameters;
  }

  // In case it's a non recommendations event,
  // we do not need to send these recommendations parameters.
  return;
};

/**
 * Get Login/Signup Recommended Parameters, logging a warnings if the recommended properties are missing.
 *
 * @param data - The event's data.
 *
 * @returns This function return common data from login or signup events.
 */
export const getLoginSignupRecommendedParameters = (
  data: EventData<TrackTypesValues>,
) => {
  const mappedData: Record<string, unknown> = {};

  if (data.properties?.method) {
    mappedData['loginType'] = data.properties?.method;
  } else {
    logger.warn(
      `[Omnitracking] - Event ${data.event}: The "method" property must be included in the payload
                    when triggering an ${data.event} event. To track this event, please ensure that includes
                    this property.`,
    );
  }

  return mappedData;
};
