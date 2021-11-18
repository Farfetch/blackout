import { trackTypes as analyticsTrackTypes } from '@farfetch/blackout-core/analytics';
import mockedPageData from './analyticsPageData.fixtures';

export default {
  // Properties given from the browser - No need to pass them via `data.properties`
  consent: null,
  context: {
    culture: 'en-US',
    currencyCode: 'USD',
    library: { version: '0.86.0', name: '@farfetch/blackout-core/analytics' },
    web: mockedPageData.context.web,
    clientId: 26000,
    tenantId: 26000,
  },
  properties: {},
  timestamp: 1567010265879,
  type: analyticsTrackTypes.TRACK,
  user: {
    localId: 'd9864a1c112d-47ff-8ee4-968c-5acecae23',
    id: 4789996,
    traits: { isGuest: true, name: 'John Doe', email: 'john@email.com' },
  },
};
