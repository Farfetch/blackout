/* eslint-disable no-unused-vars */
/**
 * Analytics service integration will send data to Analytics service.
 *
 * @example <caption>Extending Analytics Service integration</caption>
 *
 * import \{ integrations \} from '\@farfetch/blackout-analytics';
 *
 * class ReactAnalyticsService extends integrations.AnalyticsService \{
 *      setup(interval) \{
 *          // Create an interval that will handle the queue.
 *      \}
 *
 *      clearInterval() \{
 *          // Handle how the clearInterval should be done
 *      \}
 * \}
 */

import {
  DATA_TYPE_FIELD,
  DATA_VERSION_FIELD,
  DEFAULT_REQUEST_INTERVAL,
  MINIMUM_REQUEST_INTERVAL,
  REQUEST_INTERVAL_KEY,
} from './constants';
import { hashUserData } from '../../utils';
import { postAnalytics } from '@farfetch/blackout-client/analyticsService';
import get from 'lodash/get';
import Integration from '../Integration';
import type {
  AnalyticsRequestPayload,
  AnalyticsServiceOptions,
} from './types/AnalyticsService.types';
import type {
  EventData,
  LoadIntegrationEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../..';

/**
 * Analytics service integration.
 */
class AnalyticsService extends Integration<AnalyticsServiceOptions> {
  constructor(
    options: AnalyticsServiceOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.initialize();
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @returns If the integration is ready to be loaded.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * List of events that will be stored for a period of time until they are processed.
   */
  queue: AnalyticsRequestPayload[] = [];

  /**
   * Interval that will be stored here.
   */
  interval?: NodeJS.Timeout = undefined;

  /**
   * Handles onSetUser event by sending the event data to Analytics service.
   *
   * @param data - Event data provided by analytics.
   */
  onSetUser(data: SetUserEventData) {
    this.addToQueue(data);
  }

  /**
   * Post all trackings to Analytics service.
   *
   * @param data - Event data provided by analytics.
   */
  track(data: EventData<TrackTypesValues>) {
    this.addToQueue(data);
  }

  /**
   * Initialization of the interval for the event list processing.
   */
  initialize() {
    const interval = get(
      this.options,
      REQUEST_INTERVAL_KEY,
      DEFAULT_REQUEST_INTERVAL,
    );

    if (typeof interval !== 'number') {
      throw new TypeError(
        `Analytics Service - The "${REQUEST_INTERVAL_KEY}" passed to the integration is not a number. Please make sure a valid number is passed.`,
      );
    }

    if (interval < MINIMUM_REQUEST_INTERVAL) {
      throw new Error(
        `Analytics Service - The "${REQUEST_INTERVAL_KEY}" passed to the integration is not valid. Please make sure you are passing a value superior than "${MINIMUM_REQUEST_INTERVAL}".`,
      );
    }

    this.setup(interval);
  }

  /**
   * Function that will create and store the interval.
   * This method is a placeholder and it should be implemented by \@farfetch/blackout-react/analytics and \@farfetch/blackout-react-native-analytics.
   *
   * @param interval - The interval in milliseconds for the queue flush.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(interval: number): void {
    throw new Error(
      "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
    );
  }

  /**
   * Controls the queue by flushing it when a new page is tracked.
   * This method is a placeholder and it should be implemented by \@farfetch/blackout-react/analytics and \@farfetch/blackout-react-native-analytics.
   *
   * @param data - Event data provided by analytics.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  controlQueue(data: EventData<TrackTypesValues> | SetUserEventData): void {
    throw new Error(
      "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
    );
  }

  /**
   * Adds events to the queue.
   *
   * @param data - Event data provided by analytics.
   */
  addToQueue(data: EventData<TrackTypesValues> | SetUserEventData) {
    const protectedUserData = hashUserData(data.user);

    const eventData = {
      ...data,
      user: protectedUserData,
    };

    this.queue.push({
      type: DATA_TYPE_FIELD,
      version: DATA_VERSION_FIELD,
      data: eventData,
    });

    this.controlQueue(eventData);
  }

  /**
   * Function that will be called on each interval of setInterval.
   * Calls the client to send the events to the endpoint of the analytics service.
   */
  flushQueue = () => {
    if (this.queue.length) {
      this.postDataToAnalyticsService(this.queue);

      this.cleanQueue();
    }
  };

  /**
   * Cleans the queue and resets it to the initial value - empty array.
   */
  cleanQueue() {
    this.queue = [];
  }

  /**
   * This method is a placeholder and it should be implemented by \@farfetch/blackout-react/analytics and \@farfetch/blackout-react-native-analytics.
   */
  clearInterval() {
    throw new Error(
      "This method should be implemented by the subclass. If you are getting this error, make sure you are using the correct integration from '@farfetch/blackout-client/react' or '@farfetch/blackout-react-native-analytics'.",
    );
  }

  /**
   * Post data to Analytics service specifying the version and type of data.
   *
   * @param data - Event data provided by analytics.
   */
  postDataToAnalyticsService(data: AnalyticsRequestPayload[]) {
    postAnalytics(data);
  }
}

export default AnalyticsService;
