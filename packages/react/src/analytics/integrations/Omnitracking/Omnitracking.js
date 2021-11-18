/**
 * Omnitracking integration for web apps. This integration extends the Omnitracking class
 * in @farfetch/blackout-core that contains most of the business logic and adds logic to
 * persist and retrieve the unique view ids of each page view. This will fix
 * the bug where the previousUniqueViewId was null when the user opens a product
 * detail page in another tab instead of containing the uniqueViewId of the
 * referrer page.
 *
 *
 * @example <caption>Adding Omnitracking integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('omnitracking', integrations.Omnitracking);
 *
 * @module Omnitracking
 * @category Analytics
 * @subcategory Integrations
 */

import { trackTypes } from '@farfetch/blackout-core/analytics';
import OmnitrackingCore from '@farfetch/blackout-core/analytics/integrations/Omnitracking/Omnitracking';
import UniqueViewIdStorage from './storage/UniqueViewIdStorage';
import UniqueViewIdStorageOptions from './storage/UniqueViewIdStorageOptions';

/**
 * Omnitracking integration.
 *
 * @private
 * @augments OmnitrackingCore
 */
class Omnitracking extends OmnitrackingCore {
  /**
   * Builds a new instance and initializes the unique view storage system.
   * It will also set the currentUniqueViewId by checking if the value from
   * document.referrer is available in storage. Note that document.referrer
   * must contain the full URL, so the referrer-policy header for the
   * page request must be adjusted accordinly.
   *
   * @param {object} options   - Integration options.
   * @param {object} loadData  - Analytics's load event data.
   * @param {object} analytics - Stripped down analytics instance with helper methods.
   *
   * @returns {Omnitracking} An instance of Omnitracking class.
   */
  constructor(options, loadData, analytics) {
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
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    const baseReturnValue = await super.track(data);
    const trackType = data.type;

    if (trackType === trackTypes.PAGE) {
      this.uniqueViewIdStorage.set(
        window.location.href,
        this.currentUniqueViewId,
      );
    }

    return baseReturnValue;
  }

  /**
   * Method used to create a new Omnitracking instance by analytics.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   * @param {object} analytics - Stripped down analytics instance with helper methods.
   *
   * @returns {Omnitracking} An instance of Omnitracking class.
   */
  static createInstance(options, loadData, analytics) {
    return new Omnitracking(options, loadData, analytics);
  }
}

export default Omnitracking;
