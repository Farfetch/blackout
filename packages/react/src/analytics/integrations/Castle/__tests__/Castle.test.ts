import {
  pageEventsData as analyticsPageData,
  trackEventsData as analyticsTrackData,
  loadIntegrationData,
} from 'tests/__fixtures__/analytics/index.mjs';
import {
  type EventData,
  EventTypes,
  integrations,
  type LoadIntegrationEventData,
  PageTypes,
  type StrippedDownAnalytics,
  type TrackEventData,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { isString, pickBy } from 'lodash-es';
import Castle, { CASTLE_MESSAGE_PREFIX } from '../Castle.js';
import flushPromises from 'tests/flushPromises.mjs';
import type { CastleIntegrationOptions } from '../types/index.js';
import type { InternalAxiosRequestConfig } from 'axios';
import type { WebContextType } from '../../../context.js';

const mockRequestHeaderValue = '12342342345241342423424';
const publishableKey = 'pk_mock_111111111111111111111111111';
const mockOptions = {
  configureOptions: {
    pk: publishableKey,
    window: window,
    avoidCookies: false,
    cookieDomain: 'foo',
    timeout: 1000,
  },
  debugModeOn: true,
};
const createInstance = (
  options: CastleIntegrationOptions = mockOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
) => new Castle(options, loadData, {} as StrippedDownAnalytics);

jest.mock('@castleio/castle-js', () => {
  return {
    ...jest.requireActual<object>('@castleio/castle-js'),
    createRequestToken: () => Promise.resolve(mockRequestHeaderValue),
  };
});

// mock this function to avoid installing `jest-canvas-mock` - Castle needs it.
HTMLCanvasElement.prototype.getContext = jest.fn();
utils.logger.info = jest.fn();

describe('Castle integration', () => {
  let instance: Castle | null;

  beforeEach(() => {
    instance = null;

    jest.clearAllMocks();
  });

  describe('Castle instance', () => {
    it('Should extend the core integration class', () => {
      expect(Castle.prototype).toBeInstanceOf(integrations.Integration);
    });

    it('Should be an integration that loads independently of user consent', () => {
      expect(Castle.shouldLoad()).toBe(true);
    });

    it('Should return a Castle instance from createInstance', () => {
      instance = createInstance();

      expect(instance).toBeInstanceOf(Castle);
    });
  });

  describe('Validation', () => {
    it('Should log an error if no publishable key is passed via `options`', () => {
      expect(() =>
        // @ts-expect-error - We want to test this specific case
        createInstance({ configureOptions: { pk: null } }),
      ).toThrow();
    });

    it('Should throw an error if an invalid `configureHttpClient` is passed', () => {
      expect(() =>
        // @ts-expect-error - We want to test this specific case
        createInstance({ ...mockOptions, configureHttpClient: 'foo' }),
      ).toThrow();
    });

    it('Should throw an error if an invalid `clientIdHeaderName` is passed`', () => {
      expect(() =>
        // @ts-expect-error - We want to test this specific case
        createInstance({ ...mockOptions, clientIdHeaderName: 123 }),
      ).toThrow();
    });
  });

  describe('Initialization', () => {
    it('Should configure the SDK with the provided options', () => {
      instance = createInstance();

      const castleSDKSpy = jest.spyOn(instance.castleJS, 'configure');

      // clear the call made by the constructor
      castleSDKSpy.mockClear();

      instance.applyOptions(mockOptions);

      expect(castleSDKSpy).toHaveBeenCalledWith(mockOptions.configureOptions);
    });

    it('Should allow to pass a custom function to install the interceptors', async () => {
      const mockConfigureClient = jest.fn();

      instance = createInstance({
        ...mockOptions,
        configureHttpClient: mockConfigureClient,
      });

      await flushPromises();

      expect(mockConfigureClient).toHaveBeenCalledWith(
        instance.castleJS.createRequestToken,
      );

      expect(instance.isInterceptorAttached).toBe(true);
    });

    it('Should install the default interceptors on our client', async () => {
      instance = createInstance();

      expect(instance.httpClientInterceptor).toBeDefined();

      const config = await instance.onBeforeRequestFullfil({
        headers: {},
      } as InternalAxiosRequestConfig);

      // request success interceptor
      expect(config).toEqual({
        headers: {
          [instance.clientIdHeaderName]: mockRequestHeaderValue,
        },
      });

      expect(instance.isInterceptorAttached).toBe(true);
    });

    it('Should throw if an error occurs during the interceptors installation', () => {
      instance = createInstance({ ...mockOptions });

      const configureSpy = jest.spyOn(instance.castleJS, 'configure');

      configureSpy.mockImplementationOnce(() => {
        throw new TypeError('Invalid option `foo`.');
      });

      expect(() => instance?.applyOptions(mockOptions)).toThrow(
        'Castle 2.x - Failed to initialize Castle. Error: TypeError: Invalid option `foo`.',
      );
    });
  });

  describe('Tracking', () => {
    it('Should not track page views', async () => {
      instance = createInstance();

      const castleFormSpy = jest.spyOn(instance.castleJS, 'form');
      const mockPageEvent = analyticsPageData[
        PageTypes.HOMEPAGE
      ] as EventData<TrackTypesValues> & { context: WebContextType };

      await instance.track(mockPageEvent);

      expect(castleFormSpy).not.toHaveBeenCalled();
    });

    it.each([
      EventTypes.ADDRESS_INFO_ADDED,
      EventTypes.CHECKOUT_STEP_COMPLETED,
      EventTypes.LOGIN,
      EventTypes.PAYMENT_INFO_ADDED,
      EventTypes.PROMOCODE_APPLIED,
      EventTypes.SHIPPING_INFO_ADDED,
      EventTypes.SHIPPING_METHOD_ADDED,
      EventTypes.SIGNUP_FORM_COMPLETED,
      EventTypes.SIGNUP_NEWSLETTER,
    ])('Should track the form related event: %s', async event => {
      instance = createInstance();

      const castleFormSpy = jest.spyOn(instance.castleJS, 'form');
      const mockEventData = analyticsTrackData[event];
      const expectedCallPayload = {
        user: instance.getUserData(mockEventData as TrackEventData),
        name: event,
        values: pickBy(mockEventData.properties, isString),
      };

      await instance.track(mockEventData);

      expect(castleFormSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Form track success. Payload:`,
        expectedCallPayload,
      );
    });

    it('Should not track other (custom) events', async () => {
      instance = createInstance();

      const castleCustomSpy = jest.spyOn(instance.castleJS, 'custom');
      const mockEventData = {
        ...analyticsTrackData[EventTypes.ORDER_COMPLETED],
        properties: {
          foo: 'bar',
          biz: 'baz',
        },
      };

      await instance.track(mockEventData);

      expect(castleCustomSpy).not.toHaveBeenCalled();
    });
  });

  describe('Handle user`s createdDate various date formats', () => {
    it('Should handle values that are in the format `/Date(number)/`', async () => {
      instance = createInstance();

      const dateMilliseconds = 1651759914308;
      const castleFormSpy = jest.spyOn(instance.castleJS, 'form');
      const mockedEvent = analyticsTrackData[EventTypes.SIGNUP_FORM_COMPLETED];
      const mockEventData = {
        ...mockedEvent,
        user: {
          ...mockedEvent.user,
          traits: {
            ...mockedEvent.user.traits,
            createdDate: `/Date(${dateMilliseconds})/`, // Date format that is not an ISO string
          },
        },
      };

      const expectedCallPayload = {
        user: expect.objectContaining({
          registered_at: new Date(dateMilliseconds).toISOString(),
        }),
        name: mockEventData.event,
        values: mockEventData.properties,
      };

      await instance.track(mockEventData as TrackEventData);

      expect(castleFormSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Form track success. Payload:`,
        expectedCallPayload,
      );
    });

    it('Should handle values that are not valid dates', async () => {
      instance = createInstance();

      const castleFormSpy = jest.spyOn(instance.castleJS, 'form');
      const mockedEvent = analyticsTrackData[EventTypes.SIGNUP_FORM_COMPLETED];
      const mockEventData = {
        ...mockedEvent,
        user: {
          ...mockedEvent.user,
          traits: {
            ...mockedEvent.user.traits,
            createdDate: 'gibberish', // Invalid date value
          },
        },
      };

      const expectedCallPayload = {
        user: expect.not.objectContaining({
          createdDate: 'gibberish', // Invalid date value
        }),
        name: mockEventData.event,
        values: mockEventData.properties,
      };

      await instance.track(mockEventData as TrackEventData);

      expect(castleFormSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Form track success. Payload:`,
        expectedCallPayload,
      );

      jest.clearAllMocks();

      // @ts-ignore
      mockedEvent.user.traits.createdDate = null; // No createdDate value

      expectedCallPayload.user = expect.not.objectContaining({
        registered_at: null,
      });

      await instance.track(mockedEvent as TrackEventData);

      expect(castleFormSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Form track success. Payload:`,
        expectedCallPayload,
      );
    });
  });
});
