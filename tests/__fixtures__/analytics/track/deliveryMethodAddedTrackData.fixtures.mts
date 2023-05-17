import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.DeliveryMethodAdded,
  properties: {
    checkoutOrderId: 12345678,
    coupon: 'ACME2019',
    currency: 'USD',
    deliveryType: 'Standard/Standard',
    orderId: '50314b8e9bcf000000000000',
    packagingType: 'foo',
    paymentType: 'credit',
    interactionType: 'click',
    shipping: 10,
    shippingTier: 'Next Day',
    step: 2,
    total: 24.64,
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
