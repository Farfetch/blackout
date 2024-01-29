import {
  type EventContextData,
  type EventData,
  type EventProperties,
  type TrackTypesValues,
  utils,
} from '@farfetch/blackout-analytics';
import UniqueViewIdStorage from './uniqueViewIdStorage/UniqueViewIdStorage.js';
import type { ProcessedContextWeb } from './context.js';

/**
 * Helper class used by analytics to manage state that will
 * be added to the context of each event.
 */
export default class WebContextStateManager {
  // Instance that manages the storage of unique view ids.
  uniqueViewIdStorage: UniqueViewIdStorage | null = null;
  // Unique id for the previous page. Generated internally if it is not passed in event properties. Used by Omnitracking.
  previousUniqueViewId: ProcessedContextWeb[typeof utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID] =
    null;
  // Unique id for the current page. Generated internally if it is not passed in event properties. Used by Omnitracking.
  currentUniqueViewId: ProcessedContextWeb[typeof utils.ANALYTICS_UNIQUE_VIEW_ID] =
    null;
  // Last used `from` parameter in either a page or track call to analytics. Used by Omnitracking.
  lastFromParameter: ProcessedContextWeb[typeof utils.LAST_FROM_PARAMETER_KEY] =
    null;
  // Since document.referrer stays the same on single page applications,
  // we have this alternative that will hold the previous page location
  // based on page track calls with `analyticsWeb.page()`.
  lastPageLocation: string | undefined;

  /**
   * Initializes last page location with the document.referrer if it is
   * available.
   */
  constructor() {
    this.lastPageLocation =
      typeof document !== 'undefined' ? document.referrer : undefined;
  }

  /**
   * Updated last page location which will be used to calculate
   * the pageLocationReferrer context parameter. This is separate
   * from other state updates since it normally needs to be done after
   * the event is dispatched to analytics.
   */
  updateLastPageLocation() {
    const locationHref = window.location.href;

    if (this.lastPageLocation !== locationHref) {
      // The 'pageLocationReferrer' should not change on loadIntegration and onSetUser events.
      this.lastPageLocation = locationHref;
    }
  }

  /**
   * Gets the current snapshot of the managed state.
   *
   * @returns Current snapshot of the managed state.
   */
  getSnapshot() {
    return {
      [utils.ANALYTICS_UNIQUE_VIEW_ID]: this.currentUniqueViewId,
      [utils.ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID]: this.previousUniqueViewId,
      [utils.LAST_FROM_PARAMETER_KEY]: this.lastFromParameter,
      [utils.PAGE_LOCATION_REFERRER_KEY]: this.lastPageLocation,
    };
  }

  /**
   * Updates relevant state based on the passed page event that will be tracked.
   *
   * @param _event - Event name. Not used at the moment but added as it might be useful in the future.
   * @param properties - Properties of the event.
   * @param _eventContext - Event context. Not used at the moment but added as it might be useful in the future.
   */
  updateStateFromPageEvent(
    _event: string,
    properties?: EventProperties,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _eventContext?: EventContextData,
  ) {
    // Store the previousUniqueViewId with the last current one.
    this.previousUniqueViewId = this.currentUniqueViewId;

    // Generates a new unique view ID for the new page track,
    // so it can be used when the context of the current event is processed by `this.context()` (super overridden) method.
    const newUniqueViewId = utils.getUniqueViewId({
      properties,
    } as EventData<TrackTypesValues>);

    // Sets the current unique view ID on the storage for the current URL
    this.uniqueViewIdStorage?.set(window.location.href, newUniqueViewId);

    // Saves the current unique view ID for the next events
    this.currentUniqueViewId = newUniqueViewId;
  }

  /**
   * Updates relevant state based on the track event that will be tracked.
   *
   * @param _event - Event name. Not used at the moment but added as it might be useful in the future.
   * @param properties - Properties of the event.
   * @param _eventContext - Event context. Not used at the moment but added as it might be useful in the future.
   */
  updateStateFromTrackEvent(
    _event: string,
    properties?: EventProperties | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _eventContext?: EventContextData | undefined,
  ) {
    // Always set the `lastFromParameter` with what comes from the current event (pageview or not),
    // so if there's a pageview being tracked right after this one,
    // it will send the correct `navigatedFrom` parameter.
    // Here we always set the value even if it comes `undefined` or `null`,
    // otherwise we could end up with a stale `lastFromParameter` if some events are tracked
    // without the `from` parameter.
    this.lastFromParameter = (properties?.from as string) || null;
  }

  /**
   * Initializes the uniqueViewId storage based on the referrer, in case the user
   * opens a link of the website in a new tab.
   * document.referrer will point to the original URL from the previous tab,
   * so we try to grab a uniqueViewId based on that to keep the user journey correct in terms of tracking.
   */
  initialize() {
    this.uniqueViewIdStorage = new UniqueViewIdStorage();
    this.currentUniqueViewId = this.uniqueViewIdStorage.get(document.referrer);
  }
}
