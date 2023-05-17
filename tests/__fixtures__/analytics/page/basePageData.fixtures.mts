import { TrackType } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures.mjs';

const fixtures = {
  ...baseAnalyticsEventData,
  type: TrackType.Page,
};

export default fixtures;
