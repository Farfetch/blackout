import { TrackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures';

const fixtures = {
  ...baseAnalyticsEventData,
  type: TrackTypes.PAGE,
};

export default fixtures;
