import { DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT } from '../constants';
import {
  EventData,
  eventTypes,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { trackEventsData } from 'tests/__fixtures__/analytics';
import eventsMapper from '../eventsMapper';
import loadIntegrationDataFixtures from 'tests/__fixtures__/analytics/loadIntegration';
import ZarazIntegration, {
  OPTION_ENVIRONMENT,
  OPTION_EVENTS_MAPPER,
  OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT,
} from '..';
import type { ZarazEventData, ZarazIntegrationOptions } from '../types/types';

const analyticsTrackDataMock =
  trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

const strippedDownAnalytics = {
  createEvent: (type: TrackTypesValues) =>
    Promise.resolve({ ...analyticsTrackDataMock, type }),
};

const loggerErrorSpy = jest
  .spyOn(utils.logger, 'error')
  .mockImplementation(message => message);

const originalWindow = window;

beforeEach(() => {
  // @ts-expect-error
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
  // @ts-expect-error
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

function createZarazInstance(options: ZarazIntegrationOptions) {
  return new ZarazIntegration(
    options,
    loadIntegrationDataFixtures,
    strippedDownAnalytics,
  );
}

describe('Zaraz integration', () => {
  it('"createInstance" should return an instance of itself', () => {
    // @ts-expect-error
    expect(ZarazIntegration.createInstance({})).toBeInstanceOf(
      ZarazIntegration,
    );
  });

  it('"shouldLoad" should only return true if marketing consent is given', () => {
    // @ts-expect-error
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
      // @ts-expect-error
      window.zaraz = {
        ecommerce: jest.fn(),
      };

      // Mock window.fetch to not reset the window.zaraz value so we can inspect it
      (window.fetch as ReturnType<typeof jest.fn>).mockImplementation(() =>
        Promise.resolve({
          text: () =>
            Promise.resolve(
              "window.addEventListener('DOMContentLoaded', () => {}, { once: true });",
            ),
        }),
      );

      const instance = createZarazInstance({});

      const zarazEcommerceSpy = window.zaraz.ecommerce as ReturnType<
        typeof jest.fn
      >;

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
        // @ts-expect-error
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
        // @ts-expect-error
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

  describe('default events mapper', () => {
    it.each(
      Object.keys(eventsMapper).filter(
        eventType => eventType in trackEventsData,
      ),
    )('should map the %s event correctly', async eventType => {
      const instance = createZarazInstance({});

      await instance.initializePromise;

      const zarazEcommerceSpy = jest.spyOn(zaraz, 'ecommerce');

      await instance.track(
        trackEventsData[eventType as keyof typeof trackEventsData],
      );

      expect(zarazEcommerceSpy.mock.calls).toMatchSnapshot();
    });

    it('should not log an error if an event is tracked and there is not a mapper for it', async () => {
      const instance = createZarazInstance({});

      await instance.initializePromise;

      const zarazEcommerceSpy = jest.spyOn(window.zaraz, 'ecommerce');
      const zarazTrackSpy = jest.spyOn(window.zaraz, 'track');

      await instance.track(trackEventsData[eventTypes.SELECT_CONTENT]);

      expect(zarazTrackSpy).not.toHaveBeenCalled();
      expect(zarazEcommerceSpy).not.toHaveBeenCalled();

      expect(loggerErrorSpy).not.toHaveBeenCalled();
    });
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
          [eventTypes.PRODUCT_ADDED_TO_CART]: (
            data: EventData<TrackTypesValues>,
          ) => ['ecommerce', data.properties as unknown as ZarazEventData[1]],
        },
      });

      await instance.initializePromise;

      const zarazSpy = jest.spyOn(window.zaraz, 'ecommerce');

      await instance.track(analyticsTrackDataMock);

      expect(zarazSpy).toHaveBeenCalledWith(analyticsTrackDataMock.properties);
    });

    it('should log an error and discard an event that has an invalid mapper', async () => {
      let instance = createZarazInstance({
        [OPTION_EVENTS_MAPPER]: {
          // @ts-expect-error
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
          // @ts-expect-error
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
