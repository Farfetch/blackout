import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.FiltersApplied,
  properties: {
    filters: {
      brands: [2765, 4062],
      categories: [135973],
      colors: [1],
      discount: [0],
      gender: [0],
      price: [0, 1950],
      sizes: [16],
    },
  },
};

export default fixtures;
