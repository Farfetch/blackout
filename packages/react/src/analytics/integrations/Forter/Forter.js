/**
 * Forter Integration.
 * Will handle loading the forter script with
 * the provided siteId and will take care of notifying Omnitracking
 * service with the forter token after the forter script notifies.
 *
 * @example <caption>Adding Forter integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('Forter', integrations.Forter, {
 *  siteId: '<my site id>',
 *  origin: '<my origin>'
 * });
 *
 * @module Forter
 * @category Analytics
 * @subcategory Integrations
 */

import { formatTrackEvent } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/omnitracking-helper';
import { ForterTokenLoadedAnalyticsEvent, ForterTokenTid } from './constants';
import { getDefaultSiteId } from './forterHelper';
import {
  integrations,
  trackTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import { postTrackings } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';
import defaultTo from 'lodash/defaultTo';
import ForterTokenLoadedDetector from './ForterTokenLoadedEventDetector';
import get from 'lodash/get';
import loadForterScriptForSiteId from './loadForterScriptForSiteId';

/**
 * Forter integration class.
 *
 * @private
 * @augments Integration
 */
class Forter extends integrations.Integration {
  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @returns {boolean} True to indicate that it will always be loaded.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Creates an instance of Forter integration.
   *
   * @param {object} options  - User configured options.
   * @param {object} loadData - Analytics's load event data.
   * @param {object} analytics - Stripped down analytics instance with helper methods.
   */
  constructor(options, loadData, analytics) {
    const safeOptions = defaultTo({ ...options }, {});
    safeOptions.siteId ??= getDefaultSiteId(safeOptions);
    super(safeOptions, loadData, analytics);

    this.analytics = analytics;

    this.initialize();
  }

  /**
   * Initializes the integration by first validating if the required
   * siteId was defined by the user, wires up the promises to when
   * onSetUser is called and the forter token before loading the forter
   * script with the passed in siteId.
   */
  initialize() {
    const { siteId, origin } = this.options;

    if (!origin) {
      utils.logger.warn(
        "[Forter] - `origin` parameter was not provided in options. It's advisable to provide an origin option to aid in debugging",
      );
    }

    this.setupOnSetUserPromise();

    this.setupForterTokenLoadedEventListener();

    this.loadForterScript(siteId);
  }

  /**
   * Sets up a ForterTokenLoadedDetector instance in order to detect
   * when the forter token loaded event is raised.
   * When raised, it will then post a tracking message to Omnitracking
   * with the loaded forter token.
   *
   * @returns {Promise} Promise that will be resolved when the forter token is loaded.
   *
   */
  async setupForterTokenLoadedEventListener() {
    const forterTokenLoadedDetector = new ForterTokenLoadedDetector();
    const forterToken = await forterTokenLoadedDetector.getForterToken();

    this.sendForterTokenLoadedEventForOmnitracking(forterToken);
  }

  /**
   * Creates a synthetic analytics event representing a track of
   * the forter loaded event in order to be used
   * in calls to omnitracking-helper functions.
   *
   * @returns {Promise} Promise that will be resolved when analytics creates an event.
   */
  async createSyntheticForterTokenLoadedEvent() {
    const syntheticEventData = await this.analytics.createEvent(
      trackTypes.TRACK,
      ForterTokenLoadedAnalyticsEvent,
    );

    return syntheticEventData;
  }

  /**
   * Responsible for sending the loaded forter token to Omnitracking.
   * Needs to wait for a user to be set in analytics by analytics.setUser method
   * in order to have the `customerId` parameter filled as it is a required
   * parameter by Omnitracking.
   *
   * @param {string} forterToken - String representing the loaded forter token.
   * @returns {Promise} Promise that will be resolved when the user is set in analytics and the Omnitracking message is built.
   *
   */
  async sendForterTokenLoadedEventForOmnitracking(forterToken) {
    await this.onSetUserPromise;

    const omnitrackingMessage = await this.getForterTokenLoadedEventPayload(
      forterToken,
    );

    postTrackings(omnitrackingMessage);
  }

  /**
   * Generates an Omnitracking message as specified by the documentation
   * in order to be posted to Omnitracking and thus, obtain the reference
   * to the forter token for this session.
   *
   * @param {string} forterToken - String representing the loaded forter token.
   *
   * @returns {Promise} Promise that will be resolved when the Omnitracking message is built.
   */
  async getForterTokenLoadedEventPayload(forterToken) {
    const forterTokenLoadedEventData =
      await this.createSyntheticForterTokenLoadedEvent();

    const additionalParameters = {
      tid: ForterTokenTid,
      val: JSON.stringify({
        forterTokenCookie: forterToken,
        origin: get(this.options, 'origin', 'NOT_DEFINED'),
        userAgent:
          forterTokenLoadedEventData.context.web.window.navigator.userAgent,
      }),
    };

    const payload = formatTrackEvent(
      forterTokenLoadedEventData,
      additionalParameters,
    );

    return payload;
  }

  /**
   * Sets up the promise that will be resolved when onSetUser of this instance
   * is called by analytics.
   */
  setupOnSetUserPromise() {
    this.onSetUserPromise = new Promise(resolve => {
      this.resolveOnSetUserPromise = resolve;
    });
  }

  /**
   * Loads the forter script with the corresponding siteId.
   *
   * @param {string} siteId - Site identifier required by forter script and is configured by the user when adding this integration with `analytics.addIntegration` method.
   */
  loadForterScript(siteId) {
    loadForterScriptForSiteId(siteId);
  }

  /**
   * Resolves the configured set user promise.
   */
  onSetUser() {
    if (this.resolveOnSetUserPromise) {
      this.resolveOnSetUserPromise();
      this.resolveOnSetUserPromise = null;
    }
  }
}

export default Forter;
