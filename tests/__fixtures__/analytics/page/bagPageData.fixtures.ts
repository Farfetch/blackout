import { FromParameterTypes, PageTypes } from '@farfetch/blackout-analytics';
import basePageData from './basePageData.fixtures';

const fixtures = {
  ...basePageData,
  event: PageTypes.BAG,
  properties: {
    currency: 'USD',
    from: FromParameterTypes.BAG,
    list: 'Bag',
    listId: 'e0030b3c-b970-4496-bc72-f9a38d6270b1',
    value: 13,
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

export default fixtures;
