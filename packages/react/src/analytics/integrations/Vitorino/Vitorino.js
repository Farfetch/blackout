/**
 * Vitorino Integration.
 * Loads the Vitorino script and calls its methods.
 *
 * @example <caption>Adding Vitorino integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('vitorino', integrations.Vitorino, {});
 *
 * @module Vitorino
 * @category Analytics
 * @subcategory Integrations
 */

import {
  DATA_TEST_SELECTOR,
  ENVIRONMENT_TYPES,
  ERROR_MESSAGE_PREFIX,
  GET_EVENTS_MAPPER_FN,
  INVALID_CUSTOM_MAPPER_ERROR_MESSAGE,
  INVALID_MAPPER_RETURN_TYPE_ERROR,
  MARKETING_API_PREFIX,
  MISSING_CONTEXT_ERROR_MESSAGE,
  PROD_SCRIPT_SRC,
  VITORINO_CALL_ERROR_MESSAGE,
} from './constants';
import { getCustomerIdFromUser } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/omnitracking-helper';
import { getEnvironmentFromOptions } from './vitorino-helper';
import { integrations, utils } from '@farfetch/blackout-core/analytics';
import { POST_TRACKINGS_PATHNAME } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';
import isArray from 'lodash/isArray';

/**
 * Vitorino integration.
 *
 * @private
 * @augments Integration
 */
export default class Vitorino extends integrations.Integration {
  /**
   * This integration is required, so it must be loaded independently of user consent.
   *
   * @returns {boolean} If the integration should load or not.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Creates and returns the instance for Vitorino integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics' load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   * @returns {Vitorino} The instance created.
   */
  static createInstance(options, loadData, analytics) {
    return new Vitorino(options, loadData, analytics);
  }

  /**
   * Creates an instance of Vitorino integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics' load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   */
  constructor(options = {}, loadData, analytics) {
    super(options, loadData, analytics);

    this.isScriptLoaded = false;

    this.getEventsMapper = null;

    this.isVitorinoConfigured = false;

    this.vitorinoTrackCallback = null;

    this.initializePromiseResolve = null;

    this.userIdPromiseResolve = null;

    this.initializePromise = new Promise(resolve => {
      this.initializePromiseResolve = resolve;
    });

    this.userIdPromise = new Promise(resolve => {
      this.userIdPromiseResolve = resolve;
    });

    this.buildMapper(options);
    this.loadScript(options);
  }

  /**
   * When the user ID is available, config the vitorino and resolve the Promise so the tracking can begin.
   *
   * @async
   *
   * @param {object} data - Analytics' event data.
   */
  async onSetUser(data) {
    await this.initializePromise;

    if (data.user?.id) {
      try {
        this.configVitorino(data);

        if (this.userIdPromiseResolve) {
          this.userIdPromiseResolve();
          this.userIdPromiseResolve = null;
        }
      } catch (error) {
        utils.logger.error(
          `${ERROR_MESSAGE_PREFIX} There was an error when trying to config Vitorino: ${error}`,
        );
      }
    }
  }

  /**
   * Makes the first call to Vitorino to configure it
   * and receive the callback function to be called later when a page change occurs.
   *
   * @param {object} data - Analytics' event data.
   */
  configVitorino(data) {
    this.config = this.buildConfigData(data);

    this.vitorinoTrackCallback = window.Vitorino.track(this.config);

    this.isVitorinoConfigured = true;
  }

  /**
   * Prepares the mapper for the integration to work with.
   *
   * @param {object} options - Integration options.
   */
  buildMapper(options) {
    const customMapperFn = options.eventsMapper;

    if (!customMapperFn) {
      this.getEventsMapper = GET_EVENTS_MAPPER_FN;

      return;
    }

    if (customMapperFn && typeof customMapperFn !== 'function') {
      utils.logger.error(INVALID_CUSTOM_MAPPER_ERROR_MESSAGE);

      return;
    }

    this.getEventsMapper = customMapperFn;
  }

  /**
   * Method that will load the script and append it to the DOM.
   *
   * @param {object} options - Integration options.
   */
  loadScript(options) {
    const script = document.createElement('script');
    const environment =
      options.environment || window?.__BUILD_CONTEXT__?.env?.NODE_ENV;
    const devScriptSrc = options.devScriptSource;
    const isDevEnvironment = environment === ENVIRONMENT_TYPES.dev;

    if (isDevEnvironment && !devScriptSrc) {
      throw new Error(`${ERROR_MESSAGE_PREFIX} Looks like you're running Vitorino integration on a
           development environment without passing in the "developmentScriptSrc", so it will not load.
           Please make sure a valid script source is passed via the integration options.`);
    }

    document.body.appendChild(script);

    script.onload = this.scriptOnload;

    script.setAttribute('data-test', DATA_TEST_SELECTOR);
    script.async = true;
    script.src =
      isDevEnvironment && devScriptSrc ? devScriptSrc : PROD_SCRIPT_SRC;
  }

  /**
   * Method that will be executed when the script is loaded.
   */
  scriptOnload = () => {
    if (this.initializePromiseResolve) {
      this.initializePromiseResolve();
      this.initializePromiseResolve = null;
    }
  };

  /**
   * Builds the object needed for the Vitorino pixel configuration with all necessary data.
   *
   * @param {object} data - Analytics' track data.
   *
   * @returns {object} - The payload to be sent to the pixel.
   */
  buildConfigData(data) {
    const { tenantId, clientId, web } = data.context;
    const correlationId = data.user.localId;
    const origin = web?.window?.location?.origin;

    if (!tenantId || !clientId) {
      throw new Error(MISSING_CONTEXT_ERROR_MESSAGE);
    }

    return {
      correlationId,
      tenantId,
      clientId,
      origin,
      customerId: getCustomerIdFromUser(data.user),
      environment: getEnvironmentFromOptions(this.options),
      fields: this.getFieldsFromOptions(this.options),
      network: this.options.network || {
        proxy: origin,
        path: `${MARKETING_API_PREFIX}${POST_TRACKINGS_PATHNAME}`,
      },
    };
  }

  /**
   * Returns the fields object with the correct sensitiveFields and/or secretFields.
   * Runs every entry (event) and builds two Arrays with all the field IDs.
   *
   * TODO: on the next major version (@farfetch/blackout-react@1.0.0) we can simplify this logic and remove the events entry,
   * so the fields can be passed directly on two Arrays for the secretFields and sensitiveFields, respectively.
   *
   * @param {object} options - Integration options.
   *
   * @returns {object} - The fields object.
   */
  getFieldsFromOptions(options) {
    const safeSensitiveFields = options.sensitiveFields || {};
    const safeSecretFields = options.secretFields || {};
    const sensitiveFieldsIDs = [];
    const secretFieldsIDs = [];

    for (let event in safeSensitiveFields) {
      sensitiveFieldsIDs.push(...safeSensitiveFields[event]);
    }

    for (let event in safeSecretFields) {
      secretFieldsIDs.push(...safeSecretFields[event]);
    }

    return {
      sensitiveFields: sensitiveFieldsIDs,
      secretFields: secretFieldsIDs,
    };
  }

  /**
   * Returns the correspondent Vitorino page type for the event.
   *
   * @param {string} event - The analytics event to filter by.
   
   * @returns {string | Array} - The correspondent Vitorino's page view(s).
   */
  getPageTypeFromEvent(event) {
    const mapper = this.getEventsMapper();

    if (!mapper || typeof mapper !== 'object') {
      throw new Error(INVALID_MAPPER_RETURN_TYPE_ERROR);
    }

    return mapper[event];
  }

  /**
   * Track method that will call Vitorino with the necessary data per event.
   * If there's more than one pageType per event, it will call Vitorino with each page type at a time.
   *
   * @async
   *
   * @param {object} data - Track event data.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    await this.initializePromise;
    await this.userIdPromise;

    try {
      const pageTypes = this.getPageTypeFromEvent(data.event);
      let safePageTypes;

      if (isArray(pageTypes)) {
        safePageTypes = pageTypes.length ? pageTypes : [undefined];
      } else {
        safePageTypes = [pageTypes];
      }

      safePageTypes.forEach(pageType => this.callVitorino(pageType));
    } catch (error) {
      utils.logger.error(`${VITORINO_CALL_ERROR_MESSAGE} ${error}`);
    }
  }

  /**
   * Calls the callback function given from the config call to register a page view change.
   *
   * @param {string} page - The `page` parameter of the event.
   */
  callVitorino(page) {
    if (this.isVitorinoConfigured) {
      this.vitorinoTrackCallback(page);
    }

    if (this.options.debugger) {
      utils.logger.info('Vitorino track: ', {
        config: this.config,
        vitorinoPageType: page,
      });
    }
  }
}
