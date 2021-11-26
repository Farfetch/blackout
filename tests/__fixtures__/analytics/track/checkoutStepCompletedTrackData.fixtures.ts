import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_STEP_COMPLETED,
  properties: {
    orderId: '50314b8e9bcf000000000000',
    step: 1,
    option: 'DHL Ground',
  },
};
