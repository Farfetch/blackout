import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.CHECKOUT_STEP_EDITING,
  properties: {
    step: 1,
  },
};

export default fixtures;
