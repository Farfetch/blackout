import {
  trackTypes as analyticsTrackTypes,
  eventTypes,
  integrations,
  interactionTypes,
  pageTypes,
  trackTypes,
  utils,
} from '@farfetch/blackout-analytics';
import {
  DEFAULT_DATA_LAYER_NAME,
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
} from '../constants';
import { GA4 } from '../..';
import { pageEventsData, trackEventsData } from 'tests/__fixtures__/analytics';
import cloneDeep from 'lodash/cloneDeep';
import eventMapping from '../eventMapping';

const mockedPageData = pageEventsData[pageTypes.HOMEPAGE];

const nonSupportedByDefaultTrackEvent =
  trackEventsData[eventTypes.PRODUCT_UPDATED_WISHLIST]; // Non supported event by default in GA

utils.logger.error = jest.fn();
const mockLoggerError = utils.logger.error;

utils.logger.warn = jest.fn();

function createGA4Instance(options, loadData) {
  return GA4.createInstance(options, loadData);
}

async function createGA4InstanceAndLoad(options, loadData) {
  const instance = createGA4Instance(options, loadData);
  instance.scriptOnload();
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
    expect(GA4.shouldLoad({ statistics: false })).toBe(false);
    expect(GA4.shouldLoad()).toBe(false);
    expect(GA4.shouldLoad({})).toBe(false);
  });

  it('`shouldLoad` should return true if there is user consent', () => {
    expect(GA4.shouldLoad({ statistics: true })).toBe(true);
  });

  describe('GA4 instance', () => {
    let ga4Instance;

    const validOptions = {
      measurementId: 'GA-123456-12',
    };

    const loadData = {
      user: {
        id: '12345678',
        traits: {
          email: 'foo@biz.com',
          name: 'John Doe',
          isGuest: false,
        },
      },
    };

    beforeEach(() => {
      // Create main script tag required to load GA4 script
      document.body.appendChild(document.createElement('script'));
    });

    afterEach(() => {
      document.getElementsByTagName('html')[0].innerHTML = '';

      window.gtag = undefined;
      ga4Instance = null;
    });

    describe('Custom script loading', () => {
      it('Should throw if custom script loading does not return a Promise', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => 'not a promise response',
        };

        try {
          ga4Instance = createGA4Instance(options);
        } catch (e) {
          expect(e.message).toBe(
            `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed with following error: Error: Function's return value is not a Promise`,
          );
        }
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

      it('Should throw if custom script has error', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => {
            window.gtag = () => 'valid function';

            // Force an error
            throw new Error('random error');
          },
        };

        try {
          ga4Instance = createGA4Instance(options);
        } catch (e) {
          expect(e.message).toContain(
            `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed`,
          );
        }
      });

      it('Should throw if custom script did not instantiate gtag properly', () => {
        const options = {
          ...validOptions,
          [OPTION_LOAD_SCRIPT_FUNCTION]: () => Promise.resolve(),
        };

        try {
          ga4Instance = createGA4Instance(options);
        } catch (e) {
          expect(e.message).toContain(
            `${MESSAGE_PREFIX}${INIT_ERROR}Custom load script function finished but 'window.gtag' is not defined.`,
          );
        }
      });
    });

    it('Should throw when tracking event if gtag is not defined', async () => {
      const options = {
        ...validOptions,
      };

      try {
        ga4Instance = await createGA4InstanceAndLoad(options);
        window.gtag = undefined;
        await ga4Instance.track(
          trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
        );
      } catch (e) {
        expect(e.message).toBe(
          '[GA4] - Event track failed: GA4 is not loaded.',
        );
      }
    });

    it('Should throw when tracking page event if gtag is not defined', async () => {
      const options = {
        ...validOptions,
      };

      try {
        ga4Instance = await createGA4InstanceAndLoad(options);
        window.gtag = undefined;
        await ga4Instance.track(mockedPageData);
      } catch (e) {
        expect(e.message).toBe(
          '[GA4] - Event track failed: GA4 is not loaded.',
        );
      }
    });

    it('Should return a GA4 instance from createInstance', async () => {
      expect(
        GA4.createInstance(
          {
            measurementId: 'GA-123456-12',
          },
          loadData,
        ),
      ).toBeInstanceOf(GA4);
    });

    describe('Should not load GA4 script', () => {
      it('When no options argument is specified', () => {
        try {
          createGA4Instance();
        } catch (e) {
          expect(e.message).toBe(
            `${MESSAGE_PREFIX}${INIT_ERROR}options object was not provided`,
          );
          const scriptTags = document.getElementsByTagName('script');

          expect(scriptTags.length).toBe(1);

          expect(window.gtag).not.toBeDefined();
        }
      });

      it('When no options are specified', () => {
        try {
          createGA4Instance({});
        } catch (e) {
          const scriptTags = document.getElementsByTagName('script');

          expect(scriptTags.length).toBe(1);

          expect(e.message).toBe(
            `${MESSAGE_PREFIX}${INIT_ERROR}options object was not provided`,
          );

          expect(window.gtag).not.toBeDefined();
        }
      });

      it(`When no ${OPTION_MEASUREMENT_ID} is specified in options`, () => {
        try {
          createGA4Instance({ [OPTION_MEASUREMENT_ID]: undefined });
        } catch (e) {
          expect(e.message).toBe(
            `${MESSAGE_PREFIX}${INIT_ERROR}${OPTION_MEASUREMENT_ID} is a required field and it was not provided`,
          );

          const scriptTags = document.getElementsByTagName('script');

          expect(scriptTags.length).toBe(1);

          expect(window.gtag).not.toBeDefined();
        }
      });
    });

    it('Should add gtag script when a measurementId is specified in options', async () => {
      ga4Instance = createGA4Instance(validOptions);
      const scriptTags = document.getElementsByTagName('script');

      // For GA4 to load, it needs to find an existing script tag
      // As such, we create one in a beforeEach() command to allow
      // the GA4 script to load, so here we expect the number of
      // script tags to be 3
      expect(scriptTags.length).toBe(3);

      const script = scriptTags[0];

      expect(script.src).toBe(
        `https://www.googletagmanager.com/gtag/js?id=${validOptions[OPTION_MEASUREMENT_ID]}&l=${DEFAULT_DATA_LAYER_NAME}`,
      );
      expect(script.async).toBe(true);

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

        expect(ga4Spy).not.toBeCalled();
      });

      it('Should send page events', async () => {
        ga4Instance = await createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(mockedPageData);

        const expectedCalls = [
          [
            'config',
            validOptions[OPTION_MEASUREMENT_ID],
            {
              page_path:
                mockedPageData.context.web.window.location.pathname +
                utils.stringifyQuery(
                  mockedPageData.context.web.window.location.query,
                ),
              path_clean: mockedPageData.context.web.window.location.pathname,
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
          ...trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
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
            [eventTypes.PRODUCT_REMOVED_FROM_CART]: true,
          },
        };

        ga4Instance = await createGA4InstanceAndLoad(options, loadData);

        const expectedPayload = [
          'event',
          eventMapping[eventTypes.PRODUCT_REMOVED_FROM_CART],
          expect.objectContaining({
            [NON_INTERACTION_FLAG]: true,
          }),
        ];

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(
          trackEventsData[eventTypes.PRODUCT_REMOVED_FROM_CART],
        );

        expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
      });

      it('Should track a non-interaction event with no properties', async () => {
        const dummyEvent = {
          event: 'dummy',
          type: trackTypes.TRACK,
        };

        const scopeCommands = {
          event: {
            [dummyEvent.event]: {
              main: () => [['event', 'dummy']],
            },
          },
        };

        const options = {
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
          {
            [NON_INTERACTION_FLAG]: true,
          },
        ];

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(dummyEvent);

        expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
      });

      describe('Options', () => {
        describe(`${OPTION_SCOPE_COMMANDS} option`, () => {
          describe('pageview', () => {
            it('Should allow the user to add extra commands to the default pageview handler', async () => {
              let customCommands = [];

              const scopeCommands = {
                pageview: {
                  extras: data => {
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
              const scopeCommands = {
                pageview: {
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
              const scopeCommands = {
                event: {
                  [nonSupportedByDefaultTrackEvent.event]: {
                    main: data => [
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
                scopeCommands.event[nonSupportedByDefaultTrackEvent.event].main(
                  nonSupportedByDefaultTrackEvent,
                ),
              );
            });

            it('Should allow the user to specify a wildcard to handle all events', async () => {
              const wildcardCommandMock = jest.fn();

              const scopeCommands = {
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
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              await ga4Instance.track(nonSupportedByDefaultTrackEvent);

              expect(wildcardCommandMock.mock.calls.length).toBe(2);
            });

            it('Should check if the main command builder specified for an event is a function', async () => {
              let scopeCommands = {
                event: {
                  '*': {
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
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                event: {
                  DUMMY_EVENT: {
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
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event is in the proper format', async () => {
              const invalidScopeCommands = {
                event: {
                  '*': {
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
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              expect(ga4Spy.mock.calls.length).toBe(0);
            });

            it('Should allow to add extra commands to the default event handler', async () => {
              let extraCommands;

              const scopeCommands = {
                event: {
                  [eventTypes.PRODUCT_ADDED_TO_CART]: {
                    extras: data => {
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
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(ga4Spy.mock.calls).toContainEqual(extraCommands[0]);

              expect(ga4Spy.mock.calls.length).toBeGreaterThan(
                extraCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              let scopeCommands = {
                event: {
                  '*': {
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
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                event: {
                  DUMMY_EVENT: {
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
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              const invalidScopeCommands = {
                event: {
                  '*': {
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
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('user scope', () => {
            it('Should allow to specify user scope commands', async () => {
              const dataGuestUser = {
                user: {
                  id: '100',
                  traits: {
                    isGuest: true,
                  },
                },
              };
              const dataRegisteredUser = {
                user: {
                  id: '101',
                  traits: {
                    isGuest: false,
                  },
                },
              };

              const registeredUserCommandList = [
                ['set', { dimension1: 'is part-registered' }],
              ];

              const notRegisteredUserCommandList = [
                ['set', { dimension1: 'is not registered' }],
              ];

              const setRegisteredUserIdCommand = [
                'set',
                'user_properties',
                {
                  user_id: dataRegisteredUser.user.id,
                  is_guest: dataRegisteredUser.user.traits.isGuest,
                  crm_id: dataRegisteredUser.user.id,
                },
              ];

              const expectedSetGuestUserIdCommand = [
                'set',
                'user_properties',
                {
                  user_id: null,
                  is_guest: dataGuestUser.user.traits.isGuest,
                  crm_id: null,
                },
              ];

              const onSetUserCommands = data => {
                return data.user.traits.isGuest
                  ? notRegisteredUserCommandList
                  : registeredUserCommandList;
              };

              const options = {
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
              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: {
                  user: 'dummy',
                },
              };

              ga4Instance = await createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.onSetUser({});

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });
        });

        describe(`${OPTION_ON_PRE_PROCESS_COMMANDS} option`, () => {
          it('Should log an error when the value specified is not a function', () => {
            const options = {
              ...validOptions,
              [OPTION_ON_PRE_PROCESS_COMMANDS]: 'dummy',
            };

            try {
              createGA4Instance(options, loadData);
            } catch (e) {
              expect(e.message).toContain('expected type was function');
            }
          });

          it('Should log an error when the function output is not of the proper type', async () => {
            const options = {
              ...validOptions,
              [OPTION_ON_PRE_PROCESS_COMMANDS]: () => 'dummy',
            };

            ga4Instance = await createGA4InstanceAndLoad(options, loadData);

            const ga4Spy = getWindowGa4Spy();

            await ga4Instance.track(
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(mockLoggerError).toHaveBeenCalled();

            expect(ga4Spy).not.toHaveBeenCalled();
          });
        });

        describe(`${OPTION_DATA_LAYER_NAME} option`, () => {
          it('Should log an error when the value specified is not a string', () => {
            const options = {
              ...validOptions,
              [OPTION_DATA_LAYER_NAME]: true,
            };

            try {
              createGA4Instance(options, loadData);
            } catch (e) {
              expect(e.message).toContain('expected type was string');
            }
          });

          it('Should store data on specified layer name', () => {
            const dataLayerName = 'customLayer';
            const options = {
              ...validOptions,
              [OPTION_DATA_LAYER_NAME]: dataLayerName,
            };

            createGA4InstanceAndLoad(options, loadData);

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
                user: { id: userIdLoggedIn, traits: { isGuest: false } },
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
                user: { id: userIdGuest, traits: { isGuest: true } },
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
                user: { id: userIdLoggedIn, traits: { isGuest: false } },
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
                user: { id: userIdGuest, traits: { isGuest: true } },
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

          // Force an error
          window.gtag = undefined;

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

            await ga4Instance.track(trackEventsData[eventType]);

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

            await ga4Instance.track(pageEventsData[pageType]);

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
              eventMapping[eventTypes.PRODUCT_REMOVED_FROM_CART],
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
              ...trackEventsData[eventTypes.PRODUCT_REMOVED_FROM_CART],
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
              trackEventsData[eventTypes.PRODUCT_REMOVED_FROM_CART].properties
                .price;

            const expectedPayload = [
              'event',
              eventMapping[eventTypes.PRODUCT_REMOVED_FROM_CART],
              expect.objectContaining({
                value: expectedValue,
              }),
            ];

            const ga4Spy = getWindowGa4Spy();

            const clonedEvent = {
              ...trackEventsData[eventTypes.PRODUCT_REMOVED_FROM_CART],
            };

            delete clonedEvent.value;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
          });

          it('Should obtain bag value in pageType.bag', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = { ...pageEventsData[pageTypes.BAG] };
            clonedEvent.properties.value = 10;
            await ga4Instance.track(clonedEvent);
            // expect obtain fixed value
            expect(ga4Spy.mock.calls[0][2].value).toEqual(10);

            delete clonedEvent.properties.value;

            const { discountValue, priceWithoutDiscount, quantity } =
              clonedEvent.properties.products[0];

            const expectedValue =
              (priceWithoutDiscount - discountValue) * quantity;

            await ga4Instance.track(clonedEvent);
            // expect obtain calculated value
            expect(ga4Spy.mock.calls[2][2].value).toEqual(expectedValue);
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
                trackEventsData[eventTypes.INTERACT_CONTENT],
              );

              expect(ga4Spy).toHaveBeenCalledWith('event', 'interact_content', {
                content_type: 'biz',
                some_other_property: 12312312,
                interaction_type: interactionTypes.CLICK,
              });
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
              trackEventsData[eventTypes.PRODUCT_UPDATED],
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
              trackEventsData[eventTypes.PRODUCT_UPDATED],
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
              trackEventsData[eventTypes.PRODUCT_UPDATED],
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
              trackEventsData[eventTypes.PRODUCT_UPDATED],
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
              trackEventsData[eventTypes.PRODUCT_UPDATED],
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
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            clonedEvent.properties.category =
              'Category_1/Category_2/Category_3/Category_4/Category_5/Category_6';

            // Make sure our dummy categories exceed the max length
            expect(
              clonedEvent.properties.category.split('/').length,
            ).toBeGreaterThan(MAX_PRODUCT_CATEGORIES);

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

            const eventPropertiesSentGa4 = ga4Spy.mock.calls[0].pop();

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
          it('Should map to a page scroll event when the interaction type is scroll and target is document', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[eventTypes.INTERACT_CONTENT],
            );

            clonedEvent.properties.interactionType = interactionTypes.SCROLL;
            clonedEvent.properties.target = document.body;
            clonedEvent.properties.percentageScrolled = '25%';

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls).toMatchSnapshot();
          });

          it('Should not map to a page scroll event when the interaction type is scroll and target is not document', async () => {
            ga4Instance = await createGA4InstanceAndLoad(
              validOptions,
              loadData,
            );

            const ga4Spy = getWindowGa4Spy();
            const clonedEvent = cloneDeep(
              trackEventsData[eventTypes.INTERACT_CONTENT],
            );

            clonedEvent.properties.interactionType = interactionTypes.SCROLL;
            clonedEvent.properties.target = document.createElement('ul'); // use other element instead of document
            clonedEvent.properties.percentageScrolled = '25%';

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy).toHaveBeenCalledWith(
              'event',
              'interact_content',
              expect.objectContaining({
                percentage_scrolled: '25%',
                interaction_type: 'Scroll',
              }),
            );
          });
        });
      });
    });
  });
});
