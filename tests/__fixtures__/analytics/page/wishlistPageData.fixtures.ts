import { fromParameterTypes, pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  event: pageTypes.WISHLIST,
  properties: {
    currency: 'USD',
    from: fromParameterTypes.WISHLIST,
    wishlistId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    products: [
      {
        brand: 'Saint Laurent',
        category: 'Clothing/Pants/Slacks',
        discountValue: 1,
        id: '12122479',
        name: 'high waist tailored trousers',
        position: 1,
        price: 1,
        priceWithoutDiscount: 2,
        quantity: 13,
        size: '38',
        sizeId: '20',
        variant: '1000 NOIR',
        locationId: 20000,
        coupon: 'EASTER2022',
      },
      {
        brand: 'Saint Laurent',
        category: 'Clothing/Pants/Slacks',
        discountValue: 1,
        id: '12122479',
        name: 'high waist tailored trousers',
        position: 1,
        price: 1,
        priceWithoutDiscount: 2,
        quantity: 13,
        size: '40',
        sizeId: '21',
        variant: '1000 NOIR',
        locationId: 20000,
        coupon: 'EASTER2022',
      },
    ],
  },
};

export default fixtures;
