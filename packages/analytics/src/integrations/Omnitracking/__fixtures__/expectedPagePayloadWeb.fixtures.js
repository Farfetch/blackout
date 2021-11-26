import { pageEventsData } from 'tests/__fixtures__/analytics/';
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
    clientLanguage: pageMockData.context.culture.split('-')[0],
    clientCountry: pageMockData.context.culture.split('-')[1],
    basketId: pageMockData.user.traits.bagId,
    userGender: userGenderValuesMapper[pageMockData.user.traits.gender],
  },
};
