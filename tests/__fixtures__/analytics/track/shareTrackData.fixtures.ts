import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.SHARE,
  properties: {
    method: 'Facebook',
    contentType: 'image',
    id: '123456',
  },
};
