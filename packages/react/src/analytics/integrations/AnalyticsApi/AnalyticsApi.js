import {
  eventTypes,
  integrations,
  pageTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import client from '@farfetch/blackout-core/helpers/client';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';

export default class AnalyticsAPI extends integrations.Integration {
  static [utils.CONSENT_CATEGORIES_PROPERTY] =
    utils.DefaultConsentKeys.MARKETING;

  /**
   * Creates an instance of Analytics Api integration.
   *
   * @param {object} options               - User configured options.
   * @param {object} loadData              - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics stripped down instance.
   */
  constructor(options, loadData, strippedDownAnalytics) {
    super(options, loadData, strippedDownAnalytics);

    // Check if whitelistedEvents is an array
    if (
      this.options.whitelistedEvents &&
      !isArray(this.options.whitelistedEvents)
    ) {
      throw new Error(
        '[Analytics API] - Configuration error: option `whitelistedEvents` from Analytics Api integration options must be an array.',
      );
    }

    // Check if blacklistedEvents is an array
    if (
      this.options.blacklistedEvents &&
      !isArray(this.options.blacklistedEvents)
    ) {
      throw new Error(
        '[Analytics API] - Configuration error: option `blacklistedEvents` from Analytics Api integration options must be an array.',
      );
    }

    if (this.options.blacklistedEvents && this.options.whitelistedEvents) {
      throw new Error(
        '[Analytics API] - Configuration error: `blacklistedEvents` and `whitelistedEvents` cannot both be set at the same time.',
      );
    }

    this.debugMode =
      utils.getCookie('analyticsAPIDebug')?.toLowerCase() === 'true';

    this.whitelisted = !this.options.blacklistedEvents
      ? this.options.whitelistedEvents || [
          ...Object.values(pageTypes),
          ...Object.values(eventTypes),
        ]
      : undefined;
  }

  /**
   * Creates and returns the instance for the Analytics API integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics' load event data.
   * @param {object} strippedAnalytics - Analytics stripped down instance.
   *
   * @returns {AnalyticsAPI} The instance created.
   */
  static createInstance(options, loadData, strippedAnalytics) {
    return new this(options, loadData, strippedAnalytics);
  }

  /**
   * Track method that will call Analytics API with the necessary data per event.
   * If there's more than one pageType per event, it will call Analytics API with each page type at a time.
   *
   * @async
   *
   * @param {object} data - Track event data.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    if (
      this.whitelisted?.includes(data.event) ||
      (this.options.blacklistedEvents &&
        !this.options.blacklistedEvents.includes(data.event))
    ) {
      const payload = {
        data,
        options: this.getOptions(),
      };

      if (this.debugMode) {
        utils.logger.info('[Analytics API] - track:', payload);
      }

      return await this.callAPI(payload);
    }
  }

  /**
   * Calls the Analytics API with the given payload.
   *
   * @async
   *
   * @param {object} data - Analytics' event data.
   */
  async callAPI(data) {
    await client.post('/analytics/v1/events', data);
  }

  /**
   * Obtain options with additional common properties.
   *
   * @returns {object} The options data.
   */
  getOptions() {
    return omit({ ...this.options, debugMode: this.debugMode }, [
      'whitelistedEvents',
      'blacklistedEvents',
    ]);
  }
}
