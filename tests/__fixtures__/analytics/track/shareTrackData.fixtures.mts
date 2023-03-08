import { EventTypes } from '@farfetch/blackout-analytics';
import baseTrackData from './baseTrackData.fixtures.mjs';

const fixtures = {
  ...baseTrackData,
  event: EventTypes.SHARE,
  properties: {
    method: 'Facebook',
    contentType: 'image',
    id: '123456',
    from: 'PDP',
  },
};

export default fixtures;
