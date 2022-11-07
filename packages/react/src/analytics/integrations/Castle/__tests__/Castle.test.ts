import {
  pageEventsData as analyticsPageData,
  trackEventsData as analyticsTrackData,
  loadIntegrationData,
} from 'tests/__fixtures__/analytics';
import {
  EventData,
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  pageTypes,
  PageviewEventData,
  StrippedDownAnalytics,
  TrackEventData,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import Castle, { CASTLE_MESSAGE_PREFIX } from '../Castle';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import type { CastleIntegrationOptions } from '../types';
import type { WebContextType } from '../../../context';

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
    ...jest.requireActual('@castleio/castle-js'),
    createRequestToken: async () => Promise.resolve(mockRequestHeaderValue),
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
      ).toThrowError();
    });

    it('Should throw an error if an invalid `configureHttpClient` is passed', () => {
      expect(() =>
        // @ts-expect-error - We want to test this specific case
        createInstance({ ...mockOptions, configureHttpClient: 'foo' }),
      ).toThrowError();
    });

    it('Should throw an error if an invalid `clientIdHeaderName` is passed`', () => {
      expect(() =>
        // @ts-expect-error - We want to test this specific case
        createInstance({ ...mockOptions, clientIdHeaderName: 123 }),
      ).toThrowError();
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

      instance = await createInstance({
        ...mockOptions,
        configureHttpClient: mockConfigureClient,
      });

      expect(mockConfigureClient).toHaveBeenCalledWith(
        instance.castleJS.createRequestToken,
      );

      expect(instance.isInterceptorAttached).toBe(true);
    });

    it('Should install the default interceptors on our client', async () => {
      instance = createInstance();

      expect(instance.httpClientInterceptor).toBeDefined();

      const config = await instance.onBeforeRequestFullfil({ headers: {} });

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

      expect(() => instance?.applyOptions(mockOptions)).toThrowError(
        'Castle 2.x - Failed to initialize Castle. Error: TypeError: Invalid option `foo`.',
      );
    });
  });

  describe('Tracking', () => {
    it('Should track page views', async () => {
      instance = createInstance();

      const castlePageSpy = jest.spyOn(instance.castleJS, 'page');
      const mockPageEvent = analyticsPageData[
        pageTypes.HOMEPAGE
      ] as EventData<TrackTypesValues> & { context: WebContextType };
      const expectedCallPayload = {
        referrer: mockPageEvent.context.web.document.referrer,
        name: mockPageEvent.context.web.document.title,
        url: mockPageEvent.context.web.window.location.href,
        user: instance.getUserData(mockPageEvent as PageviewEventData),
      };

      await instance.track(mockPageEvent);

      expect(castlePageSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Page track success. Payload:`,
        expectedCallPayload,
      );
    });

    it.each([
      eventTypes.ADDRESS_INFO_ADDED,
      eventTypes.CHECKOUT_STEP_COMPLETED,
      eventTypes.LOGIN,
      eventTypes.PAYMENT_INFO_ADDED,
      eventTypes.PROMOCODE_APPLIED,
      eventTypes.SHIPPING_INFO_ADDED,
      eventTypes.SHIPPING_METHOD_ADDED,
      eventTypes.SIGNUP_FORM_COMPLETED,
      eventTypes.SIGNUP_NEWSLETTER,
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
        ...analyticsTrackData[eventTypes.ORDER_COMPLETED],
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
      const mockedEvent = analyticsTrackData[eventTypes.SIGNUP_FORM_COMPLETED];
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
      const mockedEvent = analyticsTrackData[eventTypes.SIGNUP_FORM_COMPLETED];
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
