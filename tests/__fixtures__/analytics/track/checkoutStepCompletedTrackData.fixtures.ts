import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_STEP_COMPLETED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    step: 1,
    option: 'DHL Ground',
  },
};

export default fixtures;
