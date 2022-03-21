import {
  EventData,
  eventTypes,
  pageTypes,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import { getEventProperties, getProductData } from './utils';
import get from 'lodash/get';
import type { EventMappers } from './types';

const noPropertiesMappedFn = () => ({});

/**
 * Event mapper with all supported events. This mapper can be extended via the integration's options.
 * It maps all necessary properties for each event apart from context, consent and user properties.
 */
const eventsMapper: EventMappers = {
  [eventTypes.PRODUCT_LIST_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      list: properties.list,
      currency: properties.currency,
    };
  },
  [eventTypes.PRODUCT_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_CLICKED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_CART]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.PRODUCT_UPDATED_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const properties = getEventProperties(data);

    return {
      product: getProductData(properties),
    };
  },
  [eventTypes.CHECKOUT_STARTED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      orderId: properties.orderId,
    };
  },
  [eventTypes.PLACE_ORDER_STARTED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      orderId: properties.orderId,
      products: get(properties, 'products', []).map(getProductData),
      value: properties.value,
    };
  },
  [eventTypes.CHECKOUT_STEP_VIEWED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      step: properties.step,
    };
  },
  [eventTypes.CHECKOUT_STEP_COMPLETED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      step: properties.step,
      option: properties.option,
    };
  },
  [eventTypes.PAYMENT_INFO_ADDED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      paymentType: properties.paymentType,
      value: properties.value,
    };
  },
  [eventTypes.ORDER_COMPLETED]: (data: EventData<TrackTypesValues>) => {
    const properties = getEventProperties(data);

    return {
      products: get(properties, 'products', []).map(getProductData),
      total: properties.total,
      tax: properties.tax,
      shipping: properties.shipping,
      coupon: properties.coupon,
      currency: properties.currency,
    };
  },
  [eventTypes.ORDER_REFUNDED]: (data: EventData<TrackTypesValues>) => {
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
