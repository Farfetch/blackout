import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.PLACE_ORDER_STARTED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    total: 24.64,
    shipping: 3.6,
    tax: 2.04,
    coupon: 'ACME2019',
    currency: 'USD',
  },
};

export default fixtures;
