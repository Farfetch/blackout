import { AnalyticsApi } from '../../index.js';
import { client } from '@farfetch/blackout-client';
import {
  EventType,
  integrations,
  type LoadIntegrationEventData,
  type PageType,
  type StrippedDownAnalytics,
  utils,
} from '@farfetch/blackout-analytics';
import {
  loadIntegrationData,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import type { AnalyticsApiIntegrationOptions } from '../types/types.js';

utils.logger.error = jest.fn();

utils.logger.warn = jest.fn();

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: 'analyticsAPIDebug=true',
});

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  client: { post: jest.fn() },
}));

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
};

const defaultTrackEventData = trackEventsData[EventType.ProductAddedToCart];

function createAnalyticsApiInstance(
  options: AnalyticsApiIntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  return AnalyticsApi.createInstance(
    options,
    loadData,
    analytics,
  ) as AnalyticsApi;
}

async function createAnalyticsApiInstanceAndLoad(
  options: AnalyticsApiIntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  const instance = createAnalyticsApiInstance(options, loadData, analytics);

  // @ts-expect-error Access private member initializePromise to ease testing
  await instance.initializePromise;

  return instance;
}

describe('AnalyticsApi Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should extend the abstract class `Integration`', () => {
    expect(AnalyticsApi.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('`shouldLoad` should return false if there is no user consent', () => {
    expect(AnalyticsApi.shouldLoad({ marketing: false }, {})).toBe(false);
    expect(AnalyticsApi.shouldLoad({}, {})).toBe(false);
  });

  it('`shouldLoad` should return true if there is user consent', () => {
    expect(AnalyticsApi.shouldLoad({ marketing: true }, {})).toBe(true);
  });

  describe('AnalyticsApi Instance', () => {
    let analyticsApiInstance: AnalyticsApi;

    const validOptions = {
      whitelistedEvents: [
        'Product Added to Cart',
        'Product Added to Wishlist',
        'Checkout Started',
      ] as Array<`${EventType}` | `${PageType}`>,
      blacklistedEvents: ['Payment Info Added'] as Array<
        `${EventType}` | `${PageType}`
      >,
      conversionsAPI: {
        testEventCode: 'TEST43363',
      },
    };

    const loadData: LoadIntegrationEventData = {
      ...loadIntegrationData,
      user: {
        ...loadIntegrationData.user,
        id: 12345678,
      },
    };

    it('Should return an AnalyticsApi instance from createInstance', () => {
      expect(
        AnalyticsApi.createInstance(
          {
            whitelistedEvents: ['Product Added to Cart'],
            conversionsAPI: {
              testEventCode: 'TEST43363',
            },
          },
          loadData,
          strippedDownAnalytics,
        ),
      ).toBeInstanceOf(AnalyticsApi);
    });

    it('Should trigger logger error if whitelistedEvents is not an array', () => {
      expect(() =>
        AnalyticsApi.createInstance(
          {
            // @ts-expect-error wrong set of eventsList
            whitelistedEvents: 'test',
            conversionsAPI: {
              testEventCode: 'TEST43363',
            },
          },
          loadData,
          strippedDownAnalytics,
        ),
      ).toThrow(
        '[Analytics API] - The value `options.whitelistedEvents` from Analytics Api integration options must be an array.',
      );
    });

    it('Should trigger logger error if blacklistedEvents is not an array', () => {
      expect(() =>
        AnalyticsApi.createInstance(
          {
            // @ts-expect-error wrong set of eventsList
            blacklistedEvents: 'test',
            conversionsAPI: {
              testEventCode: 'TEST43363',
            },
          },
          loadData,
          strippedDownAnalytics,
        ),
      ).toThrow(
        '[Analytics API] - The value `options.blacklistedEvents` from Analytics Api integration options must be an array.',
      );
    });

    describe('Track events', () => {
      it('Should not map the blacklisted event', async () => {
        analyticsApiInstance = await createAnalyticsApiInstanceAndLoad({
          blacklistedEvents: [defaultTrackEventData.event],
          conversionsAPI: {
            testEventCode: 'TEST43363',
          },
        });

        await analyticsApiInstance.track(defaultTrackEventData);

        expect(client.post).toHaveBeenCalledTimes(0);
      });

      it('Should map the whitelisted event, and not send the whitelistedEvents or blacklistedEvents in options', async () => {
        analyticsApiInstance = await createAnalyticsApiInstanceAndLoad(
          validOptions,
        );

        await analyticsApiInstance.track(defaultTrackEventData);

        expect(client.post).toHaveBeenCalledWith('/analytics/v1/events', {
          options: {
            conversionsAPI: validOptions.conversionsAPI,
            debugMode: true,
          },
          data: expect.objectContaining({
            event: defaultTrackEventData.event,
          }),
        });
      });
    });
  });
});
