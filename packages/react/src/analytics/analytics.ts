import { get } from 'lodash-es';
import { PACKAGE_NAME, PACKAGE_NAME_VERSION } from './constants.js';
import Analytics, {
  type EventContextData,
  type EventData,
  type EventProperties,
  type IntegrationRuntimeData,
  PlatformType,
  TrackType,
  type TrackTypesValues,
} from '@farfetch/blackout-analytics';
import webContext, { type WebContext } from './context.js';
import WebContextStateManager from './WebContextStateManager.js';

/**
 * Analytics facade for web applications. Refer to \@farfetch/blackout-analytics
 * documentation to know the inherited methods from Analytics.
 */
class AnalyticsWeb extends Analytics {
  // Instance variable that manages state that will be used
  // to populate the context.web of all events so that
  // integrations can use.
  private webContextStateManager: WebContextStateManager;
  currentPageCallData: EventData<TrackTypesValues> | null = null;

  constructor() {
    super(PlatformType.Web);

    this.webContextStateManager = new WebContextStateManager();

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
  override context(): Promise<WebContext>;
  override context(key: string): Promise<unknown>;
  override async context(key?: string) {
    const context = (await super.context()) as WebContext;
    const processedContext = this.processContext(context);

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
        version: `${context.library.name}@${context.library.version};${PACKAGE_NAME_VERSION};`,
      };

      const webContextStateSnapshot = this.webContextStateManager.getSnapshot();

      this.decorateWebContext(context, webContextStateSnapshot);
    }

    return context;
  }

  /**
   * Decorates a context with the passed-in state snapshot.
   * The state is managed by this.webContextStateManager instance and
   * a snapshot is retrieved via getSnapshot() method.
   *
   * @param context - Context to decorate.
   * @param webContextState - Snapshot of the state used to decorate the context with.
   */
  private decorateWebContext(
    context: WebContext,
    webContextState: ReturnType<WebContextStateManager['getSnapshot']>,
  ) {
    if (context.web) {
      Object.assign(context.web, webContextState);
    }
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
    this.webContextStateManager.updateStateFromTrackEvent(
      event,
      properties,
      eventContext,
    );

    const currentWebStateSnapshot = this.webContextStateManager.getSnapshot();

    const trackEventData = await this.getTrackEventData(
      TrackType.Track,
      event,
      properties,
      eventContext,
    );

    // Decorate the context.web with the state
    // snapshot before dispatching the event.
    // This will override some properties from
    // the context.web object with the correct
    // values for the event since `getTrackEventData`
    // will call `context` method which might
    // be updated by other page calls.
    this.decorateWebContext(
      trackEventData.context as WebContext,
      currentWebStateSnapshot,
    );

    await super.trackInternal(trackEventData);

    // Always update page location after dispatching the
    // event so integrations will see the previous value
    // instead of the newly set value from this page call.
    // This is used by GA4 to properly track page views
    // in an SPA application.
    this.webContextStateManager.updateLastPageLocation();

    return this;
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
    this.webContextStateManager.updateStateFromPageEvent(
      event,
      properties,
      eventContext,
    );

    const currentWebStateSnapshot = this.webContextStateManager.getSnapshot();

    // Override the last page call data with the current one
    const pageEventData = await this.getTrackEventData(
      TrackType.Page,
      event,
      properties,
      eventContext,
    );

    // Decorate the context.web with the state
    // snapshot before dispatching the event.
    // This will override some properties from
    // the context.web object with the correct
    // values for the event since `getTrackEventData`
    // will call `context` method which might
    // be updated by other page calls.
    this.decorateWebContext(
      pageEventData.context as WebContext,
      currentWebStateSnapshot,
    );

    this.currentPageCallData = pageEventData;

    await super.trackInternal(pageEventData);

    // Always update page location after dispatching the
    // event so integrations will see the previous value
    // instead of the newly set value from this page call.
    // This is used by GA4 to properly track page views
    // in an SPA application.
    this.webContextStateManager.updateLastPageLocation();

    return this;
  }

  /**
   * When webAnalytics is ready to start initializing the integrations, it means that
   * all conditions are met to access the document object.
   *
   * @returns - Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  override async ready() {
    this.webContextStateManager.initialize();

    return await super.ready();
  }
}

/**
 * Instance to be used to track events and pageviews.
 */
const instance = new AnalyticsWeb();

export default instance;
