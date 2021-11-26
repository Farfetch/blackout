import { eventTypes, fromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_REMOVED_FROM_CART,
  properties: {
    from: fromParameterTypes.BAG,
    cartId: 'ksjdj92dj29dj92d2j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    size: 'L',
    price: 18.99,
    quantity: 1,
    currency: 'USD',
    value: 18.99,
    position: 1,
  },
};
