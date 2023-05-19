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

export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }

  return;
};

/**
 * Obtain checkout order generic fields from analytics properties.
 *
 * @param {object} eventProperties - The event's properties data.
 * @returns {object} - The checkout generic order data result.
 */
export const getCheckoutOrderIdentificationProperties = eventProperties => {
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
