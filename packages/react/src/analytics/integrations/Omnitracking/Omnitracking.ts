/**
 * Omnitracking integration for web apps. This integration extends the Omnitracking
 * class in \@farfetch/blackout-client that contains most of the business logic and
 * adds logic to persist and retrieve the unique view ids of each page view. This
 * will fix the bug where the previousUniqueViewId was null when the user opens a
 * product detail page in another tab instead of containing the uniqueViewId of the
 * referrer page.
 *
 * @example <caption>Adding Omnitracking integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('omnitracking', integrations.Omnitracking);
 *
 * ```
 */

import {
  EventData,
  integrations,
  LoadIntegrationEventData,
  OmnitrackingOptions,
  StrippedDownAnalytics,
  TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import UniqueViewIdStorage from './storage/UniqueViewIdStorage';
import UniqueViewIdStorageOptions from './storage/UniqueViewIdStorageOptions';

/**
 * Omnitracking integration.
 */
class Omnitracking extends integrations.Omnitracking {
  uniqueViewIdStorage: UniqueViewIdStorage;
  /**
   * Builds a new instance and initializes the unique view storage system. It will
   * also set the currentUniqueViewId by checking if the value from document.referrer
   * is available in storage. Note that document.referrer must contain the full URL,
   * so the referrer-policy header for the page request must be adjusted accordingly.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Stripped down analytics instance with helper methods.
   *
   * @returns An instance of Omnitracking class.
   */
  constructor(
    options: OmnitrackingOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.uniqueViewIdStorage = new UniqueViewIdStorage(
      UniqueViewIdStorageOptions.default(),
    );

    // Remove any expired items from local storage.
    this.uniqueViewIdStorage.removeExpired();

    this.currentUniqueViewId = this.uniqueViewIdStorage.get(document.referrer);
  }

  /**
   * Overrides Omnitracking's core track method by saving the currentUniqueViewId
   * when a page event is tracked.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>) {
    const baseReturnValue = await super.track(data);

    if (utils.isPageEventType(data)) {
      this.uniqueViewIdStorage.set(
        window.location.href,
        // currentUniqueViewId is guaranteed to be set by the base class here
        this.currentUniqueViewId as string,
      );
    }

    return baseReturnValue;
  }
}

export default Omnitracking;
