/**
 * Nethone integration for Analytics.
 * The purpose of this integration is to load a script tag pointing to the third party endpoint.
 * Nethone will validate tracking for fraud analysis.
 *
 * @example <caption>Adding Nethone integration to analytics</caption>
 *
 * import analytics, { integrations, eventTypes } from '@farfetch/blackout-react/analytics';
 *
 * // (...) After configuring Omnitracking and everything else on analytics properly, add the integration to analytics
 * analytics.addIntegration('nethone', integrations.Nethone, {
 *   // Specify the sensitive fields - Behavioural data gathered for these fields will be stripped of sensitive information
 *   sensitiveFields: {
 *       [eventTypes.SIGNUP_FORM_VIEWED]: ['password', 'register-password', 'confirm-register-password'],
 *   }
 *});
 *
 * @module Nethone
 * @category Analytics
 * @subcategory Integrations
 */

import {
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-core/analytics';
import {
  events,
  isEventOfInterest,
  isValidCulture,
  validSubfolders,
} from './nethone-helper';
import get from 'lodash/get';

/**
 * Nethone integration.
 *
 * @private
 * @augments Integration
 */
class Nethone extends integrations.Integration {
  /**
   * Creates an instance of Nethone.
   *
   * @param {object} options - The options for this integration.
   * @param {object} loadData - Analytics's load event data.
   */
  constructor(options, loadData) {
    super(options, loadData);
    this.isLoaded = false;
    this.initialized = false;
    this.baseUrl = 'https://iequ7wai.urjohmgbuuwi.com/s/4799/dja.js';

    utils.logger.warn(
      '[Analytics] Nethone - This integration will be deprecated in the next major version. Please make sure you use "Vitorino" integration instead.',
    );
  }

  /**
   * Method to validate if the integration is ready to load or not.
   * Since this integration is required, we return true right away.
   *
   * @returns {boolean} The status if its ready to load or not.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Method used to create a new Nethone instance by analytics.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Nethone} An instance of Nethone class.
   */
  static createInstance(options, loadData) {
    return new Nethone(options, loadData);
  }

  /**
   * Method responsible for tracking events.
   *
   * @param {object} data - Payload sent by analytics.
   *
   * @returns {Nethone} This allows chaining of class methods.
   */
  track(data) {
    switch (data.type) {
      case analyticsTrackTypes.TRACK:
        return this.trackEvent(data);

      case analyticsTrackTypes.PAGE:
        return null;

      default:
        break;
    }
  }

  /**
   * Method responsible for tracking custom events.
   * It will filter the event passed to check if is within the interest of the integration.
   * If the script is already loaded on the DOM, do not load again, according to Nethone rules.
   *
   * @param {object} data - Payload sent by analytics.
   *
   * @returns {Nethone} This allows chaining of class methods.
   */
  trackEvent(data) {
    const { event } = data;

    if (this.isLoaded) {
      return this;
    }

    if (isEventOfInterest(events, event)) {
      this.loadScript(data);
    }
  }

  /**
   * Loads the script tag with the source for the third party endpoint.
   *
   * @param {object} data - Payload sent by analytics.
   *
   * @returns {Nethone} This allows chaining of class methods.
   */
  loadScript(data) {
    const culture = get(data, 'context.culture', '').toUpperCase();

    if (!isValidCulture(culture, validSubfolders)) {
      return this;
    }

    const script = document.createElement('script');

    document.head.appendChild(script);
    script.onload = this.getOnload(data);
    script.setAttribute('data-test', 'nethone');
    script.async = true;
    script.src = this.baseUrl;

    this.isLoaded = true;

    return this;
  }

  /**
   * Returns a function to be added to `onload` of script tag.
   * Calculates the `attemptReference` and `sensitiveFields` for the call of Nethone function,
   * injected by the script.
   * If the initialization already occured, it does not call Nethone function again, according to Nethone rules.
   *
   * @param {object} data - Payload sent by analytics.
   *
   * @returns {void}
   */
  getOnload = data => () => {
    if (this.initialized) {
      return;
    }

    const {
      event,
      user: { localId },
    } = data;
    const correlationId = localId;
    const attemptReference = `${correlationId}_${data.timestamp}`;
    const fieldList = get(this.options, 'sensitiveFields');
    const sensitiveFields = get(fieldList, event, []);

    window.dftp.init({
      attemptReference,
      sensitiveFields,
    });

    this.initialized = true;
  };
}

export default Nethone;
