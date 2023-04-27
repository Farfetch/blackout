import {
  type AnalyticsApiIntegrationOptions,
  type AnalyticsApiTrackData,
} from './types/types.js';
import { client } from '@farfetch/blackout-client';
import {
  type EventData,
  EventTypes,
  integrations,
  type LoadIntegrationEventData,
  PageTypes,
  type StrippedDownAnalytics,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import { isArray, omit } from 'lodash-es';

export default class AnalyticsAPI extends integrations.Integration<AnalyticsApiIntegrationOptions> {
  static override [utils.CONSENT_CATEGORIES_PROPERTY] =
    utils.DefaultConsentKeys.MARKETING;
  private debugMode: boolean | undefined;
  private whitelisted: Array<string>;

  /**
   * Creates an instance of Analytics Api integration.
   *
   * @param options               - User configured options.
   * @param loadData              - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics stripped down instance.
   */
  constructor(
    options: AnalyticsApiIntegrationOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, strippedDownAnalytics);

    if (
      this.options.whitelistedEvents &&
      !isArray(this.options.whitelistedEvents)
    ) {
      throw new Error(
        '[Analytics API] - The value `options.whitelistedEvents` from Analytics Api integration options must be an array.',
      );
    }

    if (
      this.options.blacklistedEvents &&
      !isArray(this.options.blacklistedEvents)
    ) {
      throw new Error(
        '[Analytics API] - The value `options.blacklistedEvents` from Analytics Api integration options must be an array.',
      );
    }

    this.debugMode =
      utils.getCookie('analyticsAPIDebug')?.toLowerCase() === 'true';
    this.whitelisted = this.options.whitelistedEvents || [
      ...Object.values(PageTypes),
      ...Object.values(EventTypes),
    ];
  }

  /**
   * Track method that will call Analytics API with the necessary data per event.
   * If there's more than one pageType per event, it will call Analytics API with each page type at a time.
   *
   * @param data - Track event data.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>) {
    if (
      this.whitelisted?.includes(data.event) &&
      !this.options.blacklistedEvents?.includes(data.event)
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
   * @param data - Analytics' event data.
   */
  async callAPI(data: AnalyticsApiTrackData) {
    await client.post('/analytics/v1/events', data);
  }

  /**
   * Obtain options with additional common properties.
   *
   * @returns The options data.
   */
  private getOptions() {
    return omit({ ...this.options, debugMode: this.debugMode }, [
      'whitelistedEvents',
      'blacklistedEvents',
    ]);
  }
}
