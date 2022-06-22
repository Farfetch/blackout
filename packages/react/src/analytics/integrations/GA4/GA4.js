/**
 * Google Analytics 4 Integration.
 * Will load the google analytics 4 script and apply the ecommerce recommended events.
 *
 * @example <caption>Adding GA4 integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('GA4', integrations.GA4, {
    measurementId: 'G-XXXXX',
 * });
 *
 * @module GA4
 * @category Analytics
 * @subcategory Integrations
 */
import {
  pageTypes as analyticsPageTypes,
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import {
  DATA_TEST_SELECTOR,
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
  OPTION_PRODUCT_MAPPINGS,
  OPTION_SCHEMAS,
  OPTION_SCOPE_COMMANDS,
  OPTION_SET_CUSTOM_USER_ID_PROPERTY,
} from './constants';
import { validateFields } from './validation/optionsValidator';
import defaultSchemaEventsMap from '../shared/validation/eventSchemas';
import each from 'lodash/each';
import eventValidator from '../shared/validation/eventValidator';
import GA4SchemaEventsMap from './validation/eventSchemas';
import get from 'lodash/get';
import getDefaultCommandsBuilder, {
  commandListSchema,
  nonInteractionEvents,
} from './commands';
import merge from 'lodash/merge';

/**
 * Google Analytics 4 Integration.
 *
 * @private
 * @augments Integration
 */
class GA4 extends integrations.Integration {
  enableAutomaticPageViews;
  schemaEventsMap;
  initializePromise;
  initializePromiseResolve;
  optionsValidationResultsMap;

  /**
   * Creates an instance of Google Analytics 4 integration.
   * Setup Google Analytics 4 and initializes event commands map that will be used
   * to obtain the command list associated with an event.
   *
   * @param {object} options - User configured options.
   * @param {object} loadData - Analytics's load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   */
  constructor(options, loadData, analytics) {
    super(options, loadData, analytics);
    this.initialize(options);
    this.onSetUser(loadData);
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param {object} consent - The consent object representing the user preferences.
   *
   * @returns {boolean} If the integration is ready to be loaded.
   */
  static shouldLoad(consent) {
    return !!consent?.statistics;
  }

  /**
   * Method used to create a new GA4 instance by analytics.
   *
   * @async
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   * @returns {GA4} An instance of GA4 class.
   *
   */
  static createInstance(options, loadData, analytics) {
    return new GA4(options, loadData, analytics);
  }

  /**
   * Initializes member variables from options and tries to initialize Google Analytics 4.
   *
   * @param {object} options - Options passed for the GA4 integration.
   */
  initialize(options) {
    this.optionsValidationResultsMap = validateFields(options);

    this.measurementId = options[OPTION_MEASUREMENT_ID];
    this.enableAutomaticPageViews =
      !!options[OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS];
    // Initialize user scope commands map
    this.scopeCommands = options[OPTION_SCOPE_COMMANDS];

    // Initialize mappings for product data type
    this.productMappings = merge({}, options[OPTION_PRODUCT_MAPPINGS]);

    // Initialize validation schemas events map, merged with user definitions
    // to allow overriding
    this.schemaEventsMap = merge(
      {},
      defaultSchemaEventsMap,
      GA4SchemaEventsMap,
      options[OPTION_SCHEMAS],
    );

    this.nonInteractionEvents = merge(
      {},
      nonInteractionEvents,
      options[OPTION_NON_INTERACTION_EVENTS],
    );

    this.onPreProcessCommands = options[OPTION_ON_PRE_PROCESS_COMMANDS];

    this.setCustomUserIdProperty = get(
      options,
      OPTION_SET_CUSTOM_USER_ID_PROPERTY,
      true,
    );

    this.loadGtagScript(options);
  }

  /**
   * Send page events to GA4.
   *
   * @async
   *
   * @param {object} data - Event data provided by analytics.
   */
  async trackPage(data) {
    if (!window.gtag) {
      throw new Error(
        `${MESSAGE_PREFIX}Event track failed: GA4 is not loaded.`,
      );
    }

    if (this.enableAutomaticPageViews) {
      return;
    }

    const location = utils.getLocation(data);

    try {
      const pageViewCommandList = [];

      const extraCommands = this.getExtraCommandsForPage(
        data,
        this.scopeCommands,
      );

      if (extraCommands) {
        pageViewCommandList.push(...extraCommands);
      }

      pageViewCommandList.push([
        'config',
        this.measurementId,
        {
          page_path: location.pathname + utils.stringifyQuery(location.query),
          path_clean: location.pathname,
        },
      ]);

      this.processCommandList(pageViewCommandList, data);
    } catch (error) {
      utils.logger.error(
        `${MESSAGE_PREFIX}An error occurred when trying to send a pageview: ${error}`,
      );
    }
  }

  /**
   * Process GA4 page event to perform as track event in ga4 usable events.
   *
   * @async
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async processPageEvent(data) {
    const eventName = get(data, 'event');

    switch (eventName) {
      case analyticsPageTypes.BAG:
      case analyticsPageTypes.SEARCH:
      case analyticsPageTypes.WISHLIST:
        return await Promise.all([this.trackEvent(data), this.trackPage(data)]);
      default:
        return await this.trackPage(data);
    }
  }

  /**
   * Send events to GA4 if the input event data passes schema validation.
   *
   * @async
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    await this.initializePromise;

    switch (data.type) {
      case analyticsTrackTypes.PAGE:
        return await this.processPageEvent(data);

      case analyticsTrackTypes.TRACK:
        return await this.trackEvent(data);
      /* istanbul ignore next */
      default:
        /* istanbul ignore next */
        break;
    }
  }

  /**
   * Tracks an event. Send event to GA4 if the input event data passes schema validation.
   *
   * @async
   *
   * @param {object} data - Event data provided by analytics.
   *
   */
  async trackEvent(data) {
    if (!window.gtag) {
      throw new Error(
        `${MESSAGE_PREFIX}Event track failed: GA4 is not loaded.`,
      );
    }

    if (this.isEventDataValid(data)) {
      this.sendEvent(data);
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
        `${MESSAGE_PREFIX}Track event failed. Reason: ${validationResult.errorMessage}`,
      );
      return false;
    }

    return true;
  }

  /**
   * Execute user scope commands builder if there is any specified.
   * The command list returned by the builder will be sent to GA4 instance.
   *
   * @async
   *
   * @param {object} data - Event data provided by analytics.
   */
  async onSetUser(data) {
    await this.initializePromise;

    try {
      const userId = get(data, 'user.id', null);
      const isGuest = get(data, 'user.traits.isGuest', true);

      window.gtag('set', 'user_properties', {
        user_id: isGuest ? null : userId,
        is_guest: isGuest,
        crm_id: isGuest || !this.setCustomUserIdProperty ? null : userId,
      });

      const userCommandBuilder = get(this.scopeCommands, 'user');
      const commandList = this.executeCommandBuilder(userCommandBuilder, data);

      this.processCommandList(commandList, data);
    } catch (error) {
      utils.logger.error(
        `${MESSAGE_PREFIX}An error occurred when trying to process a user changed event: ${error}`,
      );
    }
  }

  /**
   * Send event data to GA4 by compiling the data to a command list that will feed
   * the gtag function.
   *
   * @param {object} data - Event data provided by analytics.
   */
  sendEvent(data) {
    try {
      const commandList = this.buildCommandListForEvent(
        data,
        this.scopeCommands,
        this.productMappings,
      );

      this.processCommandList(commandList, data);
    } catch (error) {
      utils.logger.error(
        `${MESSAGE_PREFIX}An error occurred when trying to send event '${utils.getEvent(
          data,
        )}': ${error}`,
      );
    }
  }

  /**
   * Feeds the gtag instance with the command list passed in.
   *
   * @param {Array} commandList - List of commands to be executed by ga instance.
   * @param {object} data - Event data provided by analytics.
   */
  processCommandList(commandList, data) {
    if (commandList) {
      if (this.onPreProcessCommands) {
        commandList = this.onPreProcessCommands(commandList, data);
      }

      const validationResult = this.validateCommandList(commandList);

      if (!validationResult.isValid) {
        throw new TypeError(
          'Invalid output obtained for command builder. It must be an array of arrays.',
        );
      }

      this.processInteractionEvents(commandList, data?.event);

      each(commandList, command => {
        window.gtag.apply(null, command);
      });
    }
  }

  /**
   * Process the command list to check if there is an event that should receive the command `nonInteraction`.
   * If so, append the command to the list.
   *
   * @param {Array} commandList - List of commands to be executed by gtag instance.
   * @param {string} eventName - The event name passed.
   */
  processInteractionEvents(commandList, eventName) {
    each(commandList, ga4Command => {
      const command = ga4Command[0];

      // Check if the command is event
      if (command === 'event') {
        // Check the nonInteractionEvents map if there is an entry for the eventName being tracked
        // and if there is apply the non_interaction = true to the event properties
        if (this.nonInteractionEvents[eventName] === true) {
          const eventPropertiesIndex = 2;

          // After the event name, should be the event properties
          // If no properties were passed by the developer, we add an
          // empty object so we can add the non_interaction property to it.
          if (!ga4Command[eventPropertiesIndex]) {
            ga4Command[eventPropertiesIndex] = {};
          }
          const eventProperties = ga4Command[eventPropertiesIndex];
          if (
            typeof eventProperties === 'object' &&
            !(NON_INTERACTION_FLAG in eventProperties)
          ) {
            eventProperties[NON_INTERACTION_FLAG] = true;
          }
        }
      }
    });
  }

  /**
   * Return a GA4 command list for the event.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @param {object} productMappings - User-configured product property mappings.
   *
   * @returns {Array} The GA4 command list for the event. It will return empty if there is an error or no command builders exist for the event.
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
   * Returns extra commands to be sent to GA4 along with the main commands for a pageview if there is an `extras`
   * option configured for pageviews.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   *
   * @returns {(Array|undefined)} An array with the commands or undefined if there is no extra commands builder function.
   */
  getExtraCommandsForPage(data, scopeCommands) {
    return this.executeCommandBuilder(
      get(scopeCommands, 'pageview.extras'),
      data,
    );
  }

  /**
   * Returns extra commands to be sent to GA4 along with the main commands for an event if there is an `extras`
   * option configured for the specified event.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} scopeCommands - Commands by scope configuration.
   *
   * @returns {(Array|undefined)} An array with the commands or undefined if there is no extra commands builder function.
   */
  getExtraCommandsForEvent(data, scopeCommands) {
    const event = utils.getEvent(data);

    const extrasCommandBuilder = this.getExtrasCommandBuilderForEvent(
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
   * @returns {(Array|undefined)} An array with the commands or undefined if there is no extra commands builder function.
   */
  getMainCommandsForEvent(data, scopeCommands, productMappings) {
    const event = get(data, 'event');

    const mainCommandBuilder = this.getMainCommandBuilderForEvent(
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
   * Returns the main command builder for an event.
   *
   * @param {string} event - Event name.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @returns {(Function|undefined)} Main command builder for the event if there is one, undefined otherwise.
   */
  getMainCommandBuilderForEvent(event, scopeCommands) {
    let commandBuilder = get(scopeCommands, `event.${event}.main`);

    if (commandBuilder) {
      return commandBuilder;
    }

    commandBuilder = get(scopeCommands, 'event.*.main');

    if (commandBuilder) {
      return commandBuilder;
    }

    return getDefaultCommandsBuilder(event);
  }

  /**
   * Returns the extra commands builder for an event.
   *
   * @param {string} event - Event name.
   * @param {object} scopeCommands - Commands by scope configuration.
   * @returns {(Function|undefined)} Extra commands builder for the event if there is one, undefined otherwise.
   */
  getExtrasCommandBuilderForEvent(event, scopeCommands) {
    const commandBuilder = get(scopeCommands, `event.${event}.extras`);

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(scopeCommands, 'event.*.extras');
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
   * Validates if the provided command list is in the expected format and.
   *
   * @param {Array} commandList - The command list to validate.
   *
   * @returns {object} An object with a boolean `isValid` with the result of the validation and a string `errorMessage` with the validation error if available.
   */
  validateCommandList(commandList) {
    try {
      commandListSchema.validateSync(commandList);
    } catch (error) {
      return {
        isValid: false,
        errorMessage: `${error}`,
      };
    }

    return { isValid: true };
  }

  /**
   * Method that will resolve which way gtag script should be loaded, default or custom.
   *
   * @param {object} options - User configured options.
   *
   */
  loadGtagScript(options) {
    this.customLoadScriptFn = options[OPTION_LOAD_SCRIPT_FUNCTION];

    if (!this.customLoadScriptFn) {
      this.internalLoadScript(options);
    } else if (
      this.optionsValidationResultsMap.get(OPTION_LOAD_SCRIPT_FUNCTION)
    ) {
      try {
        const tempCustomLoadScriptFn = this.customLoadScriptFn();
        if (tempCustomLoadScriptFn instanceof Promise) {
          this.initializePromise = tempCustomLoadScriptFn.then(
            this.scriptOnload,
          );
        } else {
          throw new Error("Function's return value is not a Promise");
        }
      } catch (e) {
        throw new Error(
          `${MESSAGE_PREFIX}${INIT_ERROR}Custom loading script failed with following error: ${e}`,
        );
      }
    }
  }

  /**
   * Method that will load the script and append it to the DOM.
   *
   * @param {object} options - User configured options.
   *
   */
  internalLoadScript(options) {
    const customDataLayerAttr = options[OPTION_DATA_LAYER_NAME]
      ? options[OPTION_DATA_LAYER_NAME]
      : DEFAULT_DATA_LAYER_NAME;

    const script = document.createElement('script');
    script.setAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}&l=${customDataLayerAttr}`,
    );

    document.head.appendChild(script);

    const s = document.createElement('script');
    s.type = 'text/javascript';
    const code =
      `    window.${customDataLayerAttr} = window.${customDataLayerAttr} || [];\n` +
      `    function gtag(){${customDataLayerAttr}.push(arguments);}\n` +
      "    gtag('js', new Date());\n" +
      "    gtag('config', \"" +
      this.measurementId +
      `" ,{ send_page_view: ${this.enableAutomaticPageViews} });\n`;

    this.initializePromiseResolve = null;
    this.initializePromise = new Promise(resolve => {
      this.initializePromiseResolve = resolve;
    });

    s.appendChild(document.createTextNode(code));
    document.head.appendChild(s);
    script.onload = this.scriptOnload;

    script.setAttribute('data-test', DATA_TEST_SELECTOR);
    script.async = true;
  }

  /**
   * Method that will be called when the GA4 script loads.
   */
  scriptOnload = () => {
    if (this.initializePromiseResolve) {
      this.initializePromiseResolve();
      this.initializePromiseResolve = null;
    }
  };
}

export default GA4;
