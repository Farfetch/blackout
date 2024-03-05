import { get } from 'lodash-es';
import uuid from 'uuid';
import type {
  AnalyticsProduct,
  EventData,
  EventProperties,
  LoadIntegrationEventData,
  SetUserEventData,
  TrackTypesValues,
} from '../types/analytics.types.js';
import type URLParse from 'url-parse';

export const getEvent = (data: EventData<TrackTypesValues>): string => {
  return get(data, 'event', '');
};

export const getProperties = (
  data: EventData<TrackTypesValues>,
): EventProperties => {
  return get(data, 'properties', {});
};

/**
 * Returns the unique view id for the event. If the event properties pass it,
 * return that value. Else, return a newly generated uuid.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns The unique view id for the event.
 */
export const getUniqueViewId = (data: EventData<TrackTypesValues>): string => {
  const uniqueViewId = get(getProperties(data), 'uniqueViewId');

  return typeof uniqueViewId === 'string' ? uniqueViewId : uuid();
};

export const getProducts = (
  data: EventData<TrackTypesValues>,
): AnalyticsProduct[] => {
  return get(data, 'properties.products', []);
};

export const getCurrency = (data: EventData<TrackTypesValues>): string => {
  const properties = getProperties(data);

  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return get(properties, 'currency', '') as string;
};

export const getList = (data: EventData<TrackTypesValues>): string => {
  const properties = getProperties(data);

  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return get(properties, 'list', '') as string;
};

export const getOrderId = (data: EventData<TrackTypesValues>): string => {
  const properties = getProperties(data);

  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return properties.orderId as string;
};

export const getPurchaseProperties = (
  data: EventData<TrackTypesValues>,
): {
  id: string;
  revenue: number;
  tax: number;
  shipping: string;
  coupon: string;
} => {
  const properties = getProperties(data);

  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return {
    id: getOrderId(data),
    revenue: properties.total as number,
    tax: properties.tax as number,
    shipping: properties.shipping as string,
    coupon: properties.coupon as string,
  };
};

export const getCheckoutProperties = (
  data: EventData<TrackTypesValues>,
): { step: string; option: string } => {
  const properties = getProperties(data);

  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return {
    step: properties.step as string,
    option: properties.option as string,
  };
};

export const getProductId = (
  unmappedProduct: AnalyticsProduct,
): string | undefined => {
  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  const productId = unmappedProduct.productId || unmappedProduct.id;

  return productId ? `${productId}` : undefined;
};

export const getProductName = (unmappedProduct: AnalyticsProduct): string => {
  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return unmappedProduct.name as string;
};

export const getLocation = (
  data:
    | EventData<TrackTypesValues>
    | SetUserEventData
    | LoadIntegrationEventData,
): URLParse<Record<string, string | undefined>> => {
  return get(data, 'context.web.window.location', {}) as URLParse<
    Record<string, string | undefined>
  >;
};

/**
 * Obtain cookie value using the cookie name.
 *
 * @param name - Cookie name.
 *
 * @returns The cookie value.
 */
export const getCookie = (name: string): string | void => {
  if (typeof document === 'undefined') {
    return;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
};

/**
 * Obtain checkout order generic fields from analytics properties.
 *
 * @param dataProperties - The event's properties data.
 * @param orderIdFieldName - The name of orderId field. Default as `checkoutOrderId`.
 * @returns The checkout generic order data result.
 */
export const getCheckoutOrderIdentificationProperties = (
  eventProperties: EventProperties,
) => {
  const checkoutOrderId = eventProperties?.checkoutOrderId;
  const orderId = eventProperties?.orderId;
  const orderIdAsNumber = Number(orderId);
  // Valid order code should be an alphanumeric value.
  // Should be used 'orderId' values like e.g.: 5H5QYB
  // and for 'checkoutOrderId' values like e.g.:123123123
  const isOrderCodeValid =
    typeof orderId === 'string' && isNaN(orderIdAsNumber);
  const isOrderIdValid =
    typeof checkoutOrderId === 'number' && !isNaN(checkoutOrderId);

  const orderCode = isOrderCodeValid ? orderId : undefined;

  let finalOrderId;

  // If we have a valid order id, i.e., the property checkoutOrderId from the
  // event properties is a number, then we always use it.
  if (isOrderIdValid) {
    finalOrderId = checkoutOrderId;
  } else if (!isOrderCodeValid) {
    // If we do not have a valid order code and checkoutOrderId is not valid
    // we use the orderId from the payload if it is not NaN
    finalOrderId = !isNaN(orderIdAsNumber) ? orderIdAsNumber : undefined;
  }

  return {
    orderCode,
    orderId: finalOrderId,
  };
};
