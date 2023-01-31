/**
 * Omnitracking integration will send data to Marketing API, so it can later be consumed by internal services such as `AffiliateService`, `InspireService` or `Risk Management Service(fraud)`.
 * This integration is compatible with Omnitracking Service v1.15.
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

import {
  formatPageEvent,
  formatTrackEvent,
  getClientLanguageFromCulture,
  getSearchQuery,
  getUniqueViewIdParameter,
  validateOutgoingOmnitrackingPayload,
} from './omnitracking-helper';
import {
  OPTION_HTTP_CLIENT,
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from './constants';
import {
  pageEventsMapper,
  trackEventsMapper,
  userGenderValuesMapper,
  viewGenderValuesMapper,
} from './definitions';
import { postTrackings } from './client';
import analyticsTrackTypes from '../../types/trackTypes';
import get from 'lodash/get';
import Integration from '../Integration';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import logger from '../../utils/logger';
import platformTypes from '../../types/platformTypes';

/**
 * Omnitracking integration.
 *
 * @private
 * @augments Integration
 */
class Omnitracking extends Integration {
  /**
   * Creates a new Omnitracking instance, validating its options.
   *
   * @param {object}   [options]                  - Options passed to the Omnitracking integration.
   * @param {Function} [options.transformPayload] - Function that will transform the data that will be posted to Omnitracking service.
   */
  constructor(options = {}) {
    super(options);

    const {
      [OPTION_TRANSFORM_PAYLOAD]: transformPayload,
      [OPTION_SEARCH_QUERY_PARAMETERS]: searchQueryParameters,
      [OPTION_HTTP_CLIENT]: httpClient,
    } = options;

    this.transformPayload = transformPayload;
    this.searchQueryParameters = searchQueryParameters;

    if (transformPayload && typeof transformPayload !== 'function') {
      logger.error(
        `[Omnitracking] - Invalid value provided for ${OPTION_TRANSFORM_PAYLOAD} option. It must be a function.`,
      );

      this.transformPayload = null;
    }

    if (searchQueryParameters) {
      if (!Array.isArray(searchQueryParameters)) {
        logger.error(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must be an array.`,
        );
      } else if (!searchQueryParameters.length) {
        logger.error(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. It must contain a value`,
        );
      } else if (
        searchQueryParameters.some(parameter => typeof parameter !== 'string')
      ) {
        logger.error(
          `[Omnitracking] - Invalid value provided for ${OPTION_SEARCH_QUERY_PARAMETERS} option. All parameters should be typed as string`,
        );
      }
    }

    if (httpClient && typeof httpClient !== 'function') {
      logger.error(
        '[Omnitracking] - Invalid `httpClient` option. Please make to pass a valid function to perform the http requests to the omnitracking service.',
      );
    }

    // These will be used to track the uniqueViewId and
    // previousUniqueViewId parameters in Omnitracking
    this.currentUniqueViewId = null;
    this.previousUniqueViewId = null;

    this.lastFromParameter = null;
  }

  /**
   * Method to check if the integration is ready to be loaded.
   *
   * @returns {boolean} If the integration is ready to be loaded.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Method used to create a new Omnitracking instance by analytics.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   *
   * @returns {Omnitracking} An instance of Omnitracking class.
   */
  static createInstance(options, loadData) {
    return new Omnitracking(options, loadData);
  }

  /**
   * Method that validates Omnitracking's basic business requirements before a tracking.
   *
   * @returns {boolean} Whether the track data complies with basic requirements defined by the service.
   */
  validateTrackingRequisites() {
    return !!this.currentUniqueViewId;
  }

  /**
   * Gets parameters that can be pre-calculated and will be added
   * to the final payload that will be sent to Omnitracking service.
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @private
   * @returns {object} Object containing the pre-calculated parameters for the event.
   */
  getPrecalculatedParametersForEvent(data) {
    const { type } = data;

    const isPageOrScreenEvent =
      type === analyticsTrackTypes.PAGE || type === analyticsTrackTypes.SCREEN;
    const precalculatedParameters = {};
    const { culture, currencyCode } = data.context;

    // First we check if we need to change the values
    // of the uniqueViewId and previousUniqueViewId
    if (isPageOrScreenEvent) {
      // Generate a new currentUniqueViewId to be used in all
      // subsequent page actions (analyticsTrackTypes.TRACK events).
      this.previousUniqueViewId = this.currentUniqueViewId;
      this.currentUniqueViewId = getUniqueViewIdParameter(data);

      precalculatedParameters.previousUniqueViewId = this.previousUniqueViewId;
      // This is a workaround to avoid calculate the parameter on helper's getPlatformSpecificParameters
      // in order to reduce the complexity of passing the options to the function
      if (data.platform === platformTypes.Web) {
        const searchQuery = getSearchQuery(data, this.searchQueryParameters);
        if (searchQuery) {
          precalculatedParameters.searchQuery = searchQuery;
        }
      }

      // Send the `navigatedFrom` according to the last non-pageview event,
      // which are the ones that come with the `from` parameter filled in (if passed).
      if (this.lastFromParameter) {
        precalculatedParameters.navigatedFrom = this.lastFromParameter;
      }

      const { user } = data;
      const userTraits = get(user, 'traits', {});

      precalculatedParameters.userGender = get(
        userGenderValuesMapper,
        userTraits.gender,
        userGenderValuesMapper.NotDefined,
      );

      precalculatedParameters.viewGender = get(
        viewGenderValuesMapper,
        data?.properties?.gender,
        viewGenderValuesMapper.Undefined,
      );

      precalculatedParameters.searchResultCount = get(
        data,
        'properties.itemCount',
      );

      precalculatedParameters.isLogged =
        userTraits.hasOwnProperty('isGuest') && !userTraits.isGuest;
      precalculatedParameters.basketId = userTraits.bagId;

      precalculatedParameters.clientLanguage =
        getClientLanguageFromCulture(culture);
      precalculatedParameters.clientCulture = culture;
    }

    // Always set the `lastFromParameter` with what comes from the current event (pageview or not),
    // so if there's a pageview being tracked right after this one,
    // it will send the correct `navigatedFrom` parameter.
    // Here we always set the value even if it comes `undefined` or `null`,
    // otherwise we could end up with a stale `lastFromParameter` if some events are tracked
    // without the `from` parameter.
    this.lastFromParameter = data?.properties?.from;

    precalculatedParameters.uniqueViewId = this.currentUniqueViewId;
    precalculatedParameters.viewCurrency = currencyCode;

    return precalculatedParameters;
  }

  /**
   * Tracks events of interest.
   *
   * @param {object} data - Event data provided by analytics.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    switch (data.type) {
      // Screen is treated the same as a page in Omnitracking
      case analyticsTrackTypes.PAGE:
      case analyticsTrackTypes.SCREEN: {
        return await this.trackEvent(data, pageEventsMapper);
      }
      case analyticsTrackTypes.TRACK: {
        return await this.trackEvent(data, trackEventsMapper);
      }
      default:
        break;
    }
  }

  /**
   * Method that will process the event being tracked according its type: page, screen or track.
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} mapper - The correspondent mapper according to the event type. It can be either `pageEventsMapper` or `trackEventsMapper`.
   *
   * @returns {Promise<*>} - The postTracking promise.
   */
  async trackEvent(data, mapper) {
    const eventMapperFn = mapper[data.event];

    if (eventMapperFn) {
      const mappedEvents = eventMapperFn(data);

      if (isArray(mappedEvents)) {
        await Promise.all(
          mappedEvents.map(async mappedEventData => {
            return this.processTrackEvents(data, mappedEventData);
          }),
        );
      }

      if (isObject(mappedEvents)) {
        return this.processTrackEvents(data, mappedEvents);
      }
    }

    return this.processTrackEvents(data);
  }

  /**
   *
   * @param {object} data - Event data provided by analytics.
   * @param {object} mappedEventData - Properties from the event mapping.
   *
   * @returns {Promise<*>} - The postTracking promise.
   */
  async processTrackEvents(data, mappedEventData) {
    const precalculatedParameters =
      this.getPrecalculatedParametersForEvent(data);
    const additionalParameters = {
      ...precalculatedParameters,
      ...mappedEventData,
    };

    let formattedEventData;

    if (
      data.type === analyticsTrackTypes.PAGE ||
      data.type === analyticsTrackTypes.SCREEN
    ) {
      formattedEventData = formatPageEvent(data, additionalParameters);
    } else {
      formattedEventData = formatTrackEvent(data, additionalParameters);
    }

    if (!this.validateTrackingRequisites()) {
      logger.warn(
        `[Omnitracking] - Event ${data.event} tried to track without an unique view id.
                Consider tracking an event only after a page event.
                This behaviour is not recommended and will not be supported in upcoming versions`,
      );
    }

    return await this.postTracking(formattedEventData, data);
  }

  /**
   * Posts event data to Omnitracking service. Will call `options.transformPayload`
   * if defined to obtain the final payload data to be sent.
   * The final payload will then pass through validation before being posted to Omnitracking service.
   *
   * @param {object} payload   - Payload data to be sent to Omnitracking service.
   * @param {object} eventData - Data that is sent by analytics on a page/track event.
   *
   * @private
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async postTracking(payload, eventData) {
    let finalPayload = payload;

    if (this.transformPayload) {
      finalPayload = await this.transformPayload(payload, eventData);

      if (!finalPayload) {
        logger.error(
          '`transformPayload` function did not return any payload data to be sent to Omnitracking. No request will be sent for eventData: ',
          eventData,
        );

        return;
      }
    }

    if (validateOutgoingOmnitrackingPayload(finalPayload)) {
      await this.sendEvent(finalPayload);
    }
  }

  /**
   * Sends the final payload to the httpClient, if passed. Will call the postTrackings client otherwise.
   *
   * @param {object} finalPayload - The very final payload to be sent to the omnitracking service endpoint.
   *
   * @returns {Promise} - Promise that will resolve when the method finishes.
   */
  async sendEvent(finalPayload) {
    if (this.options.httpClient) {
      return await this.options.httpClient(finalPayload);
    }

    postTrackings(finalPayload);
  }
}

export default Omnitracking;
