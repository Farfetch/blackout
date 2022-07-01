/**
 * Vitorino Integration. Loads the Vitorino script and calls its methods.
 *
 * @example <caption>Adding Vitorino integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('vitorino', integrations.Vitorino, \{\});
 * ```
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
import {
  EventData,
  integrations,
  LoadIntegrationEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { postTrackings } from '@farfetch/blackout-client';
import isArray from 'lodash/isArray';
import type {
  Config,
  VitorinoIntegrationOptions,
  VitorinoTrackCallback,
} from './types/types';
import type { WebContextType } from '../../context';

/**
 * Vitorino integration.
 */
export default class Vitorino extends integrations.Integration<VitorinoIntegrationOptions> {
  isScriptLoaded: boolean;
  getEventsMapper: typeof GET_EVENTS_MAPPER_FN;
  isVitorinoConfigured: boolean;
  vitorinoTrackCallback: VitorinoTrackCallback;
  initializePromiseResolve: ((value?: unknown) => void) | null;
  userIdPromiseResolve: ((value?: unknown) => void) | null;
  initializePromise: Promise<unknown> | null;
  userIdPromise: Promise<unknown> | null;
  config: Config | null;

  /**
   * This integration is required, so it must be loaded independently of user
   * consent.
   *
   * @returns If the integration should load or not.
   */
  static override shouldLoad() {
    return true;
  }

  /**
   * Creates an instance of Vitorino integration.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics' load event data.
   * @param analytics - Analytics stripped down instance.
   */
  constructor(
    options: VitorinoIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.isScriptLoaded = false;

    this.getEventsMapper = GET_EVENTS_MAPPER_FN;

    this.isVitorinoConfigured = false;

    this.vitorinoTrackCallback = null;

    this.initializePromiseResolve = null;

    this.userIdPromiseResolve = null;

    this.config = null;

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
   * When the user ID is available, config the vitorino and resolve the Promise so
   * the tracking can begin.
   *
   * @param data - Analytics' event data.
   */
  override async onSetUser(data: SetUserEventData): Promise<void> {
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
   * Makes the first call to Vitorino to configure it and receive the callback
   * function to be called later when a page change occurs.
   *
   * @param data - Analytics' setUser event data.
   */
  configVitorino(data: SetUserEventData) {
    this.config = this.buildConfigData(data);

    this.vitorinoTrackCallback = window.Vitorino.track(this.config);

    this.isVitorinoConfigured = true;
  }

  /**
   * Prepares the mapper for the integration to work with.
   *
   * @param options - Integration options.
   */
  buildMapper(options: VitorinoIntegrationOptions) {
    const customMapperFn = options.eventsMapper;

    if (customMapperFn && typeof customMapperFn !== 'function') {
      utils.logger.error(INVALID_CUSTOM_MAPPER_ERROR_MESSAGE);

      return;
    }

    if (customMapperFn) {
      this.getEventsMapper = customMapperFn;
    }
  }

  /**
   * Method that will load the script and append it to the DOM.
   *
   * @param options - Integration options.
   */
  loadScript(options: VitorinoIntegrationOptions) {
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
   * Builds the object needed for the Vitorino pixel configuration with all necessary
   * data.
   *
   * @param data - Analytics' track data.
   *
   * @returns - The payload to be sent to the pixel.
   */
  buildConfigData(data: SetUserEventData): Config {
    const dataWithWebEventType = data as SetUserEventData & {
      context: WebContextType;
    };
    const correlationId = data.user.localId;
    const { tenantId, clientId, web } = dataWithWebEventType.context;
    const origin = web?.window?.location?.origin;

    if (!tenantId || !clientId) {
      throw new Error(MISSING_CONTEXT_ERROR_MESSAGE);
    }

    return {
      correlationId,
      tenantId,
      clientId,
      origin,
      customerId: utils.getCustomerIdFromUser(data.user),
      environment: this.getEnvironmentFromOptions(this.options),
      fields: {
        sensitiveFields: this.options?.sensitiveFields || [],
        secretFields: this.options?.secretFields || [],
      },
      network: this.options.network || {
        proxy: origin,
        path: `${MARKETING_API_PREFIX}${postTrackings.POST_TRACKINGS_PATHNAME}`,
      },
    };
  }

  /**
   * Returns the correspondent Vitorino page type for the event.
   *
   * @param event - The analytics event to filter by.
   *
   * @returns - The correspondent Vitorino's page view(s).
   */
  getPageTypeFromEvent(event: EventData<TrackTypesValues>['event']) {
    const mapper = this.getEventsMapper();

    if (!mapper || typeof mapper !== 'object') {
      throw new Error(INVALID_MAPPER_RETURN_TYPE_ERROR);
    }

    return mapper[event];
  }

  /**
   * Calculates the correct environment to pass to the Vitorino configuration.
   *
   * @param options - Integration options.
   *
   * @returns The correct environment.
   */
  getEnvironmentFromOptions(options: VitorinoIntegrationOptions) {
    const { environment } = options;
    const safeEnvironment =
      environment || window?.__BUILD_CONTEXT__?.env?.NODE_ENV;

    return safeEnvironment === ENVIRONMENT_TYPES.prod
      ? window.Vitorino.Environment.PRODUCTION
      : window.Vitorino.Environment.SANDBOX;
  }

  /**
   * Track method that will call Vitorino with the necessary data per event. If
   * there's more than one pageType per event, it will call Vitorino with each page
   * type at a time.
   *
   * @param data - Track event data.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>) {
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
   * Calls the callback function given from the config call to register a page view
   * change.
   *
   * @param page - The `page` parameter of the event.
   */
  callVitorino(page?: string) {
    if (this.isVitorinoConfigured && this.vitorinoTrackCallback) {
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
