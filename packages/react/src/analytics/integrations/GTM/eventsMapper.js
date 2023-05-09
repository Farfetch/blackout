/**
 * @module eventsMapper
 * @private
 */

import { eventTypes, pageTypes } from '@farfetch/blackout-core/analytics';
import { getEventProperties, getProductData } from './utils';
import get from 'lodash/get';

const noPropertiesMappedFn = () => ({});

/**
 * Event mapper with all supported events. This mapper can be extended via the integration's options.
 * It maps all necessary properties for each event appart from context, consent and user properties.
 */
const eventsMapper = {
  [eventTypes.PRODUCT_LIST_VIEWED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      list: properties.list,
      currency: properties.currency,
    };
  },
  [eventTypes.PRODUCT_VIEWED]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_CLICKED]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.CHECKOUT_STARTED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
      total: properties.total,
      value: get(properties, 'total', get(properties, 'value')),
    };
  },
  [eventTypes.PLACE_ORDER_STARTED]: data => {
    const properties = getEventProperties(data);

    return {
      orderId: properties.orderId,
      products: get(properties, 'products', []).map(getProductData),
      total: properties.total,
      value: get(properties, 'total', get(properties, 'value')),
    };
  },
  [eventTypes.CHECKOUT_STEP_VIEWED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      step: properties.step,
    };
  },
  [eventTypes.CHECKOUT_STEP_COMPLETED]: data => {
    const properties = getEventProperties(data);

    return {
      step: properties.step,
      option: properties.option,
    };
  },
  [eventTypes.PAYMENT_INFO_ADDED]: data => {
    const properties = getEventProperties(data);

    return {
      paymentType: properties.paymentType,
      total: properties.total,
      value: get(properties, 'total', get(properties, 'value')),
    };
  },
  [eventTypes.ORDER_COMPLETED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      total: properties.total,
      tax: properties.tax,
      shipping: properties.shipping,
      coupon: properties.coupon,
      currency: properties.currency,
      orderId: properties.orderId,
    };
  },
  [eventTypes.ORDER_REFUNDED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [eventTypes.SIGNUP_FORM_COMPLETED]: noPropertiesMappedFn,
  [eventTypes.SIGNUP_FORM_VIEWED]: noPropertiesMappedFn,
};

// Add all page types to the mapper so they can be considered by the integration
Object.values(pageTypes).forEach(pageType => {
  eventsMapper[pageType] = noPropertiesMappedFn;
});

export default eventsMapper;
