import { getContextDefaults, logger, StorageWrapper } from './utils';
import { Integration } from './integrations';
import Consent from './Consent';
import get from 'lodash/get';
import merge from 'lodash/merge';
import trackTypes from './types/trackTypes';
import User from './User';

// @TODO: evaluate this TS rule
/* eslint-disable  @typescript-eslint/no-empty-function */

/**
 * Track user's journey across websites.
 *
 * @category Analytics
 */
class Analytics {
  /**
   * Creates a new Analytics instance with the given platform type.
   * The analytics instance must be created by @farfetch/blackout-react/analytics or @farfetch/blackout-react-native/analytics.
   * Each one of the two will properly extend this core to add all functionality needed for web or native, respectively.
   *
   * @param {module:platformTypes} platform - The platform type where the instance is going to be used.
   */
  constructor(platform) {
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
   * @param {string} [key] - Key to retrieve from the consent. If not specified, will return the whole data stored in the consent object.
   * @returns {Promise<(boolean | object)>} Value for the key in consent or the whole consent data if key is not specified.
   */
  async consent(key) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.consent` before a storage was defined with `analytics.setStorage`. Returning null.',
      );
      return null;
    }

    await this.setStoragePromise;

    try {
      const data = await this.consentInstance.get();

      return key ? get(data, key) : data;
    } catch (error) {
      logger.error(
        `An error occurred when trying to get consent data: ${error}`,
      );
    }
  }

  /**
   * Getter for the context object.
   *
   * @param {string} [key] - Key to retrieve from the context. If not specified, will return the whole data stored in the context.
   * @returns {Promise<*>} Value for the key in context or the whole context data if key is not specified.
   */
  async context(key) {
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
   * @param {string} name - Name of the integration in lowerCase.
   * @returns {(Integration|null)} The integration instance if it exists and was loaded, otherwise null.
   */
  integration(name) {
    return get(this.integrations.get(name), 'instance', null);
  }

  /**
   * Getter for user object.
   *
   * @param {string} [key] - The key of the user object that is returned.
   * @returns {Promise<*>} Value for the key in user or the whole user data if key is not specified.
   */
  async user(key) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.user` before a storage was defined with `analytics.setStorage`. Returning null.',
      );

      return null;
    }

    await this.setStoragePromise;

    try {
      const data = await this.userInstance.get();

      return get(data, key, data);
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
   * @param {object} data - Consent object to be stored.
   * @returns {Promise<Analytics>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async setConsent(data) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.setConsent` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      await this.consentInstance.set(data);

      const consented = await this.consent();

      // Since this.integrations is a Map instance, we can call Map.prototype.forEach,
      // which returns the value as first parameter
      this.activeIntegrations.forEach(
        item => item.instance && item.instance.setConsent(consented),
      );

      await this.loadIntegrations(true);
    } catch (error) {
      logger.error(`An error occurred when trying to set consent: ${error}.`);
    }

    return this;
  }

  /**
   * This method will be called whenever integrations are loaded into analytics. To be overriden by subclasses.
   *
   * @protected
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async onLoadedIntegrations() {}

  /**
   * [DEPRECATED] - Replaced by useContext.
   *
   * @returns {Analytics} The analytics instance that was used when calling this method to allow chaining.
   *
   */
  setContext() {
    logger.error(
      '`analytics.setContext is deprecated. Use analytics.useContext instead. This will be a noop.`',
    );

    return this;
  }

  /**
   * Adds the context function to the array of functions that will provide additional data to be appended to the default context.
   *
   * @param {Function} contextFn - A function that will return context data to be appended to the default context.
   *
   * @returns {Analytics} The analytics instance that was used when calling this method to allow chaining.
   *
   */
  useContext(contextFn) {
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
   * @param {object} storage - Storage instance that must support the methods
   *                           getItem(key), setItem(key, value) and removeItem(key).
   *
   * @returns {Analytics} The analytics instance that was used when calling this method to allow chaining.
   */
  setStorage(storage) {
    if (this.isReady) {
      logger.error('Cannot call setStorage after analytics is ready.');

      return this;
    }

    let wrappedStorage;

    try {
      wrappedStorage = new StorageWrapper(storage);
    } catch (e) {
      logger.error(`An error occurred when trying to create storage: ${e}`);
      return this;
    }

    this.storage = wrappedStorage;
    this.userInstance = new User(wrappedStorage);
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
   * @param {string} userId            - Id of the user.
   * @param {object} traits            - Properties like name, email, etc of the user.
   *
   * @returns {Promise<Analytics>}     Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async setUser(userId = null, traits = {}) {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.setUser` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      await this.userInstance.set(userId, traits);

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
   * @param {string} name - Name of the integration.
   * @param {Integration} Factory - The integration class.
   * @param {object} options - The options passed for the integration.
   *
   * @returns {Analytics} The analytics instance that was used when calling this method to allow chaining.
   *
   */
  addIntegration(name, Factory, options) {
    const isSubclass = Factory.prototype instanceof Integration;

    if (!isSubclass) {
      logger.error(
        `'${name}' is not a valid integration, so it was not loaded. Please load only valid integrations.`,
      );

      return this;
    }

    this.integrations.set(name, {
      instance: null,
      Factory,
      options,
    });

    return this;
  }

  /**
   * Deletes user data.
   *
   * @returns {Analytics} The analytics instance that was used when calling this method to allow chaining.
   *
   */
  anonymize() {
    if (!this.storage) {
      logger.error(
        'Tried to call `analytics.anonymize` before a storage was defined with `analytics.setStorage`. This will be a noop.',
      );

      return this;
    }

    try {
      this.userInstance.anonymize();

      this.handleOnUserChanged();
    } catch (e) {
      logger.error('`An error occurred in analytics.anonymize() call: `' + e);
    }

    return this;
  }

  /**
   * Track method for custom events.
   * Builds the track object with page default properties on the context.
   *
   * @param {module:trackTypes} type    - Type of event to be tracked.
   * @param {string} event                        - Name of the event.
   * @param {object} [properties]                 - Properties of the event.
   * @param {object} [eventContext]               - Context data that is specific for this event.
   *
   * @returns {Promise<Analytics>}    Promise that will resolve with the instance that was used when calling this method to allow chaining.
.
   */
  async track(type = trackTypes.TRACK, event, properties, eventContext) {
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

      this.callIntegrationsMethod(this.activeIntegrations, 'track', data);
    } catch (error) {
      logger.error(
        `An error occurred when trying to track event: ${event}: ${error}`,
      );
    }

    return this;
  }

  /**
   * Loads configured integrations that are ready to be loaded. This method will be called after a call to ready or
   * setConsent methods in order to load integrations that are not yet loaded. It's safe to call this method
   * many times.
   *
   * @param {boolean} raiseOnLoadedIntegrationsEvent - If the onloadedIntegrations event should be raised by calling `onLoadedIntegrations` or not.
   *
   * @private
   * @returns {Promise}                              Promise that will resolve when the method finishes.
   */
  async loadIntegrations(raiseOnLoadedIntegrationsEvent) {
    const loadedIntegrations = [];
    const loadEventData = await this.getLoadEventData();

    const strippedDownAnalytics = {
      createEvent: this.getTrackEventData.bind(this),
    };

    this.integrations.forEach((integration, intName) => {
      // Nothing to do if the instance has already been created
      if (integration.instance) {
        return;
      }

      const shouldLoad = integration.Factory.shouldLoad(loadEventData.consent);

      if (!shouldLoad) {
        // Nothing to do as well if the integration shouldn't load
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
   * @returns {Promise<Analytics>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async ready() {
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
   * Call a method in all integrations with the specified args and an optional log tag
   * to be used in all logger calls.
   *
   * @param {Iterable<Integration>} integrations   - Integrations to call the method.
   * @param {string} methodName                    - Name of the method to be called in all integrations.
   * @param  {...*} args                         - Arguments to be passed to the method.
   * @private
   */
  callIntegrationsMethod(integrations, methodName, ...args) {
    if (!integrations || !integrations.forEach) {
      return;
    }

    integrations.forEach((item, intName) => {
      try {
        item.instance[methodName](...args);
      } catch (e) {
        logger.error(
          `${methodName} skipped for integration: '${intName}': Unhandled exception: ${e}`,
        );
      }
    });
  }

  /**
   * Resolves the setUser promise which will release any buffered calls to page/track methods
   * and will call `onSetUser` on all integrations if it is ready.
   *
   * @private
   */
  async handleOnUserChanged() {
    if (this.setUserPromiseResolve) {
      this.setUserPromiseResolve();
      this.setUserPromiseResolve = null;
    }

    // If ready has not been called, do not try to call
    // integrations `onSetUser` method as its instances are
    // not yet created.
    if (!this.isReady) {
      return;
    }

    const data = await this.getSetUserEventData();

    this.callIntegrationsMethod(this.activeIntegrations, 'onSetUser', data);
  }

  /**
   * Base function to get event data to be sent to integrations.
   *
   * @param {string} type                           - Type of the event, ex: page, track, onSetUser.
   * @param {object} [additionalData]               - Additional data to be added to the final event data.
   * @param {object} [eventContext]                 - Context data that is specific for this event.
   *
   * @returns {Promise<object>}                     - Data for the event.
   * @private
   */
  async getEventData(type, additionalData, eventContext) {
    const context = await this.context();

    Object.assign(context, { event: eventContext });

    const commonData = {
      type,
      context,
      platform: this.platform,
      consent: await this.consent(),
      user: await this.user(),
      timestamp: new Date().getTime(),
    };

    return {
      ...commonData,
      ...additionalData,
    };
  }

  /**
   * Returns event data that will be sent on an 'onSetUser' event.
   *
   * @returns {Promise<object>} - User data to be sent to integrations.
   * @private
   */
  async getSetUserEventData() {
    return await this.getEventData('onSetUser', {
      event: 'onSetUser',
      properties: {},
    });
  }

  /**
   * Returns event data that will be sent on an 'onSetUser' event.
   *
   * @returns {Promise<object>} - Load data to be sent to integrations.
   * @private
   */
  async getLoadEventData() {
    return await this.getEventData('loadIntegration', {
      event: 'loadIntegration',
      properties: {},
    });
  }

  /**
   * Gets event data for a track event.
   *
   * @param {string} type                      - Type of the event being called.
   * @param {string} event                     - Name of the event from analytics.track call.
   * @param {object} [properties]              - Event properties from analytics.track call.
   * @param {object} [eventContext]            - Context data that is specific for this event.
   *
   * @returns {Promise<object>}                - Track event data to be sent to integrations.
   * @private
   */
  async getTrackEventData(type, event, properties, eventContext) {
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
