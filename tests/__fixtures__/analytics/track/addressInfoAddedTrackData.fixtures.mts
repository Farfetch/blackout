import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.AddressInfoAdded,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    checkoutOrderId: 12345678,
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    shippingTier: 'Next Day',
    currency: 'USD',
    step: 1,
    deliveryType: 'Standard/Standard',
    interactionType: 'click',
  },
};

export default fixtures;
