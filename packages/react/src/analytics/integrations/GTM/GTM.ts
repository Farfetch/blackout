/**
 * GTM Integration. Will load the GTM script and write data on `window.dataLayer`
 * array.
 *
 * @example <caption>Adding GTM integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('GTM', integrations.GTM, \{
 *  containerId: '\<google tag manager containerId\>'
 * \});
 *
 * ```
 */

import {
  CONSENT_TYPE,
  CONTAINER_ID_KEY,
  CONTEXT_TYPE,
  DATA_LAYER_CONSENT_EVENT,
  DATA_LAYER_CONTEXT_EVENT,
  DATA_LAYER_SET_USER_EVENT,
  EVENT_SCHEMAS_KEY,
  EVENTS_MAPPER_KEY,
  GTM_LABEL_PREFIX,
  GTM_TYPE_ERROR_PREFIX,
  INVALID_FUNCTION_ERROR_SUFFIX,
  SET_CONSENT_KEY,
  SET_CONTEXT_FN_KEY,
  SET_CONTEXT_KEY,
  SET_USER_FN_KEY,
  SET_USER_KEY,
  SET_USER_TYPE,
} from './constants';
import {
  ConsentData,
  utils as coreUtils,
  EventContext,
  EventData,
  integrations,
  LoadIntegrationEventData,
  SetUserEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '@farfetch/blackout-analytics';
import { getContextParameters, getUserParameters } from './utils';
import eventSchemas from '../shared/validation/eventSchemas';
import eventsMapper from './eventsMapper';
import eventValidator from '../shared/validation/eventValidator';
import get from 'lodash/get';
import gtmTag from './gtmTag';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';
import type {
  EventMappers,
  GTMEventData,
  GTMIntegrationOptions,
} from './types';
import type { Schemas } from '../GA';

/**
 * GTM Integration.
 */
class GTM extends integrations.Integration<GTMIntegrationOptions> {
  protected consentKey?: string;
  protected contextKey?: string;
  protected setUserKey?: string;
  protected context?: EventContext;
  protected eventsMapper: EventMappers;
  protected eventSchemas: Schemas;
  /**
   * Creates an instance of GTM. It will store the events mapper and the options
   * passed.
   *
   * @param options   - Config for the GTM container.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Analytics instance stripped down with only helpers.
   */
  constructor(
    options: GTMIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);

    this.consentKey = get(
      this.options,
      SET_CONSENT_KEY,
      DATA_LAYER_CONSENT_EVENT,
    );

    this.contextKey = get(
      this.options,
      SET_CONTEXT_KEY,
      DATA_LAYER_CONTEXT_EVENT,
    );

    this.setUserKey = get(
      this.options,
      SET_USER_KEY,
      DATA_LAYER_SET_USER_EVENT,
    );

    const customEventsMapper = get(options, EVENTS_MAPPER_KEY, {});
    const customEventSchemas = get(options, EVENT_SCHEMAS_KEY, {});

    this.eventsMapper = merge({}, eventsMapper, customEventsMapper);
    this.eventSchemas = merge({}, eventSchemas, customEventSchemas);

    this.initialize(options, loadData);
  }

  /**
   * Method to check if the integration is ready to be loaded. This integration
   * should always load. Then, in the container, each tag should be configured with
   * the proper trigger according its category: Preferences, statistics or marketing.
   *
   * @returns If the integration is ready to be loaded.
   */
  static override shouldLoad() {
    return true;
  }

  /**
   * Startup the GTM script and write some properties on the dataLayer. There's no
   * need to wait for the script to load as GTM will pick up any data already written
   * on the dataLayer once it starts running.
   *
   * @param options  - Integration options.
   * @param loadData - Analytics's load event data.
   */
  initialize(
    options: GTMIntegrationOptions,
    loadData: LoadIntegrationEventData,
  ) {
    this.runGTMScript(options);
    this.setConsent(loadData.consent as ConsentData);
    this.setContext(loadData.context);
    this.onSetUser(loadData);
  }

  /**
   * Loads the GTM script with the container ID passed via the integration's options.
   *
   * @param options - Integration options.
   *
   * @returns This allows chaining of class methods.
   */
  runGTMScript(options: GTMIntegrationOptions) {
    const containerId = get(options, CONTAINER_ID_KEY);

    if (!containerId) {
      // We will just log an error here instead of throwing
      // as this integration might be used alongside the
      // legacy one and throwing here would prevent
      // the consent to be written on the dataLayer
      // which could break the expectation of the tenants's sites.
      coreUtils.logger.error(
        `${GTM_LABEL_PREFIX} Container ID not found. Make sure you are passing a valid container ID on the integration options via "analytics.addIntegration("gtm", integrations.GTM, options)"`,
      );

      return this;
    }

    gtmTag(containerId);

    return this;
  }

  /**
   * Sets the consent object. This method is called by analytics whenever the consent
   * changes, so there's no need to validate if it has changed or not.
   *
   * @param consent - Object to be written on the dataLayer.
   *
   * @returns This allows chaining of class methods.
   */
  override setConsent(this: this, consent: ConsentData): this {
    this.write({
      consent,
      event: this.consentKey as string,
      type: CONSENT_TYPE,
    });

    return this;
  }

  /**
   * Workaround to handle when the context changes. Only write when it does change,
   * to avoid writing it on every event.
   *
   * @param context - The context passed in every event.
   *
   * @returns This allows chaining of class methods.
   */
  setContext(context: EventContext) {
    const customSetContext = get(this.options, SET_CONTEXT_FN_KEY);

    if (!customSetContext) {
      if (isEqual(this.context, context)) {
        return this;
      }

      this.write({
        context: getContextParameters(context),
        event: this.contextKey as string,
        type: CONTEXT_TYPE,
      });

      this.context = context;

      return this;
    }

    if (customSetContext && typeof customSetContext !== 'function') {
      coreUtils.logger.error(
        `${GTM_TYPE_ERROR_PREFIX} "${SET_CONTEXT_FN_KEY}" option is not a function, ${INVALID_FUNCTION_ERROR_SUFFIX}.`,
      );

      return this;
    }

    customSetContext(context);

    return this;
  }

  /**
   * Handles whenever the user changes. Will try to execute a custom "onSetUser" if
   * passed via the integration's options.
   *
   * @param data - OnSetUser event data.
   *
   * @returns This allows chaining of class methods.
   */
  override onSetUser(data: SetUserEventData | LoadIntegrationEventData) {
    const customOnSetUser = get(this.options, SET_USER_FN_KEY);
    const protectedUserData = coreUtils.hashUserData(data.user);

    if (!customOnSetUser) {
      this.write({
        event: this.setUserKey as string,
        type: SET_USER_TYPE,
        user: getUserParameters(protectedUserData),
      });

      return this;
    }

    if (customOnSetUser && typeof customOnSetUser !== 'function') {
      coreUtils.logger.error(
        `${GTM_TYPE_ERROR_PREFIX} "${SET_USER_FN_KEY}" option is not a function, ${INVALID_FUNCTION_ERROR_SUFFIX}.`,
      );

      return this;
    }

    customOnSetUser(protectedUserData);

    return this;
  }

  /**
   * Validates the event against a schema. If no schema is defined for the event,
   * assume the event is valid.
   *
   * @param data - Event data provided by analytics.
   *
   * @returns If the event passed schema validation or not.
   */
  isEventDataValid(data: EventData<TrackTypesValues>) {
    const event = coreUtils.getEvent(data);
    const validationSchema = this.eventSchemas[event];
    const validationResult = eventValidator(data, validationSchema);

    if (!validationResult.isValid) {
      coreUtils.logger.error(
        `${GTM_LABEL_PREFIX} Track event "${event}" failed. Reason: ${validationResult.errorMessage}.`,
      );

      return false;
    }

    return true;
  }

  /**
   * Track a page or event and push it to the dataLayer.
   *
   * @param data - Analytics data.
   *
   * @returns This allows chaining of class methods.
   */
  override track(data: EventData<TrackTypesValues>) {
    const event = coreUtils.getEvent(data);
    const eventMapperFn = this.eventsMapper[event];

    if (!eventMapperFn) {
      return this;
    }

    if (typeof eventMapperFn !== 'function') {
      coreUtils.logger.error(
        `${GTM_TYPE_ERROR_PREFIX} Event mapping for event "${event}" is not a function.
                If you are passing a custom event mapping for this event, ${INVALID_FUNCTION_ERROR_SUFFIX}.`,
      );

      return this;
    }

    if (!this.isEventDataValid(data)) {
      return this;
    }

    const eventProperties = eventMapperFn(data);

    if (!isPlainObject(eventProperties)) {
      coreUtils.logger.error(
        `${GTM_TYPE_ERROR_PREFIX} The properties mapped for event "${event}" did not return an object.
                If you are passing a custom event mapping for this event, make sure that a valid object is returned.`,
      );

      return this;
    }

    const payload = {
      ...(eventProperties as object),
      type: data.type,
      event: data.event,
    };

    this.write(payload);
    // Handle context changes per event
    this.setContext(data.context);

    return this;
  }

  /**
   * Writes data on the `dataLayer` Array.
   *
   * @param data - Data to be written on the dataLayer.
   *
   * @returns This allows chaining of class methods.
   */
  write(data: GTMEventData) {
    if (typeof window === 'undefined') {
      return this;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push(data);

    return this;
  }
}

export default GTM;
