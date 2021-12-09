import { fromParameterTypes, pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

export default {
  ...basePageData,
  event: pageTypes.WISHLIST,
  properties: {
    currency: 'USD',
    from: fromParameterTypes.WISHLIST,
    list: 'my_wishlist',
    listId: 'd3618128-5aa9-4caa-a452-1dd1377a6190',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        category: 'Clothing/Tops/T-shirts/',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        brand: 'Just A T-Shirt',
        variant: 'Black',
        size: 'L',
        discountValue: 6,
        price: 19,
        priceWithoutDiscount: 25,
        quantity: 1,
      },
    ],
  },
};
