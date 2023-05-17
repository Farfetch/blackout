import { EventType, InteractionType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.InteractContent,
  properties: {
    interactionType: InteractionType.Click,
    contentType: 'biz',
    someOtherProperty: 12312312,
    state: 'dummy',
  },
};

export default fixtures;
