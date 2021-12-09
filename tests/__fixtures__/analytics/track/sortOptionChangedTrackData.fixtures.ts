import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.SORT_OPTION_CHANGED,
  properties: {
    sortOption: 'Price: Low to High',
  },
};
