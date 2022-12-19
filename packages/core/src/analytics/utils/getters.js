import get from 'lodash/get';

export const getEvent = data => {
  return get(data, 'event', '');
};

export const getProperties = data => {
  return get(data, 'properties', {});
};

export const getProducts = data => {
  return get(data, 'properties.products', []);
};

export const getCurrency = data => {
  const properties = getProperties(data);

  return properties.currency;
};

export const getList = data => {
  const properties = getProperties(data);

  return get(properties, 'list');
};

export const getOrderId = data => {
  const properties = getProperties(data);

  return properties.orderId;
};

export const getPurchaseProperties = data => {
  const properties = getProperties(data);

  return {
    id: getOrderId(data),
    revenue: properties.total,
    tax: properties.tax,
    shipping: properties.shipping,
    coupon: properties.coupon,
  };
};

export const getCheckoutProperties = data => {
  const properties = getProperties(data);

  return {
    step: properties.step,
    option: properties.option,
  };
};

export const getProductId = unmappedProduct => {
  const productId = unmappedProduct.productId || unmappedProduct.id;

  return productId ? `${productId}` : undefined;
};

export const getProductName = unmappedProduct => {
  return unmappedProduct.name;
};

export const getLocation = data => {
  return get(data, 'context.web.window.location', {});
};
