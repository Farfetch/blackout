/**
 * @module Omnitracking/omnitracking-helper
 * @private
 */

import {
  CLIENT_LANGUAGES_LIST,
  DEFAULT_CLIENT_LANGUAGE,
  DEFAULT_SEARCH_QUERY_PARAMETERS,
} from './constants';
import {
  pageActionEventTypes,
  pageDefinitions,
  pageEventsFilter,
  pageViewEventTypes,
  systemActionParameters,
  trackDefinitions,
} from './definitions';
import { SignupNewsletterGenderMappings } from '../shared/dataMappings/signupNewsletterGenderMappings';
import { v4 as uuidv4 } from 'uuid';
import analyticsTrackTypes from '../../types/trackTypes';
import get from 'lodash/get';
import logger from '../../utils/logger';
import pick from 'lodash/pick';
import platformTypes from '../../types/platformTypes';

/**
 * Adds common parameters to all kinds of message types.
 *
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {object} Object containing common parameters.
 */
export const getCommonParameters = data => {
  return {
    clientTimestamp: new Date(data.timestamp).toJSON(),
    uuid: uuidv4(),
  };
};

/**
 * Returns the unique view id for the event. If the event properties
 * pass it, return that value. Else, return a newly generated uuid.
 *
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {string} The unique view id for the event.
 */
export const getUniqueViewIdParameter = data => {
  let uniqueViewId = get(data, 'properties.uniqueViewId');

  return typeof uniqueViewId === 'string' ? uniqueViewId : uuidv4();
};

/**
 * Returns the customer id for tracking of the passed user instance.
 *
 * @param {User} user - The user instance.
 *
 * @returns {(string|number)} The formatted customer ID.
 */
export const getCustomerIdFromUser = user => {
  const customerId = user.id;
  const isGuest = user.traits.isGuest;

  return customerId && isGuest ? `g_${customerId}` : customerId;
};

/**
 * This method tries to match the name passed by `analytics.page(name)` with the `pageEventsFilter` keywords.
 *
 * @param {string} pageType - Page type passed to analytics.
 *
 * @returns {string} The event for the page type.
 */
export const getPageEventFromPageType = pageType => {
  let event = '';

  Object.keys(pageEventsFilter).forEach(key => {
    if (pageEventsFilter[key].indexOf(pageType) >= 0) {
      event = key;
    }
  });

  return event;
};

/**
 * This method tries to match some keyword from `eventMapper` with any word on the `location.href`.
 *
 * @param {object} location - Location object to check if there is any keyword that matches the `eventMapper`.
 *
 * @returns {string} The event for the page.
 */
export const getPageEventFromLocation = location => {
  if (!location || !location.href) {
    return null;
  }

  let event = '';

  Object.keys(pageEventsFilter).forEach(key => {
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
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {string} Name of the event.
 */
export const getPageEvent = data => {
  const location = get(data, 'context.web.window.location', {});
  const event =
    getPageEventFromPageType(data.event) || getPageEventFromLocation(location);

  return event || pageViewEventTypes.GenericPageVisited;
};

/**
 * Creates an object with specific parameters for a web app.
 *
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {object} Filtered object.
 */
const getSpecificWebParameters = data => {
  let commonParameters = {};

  const type = get(data, 'type');

  if (type === analyticsTrackTypes.PAGE) {
    const referrer = get(data, 'context.web.pageLocationReferrer', '');
    const location = get(data, 'context.web.window.location', {});
    const query = get(location, 'query', {});
    const internalRequest =
      referrer.indexOf(`${location.protocol}//${location.host}`) === 0;

    const url = get(data, 'context.web.window.location.pathname').split('/');
    const subfolder = url[1].split('-');
    const userCountryLocation = (
      subfolder[1] ? subfolder[1] : subfolder[0]
    ).toLowerCase();

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
    };
  }

  return commonParameters;
};

/**
 * Creates an object with specific parameters for a native app.
 *
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {object} Filtered object.
 */
const getSpecificMobileParameters = data => {
  let commonParameters = {};

  const type = get(data, 'type');

  if (type === analyticsTrackTypes.SCREEN) {
    // Referrer must be sent with an empty string when we don't have a value for it.
    const referrer = get(data, 'context.app.referrer', '');
    commonParameters.referrer = referrer;
  }

  return commonParameters;
};

/**
 * Defines the common parameters builder by platform.
 */
const specificParametersBuilderByPlatform = {
  [platformTypes.Web]: getSpecificWebParameters,
  [platformTypes.Mobile]: getSpecificMobileParameters,
};

/**
 * Creates an object with parameters that are specific to a platform.
 * These parameters are collected and inferred by analytics `data` object,
 * so there's no need to pass these properties via `analytics.page()` or `analytics.track()`.
 *
 * @param {object} data - Event data passed by analytics.
 *
 * @returns {object} Filtered object.
 */
export const getPlatformSpecificParameters = data => {
  const platform = get(data, 'platform', platformTypes.Web);

  const specificPlatformParametersBuilder =
    specificParametersBuilderByPlatform[platform];

  if (!specificPlatformParametersBuilder) {
    return {};
  }

  return specificPlatformParametersBuilder(data);
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass unnecessary information for the event.
 * We search for parameters in many locations: context -> device -> app -> event -> properties
 * Each location can override the values of the previous one.
 *
 * @param {object} data  - Event data passed by analytics.
 * @param {string} event - Event name to filter properties by.
 * @returns {object} Result of the `pick()` method.
 */
export const pickPageParameters = (data, event) => {
  const eventPageDefinitions = pageDefinitions[event];

  return {
    ...pick(data.context, eventPageDefinitions),
    ...pick(data.context.app, eventPageDefinitions),
    ...pick(data.context.event, eventPageDefinitions),
    ...pick(data.properties, eventPageDefinitions),
  };
};

/**
 * Formats page data to be sent to omnitracking service to register a page view.
 * Merges common parameters with the filtered ones sent via `analytics.page()`, along some other properties.
 *
 * @param {object} data                     - Event data passed by analytics.
 * @param {object} [additionalParameters]   - Additional parameters to be considered.
 *
 * @returns {object} Formatted data.
 */
export const formatPageEvent = (data, additionalParameters) => {
  const correlationId = get(data, 'user.localId', null);
  const user = get(data, 'user', { id: '', traits: {} });
  const customerId = getCustomerIdFromUser(user);
  const context = get(data, 'context', {});
  const event = getPageEvent(data);
  const defaultPageParameters = { viewType: 'Others', viewSubType: 'Others' };

  return {
    event,
    customerId,
    correlationId,
    tenantId: context.tenantId,
    clientId: context.clientId,
    parameters: {
      ...defaultPageParameters,
      ...additionalParameters,
      ...getPlatformSpecificParameters(data),
      ...getCommonParameters(data),
      ...pickPageParameters(data, event),
    },
  };
};

/**
 * @param {object} data         - Event data passed by analytics.
 * @param {string} parameter    - Name of the parameter to obtain.
 *
 * @returns {*} The value of the parameter if found in event data or null if not found.
 */
export const getParameterValueFromEvent = (data, parameter) => {
  let value;

  let searchLocations = [
    data.context,
    data.context.app,
    data.context.event,
    data.properties,
  ];

  for (let location of searchLocations) {
    value = get(location, parameter);

    if (value) {
      return value;
    }
  }

  return null;
};

/**
 * @param {object} valParameters - Properties to be appended to the stringified "val" parameter.
 *
 * @returns {string} The object stringified.
 */
export const getValParameterForEvent = (valParameters = {}) => {
  return JSON.stringify(valParameters);
};

/**
 * Generates a payment attempt reference ID based on the correlationID (user local ID) and the timestamp of the event.
 *
 * @param {object} data - Event data passed by analytics.
 
 * @returns {string} - The payment attempt reference ID.
 */
export const generatePaymentAttemptReferenceId = data => {
  const correlationId = get(data, 'user.localId', null);
  const timestamp = data.timestamp;

  return `${correlationId}_${timestamp}`;
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass unnecessary information for the event.
 * We search for parameters in many locations: context -> device -> app -> event -> properties
 * Each location can override the values of the previous one.
 *
 * @param {object} data                       - Event data passed by analytics.
 * @param {Array<string>} propertiesToPick    - Array of property strings to pick. By default will pick all properties defined in trackDefinitions variable.
 *
 * @returns {object} Result of the `pick()` method.
 */
export const pickTrackParameters = (
  data,
  propertiesToPick = trackDefinitions,
) => {
  return {
    ...pick(data.context, propertiesToPick),
    ...pick(data.context.app, propertiesToPick),
    ...pick(data.context.event, propertiesToPick),
    ...pick(data.properties, propertiesToPick),
  };
};

/**
 * Formats tracking data to be sent to omnitracking service to register a custom event.
 *
 * @param {object} data                         - Event data passed by analytics.
 * @param {object} [additionalParameters]       - Additional parameters to be considered.
 *
 * @returns {object} Formatted track data.
 */
export const formatTrackEvent = (data, additionalParameters) => {
  const user = get(data, 'user', { id: '', traits: {} });
  const customerId = getCustomerIdFromUser(user);
  const correlationId = get(data, 'user.localId', null);
  const context = get(data, 'context', {});

  const parameters = {
    ...additionalParameters,
    ...getPlatformSpecificParameters(data),
    ...getCommonParameters(data),
    ...pickTrackParameters(data),
  };

  const hasSystemActionParameter = systemActionParameters.some(
    systemActionParameter => {
      return parameters.hasOwnProperty(systemActionParameter);
    },
  );

  // We infer the PageAction event type by checking the payload for
  // SystemAction parameters. If it does have any SystemAction parameter,
  // we infer it to be a SystemAction type. Else, we assume it is a PageAction.
  // TODO: There are some parameters that may need to be removed from the
  //      parameters object because each PageAction type has a list of
  //      supported parameters but we only know the PageAction type of the event after
  //      we have the full parameters object constructed, which may include
  //      parameters that are not necessary to be sent for the then determined
  //      PageAction event type.
  const event = hasSystemActionParameter
    ? pageActionEventTypes.SYSTEM_ACTION
    : pageActionEventTypes.PAGE_ACTION;

  return {
    tenantId: context.tenantId,
    clientId: context.clientId,
    correlationId,
    customerId,
    event,
    parameters,
  };
};

/**
 * Validates if the payload to be sent to Omnitracking is correctly formed.
 * For now, it will only check if PageAction events contains the required tid
 * parameter.
 *
 * @param {object} payload - Object corresponding to the payload that Omnitracking service expects.
 *
 * @returns {boolean} True if the payload is correctly formed, false otherwise.
 */
export const validateOutgoingOmnitrackingPayload = payload => {
  const event = get(payload, 'event', '');

  const isPageActionEvent = Object.values(pageActionEventTypes).some(
    value => value === event,
  );

  if (isPageActionEvent) {
    const parameters = get(payload, 'parameters', {});

    return !!parameters.tid;
  }

  return true;
};

/**
 * Fetches the searchQuery taking in account the option searchQueryParameters
 * passed by the user or by the default ones.
 *
 * @param {object} data - Object corresponding to the payload that Omnitracking service expects.
 * @param {Array} searchQueryParameters - List of possible searchQueryParameters passed by user.
 *
 * @returns {string} The searchQuery used on the page.
 */
export const getSearchQuery = (data, searchQueryParameters) => {
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
 * Returns the client language from the culture code, if matches one of the possible client language values.
 * If not, return the default one (en).
 *
 * @param {string} culture - The current culture code.
 *
 * @returns {string} The clientLanguage to be sent on the event.
 */
export const getClientLanguageFromCulture = culture => {
  const cultureSplit = (culture || '').split('-');
  const clientLanguage = cultureSplit[0];

  return CLIENT_LANGUAGES_LIST.includes(clientLanguage)
    ? clientLanguage
    : DEFAULT_CLIENT_LANGUAGE;
};

/**
 * Returns the client country from the culture code.
 *
 * @param {string} culture - The current culture code.
 *
 * @returns {string} The clientCountry to be sent on the event.
 */
export const getCLientCountryFromCulture = culture => {
  const cultureSplit = (culture || '').split('-');
  const clientCountry = cultureSplit[1];

  return clientCountry;
};

/**
 * Transforms the products list payload into `lineItems` omnitracking parameter.
 *
 * @param {object} data - The event tracking data.
 *
 * @returns {string} - The mapped `lineItems` in json format.
 */
export const getProductLineItems = data => {
  const properties = data?.properties || {};
  const productsList = properties.products;
  const productId = properties.productId;

  if (productsList && productsList.length) {
    const mappedProductList = productsList.map(product => ({
      productId: product.id,
      itemPromotion: product.discountValue,
      designerName: product.brand,
      category: (product.category || '').split('/')[0],
      itemFullPrice: product.priceWithoutDiscount,
      sizeID: product.sizeId,
      itemQuantity: product.quantity,
      promoCode: product.coupon,
      storeID: product.locationId,
    }));

    return JSON.stringify(mappedProductList);
  }

  if (productId) {
    return JSON.stringify([
      {
        productId,
        itemPromotion: properties.discountValue,
        designerName: properties.brand,
        category: (properties.category || '').split('/')[0],
        itemFullPrice: properties.priceWithoutDiscount,
        sizeID: properties.sizeId,
        itemQuantity: properties.quantity,
        promoCode: properties.coupon,
        storeID: properties.locationId,
      },
    ]);
  }

  return undefined;
};

/**
 * Obtain sum all quantities from product line item list.
 *
 * @param {object} productList - The item list with quantity inside each element.
 *
 * @returns {number} - The sum of all product quantities.
 */
export const getProductLineItemsQuantity = productList => {
  return (productList || []).reduce(
    (acc, curr) => acc + (curr.quantity || 0),
    0,
  );
};

/**
 * Obtain checkout generic omnitracking's properties.
 *
 * @param {object} data - The event's data.
 * @param {boolean} addOrderId - If this property is true then add orderId to return.
 * @returns {object} - The checkout omnitracking order data.
 */
export const getCheckoutEventGenericProperties = (data, addOrderId = false) => {
  const validOrderCode = isNaN(data.properties?.orderId);

  if (!validOrderCode) {
    logger.warn(
      `[Omnitracking] - Event ${data.event} property orderId should be an alphanumeric value.
                        If you send the internal orderId, please use 'orderId' (e.g.: 5H5QYB) 
                        and 'checkoutOrderId' (e.g.:123123123)`,
    );
  }

  const orderCode = validOrderCode ? data.properties?.orderId : undefined;

  return addOrderId
    ? {
        orderCode,
        orderId: !validOrderCode
          ? parseInt(data.properties?.orderId)
          : data.properties?.checkoutOrderId,
      }
    : { orderCode };
};

/**
 * Obtain gender value from properties.
 *
 * @param {object} data - The event's data.
 *
 * @returns {string} - Gender string.
 */
export const getGenderValueFromProperties = data => {
  const genderArray = (
    Array.isArray(data.properties?.gender)
      ? data.properties?.gender
      : new Array(data.properties?.gender)
  ).map(
    gender =>
      // trying using tenant translation otherwise use custom gender mappings
      gender?.name || SignupNewsletterGenderMappings[gender?.id ?? gender],
  );

  return genderArray.reduce((acc, item) => `${acc},${item}`);
};
