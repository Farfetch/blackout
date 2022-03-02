import type {
  ConsentData,
  EventData,
  IntegrationOptions,
  LoadIntegrationEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../types/analytics.types';
export interface IntegrationFactory {
  new (
    options: IntegrationOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalytics: StrippedDownAnalytics,
  ): Integration;
  createInstance(
    options: IntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ): Integration;
  shouldLoad(consent: ConsentData): boolean;
}

/**
 * Base class for integrations.
 * It ensures the base functionality in order to work with analytics.
 */
abstract class Integration {
  /**
   * @param options - Integration options.
   * @param loadData - Analytics's load event data.
   * @param strippedDownAnalytics - Analytics instance stripped down with only helpers.
   */
  constructor(
    protected options: IntegrationOptions = {},
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
    return false;
  }

  /**
   * Method used to create a new instance of a Integration.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Analytics instance stripped down with only helpers.
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  static createInstance(
    options: IntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ): void {
    // Do nothing
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  /**
   *
   * Tracks an event. This event can be a page view or a page action.
   *
   * @param data - Event data.
   */
  abstract track(data: EventData<TrackTypesValues>): void;

  /**
   * Method to work with the consent object by the class that extends this one.
   *
   * @param consent - Consent object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setConsent(consent: ConsentData): void {
    // Do nothing
  }

  /**
   * Method called after user has been set in analytics.
   *
   * @param data - Event data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetUser(data: SetUserEventData): void {
    // Do nothing
  }
}

export default Integration;
