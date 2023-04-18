import { EventType } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventType.Share,
  properties: {
    method: 'Facebook',
    contentType: 'image',
    id: '123456',
    from: 'Pdp',
  },
};

export default fixtures;
