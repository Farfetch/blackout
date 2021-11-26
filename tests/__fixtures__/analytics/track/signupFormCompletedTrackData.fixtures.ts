import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.SIGNUP_FORM_COMPLETED,
  properties: {
    method: 'Acme',
  },
};
