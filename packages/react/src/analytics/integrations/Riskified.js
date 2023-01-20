/**
 * Riskified integration for fraud analysis.
 * Loads a script on the page and executes a function on each page view.
 *
 * @example <caption>Adding Riskified integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * // (...) After configuring Omnitracking and everything else on analytics properly, add the integration to analytics
 *
 * analytics.addIntegration('riskified', integrations.Riskified);
 *
 * @module Riskified
 * @category Analytics
 * @subcategory Integrations
 */

import {
  trackTypes as analyticsTrackTypes,
  integrations,
} from '@farfetch/blackout-core/analytics';
import get from 'lodash/get';

/**
 * Riskified integration.
 *
 * @private
 * @augments Integration
 */
class Riskified extends integrations.Integration {
  /**
   * Returns true due to being a required integration - No need to check for consent.
   *
   * @returns {boolean} A value indicating if the integration should load.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Method used to create a new Riskified instance by analytics.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Riskified} The Riskified instance to allow chaining calls.
   */
  static createInstance(options, loadData) {
    return new Riskified(options, loadData);
  }

  /**
   * Creates an instance of Riskified and sets the script on the page.
   *
   * @param {object} options - Custom options for the integration.
   * @param {object} loadData - Analytics's load event data.
   */
  constructor(options, loadData) {
    super(options, loadData);

    this.isReady = false;
    this.siteId = options.siteId || 'farfetch.com';
    this.baseUrl = `https://beacon.riskified.com?shop=${this.siteId}&sid=`;

    this.setupScript(loadData);
  }

  /**
   * Creates the script based on the correlation `id` and appends it on the page.
   * Once the script is on the page, it will automatically call `RISKX.go()`.
   *
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Riskified} The Riskified instance to allow chaining calls.
   */
  setupScript(loadData) {
    const correlationId = get(loadData, 'user.localId');
    const script = document.createElement('script');
    const url = `${this.baseUrl}${correlationId}`;

    document.body.appendChild(script);

    script.onload = this.onLoad;

    script.setAttribute('data-test', 'riskified');
    script.async = true;
    script.src = url;

    return this;
  }

  /**
   * Tracks events (page views or page actions).
   *
   * @param {object} data - The event object.
   *
   * @returns {Riskified} The Riskified instance to allow chaining calls.
   */
  track(data) {
    switch (data.type) {
      case analyticsTrackTypes.PAGE:
        return this.trackPage(data);

      case analyticsTrackTypes.TRACK:
        return null;

      default:
        break;
    }
  }

  /**
   * Tracks the page view event. Calls the global Riskified variable RISKX.go with the web location.
   *
   * @param {object} data - The event object.
   *
   * @returns {Riskified} The Riskified instance to allow chaining calls.
   */
  trackPage(data) {
    if (!this.isReady) {
      return this;
    }

    window.RISKX.go(data.context.web.window.location.href);

    return this;
  }

  /**
   * When the script loads onto the DOM, it will set the integration as ready.
   */
  onLoad = () => {
    this.isReady = true;
  };
}

export default Riskified;
