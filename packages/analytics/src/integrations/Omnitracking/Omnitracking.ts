/**
 * Omnitracking integration will send data to Marketing API, so it can later be
 * consumed by internal services. This integration is compatible with Omnitracking
 * Service v1.15.
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
  getClientLanguageFromCulture,
  getSearchQuery,
  getUniqueViewIdParameter,
  validateOutgoingOmnitrackingPayload,
} from './omnitracking-helper';
import { isPageEventType, isScreenEventType } from '../../utils/typePredicates';
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
import { postTracking, User, UserGender } from '@farfetch/blackout-client';
import analyticsTrackTypes from '../../types/TrackTypes';
import get from 'lodash/get';
import Integration from '../Integration';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import logger from '../../utils/logger';
import PlatformTypes from '../../types/PlatformTypes';
import type {
  EventData,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  UserTraits,
} from '../..';
import type {
  OmnitrackingOptions,
  OmnitrackingPageEventParameters,
  OmnitrackingPageEventsMapper,
  OmnitrackingPreCalculatedEventParameters,
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventsMapper,
  OmnitrackingTrackOrPageEventMapper,
  OmnitrackingTrackOrPageMapperResult,
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
  lastFromParameter: string | null;
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
  ): OmnitrackingPreCalculatedEventParameters {
    const isPageOrScreenEvent =
      isPageEventType(data) || isScreenEventType(data);

    const precalculatedParameters: OmnitrackingPreCalculatedEventParameters =
      {};

    const { culture, currencyCode } = data.context;

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
      if (data.platform === PlatformTypes.Web) {
        const searchQuery = getSearchQuery(data, this.searchQueryParameters);
        if (searchQuery) {
          precalculatedPageViewParameters.searchQuery = searchQuery;
        }
      }

      if (this.lastFromParameter) {
        precalculatedPageViewParameters.navigatedFrom = this.lastFromParameter;
      }

      const { user } = data;
      const userTraits = get(user, 'traits', {}) as UserTraits;

      precalculatedPageViewParameters.userGender = get(
        userGenderValuesMapper,
        `${
          !userTraits.isGuest
            ? (userTraits as User).gender
            : UserGender.NotDefined
        }`,
        userGenderValuesMapper.NotDefined,
      );

      precalculatedPageViewParameters.viewGender = get(
        viewGenderValuesMapper,
        data?.properties?.gender as keyof typeof viewGenderValuesMapper,
        viewGenderValuesMapper.Undefined,
      );

      precalculatedPageViewParameters.searchResultCount = get(
        data,
        'properties.itemCount',
      );

      precalculatedPageViewParameters.isLogged =
        userTraits.hasOwnProperty('isGuest') && !userTraits.isGuest;
      precalculatedPageViewParameters.basketId = userTraits.bagId;

      precalculatedParameters.clientLanguage =
        getClientLanguageFromCulture(culture);
      precalculatedPageViewParameters.clientCulture = culture;
    }

    // Always set the `lastFromParameter` with what comes from the current event (pageview or not),
    // so if there's a pageview being tracked right after this one,
    // it will send the correct `navigatedFrom` parameter.
    // Here we always set the value even if it comes `undefined` or `null`,
    // otherwise we could end up with a stale `lastFromParameter` if some events are tracked
    // without the `from` parameter.
    this.lastFromParameter = (data?.properties?.from || null) as string | null;

    precalculatedParameters.uniqueViewId = this.currentUniqueViewId;
    precalculatedParameters.viewCurrency = currencyCode;

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
    const event = data.event;
    switch (data.type) {
      // Screen is treated the same as a page in Omnitracking
      case analyticsTrackTypes.PAGE:
      case analyticsTrackTypes.SCREEN: {
        const eventMapperFn =
          pageEventsMapper[event as keyof OmnitrackingPageEventsMapper];

        await this.processEvent(data, eventMapperFn);
        break;
      }
      case analyticsTrackTypes.TRACK: {
        const eventMapperFn =
          trackEventsMapper[event as keyof OmnitrackingTrackEventsMapper];

        await this.processEvent(data, eventMapperFn);
        break;
      }
      default:
        break;
    }
  }

  /**
   * Process the event being tracked using the provided mapper.
   *
   * @param data - Event data provided by analytics.
   * @param eventMapperFn - Function for the mapped event.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  async processEvent(
    data: EventData<TrackTypesValues>,
    eventMapperFn?: OmnitrackingTrackOrPageEventMapper,
  ) {
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

      // ignore if there's nothing mapped and do not let the event pass
      return;
    }

    return this.processTrackEvents(data);
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
    mappedEventData?: OmnitrackingTrackOrPageMapperResult,
  ) {
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
          '[Omnitracking] - `transformPayload` function did not return any payload data to be sent to Omnitracking. No request will be sent for eventData: ',
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
   * @param finalPayload - The very final payload to be sent to the omnitracking service endpoint.
   *
   * @returns - Promise that will resolve when the method finishes.
   */
  async sendEvent(
    finalPayload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
  ) {
    if (this.options.httpClient) {
      return await this.options.httpClient(finalPayload);
    }

    await postTracking({ ...finalPayload });
  }
}

export default Omnitracking;
