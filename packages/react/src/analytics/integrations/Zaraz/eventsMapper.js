import { eventTypes } from '@farfetch/blackout-core/analytics';

export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: data => {
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
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: data => {
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
};
