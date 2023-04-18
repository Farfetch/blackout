import { pageEventsData } from 'tests/__fixtures__/analytics/index.mjs';
import { PageType } from '../../../index.js';
import { userGenderValuesMapper } from '../definitions.js';
import mockedUuid from './mocked_uuid.js';
import type { DefaultPageFixturesResult } from 'tests/__fixtures__/analytics/page/index.mjs';

const pageMockData = pageEventsData[
  PageType.Homepage
] as DefaultPageFixturesResult;

const fixtures = {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: `${pageMockData.user.id}`,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    clientTimestamp: new Date(pageMockData.timestamp).toJSON(),
    uniqueViewId: null,
    uuid: mockedUuid,
    referrer: '',
    isLogged: true,
    clientCulture: pageMockData.context.culture,
    clientLanguage: pageMockData.context.culture?.split('-')[0],
    basketId: pageMockData.user.traits?.bagId,
    userGender:
      userGenderValuesMapper[
        pageMockData.user.traits?.gender as keyof typeof userGenderValuesMapper
      ],
    viewType: 'Others',
    viewSubType: 'Others',
  },
};

export default fixtures;
