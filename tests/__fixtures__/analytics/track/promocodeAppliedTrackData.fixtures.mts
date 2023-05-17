import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.PromocodeApplied,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    checkoutOrderId: 15338048,
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    errorMessage: 'No promocode available.',
    currency: 'USD',
  },
};

export default fixtures;
