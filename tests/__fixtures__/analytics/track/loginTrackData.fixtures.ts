import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.LOGIN,
  properties: {
    method: 'Acme',
  },
};

export default fixtures;
