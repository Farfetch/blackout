/**
 * Omnitracking integration will send data to Marketing API, so it can later be consumed by internal services such as `AffiliateService`, `InspireService` or `Risk Management Service(fraud)`.
 * This integration is compatible with Omnitracking Service v1.9.
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
  getCLientCountryFromCulture,
  getClientLanguageFromCulture,
  getSearchQuery,
  getUniqueViewIdParameter,
  validateOutgoingOmnitrackingPayload,
} from './omnitracking-helper';
import {
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from './constants';
import { postTrackings } from './client';
import { trackEventsMapper, userGenderValuesMapper } from './definitions';
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

    // These will be used to track the uniqueViewId and
    // previousUniqueViewId parameters in Omnitracking
    this.currentUniqueViewId = null;
    this.previousUniqueViewId = null;

    this.navigatedFrom = null;
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

      if (this.navigatedFrom) {
        precalculatedParameters.navigatedFrom = this.navigatedFrom;
      }

      const { event, user } = data;

      this.navigatedFrom = event;

      const userTraits = get(user, 'traits', {});

      precalculatedParameters.userGender = get(
        userGenderValuesMapper,
        userTraits.gender,
        userGenderValuesMapper.NotDefined,
      );

      precalculatedParameters.isLogged =
        userTraits.hasOwnProperty('isGuest') && !userTraits.isGuest;
      precalculatedParameters.basketId = userTraits.bagId;

      const { culture } = data.context;
      let clientLanguage = '';
      let clientCountry = '';

      clientLanguage = getClientLanguageFromCulture(culture);
      clientCountry = getCLientCountryFromCulture(culture);

      precalculatedParameters.clientLanguage = clientLanguage;
      precalculatedParameters.clientCountry = clientCountry;
      precalculatedParameters.clientCulture = culture;
    }

    precalculatedParameters.uniqueViewId = this.currentUniqueViewId;

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
    let precalculatedParameters;

    switch (data.type) {
      case analyticsTrackTypes.PAGE:
      case analyticsTrackTypes.SCREEN: {
        // Screen is treated the same as a page in Omnitracking

        precalculatedParameters = this.getPrecalculatedParametersForEvent(data);

        return await this.postTracking(
          formatPageEvent(data, precalculatedParameters),
          data,
        );
      }
      case analyticsTrackTypes.TRACK: {
        const eventMapperFn = trackEventsMapper[data.event];

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
      default:
        break;
    }
  }

  async processTrackEvents(data, mappedEventData) {
    const precalculatedParameters =
      this.getPrecalculatedParametersForEvent(data);
    const formattedEventData = formatTrackEvent(data, {
      ...precalculatedParameters,
      ...mappedEventData,
    });

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
      postTrackings(finalPayload);
    }
  }
}

export default Omnitracking;
