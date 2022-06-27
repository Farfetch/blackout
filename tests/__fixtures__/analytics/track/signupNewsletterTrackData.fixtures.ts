import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.SIGNUP_NEWSLETTER,
  properties: {
    gender: '0',
  },
};

export default fixtures;
