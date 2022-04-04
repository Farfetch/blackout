import {
  eventTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import analyticsPageDataMock from '../__fixtures__/analyticsPageData.fixtures.json';
import analyticsTrackDataMock from '../__fixtures__/analyticsTrackData.fixtures';
import Castle, { CASTLE_MESSAGE_PREFIX } from '../Castle/CastleV2';

const mockRequestHeaderValue = '12342342345241342423424';
const publishableKey = 'pk_mock_111111111111111111111111111';
const mockOptions = {
  pk: publishableKey,
  debugModeOn: true,
  window: window,
  avoidCookies: false,
  cookieDomain: 'foo',
  timeout: 1000,
};
const createInstance = (options = mockOptions, loadData) => {
  const castleInstance = Castle.createInstance(options, loadData);

  return castleInstance;
};

jest.mock('@castleio/castle-js', () => {
  return {
    ...jest.requireActual('@castleio/castle-js'),
    createRequestToken: async () => Promise.resolve(mockRequestHeaderValue),
  };
});

// mock this function to avoid installing `jest-canvas-mock` - CastleV2 needs it.
HTMLCanvasElement.prototype.getContext = jest.fn();
utils.logger.info = jest.fn();

describe('Castle integration', () => {
  let instance;

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
      expect(() => Castle.createInstance({ pk: null })).toThrowError();
    });

    it('Should throw an error if an invalid `configureHttpClient` is passed', () => {
      expect(() =>
        Castle.createInstance({ ...mockOptions, configureHttpClient: 'foo' }),
      ).toThrowError();
    });

    it('Should throw an error if an invalid `clientIdHeaderName` is passed`', () => {
      expect(() =>
        Castle.createInstance({ ...mockOptions, clientIdHeaderName: 123 }),
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

      expect(castleSDKSpy).toHaveBeenCalledWith({
        pk: mockOptions.pk,
        avoidCookies: mockOptions.avoidCookies,
        window: mockOptions.window,
        cookieDomain: mockOptions.cookieDomain,
        timeout: mockOptions.timeout,
      });
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

      expect(() => instance.applyOptions(mockOptions)).toThrowError(
        'Castle 2.x - Failed to initialize Castle. Error: TypeError: Invalid option `foo`.',
      );
    });
  });

  describe('Tracking', () => {
    it('Should track page views', async () => {
      instance = createInstance();

      const castlePageSpy = jest.spyOn(instance.castleJS, 'page');
      const expectedCallPayload = {
        page: {
          referrer: analyticsPageDataMock.context.web.document.referrer,
          title: analyticsPageDataMock.context.web.document.title,
          url: analyticsPageDataMock.context.web.window.location.href,
        },
        user: instance.getUserData(analyticsPageDataMock),
      };

      await instance.track(analyticsPageDataMock);

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
      const mockEventData = {
        event,
        ...analyticsTrackDataMock,
        properties: {
          foo: 'bar',
          biz: 'baz',
        },
      };
      const expectedCallPayload = {
        user: instance.getUserData(analyticsTrackDataMock),
        name: mockEventData.event,
        values: mockEventData.properties,
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
      const mockEventData = {
        event: eventTypes.ORDER_COMPLETED,
        ...analyticsTrackDataMock,
        properties: {
          foo: 'bar',
          biz: 'baz',
        },
      };
      const expectedCallPayload = {
        user: instance.getUserData(analyticsTrackDataMock),
        name: mockEventData.event,
        properties: mockEventData.properties,
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
