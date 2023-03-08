import {
  type AnalyticsProduct,
  type EventProperties,
  EventTypes,
  PageTypes,
  SignupNewsletterGenderTypes,
  type TrackEventData,
  utils,
} from '@farfetch/blackout-analytics';
import { get, isObject, snakeCase } from 'lodash-es';
import { MAX_PRODUCT_CATEGORIES } from './constants.js';

export const InternalEventTypes = {
  PRODUCT_UPDATED: {
    CHANGE_SIZE: 'change_size',
    CHANGE_QUANTITY: 'change_quantity',
    CHANGE_COLOUR: 'change_colour',
  },
  PAGE_SCROLL: 'scroll',
};

/**
 * Exports a map of core's events track names and GA4 events track names.
 */
const eventMapping = {
  [EventTypes.PRODUCT_ADDED_TO_CART]: 'add_to_cart',
  [EventTypes.PRODUCT_REMOVED_FROM_CART]: 'remove_from_cart',
  [EventTypes.PAYMENT_INFO_ADDED]: 'add_payment_info',
  [EventTypes.PRODUCT_ADDED_TO_WISHLIST]: 'add_to_wishlist',
  [EventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: 'remove_from_wishlist',
  [EventTypes.SHIPPING_INFO_ADDED]: 'add_shipping_info',
  [EventTypes.CHECKOUT_STARTED]: 'begin_checkout',
  [EventTypes.ORDER_COMPLETED]: 'purchase',
  [EventTypes.ORDER_REFUNDED]: 'refund',
  [PageTypes.SEARCH]: 'search',
  [EventTypes.SELECT_CONTENT]: 'select_content',
  [EventTypes.PRODUCT_CLICKED]: 'select_item',
  [EventTypes.PRODUCT_VIEWED]: 'view_item',
  [EventTypes.PRODUCT_LIST_VIEWED]: 'view_item_list',
  [PageTypes.BAG]: 'view_cart',
  [PageTypes.WISHLIST]: 'view_wishlist',
  [EventTypes.LOGIN]: 'login',
  [EventTypes.SIGNUP_FORM_COMPLETED]: 'sign_up',
  [EventTypes.FILTERS_APPLIED]: 'apply_filters',
  [EventTypes.FILTERS_CLEARED]: 'clear_filters',
  [EventTypes.SHARE]: 'share',
  [EventTypes.CHECKOUT_ABANDONED]: 'abandon_confirmation_checkout',
  [EventTypes.PLACE_ORDER_STARTED]: 'place_order',
  [EventTypes.PROMOCODE_APPLIED]: 'apply_promo_code',
  [EventTypes.CHECKOUT_STEP_EDITING]: 'edit_checkout_step',
  [EventTypes.ADDRESS_INFO_ADDED]: 'add_address_info',
  [EventTypes.SHIPPING_METHOD_ADDED]: 'add_shipping_method',
  [EventTypes.INTERACT_CONTENT]: 'interact_content',
  [EventTypes.SIGNUP_NEWSLETTER]: 'sign_up_newsletter',
  // internal ga4 cases
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR]:
    InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR,
  [InternalEventTypes.PAGE_SCROLL]: InternalEventTypes.PAGE_SCROLL,
};

export default eventMapping;

/**
 * Formats product categories as required from GA4 ecommerce events.
 *
 * @param productCategoryString - Product category raw string.
 *
 * @returns A list of all product's categories split by attributes as required per GA4 api.
 */
const getProductCategories = (
  productCategoryString: string,
): {
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
} => {
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
      // @ts-ignore when length are higher then max categories defined, then has at least one category.
      productCategories[0],
      ...productCategories.slice(-MAX_PRODUCT_CATEGORIES + 1),
    ];
  }

  // GA4 only supports 5 level of categories
  return productCategories.reduce(
    (acc: Record<string, unknown>, category: string, index: number) => {
      const itemCategoryId = `item_category${index === 0 ? '' : index + 1}`;

      acc[itemCategoryId] = category;

      return acc;
    },
    {},
  );
};

/**
 * Returns the total event value for GA4 ecommerce events.
 *
 * @param eventProperties - Properties from a track event.
 * @param items           - Items contained on event tracking.
 *
 * @returns Event total value calculated.
 */
const getEventTotalValue = (
  eventProperties: EventProperties,
  items: Array<AnalyticsProduct>,
): number => {
  // There could be cases where the client is not using the bag middleware and wants to pass a value.
  if (typeof eventProperties.value === 'number') {
    return eventProperties.value;
  }

  return items?.reduce((acc, item) => {
    const price = get(item, 'price', 0) as number;
    const discount = get(item, 'discount', 0) as number;
    const quantity = get(item, 'quantity', 1) as number;
    const value = (price - discount) * quantity;

    return acc + value;
  }, 0);
};

/**
 * Returns product properties formatted to GA4 ecommerce events.
 *
 * @param properties        - Properties from a track event.
 * @param addListParameters - Boolean flag to indicate if list properties should be added to the
 *                            resulting mapped product object.
 *
 * @returns Product properties formatted to GA4 ecommerce events.
 */
const getProductParametersFromEvent = (
  properties: AnalyticsProduct,
  addListParameters = true,
): AnalyticsProduct => {
  const result: AnalyticsProduct = {
    ...getProductCategories(properties.category as string),
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Product list with properties formatted for GA4 ecommerce events.
 */
const getProductItemsFromEvent = (
  eventProperties: EventProperties,
): Array<AnalyticsProduct> => {
  return Array.isArray(eventProperties.products)
    ? eventProperties.products.map(product =>
        getProductParametersFromEvent(product),
      )
    : new Array(getProductParametersFromEvent(eventProperties, false));
};

/**
 * Returns product updated event parameters for GA4 custom events (change_size,
 * change_colour, change_quantity).
 *
 * @param event           - Event name.
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters for GA4's custom product updated events.
 */
const getProductUpdatedParametersFromEvent = (
  event: string,
  eventProperties: EventProperties,
) => {
  const parameters: Record<string, unknown> = {
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Common properties formatted to GA4's pre-purchased ecommerce events.
 */
const getPrePurchaseParametersFromEvent = (
  eventProperties: EventProperties,
) => {
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters for GA4's view wishlist custom event.
 */
const getViewWishlistParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    wishlist_id: eventProperties.wishlistId,
  };
};

/**
 * Returns product removed from wishlist parameters formatted for GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters for GA4's remove_from_wishlist event.
 */
const getProductRemovedFromWishlist = (eventProperties: EventProperties) => {
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Common properties formatted to GA4's checkout ecommerce events.
 */
const getCheckoutParametersFromEvent = (eventProperties: EventProperties) => {
  const items = getProductItemsFromEvent(eventProperties);

  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    items,
    value: eventProperties.total,
  };
};

/**
 * Returns checkout started event properties formatted to GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Common properties formatted to GA4's checkout started event.
 */
const getCheckoutStartedParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    checkout_step: eventProperties.step,
    delivery_type: eventProperties.deliveryType,
    transaction_id: eventProperties.orderId,
    payment_type: eventProperties.paymentType,
    packaging_type: eventProperties.packagingType,
    shipping: eventProperties.shipping,
    shipping_tier: eventProperties.shippingTier,
    tax: eventProperties.tax,
  };
};

/**
 * Returns checkout event properties formatted to GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Common properties formatted to GA4's checkout ecommerce events.
 */
const getCheckoutPaymentStepParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    payment_type: eventProperties.paymentType,
  };
};

/**
 * Returns the checkout shipping step event properties formatted for the GA4
 * ecommerce event.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's shipping step checkout ecommerce event.
 */
const getCheckoutShippingStepParametersFromEvent = (
  eventProperties: EventProperties,
) => {
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
 * Returns the promocode applied event properties formatted for the GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's promocode applied event.
 */
const getPromocodeAppliedParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    value: eventProperties.total,
    transaction_id: eventProperties.orderId,
  };
};

/**
 * Returns the shipping info added event parameters for the GA4 ecommerce event.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#add_shipping_info}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters for the GA4's add_shipping_info event.
 */
const getShippingInfoAddedParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    shipping_tier: eventProperties.shippingTier,
    address_finder: eventProperties.addressFinder,
    delivery_type: eventProperties.deliveryType,
    packaging_type: eventProperties.packagingType,
  };
};

/**
 * Returns the checkout abandoned custom event parameters formatted for the GA4
 * event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters for the GA4's checkout abandoned custom event.
 */
const getCheckoutAbandonedParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    currency: eventProperties.currency,
    coupon: eventProperties.coupon,
    value: eventProperties.total,
  };
};

/**
 * Returns the Interact Content parameters for the (custom) event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted from camelCase to snake_case for GA4's event.
 */
const getInteractContentParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return Object.keys(eventProperties)
    .filter(key => !isObject(eventProperties[key]))
    .reduce((acc, key) => {
      return { ...acc, [snakeCase(key)]: eventProperties[key] };
    }, {});
};

/**
 * Returns login and sign up event properties formatted to GA4 recommended events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#login}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#sign_up}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Common properties formatted to GA4's recommended events, login and signup.
 */
const getLoginAndSignupParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    method: eventProperties.method,
  };
};

/**
 * Returns the checkout order completed/refunded event properties formatted for the
 * GA4 ecommerce events.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#purchases_checkouts_and_refunds}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's order completed/refunded ecommerce events.
 */
const getOrderPurchaseOrRefundParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    ...getCheckoutParametersFromEvent(eventProperties),
    transaction_id: eventProperties.orderId,
    affiliation: eventProperties.affiliation,
    shipping: eventProperties.shipping,
    tax: eventProperties.tax,
  };
};

/**
 * Returns the place order started custom event properties formatted for the GA4
 * ecommerce events. As it returns the same properties of a purchase event, it uses
 * the same mapping function for that event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's place order started custom event.
 */
const getPlaceOrderStartedParametersFromEvent = (
  eventProperties: EventProperties,
) => {
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's search event.
 */
const getSearchParametersFromEvent = (eventProperties: EventProperties) => {
  return {
    search_term: get(
      eventProperties,
      'searchTerm',
      get(eventProperties, 'searchQuery'),
    ),
  };
};

/**
 * Returns the select content properties formatted for the GA4 select content.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's select content.
 */
const getSelectContentParametersFromEvent = (
  eventProperties: EventProperties,
) => ({
  content_type: eventProperties.contentType,
  item_id: eventProperties.id,
});

/**
 * Returns the select item properties formatted for the GA4 view item.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#product_views_and_interactions}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's select item.
 */
const getProductClickedParametersFromEvent = (
  eventProperties: EventProperties,
) => ({
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's view item.
 */
const getViewItemParametersFromEvent = (eventProperties: EventProperties) => {
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Object containing the filter properties.
 */
const getFilterParametersFromEvent = (eventProperties: EventProperties) => ({
  filters: eventProperties.filters
    ? JSON.stringify(eventProperties.filters)
    : undefined,
});

/**
 * Returns the sort properties from an event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Object containing the sort properties.
 */
const getSortParametersFromEvent = (eventProperties: EventProperties) => ({
  sort_option: eventProperties.sortOption,
});

/**
 * Returns the view item list properties formatted for the GA4 view item list.
 *
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#product_views_and_interactions}
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's view item list.
 */
const getViewItemListParametersFromEvent = (
  eventProperties: EventProperties,
) => ({
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
 * @param eventProperties - Properties from a track event.
 *
 * @returns Object containing the sort properties.
 */
const getCheckoutStepEditingParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  return {
    checkout_step: eventProperties.step,
  };
};

/**
 * Returns the share properties formatted for the GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Properties formatted for the GA4's share event.
 */
const getShareParametersFromEvent = (eventProperties: EventProperties) => ({
  method: eventProperties.method,
  content_type: eventProperties.contentType,
  item_id: utils.getProductId(eventProperties),
});

/**
 * Returns the signup newsletter parameters formatted for the GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters formatted for the GA4's sign_up_newsletter event.
 */
const getSignupNewsletterParametersFromEvent = (
  eventProperties: EventProperties,
) => {
  type GenderObject = { id: SignupNewsletterGenderTypes; name?: string };

  const genderArray: Array<string | undefined> = (
    Array.isArray(eventProperties.gender)
      ? eventProperties.gender
      : [eventProperties?.gender]
  ).map((gender: SignupNewsletterGenderTypes | GenderObject) => {
    return (
      (gender as GenderObject).name ||
      SignupNewsletterGenderTypes[(gender as GenderObject).id ?? gender]
    );
  });

  return {
    newsletter_gender: genderArray.reduce((acc, item) => `${acc},${item}`),
  };
};

/**
 * Returns the scroll parameters formatted for the GA4 event.
 *
 * @param eventProperties - Properties from a track event.
 *
 * @returns Parameters formatted for the GA4's scroll event.
 */
const getScrollParametersFromEvent = (eventProperties: EventProperties) => {
  return {
    percent_scrolled: eventProperties.percentageScrolled,
  };
};

/**
 * Returns event properties mapping by GA4 event name.
 *
 * @param event - Event name.
 * @param data  - Commands by scope configuration.
 *
 * @returns The event property required and formatted to desired GA4 event.
 */
export function getEventProperties(
  event: string,
  data: TrackEventData,
): Record<string, unknown> | undefined {
  const eventProperties = utils.getProperties(data);

  switch (event) {
    case EventTypes.CHECKOUT_STARTED:
      return getCheckoutStartedParametersFromEvent(eventProperties);

    case EventTypes.PAYMENT_INFO_ADDED:
      return getCheckoutPaymentStepParametersFromEvent(eventProperties);

    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY:
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE:
    case InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR:
      return getProductUpdatedParametersFromEvent(event, eventProperties);

    case PageTypes.BAG:
    case EventTypes.PRODUCT_ADDED_TO_CART:
    case EventTypes.PRODUCT_REMOVED_FROM_CART:
    case EventTypes.PRODUCT_ADDED_TO_WISHLIST:
      return getPrePurchaseParametersFromEvent(eventProperties);

    case PageTypes.WISHLIST:
      return getViewWishlistParametersFromEvent(eventProperties);

    case EventTypes.PRODUCT_REMOVED_FROM_WISHLIST:
      return getProductRemovedFromWishlist(eventProperties);

    case EventTypes.PRODUCT_CLICKED:
      return getProductClickedParametersFromEvent(eventProperties);

    case EventTypes.PRODUCT_LIST_VIEWED:
      return getViewItemListParametersFromEvent(eventProperties);

    case EventTypes.PRODUCT_VIEWED:
      return getViewItemParametersFromEvent(eventProperties);

    case EventTypes.ORDER_COMPLETED:
    case EventTypes.ORDER_REFUNDED:
      return getOrderPurchaseOrRefundParametersFromEvent(eventProperties);

    case PageTypes.SEARCH:
      return getSearchParametersFromEvent(eventProperties);

    case EventTypes.SELECT_CONTENT:
      return getSelectContentParametersFromEvent(eventProperties);

    case EventTypes.SHIPPING_INFO_ADDED:
      return getShippingInfoAddedParametersFromEvent(eventProperties);

    case EventTypes.ADDRESS_INFO_ADDED:
    case EventTypes.SHIPPING_METHOD_ADDED:
      return getCheckoutShippingStepParametersFromEvent(eventProperties);

    case EventTypes.PROMOCODE_APPLIED:
      return getPromocodeAppliedParametersFromEvent(eventProperties);

    case EventTypes.INTERACT_CONTENT:
      return getInteractContentParametersFromEvent(eventProperties);

    case EventTypes.LOGIN:
    case EventTypes.SIGNUP_FORM_COMPLETED:
      return getLoginAndSignupParametersFromEvent(eventProperties);

    case EventTypes.FILTERS_APPLIED:
    case EventTypes.FILTERS_CLEARED:
      return getFilterParametersFromEvent(eventProperties);

    case EventTypes.SHARE:
      return getShareParametersFromEvent(eventProperties);

    case EventTypes.CHECKOUT_ABANDONED:
      return getCheckoutAbandonedParametersFromEvent(eventProperties);

    case EventTypes.PLACE_ORDER_STARTED:
      return getPlaceOrderStartedParametersFromEvent(eventProperties);

    case EventTypes.CHECKOUT_STEP_EDITING:
      return getCheckoutStepEditingParametersFromEvent(eventProperties);

    case EventTypes.SIGNUP_NEWSLETTER:
      return getSignupNewsletterParametersFromEvent(eventProperties);

    case InternalEventTypes.PAGE_SCROLL:
      return getScrollParametersFromEvent(eventProperties);

    default:
      /* istanbul ignore next */
      return undefined;
  }
}
