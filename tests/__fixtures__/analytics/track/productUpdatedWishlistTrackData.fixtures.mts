import { EventTypes, FromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.PRODUCT_UPDATED_WISHLIST,
  properties: {
    from: FromParameterTypes.WISHLIST,
    id: '507f1f77bcf86cd799439011',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    discountValue: 6,
    price: 19,
    priceWithoutDiscount: 25,
    currency: 'USD',
    list: 'my_wishlist',
    listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
  },
};

export default fixtures;
