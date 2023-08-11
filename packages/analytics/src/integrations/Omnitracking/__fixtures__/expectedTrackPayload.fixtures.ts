import { EventType } from '../../../index.js';
import {
  mockedPreviousViewUid,
  mockedViewUid,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import mockedUuid from './mocked_uuid.js';

const trackMockData = trackEventsData[EventType.ProductAddedToCart];

const fixtures = {
  clientId: trackMockData.context.clientId,
  tenantId: trackMockData.context.tenantId,
  correlationId: trackMockData.user.localId,
  customerId: `${trackMockData.user.id}`,
  event: 'PageAction',
  parameters: {
    clientTimestamp: new Date(trackMockData.timestamp).toJSON(),
    uuid: mockedUuid,
    uniqueViewId: mockedViewUid,
    previousUniqueViewId: mockedPreviousViewUid,
    analyticsPackageVersion: '0.1.0',
  },
};

export default fixtures;
