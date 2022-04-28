import {
  pageEventsData as analyticsPageData,
  trackEventsData as analyticsTrackData,
  loadIntegrationData,
} from 'tests/__fixtures__/analytics';
import {
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  pageTypes,
  StrippedDownAnalytics,
  utils,
} from '@farfetch/blackout-analytics';
import Castle, { CASTLE_MESSAGE_PREFIX } from '../Castle';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import type { CastleIntegrationOptions } from '../types';
import type { TrackWebEventData } from '../../../types/analytics.types';

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
      ] as TrackWebEventData;
      const expectedCallPayload = {
        referrer: mockPageEvent.context.web.document.referrer,
        name: mockPageEvent.context.web.document.title,
        url: mockPageEvent.context.web.window.location.href,
        user: instance.getUserData(mockPageEvent),
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
      const mockEventData = analyticsTrackData[event] as TrackWebEventData;
      const expectedCallPayload = {
        user: instance.getUserData(mockEventData),
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

    it('Should track other (custom) events', async () => {
      instance = createInstance();

      const castleCustomSpy = jest.spyOn(instance.castleJS, 'custom');
      const mockEventData = analyticsTrackData[
        eventTypes.ORDER_COMPLETED
      ] as TrackWebEventData;
      const expectedCallPayload = {
        user: instance.getUserData(mockEventData),
        name: mockEventData.event,
        properties: pickBy(mockEventData.properties, isString),
      };

      await instance.track(mockEventData);

      expect(castleCustomSpy).toHaveBeenCalledWith(expectedCallPayload);

      expect(utils.logger.info).toHaveBeenCalledWith(
        `${CASTLE_MESSAGE_PREFIX} Custom event track success. Payload:`,
        expectedCallPayload,
      );
    });
  });
});
