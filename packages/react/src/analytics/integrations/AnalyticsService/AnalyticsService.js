/**
 * Analytics service integration will send data to fps Analytics service.
 *
 * @example <caption>Adding AnalyticsService integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('analyticsService', integrations.AnalyticsService);
 *
 * @module AnalyticsServiceWeb
 * @category Analytics
 * @subcategory Integrations
 */

import { integrations, trackTypes } from '@farfetch/blackout-analytics';

/**
 * Analytics service integration.
 *
 * @private
 * @augments integrations.AnalyticsService
 */
class AnalyticsServiceWeb extends integrations.AnalyticsService {
  /**
   * Method used to create a new AnalyticsService instance by analytics.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   * @param {object} analytics - Analytics instance stripped down with only helpers.
   *
   * @returns {AnalyticsServiceWeb} An instance of GTM class.
   */
  static createInstance(options, loadData, analytics) {
    return new AnalyticsServiceWeb(options, loadData, analytics);
  }

  /**
   * Function that will create and store the interval.
   *
   * @param {number} interval - The interval in milliseconds for the queue flush.
   *
   * @override
   */
  setup(interval) {
    this.interval = setInterval(this.flushQueue, interval);

    window.addEventListener('beforeunload', this.flushQueue);
  }

  /**
   * Controls the queue by flushing it when a new page is tracked.
   * This will make sure all previously tracked events (that were not flushed yet) are persisted properly when a page change occurs.
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @override
   */
  controlQueue(data) {
    if (data.type === trackTypes.PAGE) {
      this.flushQueue();
    }
  }

  /**
   * In case there is a valid reason to stop (or pause) this interval externally, this method is available to do so.
   * This will be possible by fetching the integration first and then calling this method, like this:
   * `analytics.integration('analyticsService').clearInterval()` (replace `analyticsService` with the name you gave when adding it with `analytics.addIntegration()`)
   * It can be initialized again later by calling the `.initialize()` method of the same instance.
   *
   * @override
   */
  clearInterval() {
    clearInterval(this.interval);

    this.interval = undefined;
  }
}

export default AnalyticsServiceWeb;
