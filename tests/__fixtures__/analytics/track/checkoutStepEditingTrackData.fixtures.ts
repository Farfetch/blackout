import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_STEP_EDITING,
  properties: {
    step: 1,
  },
};
