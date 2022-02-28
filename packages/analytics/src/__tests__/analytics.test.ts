import { Integration } from '../integrations';
import { logger, PACKAGE_NAME } from '../utils';
import Analytics from '../';
import eventTypes from '../types/eventTypes';
import pageTypes from '../types/pageTypes';
import TestStorage from 'test-storage';
import trackTypes from '../types/trackTypes';
import type { IntegrationFactory } from '../integrations/Integration';
import type { Storage } from '../utils/types';
import type StorageWrapper from '../utils/StorageWrapper';

// Workaround to mock Date class
global.Date = class MockDate {
  constructor() {
    this.getTime = jest.fn();
  }
};

class MyIntegration extends Integration {
  static createInstance(options?: Record<string, unknown>) {
    return new MyIntegration(options);
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class NullInstanceIntegration extends Integration {
  static createInstance() {
    return null;
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class NoIntegrationInstanceIntegration extends Integration {
  static createInstance() {
    return String('test');
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class DefaultCreateInstanceIntegration extends Integration {
  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class CreateInstanceThrowsIntegration extends Integration {
  static createInstance() {
    throw new Error('error');
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class NotLoadableIntegration extends Integration {
  static shouldLoad() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

class ErrorIntegration extends Integration {
  static shouldLoad() {
    return true;
  }

  static createInstance() {
    return new ErrorIntegration();
  }

  track() {
    throw new Error('track error');
  }

  onSetUser() {
    throw new Error('onSetUser error');
  }
}

class StatisticsConsentRequiredIntegration extends Integration {
  static shouldLoad(consent: Record<string, unknown>) {
    return !!consent && !!consent.statistics;
  }

  static createInstance(options: Record<string, unknown>) {
    return new StatisticsConsentRequiredIntegration(options);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  track(data: Record<string, unknown>): void {}
}

// Mock logger so it does not output to the console
jest.mock('@farfetch/blackout-client/helpers', () => ({
  ...jest.requireActual('@farfetch/blackout-client/helpers'),
  Logger: class {
    warn(message: string) {
      return message;
    }
    error(message: string) {
      return message;
    }
  },
}));

const loggerErrorSpy = jest.spyOn(logger, 'error');

let analytics: Analytics;

/**
 *
 */
async function setupAnalyticsWithFaultyStorage() {
  analytics.isReady = false;

  const faultyStorage = new TestStorage();
  analytics.setStorage(faultyStorage);
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
      analytics.storage = null;
      analytics.isReady = false;
    });

    it('should log an error if calling `analytics.ready` before setting storage with `analytics.setStorage`', async () => {
      await analytics.ready();

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'No storage instance is available to analytics. Please, call analytics.setStorage() with a valid storage instance',
      );
    });

    it('should log an error if calling `analytics.setStorage` with an invalid value', () => {
      analytics.setStorage(null);

      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'An error occurred when trying to create storage: Error: StorageWrapper needs a valid storage to properly persist data. Please make sure you are passing a valid storage.',
      );
    });

    it('should log an error if `analytics.ready` is called before `analytics.setStorage', async () => {
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
      analytics.setStorage(new TestStorage());

      await analytics.ready();

      // Clear any possible error messages that might have been raised before.
      loggerErrorSpy.mockClear();

      // Call setStorage again with a new storage instance.
      analytics.setStorage(new TestStorage());

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
      await analytics.setUser('123456', {});

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

  describe('When storage is set in analytics', () => {
    let storage: Storage;

    beforeAll(async () => {
      analytics.isReady = false;

      storage = new TestStorage();

      analytics.setStorage(storage);

      await Promise.resolve(true);
    });

    beforeEach(() => {
      storage.clear();
    });

    describe('When user is not set in analytics', () => {
      it('Should buffer calls to track method and execute them when setUser is called', async () => {
        await analytics.addIntegration('myIntegration', MyIntegration).ready();

        const integrationInstance = analytics.integration(
          'myIntegration',
        ) as Integration;
        const spyTrack = jest.spyOn(integrationInstance, 'track');

        analytics.track(trackTypes.PAGE, pageTypes.HOMEPAGE);

        analytics.track('event', 'myEvent');

        expect(spyTrack).not.toBeCalled();

        await analytics.setUser('123456');

        expect(spyTrack).toBeCalledTimes(2);
      });
    });

    describe('When user is set in analytics', () => {
      beforeAll(async () => {
        await analytics.setUser('123456'); // We need to call setUser in order for the internal setUserPromise to be resolved
      });

      beforeEach(() => {
        analytics.integrations.clear();
        analytics.isReady = false;
        const testStorageInstance = new TestStorage();

        analytics.setStorage(testStorageInstance);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newContext = { prop1: 'A', prop2: 'B' } as any;

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
          const previousContextFns = analytics.contextFns;

          analytics.contextFns = [];

          analytics.useContext(() => {
            throw new Error('Dummy error');
          });

          const contextData = { prop1: 'value1' };

          analytics.useContext(() => contextData);

          const result = await analytics.context();

          // Restore context functions in order to not break the tests that follow.
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

          let consented = await analytics.consent();

          expect(consented).toMatchObject(data);

          // Test getter with key
          consented = await analytics.consent('marketing');
          expect(consented).toBe(data.marketing);
        });

        it('Should store the consent in the storage', async () => {
          const consentData = {
            marketing: true,
          };

          const consentDataSet = {
            marketing: true,
            preferences: false,
            statistics: false,
          };

          const spyStorageSetItem = jest.spyOn(
            analytics.storage as StorageWrapper,
            'setItem',
          );

          await analytics.setConsent(consentData);

          expect(spyStorageSetItem).toHaveBeenCalledWith(
            'consent',
            consentDataSet,
          );
        });

        it('Should pass consent object to registered integrations', async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration)
            .ready();

          const spy = jest.spyOn(MyIntegration.prototype, 'setConsent');
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
            .addIntegration(
              'invalidIntegration',
              InvalidIntegration as unknown as IntegrationFactory,
            )
            .ready();

          expect(analytics.integrations.size).toBe(0);

          analytics.addIntegration('myIntegration', MyIntegration);

          await analytics.ready();

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
              CreateInstanceThrowsIntegration as unknown as IntegrationFactory,
            )
            .ready();

          expect(loggerErrorSpy).toBeCalled();

          expect(
            analytics.integration('createInstanceThrowsIntegration'),
          ).toBeNull();
        });

        it('Should log an error when an integration`s createInstance method returns null', async () => {
          await analytics
            .addIntegration(
              'nullInstanceIntegration',
              NullInstanceIntegration as unknown as IntegrationFactory,
            )
            .ready();

          expect(loggerErrorSpy).toBeCalledTimes(1);

          expect(analytics.integration('nullInstanceIntegration')).toBeNull();
        });

        it('Should log an error when an integration`s createInstance method returns an instance that does not inherit Integration class', async () => {
          await analytics
            .addIntegration(
              'noIntegrationInstanceIntegration',
              NoIntegrationInstanceIntegration as unknown as IntegrationFactory,
            )
            .addIntegration(
              'defaultCreateInstanceIntegration',
              DefaultCreateInstanceIntegration as unknown as IntegrationFactory,
            )
            .ready();

          expect(loggerErrorSpy).toBeCalledTimes(2);

          expect(
            analytics.integration('noIntegrationInstanceIntegration'),
          ).toBeNull();

          expect(
            analytics.integration('defaultCreateInstanceIntegration'),
          ).toBeNull();
        });

        it('Should return a integration by name', async () => {
          const myIntegration = new MyIntegration();
          const name = 'myIntegration';

          await analytics.addIntegration(name, MyIntegration).ready();

          expect(analytics.integration(name)).toEqual(myIntegration);
        });

        it('Should call `onLoadedIntegrations()` when calling loadIntegrations(true)', async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration)
            .ready();

          const onLoadedIntegrationsSpy = jest.spyOn(
            analytics,
            'onLoadedIntegrations',
          );

          await analytics.loadIntegrations(true);

          expect(onLoadedIntegrationsSpy).toBeCalled();
        });
      });

      describe('User', () => {
        it("Should return user's data", async () => {
          const userId = '1';
          const traits = { isGuest: false };

          await analytics.setUser(userId, traits);

          const userData = (await analytics.user()) as Record<string, unknown>;

          expect(userData['id']).toEqual(userId);
          expect(userData['traits']).toEqual(traits);
        });

        it("Should return user's empty data structure if there's no data on storage", async () => {
          const currentLocalId = (
            (await analytics.user()) as Record<string, unknown>
          ).localId;

          await analytics.anonymize();

          const sameLocalId = (
            (await analytics.user()) as Record<string, unknown>
          ).localId;

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

          let user = (await analytics.user()) as Record<string, unknown>;
          expect(user.id).toBeNull();
          expect(user.traits).toMatchObject({});
          expect(user.localId).not.toBeNull();

          const userId = '12345678';
          const traits = {
            name: 'Foo',
            email: 'foo.bar@foo.bar',
          };

          await analytics.setUser(userId, traits);

          user = (await analytics.user()) as Record<string, unknown>;

          expect(user.id).toEqual(userId);
          expect(user.traits).toEqual(traits);
          expect(user.localId).not.toBeNull();
        });

        it('Should anonymize an user', async () => {
          await analytics.setUser('12345678', { name: 'Dummy' });

          const currentLocalId = (
            (await analytics.user()) as Record<string, unknown>
          ).localId;

          await analytics.anonymize();

          const sameLocalId = (
            (await analytics.user()) as Record<string, unknown>
          ).localId;

          expect(currentLocalId).toEqual(sameLocalId);

          expect(await analytics.user()).toMatchObject({
            id: null,
            traits: {},
          });
        });

        it('Should log an error message if setUser method throws', async () => {
          await setupAnalyticsWithFaultyStorage();

          await analytics.setUser('12', { isGuest: false });

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
            .addIntegration('integration1', MyIntegration)
            .addIntegration('integration2', MyIntegration);

          await analytics.ready();

          const spyIntegration1 = jest.spyOn(
            analytics.integration('integration1') as Integration,
            'onSetUser',
          );

          const spyIntegration2 = jest.spyOn(
            analytics.integration('integration2') as Integration,
            'onSetUser',
          );

          const userId = '12345678';
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
            .addIntegration('errorIntegration', ErrorIntegration)
            .addIntegration('myIntegration', MyIntegration)
            .ready();

          const spy = jest.spyOn(
            analytics.integration('myIntegration') as Integration,
            'onSetUser',
          );

          await analytics.setUser('123456');

          expect(loggerErrorSpy).toBeCalled();
          expect(spy).toBeCalled();
        });

        it('Should successfully handle when an integration`s onSetUser implementation throws', async () => {
          await analytics
            .addIntegration('errorIntegration', ErrorIntegration)
            .addIntegration('myIntegration', MyIntegration)
            .ready();

          const spy = jest.spyOn(
            analytics.integration('myIntegration') as Integration,
            'onSetUser',
          );

          await analytics.setUser('123456');

          expect(loggerErrorSpy).toBeCalled();

          expect(spy).toBeCalled();
        });
      });

      describe('Track', () => {
        beforeEach(async () => {
          await analytics
            .addIntegration('myIntegration', MyIntegration)
            .ready();
        });

        it('Should not track an event if the event name is not passed', async () => {
          const spyTrack = jest.spyOn(
            analytics.integration('myIntegration') as Integration,
            'track',
          );

          const event = undefined;
          const properties = {
            productId: 123123,
          };

          await analytics.track(
            undefined,
            event as unknown as string,
            properties,
          );

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
            timestamp: new Date().getTime(),
          };

          const spyIntegration = jest.spyOn(MyIntegration.prototype, 'track');

          await analytics.track(
            trackTypes.TRACK,
            event,
            properties,
            eventContext,
          );

          expect(spyIntegration).toBeCalledWith(data);
        });

        it("Should log an error if analytics is not ready and not call any integration's track method", async () => {
          analytics.isReady = false;

          const spyTrack = jest.spyOn(
            analytics.integration('myIntegration') as Integration,
            'track',
          );

          await analytics.track(trackTypes.TRACK, eventTypes.PRODUCT_CLICKED);

          expect(loggerErrorSpy).toBeCalled();

          expect(spyTrack).not.toBeCalled();
        });
      });

      describe('Ready', () => {
        beforeEach(() => {
          analytics.integrations.clear();
          analytics.isReady = false;
        });

        it("Should load an integration if it's ready to load", async () => {
          analytics.addIntegration('myIntegration', MyIntegration);

          expect(analytics.integrations.size).toBe(1);

          let myIntegrationInstance = analytics.integration('myIntegration');

          expect(myIntegrationInstance).toBeNull();

          await analytics.ready();

          myIntegrationInstance = analytics.integration(
            'myIntegration',
          ) as Integration;

          const spyTrack = jest.spyOn(myIntegrationInstance, 'track');

          expect(myIntegrationInstance).toBeInstanceOf(MyIntegration);

          await analytics.track(trackTypes.PAGE, pageTypes.HOMEPAGE);
          await analytics.track(trackTypes.TRACK, eventTypes.PRODUCT_CLICKED);

          expect(spyTrack).toBeCalled();
        });

        it("Should not load an integration if it's not ready to load", async () => {
          analytics.addIntegration(
            'notLoadableIntegration',
            NotLoadableIntegration as unknown as IntegrationFactory,
          );

          expect(analytics.integrations.size).toBe(1);

          expect(analytics.integration('notLoadableIntegration')).toBeNull();

          await analytics.ready();

          expect(analytics.integration('notLoadableIntegration')).toBeNull();
        });

        it('Should handle integration errors', async () => {
          await analytics
            .addIntegration('errorIntegration', ErrorIntegration)
            .addIntegration('myIntegration', MyIntegration)
            .ready();

          const spyTrack = jest.spyOn(
            analytics.integration('myIntegration') as Integration,
            'track',
          );

          await analytics.track(trackTypes.PAGE, pageTypes.HOMEPAGE);

          expect(spyTrack).toBeCalled();

          await analytics.track(trackTypes.TRACK, eventTypes.PRODUCT_CLICKED);

          expect(loggerErrorSpy).toBeCalled();
          expect(spyTrack).toBeCalled();
        });
      });
    });
  });
});
