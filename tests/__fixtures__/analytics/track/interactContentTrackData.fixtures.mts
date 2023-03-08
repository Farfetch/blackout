import { EventTypes, InteractionTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.INTERACT_CONTENT,
  properties: {
    interactionType: InteractionTypes.CLICK,
    contentType: 'biz',
    someOtherProperty: 12312312,
    state: 'dummy',
  },
};

export default fixtures;
