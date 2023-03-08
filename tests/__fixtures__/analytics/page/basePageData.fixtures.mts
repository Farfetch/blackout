import { TrackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures.mjs';

const fixtures = {
  ...baseAnalyticsEventData,
  type: TrackTypes.PAGE,
};

export default fixtures;
