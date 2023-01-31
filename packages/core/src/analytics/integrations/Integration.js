import { CONSENT_CATEGORIES_PROPERTY } from '../utils';
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
   * "consentCategories" that each integration can specify accordingly.
   */
  static [CONSENT_CATEGORIES_PROPERTY] = null;

  /**
   * Sets the given consent on the Class static property, so it can be accessed before the instance gets created.
   *
   * @param {object} options - Integration options.
   */
  static validateConsentCategories(options) {
    const consentCategories = options?.[CONSENT_CATEGORIES_PROPERTY];

    if (
      consentCategories &&
      typeof consentCategories !== 'string' &&
      !Array.isArray(consentCategories)
    ) {
      throw new TypeError(
        `[${this.prototype.constructor.name}] - "${CONSENT_CATEGORIES_PROPERTY}" is not an array nor a string. Make sure you are passing a valid consent type.`,
      );
    }
  }

  /**
   * Method to check if the integration is ready to be loaded.
   * It will set any given categories if provided via the options before proceeding with the check.
   *
   * @param {object} consented - The current consent given by the user.
   * @param {object} options   - Integration options.
   *
   * @returns {boolean} If the integration is ready to be loaded.
   */
  static shouldLoad(consented, options) {
    this.validateConsentCategories(options);

    const consentCategories =
      options?.[CONSENT_CATEGORIES_PROPERTY] ||
      this[CONSENT_CATEGORIES_PROPERTY];

    if (!consented || !consentCategories) {
      return false;
    }

    const safeConsentCategories = Array.isArray(consentCategories)
      ? consentCategories
      : [consentCategories];

    return safeConsentCategories.every(category => !!consented[category]);
  }

  /**
   * Method used to create a new instance of a Integration.
   *
   * @param {object} options   - Integration options.
   * @param {object} loadData  - Analytics's load event data.
   * @param {object} analytics - Analytics instance stripped down with only helpers.
   *
   * @returns {Integration} - The created instance of an integration.
   */
  static createInstance(options, loadData, analytics) {
    return new this(options, loadData, analytics);
  }

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
