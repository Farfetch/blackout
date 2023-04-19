import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.SIGNUP_FORM_COMPLETED,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;