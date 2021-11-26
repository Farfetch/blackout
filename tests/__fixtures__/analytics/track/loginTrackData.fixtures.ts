import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.LOGIN,
  properties: {
    method: 'Acme',
  },
};
