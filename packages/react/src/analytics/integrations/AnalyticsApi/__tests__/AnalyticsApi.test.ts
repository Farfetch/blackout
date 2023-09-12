import { AnalyticsApi } from '../../index.js';
import { client } from '@farfetch/blackout-client';
import {
  EventType,
  integrations,
  type LoadIntegrationEventData,
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

utils.logger.info = jest.fn();

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

  it('`shouldLoad` should return always true', () => {
    expect(AnalyticsApi.shouldLoad()).toBe(true);
    // @ts-expect-error
    expect(AnalyticsApi.shouldLoad({}, {})).toBe(true);
    // @ts-expect-error
    expect(AnalyticsApi.shouldLoad({ marketing: true }, {})).toBe(true);
    // @ts-expect-error
    expect(AnalyticsApi.shouldLoad({ marketing: false }, {})).toBe(true);
  });

  describe('AnalyticsApi Instance', () => {
    let analyticsApiInstance: AnalyticsApi;

    const validOptions = {
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

    it('Should trigger an error if `whitelistedEvents` options is not an array', () => {
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
        '[Analytics API] - Configuration error: option `whitelistedEvents` must be an array.',
      );
    });

    it('Should trigger an error if `blacklistedEvents` option is not an array', () => {
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
        '[Analytics API] - Configuration error: option `blacklistedEvents` must be an array.',
      );
    });

    it('Should trigger an error if both `blacklistedEvents` and `whitelistedEvents` options are set', () => {
      expect(() =>
        AnalyticsApi.createInstance(
          {
            blacklistedEvents: [defaultTrackEventData.event],
            whitelistedEvents: [defaultTrackEventData.event],
            conversionsAPI: {
              testEventCode: 'TEST43363',
            },
          },
          loadData,
          strippedDownAnalytics,
        ),
      ).toThrow(
        '[Analytics API] - Configuration error: `blacklistedEvents` and `whitelistedEvents` cannot both be set at the same time.',
      );
    });

    describe('Track events', () => {
      describe('When `blacklistedEvents` is set', () => {
        it('Should not send events that are blacklisted', async () => {
          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad({
            ...validOptions,
            blacklistedEvents: [defaultTrackEventData.event],
          });

          await analyticsApiInstance.track(defaultTrackEventData);

          expect(client.post).not.toHaveBeenCalled();
        });

        it('Should send events that are not blacklisted', async () => {
          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad({
            ...validOptions,
            blacklistedEvents: [defaultTrackEventData.event],
          });

          await analyticsApiInstance.track(
            trackEventsData[EventType.ProductRemovedFromCart],
          );

          expect(client.post).toHaveBeenCalledWith('/analytics/v1/events', {
            options: {
              ...validOptions,
              debugMode: true,
            },
            data: trackEventsData[EventType.ProductRemovedFromCart],
          });
        });
      });

      describe('When `whitelistedEvents` is set', () => {
        it('Should send events that are whitelisted', async () => {
          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad({
            ...validOptions,
            whitelistedEvents: [defaultTrackEventData.event],
          });

          await analyticsApiInstance.track(defaultTrackEventData);

          expect(client.post).toHaveBeenCalledWith('/analytics/v1/events', {
            options: {
              ...validOptions,
              debugMode: true,
            },
            data: defaultTrackEventData,
          });
        });

        it('Should not send events that are not whitelisted', async () => {
          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad({
            ...validOptions,
            whitelistedEvents: [defaultTrackEventData.event],
          });

          await analyticsApiInstance.track(
            trackEventsData[EventType.ProductRemovedFromCart],
          );

          expect(client.post).not.toHaveBeenCalled();
        });
      });

      describe('debugMode', () => {
        it('Should log the payload that will be sent when `debugMode` is true', async () => {
          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad(
            validOptions,
          );

          await analyticsApiInstance.track(defaultTrackEventData);

          expect(utils.logger.info).toHaveBeenCalledWith(
            '[Analytics API] - track:',
            {
              data: defaultTrackEventData,
              options: {
                ...validOptions,
                debugMode: true,
              },
            },
          );
        });

        it('Should not log the payload that will be sent when `debugMode` is false', async () => {
          const originalDocumentCookies = document.cookie;

          document.cookie = '';

          analyticsApiInstance = await createAnalyticsApiInstanceAndLoad(
            validOptions,
          );

          await analyticsApiInstance.track(defaultTrackEventData);

          expect(utils.logger.info).not.toHaveBeenCalled();

          document.cookie = originalDocumentCookies;
        });
      });
    });
  });
});
