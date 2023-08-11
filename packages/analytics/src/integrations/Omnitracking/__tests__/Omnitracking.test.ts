import * as clients from '@farfetch/blackout-client';
import * as definitions from '../definitions.js';
import { ANALYTICS_UNIQUE_VIEW_ID } from '../../../utils/constants.js';
import { Integration, Omnitracking } from '../../index.js';
import {
  loadIntegrationData,
  mockedPreviousViewUid,
  mockedViewUid,
  pageEventsData,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import { merge } from 'lodash-es';
import {
  mockedUuid,
  expectedPagePayloadMobile as mockExpectedPagePayloadMobile,
  expectedPagePayloadUnknown as mockExpectedPagePayloadUnknown,
  expectedPagePayloadWeb as mockExpectedPagePayloadWeb,
  expectedTrackPayload as mockExpectedTrackPayload,
} from '../__fixtures__/index.js';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import {
  OPTION_HTTP_CLIENT,
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from '../constants.js';
import analyticsTrackTypes from '../../../types/TrackType.js';
import EventType from '../../../types/EventType.js';
import InteractionType from '../../../types/InteractionType.js';
import PageType from '../../../types/PageType.js';
import PlatformType from '../../../types/PlatformType.js';
import type {
  EventContext,
  EventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../../../types/analytics.types.js';
import type {
  OmnitrackingRequestPayload,
  OmnitrackingTrackOrPageEventMapper,
  PageActionEvents,
  PageViewEvents,
} from '../types/Omnitracking.types.js';

const mockLoggerError = jest.fn();
const mockLoggerWarn = jest.fn();

jest.mock('../../../utils/logger', () => {
  return {
    error(message: string) {
      mockLoggerError(message);
    },
    warn(message: string) {
      mockLoggerWarn(message);
    },
  };
});

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual<object>('@farfetch/blackout-client'),
  postTracking: jest.fn(),
}));

jest.mock('uuid', () => jest.fn(() => mockedUuid));

const mockedPageData = pageEventsData[PageType.Homepage];
const mockedTrackData = trackEventsData[EventType.ProductAddedToCart];

const generateMockData = (
  data?: Partial<EventData<TrackTypesValues>>,
): EventData<TrackTypesValues> =>
  merge({}, mockedPageData, data) as EventData<TrackTypesValues>;

const generateTrackMockData = (
  data?: Partial<EventData<TrackTypesValues>>,
): EventData<TrackTypesValues> => merge({}, mockedTrackData, data);

let omnitracking: Omnitracking;
const postTrackingSpy = jest.spyOn(clients, 'postTracking');

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
};

describe('Omnitracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    omnitracking = new Omnitracking(
      {},
      loadIntegrationData,
      strippedDownAnalytics,
    );
  });

  it('Should be ready to load', () => {
    expect(Omnitracking.shouldLoad()).toBe(true);
  });

  it('Should extend Integration class', () => {
    expect(omnitracking).toBeInstanceOf(Integration);
  });

  it('Should return an instance of it in .createInstance()', () => {
    expect(
      Omnitracking.createInstance(
        {},
        loadIntegrationData,
        strippedDownAnalytics,
      ),
    ).toBeInstanceOf(Omnitracking);
  });

  describe('track pages', () => {
    it('Should send the page event properly formatted', async () => {
      const data = generateMockData();

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith({
        ...mockExpectedPagePayloadWeb,
        parameters: expect.objectContaining(
          mockExpectedPagePayloadWeb.parameters,
        ),
      });
    });

    describe('culture', () => {
      it('Should send the correct clientLanguage when a culture is passed', async () => {
        const data = generateMockData();

        // force a different culture instead of using the mocked one, which will return the default `en` clientLanguage
        data.context.culture = 'pt-PT';

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientLanguage: 'pt',
            }),
          }),
        );
      });

      it('Should send the default clientLanguage when no culture is passed', async () => {
        const data = generateMockData();

        data.context.culture = undefined;

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientLanguage: 'en',
            }),
          }),
        );
      });

      it('Should send the correct clientCountry when a subfolder has the {country-language} format', async () => {
        const data = generateMockData();

        data.context.culture = undefined;

        // @ts-ignore
        data.context.web.window.location.pathname = '/en-pt';

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: 'PT',
            }),
          }),
        );
      });

      it('Should send the correct clientCountry when a subfolder has the {language} format', async () => {
        const data = generateMockData();

        data.context.culture = undefined;

        // @ts-ignore
        data.context.web.window.location.pathname = '/pt';

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: undefined,
            }),
          }),
        );
      });
    });

    describe('searchQuery', () => {
      type WebContext = {
        window: { location: { query: Record<string, string> } };
      };

      it('Should send searchQuery when a custom searchQueryParameters option is sent', async () => {
        const data = generateMockData();

        (
          data.context.web as WebContext
        ).window.location.query.customSearchQuery = 'some text';

        const omnitrackingInstance = new Omnitracking(
          {
            [OPTION_SEARCH_QUERY_PARAMETERS]: ['customSearchQuery'],
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        await omnitrackingInstance.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              searchQuery: 'some text',
            }),
          }),
        );
      });

      it('Should send searchQuery when no searchQueryParameters option is sent', async () => {
        const data = generateMockData();

        (data.context.web as WebContext).window.location.query.q = 'some text';

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              searchQuery: 'some text',
            }),
          }),
        );
      });
    });

    describe('currency', () => {
      it('Should send the correct viewCurrency when a currency is passed', async () => {
        const data = generateMockData();

        // force a currencyCode context value
        data.context.currencyCode = 'USD';

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              viewCurrency: 'USD',
            }),
          }),
        );
      });
    });

    it('Should return the formatted object for the `GenericPageVisited` event', async () => {
      const data = generateMockData();

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'GenericPageVisited',
        }),
      );
    });

    it('Should return the formatted object for the `ListingPageVisited` event', async () => {
      const data = generateMockData({
        // @ts-expect-error Missing properties from EventContext just to facilitate testing
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/listing/foo/',
              },
            },
          },
        } as EventContext,
      });

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'ListingPageVisited',
        }),
      );
    });

    it('Should return the formatted object for the `ProductPageVisited` event', async () => {
      const data = generateMockData({
        // @ts-expect-error Missing properties from EventContext just to facilitate testing
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/product/foo/',
              },
            },
          },
        } as EventContext,
      });

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'ProductPageVisited',
        }),
      );
    });

    it('Should return the formatted object for the `CheckoutVisited` event', async () => {
      const data = generateMockData({
        // @ts-expect-error Missing properties from EventContext just to facilitate testing
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/checkout/foo/',
              },
            },
          },
        } as EventContext,
      });

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'CheckoutPageVisited',
        }),
      );
    });

    it('Should return the formatted object fetching the event from the `data.name`', async () => {
      const data = generateMockData({
        event: 'product',
      });

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'ProductPageVisited',
        }),
      );
    });

    it('Should return the formatted object with user ID prefixed as guest', async () => {
      const data = generateMockData({
        event: 'details',
        user: {
          id: 123123,
          traits: {
            ...mockUsersResponse,
            isGuest: true,
          },
          localId: 'dummy',
        },
      });

      await omnitracking.track(data);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          customerId: 'g_123123',
        }),
      );
    });
  });

  describe('track events', () => {
    describe('Tracking pre-requisites', () => {
      describe('Unique view Id', () => {
        it('should not track an event if it has no unique view id', async () => {
          const data = generateTrackMockData({
            event: EventType.PlaceOrderStarted,
            context: {
              web: {
                [ANALYTICS_UNIQUE_VIEW_ID]: null,
              },
              library: { name: 'foo', version: '1' },
            },
          });

          await omnitracking.track(data);

          expect(mockLoggerError).toHaveBeenCalledWith(
            expect.stringContaining(
              `Event ${data.event} could not be tracked since it had no unique view id`,
            ),
          );
          expect(postTrackingSpy).not.toHaveBeenCalled();
        });

        it('should track an event if has unique view id', async () => {
          let data = generateTrackMockData({
            event: 'customEvent',
            type: analyticsTrackTypes.Page,
          });

          await omnitracking.track(data);

          data = generateTrackMockData({
            event: EventType.Share,
          });
          await omnitracking.track(data);

          expect(mockLoggerError).not.toHaveBeenCalled();
          expect(postTrackingSpy).toHaveBeenCalled();
        });
      });
    });

    describe('Should send track events when', () => {
      it('event is `Place Order Started`', async () => {
        const placeOrderTid = 188;

        const data = generateTrackMockData({
          event: EventType.PlaceOrderStarted,
          properties: {
            coupon: 'promo',
            shipping: 12,
            orderId: 'ABC12',
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            orderCode: 'ABC12',
            promocode: 'promo',
            shippingTotalValue: 12,
            tid: placeOrderTid,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledTimes(1);
        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('Should not send track events for any other of the predefined events by default', async () => {
        const data = generateTrackMockData({
          event: 'My custom Event',
        });

        await omnitracking.track(data);

        expect(postTrackingSpy).not.toHaveBeenCalled();
      });
    });

    describe('definitions', () => {
      it('`pageDefinitions` should match snapshot', () => {
        expect(definitions.pageDefinitions).toMatchSnapshot();
      });

      it('`trackDefinitions` should match snapshot', () => {
        expect(definitions.trackDefinitions).toMatchSnapshot();
      });

      it('`pageEventsFilter` should match snapshot', () => {
        expect(definitions.pageEventsFilter).toMatchSnapshot();
      });

      // test the trackEventsMapper globally with all default scenarios
      it.each(Object.keys(definitions.trackEventsMapper))(
        '`%s` return should match the snapshot',
        eventMapperKey => {
          const eventMapperKeyTemp =
            eventMapperKey as keyof typeof definitions.trackEventsMapper;

          const mockedData = merge(
            { event: eventMapperKeyTemp },
            mockedTrackData,
            trackEventsData[eventMapperKeyTemp],
          );

          expect(
            (
              definitions.trackEventsMapper[
                eventMapperKeyTemp
              ] as OmnitrackingTrackOrPageEventMapper
            )(mockedData),
          ).toMatchSnapshot();
          expect(typeof definitions.trackEventsMapper[eventMapperKeyTemp]).toBe(
            'function',
          );
        },
      );

      it.each(Object.keys(definitions.pageEventsMapper))(
        '`%s` return should match the snapshot',
        eventMapperKey => {
          const eventMapperKeyTemp =
            eventMapperKey as keyof typeof definitions.pageEventsMapper;

          const mockedData = merge(
            {},
            mockedPageData,
            pageEventsData[eventMapperKeyTemp],
          );

          expect(
            definitions.pageEventsMapper[eventMapperKeyTemp]?.(mockedData),
          ).toMatchSnapshot();
          expect(typeof definitions.pageEventsMapper[eventMapperKeyTemp]).toBe(
            'function',
          );
        },
      );
    });

    describe('select content', () => {
      const expectedErrorMessage =
        'properties "contentType" and "id" should be sent';

      it('should log error if a select content does not contain a contentType parameter', async () => {
        const data = generateTrackMockData({
          event: EventType.SelectContent,
          properties: {
            id: 123,
          },
        });

        delete data.properties.contentType;

        await omnitracking.track(data);

        expect(mockLoggerError).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
        );
        expect(postTrackingSpy).not.toHaveBeenCalled();
      });

      it('should log error if a select content does not contain an id parameter', async () => {
        const data = generateTrackMockData({
          event: EventType.SelectContent,
          properties: {
            contentType: 'foo',
          },
        });

        delete data.properties.id;

        await omnitracking.track(data);

        expect(mockLoggerError).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
        );
        expect(postTrackingSpy).not.toHaveBeenCalled();
      });

      it('should not log error if an select content has all required parameters', async () => {
        const data = generateTrackMockData({
          event: EventType.SelectContent,
          properties: {
            contentType: 'foo',
            id: 123,
          },
        });

        await omnitracking.track(data);

        expect(mockLoggerError).not.toHaveBeenCalled();
        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              tid: 2895,
            }),
          }),
        );
      });
    });

    describe('interact content', () => {
      it('should not track an interact content event if the required parameters are missing', async () => {
        const data = generateTrackMockData({
          event: EventType.InteractContent,
          properties: {
            interactionType: undefined,
          },
        });

        await omnitracking.track(data);

        expect(mockLoggerError).toHaveBeenCalledWith(
          expect.stringContaining(
            'Event Interact Content properties "contentType" and "id" should be sent',
          ),
        );
      });

      it('should track scroll event', async () => {
        const data = generateTrackMockData({
          event: EventType.InteractContent,
          properties: {
            interactionType: InteractionType.Scroll,
            target: document.body,
            percentageScrolled: 50,
          },
        });

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              tid: 668,
            }),
          }),
        );
      });

      it('should not track an event when interactionType is scroll but target is not document.body', async () => {
        const data = generateTrackMockData({
          event: EventType.InteractContent,
          properties: {
            interactionType: InteractionType.Scroll,
            target: undefined,
            percentageScrolled: 50,
          },
        });

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledTimes(0);
      });

      it('should track a default interact content event', async () => {
        const data = generateTrackMockData({
          event: EventType.InteractContent,
          properties: {
            interactionType: InteractionType.Click,
            contentType: 'logo',
            id: 'home_logo',
          },
        });

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              tid: 2882,
            }),
          }),
        );
      });
    });
  });

  describe('options', () => {
    describe('transformPayload', () => {
      it('Should allow to transform the payload for a page view before sending to Omnitracking service', async () => {
        const mockEvent = 'GenericPageVisited';
        const mockPromoCode = 'PROMO_XXX';

        const transformPayload = (
          payload: OmnitrackingRequestPayload<
            PageViewEvents | PageActionEvents
          >,
        ) => {
          const payloadCopy = merge({}, payload);

          payloadCopy.event = mockEvent;
          payloadCopy.parameters.promoCode = mockPromoCode;

          return payloadCopy;
        };

        omnitracking = new Omnitracking(
          {
            transformPayload,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        const data = generateMockData();

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith({
          ...mockExpectedPagePayloadWeb,
          event: mockEvent,
          parameters: expect.objectContaining({
            ...mockExpectedPagePayloadWeb.parameters,
            promoCode: mockPromoCode,
          }),
        });
      });

      it('Should allow to transform the payload for an event before sending to Omnitracking service', async () => {
        const newEvent = 'SystemAction';
        const newVal = JSON.stringify({
          type: 'DUMMY_TYPE',
          paymentAttemptReferenceId: 'DUMMY_REFERENCE_ID',
        });
        const newTid = 10030;

        const transformPayload = (
          payload: OmnitrackingRequestPayload<
            PageActionEvents | PageViewEvents
          >,
        ) => {
          const payloadCopy = merge(
            {},
            payload,
          ) as OmnitrackingRequestPayload<PageActionEvents>;

          payloadCopy.event = newEvent;
          payloadCopy.parameters.val = newVal;
          payloadCopy.parameters.tid = newTid;

          return payloadCopy;
        };

        omnitracking = new Omnitracking(
          {
            transformPayload,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        const data = generateTrackMockData({
          event: EventType.PlaceOrderStarted,
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          event: newEvent,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid: newTid,
            val: newVal,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('Should log an error if the value specified is not a function', () => {
        const transformPayload = 'Invalid value';

        omnitracking = new Omnitracking(
          {
            // @ts-expect-error
            transformPayload,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_TRANSFORM_PAYLOAD} option. It must be a function.`,
        );
      });

      it('Should log an error if no value is returned by the function provided', async () => {
        const transformPayload = () => undefined;

        omnitracking = new Omnitracking(
          {
            // @ts-expect-error
            transformPayload,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        const data = generateMockData();

        await omnitracking.track(data);

        expect(mockLoggerError).toHaveBeenCalledWith(
          expect.stringContaining(
            '`transformPayload` function did not return any payload data to be sent to Omnitracking. No request will be sent for eventData: ',
          ),
        );
      });
    });

    describe('searchQueryParameter', () => {
      it('Should log an error if the value specified is not an array', () => {
        const searchQueryParameters = 'Invalid value';

        omnitracking = new Omnitracking(
          {
            // @ts-expect-error
            [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must be an array.`,
        );
      });

      it('Should log an error if the value specified is an empty array', () => {
        const searchQueryParameters: never[] = [];

        omnitracking = new Omnitracking(
          {
            [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must contain a value`,
        );
      });

      it('Should log an error if the value specified has invalid data', () => {
        const searchQueryParameters = [{}];

        omnitracking = new Omnitracking(
          {
            // @ts-expect-error
            [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. All parameters should be typed as string`,
        );
      });
    });

    describe('httpClient', () => {
      it('Should output an error on the console if the httpClient type is not a function', () => {
        omnitracking = new Omnitracking(
          {
            // @ts-expect-error
            [OPTION_HTTP_CLIENT]: 'foo',
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        expect(mockLoggerError).toHaveBeenCalledWith(
          '[Omnitracking] - Invalid `httpClient` option. Please make to pass a valid function to perform the http requests to the omnitracking service.',
        );
      });

      it('Should allow to pass a custom httpClient and call it when tracking an event', async () => {
        const mockHttpClient = jest.fn();

        omnitracking = new Omnitracking(
          {
            [OPTION_HTTP_CLIENT]: mockHttpClient,
          },
          loadIntegrationData,
          strippedDownAnalytics,
        );

        await omnitracking.track(generateMockData());

        expect(mockHttpClient).toHaveBeenCalledWith({
          ...mockExpectedPagePayloadWeb,
          parameters: expect.objectContaining(
            mockExpectedPagePayloadWeb.parameters,
          ),
        });
        expect(postTrackingSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('parameters', () => {
    it('Should grab uniqueViewId and previousUniqueViewId from the context when tracking page views and events', async () => {
      let lastPayload!: OmnitrackingRequestPayload<
        PageViewEvents | PageActionEvents
      >;

      const transformPayload = (
        payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
      ) => {
        lastPayload = payload;

        return lastPayload;
      };

      omnitracking = new Omnitracking(
        {
          transformPayload,
        },
        loadIntegrationData,
        strippedDownAnalytics,
      );

      const pageEventData = generateMockData();

      // Track a page event to force generation of a
      // uniqueViewId
      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          parameters: expect.objectContaining({
            previousUniqueViewId: mockedPreviousViewUid,
            uniqueViewId: mockedViewUid,
          }),
        }),
      );
    });
  });

  describe('platforms', () => {
    it('Should handle mobile platform events', async () => {
      const pageEventData = generateMockData();

      pageEventData.platform = PlatformType.Mobile;
      pageEventData.type = analyticsTrackTypes.Screen;

      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith({
        ...mockExpectedPagePayloadMobile,
        parameters: expect.objectContaining({
          ...mockExpectedPagePayloadMobile.parameters,
          uniqueViewId: mockedViewUid,
        }),
      });
    });

    it('Should handle other platform events', async () => {
      const pageEventData = generateMockData();

      pageEventData.platform = 'Dummy platform';

      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith({
        ...mockExpectedPagePayloadUnknown,
        parameters: expect.objectContaining({
          ...mockExpectedPagePayloadUnknown.parameters,
          uniqueViewId: mockedViewUid,
        }),
      });
    });
  });
});
