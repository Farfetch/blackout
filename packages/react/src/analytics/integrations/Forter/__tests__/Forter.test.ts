import {
  EventTypes,
  type SetUserEventData,
  type StrippedDownAnalytics,
  type TrackTypes,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { ForterTokenTid } from '../constants.js';
import {
  loadIntegrationData,
  onSetUserEventData,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import { postTracking } from '@farfetch/blackout-client';
import flushPromises from 'tests/flushPromises.mjs';
import Forter from '../index.js';
import getCallError from 'tests/getCallError.mjs';

const eventData = trackEventsData[EventTypes.CHECKOUT_STARTED];

let mockPostTrackingsPromiseResolve: (value?: SetUserEventData) => void;
const mockPostTrackingsPromise = new Promise(
  resolve => (mockPostTrackingsPromiseResolve = resolve),
);
const mockSiteId = 'c3f674e6511e';
const mockOrigin = 'Whitelabel Portal';
const mockForterToken =
  '44807307964b4931a89bf364e580bdc5_1594724271711__UDF43_9ck';
const mockForterTokenLoadedPromise = Promise.resolve(mockForterToken);

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: (type: TrackTypes) =>
    Promise.resolve({ ...loadIntegrationData, type }),
};

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postTracking: jest.fn(async () => {
    mockPostTrackingsPromiseResolve();

    return await mockPostTrackingsPromise;
  }),
}));

jest.mock(
  '../forterTokenLoadedEventDetector',
  () =>
    class {
      getForterToken = jest.fn(async () => await mockForterTokenLoadedPromise);
    },
);

utils.logger.warn = jest.fn();
utils.logger.error = jest.fn();

describe('Forter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true on its shouldLoad method', () => {
    expect(Forter.shouldLoad()).toBe(true);
  });

  it('should return an instance of Forter class in its createInstance method', () => {
    expect(
      Forter.createInstance(
        { siteId: mockSiteId },
        loadIntegrationData,
        strippedDownAnalytics,
      ),
    ).toBeInstanceOf(Forter);
  });

  it('should return an error when siteId is not set on Forter Options.', async () => {
    const error = await getCallError(() =>
      Forter.createInstance(
        // @ts-expect-error try loading Riskified without passing shop
        {},
        loadIntegrationData,
        strippedDownAnalytics,
      ),
    );

    expect(error).toEqual(
      expect.objectContaining({
        message:
          "[Forter] - `siteId` parameter was not provided in options. It's mandatory to load Forter Integration.",
      }),
    );
  });

  it('should log a warn message if `origin` is not specified in options', () => {
    Forter.createInstance(
      { siteId: mockSiteId },
      loadIntegrationData,
      strippedDownAnalytics,
    ) as Forter;

    expect(utils.logger.warn).toHaveBeenCalledWith(
      "[Forter] - `origin` parameter was not provided in options. It's advisable to provide an origin option to aid in debugging",
    );
  });

  it('should post a message to Omnitracking with forter token when it is loaded', async () => {
    const createEventMock = function (type: TrackTypesValues, event: string) {
      return Promise.resolve({
        ...eventData,
        event,
        type,
      });
    };

    const forterInstance = Forter.createInstance(
      {
        siteId: mockSiteId,
        origin: mockOrigin,
      },
      loadIntegrationData,
      { ...strippedDownAnalytics, createEvent: createEventMock },
    );
    // @ts-expect-error accessing private property just for testing
    const spy = jest.spyOn(forterInstance, 'resolveOnSetUserPromise');

    forterInstance.onSetUser(onSetUserEventData);

    await mockPostTrackingsPromise;

    expect(postTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        tenantId: eventData.context.tenantId,
        clientId: eventData.context.clientId,
        correlationId: eventData.user.localId,
        customerId: `${eventData.user.id}`,
        event: 'PageAction',
        parameters: expect.objectContaining({
          clientTimestamp: expect.any(String),
          tid: ForterTokenTid,
          uuid: expect.any(String),
          val: JSON.stringify({
            forterTokenCookie: mockForterToken,
            origin: mockOrigin,
            // @ts-expect-error context on eventData mock are a web context
            userAgent: eventData?.context?.web?.window?.navigator?.userAgent,
          }),
        }),
      }),
    );

    jest.clearAllMocks();

    forterInstance.onSetUser(onSetUserEventData);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should post a message to Omnitracking with forter using custom http client', async () => {
    const createEventMock = function (type: TrackTypesValues, event: string) {
      return Promise.resolve({
        ...eventData,
        event,
        type,
      });
    };

    let mockHttpClientPromiseResolve: (value?: SetUserEventData) => void;
    const mockHttpClientPromise = new Promise(
      resolve => (mockHttpClientPromiseResolve = resolve),
    );
    const httpClientMock = jest.fn(async () => {
      mockHttpClientPromiseResolve();

      return await mockHttpClientPromise;
    });

    const forterInstance = Forter.createInstance(
      {
        siteId: mockSiteId,
        origin: mockOrigin,
        omnitrackingHttpClient: httpClientMock,
      },
      loadIntegrationData,
      { ...strippedDownAnalytics, createEvent: createEventMock },
    );

    forterInstance.onSetUser(onSetUserEventData);

    await mockHttpClientPromise;

    expect(postTracking).not.toHaveBeenCalled();
    expect(httpClientMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tenantId: eventData.context.tenantId,
        clientId: eventData.context.clientId,
        correlationId: eventData.user.localId,
        customerId: `${eventData.user.id}`,
        event: 'PageAction',
        parameters: expect.objectContaining({
          clientTimestamp: expect.any(String),
          tid: ForterTokenTid,
          uuid: expect.any(String),
          val: JSON.stringify({
            forterTokenCookie: mockForterToken,
            origin: mockOrigin,
            // @ts-expect-error context on eventData mock are a web context
            userAgent: eventData?.context?.web?.window?.navigator?.userAgent,
          }),
        }),
      }),
    );
  });

  it('should post a message to Omnitracking with forter using custom http client and throw error', async () => {
    const createEventMock = function (type: TrackTypesValues, event: string) {
      return Promise.resolve({
        ...eventData,
        event,
        type,
      });
    };

    let mockHttpClientPromiseReject: (value?: string) => void;
    const mockHttpClientPromise = new Promise(
      (_, reject) => (mockHttpClientPromiseReject = reject),
    );
    const httpClientMock = jest.fn(async () => {
      mockHttpClientPromiseReject();

      return await mockHttpClientPromise;
    });

    const forterInstance = Forter.createInstance(
      {
        siteId: mockSiteId,
        origin: mockOrigin,
        omnitrackingHttpClient: httpClientMock,
      },
      loadIntegrationData,
      { ...strippedDownAnalytics, createEvent: createEventMock },
    ) as Forter;

    expect(httpClientMock).not.toHaveBeenCalled();

    forterInstance.onSetUser(onSetUserEventData);

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await flushPromises();

    expect((utils.logger.error as jest.Mock).mock.calls).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.stringContaining(
            '[Forter] - Error sending tracking event through Omnitracking HTTP client',
          ),
        ]),
      ]),
    );
  });

  it('should not throw when track method is called', () => {
    expect(() => {
      Forter.createInstance(
        { siteId: mockSiteId },
        loadIntegrationData,
        strippedDownAnalytics,
      ).track(eventData);
    }).not.toThrow();
  });
});
