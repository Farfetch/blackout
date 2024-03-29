import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.OrderCompleted,
  properties: {
    orderId: 'ABC12',
    checkoutOrderId: 21312312,
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    currency: 'USD',
    addressFinder: false,
    step: 5,
    deliveryType: 'Standard/Standard',
    packagingType: 'foo',
    shippingTier: 'Next Day',
    paymentType: 'credit card',
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        category: 'Clothing/Tops/T-shirts/',
        name: 'Gareth McConnell Dreamscape T-Shirt',
        brand: 'Just A T-Shirt',
        currency: 'USD',
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
