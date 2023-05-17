import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.Login,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;
