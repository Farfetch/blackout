import { AnalyticsApi } from '../';
import { eventTypes } from '../../index.js';
import { integrations, utils } from '@farfetch/blackout-core/analytics';
import { validTrackEvents } from '../__fixtures__/gaData.fixtures.js';
import client from '@farfetch/blackout-core/helpers/client';

utils.logger.error = jest.fn();
utils.logger.warn = jest.fn();
utils.logger.info = jest.fn();

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: 'analyticsAPIDebug=true',
});

jest.mock('@farfetch/blackout-core/helpers/client', () => ({
  ...jest.requireActual('@farfetch/blackout-core/helpers/client'),
  post: jest.fn(),
}));

const defaultTrackEventData =
  validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART];

function createAnalyticsApiInstance(options, loadData) {
  return AnalyticsApi.createInstance(options, loadData);
}

async function createAnalyticsApiInstanceAndLoad(options, loadData) {
  const instance = createAnalyticsApiInstance(options, loadData);

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

  describe('AnalyticsApi Instance', () => {
    let analyticsApiInstance;

    const validOptions = {
      conversionsAPI: {
        testEventCode: 'TEST43363',
      },
    };

    const loadData = {
      user: {
        id: '12345678',
        traits: {
          email: 'foo@biz.com',
          name: 'John Doe',
          isGuest: false,
        },
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
        ),
      ).toThrow(
        '[Analytics API] - Configuration error: option `whitelistedEvents` from Analytics Api integration options must be an array.',
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
        ),
      ).toThrow(
        '[Analytics API] - Configuration error: option `blacklistedEvents` from Analytics Api integration options must be an array.',
      );
    });

    it('Should trigger an error if both `blacklistedEvents` and `whitelistedEvents` options', async () => {
      expect(() =>
        AnalyticsApi.createInstance(
          {
            blacklistedEvents: [defaultTrackEventData.event],
            whitelistedEvents: [defaultTrackEventData.event],
            conversionsAPI: {
              testEventCode: 'TEST12345',
            },
          },
          loadData,
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
            blacklistedEvents: [],
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
            whitelistedEvents: [],
          });

          await analyticsApiInstance.track(defaultTrackEventData);

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
