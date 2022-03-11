import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.PLACE_ORDER_FAILED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
  },
};
