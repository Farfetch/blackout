/**
 * Google Analytics Integration.
 * Will load the google analytics script and apply the enhanced ecommerce plugin.
 *
 * @example <caption>Adding GA integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('GA', integrations.GA, {
 *  createFields: {
 *     trackingId: '<google analytics container id>'
 *  }
 * });
 *
 * @module GA
 * @category Analytics
 * @subcategory Integrations
 */

import {
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import defaultEventCommands, {
  commandListSchema,
  nonInteractionEvents,
} from './commands';
import defaultSchemaEventsMap from '../shared/validation/eventSchemas';
import each from 'lodash/each';
import eventValidator from '../shared/validation/eventValidator';
import get from 'lodash/get';
import merge from 'lodash/merge';
import productCategoriesValidator from './validation/productCategoriesValidator';

/**
 * Google Analytics Integration.
 *
 * @private
 * @augments Integration
 */
class GA extends integrations.Integration {
  /**
   * Creates an instance of Google Analytics integration.
   * Setup google analytics and initializes event commands map that will be used
   * to obtain the command list associated with an event.
   *
   * @param {object} options - User configured options.
   * @param {object} loadData - Analytics's load event data.
   *
   */
  constructor(options, loadData) {
    super(options, loadData);

    this.initializePromiseResolve = null;

    this.initializePromise = new Promise(resolve => {
      this.initializePromiseResolve = resolve;
    });

    this.initialize(options);
    this.onSetUser(loadData);
  }

  static [utils.CONSENT_CATEGORIES_PROPERTY] =
    utils.DefaultConsentKeys.STATISTICS;
  /**
   * Send page hits to GA.
   *
   * @param {object} data - Event data provided by analytics.
   */
  async trackPage(data) {
    await this.initializePromise;

    if (!window.ga || !window.ga.loaded) {
      utils.logger.error(
        '[GA] - Page event failed: Google Analytics is not loaded.',
      );
      return;
    }

    try {
      const location = utils.getLocation(data);
      const pageviewCommandList = [];

      const extraCommands = this.getExtraCommandsForPage(
        data,
        this.scopeCommands,
      );

      if (extraCommands) {
        pageviewCommandList.push(...extraCommands);
      }

      pageviewCommandList.push(
        [
          'set',
          'page',
          location.pathname + utils.stringifyQuery(location.query),
        ],
        ['send', 'pageview'],
      );

      this.processCommandList(pageviewCommandList, data);
    } catch (error) {
      utils.logger.error(
        `[GA] - An error occurred when trying to send a pageview: ${error}`,
      );
    }
  }

  /**
   * Send event hits to GA if the input event data passes schema validation.
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    switch (data.type) {
      case analyticsTrackTypes.PAGE:
        return await this.trackPage(data);

      case analyticsTrackTypes.TRACK:
        return await this.trackEvent(data);

      default:
        break;
    }
  }

  /**
   * Tracks an event. Send event hits to GA if the input event data passes schema validation.
   *
   * @param {object} data - Event data provided by analytics.
   */
  async trackEvent(data) {
    await this.initializePromise;

    if (!window.ga || !window.ga.loaded) {
      utils.logger.error(
        '[GA] - Track event failed: Google Analytics is not loaded.',
      );
      return;
    }

    if (this.isEventDataValid(data)) {
      this.sendEvent(data);
    }
  }

  /**
   * Execute user scope commands builder if there is any specified.
   * The command list returned by the builder will be sent to GA instance.
   *
   * @param {object} data - Event data provided by analytics.
   */
  async onSetUser(data) {
    await this.initializePromise;

    if (!window.ga || !window.ga.loaded) {
      utils.logger.error(
        '[GA] - onSetUser failed: Google Analytics is not loaded.',
      );
      return;
    }

    try {
      const eventData = {
        ...data,
        user: utils.hashUserData(data.user),
      };

      const userId = get(eventData, 'user.id', null);
      const isGuest = get(data, 'user.traits.isGuest', true);

      window.ga('set', 'userId', isGuest ? null : userId);

      const userHitCommandBuilder = get(this.scopeCommands, 'user');

      const commandList = this.executeCommandBuilder(
        userHitCommandBuilder,
        eventData,
      );

      this.processCommandList(commandList);
    } catch (error) {
      utils.logger.error(
        `[GA] - An error occurred when trying to process a user changed event: ${error}`,
      );
    }
  }

  /**
   * Validates the event against a schema.
   * If no schema is defined for the event, assume the event is valid.
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {boolean} - If the event passed schema validation or not.
   */
  isEventDataValid(data) {
    const event = utils.getEvent(data);
    const validationSchema = this.schemaEventsMap[event];
    const validationResult = eventValidator(data, validationSchema);

    if (!validationResult.isValid) {
      utils.logger.error(
        `[GA] - Track event failed. Reason: ${validationResult.errorMessage}`,
      );
      return false;
    }

    return true;
  }

  /**
   * Send event data to GA by compiling the data to a command list that will feed
   * the ga function.
   *
   * @param {object} data - Event data provided by analytics.
   */
  sendEvent(data) {
    try {
      const gaCommandList = this.buildCommandListForEvent(
        data,
        this.scopeCommands,
        this.productMappings,
      );

      this.processCommandList(gaCommandList, data);
    } catch (error) {
      utils.logger.error(
        `[GA] - An error occurred when trying to send event '${utils.getEvent(
          data,
        )}': ${error}`,
      );
    }
  }

  /**
   * Feeds the ga instance with the command list passed in.
   *
   * @param {Array} gaCommandList - List of commands to be executed by ga instance.
   * @param {object} data - Event data provided by analytics.
   */
  processCommandList(gaCommandList, data) {
    if (gaCommandList) {
      if (this.onPreProcessCommands) {
        gaCommandList = this.onPreProcessCommands(gaCommandList, data);
      }

      const validationResult = this.validateCommandList(gaCommandList);

      if (!validationResult.isValid) {
        throw new TypeError(
          'Invalid output obtained for command builder. It must be an array of arrays.',
        );
      }

      this.processInteractionEvents(gaCommandList);

      each(gaCommandList, gaCommand => {
        window.ga.apply(null, gaCommand);
      });
    }
  }

  /**
   * Process the command list to check if there is an event that should receive the command `nonInteraction`.
   * If so, append the command to the list.
   *
   * @param {Array} gaCommandList - List of commands to be executed by ga instance.
   */
  processInteractionEvents(gaCommandList) {
    each(gaCommandList, gaCommand => {
      each(gaCommand, command => {
        // Strictly check for the value and type
        if (
          this.nonInteractionEvents[command] &&
          this.nonInteractionEvents[command] === true
        ) {
          gaCommand.push({
            nonInteraction: true,
          });
        }
      });
    });
  }

  /**
   * Return a GA command list for the event.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @param {object} productMappings - User-configured product property mappings.
   *
   * @returns {Array} The GA command list for the event. It will return empty if there is an error or no command builders exist for the event.
   */
  buildCommandListForEvent(data, scopeCommands, productMappings) {
    const extraCommands = this.getExtraCommandsForEvent(data, scopeCommands);

    const mainCommands = this.getMainCommandsForEvent(
      data,
      scopeCommands,
      productMappings,
    );

    // Only initialize `commandList` if there were any commands generated for the event
    // If not, return undefined.
    if (extraCommands || mainCommands) {
      const commandList = [];

      if (extraCommands) {
        commandList.push(...extraCommands);
      }

      if (mainCommands) {
        commandList.push(...mainCommands);
      }

      return commandList;
    }

    return undefined;
  }

  /**
   * Returns extra commands to be sent to GA along with the main commands for a pageview hit if there is an `extras`
   * option configured for pageviews.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   *
   * @returns {(Array|null)} An array with the commands or null if there was an error executing the extra commands builder.
   */
  getExtraCommandsForPage(data, scopeCommands) {
    let extrasCommandBuilder = get(scopeCommands, 'hit.pageview.extras');

    return this.executeCommandBuilder(extrasCommandBuilder, data);
  }

  /**
   * Returns extra commands to be sent to GA along with the main commands for an event hit if there is an `extras`
   * option configured for the specified event.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   *
   * @returns {(Array|null)} An array with the commands or null if there was an error executing the extra commands builder.
   */
  getExtraCommandsForEvent(data, scopeCommands) {
    const event = utils.getEvent(data);

    let extrasCommandBuilder = this.getExtrasCommandBuilderForEvent(
      event,
      scopeCommands,
    );

    return this.executeCommandBuilder(extrasCommandBuilder, data);
  }

  /**
   * Returns the main commands that correspond to the event analytics has passed in.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @param {object} productMappings - User-configured product property mappings.
   *
   * @returns {(Array|null)} An array with the commands or null if there was an error executing the main commands builder.
   */
  getMainCommandsForEvent(data, scopeCommands, productMappings) {
    const event = get(data, 'event');

    let mainCommandBuilder = this.getMainCommandBuilderForEvent(
      event,
      scopeCommands,
    );

    return this.executeCommandBuilder(
      mainCommandBuilder,
      data,
      productMappings,
    );
  }

  /**
   * Returns the main command builder for an event hit.
   *
   * @param {string} event - Event name.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @returns {(Function|undefined)} Main command builder for the hit if there is one, undefined otherwise.
   */
  getMainCommandBuilderForEvent(event, scopeCommands) {
    let commandBuilder = get(scopeCommands, `hit.event.${event}.main`);

    if (commandBuilder) {
      return commandBuilder;
    }

    commandBuilder = get(scopeCommands, 'hit.event.*.main');

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(defaultEventCommands, event);
  }

  /**
   * Returns the extra commands builder for an event hit.
   *
   * @param {string} event - Event name.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @returns {(Function|undefined)} Extra commands builder for the hit if there is one, undefined otherwise.
   */
  getExtrasCommandBuilderForEvent(event, scopeCommands) {
    let commandBuilder = get(scopeCommands, `hit.event.${event}.extras`);

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(scopeCommands, 'hit.event.*.extras');
  }

  /**
   * Executes a command builder.
   *
   * @param {Function} commandBuilder - The command builder to execute.
   * @param  {...any} args - Arguments to be passed to the command builder.
   *
   * @returns {Array} Output of the command builder execution.
   *
   * @throws {TypeError} - If the command builder passed is not a function or the output is not of the proper type.
   */
  executeCommandBuilder(commandBuilder, ...args) {
    if (commandBuilder) {
      if (typeof commandBuilder !== 'function') {
        throw new TypeError('Command builder is not a function.');
      }

      const commandList = commandBuilder(...args);
      const validationResult = this.validateCommandList(commandList);

      if (!validationResult.isValid) {
        throw new TypeError(
          'Invalid output obtained for command builder. It must be an array of arrays.',
        );
      }

      return commandList;
    }
  }

  /**
   * Validates if the provided command list is in the expected format and
   * if the product category hierarchy values does not exceed the maximum supported levels in GA.
   *
   * @param {Array} commandList - The command list to validate.
   *
   * @returns {object} An object with a boolean `isValid` with the result of the validation and a string `errorMessage` with the validation error if available.
   */
  validateCommandList(commandList) {
    try {
      commandListSchema.validateSync(commandList);

      productCategoriesValidator(commandList);
    } catch (error) {
      return {
        isValid: false,
        errorMessage: `${error}`,
      };
    }

    return { isValid: true };
  }

  /**
   * Initializes member variables from options and initializes google analytics
   * with Enhanced Ecommerce plugin.
   *
   * @param {object} options - Options passed for the GA integration.
   */
  initialize(options) {
    // Initialize ga create fields
    const createFields = options && options.createFields;

    if (!createFields || !createFields.trackingId) {
      throw new Error(
        '[GA] - Unable to initialize GA: No `trackingId` was found in `createFields` option',
      );
    }

    // Initialize user scope commands map
    this.scopeCommands = options.scopeCommands;

    // Initialize validation schemas events map, merged with user definitions
    // to allow overriding
    this.schemaEventsMap = merge(
      {},
      defaultSchemaEventsMap,
      options && options.schemas,
    );

    // Initialize onPreProcessCommands member that will be invoked before
    // a command list is going to be sent to ga instance to allow user modification
    const onPreProcessCommands = options.onPreProcessCommands;

    if (onPreProcessCommands) {
      if (typeof onPreProcessCommands === 'function') {
        this.onPreProcessCommands = onPreProcessCommands;
      } else {
        utils.logger.error(
          '[GA] - Invalid value specified for "onPreProcessCommands" option. It must be a function.',
        );
      }
    }

    // Initialize mappings for product data type
    this.productMappings = merge(
      {},
      options ? options.productMappings : undefined,
    );

    this.nonInteractionEvents = merge(
      {},
      nonInteractionEvents,
      options ? options.nonInteractionEvents : undefined,
    );

    // Load Google Analytics
    /* eslint-disable */
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function () {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      a.onload = this.onloadFn;
      m.parentNode.insertBefore(a, m);
    }.call(
      this,
      window,
      document,
      'script',
      'https://www.google-analytics.com/analytics.js',
      'ga',
    ));

    /* eslint-enable */

    // Create tracker
    window.ga('create', createFields);

    // Load Enhanced Ecommerce plugin
    window.ga('require', 'ec');
  }

  /**
   * Method that will be called when the GA script loads.
   */
  onloadFn = () => {
    if (this.initializePromiseResolve) {
      this.initializePromiseResolve();
      this.initializePromiseResolve = null;
    }
  };
}

export default GA;
