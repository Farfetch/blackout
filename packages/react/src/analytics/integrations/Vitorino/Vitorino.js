/**
 * Vitorino Integration.
 * Loads the Vitorino script and calls its methods.
 *
 * @example <caption>Adding Vitorino integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('vitorino', integrations.Vitorino, {});
 *
 * @module Vitorino
 * @category Analytics
 * @subcategory Integrations
 */

import {
  getEnvironmentFromOptions,
  getSafeOptionsForIntegration,
} from './vitorino-helper';
import { integrations, utils } from '@farfetch/blackout-core/analytics';
import { VITORINO_PROVIDERS } from './constants';
import Forter from './../Forter/Forter';
import omit from 'lodash/omit';
import Riskified from './../Riskified';

/**
 * Vitorino integration.
 *
 * @private
 * @augments Integration
 */
export default class Vitorino extends integrations.Integration {
  /**
   * This integration is required, so it must be loaded independently of user consent.
   *
   * @returns {boolean} If the integration should load or not.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Creates and returns the instance for Vitorino integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics' load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   * @returns {Vitorino} The instance created.
   */
  static createInstance(options, loadData, analytics) {
    return new Vitorino(options, loadData, analytics);
  }

  /**
   * Creates an instance of Vitorino integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics' load event data.
   * @param {object} analytics - Analytics stripped down instance.
   *
   */
  constructor(options = {}, loadData, analytics) {
    super(options, loadData, analytics);

    const baseOptions = omit(options, ['riskified', 'forter']);
    baseOptions.environment = getEnvironmentFromOptions(options);

    // load default if not set
    options.activeIntegrations ??= [
      VITORINO_PROVIDERS.forter,
      VITORINO_PROVIDERS.riskified,
    ];

    // Check if activeIntegrations is an array
    if (!Array.isArray(options.activeIntegrations)) {
      utils.logger.error(
        '[Analytics] Vitorino - The value `activeIntegrations` from Vitorino integration options must be an array.',
      );
      return;
    }

    if (options.activeIntegrations.includes(VITORINO_PROVIDERS.forter)) {
      this.forter = Forter.createInstance(
        getSafeOptionsForIntegration(baseOptions, options, 'forter'),
        loadData,
        analytics,
      );
    }

    if (options.activeIntegrations.includes(VITORINO_PROVIDERS.riskified)) {
      this.riskified = Riskified.createInstance(
        getSafeOptionsForIntegration(baseOptions, options, 'riskified'),
        loadData,
      );
    }
  }

  /**
   * When the user ID is available, config the vitorino and resolve the Promise so the tracking can begin.
   *
   * @async
   *
   * @param {object} data - Analytics' event data.
   */
  async onSetUser(data) {
    await this.forter?.onSetUser(data);
    await this.riskified?.onSetUser(data);
  }

  /**
   * Track method that will call Vitorino with the necessary data per event.
   * If there's more than one pageType per event, it will call Vitorino with each page type at a time.
   *
   * @async
   *
   * @param {object} data - Track event data.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    await this.forter?.track(data);
    await this.riskified?.track(data);
  }
}
