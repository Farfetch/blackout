import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.SIGNUP_FORM_VIEWED,
};

export default fixtures;
