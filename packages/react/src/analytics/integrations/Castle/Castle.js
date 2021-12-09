/**
 * Castle Integration.
 * Tracks page views and user login/logut for security purposes.
 *
 * @example <caption>Adding Castle integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('castle', integrations.Castle, {
 *   appId: '<castle app id>'
 * });
 *
 * @module Castle
 * @category Analytics
 * @subcategory Integrations
 */

import {
  trackTypes as analyticsTrackTypes,
  integrations,
  utils,
} from '@farfetch/blackout-analytics';
import get from 'lodash/get';

export const castleEvents = {
  LOAD: 'autoTrack',
  PAGE: 'trackPageview',
  LOGIN: 'identify',
  LOGOUT: 'reset',
};
/**
 * Castle integration.
 *
 * @private
 * @augments Integration
 */
class Castle extends integrations.Integration {
  /**
   * This integration is required, so it should load indenpendently of user consent.
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
    return new Castle(options, loadData);
  }

  /**
   * Creates an instance of Castle integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   */
  constructor(options, loadData) {
    super(options, loadData);

    this.baseUrl = 'https://d2t77mnxyo7adj.cloudfront.net/v1/c.js';
    // This property will tell Castle if it should auto-track pages as they load or not. Since we use SPA web applications, the default is false.
    this.autoSendTracking = options.autoSendTracking || false;

    this.initializePromiseResolve = null;

    this.lastUserId = null;

    this.initializePromise = new Promise(resolve => {
      this.initializePromiseResolve = resolve;
    });

    this.setupScript(options);
  }

  /**
   * Track method that will filter by event type: page or track.
   *
   * @param {object} data Track event data.
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    if (data.type === analyticsTrackTypes.PAGE) {
      return await this.trackPage();
    }
  }

  /**
   * Method responsible for tracking page events.
   * It will await for the initialization promise so it can call the global variable injected by castle.io script.
   *
   * @returns {Promise<Castle>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async trackPage() {
    await this.initializePromise;

    window._castle(castleEvents.PAGE);

    return this;
  }

  /**
   * Method responsible for tracking when the user logs in/logs out.
   * It will await for the initialization promise so it can call the global variable injected by castle.io script.
   * It must track the page after the user logs in/out, as per Castle.io documentation.
   *
   * @see {@link https://docs.castle.io/spa/#logging-in-the-user} for more information.
   *
   * @param {object} data - User event data.
   *
   * @returns {Promise<Castle>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async onSetUser(data) {
    await this.initializePromise;

    const userId = get(data, 'user.id');
    const isGuest = get(data, 'user.traits.isGuest');

    // If for some reason there was a call to `analytics.onSetUser()` that receives the same user id, ignore it.
    if (userId === this.lastUserId) {
      return this;
    }

    // Login - Let Castle identify the user.
    if (userId && !isGuest) {
      window._castle(castleEvents.LOGIN, userId);
    } else {
      // Logout
      window._castle(castleEvents.LOGOUT);
    }

    this.lastUserId = userId;

    // Track the page as Castle.io requirements after login/logout.
    await this.trackPage();

    return this;
  }

  /**
   * Sets up the script tag for Castle.io based on the `appId` received in the options.
   *
   * @param {object} options - Load event data.
   */
  setupScript(options) {
    const appId = options.appId || null;

    if (!appId) {
      throw new Error(
        'Castle integration needs an App ID in order to run. Please pass a valid client App ID when adding the integration to analytics.',
      );
    }

    const script = document.createElement('script');
    const url = `${this.baseUrl}?${appId}`;

    document.body.appendChild(script);

    script.onload = this.scriptOnload;

    script.setAttribute('data-test', 'castle');
    script.async = true;
    script.src = url;
  }

  /**
   * Getter for the `onload` script tag event, that will resolve the promise and unlock any call made to `.onSetUser()` or `track()`.
   */
  scriptOnload = () => {
    if (this.initializePromiseResolve) {
      this.initializePromiseResolve();
      this.initializePromiseResolve = null;
    }

    if (!window._castle) {
      utils.logger.error(
        'Castle integration tried to call window._castle() but failed. Something might be wrong with the script previously injected.',
      );

      return;
    }

    window._castle(castleEvents.LOAD, this.autoSendTracking);
  };
}

export default Castle;
