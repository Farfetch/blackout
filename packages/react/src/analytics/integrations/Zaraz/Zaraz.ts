import {
  ConsentData,
  EventData,
  integrations,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import {
  DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT,
  INTERNAL_ZARAZ_EVENT,
  OPTION_ENVIRONMENT,
  OPTION_EVENTS_MAPPER,
  OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT,
  ZARAZ_REQUEST_REGEX,
} from './constants';
import { extractHostFromScript } from './utils';
import defaultEventsMapper from './eventsMapper';
import merge from 'lodash/merge';
import type { EventsMapper, ZarazIntegrationOptions } from './types/types';

/**
 * Analytics integration with Cloudflare's Zaraz {@link
 * https://developers.cloudflare.com/zaraz/}.
 */
class Zaraz extends integrations.Integration<ZarazIntegrationOptions> {
  initializePromise: Promise<void> | null = null;
  initializePromiseResolve: ((value: void | PromiseLike<void>) => void) | null =
    null;
  initializePromiseReject: ((reason?: unknown) => void) | null = null;
  eventsMapper!: EventsMapper;
  /**
   * Creates an instance of Zaraz integration.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Analytics stripped down instance.
   */
  constructor(
    options: ZarazIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.initializePromise = new Promise((resolve, reject) => {
      this.initializePromiseResolve = resolve;
      this.initializePromiseReject = reject;
    });

    this.initialize();
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param consent - The consent object representing the user preferences.
   *
   * @returns If the integration is ready to be loaded.
   */
  static override shouldLoad(consent: ConsentData) {
    return !!consent?.marketing;
  }

  /**
   * Checks if the code is running under development environment.
   *
   * @returns True if it is under a development environment, false otherwise.
   */
  isDevelopment() {
    const environment =
      this.options[OPTION_ENVIRONMENT] ||
      window?.__BUILD_CONTEXT__?.env?.NODE_ENV;

    return environment === 'development';
  }

  /**
   * Tracks interested events with Zaraz.
   *
   * @param data - Event data from analytics.
   */
  override async track(data: EventData<TrackTypesValues>) {
    try {
      await this.initializePromise;

      const event = data.event;

      if (!Object.prototype.hasOwnProperty.call(this.eventsMapper, event)) {
        return;
      }

      const mapper = this.eventsMapper[event];

      if (typeof mapper !== 'function') {
        utils.logger
          .error(`[Zaraz] - Invalid mapper value configured for the event '${data.event}'. Value is: ${mapper}.
          This event will be discarded.`);
        return;
      }

      const mappedEventData = mapper(data);
      const [zarazMethod, zarazEventName, zarazData] = mappedEventData;

      if (typeof window.zaraz[zarazMethod] !== 'function') {
        utils.logger
          .error(`[Zaraz] - Invalid value for the zaraz method returned from mapper for event '${data.event}': '${zarazMethod}' is not a function in window.zaraz.
          This event will be discarded.`);
        return;
      }

      if (typeof zarazEventName !== 'string') {
        utils.logger
          .error(`[Zaraz] - Invalid value for the zaraz event name returned from mapper for event '${data.event}': '${zarazEventName}' is not a string.
          This event will be discarded.`);
        return;
      }

      window.zaraz[zarazMethod](zarazEventName, zarazData);
    } catch (e) {
      utils.logger.error(
        `[Zaraz] - An error occurred when trying to track event '${data.event}' with Zaraz: `,
        e,
      );
    }
  }

  /**
   * This sets up a fetch interceptor for development when testing locally (i.e. Host
   * is localhost/127.0.0.1/192.168.X.X) The interceptor will change any zaraz
   * fetches for hosts that are not localhost to go through localhost. This is
   * because zaraz debug mode sets a cookie that needs to be sent to the server call
   * to have any effect and Zaraz's script contains a call hardcoded to the domain
   * that it is associated with Cloudflare when calling either zaraz.track or
   * zaraz.ecommerce methods.
   */
  setupDevelopmentFetchInterceptor() {
    if (this.isDevelopment()) {
      const originalFetch = window.fetch;

      const newFetch = (input: RequestInfo | URL, init?: RequestInit) => {
        if (typeof input === 'string' && ZARAZ_REQUEST_REGEX.test(input)) {
          const requestUrl = new URL(input, window.location.href);

          if (requestUrl.host !== window.location.host) {
            input = input.replace(requestUrl.host, window.location.host);
          }
        }

        return originalFetch(input, init);
      };

      window.fetch = newFetch;
    }
  }

  /**
   * Loads zaraz script. The Zaraz's initialization script waits for the
   * DOMContentLoaded event to dispatch the call to load the final script, which has
   * already happened. To fix this, we fetch the code directly and replace the
   * DOMContentLoaded event with a custom event which will be triggered by this
   * method after appending the code to the DOM.
   */
  async loadZarazScript() {
    const zarazInitializationScriptEndpoint =
      this.options[OPTION_ZARAZ_INIT_SCRIPT_ENDPOINT] ??
      DEFAULT_ZARAZ_INIT_SCRIPT_ENDPOINT;

    const fetchPromise = fetch(zarazInitializationScriptEndpoint);

    const code = await fetchPromise
      .then(res => {
        return res.text();
      })
      .then(scriptContents => {
        let modifiedScript = scriptContents.replace(
          'DOMContentLoaded',
          INTERNAL_ZARAZ_EVENT,
        );

        if (this.isDevelopment()) {
          const host = extractHostFromScript(modifiedScript);

          if (host) {
            modifiedScript = modifiedScript.replace(host, window.location.host);
          }
        }

        return modifiedScript;
      });

    const scriptElement = document.createElement('script');
    scriptElement.textContent = code;
    document.head.appendChild(scriptElement);

    const event = new Event(INTERNAL_ZARAZ_EVENT, { bubbles: true });

    window.dispatchEvent(event);
  }

  /**
   * Initializes the integration by setting the fetch interceptor if running locally
   * and loads the zaraz script.
   */
  async initialize() {
    this.eventsMapper = merge(
      {},
      defaultEventsMapper,
      this.options[OPTION_EVENTS_MAPPER],
    );

    try {
      this.setupDevelopmentFetchInterceptor();

      await this.loadZarazScript();

      this.initializePromiseResolve?.();
      this.initializePromiseResolve = null;
      this.initializePromiseReject = null;
    } catch (e) {
      utils.logger.error(
        '[Zaraz] - An error occurred when trying to initialize Zaraz: ',
        e,
      );

      this.initializePromiseReject?.(e);
      this.initializePromiseReject = null;
      this.initializePromiseResolve = null;
    }
  }
}

export default Zaraz;
