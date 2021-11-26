import { eventTypes, pageTypes, utils } from '@farfetch/blackout-analytics';
import { MAX_PRODUCT_CATEGORIES } from './constants';
import get from 'lodash/get';

/**
 *
 * Exports a map of core's events track names and GA4 events track names.
 *
 */
export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: 'add_to_cart',
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: 'remove_from_cart',
  [eventTypes.PAYMENT_INFO_ADDED]: 'add_payment_info',
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: 'add_to_wishlist',
  [eventTypes.SHIPPING_INFO_ADDED]: 'add_shipping_info',
  [eventTypes.CHECKOUT_STARTED]: 'begin_checkout',
  [eventTypes.ORDER_COMPLETED]: 'purchase',
  [eventTypes.ORDER_REFUNDED]: 'refund',
  [pageTypes.SEARCH]: 'search',
  [eventTypes.SELECT_CONTENT]: 'select_content',
  [eventTypes.PRODUCT_CLICKED]: 'select_item',
  [eventTypes.PRODUCT_VIEWED]: 'view_item',
  [eventTypes.PRODUCT_LIST_VIEWED]: 'view_item_list',
  [pageTypes.BAG]: 'view_cart',
  [eventTypes.LOGIN]: 'login',
  [eventTypes.SIGNUP_FORM_COMPLETED]: 'sign_up',
};

/**
 * Formats product categories as required from GA4 ecommerce events.
 *
 * @param {string} productCategoryString - Product category raw string.
 *
 * @returns {object} A list of all product's categories split by attributes as required per GA4 api.
 */
const getProductCategories = productCategoryString => {
  if (typeof productCategoryString !== 'string') {
    return {};
  }

  const productCategories = productCategoryString
    .split('/')
    .filter(category => category);

  if (productCategories.length > MAX_PRODUCT_CATEGORIES) {
    utils.logger.warn(
      `[GA4] - Product category hierarchy exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA4 only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
    );
  }

  // GA4 only supports 5 level of categories
  return productCategories.reduce((acc, category, index) => {
    acc[`item_category${index === 0 ? '' : index + 1}`] = category;

    return acc;
  }, {});
};

/**
 * Returns the total event value for GA4 ecommerce events.
 *
 * @param {object} eventProperties - Properties from a track event.
 * @param {Array} items - Items contained on event tracking.
 *
 * @returns {number} Event total value calculated.
 */
const getEventTotalValue = (eventProperties, items) => {
  // There could be cases where the client is not using the bag middleware and wants to pass a value.
  if (typeof eventProperties.value === 'number') {
    return eventProperties.value;
  }

  return items?.reduce((acc, item) => {
    const value =
      (get(item, 'price', 0) - get(item, 'discount', 0)) *
      get(item, 'quantity', 1);

    return acc + value;
  }, 0);
};

/**
 * Returns product properties formatted to GA4 ecommerce events.
 *
 * @param {object} properties - Properties from a track event.
 *
 * @returns {object} Product properties formatted to GA4 ecommerce events.
 */
const getProductParametersFromEvent = properties => {
  return {
    ...getProductCategories(properties.category),
    affiliation: properties.affiliation,
    coupon: properties.coupon,
    currency: properties.currency,
    discount: properties.discount,
    index: properties.position,
    item_brand: properties.brand,
    item_id: utils.getProductId(properties),
    item_list_id: properties.listId,
    item_list_name: properties.list,
    item_name: utils.getProductName(properties),
    item_variant: properties.variant,
    location_id: properties.locationId,
    price: properties.price,
    quantity: properties.quantity,
  };
};

/**
 * Retrieves the product (or products) from the eventProperties in an Array.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {Array} Product list with properties formatted for GA4 ecommerce events.
 */
const getProductItemsFromEvent = eventProperties => {
  return Array.isArray(eventProperties.products)
    ? eventProperties.products.map(product =>
        getProductParametersFromEvent(product),
      )
    : new Array(getProductParametersFromEvent(eventProperties));
};

/**
 * Returns pre-purchased event properties formatted to GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#pre-purchase_interactions}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Common properties formatted to GA4's pre-purchased ecommerce events.
 */
const getPrePurchaseParametersFromEvent = eventProperties => {
  const items = getProductItemsFromEvent(eventProperties);

  return {
    currency: eventProperties.currency,
    from: eventProperties.from,
    items,
    value: getEventTotalValue(eventProperties, items),
  };
};

/**
 * Returns checkout event properties formatted to GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Common properties formatted to GA4's checkout ecommerce events.
 */
const getCheckoutParametersFromEvent = eventProperties => {
  const items = getProductItemsFromEvent(eventProperties);

  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    items,
    value: eventProperties.total,
  };
};

/**
 * Returns checkout event properties formatted to GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Common properties formatted to GA4's checkout ecommerce events.
 */
const getCheckoutPaymentStepParametersFromEvent = eventProperties => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    payment_type: eventProperties.paymentType,
  };
};

/**
 * Returns the checkout shipping step event properties formatted for the GA4 ecommerce event.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's shipping step checkout ecommerce event.
 */
const getCheckoutShippingStepParametersFromEvent = eventProperties => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    shipping_tier: eventProperties.shippingTier,
    address_finder: eventProperties.addressFinder ? 1 : 0,
    delivery_type: eventProperties.deliveryType,
    packaging_type: eventProperties.packagingType,
  };
};

/**
 * Returns the checkout order completed/refunded event properties formatted for the GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's order completed/refunded ecommerce events.
 */
const getOrderPurchaseOrRefundParametersFromEvent = eventProperties => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    transaction_id: eventProperties.orderId,
    affiliation: eventProperties.affiliation,
    shipping: eventProperties.shipping,
    tax: eventProperties.tax,
  };
};

/**
 * Returns the search event properties formatted for the GA4 search event.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#search}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's search event.
 */
const getSearchParametersFromEvent = eventProperties => {
  return {
    search_term: eventProperties.searchTerm,
  };
};

/**
 * Returns login and sign up event properties formatted to GA4 recommended events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#login}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#sign_up}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Common properties formatted to GA4's recommended events, login and signup.
 */
const getLoginAndSignupParametersFromEvent = eventProperties => {
  return {
    method: eventProperties.method,
  };
};

/**
 * Returns the select content properties formatted for the GA4 select content.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's select content.
 */
const getSelectContentParametersFromEvent = eventProperties => ({
  content_type: eventProperties.contentType,
  item_id: eventProperties.id,
});

/**
 * Returns the select item properties formatted for the GA4 view item.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#product_views_and_interactions}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's select item.
 */
const getProductClickedParametersFromEvent = eventProperties => ({
  items: getProductItemsFromEvent(eventProperties),
  item_list_id: eventProperties.listId,
  item_list_name: eventProperties.list,
});

/**
 * Returns the view item properties formatted for the GA4 view item.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#product_views_and_interactions}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's view item.
 */
const getViewItemParametersFromEvent = eventProperties => {
  const items = getProductItemsFromEvent(eventProperties);

  return {
    items,
    currency: eventProperties.currency,
    from: eventProperties.from,
    image_count: eventProperties.imageCount,
    value: getEventTotalValue(eventProperties, items),
  };
};

/**
 * Returns the view item list properties formatted for the GA4 view item list.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#product_views_and_interactions}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's view item list.
 */
const getViewItemListParametersFromEvent = eventProperties => ({
  items: getProductItemsFromEvent(eventProperties),
  item_list_id: eventProperties.listId,
  item_list_name: eventProperties.list,
  filters: eventProperties.filters,
  sort_option: eventProperties.sort,
  error: eventProperties.error,
});

/**
 * Returns event properties mapping by GA4 event name.
 *
 * @param {string} event - Event name.
 * @param {object} data - Commands by scope configuration.
 *
 * @returns {object} The event property required and formatted to desired GA4 event.
 */
export function getEventProperties(event, data) {
  const eventProperties = utils.getProperties(data);

  switch (event) {
    case eventTypes.CHECKOUT_STARTED:
      return getCheckoutParametersFromEvent(eventProperties);

    case eventTypes.PAYMENT_INFO_ADDED:
      return getCheckoutPaymentStepParametersFromEvent(eventProperties);

    case pageTypes.BAG:
    case eventTypes.PRODUCT_ADDED_TO_CART:
    case eventTypes.PRODUCT_REMOVED_FROM_CART:
    case eventTypes.PRODUCT_ADDED_TO_WISHLIST:
      return getPrePurchaseParametersFromEvent(eventProperties);

    case eventTypes.PRODUCT_CLICKED:
      return getProductClickedParametersFromEvent(eventProperties);

    case eventTypes.PRODUCT_LIST_VIEWED:
      return getViewItemListParametersFromEvent(eventProperties);

    case eventTypes.PRODUCT_VIEWED:
      return getViewItemParametersFromEvent(eventProperties);

    case eventTypes.ORDER_COMPLETED:
    case eventTypes.ORDER_REFUNDED:
      return getOrderPurchaseOrRefundParametersFromEvent(eventProperties);

    case pageTypes.SEARCH:
      return getSearchParametersFromEvent(eventProperties);

    case eventTypes.SELECT_CONTENT:
      return getSelectContentParametersFromEvent(eventProperties);

    case eventTypes.SHIPPING_INFO_ADDED:
      return getCheckoutShippingStepParametersFromEvent(eventProperties);

    case eventTypes.LOGIN:
    case eventTypes.SIGNUP_FORM_COMPLETED:
      return getLoginAndSignupParametersFromEvent(eventProperties);

    default:
      /* istanbul ignore next */
      break;
  }
}
