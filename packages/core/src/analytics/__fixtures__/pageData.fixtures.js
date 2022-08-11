import {
  expectedCommonParameters,
  mockCommonData,
} from './commonData.fixtures';
import { userGenderValuesMapper } from '../integrations/Omnitracking/definitions';
import pageTypes from '../types/pageTypes';
import platformTypes from '../types/platformTypes';
import trackTypes from '../types/trackTypes';

const expectedCommonPageParameters = {
  ...expectedCommonParameters,
  uuid: 213123, // uuid is in expectedCommonParameters but as it is defined in the pageMockData.properties, it will override the default value
  searchResultCount: 1,
  viewGender: 'Women',
};

const pageMockData = {
  type: trackTypes.PAGE,
  properties: {
    storeId: 123123,
    cenas: 123123,
    uuid: 213123,
    didYouMean: 1123123,
    itemCount: 1,
    gender: 'Women',
    products: [
      {
        id: 12345678,
        discountValue: 1,
        brand: 'designer name',
        category: 'shoes',
        priceWithoutDiscount: 1,
        sizeId: 1,
      },
      {
        id: 98765,
        discountValue: 1,
        brand: 'shirt designer name',
        category: 'shirt',
        priceWithoutDiscount: 1,
        sizeId: 1,
      },
    ],
  },
  event: pageTypes.HOMEPAGE,
  user: {
    id: 680968743,
    localId: mockCommonData.userLocalId,
    traits: {
      name: 'foo',
      email: 'bar',
      isGuest: false,
      bagId: '1ff36cd1-0dac-497f-8f32-4f2f7bdd2eaf',
      gender: 1,
    },
  },
  consent: {
    marketing: true,
    preferences: true,
    statistics: true,
  },
  context: {
    library: {
      version: '0.1.0',
      name: '@farfetch/blackout-core/analytics',
    },
    culture: 'en-US',
    tenantId: 26000,
    clientId: 26000,
    web: {
      window: {
        location: {
          slashes: true,
          protocol: 'http:',
          hash: '',
          query: {
            utm_term: 'utm_term',
            utm_source: 'utm_source',
            utm_medium: 'utm_medium',
            utm_content: 'utm_content',
            utm_campaign: 'utm_campaign',
          },
          pathname: '/pt/',
          auth: '',
          host: '127.0.0.1:3000',
          port: '3000',
          hostname: '127.0.0.1',
          password: '',
          username: '',
          origin: 'http://127.0.0.1:3000',
          href: 'http://127.0.0.1:3000/pt/',
        },
        navigator: {
          language: 'en-US',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        },
        screen: {
          width: 0,
          height: 0,
        },
      },
      document: {
        title: 'Thom Browne',
        referrer: 'https://example.com',
      },
      pageLocationReferrer: 'https://example.com',
    },
  },
  timestamp: mockCommonData.timestamp,
  platform: platformTypes.Web,
};

export const customPageMockData = {
  [pageTypes.WISHLIST]: {
    products: [{ quantity: 2 }, { quantity: 3 }],
  },
  [pageTypes.BAG]: {
    products: [{ quantity: 5 }, { quantity: 3 }],
    value: 100,
  },
  [pageTypes.CHECKOUT]: {
    total: 100,
    shipping: 10,
    orderId: 'ASH12',
  },
};

const getPageMockParametersForPlatform = platform => {
  let parameters;

  if (platform === platformTypes.Web) {
    parameters = {
      deviceLanguage: pageMockData.context.web.window.navigator.language,
      internalRequest: false,
      referrer: pageMockData.context.web.pageLocationReferrer,
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
    };
  } else if (platform === platformTypes.Mobile) {
    parameters = {
      referrer: '',
    };
  } else {
    parameters = {};
  }

  return {
    ...parameters,
    isLogged: true,
    clientLanguage: pageMockData.context.culture.split('-')[0],
    clientCountry: pageMockData.context.culture.split('-')[1],
    clientCulture: pageMockData.context.culture,
    basketId: pageMockData.user.traits.bagId,
    userGender: userGenderValuesMapper[pageMockData.user.traits.gender],
  };
};

export const expectedPagePayloadWeb = {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: pageMockData.user.id,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    ...expectedCommonPageParameters,
    ...getPageMockParametersForPlatform(platformTypes.Web),
  },
};

export const expectedPagePayloadMobile = {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: pageMockData.user.id,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    ...expectedCommonPageParameters,
    ...getPageMockParametersForPlatform(platformTypes.Mobile),
  },
};

export const expectedPagePayloadUnknown = {
  clientId: pageMockData.context.clientId,
  tenantId: pageMockData.context.tenantId,
  correlationId: pageMockData.user.localId,
  customerId: pageMockData.user.id,
  event: 'GenericPageVisited',

  parameters: {
    storeId: 123123,
    ...expectedCommonPageParameters,
    ...getPageMockParametersForPlatform('Dummy'),
  },
};

export default pageMockData;
