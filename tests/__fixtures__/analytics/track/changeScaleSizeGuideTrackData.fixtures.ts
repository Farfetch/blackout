import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHANGE_SCALE_SIZE_GUIDE,
  properties: {
    total: 30.64,
    currency: 'USD',
    from: 'PDP',
    sizeScaleId: '33232',
    sizeScaleName: 'Adidas men shoes',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        category: 'Clothing/Tops/T-shirts/',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        brand: 'Just A T-Shirt',
        variant: 'Black',
        currency: 'USD',
        size: 'L',
        price: 19,
        quantity: 1,
      },
    ],
  },
};
