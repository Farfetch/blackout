import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.SIGNUP_NEWSLETTER,
  properties: {
    gender: '0',
  },
};

export default fixtures;
