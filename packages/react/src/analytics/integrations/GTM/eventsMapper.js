/**
 * @module eventsMapper
 * @private
 */

import { eventTypes, pageTypes } from '@farfetch/blackout-core/analytics';
import { getEventProperties, getProductData } from './utils';
import { isObject, round, snakeCase } from 'lodash';
import get from 'lodash/get';

const noPropertiesMappedFn = () => ({});

/**
 * Returns the total event value for GTM ecommerce events.
 *
 * @param {object} eventProperties - Properties from a track event.
 * @param {Array} items - Items contained on event tracking.
 *
 * @returns {number} Event total value calculated.
 */
const getEventTotalValue = (eventProperties, items) => {
  if (typeof eventProperties.total === 'number') {
    return eventProperties.total;
  }

  // There could be cases where the client is not using the bag middleware and wants to pass a value.
  if (typeof eventProperties.value === 'number') {
    return eventProperties.value;
  }

  const value = items?.reduce((acc, item) => {
    const lineValue =
      (get(item, 'price', 0) - get(item, 'discount', 0)) *
      get(item, 'quantity', 1);

    return acc + lineValue;
  }, 0);
  return round(value, 3);
};

/**
 * Retrieves the product (or products) from the eventProperties in an Array.
 *
 * @param {object} properties - Properties from a track event.
 *
 * @returns {Array} Product list with properties formatted for GTM ecommerce events.
 */
const getProductItemsFromEvent = properties => {
  return Array.isArray(properties.products)
    ? properties.products.map(product => getProductData(product))
    : new Array(getProductData(properties));
};

const getPrePurchaseParametersFromEvent = properties => {
  const items = getProductItemsFromEvent(properties);

  const result = {
    currency: properties.currency,
    from: properties.from,
    itemListId: properties.listId,
    itemListName: properties.list,
    index: properties.position,
    wishlistName: properties.wishlist,
    wishlistId: properties.wishlistId,
    isMainWishlist: properties.isMainWishlist,
    items,
    value: getEventTotalValue(properties, items),
  };

  return result;
};

/**
 * Returns checkout event properties formatted to GTM ecommerce events.
 *
 * @param {object} properties - Properties from a track event.
 *
 * @returns {object} Common properties formatted to GTM's checkout ecommerce events.
 */
const getCheckoutParametersFromEvent = properties => {
  const items = getProductItemsFromEvent(properties);

  return {
    currency: properties.currency,
    coupon: properties.coupon,
    items,
    orderId: properties.orderId,
    value: getEventTotalValue(properties, items),
  };
};

/**
 * Event mapper with all supported events. This mapper can be extended via the integration's options.
 * It maps all necessary properties for each event appart from context, consent and user properties.
 */
const eventsMapper = {
  [eventTypes.ADDRESS_INFO_ADDED]: data => {
    const properties = getEventProperties(data);

    return {
      currency: properties.currency,
      coupon: properties.coupon,
      value: properties.total,
      shippingTier: properties.shippingTier,
      addressFinder: properties.addressFinder,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      orderId: properties.orderId,
      checkoutStep: properties.step,
    };
  },
  [eventTypes.BILLING_INFO_ADDED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(data);

    return {
      addressFinder: properties.addressFinder,
      checkoutStep: properties.step,
      coupon: properties.coupon,
      currency: properties.currency,
      orderId: properties.orderId,
      value: getEventTotalValue(properties, items),
    };
  },
  [eventTypes.CHECKOUT_ABANDONED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(data);

    return {
      checkoutStep: properties.step,
      coupon: properties.coupon,
      currency: properties.currency,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      paymentType: properties.paymentType,
      shippingTier: properties.shippingTier,
      shipping: properties.shipping,
      tax: properties.tax,
      orderId: properties.orderId,
      value: getEventTotalValue(properties, items),
    };
  },
  [eventTypes.CHECKOUT_STARTED]: data => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      checkoutStep: properties.step,
      deliveryType: properties.deliveryType,
      paymentType: properties.paymentType,
      packagingType: properties.packagingType,
      shippingTier: properties.shippingTier,
      shipping: properties.shipping,
      tax: properties.tax,
      method: properties.method,
    };
  },
  [eventTypes.CHECKOUT_STEP_EDITING]: data => {
    const properties = getEventProperties(data);

    return {
      checkoutStep: properties.step,
      orderId: properties.orderId,
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
  [eventTypes.DELIVERY_METHOD_ADDED]: data => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
    };
  },
  [eventTypes.FILTERS_APPLIED]: data => {
    const properties = getEventProperties(data);

    return {
      filters: properties.filters
        ? JSON.stringify(properties.filters)
        : undefined,
    };
  },
  [eventTypes.FILTERS_CLEARED]: data => {
    const properties = getEventProperties(data);

    return {
      filters: properties.filters
        ? JSON.stringify(properties.filters)
        : undefined,
    };
  },
  [eventTypes.INTERACT_CONTENT]: data => {
    const properties = getEventProperties(data);
    const formattedProperties = {};

    Object.keys(properties).forEach(key => {
      const value = properties[key];

      if (isObject(value)) {
        return;
      }

      formattedProperties[snakeCase(key)] = value;
    });

    return formattedProperties;
  },
  [eventTypes.LOGIN]: data => {
    const properties = getEventProperties(data);

    return {
      method: properties.method,
    };
  },
  [eventTypes.LOGOUT]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.ORDER_COMPLETED]: data => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      total: properties.total,
      tax: properties.tax,
      shipping: properties.shipping,
      addressFinder: properties.addressFinder,
      checkoutStep: properties.step,
      deliveryType: properties.deliveryType,
      paymentType: properties.paymentType,
      packagingType: properties.packagingType,
      shippingTier: properties.shippingTier,
      affiliation: properties.affiliation,
    };
  },
  [eventTypes.ORDER_REFUNDED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [eventTypes.PRODUCT_LIST_VIEWED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      currency: properties.currency,
      from: properties.from,
      error: properties.error,
      itemListId: properties.listId,
      itemListName: properties.list,
      items: getProductItemsFromEvent(properties),
      filters: properties.filters
        ? JSON.stringify(properties.filters)
        : undefined,
      sortOption: properties.sortOption,
    };
  },
  [eventTypes.PRODUCT_VIEWED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(properties);

    return {
      product: getProductData(properties),
      items,
      currency: properties.currency,
      from: properties.from,
      imageCount: properties.imageCount,
      value: getEventTotalValue(properties, items),
    };
  },
  [eventTypes.PRODUCT_CLICKED]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
      from: properties.from,
      index: properties.position,
      itemListName: properties.list,
      itemListId: properties.listId,
      items: getProductItemsFromEvent(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: data => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PLACE_ORDER_FAILED]: data => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
    };
  },
  [eventTypes.PLACE_ORDER_STARTED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(data);

    return {
      currency: properties.currency,
      coupon: properties.coupon,
      affiliation: properties.affiliation,
      shipping: properties.shipping,
      tax: properties.tax,
      checkoutStep: properties.step,
      orderId: properties.orderId,
      products: get(properties, 'products', []).map(getProductData),
      total: properties.total,
      value: getEventTotalValue(properties, items),
    };
  },
  [eventTypes.PAYMENT_INFO_ADDED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(data);

    return {
      paymentType: properties.paymentType,
      total: properties.total,
      value: getEventTotalValue(properties, items),
      checkoutStep: properties.step,
      currency: properties.currency,
      coupon: properties.coupon,
      items,
      orderId: properties.orderId,
    };
  },
  [eventTypes.PROMOCODE_APPLIED]: data => {
    const items = getProductItemsFromEvent(data);

    return {
      items,
    };
  },
  [eventTypes.SELECT_CONTENT]: data => {
    const items = getProductItemsFromEvent(data);

    return {
      items,
    };
  },
  [eventTypes.SHARE]: data => {
    const items = getProductItemsFromEvent(data);

    return {
      items,
    };
  },
  [eventTypes.SHIPPING_INFO_ADDED]: data => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
    };
  },
  [eventTypes.SHIPPING_METHOD_ADDED]: data => {
    const properties = getEventProperties(data);
    const items = getProductItemsFromEvent(data);

    return {
      currency: properties.currency,
      coupon: properties.coupon,
      value: getEventTotalValue(properties, items),
      shippingTier: properties.shippingTier,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      checkoutStep: properties.step,
      orderId: properties.orderId,
    };
  },
  [eventTypes.SIGNUP_FORM_COMPLETED]: data => {
    const properties = getEventProperties(data);

    return {
      method: properties.method,
    };
  },
  [eventTypes.SIGNUP_FORM_VIEWED]: noPropertiesMappedFn,
  [eventTypes.SIGNUP_NEWSLETTER]: noPropertiesMappedFn,
  [eventTypes.REVIEW_CHECKOUT]: data => {
    const properties = getEventProperties(data);

    return {
      affiliation: properties.affiliation,
      checkoutStep: properties.step,
      coupon: properties.coupon,
      currency: properties.currency,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      paymentType: properties.paymentType,
      shippingTier: properties.shippingTier,
      shipping: properties.shipping,
      tax: properties.tax,
      orderId: properties.orderId,
      value: properties.total,
    };
  },
  [pageTypes.BAG]: data => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
    };
  },
  [pageTypes.WISHLIST]: data => {
    const properties = getEventProperties(data);

    return {
      wishlistId: properties.wishlistId,
    };
  },
  [pageTypes.SEARCH]: data => {
    const properties = getEventProperties(data);

    return {
      searchTerm: get(properties, 'searchTerm', get(properties, 'searchQuery')),
      searchResultCount: get(properties, 'itemCount'),
    };
  },
};

// Add all page types to the mapper so they can be considered by the integration
Object.values(pageTypes).forEach(pageType => {
  if (!eventsMapper[pageType]) {
    eventsMapper[pageType] = noPropertiesMappedFn;
  }
});

export default eventsMapper;
