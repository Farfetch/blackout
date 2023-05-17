import { UserGender } from '@farfetch/blackout-client';

const fixtures = {
  type: null,
  properties: {},
  event: null,
  user: {
    id: 680968743,
    localId: 'd9864a1c112d-47ff-8ee4-968c-5acecae23',
    traits: {
      name: 'foo bar',
      email: 'bar@foo.com',
      isGuest: false,
      bagId: '1ff36cd1-0dac-497f-8f32-4f2f7bdd2eaf',
      gender: UserGender.Male,
      dateOfBirth: '1/1/1970',
      createdDate: '1/1/1970',
      firstName: 'foo',
      lastName: 'bar',
      phoneNumber: '+351-99999999',
      username: 'foo.bar',
      wishlistId: '123123',
      countryCode: 'US',
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
      name: '@farfetch/blackout-analytics',
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
          pathname: '/en-pt/',
          auth: '',
          host: '127.0.0.1:3000',
          port: '3000',
          hostname: '127.0.0.1',
          password: '',
          username: '',
          origin: 'http://127.0.0.1:3000',
          href: 'http://127.0.0.1:3000/en-pt/',
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
        title: 'Acme',
        referrer: 'https://example.com',
      },
      pageLocationReferrer: 'https://example.com',
    },
    event: {
      __blackoutAnalyticsEventId: '4eabf689-96e3-4952-8176-248a848f1e1f',
    },
  },
  timestamp: 1567010265879,
  platform: 'web',
};

export default fixtures;
