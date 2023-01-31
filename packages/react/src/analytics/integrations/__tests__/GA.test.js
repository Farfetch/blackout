import * as yup from 'yup';
import {
  trackTypes as analyticsTrackTypes,
  eventTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import {
  DEFAULT_CART_VALUE_METRIC,
  DEFAULT_IN_STOCK_METRIC,
  DEFAULT_OUT_OF_STOCK_METRIC,
  MAX_PRODUCT_CATEGORIES,
} from '../GA/constants';
import { GA, validationSchemaBuilder } from '../';
import {
  nonSupportedByDefaultTrackEvent,
  notValidTrackEvent,
  validTrackEvents,
} from '../__fixtures__/gaData.fixtures';
import defaultEventCommands from '../GA/commands';
import merge from 'lodash/merge';
import mockedPageData from '../__fixtures__/analyticsPageData.fixtures.json';

utils.logger.error = jest.fn();
const mockLoggerError = utils.logger.error;

utils.logger.warn = jest.fn();
const mockLoggerWarn = utils.logger.warn;

function createGAInstance(options, loadData) {
  const gaInstance = GA.createInstance(options, loadData);

  return gaInstance;
}

function createGAInstanceAndLoad(options, loadData) {
  const instance = createGAInstance(options, loadData);

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
    expect(GA.shouldLoad()).toBe(false);
    expect(GA.shouldLoad({})).toBe(false);
  });

  it('`shouldLoad` should return true if there is user consent', () => {
    expect(GA.shouldLoad({ statistics: true })).toBe(true);
  });

  describe('GA instance', () => {
    let gaInstance;

    const validOptions = {
      createFields: { trackingId: 'UA-123456-12' },
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
      // Create main script tag required to load GA script
      document.body.appendChild(document.createElement('script'));
    });

    afterEach(() => {
      document.getElementsByTagName('html')[0].innerHTML = '';

      delete window.ga;
      gaInstance = null;

      mockLoggerError.mockClear();
    });

    it('Should return a GA instance from createInstance', () => {
      expect(
        GA.createInstance({
          createFields: { trackingId: 'UA-123456-12' },
        }),
      ).toBeInstanceOf(GA);
    });

    describe('Should not load GA script', () => {
      it('When no options argument is specified', () => {
        expect(() => {
          gaInstance = createGAInstance();
        }).toThrow();

        const scriptTags = document.getElementsByTagName('script');

        expect(scriptTags.length).toBe(1);

        expect(window.ga).not.toBeDefined();
      });

      it('When no trackingId is specified in createFields option', () => {
        expect(() => {
          gaInstance = createGAInstance({ createFields: {} });
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

      expect(script.src).toBe('https://www.google-analytics.com/analytics.js');
      expect(script.async).toBe(1);

      expect(window.ga).toBeDefined();
    });

    describe('When it is instantiated correctly', () => {
      it('Should not send page events if window.ga.loaded is "false" nor loaded and log an error', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

        const gaSpy = getWindowGaSpy(false);

        await gaInstance.track(mockedPageData);

        expect(mockLoggerError).toBeCalled();
        expect(gaSpy).not.toBeCalled();
      });

      it('Should not track events if window.ga.loaded is "false" nor loaded and log an error', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

        const gaSpy = getWindowGaSpy(false);

        await gaInstance.track(
          validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
        );

        expect(mockLoggerError).toBeCalled();
        expect(gaSpy).not.toBeCalled();
      });

      it('Should send page events', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track(mockedPageData);

        const expectedCalls = [
          [
            'set',
            'page',
            mockedPageData.context.web.window.location.pathname +
              utils.stringifyQuery(
                mockedPageData.context.web.window.location.query,
              ),
          ],
          ['send', 'pageview'],
        ];

        expect(gaSpy.mock.calls).toEqual(expectedCalls);
      });

      Object.keys(defaultEventCommands).forEach(event => {
        if (validTrackEvents[event]) {
          it(`Should track event '${event}'`, async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(validTrackEvents[event]);

            expect(gaSpy.mock.calls).toMatchSnapshot();
          });
        }
      });

      it('Should not track events that are not supported by default', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track({
          ...nonSupportedByDefaultTrackEvent,
          event: undefined,
        });

        expect(gaSpy).not.toHaveBeenCalled();
      });

      it('Should give an error and not track events that don`t conform to the default schema', async () => {
        gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

        const gaSpy = getWindowGaSpy();

        await gaInstance.track(notValidTrackEvent);

        expect(mockLoggerError).toHaveBeenCalled();

        expect(gaSpy).not.toHaveBeenCalled();
      });

      describe('Product category validation', () => {
        describe('For events supported by default', () => {
          it(`Should give a warning when tracking an event that contains a product category field with more than ${MAX_PRODUCT_CATEGORIES} levels of hierarchy`, async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

            const event = merge(
              {},
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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

        describe('For added/overriden events', () => {
          it(`Should give a warning when tracking an event that contains a product category field with more than ${MAX_PRODUCT_CATEGORIES} levels of hierarchy`, async () => {
            const scopeCommands = {
              hit: {
                event: {
                  [nonSupportedByDefaultTrackEvent.event]: {
                    main: data => [
                      ['set', 'currency', data.properties.currency],
                      [
                        'ec:addProduct',
                        {
                          category: data.properties.category,
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

            gaInstance = await createGAInstanceAndLoad(options, loadData);

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
              let customDimensionsCommands;

              const scopeCommands = {
                hit: {
                  pageview: {
                    extras: data => {
                      customDimensionsCommands = [
                        ['set', 'dimension1', data.properties.size],
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

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
                      main: data => [
                        ['set', 'currency', data.properties.currency],
                        ['ec:setAction', 'fake_action', data.properties],
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(nonSupportedByDefaultTrackEvent);

              expect(gaSpy.mock.calls).toEqual(
                scopeCommands.hit.event[
                  nonSupportedByDefaultTrackEvent.event
                ].main(nonSupportedByDefaultTrackEvent),
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              await gaInstance.track(nonSupportedByDefaultTrackEvent);

              expect(wildcardCommandMock.mock.calls.length).toBe(2);
            });

            it('Should check if the main command builder specified for an event hit is a function', async () => {
              let scopeCommands = {
                hit: {
                  event: {
                    '*': {
                      main: 'stringValue',
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                hit: {
                  event: {
                    DUMMY_EVENT: {
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the main command builder output for an event hit is in the proper format', async () => {
              let invalidScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      main: () => ({ dummy: 'dummy' }),
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(mockLoggerError).toHaveBeenCalled();

              expect(gaSpy.mock.calls.length).toBe(0);
            });

            it('Should allow to add extra commands to the default event hit handler', async () => {
              let customDimensionsCommands;

              const scopeCommands = {
                hit: {
                  event: {
                    [eventTypes.PRODUCT_ADDED_TO_CART]: {
                      extras: data => {
                        customDimensionsCommands = [
                          ['set', 'dimension1', data.properties.size],
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              const gaSpy = getWindowGaSpy();

              await gaInstance.track(
                validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              );

              expect(gaSpy.mock.calls).toContainEqual(
                customDimensionsCommands[0],
              );

              expect(gaSpy.mock.calls.length).toBeGreaterThan(
                customDimensionsCommands.length,
              );
            });

            it('Should check if the extra commands builder specified is a function', async () => {
              let scopeCommands = {
                hit: {
                  event: {
                    '*': {
                      extras: 'stringValue',
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();

              scopeCommands = {
                hit: {
                  event: {
                    DUMMY_EVENT: {
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

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track({
                type: analyticsTrackTypes.TRACK,
                event: 'DUMMY_EVENT',
              });

              expect(mockLoggerError).toHaveBeenCalled();
            });

            it('Should check if the extra commands builder output is in the proper format', async () => {
              let invalidScopeCommands = {
                hit: {
                  event: {
                    '*': {
                      extras: () => ({ dummy: 'dummy' }),
                    },
                  },
                },
              };

              let options = {
                ...validOptions,
                scopeCommands: invalidScopeCommands,
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.track(
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
                ['set', 'dimension1', 'is part-registered'],
              ];

              const notRegisteredUserCommandList = [
                ['set', 'dimension1', 'is not registered'],
              ];

              const setRegisteredUserIdCommand = [
                'set',
                'userId',
                dataRegisteredUser.user.id,
              ];

              const setGuestUserIdCommand = ['set', 'userId', null];

              const onSetUserCommands = data => {
                return data.user.traits.isGuest
                  ? notRegisteredUserCommandList
                  : registeredUserCommandList;
              };

              const options = {
                ...validOptions,
                scopeCommands: {
                  user: onSetUserCommands,
                },
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

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
              const options = {
                ...validOptions,
                scopeCommands: {
                  user: 'dummy',
                },
              };

              gaInstance = await createGAInstanceAndLoad(options, loadData);

              await gaInstance.onSetUser({});

              expect(mockLoggerError).toHaveBeenCalled();
            });
          });
        });

        describe('`schemas` option', () => {
          it('Should allow the user to override event schemas for validation', async () => {
            const schemas = {
              [validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART].event]:
                validationSchemaBuilder.object({
                  dummyProperty: validationSchemaBuilder.number().required(),
                }),
            };

            const options = {
              ...validOptions,
              schemas,
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(mockLoggerError).toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });

        describe('`onPreProcessCommands` option', () => {
          it('Should allow the user to transform the command list generated before sending to ga instance', async () => {
            let newCommandList;

            const onPreProcessCommands = (commandList, data) => {
              newCommandList = [
                [
                  'set',
                  'dimension1',
                  data.user.isGuest ? 'is not registered' : 'is registered',
                ],
                ...commandList,
              ];

              return newCommandList;
            };

            const options = {
              ...validOptions,
              onPreProcessCommands,
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(gaSpy.mock.calls).toEqual(newCommandList);
          });

          it('Should log an error when the value specified is not a function', async () => {
            const options = {
              ...validOptions,
              onPreProcessCommands: 'dummy',
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            expect(mockLoggerError).toHaveBeenCalled();
          });

          it('Should log an error when the function output is not of the proper type', async () => {
            const options = {
              ...validOptions,
              onPreProcessCommands: () => 'dummy',
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
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

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            const gaSpy = getWindowGaSpy();

            const nonDefaultSupportedEvent = {
              ...validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
              event: 'bogus event',
            };

            await gaInstance.track(nonDefaultSupportedEvent);

            expect(onPreProcessCommandsMock).not.toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });

        describe('`productMappings` option', () => {
          it('Should allow the user to specify custom mappings to product properties', async () => {
            const options = {
              ...validOptions,
              productMappings: {
                sku: ['dimension1', 'dimension2'],
                test: 'dimension3',
                category: 'dimension4',
              },
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            const gaSpy = getWindowGaSpy();

            const validTrackEvent =
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART];

            await gaInstance.track(validTrackEvent);

            const gaCallProductData = gaSpy.mock.calls[1][1];

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
            gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(validTrackEvents[eventTypes.PRODUCT_VIEWED]);

            expect(gaSpy.mock.calls[1][1][DEFAULT_OUT_OF_STOCK_METRIC]).toEqual(
              1,
            );
            expect(gaSpy.mock.calls[1][1][DEFAULT_IN_STOCK_METRIC]).toEqual(0);
          });

          it('Should ignore the out of stock metric if is not defined', async () => {
            gaInstance = await createGAInstanceAndLoad(
              {
                ...validOptions,
                productMappings: {
                  isOutOfStock: undefined,
                },
              },
              loadData,
            );

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(validTrackEvents[eventTypes.PRODUCT_VIEWED]);

            expect(
              gaSpy.mock.calls[1][1][DEFAULT_OUT_OF_STOCK_METRIC],
            ).toBeUndefined();
            expect(
              gaSpy.mock.calls[1][1][DEFAULT_IN_STOCK_METRIC],
            ).toBeUndefined();
          });

          it('Should track the default custom metric for the cart value', async () => {
            gaInstance = await createGAInstanceAndLoad(validOptions, loadData);

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(gaSpy.mock.calls[1][1][DEFAULT_CART_VALUE_METRIC]).toEqual(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART].properties
                .price,
            );
          });

          it('Should ignore the cart value metric if is not defined', async () => {
            gaInstance = await createGAInstanceAndLoad(
              {
                ...validOptions,
                productMappings: {
                  cartValue: undefined,
                },
              },
              loadData,
            );

            const gaSpy = getWindowGaSpy();

            await gaInstance.track(
              validTrackEvents[eventTypes.PRODUCT_ADDED_TO_CART],
            );

            expect(
              gaSpy.mock.calls[1][1][DEFAULT_CART_VALUE_METRIC],
            ).toBeUndefined();
          });
        });

        describe('.onSetUser', () => {
          it('Should log an error if the ga instance is not loaded', async () => {
            const options = {
              ...validOptions,
            };

            gaInstance = await createGAInstanceAndLoad(options, loadData);

            const gaSpy = getWindowGaSpy(false);

            await gaInstance.onSetUser();

            expect(mockLoggerError).toHaveBeenCalled();

            expect(gaSpy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
