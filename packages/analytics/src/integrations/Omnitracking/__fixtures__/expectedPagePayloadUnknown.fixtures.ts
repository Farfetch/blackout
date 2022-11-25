import { pageEventsData } from 'tests/__fixtures__/analytics';
import { pageTypes } from '../../..';
import { userGenderValuesMapper } from '../definitions';
import mockedUuid from './mocked_uuid';
import type { DefaultPageFixturesResult } from 'tests/__fixtures__/analytics/page';

const pageMockData = pageEventsData[
  pageTypes.HOMEPAGE
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
