import { EventTypes, FromParameterTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.PRODUCT_CLICKED,
  properties: {
    from: FromParameterTypes.PLP,
    id: '507f1f77bcf86cd799439011',
    name: 'Gareth McConnell Dreamscape T-Shirt',
    position: 3,
    list: 'Woman shopping',
    listId: '/en-pt/shopping/woman',
    currency: 'GBP',
    discountValue: 6,
    price: 19,
    priceWithoutDiscount: 25,
  },
};

export default fixtures;
