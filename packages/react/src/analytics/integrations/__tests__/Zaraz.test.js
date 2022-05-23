import { DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT } from '../Zaraz/constants';
import { eventTypes, utils } from '@farfetch/blackout-core/analytics';
import { validTrackEvents } from '../__fixtures__/gaData.fixtures';
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

beforeEach(() => {
  window.__BUILD_CONTEXT__ = {
    env: {
      NODE_ENV: 'production',
    },
  };

  // Set window to a new instance where we can set the location property
  // to what we want.
  global.window = Object.create(window);

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
        });`,
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
  it('"createInstance" should return an instance of itself', () => {
    expect(ZarazIntegration.createInstance({})).toBeInstanceOf(
      ZarazIntegration,
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
      const integration = createZarazInstance({});

      await integration.initializePromise;

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

      const integration = createZarazInstance({});

      try {
        await integration.initializePromise;
      } catch {
        // Discard error...
      }

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        '[Zaraz] - An error occurred when trying to initialize Zaraz: ',
        errorInstance,
      );

      jest.clearAllMocks();

      await integration.track(analyticsTrackDataMock);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        "[Zaraz] - An error occurred when trying to track event 'Product Added to Cart' with Zaraz: ",
        errorInstance,
      );
    });

    // TODO: Add a test validating that zaraz.(track|ecommerce) is not called before the initialize promise
    //       is resolved when we have events implemented on the integration.

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

        const integration = createZarazInstance({});

        await integration.initializePromise;

        jest.clearAllMocks();

        window.zaraz.ecommerce();

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://localhost:3000/cdn-cgi/zaraz/t',
          undefined,
        );

        jest.clearAllMocks();

        window.zaraz.ecommerce = () =>
          fetch(
            'https://preview-whitelabel.blackandwhite-ff.com/cdn-cgi/zaraz/t',
          );

        window.zaraz.ecommerce();

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://localhost:3000/cdn-cgi/zaraz/t',
          undefined,
        );

        jest.clearAllMocks();

        window.zaraz.ecommerce = () =>
          fetch(
            'https://preview-whitelabel.blackandwhite-ff.com/another/resource',
          );

        window.zaraz.ecommerce();

        expect(fetchSpy).toHaveBeenCalledWith(
          'https://preview-whitelabel.blackandwhite-ff.com/another/resource',
          undefined,
        );
      });
    });
  });

  describe('options', () => {
    it('should allow to specify the endpoint for the zaraz initialization script', async () => {
      const customZarazEndpoint = '/my/endpoint/i.js';

      const integration = createZarazInstance({
        [OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT]: customZarazEndpoint,
      });

      await integration.initializePromise;

      expect(window.fetch).toHaveBeenCalledWith(customZarazEndpoint);

      expect(window.zaraz).toBeDefined();
    });

    it('should allow to specify the environment', async () => {
      const integration = createZarazInstance({
        [OPTION_ENVIRONMENT]: 'development',
      });

      await integration.initializePromise;

      expect(integration.isDevelopment()).toBe(true);
    });

    describe(`${OPTION_EVENTS_MAPPER} option`, () => {
      it('should allow to specify custom mappers for events', async () => {
        const integration = createZarazInstance({
          [OPTION_EVENTS_MAPPER]: {
            [eventTypes.PRODUCT_ADDED_TO_CART]: data => [
              'ecommerce',
              data.properties,
            ],
          },
        });

        await integration.initializePromise;

        const zarazSpy = jest.spyOn(window.zaraz, 'ecommerce');

        await integration.track(analyticsTrackDataMock);

        expect(zarazSpy).toHaveBeenCalledWith(
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
      });
    });
  });
});
