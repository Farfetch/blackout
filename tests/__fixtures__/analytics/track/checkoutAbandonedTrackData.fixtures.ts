import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_ABANDONED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    currency: 'USD',
  },
};
