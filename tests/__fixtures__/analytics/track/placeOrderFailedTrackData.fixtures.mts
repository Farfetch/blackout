import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.PlaceOrderFailed,
  properties: {
    orderId: '50314b8e9bcf000000000000',
  },
};

export default fixtures;
