import * as yup from 'yup';
import {
  DEFAULT_CART_VALUE_METRIC,
  DEFAULT_IN_STOCK_METRIC,
  DEFAULT_OUT_OF_STOCK_METRIC,
  MAX_PRODUCT_CATEGORIES,
} from '../constants';
import {
  EventData,
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  pageTypes,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import {
  loadIntegrationData,
  onSetUserEventData,
  pageEventsData,
  trackEventsData,
} from 'tests/__fixtures__/analytics';
import { validationSchemaBuilder } from '../..';
import defaultEventCommands from '../commands';
import GA from '../GA';
import get from 'lodash/get';
import merge from 'lodash/merge';
import type {
  GACommandList,
  GAIntegrationOptions,
  ScopeCommands,
} from '../types';
import type { TrackFixtures } from 'tests/__fixtures__/analytics/track';

const mockedPageData = pageEventsData[pageTypes.HOMEPAGE];

const nonSupportedByDefaultTrackEvent = merge(
  {},
  trackEventsData[
    eventTypes.PRODUCT_ADDED_TO_CART
  ] as EventData<TrackTypesValues>, // This cast is needed to avoid a type error for the mismatch of the event property
  { event: eventTypes.PAYMENT_INFO_ADDED }, // Non supported event by default in GA
);

const notValidTrackEvent = merge(
  {},
  trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
  { properties: { price: -120 } }, // Negative price is invalid
);

const validOptions: GAIntegrationOptions = {
  createFields: { trackingId: 'UA-123456-12' },
};

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
};

const mockLoggerError = jest
  .spyOn(utils.logger, 'error')
  .mockImplementation(message => message);
const mockLoggerWarn = jest
  .spyOn(utils.logger, 'warn')
  .mockImplementation(message => message);

function createGAInstance(
  options: GAIntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  const gaInstance: GA = GA.createInstance(options, loadData, analytics) as GA;

  return gaInstance;
}

function createGAInstanceAndLoad(
  options: GAIntegrationOptions,
  loadData: LoadIntegrationEventData = loadIntegrationData,
  analytics: StrippedDownAnalytics = strippedDownAnalytics,
) {
  const instance = createGAInstance(options, loadData, analytics);

  // force the onload function to mimic the `onload` event from the script tag
  instance.onloadFn();

  // Force loaded status
  window.ga.loaded = true;

  return instance;
}

function getWindowGaSpy(loadedStatus = true) {
  const spy = jest.spyOn(window, 'ga');

  // We need to force again the ga.loaded value
  // as jest.spyOn will change the value of window.ga
  window.ga.loaded = loadedStatus;

  return spy;
}

describe('GA Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should extend the abstract class `Integration`', () => {
    expect(GA.prototype).toBeInstanceOf(integrations.Integration);
  });

  it('Should export yup as validationSchemaBuilder', () => {
    expect(validationSchemaBuilder).toBeDefined();

    expect(validationSchemaBuilder).toBe(yup);
  });

  it('`shouldLoad` should return false if there is no user consent', () => {
    expect(GA.shouldLoad({ statistics: false })).toBe(false);
    expect(GA.shouldLoad({})).toBe(false);
  });

  it('`shouldLoad` should return true if there is user consent', () => {
    expect(GA.shouldLoad({ statistics: true })).toBe(true);
  });

  describe('GA instance', () => {
    let gaInstance;

    beforeEach(() => {
      // Create main script tag required to load GA script
      document.body.appendChild(document.createElement('script'));
    });

    afterEach(() => {
      const page = document.getElementsByTagName('html')[0];

      if (page) {
        page.innerHTML = '';
      }

      // @ts-expect-error
      delete window.ga;
      gaInstance = null;

      mockLoggerError.mockClear();
    });

    it('Should return a GA instance from createInstance', () => {
      expect(
        GA.createInstance(
          validOptions,
          loadIntegrationData,
          strippedDownAnalytics,
        ),
      ).toBeInstanceOf(GA);
    });

    describe('Should not load GA script', () => {
      it('When no options argument is specified', () => {
        expect(() => {
          // @ts-expect-error
          gaInstance = createGAInstance();
        }).toThrow();

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags.length).toBe(1);

        expect(window.ga).not.toBeDefined();
      });

      it('When no trackingId is specified in createFields option', () => {
        expect(() => {
          gaInstance = createGAInstance(
            // @ts-expect-error
            { createFields: {} },
          );
        }).toThrow();

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags.length).toBe(1);

        expect(window.ga).not.toBeDefined();
      });
    });

    it('Should add ga script when a trackingId is specified in createFields option', () => {
      gaInstance = createGAInstance(validOptions);

      const scriptTags = document.getElementsByTagName('script');

      // For GA to load, it needs to find an existing script tag
      // As such, we create one in a beforeEach() command to allow
      // the GA script to load, so here we expect the number of
      // script tags to be 2 instead of just 1.
      expect(scriptTags.length).toBe(2);

      const script = scriptTags[0];

      expect(script?.src).toBe('https://www.google-analytics.com/analytics.js');
      expect(script?.async).toBe(1);

      expect(window.ga).toBeDefined();
    });

    describe('When it is instantiated correctly', () => {
      it('Should not send page events if window.ga.loaded is "false" nor loaded and log an error', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions);

        const gaSpy = getWindowGaSpy(false);

        await gaInstance.track(mockedPageData);

        expect(mockLoggerError).toBeCalled();
        expect(gaSpy).not.toBeCalled();
      });

      it('Should not track events if window.ga.loaded is "false" nor loaded and log an error', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions);

        const gaSpy = getWindowGaSpy(false);

        await gaInstance.track(
          trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
        );

        expect(mockLoggerError).toBeCalled();
        expect(gaSpy).not.toBeCalled();
      });

      it('Should send page events', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track(mockedPageData);

        const expectedCalls = [
          [
            'set',
            'page',
            get(mockedPageData, 'context.web.window.location.pathname', '') +
              utils.stringifyQuery(
                get(mockedPageData, 'context.web.window.location.query', ''),
              ),
          ],
          ['send', 'pageview'],
        ];

        expect(gaSpy.mock.calls).toEqual(expectedCalls);
      });

      (Object.keys(defaultEventCommands) as Array<keyof TrackFixtures>).forEach(
        event => {
          const eventData = trackEventsData[event];
          if (eventData) {
            it(`Should track event '${event}'`, async () => {
              gaInstance = await createGAInstanceAndLoad(validOptions);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(eventData);

              expect(gaSpy.mock.calls).toMatchSnapshot();
            });
          }
        },
      );

      it('Should not track events that are not supported by default', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track(nonSupportedByDefaultTrackEvent);

        expect(gaSpy).not.toHaveBeenCalled();
      });

      it('Should give an error and not track events that don`t conform to the default schema', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track(notValidTrackEvent);

        expect(mockLoggerError).toHaveBeenCalled();

        expect(gaSpy).not.toHaveBeenCalled();
      });

      describe('Product category validation', () => {
        describe('For events supported by default', () => {
          it(`Should give a warning when tracking an event that contains a product category field with more than ${MAX_PRODUCT_CATEGORIES} levels of hierarchy`, async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions);

            const event = merge(
              {},
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            const categoryWithTooManyLevels =
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Skinny';

            event.properties.category = categoryWithTooManyLevels;

            await gaInstance.track(event);

            expect(mockLoggerWarn).toHaveBeenCalledWith(
              `[GA] - Product category hierarchy '${categoryWithTooManyLevels}' exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
            );
          });
        });

        describe('For added/overridden events', () => {
          it(`Should give a warning when tracking an event that contains a product category field with more than ${MAX_PRODUCT_CATEGORIES} levels of hierarchy`, async () => {
            const scopeCommands = {
              hit: {
                event: {
                  [nonSupportedByDefaultTrackEvent.event]: {
                    main: (
                      data: EventData<TrackTypesValues>,
                    ): GACommandList => [
                      ['set', 'currency', get(data, 'properties.currency')],
                      [
                        'ec:addProduct',
                        {
                          category: get(data, 'properties.category'),
                        },
                      ],
                      ['send', 'event'],
                    ],
                  },
                },
              },
            };

            const options = {
              ...validOptions,
              scopeCommands,
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const event = merge({}, nonSupportedByDefaultTrackEvent);

            const categoryWithTooManyLevels =
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Skinny';

            event.properties.category = categoryWithTooManyLevels;

            await gaInstance.track(event);

            expect(mockLoggerWarn).toHaveBeenCalledWith(
              `[GA] - Product category hierarchy '${categoryWithTooManyLevels}' exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
            );
          });
        });
      });

      describe('Options', () => {
        describe('`scopeCommands` option', () => {
          describe('pageview hits', () => {
            it('Should allow the user to add extra commands to the default pageview hit handler', async () => {
              let customDimensionsCommands: GACommandList = [];

              const scopeCommands = {
                hit: {
                  pageview: {
                    extras: (
                      data: EventData<TrackTypesValues>,
                    ): GACommandList => {
                      customDimensionsCommands = [
                        ['set', 'dimension1', get(data, 'properties.size')],
                      ];
                      return customDimensionsCommands;
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(mockedPageData);

              expect(gaSpy.mock.calls).toContainEqual(
                customDimensionsCommands[0],
              );

              expect(gaSpy.mock.calls.length).toBeGreaterThan(
                customDimensionsCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              const scopeCommands = {
                hit: {
                  pageview: {
                    extras: 'dummy',
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands,
              };

              // @ts-expect-error
              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(mockedPageData);

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('event hits', () => {
            it('Should allow the user to add support to new event hits', async () => {
              const scopeCommands = {
                hit: {
                  event: {
                    [nonSupportedByDefaultTrackEvent.event]: {
                      main: (
                        data: EventData<TrackTypesValues>,
                      ): GACommandList => [
                        ['set', 'currency', get(data, 'properties.currency')],
                        [
                          'ec:setAction',
                          'fake_action',
                          get(data, 'properties'),
                        ],
                        ['send', 'event'],
                      ],
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(nonSupportedByDefaultTrackEvent);

              expect(gaSpy.mock.calls).toEqual(
                scopeCommands.hit.event[
                  nonSupportedByDefaultTrackEvent.event
                ]?.main(nonSupportedByDefaultTrackEvent),
              );
            });

            it('Should allow the user to specify a wildcard to handle all event hits', async () => {
              const wildcardCommandMock = jest.fn();

              const scopeCommands = {
                hit: {
                  event: {
                    '*': {
                      main: wildcardCommandMock,
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              await gaInstance.track(nonSupportedByDefaultTrackEvent);

              expect(wildcardCommandMock.mock.calls.length).toBe(2);
            });

            it('Should check if the main command builder specified for an event hit is a function', async () => {
              let scopeCommands: ScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      // @ts-expect-error
                      main: 'stringValue',
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                hit: {
                  event: {
                    [eventTypes.PRODUCT_ADDED_TO_CART]: {
                      // @ts-expect-error
                      main: 'stringValue',
                    },
                  },
                },
              };

              options = {
                ...validOptions,
                scopeCommands,
              };

              mockLoggerError.mockClear();

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event hit is in the proper format', async () => {
              const invalidScopeCommands: ScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      // @ts-expect-error
                      main: () => ({ dummy: 'dummy' }),
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              expect(gaSpy.mock.calls.length).toBe(0);
            });

            it('Should allow to add extra commands to the default event hit handler', async () => {
              let customDimensionsCommands: GACommandList = [];

              const scopeCommands: ScopeCommands = {
                hit: {
                  event: {
                    [eventTypes.PRODUCT_ADDED_TO_CART]: {
                      extras: (
                        data: EventData<TrackTypesValues>,
                      ): GACommandList => {
                        customDimensionsCommands = [
                          ['set', 'dimension1', get(data, 'properties.size')],
                        ];
                        return customDimensionsCommands;
                      },
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(gaSpy.mock.calls).toContainEqual(
                customDimensionsCommands[0],
              );

              expect(gaSpy.mock.calls.length).toBeGreaterThan(
                customDimensionsCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              let scopeCommands: ScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      // @ts-expect-error
                      extras: 'stringValue',
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                hit: {
                  event: {
                    [eventTypes.PRODUCT_ADDED_TO_CART]: {
                      // @ts-expect-error
                      extras: 'stringValue',
                    },
                  },
                },
              };

              options = {
                ...validOptions,
                scopeCommands,
              };

              mockLoggerError.mockClear();

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              const invalidScopeCommands: ScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      // @ts-expect-error
                      extras: () => ({ dummy: 'dummy' }),
                    },
                  },
                },
              };

              const options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.track(
                trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });

          describe('user scope', () => {
            it('Should allow to specify user scope commands', async () => {
              const dataGuestUser: SetUserEventData = {
                ...onSetUserEventData,
                user: {
                  id: 100,
                  traits: {
                    isGuest: true,
                  },
                  localId: '123',
                },
              };
              const dataRegisteredUser = {
                ...onSetUserEventData,
                user: {
                  id: 101,
                  traits: {
                    isGuest: false,
                  },

                  localId: '123',
                },
              };

              const registeredUserCommandList: GACommandList = [
                ['set', 'dimension1', 'is part-registered'],
              ];

              const notRegisteredUserCommandList: GACommandList = [
                ['set', 'dimension1', 'is not registered'],
              ];

              const setRegisteredUserIdCommand = [
                'set',
                'userId',
                dataRegisteredUser.user.id,
              ];

              const setGuestUserIdCommand = ['set', 'userId', null];

              const onSetUserCommands = (
                data: SetUserEventData | LoadIntegrationEventData,
              ): GACommandList => {
                return data?.user?.traits?.isGuest
                  ? notRegisteredUserCommandList
                  : registeredUserCommandList;
              };

              const options = {
                ...validOptions,
                scopeCommands: {
                  user: onSetUserCommands,
                },
              };

              gaInstance = await createGAInstanceAndLoad(options);

              const gaSpy = getWindowGaSpy();

              await gaInstance.onSetUser(dataGuestUser);

              expect(gaSpy.mock.calls).toEqual([
                setGuestUserIdCommand,
                ...notRegisteredUserCommandList,
              ]);

              gaSpy.mockClear();

              await gaInstance.onSetUser(dataRegisteredUser);

              expect(gaSpy.mock.calls).toEqual([
                setRegisteredUserIdCommand,
                ...registeredUserCommandList,
              ]);
            });

            it('Should log an error if the value specified is not a function', async () => {
              const options: GAIntegrationOptions = {
                ...validOptions,
                scopeCommands: {
                  // @ts-expect-error
                  user: 'dummy',
                },
              };

              gaInstance = await createGAInstanceAndLoad(options);

              await gaInstance.onSetUser(onSetUserEventData);

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });
        });

        describe('`schemas` option', () => {
          it('Should allow the user to override event schemas for validation', async () => {
            const eventData = trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

            const schemas = {
              [eventData.event]: validationSchemaBuilder.object({
                dummyProperty: validationSchemaBuilder.number().required(),
              }),
            };

            const options = {
              ...validOptions,
              schemas,
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(eventData);

            expect(mockLoggerError).toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });

        describe('`onPreProcessCommands` option', () => {
          it('Should allow the user to transform the command list generated before sending to ga instance', async () => {
            let newCommandList: GACommandList = [];

            const onPreProcessCommands = (
              commandList: GACommandList,
              data:
                | EventData<TrackTypesValues>
                | LoadIntegrationEventData
                | SetUserEventData,
            ): GACommandList => {
              newCommandList = [
                [
                  'set',
                  'dimension1',
                  data?.user?.traits?.isGuest
                    ? 'is not registered'
                    : 'is registered',
                ],
                ...commandList,
              ];

              return newCommandList;
            };

            const options: GAIntegrationOptions = {
              ...validOptions,
              onPreProcessCommands,
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(gaSpy.mock.calls).toEqual(newCommandList);
          });

          it('Should log an error when the value specified is not a function', async () => {
            const options: GAIntegrationOptions = {
              ...validOptions,
              // @ts-expect-error
              onPreProcessCommands: 'dummy',
            };

            gaInstance = await createGAInstanceAndLoad(options);

            expect(mockLoggerError).toHaveBeenCalled();
          });

          it('Should log an error when the function output is not of the proper type', async () => {
            const options: GAIntegrationOptions = {
              ...validOptions,
              // @ts-expect-error
              onPreProcessCommands: () => 'dummy',
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(mockLoggerError).toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });

          it('Should only be called for events that generated commands', async () => {
            const onPreProcessCommandsMock = jest.fn();

            const options = {
              ...validOptions,
              onPreProcessCommands: onPreProcessCommandsMock,
            };

            gaInstance = await createGAInstanceAndLoad(options);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            const gaSpy = getWindowGaSpy();

            const nonDefaultSupportedEvent = {
              ...trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
              event: 'bogus event',
            };

            await gaInstance.track(nonDefaultSupportedEvent);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });

        describe('`productMappings` option', () => {
          it('Should allow the user to specify custom mappings to product properties', async () => {
            const options: GAIntegrationOptions = {
              ...validOptions,
              productMappings: {
                sku: ['dimension1', 'dimension2'],
                test: 'dimension3',
                category: 'dimension4',
              },
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const gaSpy = getWindowGaSpy();

            const validTrackEvent =
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

            await gaInstance.track(validTrackEvent);

            const gaCallProductData = get(gaSpy, 'mock.calls[1][1]');

            expect(gaCallProductData).toMatchObject({
              dimension1: validTrackEvent.properties.sku,
              dimension2: validTrackEvent.properties.sku,
              dimension4: validTrackEvent.properties.category,
            });

            expect(gaCallProductData).not.toMatchObject({
              dimension3: undefined,
            });
          });

          it('Should track the default custom metric for the out of stock', async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(trackEventsData[eventTypes.PRODUCT_VIEWED]);

            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_OUT_OF_STOCK_METRIC],
            ).toEqual(1);
            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_IN_STOCK_METRIC],
            ).toEqual(0);
          });

          it('Should ignore the out of stock metric if is not defined', async () => {
            gaInstance = await createGAInstanceAndLoad({
              ...validOptions,
              productMappings: {
                // @ts-expect-error
                isOutOfStock: undefined,
              },
            });

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(trackEventsData[eventTypes.PRODUCT_VIEWED]);

            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_OUT_OF_STOCK_METRIC],
            ).toBeUndefined();
            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_IN_STOCK_METRIC],
            ).toBeUndefined();
          });

          it('Should track the default custom metric for the cart value', async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions);

            const gaSpy = getWindowGaSpy();
            const trackData = trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART];

            await gaInstance.track(trackData);

            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_CART_VALUE_METRIC],
            ).toEqual(trackData.properties.price);
          });

          it('Should ignore the cart value metric if is not defined', async () => {
            gaInstance = await createGAInstanceAndLoad({
              ...validOptions,
              productMappings: {
                // @ts-expect-error
                cartValue: undefined,
              },
            });

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              trackEventsData[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(
              get(gaSpy, 'mock.calls[1][1]')[DEFAULT_CART_VALUE_METRIC],
            ).toBeUndefined();
          });
        });

        describe('.onSetUser', () => {
          it('Should log an error if the ga instance is not loaded', async () => {
            const options = {
              ...validOptions,
            };

            gaInstance = await createGAInstanceAndLoad(options);

            const gaSpy = getWindowGaSpy(false);

            await gaInstance.onSetUser(onSetUserEventData);

            expect(mockLoggerError).toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
