import { pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  event: pageTypes.PRODUCT_DETAILS,
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
  },
};

export default fixtures;
