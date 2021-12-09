import { eventTypes, interactionTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

export default {
  ...baseTrackData,
  event: eventTypes.INTERACT_CONTENT,
  properties: {
    interactionType: interactionTypes.CLICK,
    contentType: 'biz',
    someOtherProperty: 12312312,
  },
};
