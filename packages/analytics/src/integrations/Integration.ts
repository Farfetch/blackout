import type {
  ConsentData,
  EventData,
  IntegrationOptions,
  LoadIntegrationEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../types/analytics.types';

/**
 * Base class for integrations.
 * It ensures the base functionality in order to work with analytics.
 */
class Integration<T extends IntegrationOptions> {
  /**
   * @param options - Integration options.
   * @param loadData - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics instance stripped down with only helpers.
   */
  constructor(
    protected options: T = {} as T, // Ugly but no alternative.
    protected loadData: LoadIntegrationEventData,
    protected strippedDownAnalytics: StrippedDownAnalytics,
  ) {}

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param consent - The current consent given by the user.
   *
   * @returns If the integration is ready to be loaded.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static shouldLoad(consent: ConsentData): boolean {
    throw new Error('Method not implemented');
  }

  /**
   * Method used to create a new instance of a Integration.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Analytics instance stripped down with only helpers.
   */
  static createInstance<Options extends IntegrationOptions>(
    options: Options,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ): Integration<Options> {
    return new this(options, loadData, analytics);
  }
  /**
   *
   * Tracks an event. This event can be a page view or a page action.
   *
   * @param data - Event data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  track(this: this, data: EventData<TrackTypesValues>): void {
    throw new Error('Method not implemented');
  }

  /**
   * Method to work with the consent object by the class that extends this one.
   *
   * @param consent - Consent object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setConsent(this: this, consent: ConsentData): void {
    // Do nothing
  }

  /**
   * Method called after user has been set in analytics.
   *
   * @param data - Event data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetUser(this: this, data: SetUserEventData): void {
    // Do nothing
  }
}

export default Integration;
