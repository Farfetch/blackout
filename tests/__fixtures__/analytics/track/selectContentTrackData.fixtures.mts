import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.SELECT_CONTENT,
  properties: {
    contentType: 'biz',
    productId: 12345,
    interactionType: 'click',
    id: 12312312,
  },
};

export default fixtures;