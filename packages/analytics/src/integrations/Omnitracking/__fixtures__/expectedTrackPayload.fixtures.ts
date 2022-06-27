import { eventTypes } from '../../..';
import { trackEventsData } from 'tests/__fixtures__/analytics';
import mocked_view_uid from './mocked_view_uid';
import mockedUuid from './mocked_uuid';

const trackMockData = trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

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
