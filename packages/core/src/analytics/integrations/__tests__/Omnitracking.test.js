import * as clients from '../Omnitracking/client';
import * as definitions from '../Omnitracking/definitions';
import { Integration, Omnitracking } from '..';
import { mockCommonData } from '../../__fixtures__/commonData.fixtures';
import {
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from '../Omnitracking/constants';
import { utils } from '../../';
import analyticsTrackTypes from '../../types/trackTypes';
import eventTypes from '../../types/eventTypes';
import fromParameterTypes from '../../types/fromParameterTypes';
import merge from 'lodash/merge';
import mockedPageData, {
  customPageMockData,
  expectedPagePayloadMobile,
  expectedPagePayloadUnknown,
  expectedPagePayloadWeb,
} from '../../__fixtures__/pageData.fixtures';
import mockedTrackData, {
  customTrackMockData,
  expectedTrackPayload,
} from '../../__fixtures__/trackData.fixtures';
import pageTypes from '../../types/pageTypes';
import platformTypes from '../../types/platformTypes';
import uuid from 'uuid';

const mockLoggerError = jest.fn();

jest.mock('../../../helpers', () => ({
  Logger: class {
    error(message) {
      mockLoggerError(message);
    }
  },
}));

jest.mock('../Omnitracking/client', () => ({
  ...jest.requireActual('../Omnitracking/client'),
  postTrackings: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => mockCommonData.uuid),
}));

utils.logger.warn = jest.fn();
const mockLoggerWarn = utils.logger.warn;

describe('Omnitracking', () => {
  const generateMockData = data => merge({}, mockedPageData, data);
  const generateTrackMockData = data => merge({}, mockedTrackData, data);
  const localIdMock = 'd9864a1c112d-47ff-8ee4-968c-5acecae23';
  const loadData = {
    user: {
      localId: localIdMock,
    },
  };

  let omnitracking;
  const postTrackingsSpy = jest.spyOn(clients, 'postTrackings');

  beforeEach(() => {
    jest.clearAllMocks();

    omnitracking = Omnitracking.createInstance({}, loadData);
  });

  it('Should be ready to load', () => {
    expect(Omnitracking.shouldLoad()).toEqual(true);
  });

  it('Should extend Integration class', () => {
    expect(omnitracking).toBeInstanceOf(Integration);
  });

  it('Should return an instance of it in .createInstance()', () => {
    expect(Omnitracking.createInstance()).toBeInstanceOf(Omnitracking);
  });

  describe('track pages', () => {
    it('Should send the page event properly formatted', async () => {
      const data = generateMockData();

      await omnitracking.track(data);

      expect(postTrackingsSpy).toHaveBeenCalledWith({
        ...expectedPagePayloadWeb,
        parameters: {
          ...expectedPagePayloadWeb.parameters,
          uniqueViewId: expect.any(String),
          previousUniqueViewId: null,
        },
      });
    });

    describe('searchQuery', () => {
      it('Should send searchQuery when no searchQueryParameters option is sent', async () => {
        const data = generateMockData();
        data.context.web.window.location.query.q = 'some text';

        await omnitracking.track(data);

        expect(postTrackingsSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              searchQuery: 'some text',
            }),
          }),
        );
      });

      it('Should send searchQuery when a custom searchQueryParameters option is sent', async () => {
        const data = generateMockData();
        data.context.web.window.location.query.customSearchQuery = 'some text';

        const abc = new Omnitracking({
          [OPTION_SEARCH_QUERY_PARAMETERS]: ['customSearchQuery'],
        });
        await abc.track(data);

        expect(postTrackingsSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              searchQuery: 'some text',
            }),
          }),
        );
      });

      it('Should send searchQuery when a custom searchQueryParameters option is sent', async () => {
        const data = generateMockData();
        data.context.web.window.location.query.customSearchQuery = 'some text';

        const omnitrackingInstance = new Omnitracking({
          [OPTION_SEARCH_QUERY_PARAMETERS]: ['customSearchQuery'],
        });
        await omnitrackingInstance.track(data);

        expect(postTrackingsSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              searchQuery: 'some text',
            }),
          }),
        );
      });
    });

    describe('culture', () => {
      it('Should send the correct clientLanguage when a culture is passed', async () => {
        const data = generateMockData();
        // force a different culture instead of using the mocked one, which will return the default `en` clientLanguage
        data.context.culture = 'pt-PT';

        await omnitracking.track(data);

        expect(postTrackingsSpy).toHaveBeenCalledWith(
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

        expect(postTrackingsSpy).toHaveBeenCalledWith(
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

        expect(postTrackingsSpy).toHaveBeenCalledWith(
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

        expect(postTrackingsSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: undefined,
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

        expect(postTrackingsSpy).toHaveBeenCalledWith(
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

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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
        },
      });

      await omnitracking.track(data);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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
        },
      });

      await omnitracking.track(data);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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
        },
      });

      await omnitracking.track(data);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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
        },
      });

      await omnitracking.track(data);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          customerId: 'g_123123',
        }),
      );
    });
  });

  describe('track events', () => {
    describe('Tracking pre-requisites', () => {
      describe('Unique view Id', () => {
        it('should warn if an action event is tracked before a page event', async () => {
          const data = generateTrackMockData({
            event: eventTypes.PLACE_ORDER_STARTED,
          });
          await omnitracking.track(data);

          expect(mockLoggerWarn).toHaveBeenCalledWith(
            expect.stringContaining(
              `Event ${data.event} tried to track without an unique view id`,
            ),
          );
        });

        it('should not warn if an action event is tracked after a page event', async () => {
          let data = generateTrackMockData({
            event: 'customEvent',
            type: analyticsTrackTypes.PAGE,
          });
          await omnitracking.track(data);

          data = generateTrackMockData({
            event: eventTypes.PLACE_ORDER_STARTED,
          });
          await omnitracking.track(data);

          expect(mockLoggerWarn).not.toHaveBeenCalled();
        });
      });
    });
    describe('Should send track events when', () => {
      it('event is `Place Order Started`', async () => {
        const placeOrderTid1 = 10097;
        const placeOrderTid2 = 188;

        let data = generateTrackMockData({
          event: eventTypes.PLACE_ORDER_STARTED,
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid: placeOrderTid1,
            val: JSON.stringify({
              type: 'TRANSACTION',
              paymentAttemptReferenceId: `${localIdMock}_${mockedTrackData.timestamp}`,
            }),
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledTimes(2);
        expect(postTrackingsSpy.mock.calls).toEqual([
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

        const correlationId = localIdMock;
        const paymentAttemptReferenceId = `${correlationId}_${mockedTrackData.timestamp}`;

        await omnitracking.track(data);

        const expectedPayload = {
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid,
            val: JSON.stringify({
              type: 'REGISTER',
              paymentAttemptReferenceId,
            }),
          },
        };

        expect(clients.postTrackings).toHaveBeenCalledWith(expectedPayload);
      });

      it('event is `Checkout Step Viewed`', async () => {
        const tid = 10097;

        const data = generateTrackMockData({
          event: eventTypes.CHECKOUT_STEP_VIEWED,
        });

        const correlationId = localIdMock;
        const paymentAttemptReferenceId = `${correlationId}_${mockedTrackData.timestamp}`;

        await omnitracking.track(data);

        const expectedPayload = {
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid,
            val: JSON.stringify({
              type: 'SUBMIT',
              paymentAttemptReferenceId,
            }),
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid,
            val: productId,
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid,
            val: productId,
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
          ...expectedTrackPayload,
          parameters: {
            ...expectedTrackPayload.parameters,
            productId,
            tid,
            val: productId,
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
      });
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
        ...expectedTrackPayload,
        parameters: {
          ...expectedTrackPayload.parameters,
          productId,
          tid,
          val: productId,
        },
      };

      expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
        ...expectedTrackPayload,
        parameters: {
          ...expectedTrackPayload.parameters,
          productId,
          tid,
          val: productId,
        },
      };

      expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
        ...expectedTrackPayload,
        parameters: {
          ...expectedTrackPayload.parameters,
          productId,
          tid,
          val: productId,
        },
      };

      expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
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
        ...expectedTrackPayload,
        parameters: {
          ...expectedTrackPayload.parameters,
          productId,
          tid,
          val: productId,
        },
      };

      expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
    });

    it('Should not send track events for any other of the predefined events by default', async () => {
      const data = generateTrackMockData({
        event: 'My custom Event',
      });

      await omnitracking.track(data);

      expect(postTrackingsSpy).not.toHaveBeenCalled();
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
        const mockedData = merge(mockedTrackData, {
          properties: customTrackMockData[eventMapperKey],
        });

        expect(
          definitions.trackEventsMapper[eventMapperKey](mockedData),
        ).toMatchSnapshot();
        expect(typeof definitions.trackEventsMapper[eventMapperKey]).toBe(
          'function',
        );
      },
    );

    // test the pageEventsMapper globally with all default scenarios
    it.each(Object.keys(definitions.pageEventsMapper))(
      '`%s` return should match the snapshot',
      eventMapperKey => {
        const mockedData = merge(mockedPageData, {
          properties: customPageMockData[eventMapperKey],
        });

        expect(
          definitions.pageEventsMapper[eventMapperKey](mockedData),
        ).toMatchSnapshot();
        expect(typeof definitions.pageEventsMapper[eventMapperKey]).toBe(
          'function',
        );
      },
    );
  });

  describe('options', () => {
    describe('transformPayload', () => {
      it('Should allow to transform the payload for a page view before sending to Omnitracking service', async () => {
        const transformPayload = payload => {
          const payloadCopy = merge({}, payload);

          payloadCopy.event = 'DummyEvent';
          payloadCopy.parameters.testParam = 1;

          return payloadCopy;
        };

        omnitracking = new Omnitracking({
          transformPayload,
        });

        const data = generateMockData();

        await omnitracking.track(data);

        expect(postTrackingsSpy).toHaveBeenCalledWith({
          ...expectedPagePayloadWeb,
          event: 'DummyEvent',
          parameters: {
            ...expectedPagePayloadWeb.parameters,
            testParam: 1,
            previousUniqueViewId: null,
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

        const transformPayload = payload => {
          const payloadCopy = merge({}, payload);

          payloadCopy.event = newEvent;
          payloadCopy.parameters.val = newVal;
          payloadCopy.parameters.tid = newTid;

          return payloadCopy;
        };

        omnitracking = new Omnitracking({
          transformPayload,
        });

        const data = generateTrackMockData({
          event: eventTypes.PLACE_ORDER_STARTED,
        });

        await omnitracking.track(data);

        const expectedPayload = {
          ...expectedTrackPayload,
          event: newEvent,
          parameters: {
            ...expectedTrackPayload.parameters,
            tid: newTid,
            val: newVal,
          },
        };

        expect(postTrackingsSpy).toHaveBeenCalledWith(expectedPayload);
      });

      it('Should log an error if the value specified is not a function', () => {
        const transformPayload = 'Invalid value';

        omnitracking = new Omnitracking({
          transformPayload,
        });

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_TRANSFORM_PAYLOAD} option. It must be a function.`,
        );
      });

      it('Should log an error if no value is returned by the function provided', async () => {
        const transformPayload = () => {};

        omnitracking = new Omnitracking({
          transformPayload,
        });

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

        omnitracking = new Omnitracking({
          [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
        });

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must be an array.`,
        );
      });
      it('Should log an error if the value specified is an empty array', () => {
        const searchQueryParameters = [];

        omnitracking = new Omnitracking({
          [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
        });

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must contain a value`,
        );
      });
      it('Should log an error if the value specified has invalid data', () => {
        const searchQueryParameters = [{}];

        omnitracking = new Omnitracking({
          [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
        });

        expect(mockLoggerError).toHaveBeenCalledWith(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. All parameters should be typed as string`,
        );
      });
    });
  });

  describe('parameters', () => {
    it('Should provide default values for uniqueViewId and previousUniqueViewId when tracking page views and events', async () => {
      let lastPayload;

      const transformPayload = payload => {
        lastPayload = payload;
        return lastPayload;
      };

      omnitracking = new Omnitracking({
        transformPayload,
      });

      const pageEventData = generateMockData();

      // Track a page event to force generation of a
      // uniqueViewId
      await omnitracking.track(pageEventData);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
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

      let newUniqueViewId = lastPayload.parameters.uniqueViewId;

      expect(newUniqueViewId).toBe(currentUniqueViewId);

      // Mock v4 function here to return a different value than
      // the mockCommonData.uuid so the uniqueViewId changes
      // on the next omnitracking.track call with a page event.
      // Remember that v4 is jest.fn() in this test file.
      uuid.v4.mockImplementation(() => '981945ad-b9d4-4c21-b3b0-2764b31bdc43');

      // Track another page event to force
      // a creation of a new uniqueViewId
      // and the previousUniqueViewId parameter
      // will be filled with previous value
      // of the uniqueViewId.
      await omnitracking.track(pageEventData);

      // After this, we need to restore the mock for v4
      // to use the original implementation in other tests
      // that may be defined after this one.
      uuid.v4.mockImplementation(() => mockCommonData.uuid);

      expect(lastPayload.parameters.uniqueViewId).not.toBe(newUniqueViewId);
      expect(lastPayload.parameters.previousUniqueViewId).toBe(newUniqueViewId);
    });

    it('Should allow the user to provide a value for the uniqueViewId parameter when tracking a page view', async () => {
      omnitracking = new Omnitracking();
      const mockUniqueViewId = '78989d11-8863-4a12-b2ce-48cab737a43b';
      const pageEventData = generateMockData();
      pageEventData.properties.uniqueViewId = mockUniqueViewId;

      await omnitracking.track(pageEventData);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          parameters: expect.objectContaining({
            previousUniqueViewId: null,
            uniqueViewId: mockUniqueViewId,
          }),
        }),
      );
    });

    it('Should map the default page view type and subtype', async () => {
      omnitracking = new Omnitracking();
      const pageEventData = generateMockData({
        event: pageTypes.PRODUCT_LISTING,
      });

      await omnitracking.track(pageEventData);

      expect(postTrackingsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          parameters: expect.objectContaining({
            viewType: 'Listing',
            viewSubType: 'Listing',
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

      expect(postTrackingsSpy).toHaveBeenCalledWith({
        ...expectedPagePayloadMobile,
        parameters: {
          ...expectedPagePayloadMobile.parameters,
          previousUniqueViewId: null,
          uniqueViewId: expect.any(String),
        },
      });
    });

    it('Should handle other platform events', async () => {
      const pageEventData = generateMockData();

      pageEventData.platform = 'Dummy platform';

      await omnitracking.track(pageEventData);

      expect(postTrackingsSpy).toHaveBeenCalledWith({
        ...expectedPagePayloadUnknown,
        parameters: {
          ...expectedPagePayloadUnknown.parameters,
          previousUniqueViewId: null,
          uniqueViewId: expect.any(String),
        },
      });
    });
  });
});
