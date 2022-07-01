/**
 * Google Analytics 4 Integration. Will load the google analytics 4 script and
 * apply the ecommerce recommended events.
 *
 * @example <caption>Adding GA4 integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('GA4', integrations.GA4, \{
 *     measurementId: 'G-XXXXX',
 * \});
 * ```
 */
import {
  pageTypes as analyticsPageTypes,
  trackTypes as analyticsTrackTypes,
  ConsentData,
  EventData,
  integrations,
  LoadIntegrationEventData,
  PageviewEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackEventData,
  trackTypes,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
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
import type {
  EventScopeCommandsHandlers,
  GA4CommandList,
  GA4IntegrationOptions,
  NonInteractionEvents,
  OnPreProcessCommandsHandler,
  ProductMappings,
  Schemas,
  ScopeCommands,
} from './types';

/**
 * Google Analytics 4 Integration.
 */
class GA4 extends integrations.Integration<GA4IntegrationOptions> {
  private enableAutomaticPageViews!: boolean;
  private schemaEventsMap!: Schemas;
  private initializePromise!: Promise<void>;
  private initializePromiseResolve?:
    | ((value?: void | Promise<void>) => void)
    | null;
  private optionsValidationResultsMap!: Map<string, boolean>;
  private measurementId!: string;
  private scopeCommands!: ScopeCommands;
  private productMappings!: ProductMappings;
  private nonInteractionEvents!: NonInteractionEvents;
  private onPreProcessCommands?: OnPreProcessCommandsHandler;
  private setCustomUserIdProperty!: boolean;
  private customLoadScriptFn?: () => Promise<void> | undefined;

  /**
   * Creates an instance of Google Analytics 4 integration. Setup Google Analytics 4
   * and initializes event commands map that will be used to obtain the command list
   * associated with an event.
   *
   * @param options               - User configured options.
   * @param loadData              - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics stripped down instance.
   */
  constructor(
    options: GA4IntegrationOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, strippedDownAnalytics);
    this.initialize(options);
    this.onSetUser(loadData);
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param consent - The consent object representing the user preferences.
   *
   * @returns If the integration is ready to be loaded.
   */
  static override shouldLoad(consent: ConsentData): boolean {
    return !!consent?.statistics;
  }

  /**
   * Initializes member variables from options and tries to initialize Google
   * Analytics 4.
   *
   * @param options - Options passed for the GA4 integration.
   */
  initialize(options: GA4IntegrationOptions) {
    this.optionsValidationResultsMap = validateFields(options);

    this.measurementId = options[OPTION_MEASUREMENT_ID];
    this.enableAutomaticPageViews =
      !!options[OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS];
    // Initialize user scope commands map
    this.scopeCommands = merge({}, options[OPTION_SCOPE_COMMANDS]);

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
   * @param data - Event data provided by analytics.
   */
  async trackPage(data: PageviewEventData) {
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
      const pageViewCommandList: GA4CommandList = [];

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
   * @param data - Event data provided by analytics.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  async processPageEvent(data: PageviewEventData) {
    const eventName = get(data, 'event');

    switch (eventName) {
      case analyticsPageTypes.BAG:
      case analyticsPageTypes.SEARCH:
      case analyticsPageTypes.WISHLIST:
        return await Promise.all([
          this.trackEvent({ ...data, type: trackTypes.TRACK }),
          this.trackPage(data),
        ]);
      default:
        return await this.trackPage(data);
    }
  }

  /**
   * Send events to GA4 if the input event data passes schema validation.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>) {
    await this.initializePromise;

    switch (data.type) {
      case analyticsTrackTypes.PAGE:
        return await this.processPageEvent(data as PageviewEventData);

      case analyticsTrackTypes.TRACK:
        return await this.trackEvent(data as TrackEventData);
      /* istanbul ignore next */
      default:
        /* istanbul ignore next */
        break;
    }
  }

  /**
   * Tracks an event. Send event to GA4 if the input event data passes schema
   * validation.
   *
   * @param data - Event data provided by analytics.
   */
  async trackEvent(data: TrackEventData) {
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
   * Validates the event against a schema. If no schema is defined for the event,
   * assume the event is valid.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns - If the event passed schema validation or not.
   */
  isEventDataValid(data: TrackEventData): boolean {
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
   * Execute user scope commands builder if there is any specified. The command list
   * returned by the builder will be sent to GA4 instance.
   *
   * @param data - Event data provided by analytics.
   */
  override async onSetUser(data: SetUserEventData | LoadIntegrationEventData) {
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
   * @param data - Event data provided by analytics.
   */
  sendEvent(data: TrackEventData): void {
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
   * @param commandList - List of commands to be executed by ga instance.
   * @param data        - Event data provided by analytics.
   */
  processCommandList(
    commandList: GA4CommandList | undefined,
    data:
      | TrackEventData
      | PageviewEventData
      | LoadIntegrationEventData
      | SetUserEventData,
  ): void {
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
   * Process the command list to check if there is an event that should receive the
   * command `nonInteraction`. If so, append the command to the list.
   *
   * @param commandList - List of commands to be executed by gtag instance.
   * @param eventName   - The event name passed.
   */
  processInteractionEvents(commandList: GA4CommandList, eventName: string) {
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
          const eventProperties = ga4Command[eventPropertiesIndex] as Record<
            string,
            unknown
          >;

          if (
            typeof eventProperties === 'object' &&
            !(NON_INTERACTION_FLAG in (eventProperties || {}))
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
   * @param data            - Event data provided by analytics.
   * @param scopeCommands   - Commands by scope configuration.
   * @param productMappings - User-configured product property mappings.
   *
   * @returns The GA4 command list for the event. It will return empty if there is an error or no command
   * builders exist for the event.
   */
  buildCommandListForEvent(
    data: TrackEventData,
    scopeCommands: ScopeCommands,
    productMappings: ProductMappings,
  ): GA4CommandList | undefined {
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
   * Returns extra commands to be sent to GA4 along with the main commands for a
   * pageview if there is an `extras` option configured for pageviews.
   *
   * @param data          - Event data provided by analytics.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns An array with the commands or undefined if there is no extra commands builder function.
   */
  getExtraCommandsForPage(
    data: PageviewEventData,
    scopeCommands: ScopeCommands,
  ): GA4CommandList | undefined {
    return this.executeCommandBuilder(
      get(scopeCommands, 'pageview.extras'),
      data,
    );
  }

  /**
   * Returns extra commands to be sent to GA4 along with the main commands for an
   * event if there is an `extras` option configured for the specified event.
   *
   * @param data          - Event data provided by analytics.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns An array with the commands or undefined if there is no extra commands builder function.
   */
  getExtraCommandsForEvent(
    data: TrackEventData,
    scopeCommands: ScopeCommands,
  ): GA4CommandList | undefined {
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
   * @param data            - Event data provided by analytics.
   * @param scopeCommands   - Commands by scope configuration.
   * @param productMappings - User-configured product property mappings.
   *
   * @returns An array with the commands or undefined if there is no extra commands builder function.
   */
  getMainCommandsForEvent(
    data: TrackEventData,
    scopeCommands: ScopeCommands,
    productMappings: ProductMappings,
  ): GA4CommandList | undefined {
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
   * @param event         - Event name.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns Main command builder for the event if there is one, undefined otherwise.
   */
  getMainCommandBuilderForEvent(
    event: string,
    scopeCommands: ScopeCommands,
  ): EventScopeCommandsHandlers['main'] {
    let commandBuilder: EventScopeCommandsHandlers['main'] = get(
      scopeCommands,
      `event.${event}.main`,
    );

    if (commandBuilder) {
      return commandBuilder;
    }

    commandBuilder = get(scopeCommands, 'event.*.main');

    if (commandBuilder) {
      return commandBuilder;
    }

    return getDefaultCommandsBuilder(
      event,
    ) as EventScopeCommandsHandlers['main'];
  }

  /**
   * Returns the extra commands builder for an event.
   *
   * @param event         - Event name.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns Extra commands builder for the event if there is one, undefined otherwise.
   */
  getExtrasCommandBuilderForEvent(
    event: string,
    scopeCommands: ScopeCommands,
  ): EventScopeCommandsHandlers['extras'] {
    const commandBuilder: EventScopeCommandsHandlers['extras'] = get(
      scopeCommands,
      `event.${event}.extras`,
    );

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(scopeCommands, 'event.*.extras');
  }

  /**
   * Executes a command builder.
   *
   * @throws
   * If the command builder passed is not a function or the output is not of the
   * proper type.
   *
   * @param commandBuilder - The command builder to execute.
   * @param args           - Arguments to be passed to the command builder.
   *
   * @returns Output of the command builder execution.
   */
  executeCommandBuilder<T>(
    commandBuilder: T,
    ...args: T extends (...args: infer R) => GA4CommandList ? R : never
  ) {
    if (commandBuilder) {
      if (typeof commandBuilder !== 'function') {
        throw new TypeError('Command builder is not a function.');
      }

      const commandList = commandBuilder(...args) as GA4CommandList;
      const validationResult = this.validateCommandList(commandList);

      if (!validationResult.isValid) {
        throw new TypeError(
          'Invalid output obtained for command builder. It must be an array of arrays.',
        );
      }

      return commandList;
    }

    return undefined;
  }

  /**
   * Validates if the provided command list is in the expected format and.
   *
   * @param commandList - The command list to validate.
   *
   * @returns An object with a boolean `isValid` with the result of the validation and a string
   * `errorMessage` with the validation error if available.
   */
  validateCommandList(commandList: GA4CommandList): {
    isValid: boolean;
    errorMessage?: string;
  } {
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
   * Method that will resolve which way gtag script should be loaded, default or
   * custom.
   *
   * @param options - User configured options.
   */

  loadGtagScript(options: GA4IntegrationOptions): void {
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
   * @param options - User configured options.
   */
  internalLoadScript(options: GA4IntegrationOptions) {
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
