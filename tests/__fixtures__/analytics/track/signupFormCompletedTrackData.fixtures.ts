import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.SIGNUP_FORM_COMPLETED,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;
