import { Integration } from '../integrations';
import { logger } from '../utils';
import { PACKAGE_NAME } from '../utils/constants';
import Analytics from '../';
import eventTypes from '../types/eventTypes';
import pageTypes from '../types/pageTypes';
import TestStorage from 'test-storage';
import trackTypes from '../types/trackTypes';
import type {
  ConsentData,
  IntegrationOptions,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  UserData,
} from '../types/analytics.types';
import type { Storage } from '../utils/types';

// Example integration that overrides the createInstance method
class MyIntegration<T extends IntegrationOptions> extends Integration<T> {
  static override createInstance<Options extends IntegrationOptions>(
    options: Options,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ) {
    return new MyIntegration(options, loadData, strippedDownAnalytics);
  }

  static override shouldLoad() {
    return true;
  }

  override track(): void {
    // Do nothing
  }
}

// @ts-expect-error This expect error is needed so that we can test the createInstance method returning an invalid value type.
class NullInstanceIntegration extends Integration<IntegrationOptions> {
  static override createInstance() {
    return null;
  }

  static override shouldLoad() {
    return true;
  }

  override track(): void {
    // Do nothing
  }
}

// @ts-expect-error This expect error is needed so that we can test the createInstance method returning an invalid value type.
class NoIntegrationInstanceIntegration extends Integration<IntegrationOptions> {
  static override createInstance() {
    return String('test');
  }

  static override shouldLoad() {
    return true;
  }

  override track(): void {
    // Do nothing
  }
}

class CreateInstanceThrowsIntegration extends Integration<IntegrationOptions> {
  static override createInstance(): never {
    throw new Error('error');
  }

  static override shouldLoad() {
    return true;
  }

  override track(): void {
    // Do nothing
  }
}

class NotLoadableIntegration extends Integration<IntegrationOptions> {
  static override shouldLoad() {
    return false;
  }

  override track(): void {
    // Do nothing
  }
}

class ErrorIntegration extends Integration<IntegrationOptions> {
  static override shouldLoad() {
    return true;
  }

  override track() {
    throw new Error('track error');
  }

  override onSetUser() {
    throw new Error('onSetUser error');
  }
}

class StatisticsConsentRequiredIntegration extends Integration<IntegrationOptions> {
  static override shouldLoad(consent: ConsentData) {
    return !!consent && !!consent.statistics;
  }

  override track(): void {
    // Do nothing
  }
}

const loggerErrorSpy = jest
  .spyOn(logger, 'error')
  .mockImplementation(message => message);

let analytics: Analytics;

/**
 *
 */
async function setupAnalyticsWithFaultyStorage() {
  // @ts-expect-error
  analytics.isReady = false;

  const faultyStorage = new TestStorage();
  await analytics.setStorage(faultyStorage);
  await analytics.ready();

  loggerErrorSpy.mockClear();

  faultyStorage.getItem = jest.fn(() => {
    throw new Error('Dummy storage error');
  });
}

describe('analytics', () => {
  beforeAll(() => {
    analytics = new Analytics();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When storage is not set in analytics', () => {
    beforeEach(() => {
      // @ts-expect-error
      analytics.storage = null;
      // @ts-expect-error
      analytics.isReady = false;
    });

    it('should log an error if calling `analytics.ready` before setting storage with `analytics.setStorage`', async () => {
      await analytics.ready();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'No storage instance is available to analytics. Please, call analytics.setStorage() with a valid storage instance',
      );
    });

    it('should log an error if calling `analytics.setStorage` with an invalid value', async () => {
      await analytics.setStorage(null);

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'An error occurred when trying to create storage: Error: StorageWrapper needs a valid storage to properly persist data. Please make sure you are passing a valid storage.',
      );
    });

    it('should log an error if `analytics.ready` is called before `analytics.setStorage', async () => {
      // @ts-expect-error
      const loadIntegrationsSpy = jest.spyOn(analytics, 'loadIntegrations');

      await analytics.ready();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'No storage instance is available to analytics. Please, call analytics.setStorage() with a valid storage instance',
      );
      expect(loadIntegrationsSpy).not.toBeCalled();
    });

    it('should log an error if calling `analytics.setStorage` after `analytics.ready` is called', async () => {
      // Set storage before ready is called in order for ready to succeed.
      await analytics.setStorage(new TestStorage());

      await analytics.ready();

      // Clear any possible error messages that might have been raised before.
      loggerErrorSpy.mockClear();

      // Call setStorage again with a new storage instance.
      await analytics.setStorage(new TestStorage());

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Cannot call setStorage after analytics is ready.',
        ),
      );
    });

    it('should log an error when calling `analytics.user`', async () => {
      const userData = await analytics.user();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Tried to call `analytics.user` before a storage was defined',
        ),
      );

      expect(userData).toBeNull();
    });

    it('should log an error when calling `analytics.consent`', async () => {
      const consentData = await analytics.consent();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Tried to call `analytics.consent` before a storage was defined',
        ),
      );

      expect(consentData).toBeNull();
    });

    it('should log an error when calling `analytics.setUser`', async () => {
      await analytics.setUser(123456, {});

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Tried to call `analytics.setUser` before a storage was defined',
        ),
      );
    });

    it('should log an error when calling `analytics.setConsent`', async () => {
      await analytics.setConsent({
        marketing: true,
        statistics: false,
        preferences: false,
      });

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Tried to call `analytics.setConsent` before a storage was defined with `analytics.setStorage`. This will be a noop.',
        ),
      );
    });

    it('should log an error when calling `analytics.anonymize`', () => {
      analytics.anonymize();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining(
          'Tried to call `analytics.anonymize` before a storage was defined',
        ),
      );
    });
  });

  it('Should allow to set localId through setStorage', async () => {
    // @ts-expect-error
    analytics.isReady = false;

    const externalLocalId = '273a7d4d-e801-4a64-a016-517367eae76a';

    await analytics.setStorage(new TestStorage(), externalLocalId);

    const localId = await analytics.user('localId');

    expect(localId).toBe(externalLocalId);
  });

  describe('When storage is set in analytics', () => {
    let storage: Storage;

    beforeAll(async () => {
      // @ts-expect-error
      analytics.isReady = false;

      storage = new TestStorage();

      await analytics.setStorage(storage);
    });

    beforeEach(() => {
      storage.clear();
    });

    describe('When user is not set in analytics', () => {
      it('Should buffer calls to track method and execute them when setUser is called', async () => {
        await analytics
          .addIntegration('myIntegration', MyIntegration, {})
          .ready();

        const integrationInstance = analytics.integration(
          'myIntegration',
        ) as MyIntegration<IntegrationOptions>;
        const spyTrack = jest.spyOn(integrationInstance, 'track');

        // @ts-expect-error
        analytics.trackInternal(trackTypes.PAGE, pageTypes.HOMEPAGE);

        analytics.track('myEvent');

        expect(spyTrack).not.toBeCalled();

        await analytics.setUser(123456);

        expect(spyTrack).toBeCalledTimes(2);
      });
    });

    describe('When user is set in analytics', () => {
      beforeAll(async () => {
        await analytics.setUser(123456); // We need to call setUser in order for the internal setUserPromise to be resolved
      });

      beforeEach(async () => {
        // @ts-expect-error
        analytics.integrations.clear();
        // @ts-expect-error
        analytics.isReady = false;
        const testStorageInstance = new TestStorage();

        await analytics.setStorage(testStorageInstance);
      });

      describe('Context', () => {
        it('Should allow the user to add context data through `useContext` method', async () => {
          const data = {
            tenantId: 10000,
            clientId: 10003,
            country: 'US',
            currency: 'USD',
            culture: 'en-US',
            // The following properties are generated by Context - No need to pass them
            timestamp: new Date().getTime(),
            userAgent: global.navigator.userAgent,
            library: {
              name: PACKAGE_NAME,
            },
          };

          analytics.useContext(() => data);

          expect(await analytics.context()).toMatchObject(data);
          // Test getter with key
          expect(await analytics.context('tenantId')).toEqual(data.tenantId);
        });

        it('Should log an error if useContext is used with incorrect arguments', async () => {
          const newContext = { prop1: 'A', prop2: 'B' };

          // @ts-expect-error
          analytics.useContext(newContext);

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            expect.stringContaining(
              'Invalid context argument provided to `analytics.useContext`',
            ),
          );

          const context = await analytics.context();

          expect(context).not.toEqual(expect.objectContaining(newContext));
        });

        it('Should log an error when calling `analytics.setContext`', () => {
          analytics.setContext();

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            expect.stringContaining('analytics.setContext is deprecated'),
          );
        });

        it('should log an error and not prevent execution of next context functions on the chain when a context function throws', async () => {
          // Save previously set context functions in order to restore them after the test
          // @ts-expect-error
          const previousContextFns = analytics.contextFns;

          // @ts-expect-error
          analytics.contextFns = [];

          analytics.useContext(() => {
            throw new Error('Dummy error');
          });

          const contextData = { prop1: 'value1' };

          analytics.useContext(() => contextData);

          const result = await analytics.context();

          // Restore context functions in order to not break the tests that follow.
          // @ts-expect-error
          analytics.contextFns = previousContextFns;

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            'An error occurred when trying to execute context function: Error: Dummy error',
          );

          expect(result).toEqual(expect.objectContaining(contextData));
        });
      });

      describe('Consent', () => {
        it('Should get and set the consent object', async () => {
          const data = {
            marketing: true,
            statistics: true,
            preferences: false,
          };

          await analytics.setConsent(data);

          const consentData = await analytics.consent();

          expect(consentData).toMatchObject(data);

          // Test getter with key
          const marketingConsent = await analytics.consent('marketing');
          expect(marketingConsent).toBe(data.marketing);
        });

        it('Should store the consent in the storage', async () => {
          const consentData = {
            marketing: true,
          };

          const consentDataSet = {
            marketing: true,
          };

          // @ts-expect-error
          const spyStorageSetItem = jest.spyOn(analytics.storage, 'setItem');

          await analytics.setConsent(consentData);

          expect(spyStorageSetItem).toHaveBeenCalledWith(
            'consent',
            consentDataSet,
          );
        });

        it('Should pass consent object to registered integrations', async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();

          const spy = jest.spyOn(MyIntegration.prototype, 'setConsent');
          // @ts-expect-error
          const loadIntegrationsSpy = jest.spyOn(analytics, 'loadIntegrations');
          const data = {
            marketing: false,
            statistics: false,
            preferences: true,
          };

          await analytics.setConsent(data);

          expect(loadIntegrationsSpy).toBeCalledWith(true);

          expect(spy).toBeCalledWith(data);
        });

        it('Should load integrations after required consent has been given', async () => {
          await analytics
            .addIntegration(
              'statisticsConsentRequiredIntegration',
              StatisticsConsentRequiredIntegration,
              {},
            )
            .ready();

          expect(
            analytics.integration('statisticsConsentRequiredIntegration'),
          ).toBeNull();

          await analytics.setConsent({
            statistics: true,
          });

          expect(
            analytics.integration('statisticsConsentRequiredIntegration'),
          ).not.toBeNull();
        });

        it('Should log an error message if the setConsent method throws', async () => {
          await setupAnalyticsWithFaultyStorage();

          await analytics.setConsent({ statistics: true });

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            'An error occurred when trying to set consent: Error: Dummy storage error.',
          );
        });

        it('Should log an error message if the consent method throws', async () => {
          await setupAnalyticsWithFaultyStorage();

          await analytics.consent();

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            'An error occurred when trying to get consent data: Error: Dummy storage error',
          );
        });
      });

      describe('Integrations', () => {
        it('Should only load valid integrations', async () => {
          class InvalidIntegration {
            track() {
              return true;
            }
          }

          await analytics
            // @ts-expect-error
            .addIntegration('invalidIntegration', InvalidIntegration)
            .ready();

          // @ts-expect-error
          expect(analytics.integrations.size).toBe(0);

          analytics.addIntegration('myIntegration', MyIntegration, {});

          await analytics.ready();

          // @ts-expect-error
          expect(analytics.integrations.size).toBe(1);
          expect(analytics.integration('myIntegration')).toBeInstanceOf(
            MyIntegration,
          );

          expect(loggerErrorSpy).toBeCalledTimes(1);
        });

        it('Should log an error when an integration`s createInstance method throws', async () => {
          await analytics
            .addIntegration(
              'createInstanceThrowsIntegration',
              CreateInstanceThrowsIntegration,
              {},
            )
            .ready();

          expect(loggerErrorSpy).toBeCalled();

          expect(
            analytics.integration('createInstanceThrowsIntegration'),
          ).toBeNull();
        });

        it('Should log an error when an integration`s createInstance method returns null', async () => {
          await analytics
            // @ts-expect-error
            .addIntegration('nullInstanceIntegration', NullInstanceIntegration)
            .ready();

          expect(loggerErrorSpy).toBeCalledTimes(1);

          expect(analytics.integration('nullInstanceIntegration')).toBeNull();
        });

        it('Should log an error when an integration`s createInstance method returns an instance that does not inherit Integration class', async () => {
          await analytics
            .addIntegration(
              'noIntegrationInstanceIntegration',
              // @ts-expect-error
              NoIntegrationInstanceIntegration,
              {},
            )
            .ready();

          expect(loggerErrorSpy).toBeCalledTimes(1);

          expect(
            analytics.integration('noIntegrationInstanceIntegration'),
          ).toBeNull();
        });

        it('Should return a integration by name', async () => {
          const name = 'myIntegration';

          await analytics.addIntegration(name, MyIntegration, {}).ready();

          expect(analytics.integration(name)).toBeInstanceOf(MyIntegration);
        });

        it('Should call `onLoadedIntegrations()` when calling loadIntegrations(true)', async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();

          const onLoadedIntegrationsSpy = jest.spyOn(
            analytics,
            // @ts-expect-error
            'onLoadedIntegrations',
          );

          // @ts-expect-error
          await analytics.loadIntegrations(true);

          expect(onLoadedIntegrationsSpy).toBeCalled();
        });
      });

      describe('User', () => {
        it("Should return user's data", async () => {
          const userId = 1;
          const traits = { isGuest: false };

          await analytics.setUser(userId, traits);

          const userData = (await analytics.user()) as UserData;

          expect(userData['id']).toEqual(userId);
          expect(userData['traits']).toEqual(traits);
        });

        it("Should return user's empty data structure if there's no data on storage", async () => {
          const currentLocalId = ((await analytics.user()) as UserData).localId;

          await analytics.anonymize();

          const sameLocalId = ((await analytics.user()) as UserData).localId;

          expect(currentLocalId).toEqual(sameLocalId);

          storage.clear();

          expect(await analytics.user()).toMatchObject({
            id: null,
            traits: {},
            localId: currentLocalId,
          });
        });

        it('Should identify an user with its data', async () => {
          await analytics.setUser();

          let user = (await analytics.user()) as UserData;
          expect(user.id).toBeNull();
          expect(user.traits).toMatchObject({});
          expect(user.localId).not.toBeNull();

          const userId = 12345678;
          const traits = {
            name: 'Foo',
            email: 'foo.bar@foo.bar',
          };

          await analytics.setUser(userId, traits);

          user = (await analytics.user()) as UserData;

          expect(user.id).toEqual(userId);
          expect(user.traits).toEqual(traits);
          expect(user.localId).not.toBeNull();
        });

        it('Should anonymize an user', async () => {
          await analytics.setUser(12345678, { name: 'Dummy' });

          const currentLocalId = ((await analytics.user()) as UserData).localId;

          await analytics.anonymize();

          const sameLocalId = ((await analytics.user()) as UserData).localId;

          expect(currentLocalId).toEqual(sameLocalId);

          expect(await analytics.user()).toMatchObject({
            id: null,
            traits: {},
          });
        });

        it('Should log an error message if setUser method throws', async () => {
          await setupAnalyticsWithFaultyStorage();

          await analytics.setUser(12, { isGuest: false });

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            'An error occurred when trying to set user data: Error: Dummy storage error',
          );
        });

        it('Should log an error message if user method throws', async () => {
          await setupAnalyticsWithFaultyStorage();

          await analytics.user();

          expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerErrorSpy).toBeCalledWith(
            "An error occurred when trying to get user value for key 'undefined': Error: Dummy storage error. Returning null instead.",
          );
        });
      });

      describe('onSetUser', () => {
        it("Should be called on all integrations when analytics's setUser is called", async () => {
          analytics
            .addIntegration('integration1', MyIntegration, {})
            .addIntegration('integration2', MyIntegration, {});

          await analytics.ready();

          const spyIntegration1 = jest.spyOn(
            analytics.integration(
              'integration1',
            ) as MyIntegration<IntegrationOptions>,
            'onSetUser',
          );

          const spyIntegration2 = jest.spyOn(
            analytics.integration(
              'integration2',
            ) as MyIntegration<IntegrationOptions>,
            'onSetUser',
          );

          const userId = 12345678;
          const traits = {
            name: 'Foo',
            email: 'foo.bar@foo.bar',
          };

          await analytics.setUser(userId, traits);

          expect(spyIntegration1).toBeCalled();
          expect(spyIntegration2).toBeCalled();
        });

        it('Should successfully handle when an integration`s onSetUser implementation throws', async () => {
          await analytics
            .addIntegration('errorIntegration', ErrorIntegration, {})
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();

          const spy = jest.spyOn(
            analytics.integration(
              'myIntegration',
            ) as MyIntegration<IntegrationOptions>,
            'onSetUser',
          );

          await analytics.setUser(123456);

          expect(loggerErrorSpy).toBeCalled();
          expect(spy).toBeCalled();
        });

        it('Should successfully handle when an integration`s onSetUser implementation throws', async () => {
          await analytics
            .addIntegration('errorIntegration', ErrorIntegration, {})
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();

          const spy = jest.spyOn(
            analytics.integration(
              'myIntegration',
            ) as MyIntegration<IntegrationOptions>,
            'onSetUser',
          );

          await analytics.setUser(123456);

          expect(loggerErrorSpy).toBeCalled();

          expect(spy).toBeCalled();
        });
      });

      describe('Track', () => {
        beforeEach(async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();
        });

        it('Should not track an event if the event name is not passed', async () => {
          const spyTrack = jest.spyOn(
            analytics.integration(
              'myIntegration',
            ) as MyIntegration<IntegrationOptions>,
            'track',
          );

          const event = undefined;
          const properties = {
            productId: 123123,
          };

          // @ts-expect-error
          await analytics.track(event, properties);

          expect(loggerErrorSpy).toBeCalledTimes(1);
          expect(spyTrack).not.toBeCalled();
        });

        it('Should track an event and pass the information to integrations', async () => {
          const event = 'myEvent';
          const properties = {
            productId: 123123,
          };
          const eventContext = { culture: 'pt-PT' }; // Simulate that the event has a different culture associated with it.
          const context = await analytics.context();

          Object.assign(context, {
            event: eventContext,
          });

          const data = {
            type: trackTypes.TRACK,
            event,
            properties,
            context,
            user: await analytics.user(),
            consent: await analytics.consent(),
            timestamp: expect.any(Number),
          };

          const spyIntegration = jest.spyOn(MyIntegration.prototype, 'track');

          await analytics.track(event, properties, eventContext);

          expect(spyIntegration).toBeCalledWith(data);
        });

        it("Should log an error if analytics is not ready and not call any integration's track method", async () => {
          // @ts-expect-error
          analytics.isReady = false;

          const spyTrack = jest.spyOn(
            analytics.integration(
              'myIntegration',
            ) as MyIntegration<IntegrationOptions>,
            'track',
          );

          await analytics.track(eventTypes.PRODUCT_CLICKED);

          expect(loggerErrorSpy).toBeCalled();

          expect(spyTrack).not.toBeCalled();
        });
      });

      describe('Ready', () => {
        beforeEach(() => {
          // @ts-expect-error
          analytics.integrations.clear();
          // @ts-expect-error
          analytics.isReady = false;
        });

        it("Should load an integration if it's ready to load", async () => {
          analytics.addIntegration('myIntegration', MyIntegration, {});

          // @ts-expect-error
          expect(analytics.integrations.size).toBe(1);

          let myIntegrationInstance = analytics.integration('myIntegration');

          expect(myIntegrationInstance).toBeNull();

          await analytics.ready();

          myIntegrationInstance = analytics.integration(
            'myIntegration',
          ) as MyIntegration<IntegrationOptions>;

          const spyTrack = jest.spyOn(myIntegrationInstance, 'track');

          expect(myIntegrationInstance).toBeInstanceOf(MyIntegration);

          // @ts-expect-error
          await analytics.track(trackTypes.PAGE, pageTypes.HOMEPAGE);
          await analytics.track(eventTypes.PRODUCT_CLICKED);

          expect(spyTrack).toBeCalled();
        });

        it("Should not load an integration if it's not ready to load", async () => {
          analytics.addIntegration(
            'notLoadableIntegration',
            NotLoadableIntegration,
            {},
          );

          // @ts-expect-error
          expect(analytics.integrations.size).toBe(1);

          expect(analytics.integration('notLoadableIntegration')).toBeNull();

          await analytics.ready();

          expect(analytics.integration('notLoadableIntegration')).toBeNull();
        });

        it('Should handle integration errors', async () => {
          await analytics
            .addIntegration('errorIntegration', ErrorIntegration, {})
            .addIntegration('myIntegration', MyIntegration, {})
            .ready();

          const spyTrack = jest.spyOn(
            analytics.integration(
              'myIntegration',
            ) as MyIntegration<IntegrationOptions>,
            'track',
          );

          // @ts-expect-error
          await analytics.trackInternal(trackTypes.PAGE, pageTypes.HOMEPAGE);

          expect(spyTrack).toBeCalled();

          await analytics.track(eventTypes.PRODUCT_CLICKED);

          expect(loggerErrorSpy).toBeCalled();
          expect(spyTrack).toBeCalled();
        });
      });
    });
  });
});
