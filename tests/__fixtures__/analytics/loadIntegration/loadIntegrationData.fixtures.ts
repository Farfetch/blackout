import { utils } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures';

export default {
  ...baseAnalyticsEventData,
  type: utils.LOAD_INTEGRATION_TRACK_TYPE,
  properties: {},
  event: utils.LOAD_INTEGRATION_TRACK_TYPE,
} as const;
