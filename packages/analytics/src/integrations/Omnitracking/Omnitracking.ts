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
  ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID,
  ANALYTICS_UNIQUE_VIEW_ID,
  getCustomerIdFromUser,
  LAST_FROM_PARAMETER_KEY,
} from '../../utils/index.js';
import { get, isArray, isObject } from 'lodash-es';
import {
  getClientCountryFromSubfolder,
  getClientLanguageFromCulture,
  getCommonParameters,
  getPageEvent,
  getPlatformSpecificParameters,
  getSearchQuery,
  pickPageParameters,
  pickTrackParameters,
  validateOutgoingOmnitrackingPayload,
} from './omnitracking-helper.js';
import {
  isPageEventType,
  isScreenEventType,
} from '../../utils/typePredicates.js';
import {
  OPTION_HTTP_CLIENT,
  OPTION_SEARCH_QUERY_PARAMETERS,
  OPTION_TRANSFORM_PAYLOAD,
} from './constants.js';
import {
  pageActionEventTypes,
  pageEventsMapper,
  systemActionParameters,
  trackEventsMapper,
  userGenderValuesMapper,
  viewGenderValuesMapper,
} from './definitions.js';
import { postTracking, type User, UserGender } from '@farfetch/blackout-client';
import analyticsTrackTypes from '../../types/TrackType.js';
import Integration from '../Integration.js';
import logger from '../../utils/logger.js';
import PlatformType from '../../types/PlatformType.js';
import type {
  EventContext,
  EventData,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
  UserTraits,
} from '../../index.js';
import type {
  OmnitrackingOptions,
  OmnitrackingPageEventParameters,
  OmnitrackingPageEventsMapper,
  OmnitrackingPreCalculatedEventParameters,
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventParameters,
  OmnitrackingTrackEventsMapper,
  OmnitrackingTrackOrPageEventMapper,
  OmnitrackingTrackOrPageMapperResult,
  PageActionEvents,
  PageViewEvents,
} from './types/Omnitracking.types.js';

/**
 * Omnitracking integration.
 */
class Omnitracking extends Integration<OmnitrackingOptions> {
  transformPayload: OmnitrackingOptions[typeof OPTION_TRANSFORM_PAYLOAD] | null;
  searchQueryParameters:
    | OmnitrackingOptions[typeof OPTION_SEARCH_QUERY_PARAMETERS]
    | undefined
    | null;
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
  validateTrackingRequisites(
    payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
  ) {
    return !!get(payload, 'parameters.uniqueViewId');
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

    const { culture, currencyCode, library } = data.context;

    if (isPageOrScreenEvent) {
      // We need to cast to allow page view specific parameters to be added to the precalculatedParameters
      // object.
      const precalculatedPageViewParameters =
        precalculatedParameters as OmnitrackingPageEventParameters;

      // This is a workaround to avoid calculate the parameter on helper's getPlatformSpecificParameters
      // in order to reduce the complexity of passing the options to the function
      if (data.platform === PlatformType.Web) {
        const searchQuery = getSearchQuery(data, this.searchQueryParameters);

        if (searchQuery) {
          precalculatedPageViewParameters.searchQuery = searchQuery;
        }
      }

      const lastFromParameter = get(
        data,
        `context.web.${LAST_FROM_PARAMETER_KEY}`,
      );

      if (lastFromParameter) {
        precalculatedPageViewParameters.navigatedFrom = lastFromParameter;
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

      const subfolder = get(
        data,
        'context.web.window.location.pathname',
        '',
      ).split('/')?.[1];

      precalculatedPageViewParameters.clientCountry =
        getClientCountryFromSubfolder(subfolder);
    }

    precalculatedParameters.previousUniqueViewId = get(
      data,
      `context.web.${ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID}`,
      null,
    );
    precalculatedParameters.uniqueViewId = get(
      data,
      `context.web.${ANALYTICS_UNIQUE_VIEW_ID}`,
    );
    precalculatedParameters.viewCurrency = currencyCode;
    precalculatedParameters.analyticsPackageVersion = library?.version;

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
      case analyticsTrackTypes.Page:
      case analyticsTrackTypes.Screen: {
        const eventMapperFn =
          pageEventsMapper[event as keyof OmnitrackingPageEventsMapper];

        return await this.processEvent(data, eventMapperFn);
      }
      case analyticsTrackTypes.Track: {
        const eventMapperFn =
          trackEventsMapper[event as keyof OmnitrackingTrackEventsMapper];

        return await this.processEvent(data, eventMapperFn);
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
        return await Promise.all(
          mappedEvents.map(async mappedEventData => {
            return await this.processTrackEvents(data, mappedEventData);
          }),
        );
      }

      if (isObject(mappedEvents)) {
        return await this.processTrackEvents(data, mappedEvents);
      }

      // ignore if there's nothing mapped and do not let the event pass
      return Promise.resolve();
    }

    return await this.processTrackEvents(data);
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
      data.type === analyticsTrackTypes.Page ||
      data.type === analyticsTrackTypes.Screen
    ) {
      formattedEventData = Omnitracking.formatPageEvent(
        data,
        additionalParameters,
      );
    } else {
      formattedEventData = Omnitracking.formatTrackEvent(
        data,
        additionalParameters,
      );
    }

    if (!this.validateTrackingRequisites(formattedEventData)) {
      logger.error(
        `[Omnitracking] - Event ${data.event} could not be tracked since it had no unique view id.
         A possible cause is trying to track an event before tracking a page view.
         Make sure you are tracking events after page views are tracked.
         This event will not be tracked with Omnitracking.`,
      );

      return Promise.resolve();
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

        return Promise.resolve();
      }
    }

    if (validateOutgoingOmnitrackingPayload(finalPayload)) {
      return await this.sendEvent(finalPayload);
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

    return await postTracking({ ...finalPayload });
  }

  /**
   * Formats page data to be sent to omnitracking service to register a page view.
   * Merges common parameters with the filtered ones sent via `analytics.page()`,
   * along some other properties.
   *
   * @param data                 - Event data passed by analytics.
   * @param additionalParameters - Additional parameters to be considered.
   *
   * @returns Formatted data.
   */
  static formatPageEvent = (
    data: EventData<TrackTypesValues>,
    additionalParameters: OmnitrackingPageEventParameters,
  ): OmnitrackingRequestPayload<PageViewEvents> => {
    const correlationId = get(data, 'user.localId', null);
    const user = get(data, 'user', {
      id: -1,
      traits: {} as UserTraits,
      localId: '',
    });
    const customerId = getCustomerIdFromUser(user);
    const context: EventContext = get(data, 'context', {}) as EventContext;
    const event = getPageEvent(data);
    const defaultPageParameters = { viewType: 'Others', viewSubType: 'Others' };

    return {
      event,
      customerId,
      correlationId,
      tenantId: context.tenantId as number,
      clientId: context.clientId as number,
      parameters: {
        ...defaultPageParameters,
        ...additionalParameters,
        ...getPlatformSpecificParameters(data),
        ...getCommonParameters(data),
        ...pickPageParameters(data, event),
      },
    };
  };

  /**
   * Formats tracking data to be sent to omnitracking service to register a custom
   * event.
   *
   * @param data                 - Event data passed by analytics.
   * @param additionalParameters - Additional parameters to be considered.
   *
   * @returns Formatted track data.
   */
  static formatTrackEvent = (
    data: EventData<TrackTypesValues>,
    additionalParameters: OmnitrackingTrackEventParameters,
  ): OmnitrackingRequestPayload<PageActionEvents> => {
    const user = get(data, 'user', {
      id: -1,
      traits: {} as UserTraits,
      localId: '',
    });
    const customerId = getCustomerIdFromUser(user);
    const correlationId = get(data, 'user.localId', null);
    const context = get(data, 'context', {}) as EventContext;

    const parameters = {
      ...additionalParameters,
      ...getPlatformSpecificParameters(data),
      ...getCommonParameters(data),
      ...pickTrackParameters(data),
    };

    const hasSystemActionParameter = systemActionParameters.some(
      systemActionParameter => {
        return parameters.hasOwnProperty(systemActionParameter);
      },
    );

    // We infer the PageAction event type by checking the payload for
    // SystemAction parameters. If it does have any SystemAction parameter,
    // we infer it to be a SystemAction type. Else, we assume it is a PageAction.
    // TODO: There are some parameters that may need to be removed from the
    //      parameters object because each PageAction type has a list of
    //      supported parameters but we only know the PageAction type of the event after
    //      we have the full parameters object constructed, which may include
    //      parameters that are not necessary to be sent for the then determined
    //      PageAction event type.
    const event = hasSystemActionParameter
      ? pageActionEventTypes.SYSTEM_ACTION
      : pageActionEventTypes.PAGE_ACTION;

    return {
      tenantId: context.tenantId as number,
      clientId: context.clientId as number,
      correlationId,
      customerId,
      event,
      parameters,
    };
  };
}

export default Omnitracking;
