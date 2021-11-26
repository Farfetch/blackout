import { trackTypes } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures.json';

export default {
  ...baseAnalyticsEventData,
  type: trackTypes.PAGE,
};
