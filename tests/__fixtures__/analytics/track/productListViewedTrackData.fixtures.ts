import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_LIST_VIEWED,
  properties: {
    category: 'Clothing',
    list: 'Woman shopping',
    currency: 'USD',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        position: 2,
        currency: 'USD',
        price: 18.99,
        list: 'Woman shopping',
      },
      {
        id: '507f1f77bcf86cd799439012',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        position: 3,
        currency: 'USD',
        price: 18.99,
        list: 'Woman shopping',
      },
    ],
  },
};
