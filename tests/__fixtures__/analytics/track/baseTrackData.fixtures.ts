import { trackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures';

const fixtures = {
  ...baseAnalyticsEventData,
  type: trackTypes.TRACK,
};

export default fixtures;
