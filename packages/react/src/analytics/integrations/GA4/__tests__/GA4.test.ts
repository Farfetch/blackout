import {
  TrackType as analyticsTrackTypes,
  EventType,
  integrations,
  InteractionType,
  type LoadIntegrationEventData,
  PageType,
  type PageviewEventData,
  type SetUserEventData,
  type StrippedDownAnalytics,
  type TrackEventData,
  TrackType,
  utils,
} from '@farfetch/blackout-analytics';
import { cloneDeep, get } from 'lodash-es';
import {
  DEFAULT_DATA_LAYER_NAME,
  GA4_UNIQUE_EVENT_ID,
  INIT_ERROR,
  MAX_PRODUCT_CATEGORIES,
  MESSAGE_PREFIX,
  NON_INTERACTION_FLAG,
  OPTION_DATA_LAYER_NAME,
  OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS,
  OPTION_LOAD_SCRIPT_FUNCTION,
  OPTION_MEASUREMENT_ID,
  OPTION_NON_INTERACTION_EVENTS,
  OPTION_ON_PRE_PROCESS_COMMANDS,
  OPTION_SCOPE_COMMANDS,
  OPTION_SET_CUSTOM_USER_ID_PROPERTY,
} from '../constants.js';
import { GA4 } from '../../index.js';
import {
  loadIntegrationData,
  onSetUserEventData,
  pageEventsData,
  trackEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import eventMapping from '../eventMapping.js';
import type {
  GA4CommandList,
  GA4IntegrationOptions,
  OnPreProcessCommandsHandler,
  ScopeCommands,
  UserScopeCommandsHandler,
} from '../types/index.js';

const mockedPageData = pageEventsData[PageType.Homepage] as PageviewEventData;
const defaultTrackEventData = trackEventsData[EventType.ProductAddedToCart];
const nonSupportedByDefaultTrackEvent =
  trackEventsData[EventType.ProductUpdatedWishlist]; // Non supported event by default in GA

utils.logger.error = jest.fn();

const mockLoggerError = jest
  .spyOn(utils.logger, 'error')
  .mockImplementation(message => message);

utils.logger.warn = jest.fn();

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
};

function createGA4Instance(
  options: GA4IntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  return GA4.createInstance(options, loadData, analytics) as GA4;
}

async function createGA4InstanceAndLoad(
  options: GA4IntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  const instance = createGA4Instance(options, loadData, analytics);

  instance.scriptOnload();
  // @ts-expect-error Access private member initializePromise to ease testing
  await instance.initializePromise;

  return instance;
}

function getWindowGa4Spy() {
  return jest.spyOn(window, 'gtag');
}

describe('GA4 Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should extend the abstract class `Integration`', () => {
    expect(GA4.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('`shouldLoad` should return false if there is no user consent', () => {
    expect(GA4.shouldLoad({ statistics: false }, {})).toBe(false);
    expect(GA4.shouldLoad({}, {})).toBe(false);
  });

  it('`shouldLoad` should return true if there is user consent', () => {
    expect(GA4.shouldLoad({ statistics: true }, {})).toBe(true);
  });

  describe('GA4 instance', () => {
    let ga4Instance;

    const validOptions = {
      measurementId: 'GA-123456-12',
    };

    const loadData: LoadIntegrationEventData = {
      ...loadIntegrationData,
      user: {
        ...loadIntegrationData.user,
        id: 12345678,
        traits: mockUsersResponse,
      },
    };

    beforeEach(() => {
      // Create main script tag required to load GA4 script
      document.body.appendChild(document.createElement('script'));
    });

    afterEach(() => {
      const page = document.getElementsByTagName('html')[0];

      if (page) {
        page.innerHTML = '';
      }

      // @ts-expect-error
      window.gtag = undefined;
      ga4Instance = null;
    });

    describe('Custom script loading', () => {
      it('Should throw if custom script loading does not return a Promise', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => 'not a promise response',
        };

        expect(() => {
          // @ts-expect-error Set an invalid on load script function for testing
          ga4Instance = createGA4Instance(options);
        }).toThrow(
          `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed with following error: Error: Function's return value is not a Promise`,
        );
      });

      it('Should load a custom script', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => {
            window.gtag = () => 'valid function';

            return Promise.resolve();
          },
        };

        ga4Instance = createGA4Instance(options, loadData);
        expect(window.gtag).toBeDefined();
      });

      it('Should throw if custom script throws an error', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => {
            window.gtag = () => 'valid function';

            // Force an error
            throw new Error('random error');
          },
        };

        expect(() => {
          ga4Instance = createGA4Instance(options);
        }).toThrow(
          `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed`,
        );
      });
    });

    it('Should throw when tracking event if gtag is not defined', async () => {
      const options = {
        ...validOptions,
      };

      await expect(async () => {
        ga4Instance = await createGA4InstanceAndLoad(options);
        // @ts-ignore
        window.gtag = undefined;
        await ga4Instance.track(trackEventsData[EventType.ProductAddedToCart]);
      }).rejects.toThrow('[GA4] - Event track failed: GA4 is not loaded.');
    });

    it('Should throw when tracking page event if gtag is not defined', async () => {
      const options = {
        ...validOptions,
      };

      await expect(async () => {
        ga4Instance = await createGA4InstanceAndLoad(options);
        // @ts-ignore
        window.gtag = undefined;
        await ga4Instance.track(mockedPageData);
      }).rejects.toThrow('[GA4] - Event track failed: GA4 is not loaded.');
    });

    it('Should return a GA4 instance from createInstance', () => {
      expect(
        GA4.createInstance(
          {
            measurementId: 'GA-123456-12',
          },
          loadData,
          strippedDownAnalytics,
        ),
      ).toBeInstanceOf(GA4);
    });

    describe('Should not load GA4 script', () => {
      it('When no options argument is specified', () => {
        // @ts-expect-error Pass no options for testing
        expect(() => createGA4Instance()).toThrow(
          `${MESSAGE_PREFIX}${INIT_ERROR}options object was not provided`,
        );

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags).toHaveLength(1);

        expect(window.gtag).toBeUndefined();
      });

      it('When no options are specified', () => {
        // @ts-expect-error Pass no options for testing
        expect(() => createGA4Instance({})).toThrow(
          `${MESSAGE_PREFIX}${INIT_ERROR}options object was not provided`,
        );

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags).toHaveLength(1);

        expect(window.gtag).toBeUndefined();
      });

      it(`When no ${OPTION_MEASUREMENT_ID} is specified in options`, () => {
        expect(() =>
          // @ts-expect-error Pass invalid measurementId option for testing
          createGA4Instance({ [OPTION_MEASUREMENT_ID]: undefined }),
        ).toThrow(
          `${MESSAGE_PREFIX}${INIT_ERROR}${OPTION_MEASUREMENT_ID} is a required field and it was not provided`,
        );

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags).toHaveLength(1);

        expect(window.gtag).toBeUndefined();
      });
    });

    it('Should add gtag script when a measurementId is specified in options', () => {
      ga4Instance = createGA4Instance(validOptions);

      const scriptTags = document.getElementsByTagName('script');

      // For GA4 to load, it needs to find an existing script tag
      // As such, we create one in a beforeEach() command to allow
      // the GA4 script to load, so here we expect the number of
      // script tags to be 3
      expect(scriptTags).toHaveLength(3);

      const script = scriptTags[0];

      expect(script?.src).toBe(
        `https://www.googletagmanager.com/gtag/js?id=${validOptions[OPTION_MEASUREMENT_ID]}&l=${DEFAULT_DATA_LAYER_NAME}`,
      );
      expect(script?.async).toBe(true);

      expect(window.gtag).toBeDefined();
    });

    describe('When it is instantiated correctly', () => {
      it('Should not track a pageview if enableAutomaticPageViews is set to true', async () => {
        const options = {
          ...validOptions,
          [OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS]: true,
        };

        ga4Instance = await createGA4InstanceAndLoad(options, loadData);

        await ga4Instance.track(mockedPageData);

        const ga4Spy = getWindowGa4Spy();

        expect(ga4Spy).not.toHaveBeenCalled();
      });

      it('Should send page events', async () => {
        ga4Instance = await createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(mockedPageData);

        const pathName = get(
          mockedPageData,
          'context.web.window.location.pathname',
          '',
        );

        const query = get(
          mockedPageData,
          'context.web.window.location.query',
          {},
        );

        const expectedCalls = [
          [
            'event',
            'page_view',
            {
              [GA4_UNIQUE_EVENT_ID]: expect.any(String),
              page_path: pathName + utils.stringifyQuery(query),
              path_clean: pathName,
              analytics_package_version: expect.any(String),
            },
          ],
        ];

        expect(ga4Spy.mock.calls).toEqual(expectedCalls);
      });

      it('Should not track events that are not supported by default', async () => {
        ga4Instance = await createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        const ga4NonSupportedByDefaultTrackEvent = {
          ...nonSupportedByDefaultTrackEvent,
          event: 'random_not_supported_by_default',
        };

        await ga4Instance.track(ga4NonSupportedByDefaultTrackEvent);

        expect(ga4Spy).not.toHaveBeenCalled();
      });

      it('Should give an error and not track events that don`t conform to the default schema', async () => {
        ga4Instance = await createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        const invalidSchemaTrack = {
          ...defaultTrackEventData,
        };

        invalidSchemaTrack.properties = {
          ...invalidSchemaTrack.properties,
          priceWithoutDiscount: 'invalid price format',
        };

        await ga4Instance.track(invalidSchemaTrack);

        expect(mockLoggerError).toHaveBeenCalled();

        expect(ga4Spy).not.toHaveBeenCalled();
      });

      it('Should apply non-interaction flag to non-interaction events', async () => {
        const options = {
          ...validOptions,
          [OPTION_NON_INTERACTION_EVENTS]: {
            [EventType.ProductRemovedFromCart]: true,
          },
        };

        ga4Instance = await createGA4InstanceAndLoad(options, loadData);

        const expectedPayload = [
          'event',
          eventMapping[EventType.ProductRemovedFromCart],
          expect.objectContaining({
            [NON_INTERACTION_FLAG]: true,
          }),
        ];

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(
          trackEventsData[EventType.ProductRemovedFromCart],
        );

        expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
      });

      it('Should track a non-interaction event with no properties', async () => {
        const dummyEvent: TrackEventData = {
          ...defaultTrackEventData,
          event: 'dummy',
          type: TrackType.Track,
          properties: {},
        };

        const scopeCommands: ScopeCommands = {
          event: {
            [dummyEvent.event]: {
              main: () => [['event', 'dummy']],
            },
          },
        };

        const options: GA4IntegrationOptions = {
          ...validOptions,
          [OPTION_SCOPE_COMMANDS]: scopeCommands,
          [OPTION_NON_INTERACTION_EVENTS]: {
            [dummyEvent.event]: true,
          },
        };

        ga4Instance = await createGA4InstanceAndLoad(options, loadData);

        const expectedPayload = [
          'event',
          dummyEvent.event,
          expect.objectContaining({
            [NON_INTERACTION_FLAG]: true,
          }),
        ];

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(dummyEvent);

        expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
      });

      describe('Options', () => {
        describe(`${OPTION_SCOPE_COMMANDS} option`, () => {
          describe('pageview', () => {
            it('Should allow the user to add extra commands to the default pageview handler', async () => {
              let customCommands: GA4CommandList = [];

              const scopeCommands: ScopeCommands = {
                pageview: {
                  extras: (data: PageviewEventData) => {
                    customCommands = [
                      ['set', { property: data.properties.size }],
                    ];

                    return customCommands;
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(mockedPageData);

              expect(ga4Spy.mock.calls).toContainEqual(customCommands[0]);

              expect(ga4Spy.mock.calls.length).toBeGreaterThan(
                customCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              const scopeCommands: ScopeCommands = {
                pageview: {
                  // @ts-expect-error test to validate error throwing with wrong parameter like string instead of function
                  extras: 'dummy',
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(mockedPageData);

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('event tracking', () => {
            it('Should allow the user to add support to new events', async () => {
              const scopeCommands: ScopeCommands = {
                event: {
                  [nonSupportedByDefaultTrackEvent.event]: {
                    main: (data: TrackEventData) => [
                      ['event', 'currency', data.properties.currency],
                      ['event', 'fake_action', data.properties],
                    ],
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(nonSupportedByDefaultTrackEvent);

              expect(ga4Spy.mock.calls).toEqual(
                // @ts-ignore this event are defined before
                scopeCommands.event[nonSupportedByDefaultTrackEvent.event].main(
                  // @ts-ignore this event are defined before
                  nonSupportedByDefaultTrackEvent,
                ),
              );
            });

            it('Should allow the user to specify a wildcard to handle all events', async () => {
              const wildcardCommandMock = jest.fn();

              const scopeCommands: ScopeCommands = {
                event: {
                  '*': {
                    main: wildcardCommandMock,
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                trackEventsData[EventType.ProductAddedToCart],
              );

              await ga4Instance.track(nonSupportedByDefaultTrackEvent);

              expect(wildcardCommandMock.mock.calls).toHaveLength(2);
            });

            it('Should check if the main command builder specified for an event is a function', async () => {
              let scopeCommands: ScopeCommands = {
                event: {
                  '*': {
                    // @ts-expect-error test to validate error throwing with wrong parameter like string instead of function
                    main: 'stringValue',
                  },
                },
              };

              let options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                ...defaultTrackEventData,
                type: analyticsTrackTypes.Track,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                event: {
                  DUMMY_EVENT: {
                    // @ts-expect-error test to validate error throwing with wrong parameter like string instead of function
                    main: 'stringValue',
                  },
                },
              };

              options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                ...defaultTrackEventData,
                type: analyticsTrackTypes.Track,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event is in the proper format', async () => {
              const invalidScopeCommands: ScopeCommands = {
                event: {
                  '*': {
                    // @ts-expect-error test to validate error throwing with wrong return data type
                    main: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: invalidScopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                trackEventsData[EventType.ProductAddedToCart],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              expect(ga4Spy.mock.calls).toHaveLength(0);
            });

            it('Should allow to add extra commands to the default event handler', async () => {
              let extraCommands: GA4CommandList = [];

              const scopeCommands: ScopeCommands = {
                event: {
                  [EventType.ProductAddedToCart]: {
                    extras: (data: TrackEventData) => {
                      extraCommands = [
                        ['set', 'custom_attr', data.properties.size],
                      ];

                      return extraCommands;
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                trackEventsData[EventType.ProductAddedToCart],
              );

              expect(ga4Spy.mock.calls).toContainEqual(extraCommands[0]);

              expect(ga4Spy.mock.calls.length).toBeGreaterThan(
                extraCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              let scopeCommands: ScopeCommands = {
                event: {
                  '*': {
                    // @ts-expect-error test to validate error throwing with wrong `extra` parameter like string
                    extras: 'stringValue',
                  },
                },
              };

              let options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                ...defaultTrackEventData,
                type: analyticsTrackTypes.Track,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                event: {
                  DUMMY_EVENT: {
                    // @ts-expect-error test to validate error throwing with wrong `extra` parameter like string
                    extras: 'stringValue',
                  },
                },
              };

              options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                ...defaultTrackEventData,
                type: analyticsTrackTypes.Track,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              const invalidScopeCommands: ScopeCommands = {
                event: {
                  '*': {
                    // @ts-expect-error test to validate error throwing with wrong return data type
                    extras: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: invalidScopeCommands,
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                trackEventsData[EventType.ProductAddedToCart],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('user scope', () => {
            it('Should allow to specify user scope commands', async () => {
              const dataGuestUser: SetUserEventData = {
                ...onSetUserEventData,
                user: {
                  ...onSetUserEventData.user,
                  id: 100,
                  traits: {
                    ...mockUsersResponse,
                    isGuest: true,
                  },
                },
              };
              const dataRegisteredUser: SetUserEventData = {
                ...onSetUserEventData,
                user: {
                  ...onSetUserEventData.user,
                  id: 101,
                  traits: {
                    ...mockUsersResponse,
                    isGuest: false,
                  },
                },
              };

              const registeredUserCommandList: GA4CommandList = [
                ['set', { dimension1: 'is part-registered' }],
              ];

              const notRegisteredUserCommandList: GA4CommandList = [
                ['set', { dimension1: 'is not registered' }],
              ];

              const setRegisteredUserIdCommand = [
                'set',
                'user_properties',
                {
                  user_id: dataRegisteredUser.user.id,
                  is_guest: dataRegisteredUser?.user?.traits?.isGuest,
                  crm_id: dataRegisteredUser.user.id,
                },
              ];

              const expectedSetGuestUserIdCommand = [
                'set',
                'user_properties',
                {
                  user_id: null,
                  is_guest: dataGuestUser?.user?.traits?.isGuest,
                  crm_id: null,
                },
              ];

              const onSetUserCommands: UserScopeCommandsHandler = data => {
                return data?.user?.traits?.isGuest
                  ? notRegisteredUserCommandList
                  : registeredUserCommandList;
              };

              const options: GA4IntegrationOptions = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: {
                  user: onSetUserCommands,
                },
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.onSetUser(dataGuestUser);

              expect(ga4Spy.mock.calls).toEqual([
                expectedSetGuestUserIdCommand,
                ...notRegisteredUserCommandList,
              ]);

              ga4Spy.mockClear();

              await ga4Instance.onSetUser(dataRegisteredUser);

              expect(ga4Spy.mock.calls).toEqual([
                setRegisteredUserIdCommand,
                ...registeredUserCommandList,
              ]);
            });

            it('Should log an error if the value specified is not a function', async () => {
              const options: GA4IntegrationOptions = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: {
                  // @ts-expect-error
                  user: 'dummy',
                },
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              // @ts-expect-error
              await ga4Instance.onSetUser({});

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });
        });

        describe(`${OPTION_ON_PRE_PROCESS_COMMANDS} option`, () => {
          it('Should allow the user to transform the command list generated before sending to gtag instance', async () => {
            let newCommandList: GA4CommandList = [];

            const onPreProcessCommands: OnPreProcessCommandsHandler =
              commandList => {
                newCommandList = [
                  ['event', 'new_event', { dummy_prop: 'dummy_value' }],
                  ...commandList,
                ];

                return newCommandList;
              };

            const options: GA4IntegrationOptions = {
              ...validOptions,
              [OPTION_ON_PRE_PROCESS_COMMANDS]: onPreProcessCommands,
            };

            ga4Instance = await createGA4InstanceAndLoad(options, loadData);

            const ga4Spy = getWindowGa4Spy();

            await ga4Instance.track(
              trackEventsData[EventType.ProductAddedToCart],
            );

            expect(ga4Spy.mock.calls).toEqual(newCommandList);
          });

          it('Should log an error when the value specified is not a function', () => {
            const options: GA4IntegrationOptions = {
              ...validOptions,
              // @ts-expect-error
              [OPTION_ON_PRE_PROCESS_COMMANDS]: 'dummy',
            };

            expect(() => createGA4Instance(options, loadData)).toThrow(
              'expected type was function',
            );
          });

          it('Should log an error when the function output is not of the proper type', async () => {
            const options: GA4IntegrationOptions = {
              ...validOptions,
              // @ts-expect-error
              [OPTION_ON_PRE_PROCESS_COMMANDS]: () => 'dummy',
            };

            ga4Instance = await createGA4InstanceAndLoad(options, loadData);

            const ga4Spy = getWindowGa4Spy();

            await ga4Instance.track(
              trackEventsData[EventType.ProductAddedToCart],
            );

            expect(mockLoggerError).toHaveBeenCalled();

            expect(ga4Spy).not.toHaveBeenCalled();
          });

          it('Should only be called for events that generated commands', async () => {
            const onPreProcessCommandsMock = jest.fn();

            const options = {
              ...validOptions,
              [OPTION_ON_PRE_PROCESS_COMMANDS]: onPreProcessCommandsMock,
            };

            ga4Instance = await createGA4InstanceAndLoad(options, loadData);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            const ga4Spy = getWindowGa4Spy();

            const nonDefaultSupportedEvent = {
              ...trackEventsData[EventType.ProductAddedToCart],
              event: 'bogus event',
            };

            await ga4Instance.track(nonDefaultSupportedEvent);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            expect(ga4Spy).not.toHaveBeenCalled();
          });
        });

        describe(`${OPTION_DATA_LAYER_NAME} option`, () => {
          it('Should log an error when the value specified is not a string', () => {
            const options: GA4IntegrationOptions = {
              ...validOptions,
              // @ts-expect-error Pass an invalid data layer name option for testing
              [OPTION_DATA_LAYER_NAME]: true,
            };

            expect(() => createGA4Instance(options, loadData)).toThrow(
              'expected type was string',
            );
          });

          it('Should store data on specified layer name', () => {
            const dataLayerName = 'customLayer';
            const options = {
              ...validOptions,
              [OPTION_DATA_LAYER_NAME]: dataLayerName,
            };

            createGA4InstanceAndLoad(options, loadData);

            // @ts-ignore
            expect(window[dataLayerName][1]).toBeDefined();
          });
        });

        describe(`${OPTION_SET_CUSTOM_USER_ID_PROPERTY} option`, () => {
          const userIdLoggedIn = 10000;
          const userIdGuest = 30000;

          describe('When it is true', () => {
            it('Should set a `crm_id` user property whose value is equal to the `user_id` when the user is not guest', async () => {
              const options = {
                ...validOptions,
              };

              // By default OPTION_SET_CUSTOM_USER_ID_PROPERTY value is true
              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.onSetUser({
                ...onSetUserEventData,
                user: {
                  id: userIdLoggedIn,
                  traits: { ...mockUsersResponse, isGuest: false },
                  localId: '123',
                },
              });

              expect(ga4Spy).toHaveBeenCalledWith('set', 'user_properties', {
                crm_id: userIdLoggedIn,
                is_guest: false,
                user_id: userIdLoggedIn,
              });
            });

            it('Should set a `crm_id` user property whose value is null when the user is guest', async () => {
              const options = {
                ...validOptions,
              };

              // By default OPTION_SET_CUSTOM_USER_ID_PROPERTY value is true
              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.onSetUser({
                ...onSetUserEventData,
                user: {
                  id: userIdGuest,
                  traits: { ...mockUsersResponse, isGuest: true },
                  localId: '123',
                },
              });

              expect(ga4Spy).toHaveBeenCalledWith('set', 'user_properties', {
                crm_id: null,
                is_guest: true,
                user_id: null,
              });
            });
          });

          describe('When it is false', () => {
            it('Should set a `crm_id` user property whose value is null when the user is not guest', async () => {
              const options = {
                ...validOptions,
                [OPTION_SET_CUSTOM_USER_ID_PROPERTY]: false,
              };

              // By default OPTION_SET_CUSTOM_USER_ID_PROPERTY value is true
              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.onSetUser({
                ...onSetUserEventData,
                user: {
                  id: userIdLoggedIn,
                  traits: { ...mockUsersResponse, isGuest: false },
                  localId: '123',
                },
              });

              expect(ga4Spy).toHaveBeenCalledWith('set', 'user_properties', {
                crm_id: null,
                is_guest: false,
                user_id: userIdLoggedIn,
              });
            });

            it('Should set a `crm_id` user property whose value is null when the user is guest', async () => {
              const options = {
                ...validOptions,
                [OPTION_SET_CUSTOM_USER_ID_PROPERTY]: false,
              };

              // By default OPTION_SET_CUSTOM_USER_ID_PROPERTY value is true
              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.onSetUser({
                ...onSetUserEventData,
                user: {
                  id: userIdGuest,
                  traits: { ...mockUsersResponse, isGuest: true },
                  localId: '123',
                },
              });

              expect(ga4Spy).toHaveBeenCalledWith('set', 'user_properties', {
                crm_id: null,
                is_guest: true,
                user_id: null,
              });
            });
          });
        });
      });

      describe('.onSetUser', () => {
        it('Should log an error if the ga4 instance is not loaded', async () => {
          const options = {
            ...validOptions,
          };

          ga4Instance = await createGA4InstanceAndLoad(options, loadData);

          const ga4Spy = getWindowGa4Spy();

          // @ts-expect-error Force an error
          window.gtag = undefined;

          // @ts-expect-error
          await ga4Instance.onSetUser();

          expect(mockLoggerError).toHaveBeenCalled();

          expect(ga4Spy).not.toHaveBeenCalled();
        });
      });

      describe('Event Mappings', () => {
        describe('Track events', () => {
          it.each(
            Object.keys(eventMapping).filter(
              eventType => eventType in trackEventsData,
            ),
          )('Should map the %s event correctly', async eventType => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const eventData =
              trackEventsData[eventType as keyof typeof trackEventsData];

            await ga4Instance.track(eventData);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });
        });

        describe('Page events', () => {
          it.each(
            Object.keys(eventMapping).filter(
              pageType => pageType in pageEventsData,
            ),
          )('Should map the %s event correctly', async pageType => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const pageData =
              pageEventsData[pageType as keyof typeof pageEventsData];

            if (!pageData) {
              return;
            }

            await ga4Instance.track(pageData);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });
        });

        describe('Pre-purchase events', () => {
          it("Should use the 'value' property if it is available on the event properties", async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const expectedValue = 56;
            const expectedIndex = 4;

            const expectedPayload = [
              'event',
              eventMapping[EventType.ProductRemovedFromCart],
              expect.objectContaining({
                items: [
                  expect.objectContaining({
                    index: expectedIndex,
                  }),
                ],
                value: expectedValue,
              }),
            ];

            const ga4Spy = getWindowGa4Spy();

            const clonedEvent = {
              ...trackEventsData[EventType.ProductRemovedFromCart],
            };

            clonedEvent.properties = {
              ...clonedEvent.properties,
              value: expectedValue,
              position: expectedIndex,
            };

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
          });

          it("Should calculate the 'value' property if it is not available on the event properties", async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const expectedValue =
              trackEventsData[EventType.ProductRemovedFromCart].properties
                .price;

            const expectedPayload = [
              'event',
              eventMapping[EventType.ProductRemovedFromCart],
              expect.objectContaining({
                value: expectedValue,
              }),
            ];

            const ga4Spy = getWindowGa4Spy();

            const clonedEvent = {
              ...trackEventsData[EventType.ProductRemovedFromCart],
            };

            delete clonedEvent.properties.value;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
          });

          it('Should obtain bag value in pageType.bag', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const bagPageEventData = pageEventsData[
              PageType.Bag
            ] as PageviewEventData;

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = {
              ...bagPageEventData,
              properties: {
                ...bagPageEventData.properties,
                value: 10,
              },
            };

            await ga4Instance.track(clonedEvent);
            // @ts-ignore expect obtain fixed value
            expect(ga4Spy.mock.calls[0][2].value).toBe(10);

            // @ts-ignore
            delete clonedEvent.properties.value;

            const { discountValue, priceWithoutDiscount, quantity } =
              clonedEvent.properties.products?.[0] as {
                discountValue: number;
                priceWithoutDiscount: number;
                quantity: number;
              };

            const expectedValue =
              (priceWithoutDiscount - discountValue) * quantity;

            await ga4Instance.track(clonedEvent);
            // @ts-ignore expect obtain calculated value
            expect(ga4Spy.mock.calls[2][2].value).toEqual(expectedValue);
          });
        });

        describe('Newsletter events', () => {
          const defaultEvent = {
            ...trackEventsData[EventType.SignupNewsletter],
          };

          it('should track single gender event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const singleGenderEvent = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                gender: '0',
              },
            };

            await ga4Instance.track(singleGenderEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('should track multiple gender event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const getGenderData = (genderData: unknown) => ({
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                gender: genderData,
              },
            });

            await ga4Instance.track(getGenderData(['0', '1']));

            await ga4Instance.track(
              getGenderData([
                { id: '0', name: 'WOMAN' },
                { id: '1', name: 'MAN' },
              ]),
            );

            await ga4Instance.track(getGenderData([{ id: '0' }, { id: '1' }]));

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('should not track signup_newsletter event with invalid gender data', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const multipleGenderEventWithInvalidGender = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                gender: ['10', '1'],
              },
            };

            await ga4Instance.track(multipleGenderEventWithInvalidGender);

            const singleGenderEventWithInvalidGender = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                gender: '10',
              },
            };

            await ga4Instance.track(singleGenderEventWithInvalidGender);

            expect(ga4Spy).not.toHaveBeenCalled();
          });
        });

        describe('Search events', () => {
          const defaultEvent = {
            ...(pageEventsData[PageType.Search] as PageviewEventData),
          };

          it('should not track search event with invalid search term or query, only page event.', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const data = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                searchQuery: undefined,
              },
            };

            await ga4Instance.track(data);

            expect(ga4Spy.mock.calls[0]).toMatchSnapshot();
          });

          it('should track search event search term instead of search query.', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const data = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                searchTerm: 'term',
                searchQuery: 'query',
              },
            };

            await ga4Instance.track(data);

            expect(ga4Spy.mock.calls[0]).toMatchSnapshot();
          });

          it('should track search event search without search term but with search query instead.', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const data = {
              ...defaultEvent,
              properties: {
                ...defaultEvent.properties,
                searchTerm: undefined,
                searchQuery: 'query',
              },
            };

            await ga4Instance.track(data);

            expect(ga4Spy.mock.calls[0]).toMatchSnapshot();
          });
        });

        describe('Navigation events', () => {
          describe('Interact Content event', () => {
            it('Should allow to track the interact_content transforming camelCase to snake_case', async () => {
              ga4Instance = await createGA4InstanceAndLoad(
                validOptions,
                loadData,
              );

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                trackEventsData[EventType.InteractContent],
              );

              expect(ga4Spy).toHaveBeenCalledWith(
                'event',
                'interact_content',
                expect.objectContaining({
                  content_type: 'biz',
                  some_other_property: 12312312,
                  interaction_type: InteractionType.Click,
                }),
              );
            });
          });
        });

        describe('Update Product events', () => {
          it('Should not trigger ga4 event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductUpdated],
            );

            // delete unwanted case scenarios
            delete clonedEvent.properties.oldQuantity;
            delete clonedEvent.properties.quantity;
            delete clonedEvent.properties.oldSize;
            delete clonedEvent.properties.size;
            delete clonedEvent.properties.oldColour;
            delete clonedEvent.properties.colour;

            await ga4Instance.track(clonedEvent);
            expect(ga4Spy).not.toHaveBeenCalled();
          });

          it('Should trigger ga4 change_quantity event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductUpdated],
            );

            // delete unwanted case scenarios
            delete clonedEvent.properties.oldSize;
            delete clonedEvent.properties.size;
            delete clonedEvent.properties.oldColour;
            delete clonedEvent.properties.colour;

            await ga4Instance.track(clonedEvent);
            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('Should trigger ga4 change_size event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductUpdated],
            );

            // delete unwanted case scenarios
            delete clonedEvent.properties.oldSize;
            delete clonedEvent.properties.size;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('Should trigger ga4 change_colour event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductUpdated],
            );

            // delete unwanted case scenarios
            delete clonedEvent.properties.oldQuantity;
            delete clonedEvent.properties.quantity;
            delete clonedEvent.properties.oldSize;
            delete clonedEvent.properties.size;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('Should trigger ga4 change_quantity, change_quantity and change_colour event', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductUpdated],
            );

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });
        });

        describe('Product categories max validation', () => {
          it(`Should display a warning and truncate the categories if the product categories exceed ${MAX_PRODUCT_CATEGORIES}`, async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();

            const clonedEvent = cloneDeep(
              trackEventsData[EventType.ProductAddedToCart],
            );

            clonedEvent.properties.category =
              'Category_1/Category_2/Category_3/Category_4/Category_5/Category_6';

            const category = get(
              clonedEvent,
              'properties.category',
              '',
            ) as string;

            // Make sure our dummy categories exceed the max length
            expect(category.split('/').length).toBeGreaterThan(
              MAX_PRODUCT_CATEGORIES,
            );

            // We want the first + last 4 categories
            const expectedCategories = {
              item_category: 'Category_1',
              item_category2: 'Category_3',
              item_category3: 'Category_4',
              item_category4: 'Category_5',
              item_category5: 'Category_6',
            };

            await ga4Instance.track(clonedEvent);

            expect(utils.logger.warn).toHaveBeenCalledWith(
              '[GA4] - Product category hierarchy exceeded maximum of 5. GA4 only allows up to 5 levels.',
            );

            const eventPropertiesSentGa4 = ga4Spy.mock.calls?.[0]?.pop();

            expect(eventPropertiesSentGa4).toEqual(
              expect.objectContaining({
                items: expect.arrayContaining([
                  expect.objectContaining(expectedCategories),
                ]),
              }),
            );
          });
        });

        describe('Interact content events', () => {
          it('Should map to a page scroll event when the interaction type is scroll and target is document.body', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.InteractContent],
            );

            clonedEvent.properties.interactionType = InteractionType.Scroll;
            clonedEvent.properties.target = document.body;
            clonedEvent.properties.percentageScrolled = 100;
            clonedEvent.properties.pageNumber = 2;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('Should not map to a page scroll event when the interaction type is scroll and target is not document.body', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[EventType.InteractContent],
            );

            clonedEvent.properties.interactionType = InteractionType.Scroll;
            clonedEvent.properties.target = document.createElement('ul'); // use other element instead of document
            clonedEvent.properties.percentageScrolled = 25;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy).toHaveBeenCalledWith(
              'event',
              'interact_content',
              expect.objectContaining({
                percentage_scrolled: 25,
                interaction_type: 'Scroll',
              }),
            );

            const eventProperties = (ga4Spy as ReturnType<typeof jest.fn>).mock
              .calls[0]?.[2];

            expect(eventProperties).not.toHaveProperty('target');
          });
        });
      });
    });
  });
});
