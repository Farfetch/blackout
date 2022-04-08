import { pageEventsData } from 'tests/__fixtures__/analytics';
import { pageTypes } from '../../..';
import { userGenderValuesMapper } from '../definitions';
import mockedUuid from './mocked_uuid';

const pageMockData = pageEventsData[pageTypes.HOMEPAGE];

export default {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: pageMockData.user.id,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    clientTimestamp: new Date(pageMockData.timestamp).toJSON(),
    uniqueViewId: null,
    uuid: mockedUuid,
    referrer: '',
    isLogged: true,
    clientCulture: pageMockData.context.culture,
    clientLanguage: pageMockData.context.culture.split('-')[0],
    clientCountry: pageMockData.context.culture.split('-')[1],
    basketId: pageMockData.user.traits.bagId,
    userGender: userGenderValuesMapper[pageMockData.user.traits.gender],
  },
};
