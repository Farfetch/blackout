/**
 * Base class for integrations.
 * It ensures the base functionality in order to work with analytics.
 *
 * @category Analytics
 * @subcategory Integrations
 */
class Integration {
  /**
   * @hideconstructor
   *
   * @param {object} [options={}]               - Integration options.
   * @param {object} loadData                   - Analytics's load event data.
   * @param {object} strippedDownAnalytics      - Analytics instance stripped down with only helpers.
   */
  constructor(options = {}, loadData, strippedDownAnalytics) {
    this.options = options;
    this.loadData = loadData;
    this.strippedDownAnalytics = strippedDownAnalytics;
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @param {object} consent - The current consent given by the user.
   *
   * @returns {boolean} If the integration is ready to be loaded.
   */
  // eslint-disable-next-line no-unused-vars
  static shouldLoad(consent) {
    return false;
  }

  /**
   * Method used to create a new instance of a Integration.
   *
   * @param {object} options   - Integration options.
   * @param {object} loadData  - Analytics's load event data.
   * @param {object} analytics - Analytics instance stripped down with only helpers.
   */
  // eslint-disable-next-line no-unused-vars
  static createInstance(options, loadData, analytics) {}

  /**
   *
   * Tracks an event. This event can be a page view or a page action.
   *
   * @param {object} data - Event data.
   */
  // eslint-disable-next-line no-unused-vars
  track(data) {}

  /**
   * Method to work with the consent object by the class that extends this one.
   *
   * @param {object} consent - Consent object.
   */
  // eslint-disable-next-line no-unused-vars
  setConsent(consent) {}

  /**
   * Method called after user has been set in analytics.
   *
   * @param {object} data - Event data.
   */
  // eslint-disable-next-line no-unused-vars
  onSetUser(data) {}
}

export default Integration;
