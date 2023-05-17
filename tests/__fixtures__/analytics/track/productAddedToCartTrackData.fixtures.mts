import { EventType, FromParameterType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const data = {
  ...baseTrackData,
  event: EventType.ProductAddedToCart,
  properties: {
    from: FromParameterType.Wishlist,
    cartId: 'skdjsidjsdkdj29j',
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    size: 'L',
    discountValue: 6,
    price: 19,
    position: 2,
    priceWithoutDiscount: 25,
    quantity: 1,
    currency: 'USD',
    list: 'my_wishlist',
    listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
  },
};

export default data;
