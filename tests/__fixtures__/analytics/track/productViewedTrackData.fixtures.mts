import { EventType, FromParameterType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.ProductViewed,
  properties: {
    from: FromParameterType.Plp,
    id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Clothing/Tops/T-shirts',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    brand: 'Just A T-Shirt',
    variant: 'Black',
    list: 'Woman shopping',
    listId: '/en-pt/shopping/woman',
    discountValue: 6,
    price: 19,
    priceWithoutDiscount: 25,
    currency: 'USD',
    isOutOfStock: true,
  },
};

export default fixtures;
