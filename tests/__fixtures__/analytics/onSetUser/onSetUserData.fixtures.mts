import { utils } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures.mjs';

const fixtures = {
  ...baseAnalyticsEventData,
  type: utils.ON_SET_USER_TRACK_TYPE,
  properties: {},
  event: utils.ON_SET_USER_TRACK_TYPE,
} as const;

export default fixtures;
