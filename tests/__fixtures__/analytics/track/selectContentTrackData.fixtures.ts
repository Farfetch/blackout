import { eventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures';

const fixtures = {
  ...baseTrackData,
  event: eventTypes.SELECT_CONTENT,
  properties: {
    contentType: 'biz',
    productId: 12345,
    interactionType: 'click',
    id: 12312312,
  },
};

export default fixtures;
