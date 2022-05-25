import {
  EventData,
  eventTypes,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import type { EventsMapper } from './types/types';

export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: (data: EventData<TrackTypesValues>) => {
    const eventProperties = data.properties;

    return [
      'ecommerce',
      {
        currency: eventProperties.currency,
        name: eventProperties.name,
        price: eventProperties.price,
        product_id: eventProperties.id,
      },
    ];
  },
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: (
    data: EventData<TrackTypesValues>,
  ) => {
    const eventProperties = data.properties;

    return [
      'ecommerce',
      {
        category: eventProperties.category,
        currency: eventProperties.currency,
        name: eventProperties.name,
        price: eventProperties.price,
        product_id: eventProperties.id,
      },
    ];
  },
} as EventsMapper;
