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

import { integrations, utils } from '@farfetch/blackout-core/analytics';

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

    utils.logger.warn(
      '[Analytics] Nethone - This integration is not supported. Consider remove the usage of Nethone, because it will not trigger any inner event.',
    );
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
}

export default Nethone;
