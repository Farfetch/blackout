import { ANALYTICS_UNIQUE_EVENT_ID } from './utils/constants';
import {
  getContextDefaults,
  LOAD_INTEGRATION_TRACK_TYPE,
  logger,
  ON_SET_USER_TRACK_TYPE,
  StorageWrapper,
} from './utils';
import { Integration } from './integrations';
import { v4 as uuidv4 } from 'uuid';
import Consent from './Consent';
import get from 'lodash/get';
import merge from 'lodash/merge';
import TrackTypes from './types/TrackTypes';
import User from './User';
import type {
  ConsentData,
  ContextData,
  EventContext,
  EventContextData,
  EventData,
  EventProperties,
  ExtendedTrackTypes,
  IntegrationFactory,
  IntegrationOptions,
  IntegrationRuntimeData,
  LoadIntegrationEventData,
  SetUserEventData,
  TrackTypesValues,
  UseContextFn,
  UserData,
  UserTraits,
} from './types/analytics.types';
import type { Storage } from './utils/types';

/**
 * Track user's journey across websites.
 */
class Analytics {
  private isReady: boolean;
  private storage: StorageWrapper | null;
  private contextFns: Array<UseContextFn>;
  private userInstance: User | null;
  private consentInstance: Consent | null;
  private integrations: Map<string, IntegrationRuntimeData>;
  private activeIntegrations: Map<string, IntegrationRuntimeData>;
  private setUserPromiseResolve: ((value?: unknown) => void) | null;
  private setStoragePromiseResolve: ((value?: unknown) => void) | null;
  private setUserPromise: Promise<unknown>;
  private setStoragePromise: Promise<unknown>;

  /**
   * Creates a new Analytics instance with the given platform type. The analytics
   * instance must be created by \@farfetch/blackout-react/analytics or
   * \@farfetch/blackout-react-native/analytics. Each one of the two will properly
   * extend this core to add all functionality needed for web or native,
   * respectively.
   *
   * @param platform - The platform type where the instance is going to be used.
   */
  constructor(private platform?: string) {
    this.isReady = false;
    this.storage = null;
    this.contextFns = [];
    this.userInstance = null;
    this.consentInstance = null;
    this.integrations = new Map();
    this.activeIntegrations = new Map();
    this.setUserPromiseResolve = null;
    this.setStoragePromiseResolve = null;
    this.platform = platform;

    this.setUserPromise = new Promise(resolve => {
      this.setUserPromiseResolve = resolve;
    });

    this.setStoragePromise = new Promise(resolve => {
      this.setStoragePromiseResolve = resolve;
    });
  }

  /**
   * Getter for the consent object.
   *
   * @param key - Key to retrieve from the consent. If not specified, will return the whole data stored
   *              in the consent object.
   *
   * @returns Value for the key in consent or the whole consent data if key is not specified.
   */
  consent(): Promise<ConsentData | null>;
  consent(key: keyof ConsentData): Promise<boolean | null>;
  async consent(key?: keyof ConsentData) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.consent` before a storage was defined with `analytics.setStorage`. Returning null.',
      );
      return null;
    }

    await this.setStoragePromise;

    try {
      const data = await (this.consentInstance && this.consentInstance.get());

      return key ? get(data, key) : data;
    } catch (error) {
      logger.error(
        `An error occurred when trying to get consent data: ${error}`,
      );
      return null;
    }
  }

  /**
   * Getter for the context object.
   *
   * @param key - Key to retrieve from the context. If not specified, will return the whole data stored
   *              in the context.
   *
   * @returns Value for the key in context or the whole context data if key is not specified.
   */
  context(): Promise<ContextData>;
  context(key: string): Promise<unknown>;
  async context(key?: string) {
    const externalContextData = {};

    for (const contextFn of this.contextFns) {
      try {
        const contextFnResult = await contextFn();

        merge(externalContextData, contextFnResult);
      } catch (error) {
        logger.error(
          `An error occurred when trying to execute context function: ${error}`,
        );
      }
    }

    const data = {
      ...externalContextData,
      ...getContextDefaults(),
    };

    return key ? get(data, key) : data;
  }

  /**
   * Returns the integration, if it's loaded.
   *
   * @param name - Name of the integration in lowerCase.
   *
   * @returns The integration instance if it exists and was loaded, otherwise null.
   */
  integration(name: string): Integration<IntegrationOptions> | null {
    return get(this.integrations.get(name), 'instance', null);
  }

  /**
   * Getter for user object.
   *
   * @param key - The key of the user object that is returned.
   *
   * @returns Value for the key in user or the whole user data if key is not specified.
   */
  user(): Promise<UserData | null>;
  user(key: string): Promise<unknown | null>;
  async user(key?: string) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.user` before a storage was defined with `analytics.setStorage`. Returning null.',
      );

      return null;
    }

    await this.setStoragePromise;

    try {
      const data = await (this.userInstance && this.userInstance.get());

      return get(data, key as string, data);
    } catch (error) {
      logger.error(
        `An error occurred when trying to get user value for key '${key}': ${error}. Returning null instead.`,
      );
    }

    return null;
  }

  /**
   * Sets the consent and passes it to the registered integrations.
   *
   * @param data - Consent object to be stored.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async setConsent(data: ConsentData): Promise<this> {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.setConsent` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      await (this.consentInstance && this.consentInstance.set(data));

      const consented = await this.consent();

      // Since this.integrations is a Map instance, we can call Map.prototype.forEach,
      // which returns the value as first parameter
      this.activeIntegrations.forEach(
        item =>
          // Here the cast is safe because when consentInstance.set(data) is called
          // it will always set the consent to an object, even if no data is passed.
          item.instance && item.instance.setConsent(consented as ConsentData),
      );

      await this.loadIntegrations(true);
    } catch (error) {
      logger.error(`An error occurred when trying to set consent: ${error}.`);
    }

    return this;
  }

  /**
   * This method will be called whenever integrations are loaded into analytics. To
   * be overridden by subclasses.
   *
   * @param loadedIntegrations - Array of containing the integrations that were loaded.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  protected async onLoadedIntegrations(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadedIntegrations: IntegrationRuntimeData[],
  ): Promise<void> {
    // Do nothing
  }

  /**
   * [DEPRECATED] - Replaced by useContext.
   *
   * @returns The analytics instance that was used when calling this method to allow chaining.
   */
  setContext(): this {
    logger.error(
      '`analytics.setContext is deprecated. Use analytics.useContext instead. This will be a noop.`',
    );

    return this;
  }

  /**
   * Adds the context function to the array of functions that will provide additional
   * data to be appended to the default context.
   *
   * @param contextFn - A function that will return context data to be appended to the default context.
   *
   * @returns The analytics instance that was used when calling this method to allow chaining.
   */
  useContext(contextFn: UseContextFn): this {
    if (typeof contextFn !== 'function') {
      logger.error(
        'Invalid context argument provided to `analytics.useContext`. You must provide a function.',
      );

      return this;
    }

    this.contextFns.push(contextFn);

    return this;
  }

  /**
   * Sets the storage instance to be used by analytics.
   *
   * @param storage - Storage instance that must support the methods getItem(key), setItem(key, value)
   *                  and removeItem(key).
   * @param localId - Optional string to be used as the user's localId instead of using the one generated
   *                  by analytics internally.
   *
   * @returns The analytics instance that was used when calling this method to allow chaining.
   */
  async setStorage(storage: Storage | null, localId?: string): Promise<this> {
    if (this.isReady) {
      logger.error('Cannot call setStorage after analytics is ready.');

      return Promise.resolve(this);
    }

    let wrappedStorage;

    try {
      wrappedStorage = new StorageWrapper(storage || undefined);
    } catch (e) {
      logger.error(`An error occurred when trying to create storage: ${e}`);
      return Promise.resolve(this);
    }

    this.storage = wrappedStorage;
    await this.storage.createStorage();

    this.userInstance = new User(wrappedStorage);
    await this.userInstance.initialize(localId);

    this.consentInstance = new Consent(wrappedStorage);

    if (this.setStoragePromiseResolve) {
      this.setStoragePromiseResolve();
      this.setStoragePromiseResolve = null;
    }

    return this;
  }

  /**
   * Allows the user to be identified with his ID and other properties.
   *
   * @param userId - Id of the user.
   * @param traits - Properties like name, email, etc of the user.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async setUser(
    userId: UserData['id'] = null,
    traits: UserTraits = {} as UserTraits,
  ): Promise<this> {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.setUser` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      await (this.userInstance && this.userInstance.set(userId, traits));

      if (this.setUserPromiseResolve) {
        this.setUserPromiseResolve();
        this.setUserPromiseResolve = null;
      }

      await this.handleOnUserChanged();
    } catch (error) {
      logger.error(`An error occurred when trying to set user data: ${error}`);
    }

    return this;
  }

  /**
   * Filters valid integrations and loads them for analytics to work with.
   * Integrations passed must be extensions of the abstract class `Integration`.
   *
   * @param name    - Name of the integration.
   * @param Factory - The integration class.
   * @param options - The options passed for the integration.
   *
   * @returns The analytics instance that was used when calling this method to allow chaining.
   */
  addIntegration<N extends IntegrationOptions>(
    name: string,
    Factory: IntegrationFactory<N>,
    options: N,
  ): this {
    const isSubclass = Factory.prototype instanceof Integration;

    if (!isSubclass) {
      logger.error(
        `'${name}' is not a valid integration, so it was not loaded. Please load only valid integrations.`,
      );

      return this;
    }

    this.integrations.set(name, {
      instance: undefined,
      // We have already ensured that options argument is of the correct type
      // by the method signature, so we can perform the cast here safely as the
      // Factory function will be invoked by the same options argument.
      Factory: Factory as IntegrationFactory<IntegrationOptions>,
      options,
      name,
    });

    return this;
  }

  /**
   * Deletes user data.
   *
   * @returns The analytics instance that was used when calling this method to allow chaining.
   */
  async anonymize(): Promise<this> {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.anonymize` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      this.userInstance && this.userInstance.anonymize();

      // Reset the user promise to force all tracks to wait for the next fetch of user data (guest user).
      this.setUserPromise = new Promise(resolve => {
        this.setUserPromiseResolve = resolve;
      });

      await this.handleOnUserChanged();
    } catch (e) {
      logger.error('`An error occurred in analytics.anonymize() call: `' + e);
    }

    return this;
  }

  /**
   * Track method for custom events.
   *
   * @param event        - Name of the event.
   * @param properties   - Properties of the event.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async track(
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ): Promise<this> {
    return await this.trackInternal(
      TrackTypes.TRACK,
      event,
      properties,
      eventContext,
    );
  }

  /**
   * Internal track method used by the public track method. Builds the track object
   * with page default properties on the context.
   *
   * @param type         - Type of event to be tracked.
   * @param event        - Name of the event.
   * @param properties   - Properties of the event.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  protected async trackInternal(
    type: TrackTypesValues = TrackTypes.TRACK,
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ): Promise<this> {
    if (!this.isReady) {
      logger.error(
        `Analytics tried to track the event ${event} but failed. Did you forget to call "analytics.ready()?"`,
      );

      return this;
    }

    if (!event) {
      logger.error(
        "Please provide a valid event name when calling 'analytics.track(eventName, properties)'.",
      );

      return this;
    }

    await this.setUserPromise;

    try {
      const data = await this.getTrackEventData(
        type,
        event,
        properties,
        eventContext,
      );

      this.forEachIntegrationSafe(this.activeIntegrations, integration =>
        integration.track(data),
      );
    } catch (error) {
      logger.error(
        `An error occurred when trying to track event: ${event}: ${error}`,
      );
    }

    return this;
  }

  /**
   * Loads configured integrations that are ready to be loaded. This method will be
   * called after a call to ready or setConsent methods in order to load integrations
   * that are not yet loaded. It's safe to call this method many times.
   *
   * @param raiseOnLoadedIntegrationsEvent - If the onLoadedIntegrations event should be raised by
   *                                         calling `onLoadedIntegrations` or not.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  protected async loadIntegrations(
    raiseOnLoadedIntegrationsEvent: boolean,
  ): Promise<void> {
    const loadedIntegrations: IntegrationRuntimeData[] = [];
    const loadEventData = await this.getLoadEventData();

    const strippedDownAnalytics = {
      createEvent: this.getTrackEventData.bind(this),
    };

    this.integrations.forEach((integration, intName) => {
      // Nothing to do if the instance has already been created
      if (integration.instance) {
        return;
      }

      try {
        const shouldLoad = integration.Factory.shouldLoad(
          loadEventData.consent,
          integration?.options,
        );

        if (!shouldLoad) {
          // Nothing to do as well if the integration shouldn't load
          return;
        }
      } catch (error) {
        logger.error(
          `An error occurred when calling 'shouldLoad' for Integration '${intName}': ${error}`,
        );
        return;
      }

      let instance;

      try {
        instance = integration.Factory.createInstance(
          integration.options,
          loadEventData,
          strippedDownAnalytics,
        );
      } catch (error) {
        logger.error(
          `An error occurred when trying to create an instance for Integration '${intName}': ${error}`,
        );
        return;
      }

      if (!instance) {
        logger.error(
          `The integration '${intName}' did not return an instance in .createInstance() method.`,
        );

        return;
      }

      if (!(instance instanceof Integration)) {
        logger.error(
          `The integration '${intName}' did not return an instance that inherits from 'Integration' class in .createInstance() method.`,
        );

        return;
      }

      integration.instance = instance;

      loadedIntegrations.push(integration);

      // Add instance to active integrations map
      this.activeIntegrations.set(intName, integration);
    });

    if (raiseOnLoadedIntegrationsEvent) {
      await this.onLoadedIntegrations(loadedIntegrations);
    }
  }

  /**
   * Loads the integrations that should be loaded.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async ready(): Promise<this> {
    if (!this.storage) {
      logger.error(
        'No storage instance is available to analytics. Please, call analytics.setStorage() with a valid storage instance',
      );

      return this;
    }

    await this.loadIntegrations(false);

    this.isReady = true;

    return this;
  }

  /**
   * Executes the passed callback for each integration from the integrations
   * parameter, handling any errors.
   *
   * @param integrations - Integrations to traverse.
   * @param callback     - Callback to be executed for each integration.
   */
  protected forEachIntegrationSafe(
    integrations:
      | Map<string, IntegrationRuntimeData>
      | IntegrationRuntimeData[],
    callback: (integration: Integration<IntegrationOptions>) => void,
  ): void {
    if (!integrations || !integrations.forEach) {
      return;
    }

    integrations.forEach(item => {
      try {
        if (!item.instance) {
          return;
        }

        callback(item.instance);
      } catch (e) {
        logger.error(
          `An error occurred for integration: '${item.name}': Unhandled exception: ${e}`,
        );
      }
    });
  }

  /**
   * Resolves the setUser promise which will release any buffered calls to page/track
   * methods and will call `onSetUser` on all integrations if it is ready.
   */
  private async handleOnUserChanged(): Promise<void> {
    // If ready has not been called, do not try to call
    // integrations `onSetUser` method as its instances are
    // not yet created.
    if (!this.isReady) {
      return;
    }

    const data = await this.getSetUserEventData();

    this.forEachIntegrationSafe(this.activeIntegrations, integration =>
      integration.onSetUser(data),
    );
  }

  /**
   * Base function to get event data to be sent to integrations.
   *
   * @param type           - Type of the event, ex: page, track, onSetUser.
   * @param additionalData - Additional data to be added to the final event data.
   * @param eventContext   - Context data that is specific for this event.
   *
   * @returns Data for the event.
   */
  protected async getEventData<T extends ExtendedTrackTypes>(
    type: T,
    additionalData?: Partial<EventData<T>>,
    eventContext?: EventData<T>['context']['event'],
  ): Promise<EventData<T>> {
    const context = (await this.context()) as EventContext;

    Object.assign(context, {
      event: {
        ...eventContext,
        [ANALYTICS_UNIQUE_EVENT_ID]: uuidv4(),
      },
    });

    const commonData: Partial<EventData<T>> = {
      type,
      context: context as EventContext,
      platform: this.platform,
      consent: await this.consent(),
      // This cast is safe because this.user() only returns null when the storage is not set.
      // But when this method is called, the storage is guaranteed to be set.
      user: (await this.user()) as UserData,
      timestamp: new Date().getTime(),
    };

    return {
      ...commonData,
      ...additionalData,
    } as EventData<T>;
  }

  /**
   * Returns event data that will be sent on an 'onSetUser' event.
   *
   * @returns User data to be sent to integrations.
   */
  protected async getSetUserEventData(): Promise<SetUserEventData> {
    return await this.getEventData(ON_SET_USER_TRACK_TYPE, {
      event: ON_SET_USER_TRACK_TYPE,
      properties: {},
    });
  }

  /**
   * Returns event data that will be sent on an 'onSetUser' event.
   *
   * @returns Load data to be sent to integrations.
   */
  protected async getLoadEventData(): Promise<LoadIntegrationEventData> {
    return await this.getEventData(LOAD_INTEGRATION_TRACK_TYPE, {
      event: LOAD_INTEGRATION_TRACK_TYPE,
      properties: {},
    });
  }

  /**
   * Gets event data for a track event.
   *
   * @param type         - Type of the event being called.
   * @param event        - Name of the event from analytics.track call.
   * @param properties   - Event properties from analytics.track call.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns - Track event data to be sent to integrations.
   */
  public async getTrackEventData(
    type: TrackTypesValues,
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ): Promise<EventData<TrackTypesValues>> {
    return await this.getEventData(
      type,
      {
        event,
        properties,
      },
      eventContext,
    );
  }
}

export default Analytics;
