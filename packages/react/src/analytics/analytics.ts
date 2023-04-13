import { get } from 'lodash-es';
import Analytics, {
  TrackTypes as analyticsTrackTypes,
  type ContextData,
  type EventContextData,
  type EventData,
  type EventProperties,
  type IntegrationRuntimeData,
  PlatformTypes,
  type TrackTypesValues,
} from '@farfetch/blackout-analytics';
import webContext from './context.js';

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
  currentPageCallData: {
    event: string;
    properties?: EventProperties;
    eventContext?: EventContextData;
  } | null;

  constructor() {
    super(PlatformTypes.Web);

    // Stores the last page call
    this.currentPageCallData = null;

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
  protected override async onLoadedIntegrations(
    loadedIntegrations: IntegrationRuntimeData[],
  ) {
    // If there is a previous page call data stored, send a page event to the integrations that were loaded by the consent
    if (this.currentPageCallData) {
      const { event, properties } = this.currentPageCallData;

      const pageEventData = await this.getTrackEventData(
        analyticsTrackTypes.PAGE,
        event,
        properties,
      );

      super.forEachIntegrationSafe(loadedIntegrations, integration =>
        integration.track(pageEventData),
      );
    }
  }

  /**
   * Gets event data for a track event.
   *
   * @param type         - Type of the event being called.
   * @param event        - Name of the event from analytics.track call.
   * @param properties   - Event properties from analytics.track call.
   * @param eventContext - Context data that is specific for this event.
   *
   * @returns - Track event data to be sent to integrations.
   */
  override async getTrackEventData(
    type: TrackTypesValues,
    event: string,
    properties?: EventProperties,
    eventContext?: ContextData,
  ): Promise<EventData<TrackTypesValues>> {
    this.processContext(eventContext);

    return await super.getTrackEventData(type, event, properties, eventContext);
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

    this.processContext(context);

    return key ? get(context, key) : context;
  }

  /**
   * Process context to append context features related with this package.
   *
   * @param context - Context data that is specific for this event.
   */
  processContext(context?: ContextData) {
    if (context) {
      context.library = {
        name: PACKAGE_NAME,
        version: `${context.library.name}@${context.library.version};${PACKAGE_NAME}@${PACKAGE_VERSION};`,
      };
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
    // Override the last page call data with the current one
    this.currentPageCallData = {
      event,
      properties,
      eventContext,
    };

    await super.trackInternal(
      analyticsTrackTypes.PAGE,
      event,
      properties,
      eventContext,
    );

    return this;
  }
}

/**
 * Instance to be used to track events and pageviews.
 */
const instance = new AnalyticsWeb();

export default instance;
