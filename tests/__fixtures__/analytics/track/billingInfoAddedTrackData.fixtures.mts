import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.BILLING_INFO_ADDED,
  properties: {
    checkoutOrderId: 12345678,
    orderId: '50314b8e9bcf000000000000',
    total: 24.64,
    coupon: 'ACME2019',
    currency: 'USD',
    step: '1',
    addressFinder: false,
  },
};

export default fixtures;
