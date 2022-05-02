import {
  DATA_TEST_SELECTOR,
  ENVIRONMENT_TYPES,
  ERROR_MESSAGE_PREFIX,
  GET_EVENTS_MAPPER_FN,
  INVALID_CUSTOM_MAPPER_ERROR_MESSAGE,
  INVALID_MAPPER_RETURN_TYPE_ERROR,
  MARKETING_API_PREFIX,
  MISSING_CONTEXT_ERROR_MESSAGE,
  PROD_SCRIPT_SRC,
  VITORINO_CALL_ERROR_MESSAGE,
} from '../constants';
import {
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  pageTypes,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { getCustomerIdFromUser } from '@farfetch/blackout-analytics/integrations/Omnitracking/omnitracking-helper';
import {
  loadIntegrationData,
  onSetUserEventData as mockUserAndTrackData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';
import { POST_TRACKINGS_PATHNAME } from '@farfetch/blackout-client/omnitracking';
import Vitorino from '../Vitorino';
import type { TrackWebEventData } from '../../../types/analytics.types';

utils.logger.error = jest.fn();
utils.logger.info = jest.fn();

const defaultOptions = {};
const customVitorinoPageType = 'pageType do vitó';

const mockCustomEventsMapper = () => ({
  [eventTypes.CHECKOUT_STEP_VIEWED]: customVitorinoPageType,
});
const analyticsTrackDataMock =
  trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];
const strippedDownAnalytics = {
  createEvent: (type: TrackTypesValues) =>
    Promise.resolve({ ...analyticsTrackDataMock, type }),
};

const generateMockVitorinoPayload = () => ({
  correlationId: mockUserAndTrackData.user.localId,
  tenantId: mockUserAndTrackData.context.tenantId,
  clientId: mockUserAndTrackData.context.clientId,
  origin: mockUserAndTrackData.context.web.window.location.origin,
  customerId: getCustomerIdFromUser(mockUserAndTrackData.user),
  environment: window.Vitorino.Environment.SANDBOX,
  fields: { sensitiveFields: [], secretFields: [] },
  network: {
    proxy: mockUserAndTrackData.context.web.window.location.origin,
    path: `${MARKETING_API_PREFIX}${POST_TRACKINGS_PATHNAME}`,
  },
});

const mockVitorinoTrackCallback = jest.fn(data => {
  window.Vitorino.track(data);
});
const getIntegrationInstance = async (
  options = defaultOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
) => {
  const instance = new Vitorino(options, loadData, strippedDownAnalytics);

  instance.scriptOnload();

  if (instance.userIdPromiseResolve) {
    instance.userIdPromiseResolve();
  }

  window.Vitorino = {
    Environment: {
      SANDBOX: 'sandbox',
      PRODUCTION: 'production',
    },
    PageTypes: {
      CHECKOUT: 'CHECKOUT',
      LOGIN: 'LOGIN',
      REGISTER: 'REGISTER',
      SHIPPING: 'SHIPPING',
    },
    track: jest.fn(() => mockVitorinoTrackCallback),
  };

  // config Vitorino
  // @ts-ignore - No need to match the types here
  await instance.onSetUser(loadData);

  return instance;
};

const getScriptTagFromDOM = (): HTMLScriptElement | null =>
  document.querySelector(`[data-test="${DATA_TEST_SELECTOR}"]`);

describe('Vitorino', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });
  describe('Vitorino integration', () => {
    it('Should extend the core integration class', () => {
      expect(Vitorino.prototype).toBeInstanceOf(integrations.Integration);
    });

    it('Should be an integration that loads independently of user consent', () => {
      expect(Vitorino.shouldLoad()).toBe(true);
      // @ts-expect-error
      expect(Vitorino.shouldLoad({ marketing: true })).toBe(true);
    });
  });

  describe('Vitorino instance', () => {
    describe('Mapper', () => {
      it('Should allow to pass a mapper for the events', async () => {
        const instance = await getIntegrationInstance({
          eventsMapper: mockCustomEventsMapper,
        });

        expect(instance.getEventsMapper).toEqual(mockCustomEventsMapper);
      });
      it('Should log an error if passed an invalid mapper', async () => {
        await getIntegrationInstance({
          eventsMapper: 'this is a no no for vitó',
        });

        expect(utils.logger.error).toHaveBeenCalledWith(
          INVALID_CUSTOM_MAPPER_ERROR_MESSAGE,
        );

        expect(mockVitorinoTrackCallback).not.toHaveBeenCalled();
      });

      it('Should log an error if the custom mapper returns an invalid type or null', async () => {
        let instance = await getIntegrationInstance({
          eventsMapper: () => 'this is a no no for vitó as well',
        });

        await instance.track(analyticsTrackDataMock as TrackWebEventData);

        expect(utils.logger.error).toHaveBeenCalledWith(
          `${VITORINO_CALL_ERROR_MESSAGE} Error: ${INVALID_MAPPER_RETURN_TYPE_ERROR}`,
        );

        expect(mockVitorinoTrackCallback).not.toHaveBeenCalled();

        jest.clearAllMocks();

        instance = await getIntegrationInstance({
          eventsMapper: () => null,
        });

        await instance.track(analyticsTrackDataMock as TrackWebEventData);

        expect(utils.logger.error).toHaveBeenCalledWith(
          `${VITORINO_CALL_ERROR_MESSAGE} Error: ${INVALID_MAPPER_RETURN_TYPE_ERROR}`,
        );

        expect(mockVitorinoTrackCallback).not.toHaveBeenCalled();
      });
    });

    describe('Fields option', () => {
      it('Should allow to pass an object with the sensitive and secretFields per event', async () => {
        const sensitiveFields = ['foo', 'bar'];
        const secretFields = ['biz', 'buz'];

        await getIntegrationInstance({
          sensitiveFields,
          secretFields,
        });

        expect(window.Vitorino.track).toHaveBeenCalledWith({
          ...generateMockVitorinoPayload(),
          fields: {
            sensitiveFields,
            secretFields,
          },
        });
      });
    });

    describe('Debugger option', () => {
      it('Should allow to pass a flag to active the debugger when tracking events', async () => {
        const instance = await getIntegrationInstance({
          debugger: true,
        });

        await instance.track({
          ...analyticsTrackDataMock,
          event: eventTypes.CHECKOUT_STEP_VIEWED,
        } as TrackWebEventData);

        expect(utils.logger.info).toHaveBeenCalledWith('Vitorino track: ', {
          config: generateMockVitorinoPayload(),
          vitorinoPageType:
            GET_EVENTS_MAPPER_FN()[eventTypes.CHECKOUT_STEP_VIEWED],
        });
      });
    });

    describe('Network option', () => {
      it('Should allow to pass a "network" object to pass a custom proxy to Vitorino', async () => {
        const customNetworkProxy = {
          proxy: 'https://johndoe.com',
          path: '/api',
        };
        await getIntegrationInstance({
          network: customNetworkProxy,
        });

        expect(window.Vitorino.track).toHaveBeenCalledWith({
          ...generateMockVitorinoPayload(),
          network: customNetworkProxy,
        });
      });
    });

    describe('Script', () => {
      it('Should log an error if the development script is not present if the environment is dev', async () => {
        try {
          await getIntegrationInstance({
            environment: ENVIRONMENT_TYPES.dev,
          });
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [Error: Vitorino:  Looks like you're running Vitorino integration on a
                       development environment without passing in the "developmentScriptSrc", so it will not load.
                       Please make sure a valid script source is passed via the integration options.]
          `);
        }

        const scriptTag = getScriptTagFromDOM();

        expect(scriptTag).toBeNull();
      });

      it('Should load the script according to the environment', async () => {
        await getIntegrationInstance({
          environment: ENVIRONMENT_TYPES.prod,
        });

        let scriptTag = getScriptTagFromDOM();

        expect(scriptTag?.src).toEqual(PROD_SCRIPT_SRC);

        // clean the body
        document.body.innerHTML = '';

        // test the dev script with the implicit environment option without relying on the default behavior
        const devScriptSource = 'https://google.com/';

        await getIntegrationInstance({
          environment: ENVIRONMENT_TYPES.dev,
          devScriptSource,
        });

        scriptTag = getScriptTagFromDOM();

        expect(scriptTag?.src).toEqual(devScriptSource);
      });
    });

    describe('Vitorino config', () => {
      it('Should properly config vitorino and store the callback function', async () => {
        const instance = await getIntegrationInstance();

        expect(window.Vitorino.track).toHaveBeenCalledWith(
          generateMockVitorinoPayload(),
        );

        expect(instance.vitorinoTrackCallback).toBe(mockVitorinoTrackCallback);
      });
    });

    describe('Track page views', () => {
      it('Should track a mapped page view for an event', async () => {
        const instance = await getIntegrationInstance();
        const mockEvent = eventTypes.CHECKOUT_STEP_VIEWED;

        await instance.track({
          ...analyticsTrackDataMock,
          event: mockEvent,
        } as TrackWebEventData);

        expect(instance.vitorinoTrackCallback).toHaveBeenCalledWith(
          GET_EVENTS_MAPPER_FN()[mockEvent],
        );
      });

      it('Should track a valid event that maps more than one Vitorino page type', async () => {
        const instance = await getIntegrationInstance();
        const mockEvent = pageTypes.LOGIN_REGISTER;

        await instance.track({
          ...analyticsTrackDataMock,
          event: mockEvent,
        } as TrackWebEventData);

        const pageTypesList = GET_EVENTS_MAPPER_FN()[mockEvent];

        expect(mockVitorinoTrackCallback).toHaveBeenCalledTimes(2);

        expect(mockVitorinoTrackCallback).toHaveBeenCalledWith(
          pageTypesList?.[0],
        );

        expect(mockVitorinoTrackCallback).toHaveBeenCalledWith(
          pageTypesList?.[1],
        );
      });

      it('Should track a valid event that is NOT mapped on the mapper without the Vitorino page type', async () => {
        const instance = await getIntegrationInstance();
        const mockEvent = eventTypes.PRODUCT_REMOVED_FROM_WISHLIST;

        await instance.track({
          ...analyticsTrackDataMock,
          event: mockEvent,
        } as TrackWebEventData);

        expect(mockVitorinoTrackCallback).toHaveBeenCalledWith(undefined);
      });

      it('Should track a valid event that maps an empty array on the mapper', async () => {
        const mockEvent = eventTypes.PRODUCT_REMOVED_FROM_WISHLIST;
        const instance = await getIntegrationInstance({
          eventsMapper: () => ({
            [mockEvent]: [],
          }),
        });

        await instance.track({
          ...analyticsTrackDataMock,
          event: mockEvent,
        } as TrackWebEventData);

        expect(mockVitorinoTrackCallback).toHaveBeenCalledWith(undefined);
      });

      it('Should not track an event if there is no tenantId and/or clientId', async () => {
        const instance = await getIntegrationInstance(defaultOptions, {
          ...loadIntegrationData,
          // @ts-expect-error
          context: {
            tenantId: undefined,
            clientId: undefined,
          },
        });

        await instance.track(analyticsTrackDataMock as TrackWebEventData);

        expect(utils.logger.error).toHaveBeenCalledWith(
          `${ERROR_MESSAGE_PREFIX} There was an error when trying to config Vitorino: Error: ${MISSING_CONTEXT_ERROR_MESSAGE}`,
        );

        expect(window.Vitorino.track).not.toHaveBeenCalled();
        expect(mockVitorinoTrackCallback).not.toHaveBeenCalled();
      });
    });
  });
});
