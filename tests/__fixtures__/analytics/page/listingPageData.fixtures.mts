import { PageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures.mjs';

const fixtures = {
  ...basePageData,
  event: PageTypes.PRODUCT_LISTING,
  properties: {
    products: [
      {
        id: '12345678',
        discountValue: 1,
        brand: 'designer name',
        category: 'shoes',
        priceWithoutDiscount: 1,
        sizeId: 1,
      },
    ],
  },
};

export default fixtures;
