/**
 * Castle Integration facade. This class will load the correct version of the castle integration according to the options passed
 * to prevent making breaking changes. On the next major version the Castle.v1 will be removed and Castle.v2 logic will be migrated to this class.
 *
 * TODO: Remove this facade when version 1.x is no longer supported.
 *
 * @example <caption>Adding Castle integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('castle', integrations.Castle, {
 *   appId: '<castle app id>' - castle v1
 *   pk: '<castle publishable key>' - castle v2
 *   {...otherOptions}
 * });
 *
 * @module Castle
 * @category Analytics
 * @subcategory Integrations
 */
import { integrations } from '@farfetch/blackout-core/analytics';
import CastleV2 from './CastleV2';

/**
 * Castle integration.
 *
 * @private
 * @augments Integration
 */
class Castle extends integrations.Integration {
  /**
   * This integration is required, so both versions of it should load independently of user consent.
   *
   * @returns {boolean} If the integration should load.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Creates and returns the instance for Castle integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Castle} The instance created.
   */
  static createInstance(options, loadData) {
    return this.loadCorrectVersion(options, loadData);
  }

  /**
   * Loads the correct instance according to the option passed.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Castle} - The correct instance according to the option passed.
   */
  static loadCorrectVersion(options, loadData) {
    if (options.configureOptions?.pk) {
      return CastleV2.createInstance(options, loadData);
    }

    if (options.appId) {
      throw new Error(
        '[Castle] - Could not load the correct version of Castle integration. The version 1 of Castle, is deprecated and is not available anymore. Make sure to pass the correct integration options.',
      );
    }

    throw new Error(
      '[Castle] - Could not load the correct version of Castle integration. Make sure to pass the correct integration options.',
    );
  }
}

export default Castle;
