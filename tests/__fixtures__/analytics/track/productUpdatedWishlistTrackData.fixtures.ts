import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_UPDATED_WISHLIST,
  properties: {
    id: '507f1f77bcf86cd799439011',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    price: 18.99,
    currency: 'USD',
    list: 'Woman shopping',
  },
};
