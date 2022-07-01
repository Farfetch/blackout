/**
 * Google Analytics Integration. Will load the google analytics script and apply
 * the enhanced ecommerce plugin.
 *
 * @example <caption>Adding GA integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('GA', integrations.GA, \{
 *  createFields: \{
 *     trackingId: '\<google analytics container id\>'
 *  \}
 * \});
 *
 * ```
 */
import {
  trackTypes as analyticsTrackTypes,
  ConsentData,
  EventData,
  integrations,
  LoadIntegrationEventData,
  PageviewEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackEventData,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { loadGaScript } from './gaLoadScript';
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
import type {
  EventScopeCommandsHandlers,
  GACommandList,
  GAIntegrationOptions,
  NonInteractionEvents,
  OnPreProcessCommandsHandler,
  PageviewScopeExtrasCommandsHandler,
  ProductMappings,
  Schemas,
  ScopeCommands,
  ValidateCommandResult,
} from './types';

/**
 * Google Analytics Integration.
 */
class GA extends integrations.Integration<GAIntegrationOptions> {
  private initializePromiseResolve?: (value?: void | Promise<void>) => void;
  private initializePromise: Promise<void>;
  private scopeCommands?: ScopeCommands;
  private schemaEventsMap!: Schemas;
  private productMappings!: ProductMappings;
  private onPreProcessCommands!: OnPreProcessCommandsHandler;
  private nonInteractionEvents!: NonInteractionEvents;

  /**
   * Creates an instance of Google Analytics integration. Setup google analytics and
   * initializes event commands map that will be used to obtain the command list
   * associated with an event.
   *
   * @param options               - User configured options.
   * @param loadData              - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics stripped down instance.
   */
  constructor(
    options: GAIntegrationOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, strippedDownAnalytics);

    this.initializePromise = new Promise(resolve => {
      this.initializePromiseResolve = resolve;
    });

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
  static override shouldLoad(consent: ConsentData | null): boolean {
    return !!consent && !!consent.statistics;
  }

  /**
   * Send page hits to GA.
   *
   * @param data - Event data provided by analytics.
   */
  async trackPage(data: PageviewEventData) {
    await this.initializePromise;

    if (!window.ga || !window.ga.loaded) {
      utils.logger.error(
        '[GA] - Page event failed: Google Analytics is not loaded.',
      );
      return;
    }

    try {
      const location = utils.getLocation(data);
      const pageviewCommandList: GACommandList = [];

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
   * @param data - Event data provided by analytics.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>): Promise<void> {
    switch (data.type) {
      case analyticsTrackTypes.PAGE:
        return await this.trackPage(data as PageviewEventData);

      case analyticsTrackTypes.TRACK:
        return await this.trackEvent(data as TrackEventData);

      default:
        break;
    }
  }

  /**
   * Tracks an event. Send event hits to GA if the input event data passes schema
   * validation.
   *
   * @param data - Event data provided by analytics.
   */
  async trackEvent(data: TrackEventData): Promise<void> {
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
   * Execute user scope commands builder if there is any specified. The command list
   * returned by the builder will be sent to GA instance.
   *
   * @param data - Event data provided by analytics.
   */
  override async onSetUser(
    data: SetUserEventData | LoadIntegrationEventData,
  ): Promise<void> {
    await this.initializePromise;

    if (!window.ga || !window.ga.loaded) {
      utils.logger.error(
        '[GA] - onSetUser failed: Google Analytics is not loaded.',
      );
      return;
    }

    try {
      const eventData: typeof data = {
        ...data,
        user: utils.hashUserData(data.user),
      };

      const userId = get(eventData, 'user.id', null);
      const isGuest = get(data, 'user.traits.isGuest', true);

      window.ga('set', 'userId', isGuest ? null : userId);

      const userHitCommandBuilder = get(
        this.scopeCommands,
        'user',
      ) as ScopeCommands['user'];

      const commandList = this.executeCommandBuilder(
        userHitCommandBuilder,
        eventData,
      );

      this.processCommandList(commandList, data);
    } catch (error) {
      utils.logger.error(
        `[GA] - An error occurred when trying to process a user changed event: ${error}`,
      );
    }
  }

  /**
   * Validates the event against a schema. If no schema is defined for the event,
   * assume the event is valid.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns If the event passed schema validation or not.
   */
  isEventDataValid(data: EventData<TrackTypesValues>): boolean {
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
   * Send event data to GA by compiling the data to a command list that will feed the
   * ga function.
   *
   * @param data - Event data provided by analytics.
   */
  sendEvent(data: TrackEventData): void {
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
   * @param gaCommandList - List of commands to be executed by ga instance.
   * @param data          - Event data provided by analytics.
   */
  processCommandList(
    gaCommandList: GACommandList | undefined,
    data:
      | EventData<TrackTypesValues>
      | LoadIntegrationEventData
      | SetUserEventData,
  ): void {
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
   * Process the command list to check if there is an event that should receive the
   * command `nonInteraction`. If so, append the command to the list.
   *
   * @param gaCommandList - List of commands to be executed by ga instance.
   */
  processInteractionEvents(gaCommandList: GACommandList): void {
    each(gaCommandList, gaCommand => {
      each(gaCommand, command => {
        // Strictly check for the value and type
        if (
          typeof command === 'string' &&
          this.nonInteractionEvents &&
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
   * @param data            - Event data provided by analytics.
   * @param scopeCommands   - Commands by scope configuration.
   * @param productMappings - User-configured product property mappings.
   *
   * @returns The GA command list for the event. It will return empty if there is an error or no command
   * builders exist for the event.
   */
  buildCommandListForEvent(
    data: TrackEventData,
    scopeCommands?: ScopeCommands,
    productMappings?: ProductMappings,
  ): GACommandList | undefined {
    const extraCommands = this.getExtraCommandsForEvent(data, scopeCommands);

    const mainCommands = this.getMainCommandsForEvent(
      data,
      scopeCommands,
      productMappings,
    );

    if (extraCommands || mainCommands) {
      const commandList: GACommandList = [];

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
   * Returns extra commands to be sent to GA along with the main commands for a
   * pageview hit if there is an `extras` option configured for pageviews.
   *
   * @param data          - Event data provided by analytics.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns An array with the commands or null if there was an error executing the extra commands
   * builder.
   */
  getExtraCommandsForPage(
    data: PageviewEventData,
    scopeCommands?: ScopeCommands,
  ): GACommandList | undefined {
    const extrasCommandBuilder = get(
      scopeCommands || {},
      'hit.pageview.extras',
    ) as PageviewScopeExtrasCommandsHandler['extras'] | undefined;

    return this.executeCommandBuilder(extrasCommandBuilder, data);
  }

  /**
   * Returns extra commands to be sent to GA along with the main commands for an
   * event hit if there is an `extras` option configured for the specified event.
   *
   * @param data          - Event data provided by analytics.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns An array with the commands or null if there was an error executing the extra commands
   * builder.
   */
  getExtraCommandsForEvent(
    data: TrackEventData,
    scopeCommands?: ScopeCommands,
  ): GACommandList | undefined {
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
   * @returns An array with the commands or null if there was an error executing the main commands
   * builder.
   */
  getMainCommandsForEvent(
    data: TrackEventData,
    scopeCommands?: ScopeCommands,
    productMappings?: ProductMappings,
  ): GACommandList | undefined {
    const event = get(data, 'event');

    const mainCommandBuilder = this.getMainCommandBuilderForEvent(
      event,
      scopeCommands,
    );

    return this.executeCommandBuilder(
      mainCommandBuilder,
      data,
      productMappings as ProductMappings,
    );
  }

  /**
   * Returns the main command builder for an event hit.
   *
   * @param event         - Event name.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns Main command builder for the hit if there is one, undefined otherwise.
   */
  getMainCommandBuilderForEvent(
    event: string,
    scopeCommands?: ScopeCommands,
  ): EventScopeCommandsHandlers['main'] {
    let commandBuilder = get(
      scopeCommands,
      `hit.event.${event}.main`,
    ) as EventScopeCommandsHandlers['main'];

    if (commandBuilder) {
      return commandBuilder;
    }

    commandBuilder = get(
      scopeCommands,
      'hit.event.*.main',
    ) as EventScopeCommandsHandlers['main'];

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(
      defaultEventCommands,
      event,
    ) as EventScopeCommandsHandlers['main'];
  }

  /**
   * Returns the extra commands builder for an event hit.
   *
   * @param event         - Event name.
   * @param scopeCommands - Commands by scope configuration.
   *
   * @returns Extra commands builder for the hit if there is one, undefined otherwise.
   */
  getExtrasCommandBuilderForEvent(
    event: string,
    scopeCommands?: ScopeCommands,
  ): EventScopeCommandsHandlers['extras'] {
    const commandBuilder = get(
      scopeCommands,
      `hit.event.${event}.extras`,
    ) as EventScopeCommandsHandlers['extras'];

    if (commandBuilder) {
      return commandBuilder;
    }

    return get(
      scopeCommands,
      'hit.event.*.extras',
    ) as EventScopeCommandsHandlers['extras'];
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
  executeCommandBuilder<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends ((...args: any[]) => GACommandList) | undefined,
  >(
    commandBuilder: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: T extends (...args: any[]) => GACommandList
      ? Parameters<T>
      : undefined[]
  ): GACommandList | undefined | never {
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

    return undefined;
  }

  /**
   * Validates if the provided command list is in the expected format and if the
   * product category hierarchy values does not exceed the maximum supported levels
   * in GA.
   *
   * @param commandList - The command list to validate.
   *
   * @returns An object with a boolean `isValid` with the result of the validation and a string
   * `errorMessage` with the validation error if available.
   */
  validateCommandList(commandList: GACommandList): ValidateCommandResult {
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
   * Initializes member variables from options and initializes google analytics with
   * Enhanced Ecommerce plugin.
   *
   * @param options - Options passed for the GA integration.
   */
  initialize(options: GAIntegrationOptions) {
    // Initialize ga create fields
    const createFields = options.createFields;

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
        this.onPreProcessCommands = onPreProcessCommands as (
          commandList: GACommandList,
        ) => GACommandList;
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
    loadGaScript.call(
      this,
      window,
      document,
      'script',
      'https://www.google-analytics.com/analytics.js',
      'ga',
    );

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
      this.initializePromiseResolve = undefined;
    }
  };
}

export default GA;
