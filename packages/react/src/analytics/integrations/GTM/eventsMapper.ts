import {
  type EventData,
  EventTypes,
  PageTypes,
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
  [EventTypes.PRODUCT_LIST_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      list: properties.list,
      currency: properties.currency,
    };
  },
  [EventTypes.PRODUCT_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_CLICKED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_ADDED_TO_CART]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_REMOVED_FROM_CART]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.PRODUCT_UPDATED_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [EventTypes.CHECKOUT_STARTED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [EventTypes.PLACE_ORDER_STARTED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      orderId: properties.orderId,
      products: get(properties, 'products', []).map(getProductData),
      value: properties.value,
    };
  },
  [EventTypes.CHECKOUT_STEP_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      step: properties.step,
    };
  },
  [EventTypes.CHECKOUT_STEP_COMPLETED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      step: properties.step,
      option: properties.option,
    };
  },
  [EventTypes.PAYMENT_INFO_ADDED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      paymentType: properties.paymentType,
      value: properties.value,
    };
  },
  [EventTypes.ORDER_COMPLETED]: (data: EventData<TrackTypesValues>) => {
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
  [EventTypes.ORDER_REFUNDED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [EventTypes.SIGNUP_FORM_COMPLETED]: noPropertiesMappedFn,
  [EventTypes.SIGNUP_FORM_VIEWED]: noPropertiesMappedFn,
};

// Add all page types to the mapper so they can be considered by the integration
Object.values(PageTypes).forEach(pageType => {
  eventsMapper[pageType] = noPropertiesMappedFn;
});

export default eventsMapper;
