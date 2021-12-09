import { eventTypes, fromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PRODUCT_UPDATED,
  properties: {
    from: fromParameterTypes.BAG,
    cartId: 'skdjsidjsdkdj29j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    price: 18.99,
    currency: 'USD',
    size: 'L',
    oldSize: 'XL',
    quantity: 1,
    oldQuantity: 2,
    colour: 'white',
    oldColour: 'red',
  },
};
