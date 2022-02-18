import {
  eventTypes,
  pageTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import { MAX_PRODUCT_CATEGORIES } from './constants';
import { SignupNewsletterGenderMappings } from '../shared/dataMappings/';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import snakeCase from 'lodash/snakeCase';

export const InternalEventTypes = {
  PRODUCT_UPDATED: {
    CHANGE_SIZE: 'change_size',
    CHANGE_QUANTITY: 'change_quantity',
    CHANGE_COLOUR: 'change_colour',
  },
  PAGE_SCROLL: 'scroll',
};

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
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: 'remove_from_wishlist',
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
  [pageTypes.WISHLIST]: 'view_wishlist',
  [eventTypes.LOGIN]: 'login',
  [eventTypes.SIGNUP_FORM_COMPLETED]: 'sign_up',
  [eventTypes.FILTERS_APPLIED]: 'apply_filters',
  [eventTypes.FILTERS_CLEARED]: 'clear_filters',
  [eventTypes.SHARE]: 'share',
  [eventTypes.CHECKOUT_ABANDONED]: 'abandon_confirmation_checkout',
  [eventTypes.PLACE_ORDER_STARTED]: 'place_order',
  [eventTypes.PROMOCODE_APPLIED]: 'apply_promo_code',
  [eventTypes.CHECKOUT_STEP_EDITING]: 'edit_checkout_step',
  [eventTypes.ADDRESS_INFO_ADDED]: 'add_address_info',
  [eventTypes.SHIPPING_METHOD_ADDED]: 'add_shipping_method',
  [eventTypes.INTERACT_CONTENT]: 'interact_content',
  [eventTypes.SIGNUP_NEWSLETTER]: 'sign_up_newsletter',
  // internal ga4 cases
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR,
  [InternalEventTypes.PAGE_SCROLL]: InternalEventTypes.PAGE_SCROLL,
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

  let productCategories = productCategoryString
    .split('/')
    .filter(category => category);

  if (productCategories.length > MAX_PRODUCT_CATEGORIES) {
    utils.logger.warn(
      `[GA4] - Product category hierarchy exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA4 only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
    );

    // Use the first and the last four categories
    productCategories = [
      productCategories[0],
      ...productCategories.slice(-MAX_PRODUCT_CATEGORIES + 1),
    ];
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
 * @param {boolean} [addListParameters=true] - Boolean flag to indicate if list properties should be added to the resulting mapped product object.
 *
 * @returns {object} Product properties formatted to GA4 ecommerce events.
 */
const getProductParametersFromEvent = (
  properties,
  addListParameters = true,
) => {
  const result = {
    ...getProductCategories(properties.category),
    affiliation: properties.affiliation,
    coupon: properties.coupon,
    currency: properties.currency,
    discount: properties.discountValue,
    index: properties.position,
    item_brand: properties.brand,
    item_id: utils.getProductId(properties),
    item_name: utils.getProductName(properties),
    item_variant: properties.variant,
    location_id: properties.locationId,
    price: properties.priceWithoutDiscount,
    quantity: properties.quantity,
    size: properties.size,
  };

  // addListParameters will be false for events that are single
  // product (like PRODUCT_ADDED_TO_CART or PRODUCT_REMOVED_FROM_CART).
  // This is an optimization to avoid having set item_list_id and item_list_name
  // inside the items array and outside the items array as it is wasteful, because
  // GA4 will use the item_list_id and item_list_name properties if they are
  // defined outside the items array and are not defined inside it.
  if (addListParameters) {
    result.item_list_id = properties.listId;
    result.item_list_name = properties.list;
  }

  return result;
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
    : new Array(getProductParametersFromEvent(eventProperties, false));
};

/**
 * Returns product updated event parameters for GA4 custom events (change_size, change_colour, change_quantity).
 *
 * @param {string} event - Event name.
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters for GA4's custom product updated events.
 */
const getProductUpdatedParametersFromEvent = (event, eventProperties) => {
  const parameters = {
    from: eventProperties.from,
    item_id: utils.getProductId(eventProperties),
    item_name: utils.getProductName(eventProperties),
  };

  switch (event) {
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY:
      parameters.quantity = eventProperties.quantity;
      parameters.old_quantity = eventProperties.oldQuantity;
      break;
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE:
      parameters.size = eventProperties.size;
      parameters.old_size = eventProperties.oldSize;
      break;
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR:
      parameters.colour = eventProperties.colour;
      parameters.old_colour = eventProperties.oldColour;
      break;

    default:
      break;
  }

  return parameters;
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
    item_list_id: eventProperties.listId,
    item_list_name: eventProperties.list,
    wishlist_name: eventProperties.wishlist,
    wishlist_id: eventProperties.wishlistId,
    items,
    value: getEventTotalValue(eventProperties, items),
  };
};

/**
 * Returns view wishlist event parameters formatted for GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters for GA4's view wishlist custom event.
 */
const getViewWishlistParametersFromEvent = eventProperties => {
  return {
    wishlist_id: eventProperties.wishlistId,
  };
};

/**
 * Returns product removed from wishlist parameters formatted for GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters for GA4's remove_from_wishlist event.
 */
const getProductRemovedFromWishlist = eventProperties => {
  const productParameters = getProductParametersFromEvent(
    eventProperties,
    false,
  );

  return {
    from: eventProperties.from,
    item_list_id: eventProperties.listId,
    item_list_name: eventProperties.list,
    wishlist_name: eventProperties.wishlist,
    wishlist_id: eventProperties.wishlistId,
    value: getEventTotalValue(eventProperties, new Array(productParameters)),
    ...productParameters,
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
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    value: eventProperties.total,
    shipping_tier: eventProperties.shippingTier,
    address_finder: eventProperties.addressFinder,
    delivery_type: eventProperties.deliveryType,
    packaging_type: eventProperties.packagingType,
  };
};

/**
 * Returns the shipping info added event parameters for the GA4 ecommerce event.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#add_shipping_info}
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters for the GA4's add_shipping_info event.
 */
const getShippingInfoAddedParametersFromEvent = eventProperties => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    shipping_tier: eventProperties.shippingTier,
    address_finder: eventProperties.addressFinder,
    delivery_type: eventProperties.deliveryType,
    packaging_type: eventProperties.packagingType,
  };
};

/**
 * Returns the checkout abandoned custom event parameters formatted for the GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters for the GA4's checkout abandoned custom event.
 */
const getCheckoutAbandonedParametersFromEvent = eventProperties => {
  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    value: eventProperties.total,
  };
};

/**
 * Returns the Interact Content parameters for the (custom) event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted from camelCase to snake_case for GA4's event.
 */
const getInteractContentParametersFromEvent = eventProperties => {
  const formattedProperties = {};

  Object.keys(eventProperties).forEach(key => {
    const value = eventProperties[key];

    if (isObject(value)) {
      return;
    }

    formattedProperties[snakeCase(key)] = value;
  });

  return formattedProperties;
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
 * Returns the place order started custom event properties formatted for the GA4 ecommerce events.
 * As it returns the same properties of a purchase event, it uses the same mapping function for that event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's place order started custom event.
 */
const getPlaceOrderStartedParametersFromEvent = eventProperties => {
  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    value: eventProperties.total,
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
  from: eventProperties.from,
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
 * Returns the filter properties from an event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Object containing the filter properties.
 */
const getFilterParametersFromEvent = eventProperties => ({
  filters: eventProperties.filters
    ? JSON.stringify(eventProperties.filters)
    : undefined,
});

/**
 * Returns the sort properties from an event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Object containing the sort properties.
 */
const getSortParametersFromEvent = eventProperties => ({
  sort_option: eventProperties.sortOption,
});

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
  from: eventProperties.from,
  error: eventProperties.error,
  items: getProductItemsFromEvent(eventProperties),
  item_list_id: eventProperties.listId,
  item_list_name: eventProperties.list,
  ...getFilterParametersFromEvent(eventProperties),
  ...getSortParametersFromEvent(eventProperties),
});

/**
 * Returns the checkout step editing properties from an event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Object containing the sort properties.
 */
const getCheckoutStepEditingParametersFromEvent = eventProperties => {
  return {
    checkout_step: eventProperties.step,
  };
};

/**
 * Returns the share properties formatted for the GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Properties formatted for the GA4's share event.
 */
const getShareParametersFromEvent = eventProperties => ({
  method: eventProperties.method,
  content_type: eventProperties.contentType,
  item_id: eventProperties.id,
});

/**
 * Returns the signup newsletter parameters formatted for the GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters formatted for the GA4's sign_up_newsletter event.
 */
const getSignupNewsletterParametersFromEvent = eventProperties => {
  return {
    newsletter_gender: SignupNewsletterGenderMappings[eventProperties.gender],
  };
};

/**
 * Returns the scroll parameters formatted for the GA4 event.
 *
 * @param {object} eventProperties - Properties from a track event.
 *
 * @returns {object} Parameters formatted for the GA4's scroll event.
 */
const getScrollParametersFromEvent = eventProperties => {
  return {
    percent_scrolled: `${eventProperties.percentageScrolled}%`,
  };
};

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

    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY:
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE:
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR:
      return getProductUpdatedParametersFromEvent(event, eventProperties);

    case pageTypes.BAG:
    case eventTypes.PRODUCT_ADDED_TO_CART:
    case eventTypes.PRODUCT_REMOVED_FROM_CART:
    case eventTypes.PRODUCT_ADDED_TO_WISHLIST:
      return getPrePurchaseParametersFromEvent(eventProperties);

    case pageTypes.WISHLIST:
      return getViewWishlistParametersFromEvent(eventProperties);

    case eventTypes.PRODUCT_REMOVED_FROM_WISHLIST:
      return getProductRemovedFromWishlist(eventProperties);

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
      return getShippingInfoAddedParametersFromEvent(eventProperties);

    case eventTypes.ADDRESS_INFO_ADDED:
    case eventTypes.SHIPPING_METHOD_ADDED:
    case eventTypes.PROMOCODE_APPLIED:
      return getCheckoutShippingStepParametersFromEvent(eventProperties);

    case eventTypes.INTERACT_CONTENT:
      return getInteractContentParametersFromEvent(eventProperties);

    case eventTypes.LOGIN:
    case eventTypes.SIGNUP_FORM_COMPLETED:
      return getLoginAndSignupParametersFromEvent(eventProperties);

    case eventTypes.FILTERS_APPLIED:
    case eventTypes.FILTERS_CLEARED:
      return getFilterParametersFromEvent(eventProperties);

    case eventTypes.SHARE:
      return getShareParametersFromEvent(eventProperties);

    case eventTypes.CHECKOUT_ABANDONED:
      return getCheckoutAbandonedParametersFromEvent(eventProperties);

    case eventTypes.PLACE_ORDER_STARTED:
      return getPlaceOrderStartedParametersFromEvent(eventProperties);

    case eventTypes.CHECKOUT_STEP_EDITING:
      return getCheckoutStepEditingParametersFromEvent(eventProperties);

    case eventTypes.SIGNUP_NEWSLETTER:
      return getSignupNewsletterParametersFromEvent(eventProperties);

    case InternalEventTypes.PAGE_SCROLL:
      return getScrollParametersFromEvent(eventProperties);

    default:
      /* istanbul ignore next */
      break;
  }
}
