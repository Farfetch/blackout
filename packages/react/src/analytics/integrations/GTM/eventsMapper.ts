import {
  type EventData,
  EventType,
  PageType,
  type TrackTypesValues,
} from '@farfetch/blackout-analytics';
import { get } from 'lodash-es';
import { getEventProperties, getProductData } from './utils.js';
import type { EventMappers } from './types/index.js';

const noPropertiesMappedFn = () => ({});

/**
 * Event mapper with all supported events. This mapper can be extended via the
 * integration's options. It maps all necessary properties for each event apart
 * from context, consent and user properties.
 */
const eventsMapper: EventMappers = {
  [EventType.ProductListViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      list: properties.list,
      currency: properties.currency,
    };
  },
  [EventType.ProductViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.ProductClicked]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.ProductAddedToCart]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.ProductRemovedFromCart]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.ProductAddedToWishlist]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventType.ProductRemovedFromWishlist]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
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
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
      value: 'total' in properties ? properties.total : properties.value,
      total: properties.total,
    };
  },
  [EventType.PlaceOrderStarted]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      orderId: properties.orderId,
      products: get(properties, 'products', []).map(getProductData),
      value: 'total' in properties ? properties.total : properties.value,
      total: properties.total,
    };
  },
  [EventType.CheckoutStepViewed]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
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
  [EventType.PaymentInfoAdded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      paymentType: properties.paymentType,
      value: 'total' in properties ? properties.total : properties.value,
      total: properties.total,
    };
  },
  [EventType.OrderCompleted]: (data: EventData<TrackTypesValues>) => {
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
  [EventType.OrderRefunded]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [EventType.SignupFormCompleted]: noPropertiesMappedFn,
  [EventType.SignupFormViewed]: noPropertiesMappedFn,
};

// Add all page types to the mapper so they can be considered by the integration
Object.values(PageType).forEach(pageType => {
  eventsMapper[pageType] = noPropertiesMappedFn;
});

export default eventsMapper;
