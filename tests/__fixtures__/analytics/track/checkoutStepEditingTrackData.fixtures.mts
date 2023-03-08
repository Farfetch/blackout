import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.CHECKOUT_STEP_EDITING,
  properties: {
    step: 1,
  },
};

export default fixtures;
