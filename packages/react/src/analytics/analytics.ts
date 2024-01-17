import { get } from 'lodash-es';
import Analytics, {
  type ContextData,
  type EventContextData,
  type EventData,
  type EventProperties,
  type IntegrationRuntimeData,
  PlatformType,
  TrackType,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import UniqueViewIdStorage from './uniqueViewIdStorage/UniqueViewIdStorage.js';
import webContext, {
  type ProcessedContextWeb,
  type WebContext,
} from './context.js';

const {
  name: PACKAGE_NAME,
  version: PACKAGE_VERSION,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../../package.json');

/**
 * Analytics facade for web applications. Refer to \@farfetch/blackout-analytics
 * documentation to know the inherited methods from Analytics.
 */
class AnalyticsWeb extends Analytics {
  currentPageCallData: EventData<TrackTypesValues> | null = null;
  uniqueViewIdStorage: UniqueViewIdStorage | null = null;
  previousUniqueViewId: ProcessedContextWeb[typeof utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID] =
    null;
  currentUniqueViewId: ProcessedContextWeb[typeof utils.ANALYTICS_UNIQUE_VIEW_ID] =
    null;
  lastFromParameter: ProcessedContextWeb[typeof utils.LAST_FROM_PARAMETER_KEY] =
    null;
  lastPageLocation: string | undefined;

  constructor() {
    super(PlatformType.Web);

    this.lastPageLocation =
      typeof document !== 'undefined' ? document.referrer : undefined;

    // Add default contexts for the web platform
    this.useContext(webContext);
  }

  /**
   * Whenever the integrations are loaded at a certain point in time, we fetch them
   * and send the page track information. This can happen whenever the user gives
   * consent for a specific category mid session.
   *
   * @param loadedIntegrations - List of integrations that were loaded.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  protected override onLoadedIntegrations(
    loadedIntegrations: IntegrationRuntimeData[],
  ) {
    // If there is a previous page call data stored, send a page event to the integrations that were loaded by the consent
    if (this.currentPageCallData !== null) {
      super.forEachIntegrationSafe(loadedIntegrations, integration =>
        integration.track(
          this.currentPageCallData as EventData<TrackTypesValues>,
        ),
      );
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
  override context(): Promise<ContextData>;
  override context(key: string): Promise<unknown>;
  override async context(key?: string) {
    const context = await super.context();
    const processedContext = this.processContext(context as WebContext);

    return key ? get(processedContext, key) : processedContext;
  }

  /**
   * Process context to append context features related with this package.
   *
   * @param context - Context data that is specific for this event.
   */
  processContext(context: WebContext) {
    if (context) {
      context.library = {
        name: PACKAGE_NAME,
        version: `${context.library.name}@${context.library.version};${PACKAGE_NAME}@${PACKAGE_VERSION};`,
      };

      if (context.web) {
        context.web[utils.ANALYTICS_UNIQUE_VIEW_ID] = this.currentUniqueViewId;
        context.web[utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID] =
          this.previousUniqueViewId;
        context.web[utils.LAST_FROM_PARAMETER_KEY] = this.lastFromParameter;

        // Since document.referrer stays the same on single page applications,
        // we have this alternative that will hold the previous page location
        // based on page track calls with `analyticsWeb.page()`.
        context.web[utils.PAGE_LOCATION_REFERRER_KEY] = this.lastPageLocation;
      }
    }

    return context;
  }

  /**
   * Stores the lastFromParameter if available, so it can be used on the next event's context.
   * @param event        - Name of the event.
   * @param properties   - Properties of the event.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  override async track(
    event: string,
    properties?: EventProperties | undefined,
    eventContext?: EventContextData | undefined,
  ) {
    // Always set the `lastFromParameter` with what comes from the current event (pageview or not),
    // so if there's a pageview being tracked right after this one,
    // it will send the correct `navigatedFrom` parameter.
    // Here we always set the value even if it comes `undefined` or `null`,
    // otherwise we could end up with a stale `lastFromParameter` if some events are tracked
    // without the `from` parameter.
    this.lastFromParameter = (properties?.from as string) || null;

    await super.track(event, properties, eventContext);

    this.updatePageReferrer();

    return this;
  }

  updatePageReferrer() {
    const locationHref = window.location.href;

    if (this.lastPageLocation !== locationHref) {
      // The 'pageLocationReferrer' should not change on loadIntegration and onSetUser events.
      this.lastPageLocation = locationHref;
    }
  }

  /**
   * Tracks a page view.
   *
   * @param event        - Name of the event.
   * @param properties   - Properties of the event.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async page(
    event: string,
    properties?: EventProperties,
    eventContext?: EventContextData,
  ) {
    // Store the previousUniqueViewId with the last current one.
    this.previousUniqueViewId = this.currentUniqueViewId;

    // Generates a new unique view ID for the new page track,
    // so it can be used when the context of the current event is processed by `this.context()` (super overridden) method.
    const newUniqueViewId = utils.getUniqueViewId({
      properties,
    } as EventData<TrackTypesValues>);

    // Sets the current unique view ID on the storage for the current URL
    this.uniqueViewIdStorage?.set(window.location.href, newUniqueViewId);

    // Saves the current unique view ID for the next events
    this.currentUniqueViewId = newUniqueViewId;

    // Override the last page call data with the current one
    const pageEventData = await this.getTrackEventData(
      TrackType.Page,
      event,
      properties,
      eventContext,
    );

    this.currentPageCallData = pageEventData;

    await super.trackInternal(pageEventData);

    this.updatePageReferrer();

    return this;
  }

  /**
   * When webAnalytics is ready to start initializing the integrations, it means that
   * all conditions are met to access the document object.
   * Initializes the uniqueViewId storage based on the referrer, in case the user
   * opens a link of the website in a new tab.
   * document.referrer will point to the original URL from the previous tab,
   * so we try to grab a uniqueViewId based on that to keep the user journey correct in terms of tracking.
   *
   * @returns - Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  override async ready() {
    this.uniqueViewIdStorage = new UniqueViewIdStorage();
    this.currentUniqueViewId = this.uniqueViewIdStorage.get(document.referrer);

    return await super.ready();
  }
}

/**
 * Instance to be used to track events and pageviews.
 */
const instance = new AnalyticsWeb();

export default instance;
