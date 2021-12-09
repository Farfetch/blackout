import { eventTypes, fromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_LIST_VIEWED,
  properties: {
    from: fromParameterTypes.PLP,
    category: 'Clothing',
    list: 'Woman shopping',
    currency: 'USD',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        position: 2,
        currency: 'USD',
        discountValue: 6,
        price: 19,
        priceWithoutDiscount: 25,
        list: 'Woman shopping',
        listId: '09a35590-bb62-4027-a630-5da04ec64fb5',
      },
      {
        id: '507f1f77bcf86cd799439012',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        position: 3,
        currency: 'USD',
        discountValue: 6,
        price: 19,
        priceWithoutDiscount: 25,
        list: 'Woman shopping',
        listId: '09a35590-bb62-4027-a630-5da04ec64fb5',
      },
    ],
  },
};
