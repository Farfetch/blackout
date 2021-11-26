import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_STEP_VIEWED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    step: 1,
    currency: 'USD',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        category: 'Clothing/Tops/T-shirts/',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        brand: 'Just A T-Shirt',
        variant: 'Black',
        size: 'L',
        price: 19,
        quantity: 1,
      },
    ],
  },
};
