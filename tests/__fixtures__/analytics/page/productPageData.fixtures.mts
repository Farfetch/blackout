import { FromParameterType, PageType } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures.mjs';

const fixtures = {
  ...basePageData,
  event: PageType.ProductDetails,
  properties: {
    gender: 0,
    brand: 'Saint Laurent',
    category: 'Clothing/Pants/Slacks',
    currency: 'USD',
    discountValue: 1,
    id: 12122479,
    priceWithoutDiscount: 2,
    quantity: 13,
    sizeId: '20',
    locationId: 20000,
    coupon: 'EASTER2022',
    from: FromParameterType.Recommendations,
    position: 2,
    list: 'Recommendations',
    listId: '5c1e447a-b14b-43a5-b010-2190f3366fad',
    index: 1,
    recommendationsStrategy: 'rec_123',
  },
};

export default fixtures;
