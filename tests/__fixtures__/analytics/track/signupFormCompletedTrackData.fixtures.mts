import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.SignupFormCompleted,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;
