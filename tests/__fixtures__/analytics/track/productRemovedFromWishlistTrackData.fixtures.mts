import { EventTypes, FromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.PRODUCT_REMOVED_FROM_WISHLIST,
  properties: {
    from: FromParameterTypes.PLP,
    id: '507f1f77bcf86cd799439011',
    list: 'Woman shopping',
    listId: '/en-pt/shopping/woman',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    discountValue: 6,
    price: 19,
    priceWithoutDiscount: 25,
    currency: 'USD',
    wishlistId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
  },
};

export default fixtures;