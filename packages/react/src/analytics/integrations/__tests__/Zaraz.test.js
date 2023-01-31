import {
  DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT,
  ZARAZ_ECOMMERCE_EVENTS,
} from '../Zaraz/constants';
import { eventTypes, utils } from '@farfetch/blackout-core/analytics';
import { validTrackEvents } from '../__fixtures__/gaData.fixtures';
import eventsMapper from '../Zaraz/eventsMapper';
import ZarazIntegration, {
  OPTION_ENVIRONMENT,
  OPTION_EVENTS_MAPPER,
  OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT,
} from '../Zaraz';

const analyticsTrackDataMock =
  validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART];

const loggerErrorSpy = jest
  .spyOn(utils.logger, 'error')
  .mockImplementation(message => message);

const originalWindow = window;
const consoleWarnSpy = jest.spyOn(console, 'warn');

beforeEach(() => {
  window.zaraz = null;

  window.__BUILD_CONTEXT__ = {
    env: {
      NODE_ENV: 'production',
    },
  };

  // Set window to a new instance where we can set the location property
  // to what we want.
  global.window = Object.create(originalWindow);

  Object.defineProperty(window, 'location', {
    get: jest.fn(() => {
      return {
        host: 'preview-whitelabel.blackandwhite-ff.com',
        hostname: 'preview-whitelabel.blackandwhite-ff.com',
        href: 'https://preview-whitelabel.blackandwhite-ff.com',
      };
    }),
  });

  // Mock window.fetch to return a simplified mock of the zaraz's initialization script
  // which will only load zaraz if the 'DOMContentLoaded' event is dispatched.
  window.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        Promise.resolve(
          `window.addEventListener('DOMContentLoaded', () => {
            window.zaraz = { track: () => {}, ecommerce: () => {} };
        }, { once: true });`,
        ),
    }),
  );

  // Reset document
  document.documentElement.innerHTML = '';

  jest.clearAllMocks();
});

function createZarazInstance(options) {
  return new ZarazIntegration(options);
}

describe('Zaraz integration', () => {
  it('"createInstance" should return an instance of itself and print deprecation warning', () => {
    expect(ZarazIntegration.createInstance({})).toBeInstanceOf(
      ZarazIntegration,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '@farfetch/blackout-react: DEPRECATED integration Zaraz. This integration will be removed in the next major release.',
    );
  });

  it('"shouldLoad" should only return true if marketing consent is given', () => {
    expect(ZarazIntegration.shouldLoad()).toBe(false);
    expect(ZarazIntegration.shouldLoad({})).toBe(false);
    expect(ZarazIntegration.shouldLoad({ marketing: false })).toBe(false);
    expect(ZarazIntegration.shouldLoad({ marketing: true })).toBe(true);
  });

  describe('initialization', () => {
    it('should load the zaraz integration by using the default endpoint for the zaraz initialization script', async () => {
      const instance = createZarazInstance({});

      await instance.initializePromise;

      expect(window.fetch).toHaveBeenCalledWith(
        DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT,
      );

      expect(window.zaraz).toBeDefined();
    });

    it('should log an error if there is an error trying to load zaraz script', async () => {
      const fetchSpy = jest.spyOn(window, 'fetch');
      const errorInstance = new Error('dummy error');

      fetchSpy.mockImplementation(() => {
        return Promise.reject(errorInstance);
      });

      const loggerErrorSpy = jest.spyOn(utils.logger, 'error');

      loggerErrorSpy.mockImplementation(message => message);

      const instance = createZarazInstance({});

      try {
        await instance.initializePromise;
      } catch {
        // Discard error...
      }

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        '[Zaraz] - An error occurred when trying to initialize Zaraz: ',
        errorInstance,
      );

      jest.clearAllMocks();

      await instance.track(analyticsTrackDataMock);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        "[Zaraz] - An error occurred when trying to track event 'Product Added to Cart' with Zaraz: ",
        errorInstance,
      );
    });

    it('should not invoke a zaraz method while the initialization promise is not resolved', async () => {
      // Create a dummy zaraz in window to be used as a target of our expects.
      window.zaraz = {
        ecommerce: jest.fn(),
      };

      // Mock window.fetch to not reset the window.zaraz value so we can inspect it
      window.fetch.mockImplementation(() =>
        Promise.resolve({
          text: () =>
            Promise.resolve(
              "window.addEventListener('DOMContentLoaded', () => {}, { once: true });",
            ),
        }),
      );

      const instance = createZarazInstance({});
      const zarazEcommerceSpy = window.zaraz.ecommerce;

      // Invoke track method for a default supported event.
      instance.track(analyticsTrackDataMock);

      // No invocations to zaraz.ecommerce should be made because the track
      // method is still awaiting the initialize promise.
      expect(zarazEcommerceSpy).not.toHaveBeenCalled();

      // Await the initialize promise so the track call can proceed and invoke zaraz.ecommerce.
      await instance.initializePromise;

      expect(zarazEcommerceSpy).toHaveBeenCalled();
    });

    describe('when testing in development', () => {
      it('should change zaraz requests that are not for the host which the application is running', async () => {
        jest.spyOn(window, 'location', 'get').mockImplementation(() => {
          return {
            host: 'localhost:3000',
            hostname: 'localhost',
            href: 'https://localhost:3000',
          };
        });

        const fetchSpy = jest.spyOn(window, 'fetch');

        // mock the fetch call to load the zaraz initialization script to return
        // a zaraz mock whose ecommerce method will call another domain instead of localhost,
        // which is just like the default behaviour of the real zaraz script.
        fetchSpy.mockImplementation(() => {
          return Promise.resolve({
            text: () =>
              Promise.resolve(
                `window.addEventListener('DOMContentLoaded', () => {
                          window.zaraz = { track: () => {}, ecommerce: (data) => { fetch('https://preview-whitelabel.blackandwhite-ff.com/cdn-cgi/zaraz/t'); } };
                      });`,
              ),
          });
        });

        // Force development environment
        window.__BUILD_CONTEXT__ = {
          env: {
            NODE_ENV: 'development',
          },
        };

        const instance = createZarazInstance({});

        await instance.initializePromise;

        jest.clearAllMocks();

        window.zaraz.ecommerce(ZARAZ_ECOMMERCE_EVENTS.CART_VIEWED);

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://localhost:3000/cdn-cgi/zaraz/t',
          undefined,
        );

        jest.clearAllMocks();

        window.zaraz.ecommerce = () =>
          fetch(
            'https://preview-whitelabel.blackandwhite-ff.com/cdn-cgi/zaraz/t',
          );

        window.zaraz.ecommerce(ZARAZ_ECOMMERCE_EVENTS.CART_VIEWED);

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://localhost:3000/cdn-cgi/zaraz/t',
          undefined,
        );

        jest.clearAllMocks();

        window.zaraz.ecommerce = () =>
          fetch(
            'https://preview-whitelabel.blackandwhite-ff.com/another/resource',
          );

        window.zaraz.ecommerce(ZARAZ_ECOMMERCE_EVENTS.CART_VIEWED);

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://preview-whitelabel.blackandwhite-ff.com/another/resource',
          undefined,
        );
      });
    });
  });

  describe('default events mapper', () => {
    it.each(
      Object.keys(eventsMapper).filter(
        eventType => eventType in validTrackEvents,
      ),
    )('should map the %s event correctly', async eventType => {
      const instance = createZarazInstance({});

      await instance.initializePromise;

      const zarazTrackSpy = jest.spyOn(window.zaraz, 'track');
      const zarazEcommerceSpy = jest.spyOn(window.zaraz, 'ecommerce');

      await instance.track(validTrackEvents[eventType]);

      if (zarazEcommerceSpy.mock.calls.length > 0) {
        expect(zarazEcommerceSpy.mock.calls).toMatchSnapshot();
      } else if (zarazTrackSpy.mock.calls.length > 0) {
        expect(zarazTrackSpy.mock.calls).toMatchSnapshot();
      }
    });

    it('should not log an error if an event is tracked and there is not a mapper for it', async () => {
      const instance = createZarazInstance({});

      await instance.initializePromise;

      const zarazEcommerceSpy = jest.spyOn(window.zaraz, 'ecommerce');
      const zarazTrackSpy = jest.spyOn(window.zaraz, 'track');

      await instance.track(validTrackEvents[eventTypes.SELECT_CONTENT]);

      expect(zarazTrackSpy).not.toHaveBeenCalled();
      expect(zarazEcommerceSpy).not.toHaveBeenCalled();

      expect(loggerErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('should allow to specify the endpoint for the zaraz initialization script', async () => {
      const customZarazEndpoint = '/my/endpoint/i.js';

      const instance = createZarazInstance({
        [OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT]: customZarazEndpoint,
      });

      await instance.initializePromise;

      expect(window.fetch).toHaveBeenCalledWith(customZarazEndpoint);

      expect(window.zaraz).toBeDefined();
    });

    it('should allow to specify the environment', async () => {
      const instance = createZarazInstance({
        [OPTION_ENVIRONMENT]: 'development',
      });

      await instance.initializePromise;

      expect(instance.isDevelopment()).toBe(true);
    });

    describe(`${OPTION_EVENTS_MAPPER} option`, () => {
      it('should allow to specify custom mappers for events', async () => {
        const instance = createZarazInstance({
          [OPTION_EVENTS_MAPPER]: {
            [eventTypes.PRODUCT_ADDED_TO_CART]: data => [
              'ecommerce',
              ZARAZ_ECOMMERCE_EVENTS.CART_VIEWED,
              data.properties,
            ],
          },
        });

        await instance.initializePromise;

        const zarazSpy = jest.spyOn(window.zaraz, 'ecommerce');

        await instance.track(analyticsTrackDataMock);

        expect(zarazSpy).toHaveBeenCalledWith(
          ZARAZ_ECOMMERCE_EVENTS.CART_VIEWED,
          analyticsTrackDataMock.properties,
        );
      });

      it('should log an error and discard an event that has an invalid mapper', async () => {
        let instance = createZarazInstance({
          [OPTION_EVENTS_MAPPER]: {
            [eventTypes.PRODUCT_ADDED_TO_CART]: 'invalid_value',
          },
        });

        await instance.initializePromise;

        await instance.track(analyticsTrackDataMock);

        expect(loggerErrorSpy)
          .toHaveBeenCalledWith(`[Zaraz] - Invalid mapper value configured for the event 'Product Added to Cart'. Value is: invalid_value.
          This event will be discarded.`);

        jest.clearAllMocks();

        instance = createZarazInstance({
          [OPTION_EVENTS_MAPPER]: {
            [eventTypes.PRODUCT_ADDED_TO_CART]: () => ['invalid_value', {}],
          },
        });

        await instance.track(analyticsTrackDataMock);

        expect(loggerErrorSpy)
          .toHaveBeenCalledWith(`[Zaraz] - Invalid value for the zaraz method returned from mapper for event 'Product Added to Cart': 'invalid_value' is not a function in window.zaraz.
          This event will be discarded.`);

        jest.clearAllMocks();

        instance = createZarazInstance({
          [OPTION_EVENTS_MAPPER]: {
            // @ts-expect-error Invalid event name (should be a string)
            [eventTypes.PRODUCT_ADDED_TO_CART]: () => ['ecommerce', 123, {}],
          },
        });

        await instance.track(analyticsTrackDataMock);

        expect(loggerErrorSpy)
          .toHaveBeenCalledWith(`[Zaraz] - Invalid value for the zaraz event name returned from mapper for event 'Product Added to Cart': '123' is not a string.
          This event will be discarded.`);
      });
    });
  });
});
