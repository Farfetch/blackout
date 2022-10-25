import { eventTypes, interactionTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.INTERACT_CONTENT,
  properties: {
    interactionType: interactionTypes.CLICK,
    contentType: 'biz',
    someOtherProperty: 12312312,
    state: 'dummy',
  },
};

export default fixtures;
