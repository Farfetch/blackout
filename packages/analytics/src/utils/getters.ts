import get from 'lodash/get';
import type {
  AnalyticsProduct,
  EventData,
  EventProperties,
  TrackTypesValues,
} from '../types/analytics.types';
import type URLParse from 'url-parse';

export const getEvent = (data: EventData<TrackTypesValues>): string => {
  return get(data, 'event', '');
};

export const getProperties = (
  data: EventData<TrackTypesValues>,
): EventProperties => {
  return get(data, 'properties', {});
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

export const getProductId = (unmappedProduct: AnalyticsProduct): string => {
  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return unmappedProduct.id as string;
};

export const getProductName = (unmappedProduct: AnalyticsProduct): string => {
  // Validation of event properties are done before this function is called
  // so the cast is acceptable here.
  return unmappedProduct.name as string;
};

export const getLocation = (
  data: EventData<TrackTypesValues>,
): URLParse<Record<string, string | undefined>> => {
  return get(data, 'context.web.window.location', {});
};
