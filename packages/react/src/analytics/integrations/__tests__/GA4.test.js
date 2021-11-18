import {
  trackTypes as analyticsTrackTypes,
  eventTypes,
  fromParameterTypes,
  integrations,
  pageTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import {
  DEFAULT_DATA_LAYER_NAME,
  INIT_ERROR,
  MESSAGE_PREFIX,
  NON_INTERACTION_FLAG,
  OPTION_DATA_LAYER_NAME,
  OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS,
  OPTION_LOAD_SCRIPT_FUNCTION,
  OPTION_MEASUREMENT_ID,
  OPTION_NON_INTERACTION_EVENTS,
  OPTION_ON_PRE_PROCESS_COMMANDS,
  OPTION_SCOPE_COMMANDS,
} from '../GA4/constants';
import { GA4 } from '../';
import {
  nonSupportedByDefaultTrackEvent,
  notValidTrackEvent,
  validTrackEvents,
} from '../__fixtures__/gaData.fixtures';
import analyticsTrackDataMock from '../__fixtures__/analyticsTrackData.fixtures';
import eventMapping from '../GA4/eventMapping';
import mockedPageData from '../__fixtures__/analyticsPageData.fixtures.json';

utils.logger.error = jest.fn();
const mockLoggerError = utils.logger.error;

utils.logger.warn = jest.fn();

function createGA4Instance(options, loadData) {
  return GA4.createInstance(options, loadData);
}

function createGA4InstanceAndLoad(options, loadData) {
  const instance = createGA4Instance(options, loadData);
  instance.scriptOnload();
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
            `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed with\n` +
              "              following error: Error: Function's return value is not a Promise",
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
        ga4Instance = createGA4InstanceAndLoad(options);
        window.gtag = undefined;
        await ga4Instance.track(analyticsTrackDataMock);
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
        ga4Instance = createGA4InstanceAndLoad(options);
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

        ga4Instance = createGA4InstanceAndLoad(options, loadData);

        await ga4Instance.track(mockedPageData);

        const ga4Spy = getWindowGa4Spy();

        expect(ga4Spy).not.toBeCalled();
      });

      it('Should send page events', async () => {
        ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

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
            },
          ],
        ];

        expect(ga4Spy.mock.calls).toEqual(expectedCalls);
      });

      it('Should not track events that are not supported by default', async () => {
        ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(nonSupportedByDefaultTrackEvent);

        expect(ga4Spy).not.toHaveBeenCalled();
      });

      it('Should give an error and not track events that don`t conform to the default schema', async () => {
        ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

        const ga4Spy = getWindowGa4Spy();

        await ga4Instance.track(notValidTrackEvent);

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

        ga4Instance = createGA4InstanceAndLoad(options, loadData);

        const expectedPayload = [
          'event',
          eventMapping[eventTypes.PRODUCT_REMOVED_FROM_CART],
          expect.objectContaining({
            [NON_INTERACTION_FLAG]: true,
          }),
        ];

        const ga4Spy = getWindowGa4Spy();
        const validEvent =
          validTrackEvents[eventTypes.PRODUCT_REMOVED_FROM_CART];

        await ga4Instance.track({
          ...validEvent,
          properties: {
            ...validEvent.properties,
            from: fromParameterTypes.BAG,
            position: 0,
            affiliation: 'foo',
            coupon: 'bar',
            discount: 5,
            listId: 'Product Listing',
            list: 'Product Listing',
            locationId: 'baz',
          },
        });

        expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
      });

      describe('Options', () => {
        describe('`scopeCommands` option', () => {
          describe('pageview', () => {
            it('Should allow the user to add extra commands to the default pageview handler', async () => {
              let customCommands = [];

              let scopeCommands = {
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

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(mockedPageData);

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('events tracking', () => {
            it('Should allow the user to add support to new event', async () => {
              const scopeCommands = {
                event: {
                  [nonSupportedByDefaultTrackEvent.event]: {
                    main: data => [
                      ['set', { currency: data.properties.currency }],
                    ],
                  },
                },
              };

              const options = {
                ...validOptions,
                [OPTION_SCOPE_COMMANDS]: scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(nonSupportedByDefaultTrackEvent);

              expect(ga4Spy.mock.calls).toEqual(
                scopeCommands.event[nonSupportedByDefaultTrackEvent.event].main(
                  nonSupportedByDefaultTrackEvent,
                ),
              );
            });

            it('Should allow the user to specify a wildcard to handle all events tracking', async () => {
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

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              await ga4Instance.track(nonSupportedByDefaultTrackEvent);

              expect(wildcardCommandMock.mock.calls.length).toBe(2);
            });

            it('Should check if the main command builder specified for an event track is a function', async () => {
              let scopeCommands = {
                event: {
                  '*': {
                    main: 'stringValue',
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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
                scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event track is in the correct format', async () => {
              let invalidScopeCommands = {
                event: {
                  '*': {
                    main: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              expect(ga4Spy.mock.calls.length).toBe(0);
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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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
                scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              let invalidScopeCommands = {
                event: {
                  '*': {
                    extras: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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
                },
              ];

              const expectedSetGuestUserIdCommand = [
                'set',
                'user_properties',
                {
                  user_id: null,
                  is_guest: dataGuestUser.user.traits.isGuest,
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

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.onSetUser({});

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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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
                scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event is in the proper format', async () => {
              let invalidScopeCommands = {
                event: {
                  '*': {
                    main: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              const ga4Spy = getWindowGa4Spy();

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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
                scopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

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
                scopeCommands,
              };

              mockLoggerError.mockClear();

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              let invalidScopeCommands = {
                event: {
                  '*': {
                    extras: () => ({ dummy: 'dummy' }),
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              ga4Instance = createGA4InstanceAndLoad(options, loadData);

              await ga4Instance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });
        });

        describe('`onPreProcessCommands` option', () => {
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

            ga4Instance = createGA4InstanceAndLoad(options, loadData);

            const ga4Spy = getWindowGa4Spy();

            await ga4Instance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(mockLoggerError).toHaveBeenCalled();

            expect(ga4Spy).not.toHaveBeenCalled();
          });
        });

        describe('.onSetUser', () => {
          it('Should log an error if the ga4 instance is not loaded', async () => {
            const options = {
              ...validOptions,
            };

            ga4Instance = createGA4InstanceAndLoad(options, loadData);

            const ga4Spy = getWindowGa4Spy();

            // Force an error
            window.gtag = undefined;

            await ga4Instance.onSetUser();

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
      });

      describe('Event Mappings', () => {
        it.each(
          Object.keys(eventMapping).filter(
            eventType => eventType in validTrackEvents,
          ),
        )('Should map the %s event correctly', async eventType => {
          ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

          const ga4Spy = getWindowGa4Spy();

          await ga4Instance.track(validTrackEvents[eventType]);

          expect(ga4Spy.mock.calls).toMatchSnapshot();
        });

        describe('Pre-purchase events', () => {
          it("Should use the 'value' property if it is available on the event properties", async () => {
            ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

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
              ...validTrackEvents[eventTypes.PRODUCT_REMOVED_FROM_CART],
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
            ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

            const expectedValue =
              validTrackEvents[eventTypes.PRODUCT_REMOVED_FROM_CART].properties
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
              ...validTrackEvents[eventTypes.PRODUCT_REMOVED_FROM_CART],
            };

            delete clonedEvent.value;

            await ga4Instance.track(clonedEvent);

            expect(ga4Spy.mock.calls[0]).toEqual(expectedPayload);
          });
        });

        it('Should obtain bag value in pageType.bag', async () => {
          ga4Instance = createGA4InstanceAndLoad(validOptions, loadData);

          let ga4Spy = getWindowGa4Spy();
          const clonedEvent = { ...validTrackEvents[pageTypes.BAG] };

          clonedEvent.properties.value = 10;

          await ga4Instance.track(clonedEvent);

          // expect obtain fixed value
          expect(ga4Spy.mock.calls[0][2].value).toEqual(10);

          delete clonedEvent.properties.value;

          await ga4Instance.track(clonedEvent);

          // expect obtain calculated value
          expect(ga4Spy.mock.calls[2][2].value).toEqual(19);
        });
      });
    });
  });
});
