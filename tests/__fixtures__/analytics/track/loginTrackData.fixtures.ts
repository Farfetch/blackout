import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.LOGIN,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;
