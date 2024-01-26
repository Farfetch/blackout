import {
  type AnalyticsProduct,
  type EventData,
  type EventProperties,
  EventType,
  PageType,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { get } from 'lodash-es';
import { getEventProperties, getProductData } from './utils.js';
import type { EventMappers } from './types/index.js';

const noPropertiesMappedFn = () => ({});

/**
 * Returns the total event value from product or list of products for GTM events.
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
  if (typeof eventProperties.total === 'number') {
    return eventProperties.total;
  }

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
 * Retrieves the product (or products) from the eventProperties in an Array.
 *
 * @param properties - Properties from a track event.
 *
 * @returns Product list with properties formatted for GTM ecommerce events.
 */
const getProductItemsFromEvent = (
  properties: EventProperties,
): Array<AnalyticsProduct> => {
  return Array.isArray(properties.products)
    ? properties.products.map(product => getProductData(product))
    : new Array(getProductData(properties));
};

const getPrePurchaseParametersFromEvent = (properties: EventProperties) => {
  const products = getProductItemsFromEvent(properties);

  const result = {
    currency: properties.currency,
    from: properties.from,
    position: properties.position,
    isMainWishlist: properties.isMainWishlist,
    list: properties.list,
    listId: properties.listId,
    value: getEventTotalValue(properties, products),
    wishlist: properties.wishlist,
    wishlistId: properties.wishlistId,
  };

  return result;
};

/**
 * Returns checkout event properties formatted to GTM ecommerce events.
 *
 * @param properties - Properties from a track event.
 *
 * @returns Common properties formatted to GTM's checkout ecommerce events.
 */
const getCheckoutParametersFromEvent = (properties: EventProperties) => {
  const products = getProductItemsFromEvent(properties);

  return {
    coupon: properties.coupon,
    currency: properties.currency,
    orderId: properties.orderId,
    products,
    value: getEventTotalValue(properties, products),
  };
};

/**
 * Event mapper with all supported events. This mapper can be extended via the
 * integration's options. It maps all necessary properties for each event apart
 * from context, consent and user properties.
 */
const eventsMapper: EventMappers = {
  [EventType.ProductListViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(properties);

    return {
      products,
      currency: properties.currency,
      from: properties.from,
      error: properties.error,
      listId: properties.listId,
      list: properties.list,
      filters: properties.filters
        ? JSON.stringify(properties.filters)
        : undefined,
      sortOption: properties.sortOption,
    };
  },
  [EventType.ProductViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(properties);

    return {
      currency: properties.currency,
      from: properties.from,
      imageCount: properties.imageCount,
      product: getProductData(properties),
      value: getEventTotalValue(properties, products),
    };
  },
  [EventType.ProductClicked]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      from: properties.from,
      position: properties.position,
      listId: properties.listId,
      list: properties.list,
      product: getProductData(properties),
    };
  },
  [EventType.ProductAddedToCart]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [EventType.ProductRemovedFromCart]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [EventType.ProductAddedToWishlist]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [EventType.ProductRemovedFromWishlist]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      product: getProductData(properties),
    };
  },
  [EventType.ProductUpdatedWishlist]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.CheckoutStarted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      step: properties.step,
      deliveryType: properties.deliveryType,
      method: properties.method,
      packagingType: properties.packagingType,
      paymentType: properties.paymentType,
      shippingTier: properties.shippingTier,
      shipping: properties.shipping,
      tax: properties.tax,
    };
  },
  [EventType.PlaceOrderStarted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      affiliation: properties.affiliation,
      step: properties.step,
      shipping: properties.shipping,
      tax: properties.tax,
    };
  },
  [EventType.CheckoutStepViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(properties);

    return {
      products,
      step: properties.step,
    };
  },
  [EventType.CheckoutStepCompleted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      step: properties.step,
      option: properties.option,
    };
  },
  [EventType.DeliveryMethodAdded]: data => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      shippingTier: properties.shippingTier,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      step: properties.step,
    };
  },
  [EventType.PaymentInfoAdded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      step: properties.step,
      paymentType: properties.paymentType,
    };
  },
  [EventType.OrderCompleted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      tax: properties.tax,
      shipping: properties.shipping,
      addressFinder: properties.addressFinder,
      step: properties.step,
      deliveryType: properties.deliveryType,
      paymentType: properties.paymentType,
      packagingType: properties.packagingType,
      shippingTier: properties.shippingTier,
      affiliation: properties.affiliation,
    };
  },
  [EventType.PromocodeApplied]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(data);

    return {
      currency: properties.currency,
      coupon: properties.coupon,
      value: getEventTotalValue(properties, products),
      orderId: properties.orderId,
    };
  },
  [EventType.SelectContent]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      contentType: properties.contentType,
      id: properties.id,
    };
  },
  [EventType.Share]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      method: properties.method,
      contentType: properties.contentType,
      id: utils.getProductId(properties),
    };
  },
  [EventType.BillingInfoAdded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(data);

    return {
      addressFinder: properties.addressFinder,
      step: properties.step,
      coupon: properties.coupon,
      currency: properties.currency,
      orderId: properties.orderId,
      value: getEventTotalValue(properties, products),
    };
  },
  [EventType.ShippingInfoAdded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      shippingTier: properties.shippingTier,
      deliveryType: properties.deliveryType,
      packagingType: properties.packagingType,
      step: properties.step,
    };
  },
  [EventType.ShippingMethodAdded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(data);

    return {
      coupon: properties.coupon,
      currency: properties.currency,
      deliveryType: properties.deliveryType,
      orderId: properties.orderId,
      packagingType: properties.packagingType,
      shippingTier: properties.shippingTier,
      step: properties.step,
      value: getEventTotalValue(properties, products),
    };
  },
  [EventType.OrderRefunded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      ...getCheckoutParametersFromEvent(properties),
      affiliation: properties.affiliation,
      shipping: properties.shipping,
      tax: properties.tax,
    };
  },
  [EventType.SignupFormCompleted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      method: properties.method,
    };
  },
  [EventType.SignupFormViewed]: noPropertiesMappedFn,
  [EventType.SignupNewsletter]: noPropertiesMappedFn,
  [PageType.Bag]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);
    const products = getProductItemsFromEvent(properties);

    return {
      ...getPrePurchaseParametersFromEvent(properties),
      products,
    };
  },
  [PageType.Wishlist]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      wishlistId: properties.wishlistId,
    };
  },
  [PageType.Search]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      searchTerm: get(properties, 'searchTerm', get(properties, 'searchQuery')),
      searchResultCount: get(properties, 'itemCount'),
    };
  },
};

// Add all page types to the mapper so they can be considered by the integration
Object.values(PageType).forEach(pageType => {
  eventsMapper[pageType] = noPropertiesMappedFn;
});

export default eventsMapper;
