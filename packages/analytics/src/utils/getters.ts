import get from 'lodash/get';

export const getEvent = (data: Record<string, unknown>): string => {
  return get(data, 'event', '') as string;
};

export const getProperties = (
  data: Record<string, unknown>,
): Record<string, unknown> => {
  return get(data, 'properties', {}) as Record<string, unknown>;
};

export const getProducts = (data: Record<string, unknown>): [] => {
  return get(data, 'properties.products', []) as [];
};

export const getCurrency = (data: Record<string, unknown>): string => {
  const properties = getProperties(data);

  return properties.currency as string;
};

export const getList = (data: Record<string, unknown>): unknown => {
  const properties = getProperties(data);

  return get(properties, 'list') as unknown;
};

export const getOrderId = (data: Record<string, unknown>): string => {
  const properties = getProperties(data);

  return properties.orderId as string;
};

export const getPurchaseProperties = (
  data: Record<string, unknown>,
): {
  id: string;
  revenue: number;
  tax: number;
  shipping: string;
  coupon: string;
} => {
  const properties = getProperties(data);

  return {
    id: getOrderId(data),
    revenue: properties.total as number,
    tax: properties.tax as number,
    shipping: properties.shipping as string,
    coupon: properties.coupon as string,
  };
};

export const getCheckoutProperties = (
  data: Record<string, unknown>,
): { step: unknown; option: unknown } => {
  const properties = getProperties(data);

  return {
    step: properties.step,
    option: properties.option,
  };
};

export const getProductId = (
  unmappedProduct: Record<string, unknown>,
): number => {
  return unmappedProduct.id as number;
};

export const getProductName = (
  unmappedProduct: Record<string, unknown>,
): string => {
  return unmappedProduct.name as string;
};

export const getLocation = (
  data: Record<string, unknown>,
): Record<string, unknown> => {
  return get(data, 'context.web.window.location', {}) as Record<
    string,
    unknown
  >;
};
