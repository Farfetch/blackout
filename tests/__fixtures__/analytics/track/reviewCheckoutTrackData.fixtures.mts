import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.ReviewCheckout,
  properties: {
    checkoutOrderId: 15338048,
    coupon: 'ACME2019',
    currency: 'USD',
    deliveryType: 'Standard/Standard',
    orderId: '50314b8e9bcf000000000000',
    packagingType: 'foo',
    paymentType: 'credit',
    shipping: 3.6,
    shippingTier: 'Next Day',
    step: '2',
    tax: 2.04,
    total: 24.64,
  },
};

export default fixtures;
