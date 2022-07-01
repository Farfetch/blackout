import Analytics, {
  trackTypes as analyticsTrackTypes,
  EventContextData,
  EventProperties,
  IntegrationRuntimeData,
  platformTypes,
} from '@farfetch/blackout-analytics';
import webContext from './context';

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
    super(platformTypes.Web);

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

      const pageEventData = await super.getTrackEventData(
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
