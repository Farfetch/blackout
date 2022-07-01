/**
 * Omnitracking integration will send data to Marketing API, so it can later be
 * consumed by internal services. This integration is compatible with Omnitracking
 * Service v1.9.
 *
 * @example <caption>Adding Omnitracking integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('omnitracking', integrations.Omnitracking);
 *
 * ```
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
import { isPageEventType, isScreenEventType } from '../../utils/typePredicates';
import {
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from './constants';
import { postTrackings } from '@farfetch/blackout-client';
import { trackEventsMapper, userGenderValuesMapper } from './definitions';
import analyticsTrackTypes from '../../types/trackTypes';
import get from 'lodash/get';
import Integration from '../Integration';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import logger from '../../utils/logger';
import platformTypes from '../../types/platformTypes';
import type {
  EventData,
  eventTypes,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  UserTraits,
} from '../..';
import type {
  OmnitrackingOptions,
  OmnitrackingPageEventParameters,
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventParameters,
  PageActionEvents,
  PageViewEvents,
} from './types/Omnitracking.types';

/**
 * Omnitracking integration.
 */
class Omnitracking extends Integration<OmnitrackingOptions> {
  transformPayload: OmnitrackingOptions[typeof OPTION_TRANSFORM_PAYLOAD] | null;
  searchQueryParameters:
    | OmnitrackingOptions[typeof OPTION_SEARCH_QUERY_PARAMETERS]
    | undefined
    | null;
  currentUniqueViewId: string | null;
  previousUniqueViewId: string | null;
  navigatedFrom: string | null;
  /**
   * Creates a new Omnitracking instance, validating its options.
   *
   * @param options                       - Options passed to the Omnitracking integration.
   * @param loadData                      - Load integration event data.
   * @param strippedDownAnalyticsInstance - Stripped down analytics instance.
   */
  constructor(
    options: OmnitrackingOptions,
    loadData: LoadIntegrationEventData,
    strippedDownAnalyticsInstance: StrippedDownAnalytics,
  ) {
    super(options, loadData, strippedDownAnalyticsInstance);

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
   * @returns If the integration is ready to be loaded.
   */
  static override shouldLoad() {
    return true;
  }

  /**
   * Method that validates Omnitracking's basic business requirements before a
   * tracking.
   *
   * @returns Whether the track data complies with basic requirements defined by the service.
   */
  validateTrackingRequisites() {
    return !!this.currentUniqueViewId;
  }

  /**
   * Gets parameters that can be pre-calculated and will be added to the final
   * payload that will be sent to Omnitracking service.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns Object containing the pre-calculated parameters for the event.
   */
  getPrecalculatedParametersForEvent(
    data: EventData<TrackTypesValues>,
  ): OmnitrackingTrackEventParameters | OmnitrackingPageEventParameters {
    const isPageOrScreenEvent =
      isPageEventType(data) || isScreenEventType(data);

    const precalculatedParameters:
      | OmnitrackingTrackEventParameters
      | OmnitrackingPageEventParameters = {};

    // First we check if we need to change the values
    // of the uniqueViewId and previousUniqueViewId
    if (isPageOrScreenEvent) {
      // We need to cast to allow page view specific parameters to be added to the precalculatedParameters
      // object.
      const precalculatedPageViewParameters =
        precalculatedParameters as OmnitrackingPageEventParameters;

      // Generate a new currentUniqueViewId to be used in all
      // subsequent page actions (analyticsTrackTypes.TRACK events).
      this.previousUniqueViewId = this.currentUniqueViewId;
      this.currentUniqueViewId = getUniqueViewIdParameter(data);

      precalculatedPageViewParameters.previousUniqueViewId =
        this.previousUniqueViewId;
      // This is a workaround to avoid calculate the parameter on helper's getPlatformSpecificParameters
      // in order to reduce the complexity of passing the options to the function
      if (data.platform === platformTypes.Web) {
        const searchQuery = getSearchQuery(data, this.searchQueryParameters);
        if (searchQuery) {
          precalculatedPageViewParameters.searchQuery = searchQuery;
        }
      }

      if (this.navigatedFrom) {
        precalculatedPageViewParameters.navigatedFrom = this.navigatedFrom;
      }

      const { event, user } = data;

      this.navigatedFrom = event;

      const userTraits = get(user, 'traits', {}) as UserTraits;

      precalculatedPageViewParameters.userGender = get(
        userGenderValuesMapper,
        `${userTraits.gender}`,
        userGenderValuesMapper.NotDefined,
      );

      precalculatedPageViewParameters.isLogged =
        userTraits.hasOwnProperty('isGuest') && !userTraits.isGuest;
      precalculatedPageViewParameters.basketId = userTraits.bagId;

      const { culture } = data.context;
      let clientLanguage: string | undefined = '';
      let clientCountry: string | undefined = '';

      clientLanguage = getClientLanguageFromCulture(culture as string);
      clientCountry = getCLientCountryFromCulture(culture as string);

      precalculatedPageViewParameters.clientLanguage = clientLanguage;
      precalculatedPageViewParameters.clientCountry = clientCountry;
      precalculatedPageViewParameters.clientCulture = culture;
    }

    precalculatedParameters.uniqueViewId = this.currentUniqueViewId;

    return precalculatedParameters;
  }

  /**
   * Tracks events of interest.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  override async track(data: EventData<TrackTypesValues>) {
    let precalculatedParameters:
      | OmnitrackingPageEventParameters
      | OmnitrackingTrackEventParameters;

    switch (data.type) {
      case analyticsTrackTypes.PAGE:
      case analyticsTrackTypes.SCREEN: {
        // Screen is treated the same as a page in Omnitracking
        precalculatedParameters = this.getPrecalculatedParametersForEvent(data);

        return this.postTracking(
          formatPageEvent(data, precalculatedParameters),
          data,
        );
      }
      case analyticsTrackTypes.TRACK: {
        const eventMapperFn =
          trackEventsMapper[
            data.event as typeof eventTypes[keyof typeof eventTypes]
          ];

        if (eventMapperFn) {
          const mappedEvents = eventMapperFn(data);

          if (isArray(mappedEvents)) {
            return Promise.all(
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

  /**
   * Method that will combine all pre-calculated parameters with the ones that come
   * from the mapper.
   *
   * @param data            - Event data provided by analytics.
   * @param mappedEventData - Object with properties that come from the event mapper.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  async processTrackEvents(
    data: EventData<TrackTypesValues>,
    mappedEventData?: OmnitrackingTrackEventParameters,
  ) {
    const precalculatedParameters =
      this.getPrecalculatedParametersForEvent(data);

    const formattedEventData = formatTrackEvent(data, {
      ...precalculatedParameters,
      ...mappedEventData,
    });

    if (!this.validateTrackingRequisites()) {
      logger.error(
        `[Omnitracking] - Event ${data.event} could not be tracked since it had no unique view id.
         A possible cause is trying to track an event before tracking a page view. 
         Make sure you are tracking events after page views are tracked.
         This event will not be tracked with Omnitracking.`,
      );

      return;
    }

    return await this.postTracking(formattedEventData, data);
  }

  /**
   * Posts event data to Omnitracking service. Will call `options.transformPayload`
   * if defined to obtain the final payload data to be sent. The final payload will
   * then pass through validation before being posted to Omnitracking service.
   *
   * @param payload   - Payload data to be sent to Omnitracking service.
   * @param eventData - Data that is sent by analytics on a page/track event.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  async postTracking(
    payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
    eventData: EventData<TrackTypesValues>,
  ) {
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
      postTrackings({ ...finalPayload });
    }
  }
}

export default Omnitracking;
