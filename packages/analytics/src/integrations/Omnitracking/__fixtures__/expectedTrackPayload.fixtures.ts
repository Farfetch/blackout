import { EventTypes } from '../../../index.js';
import { trackEventsData } from 'tests/__fixtures__/analytics/index.mjs';
import mocked_view_uid from './mocked_view_uid.js';
import mockedUuid from './mocked_uuid.js';

const trackMockData = trackEventsData[EventTypes.PRODUCT_ADDED_TO_CART];

const fixtures = {
  clientId: trackMockData.context.clientId,
  tenantId: trackMockData.context.tenantId,
  correlationId: trackMockData.user.localId,
  customerId: `${trackMockData.user.id}`,
  event: 'PageAction',
  parameters: {
    clientTimestamp: new Date(trackMockData.timestamp).toJSON(),
    uuid: mockedUuid,
    uniqueViewId: mocked_view_uid,
  },
};

export default fixtures;
