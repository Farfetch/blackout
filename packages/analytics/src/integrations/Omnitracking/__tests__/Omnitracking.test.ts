import * as clients from '@farfetch/blackout-client';
import * as definitions from '../definitions';
import { Integration, Omnitracking } from '../..';
import {
  loadIntegrationData,
  pageEventsData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';
import {
  mockedUuid,
  expectedPagePayloadMobile as mockExpectedPagePayloadMobile,
  expectedPagePayloadUnknown as mockExpectedPagePayloadUnknown,
  expectedPagePayloadWeb as mockExpectedPagePayloadWeb,
  expectedTrackPayload as mockExpectedTrackPayload,
} from '../__fixtures__';
import {
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from '../constants';
import analyticsTrackTypes from '../../../types/trackTypes';
import eventTypes from '../../../types/eventTypes';
import fromParameterTypes from '../../../types/fromParameterTypes';
import merge from 'lodash/merge';
import mocked_view_uid from '../__fixtures__/mocked_view_uid';
import pageTypes from '../../../types/pageTypes';
import platformTypes from '../../../types/platformTypes';
import uuid from 'uuid';
import type {
  EventContext,
  EventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../../../types/analytics.types';
import type {
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventMapper,
  PageActionEvents,
  PageViewEvents,
} from '../types/Omnitracking.types';

const mockLoggerError = jest.fn();

jest.mock('../../../utils/logger', () => {
  return {
    error(message: string) {
      mockLoggerError(message);
    },
  };
});

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postTracking: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => mockedUuid),
}));

const mockedPageData = pageEventsData[pageTypes.HOMEPAGE];
const mockedTrackData = trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

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
    expect(Omnitracking.shouldLoad()).toEqual(true);
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
        parameters: {
          ...mockExpectedPagePayloadWeb.parameters,
          uniqueViewId: expect.any(String),
          previousUniqueViewId: null,
        },
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

      it('Should send the clientCountry when a culture is passed', async () => {
        const data = generateMockData();

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: 'US',
            }),
          }),
        );
      });

      it('Should not send the clientCountry when no culture is passed', async () => {
        const data = generateMockData();
        data.context.culture = undefined;

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
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/listing/foo/',
              },
            },
          },
        } as unknown as EventContext,
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
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/product/foo/',
              },
            },
          },
        } as unknown as EventContext,
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
        context: {
          web: {
            window: {
              location: {
                href: 'https://example.com/checkout/foo/',
              },
            },
          },
        } as unknown as EventContext,
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
            event: eventTypes.PLACE_ORDER_STARTED,
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
            type: analyticsTrackTypes.PAGE,
          });
          await omnitracking.track(data);

          data = generateTrackMockData({
            event: eventTypes.PLACE_ORDER_STARTED,
          });
          await omnitracking.track(data);

          expect(mockLoggerError).not.toHaveBeenCalled();
          expect(postTrackingSpy).toHaveBeenCalled();
        });
      });
    });
    describe('Should send track events when', () => {
      beforeEach(() => {
        omnitracking.currentUniqueViewId = mocked_view_uid;
      });

      it('event is `Place Order Started`', async () => {
        const placeOrderTid1 = 10097;
        const placeOrderTid2 = 188;

        const data = generateTrackMockData({
          event: eventTypes.PLACE_ORDER_STARTED,
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid: placeOrderTid1,
            val: JSON.stringify({
              type: 'TRANSACTION',
              paymentAttemptReferenceId: `${loadIntegrationData.user.localId}_${mockedTrackData.timestamp}`,
            }),
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledTimes(2);
        expect(postTrackingSpy.mock.calls).toEqual([
          [expectedPayload],
          [
            {
              ...expectedPayload,
              parameters: {
                ...expectedPayload.parameters,
                tid: placeOrderTid2,
              },
            },
          ],
        ]);
      });

      it('event is `Sign-up Form Viewed`', async () => {
        const tid = 10097;

        const data = generateTrackMockData({
          event: eventTypes.SIGNUP_FORM_VIEWED,
        });

        const correlationId = loadIntegrationData.user.localId;
        const paymentAttemptReferenceId = `${correlationId}_${mockedTrackData.timestamp}`;

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid,
            val: JSON.stringify({
              type: 'REGISTER',
              paymentAttemptReferenceId,
            }),
          },
        };

        expect(clients.postTracking).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Checkout Step Viewed`', async () => {
        const tid = 10097;

        const data = generateTrackMockData({
          event: eventTypes.CHECKOUT_STEP_VIEWED,
        });

        const correlationId = loadIntegrationData.user.localId;
        const paymentAttemptReferenceId = `${correlationId}_${mockedTrackData.timestamp}`;

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid,
            val: JSON.stringify({
              type: 'SUBMIT',
              paymentAttemptReferenceId,
            }),
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Cart` without from parameter', async () => {
        const productId = 10000;
        const tid = 16;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_CART,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST]: productId, // Here we simulate the event being dispatched by the bag middleware
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid,
            val: `${productId}`,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Cart` from PDP', async () => {
        const productId = 10000;
        const tid = 598;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_CART,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER_FROM_BAG_WISHLIST]: productId, // Here we simulate the event being dispatched by the bag middleware
            from: fromParameterTypes.PDP,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            tid,
            val: `${productId}`,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Wishlist` without from parameter', async () => {
        const productId = 10000;
        const tid = 35;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER]: productId,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            productId,
            tid,
            val: `${productId}`,
          },
        };
        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Wishlist` from PDP', async () => {
        const productId = 10000;
        const tid = 35;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER]: productId,
            from: fromParameterTypes.PDP,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            productId,
            tid,
            val: `${productId}`,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Wishlist` from BAG', async () => {
        const productId = 10000;
        const tid = 135;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER]: productId,
            from: fromParameterTypes.BAG,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            productId,
            tid,
            val: `${productId}`,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Wishlist` from RECOMMENDATIONS', async () => {
        const productId = 10000;
        const tid = 531;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER]: productId,
            from: fromParameterTypes.RECOMMENDATIONS,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            productId,
            tid,
            val: `${productId}`,
          },
        };

        expect(postTrackingSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Product Added to Wishlist` from RECENTLY_VIEWED', async () => {
        const productId = 10000;
        const tid = 532;

        const data = generateTrackMockData({
          event: eventTypes.PRODUCT_ADDED_TO_WISHLIST,
          properties: {
            [definitions.PRODUCT_ID_PARAMETER]: productId,
            from: fromParameterTypes.RECENTLY_VIEWED,
          },
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...mockExpectedTrackPayload,
          parameters: {
            ...mockExpectedTrackPayload.parameters,
            productId,
            tid,
            val: `${productId}`,
          },
        };

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

          expect(
            (
              definitions.trackEventsMapper[
                eventMapperKeyTemp
              ] as OmnitrackingTrackEventMapper
            )(mockedTrackData),
          ).toMatchSnapshot();
          expect(typeof definitions.trackEventsMapper[eventMapperKeyTemp]).toBe(
            'function',
          );
        },
      );
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

        omnitracking.currentUniqueViewId = mocked_view_uid;

        const data = generateMockData();

        await omnitracking.track(data);

        expect(postTrackingSpy).toHaveBeenCalledWith({
          ...mockExpectedPagePayloadWeb,
          event: mockEvent,
          parameters: {
            ...mockExpectedPagePayloadWeb.parameters,
            promoCode: mockPromoCode,
            previousUniqueViewId: mocked_view_uid,
            uniqueViewId: expect.any(String),
          },
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

        omnitracking.currentUniqueViewId = mocked_view_uid;

        const data = generateTrackMockData({
          event: eventTypes.PLACE_ORDER_STARTED,
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
  });

  describe('parameters', () => {
    it('Should provide default values for uniqueViewId and previousUniqueViewId when tracking page views and events', async () => {
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
            previousUniqueViewId: null,
            uniqueViewId: expect.any(String),
          }),
        }),
      );

      const currentUniqueViewId = lastPayload.parameters.uniqueViewId;

      const trackEventData = generateTrackMockData({
        event: eventTypes.PLACE_ORDER_STARTED,
      });

      // Track an event to check if the
      // uniqueViewId generated by the previous
      // page event tracked is the value used
      // for the payload of the track event
      await omnitracking.track(trackEventData);

      const newUniqueViewId = lastPayload.parameters.uniqueViewId;

      expect(newUniqueViewId).toBe(currentUniqueViewId);

      // Mock v4 function here to return a different value than
      // the mockedUuid so the uniqueViewId changes
      // on the next omnitracking.track call with a page event.
      // Remember that v4 is jest.fn() in this test file.
      (uuid.v4 as unknown as jest.Mock<string>).mockImplementation(
        () => '981945ad-b9d4-4c21-b3b0-2764b31bdc43',
      );

      // Track another page event to force
      // a creation of a new uniqueViewId
      // and the previousUniqueViewId parameter
      // will be filled with previous value
      // of the uniqueViewId.
      await omnitracking.track(pageEventData);

      // After this, we need to restore the mock for v4
      // to use the original implementation in other tests
      // that may be defined after this one.
      (uuid.v4 as unknown as jest.Mock<string>).mockImplementation(
        () => mockedUuid,
      );

      expect(lastPayload.parameters.uniqueViewId).not.toBe(newUniqueViewId);
      expect(
        (lastPayload as OmnitrackingRequestPayload<PageViewEvents>).parameters
          .previousUniqueViewId,
      ).toBe(newUniqueViewId);
    });

    it('Should allow the user to provide a value for the uniqueViewId parameter when tracking a page view', async () => {
      omnitracking = new Omnitracking(
        {},
        loadIntegrationData,
        strippedDownAnalytics,
      );
      const mockUniqueViewId = '78989d11-8863-4a12-b2ce-48cab737a43b';
      const pageEventData = generateMockData();
      pageEventData.properties.uniqueViewId = mockUniqueViewId;

      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          parameters: expect.objectContaining({
            previousUniqueViewId: null,
            uniqueViewId: mockUniqueViewId,
          }),
        }),
      );
    });
  });

  describe('platforms', () => {
    it('Should handle mobile platform events', async () => {
      const pageEventData = generateMockData();

      pageEventData.platform = platformTypes.Mobile;
      pageEventData.type = analyticsTrackTypes.SCREEN;

      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith({
        ...mockExpectedPagePayloadMobile,
        parameters: {
          ...mockExpectedPagePayloadMobile.parameters,
          previousUniqueViewId: null,
          uniqueViewId: expect.any(String),
        },
      });
    });

    it('Should handle other platform events', async () => {
      const pageEventData = generateMockData();

      pageEventData.platform = 'Dummy platform';

      await omnitracking.track(pageEventData);

      expect(postTrackingSpy).toHaveBeenCalledWith({
        ...mockExpectedPagePayloadUnknown,
        parameters: {
          ...mockExpectedPagePayloadUnknown.parameters,
          previousUniqueViewId: null,
          uniqueViewId: expect.any(String),
        },
      });
    });
  });
});
