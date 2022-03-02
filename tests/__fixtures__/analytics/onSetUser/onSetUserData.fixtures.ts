import { ON_SET_USER_TRACK_TYPE } from '@farfetch/blackout-analytics';
import baseAnalyticsEventData from '../baseAnalyticsEventData.fixtures.json';

export default {
  ...baseAnalyticsEventData,
  type: ON_SET_USER_TRACK_TYPE,
  properties: {},
  event: ON_SET_USER_TRACK_TYPE,
};
