import {
  expectedCommonParameters,
  mockCommonData,
} from './commonData.fixtures';
import mockedPageData from './pageData.fixtures';
import platformTypes from '../types/platformTypes';
import trackTypes from '../types/trackTypes';

const trackMockData = {
  // Properties given from the browser - No need to pass them via `data.properties`
  consent: null,
  context: {
    culture: 'en-US',
    library: { version: '0.86.0', name: '@farfetch/blackout-core/analytics' },
    web: mockedPageData.context.web,
    clientId: 26000,
    tenantId: 26000,
  },
  properties: {
    products: [
      {
        id: 12345678,
        discountValue: 1,
        brand: 'designer name',
        category: 'shoes',
        priceWithoutDiscount: 1,
        sizeId: 1,
      },
    ],
    total: 100,
    shipping: 10,
  },
  platform: platformTypes.Web,
  timestamp: mockCommonData.timestamp,
  type: trackTypes.TRACK,
  user: {
    localId: mockCommonData.userLocalId,
    id: 4789996,
    traits: { gender: 0, isGuest: true, name: null, email: null },
  },
};

export default trackMockData;

export const expectedTrackPayload = {
  clientId: trackMockData.context.clientId,
  tenantId: trackMockData.context.tenantId,
  correlationId: trackMockData.user.localId,
  customerId: 'g_4789996',
  event: 'PageAction',
  parameters: {
    ...expectedCommonParameters,
  },
};
