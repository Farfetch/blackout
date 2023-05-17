import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.ShippingMethodAdded,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    checkoutOrderId: 15338048,
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    shippingTier: 'Next Day',
    currency: 'USD',
    step: '2',
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
    paymentType: 'credit',
  },
};

export default fixtures;
