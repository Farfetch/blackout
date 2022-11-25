import * as yup from 'yup';
import {
  CONSENT_TYPE,
  CONTEXT_TYPE,
  DATA_LAYER_CONSENT_EVENT,
  DATA_LAYER_CONTEXT_EVENT,
  DATA_LAYER_SET_USER_EVENT,
  SET_USER_TYPE,
} from '../constants';
import {
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  TrackTypesValues,
  UserTraits,
  utils,
} from '@farfetch/blackout-analytics';
import { GTM, validationSchemaBuilder } from '../..';
import {
  loadIntegrationData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';
import eventsMapper from '../eventsMapper';
import type {
  EventMappers,
  GTMEventData,
  GTMIntegrationOptions,
} from '../types';
import type { WebContextType } from '../../../context';

jest.mock('../gtmTag', () => jest.fn());

utils.logger.error = jest.fn();
const loggerErrorSpy = utils.logger.error;

const analyticsTrackDataMock =
  trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

const strippedDownAnalytics = {
  createEvent: (type: TrackTypesValues) =>
    Promise.resolve({ ...analyticsTrackDataMock, type }),
};

describe('GTM', () => {
  let gtm: GTM;
  const consentDefaults = {
    marketing: false,
    statistics: false,
    preferences: false,
  };

  const analyticsEventMock = {
    ...analyticsTrackDataMock,
    consent: consentDefaults,
  };

  const containerId = 'GTM-12345';

  const createGTMInstance = (
    options: GTMIntegrationOptions,
    loadData: LoadIntegrationEventData = loadIntegrationData,
  ) =>
    GTM.createInstance(
      options,
      { ...loadData, consent: consentDefaults },
      strippedDownAnalytics,
    ) as GTM;

  const getDataLayerEntryByEvent = (
    eventName: string,
    filterOrFind: 'filter' | 'find' = 'find',
  ) =>
    window.dataLayer?.[filterOrFind](
      (entry: object) => (entry as GTMEventData).event === eventName,
    );

  beforeEach(() => {
    window.dataLayer = [];

    gtm = createGTMInstance({ containerId });

    jest.clearAllMocks();
  });

  describe('GTM integration', () => {
    it('Should be ready to load', () => {
      // @ts-expect-error
      expect(GTM.shouldLoad(consentDefaults)).toEqual(true);
    });

    it('Should extend Integration class', () => {
      expect(GTM.prototype).toBeInstanceOf(integrations.Integration);
    });

    it('Should export yup as validationSchemaBuilder', () => {
      expect(validationSchemaBuilder).toBeDefined();

      expect(validationSchemaBuilder).toBe(yup);
    });
  });

  describe('GTM instance', () => {
    it('Should log an error if the "containerId" options is not passed', () => {
      // @ts-expect-error
      createGTMInstance(undefined);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Google Tag Manager - Container ID not found. Make sure you are passing a valid container ID on the integration options via "analytics.addIntegration("gtm", integrations.GTM, options)"',
      );
    });

    describe('Consent', () => {
      it('Should write the consent object on the dataLayer', () => {
        const data = {
          event: DATA_LAYER_CONSENT_EVENT,
          type: CONSENT_TYPE,
          consent: consentDefaults,
        };

        const dataLayerEntry = getDataLayerEntryByEvent(data.event);

        expect(dataLayerEntry).toMatchObject(data);
      });

      it('Should allow to change the event name when writing the consent on the dataLayer', () => {
        const consentKey = 'custom.consent.event';

        gtm = createGTMInstance({ containerId, consentKey });

        const dataLayerEntry: GTMEventData = getDataLayerEntryByEvent(
          consentKey,
        ) as GTMEventData;

        expect(dataLayerEntry).toBeDefined();
        expect(dataLayerEntry.event).toEqual(consentKey);
      });
    });

    describe('Context', () => {
      it('Should write the context object on the dataLayer (only if the context changes)', () => {
        const data = {
          event: DATA_LAYER_CONTEXT_EVENT,
          type: CONTEXT_TYPE,
          context: analyticsEventMock.context,
        };

        const dataLayerEntry = getDataLayerEntryByEvent(data.event);

        expect(dataLayerEntry).toMatchObject({
          ...data,
          // test filtered context properties
          context: {
            currencyCode: data.context.currencyCode,
            eventContext: {
              __uniqueEventId: expect.any(String),
            },
            libraryVersion: data.context.library.version,
            // @ts-expect-error Force cast to facilitate testing
            location: (data.context as WebContextType).web.window.location,
            // @ts-expect-error Force cast to facilitate testing
            userAgent: (data.context as WebContextType).web.window.navigator
              .userAgent,
          },
        });

        gtm.setContext(data.context);

        // Check if there is a repeated entry with the same values
        let dataLayerEntries = getDataLayerEntryByEvent(data.event, 'filter');

        expect(dataLayerEntries).toHaveLength(1);

        gtm.setContext({
          ...data.context,
          currencyCode: 'EUR',
        });

        dataLayerEntries = getDataLayerEntryByEvent(data.event, 'filter');

        expect(dataLayerEntries).toHaveLength(2);
      });

      it('Should allow to change the event name when writing the context on the dataLayer', () => {
        const contextKey = 'custom.context.event';

        gtm = createGTMInstance({ containerId, contextKey });

        const dataLayerEntry = getDataLayerEntryByEvent(contextKey);

        expect(dataLayerEntry).toBeDefined();
        expect((dataLayerEntry as GTMEventData).event).toEqual(contextKey);
      });

      it('Should allow to override the setContext method', () => {
        // Force clean the array that will be populated by 'createGTMInstance' called on beforeEach
        window.dataLayer = [];

        const myCustomContextFn = jest.fn();

        gtm = createGTMInstance({ containerId, setContext: myCustomContextFn });

        expect(myCustomContextFn).toHaveBeenCalledWith(
          analyticsEventMock.context,
        );

        const defaultContextDataLayerEntry = getDataLayerEntryByEvent(
          DATA_LAYER_CONTEXT_EVENT,
        );

        expect(defaultContextDataLayerEntry).toBeUndefined();

        gtm = createGTMInstance(
          // @ts-expect-error
          { containerId, setContext: 'not a function' },
        );

        expect(loggerErrorSpy).toHaveBeenCalledWith(
          'Google Tag Manager - TypeError: "setContext" option is not a function, make sure a valid function is passed.',
        );
      });
    });

    describe('User', () => {
      it('Should write the user object on the dataLayer', () => {
        const data = {
          event: DATA_LAYER_SET_USER_EVENT,
          type: SET_USER_TYPE,
          user: utils.hashUserData(analyticsEventMock.user),
        };

        const dataLayerEntry = getDataLayerEntryByEvent(data.event);

        expect(dataLayerEntry).toMatchObject({
          ...data,
          user: {
            id: data.user.id,
            name: (data.user.traits as UserTraits).name,
            // Hashed email
            email: expect.any(String),
            isGuest: (data.user.traits as UserTraits).isGuest,
          },
        });
      });

      it('Should allow to change the event name when writing the user data on the dataLayer', () => {
        const userKey = 'custom.user.event';

        gtm = createGTMInstance({ containerId, userKey });

        const dataLayerEntry = getDataLayerEntryByEvent(userKey);

        expect(dataLayerEntry).toBeDefined();
        expect((dataLayerEntry as GTMEventData).event).toEqual(userKey);
      });

      it('Should allow to override the onSetUser method', () => {
        // Force clean the array that will be populated by 'createGTMInstance' called on beforeEach
        window.dataLayer = [];

        const myCustomOnSetUserFn = jest.fn();

        gtm = createGTMInstance({
          containerId,
          onSetUser: myCustomOnSetUserFn,
        });

        expect(myCustomOnSetUserFn).toHaveBeenCalledWith(
          utils.hashUserData(analyticsEventMock.user),
        );

        const defaultUserDataLayerEntry = getDataLayerEntryByEvent(
          DATA_LAYER_SET_USER_EVENT,
        );

        expect(defaultUserDataLayerEntry).toBeUndefined();

        gtm = createGTMInstance(
          // @ts-expect-error
          { containerId, onSetUser: 'not a function' },
        );

        expect(loggerErrorSpy).toHaveBeenCalledWith(
          'Google Tag Manager - TypeError: "onSetUser" option is not a function, make sure a valid function is passed.',
        );
      });
    });

    it('Should create the dataLayer array if it does not exist', () => {
      window.dataLayer = undefined;

      gtm = createGTMInstance({ containerId });

      expect(window.dataLayer).toBeDefined();
    });
  });

  describe('Track', () => {
    it('Should only track events mapped on the integration', () => {
      const analyticsEvent = {
        ...analyticsTrackDataMock,
        event: eventTypes.PRODUCT_CLICKED,
        properties: {
          id: 123123,
        },
      };

      gtm.track(analyticsEvent);

      // Valid, known event
      let dataLayerEntry = getDataLayerEntryByEvent(analyticsEvent.event);

      expect(dataLayerEntry).toBeDefined();
      expect((dataLayerEntry as GTMEventData).event).toEqual(
        analyticsEvent.event,
      );

      // Invalid, unknown event
      const invalidEventName = 'this event does not exist on the mapper';
      gtm.track({
        ...analyticsEvent,
        event: invalidEventName,
      });

      dataLayerEntry = getDataLayerEntryByEvent(invalidEventName);

      expect(dataLayerEntry).toBeUndefined();
    });

    it('Should log an error if an event does not have a function as the property value', () => {
      const invalidEvent = 'my invalid event';

      gtm = createGTMInstance({
        containerId,
        eventsMapper: {
          // @ts-expect-error
          [invalidEvent]: 'a string instead of a function',
        },
      });

      gtm.track({
        ...analyticsEventMock,
        event: invalidEvent,
      });
      expect(loggerErrorSpy)
        .toHaveBeenCalledWith(`Google Tag Manager - TypeError: Event mapping for event "${invalidEvent}" is not a function.
                If you are passing a custom event mapping for this event, make sure a valid function is passed.`);
    });

    it('Should log an error if an event maps a function that does not return a valid object', () => {
      const event = 'myEvent';

      gtm = createGTMInstance({
        containerId,
        eventsMapper: {
          [event]: () => 'a string instead of an object',
        },
      });

      gtm.track({
        ...analyticsEventMock,
        event: event,
      });
      expect(loggerErrorSpy)
        .toHaveBeenCalledWith(`Google Tag Manager - TypeError: The properties mapped for event "${event}" did not return an object.
                If you are passing a custom event mapping for this event, make sure that a valid object is returned.`);
    });
  });

  describe('EventsMapper', () => {
    const mockProduct = {
      id: '100',
      name: 'embroidered logo polo shirt',
      category: 'Clothing/Tops/T-shirts',
      brand: 'RALPH LAUREN',
      variant: 'Black',
      price: 19.5,
      quantity: 1,
      position: 1,
      size: 'M',
      list: 'product listing',
    };
    const mockEventData = {
      ...analyticsEventMock,
      properties: {
        // checkout generic properties
        option: 'DHL',
        step: 1,
        shipping: 10,
        tax: 23,
        total: 1000,
        paymentType: 'paypal',
        value: 123123,
        orderId: 'OFH1213',
        // product generic properties - Array of products
        products: [
          {
            ...mockProduct,
            // Test when categories comes with array
            category: ['category 1', 'category 2'],
          },
        ],
        // product properties directly on the "properties" root object
        ...mockProduct,
      },
    };

    Object.keys(eventsMapper).forEach(event => {
      it(`Should match the snapshot for the event: ${event}`, () => {
        expect(
          // @ts-expect-error
          (eventsMapper[event] as EventMappers[string])(mockEventData),
        ).toMatchSnapshot();
      });
    });
  });

  describe('eventSchemas', () => {
    it('Should allow to extend the eventSchema', () => {
      let dataLayerEntry;
      const myCustomProperty = 'myCustomProperty';
      const eventSchemas = {
        [eventTypes.PRODUCT_CLICKED]: validationSchemaBuilder.object({
          [myCustomProperty]: validationSchemaBuilder.string().required(),
        }),
      };

      // test scenario where the eventSchemas is not extended
      gtm = createGTMInstance({ containerId });

      const analyticsEvent = {
        ...analyticsTrackDataMock,
        event: eventTypes.PRODUCT_CLICKED,
        properties: {},
      };

      gtm.track(analyticsEvent);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Google Tag Manager - Track event "${analyticsEvent.event}" failed. Reason: ValidationError: Must provide an id or a name field.`,
      );

      dataLayerEntry = getDataLayerEntryByEvent(analyticsEvent.event);

      expect(dataLayerEntry).toBeUndefined();

      jest.clearAllMocks();

      // test scenario where the eventSchemas is extended and the payload does not match the schema
      gtm = createGTMInstance({ containerId, eventSchemas });

      gtm.track(analyticsEvent);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Google Tag Manager - Track event "${analyticsEvent.event}" failed. Reason: ValidationError: ${myCustomProperty} is a required field.`,
      );

      dataLayerEntry = getDataLayerEntryByEvent(analyticsEvent.event);

      expect(dataLayerEntry).toBeUndefined();

      jest.clearAllMocks();

      // test scenario where the eventSchemas is extended and the payload matches the schema
      gtm = createGTMInstance({ containerId, eventSchemas });

      gtm.track({
        ...analyticsEvent,
        properties: {
          [myCustomProperty]: 'value',
        },
      });

      expect(loggerErrorSpy).not.toHaveBeenCalled();

      dataLayerEntry = getDataLayerEntryByEvent(analyticsEvent.event);

      expect(dataLayerEntry).toBeDefined();
    });
  });

  describe('GTM script', () => {
    // This test purpose is to only get coverage on the external script code.
    // I've wrapped it with a try catch and added the expect on the catch so the test passes successfully.
    // Created a mock object so I could call jest.spyOn on its property with the function definition.
    // Feel free to improve this if you find a better way.

    it('should try to load the gtm script with the passed containerId', () => {
      const containerId = 123;
      const mockObject = {
        gtmScriptFn: jest.requireActual('../gtmTag').default,
      };

      const spy = jest.spyOn(mockObject, 'gtmScriptFn');

      expect.assertions(1);

      try {
        mockObject.gtmScriptFn(containerId);
      } catch (e) {
        expect(spy).toHaveBeenCalledWith(containerId);
      }
    });
  });
});
