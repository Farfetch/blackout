import {
  type EventData,
  PageType,
  type TrackTypesValues,
} from '../../../index.js';
import {
  mockedPreviousViewUid,
  mockedViewUid,
  pageEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import { userGenderValuesMapper } from '../definitions.js';
import mockedUuid from './mocked_uuid.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageMockData = EventData<TrackTypesValues> & { context: { web: any } };

const pageMockData: PageMockData = pageEventsData[
  PageType.Homepage
] as PageMockData;

const fixtures = {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: `${pageMockData.user.id}`,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    clientTimestamp: new Date(pageMockData.timestamp).toJSON(),
    uniqueViewId: mockedViewUid,
    previousUniqueViewId: mockedPreviousViewUid,
    uuid: mockedUuid,
    deviceLanguage: pageMockData.context.web.window.navigator.language,
    internalRequest: false,
    referrer: pageMockData.context.web.document.referrer,
    referrerHost: 'example.com',
    screenHeight: pageMockData.context.web.window.screen.height,
    screenWidth: pageMockData.context.web.window.screen.width,
    url: pageMockData.context.web.window.location.href,
    userAgent: pageMockData.context.web.window.navigator.userAgent,
    userCountryLocation: 'pt',
    utmCampaign: pageMockData.context.web.window.location.query.utm_campaign,
    utmContent: pageMockData.context.web.window.location.query.utm_content,
    utmMedium: pageMockData.context.web.window.location.query.utm_medium,
    utmSource: pageMockData.context.web.window.location.query.utm_source,
    utmTerm: pageMockData.context.web.window.location.query.utm_term,
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
