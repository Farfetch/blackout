import { trackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures';

export default {
  ...baseAnalyticsEventData,
  type: trackTypes.TRACK,
};
