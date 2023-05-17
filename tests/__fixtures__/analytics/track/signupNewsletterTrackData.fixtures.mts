import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.SignupNewsletter,
  properties: {
    gender: '0',
  },
};

export default fixtures;
