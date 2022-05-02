/**
 * Analytics service integration will send data to Analytics service.
 *
 * @example <caption>Adding AnalyticsService integration to analytics</caption>
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('analyticsService', integrations.AnalyticsService);
 */

import {
  EventData,
  integrations,
  SetUserEventData,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import { isPageEventType } from '@farfetch/blackout-analytics/utils';

/**
 * Analytics service integration.
 */
class AnalyticsServiceWeb extends integrations.AnalyticsService {
  /**
   * Function that will create and store the interval.
   *
   * @param interval - The interval in milliseconds for the queue flush.
   */
  setup(interval: number) {
    this.interval = setInterval(this.flushQueue, interval);

    window.addEventListener('beforeunload', this.flushQueue);
  }

  /**
   * Controls the queue by flushing it when a new page is tracked.
   * This will make sure all previously tracked events (that were not flushed yet) are persisted properly when a page change occurs.
   *
   * @param data - Event data provided by analytics.
   */
  controlQueue(data: EventData<TrackTypesValues> | SetUserEventData) {
    if (isPageEventType(data as EventData<TrackTypesValues>)) {
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
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = undefined;
  }
}

export default AnalyticsServiceWeb;
