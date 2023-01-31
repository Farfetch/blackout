import { trackTypes as analyticsTrackTypes } from '@farfetch/blackout-core/analytics';
import mockedPageData from './analyticsPageData.fixtures.json';

export default {
  // Properties given from the browser - No need to pass them via `data.properties`
  consent: null,
  context: {
    ...mockedPageData.context,
    currencyCode: 'USD',
  },
  properties: {},
  timestamp: 1567010265879,
  type: analyticsTrackTypes.TRACK,
  user: {
    localId: 'd9864a1c112d-47ff-8ee4-968c-5acecae23',
    id: 4789996,
    traits: {
      isGuest: true,
      name: 'John Doe',
      email: 'john@email.com',
      createdDate: '2022-05-05T14:16:48.149Z',
    },
  },
};
