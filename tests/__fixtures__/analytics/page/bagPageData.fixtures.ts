import { fromParameterTypes, pageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

export default {
  ...basePageData,
  event: pageTypes.BAG,
  properties: {
    currency: 'USD',
    from: fromParameterTypes.BAG,
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        category: 'Clothing/Tops/T-shirts/',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        brand: 'Just A T-Shirt',
        variant: 'Black',
        size: 'L',
        price: 19,
        quantity: 1,
      },
    ],
  },
};
