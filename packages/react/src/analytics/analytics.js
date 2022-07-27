import Analytics, {
  trackTypes as analyticsTrackTypes,
  platformTypes,
} from '@farfetch/blackout-core/analytics';

/**
 * Analytics base class.
 *
 * @external farfetch/blackout-core/Analytics
 * @category Analytics
 */

/**
 * @typedef {module:analytics~AnalyticsWeb} AnalyticsWeb
 * @ignore
 */

/**
 * Analytics facade for web applications.
 * Refer to @farfetch/blackout-core documentation to know the
 * inherited methods from Analytics.
 *
 * @category Analytics
 * @alias AnalyticsWeb
 * @augments external:farfetch/blackout-core/Analytics
 */
class AnalyticsWeb extends Analytics {
  /**
   * @hideconstructor
   */
  constructor() {
    super(platformTypes.Web);

    // Stores the last page call
    this.currentPageCallData = null;
  }

  /**
   * Whenever the integrations are loaded at a certain point in time, we fetch them and send the page track information.
   * This can happen whenever the user gives consent for a specific category mid session.
   *
   * @private
   * @param {Array} loadedIntegrations - List of integrations that were loaded.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async onLoadedIntegrations(loadedIntegrations) {
    // If there is a previous page call data stored, send a page event to the integrations that were loaded by the consent
    if (this.currentPageCallData) {
      const { event, properties } = this.currentPageCallData;

      const pageEventData = await super.getTrackEventData(
        analyticsTrackTypes.PAGE,
        event,
        properties,
      );

      super.callIntegrationsMethod(
        loadedIntegrations,
        analyticsTrackTypes.TRACK,
        pageEventData,
      );
    }
  }

  /**
   * Track method for custom events.
   *
   * @param {string} event            - Name of the event.
   * @param {object} [properties]     - Properties of the event.
   * @param {object} [eventContext]   - Context data that is specific for this event.
   *
   * @returns {Promise<AnalyticsWeb>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async track(event, properties, eventContext) {
    await super.track(
      analyticsTrackTypes.TRACK,
      event,
      properties,
      eventContext,
    );

    return this;
  }

  /**
   * Tracks a page view.
   *
   * @param {string} event            - Name of the event.
   * @param {object} [properties]     - Properties of the event.
   * @param {object} [eventContext]   - Context data that is specific for this event.
   *
   * @returns {Promise<AnalyticsWeb>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async page(event, properties, eventContext) {
    // Override the last page call data with the current one
    this.currentPageCallData = {
      event,
      properties,
      eventContext,
    };

    await super.track(
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
 *
 * @type {AnalyticsWeb}
 * @name default
 * @memberof module:analytics
 * @static
 */
const instance = new AnalyticsWeb();

export default instance;
