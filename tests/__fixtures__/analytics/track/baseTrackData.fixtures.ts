import { TrackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures';

const fixtures = {
  ...baseAnalyticsEventData,
  type: TrackTypes.TRACK,
};

export default fixtures;
