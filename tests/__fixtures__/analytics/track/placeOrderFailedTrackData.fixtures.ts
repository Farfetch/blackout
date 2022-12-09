import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.PLACE_ORDER_FAILED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
  },
};

export default fixtures;
