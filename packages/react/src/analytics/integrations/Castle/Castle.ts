/**
 * Castle Integration. Tracks page views and user login/logout for security
 * purposes.
 *
 * @example <caption>Adding Castle integration to analytics</caption>
 * ```
 *
 * import analytics, \{ integrations \} from '\@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('castle', integrations.Castle, \{
 *   configureOptions: \{
 *    pk: castle publishable key,
 *    window?: Overrides the browser window object,
 *    avoidCookies?: Disables the usage of cookies whenever possible when set to true,
 *    cookieDomain?: When cookies are used, set the cookie domain scope,
 *    timeout?: Request timeout for page, form, custom events,
 *   \},
 *   debugModeOn?: Boolean - if true, will log tracked events,
 *   httpClient?: Custom Axios instance to install the interceptor,
 *   clientIdHeaderName?: Custom name for the header that will be appended via the interceptor,
 *   configureHttpClient?: Custom function that will be responsible for handling the castle request token,
 * \});
 * ```
 */

import * as castleJS from '@castleio/castle-js';
import { client as coreClient } from '@farfetch/blackout-client';
import {
  EventData,
  eventTypes,
  integrations,
  LoadIntegrationEventData,
  PageviewEventData,
  StrippedDownAnalytics,
  TrackEventData,
  trackTypes,
  TrackTypesValues,
  UserData,
  UserTraits,
  utils,
} from '@farfetch/blackout-analytics';
import identity from 'lodash/identity';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { CastleIntegrationOptions } from './types';
import type {
  ConfigureOptions,
  CustomParams,
  FormParams,
  PageParams,
  Thenable,
  UserParams,
} from '@castleio/castle-js';
import type { WebContextType } from '../../context';

export const CLIENT_ID_HEADER_NAME = 'X-Castle-Request-Token';
export const CASTLE_MESSAGE_PREFIX = 'Castle 2.x -';

/**
 * Castle integration.
 */
class Castle extends integrations.Integration<CastleIntegrationOptions> {
  httpClientInterceptor?: number;
  isInterceptorAttached?: boolean;
  debugModeOn: boolean;
  castleJS: typeof castleJS;
  httpClient: AxiosInstance;
  clientIdHeaderName: string;

  /**
   * This integration is required, so it should load independently of user consent.
   *
   * @returns If the integration should load.
   */
  static override shouldLoad() {
    return true;
  }

  /**
   * Creates an instance of Castle integration.
   *
   * @param options   - Integration options.
   * @param loadData  - Analytics's load event data.
   * @param analytics - Stripped down analytics instance.
   */
  constructor(
    options: CastleIntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    super(options, loadData, analytics);
    this.httpClient = options.httpClient || coreClient;
    this.castleJS = castleJS;
    this.debugModeOn = options.debugModeOn || false;
    this.clientIdHeaderName =
      options.clientIdHeaderName || CLIENT_ID_HEADER_NAME;

    this.validateOptions(options);
    this.applyOptions(options);
  }

  /**
   * Method that will validate each important option and throw an error if necessary.
   *
   * @param options - Integration options.
   */
  validateOptions(options: CastleIntegrationOptions) {
    if (
      options.configureHttpClient &&
      typeof options.configureHttpClient !== 'function'
    ) {
      throw new TypeError(
        `${CASTLE_MESSAGE_PREFIX} Invalid option 'configureHttpClient'. Please make sure a valid function to configure the necessary headers.`,
      );
    }

    if (
      this.clientIdHeaderName &&
      typeof this.clientIdHeaderName !== 'string'
    ) {
      throw new TypeError(
        `${CASTLE_MESSAGE_PREFIX} Invalid option 'clientIdHeaderName'. Please make sure a valid string for the castle header name.`,
      );
    }
  }

  /**
   * After the validations, this method will apply the options passed in and install
   * the interceptor.
   *
   * @param options - Integration options.
   */
  applyOptions(options: CastleIntegrationOptions) {
    try {
      const configureOptions: ConfigureOptions = options.configureOptions;

      this.castleJS.configure(configureOptions);

      this.installInterceptor(options);
    } catch (error) {
      throw new Error(
        `${CASTLE_MESSAGE_PREFIX} Failed to initialize Castle. Error: ${error}`,
      );
    }
  }

  /**
   * Installs the necessary request interceptor on the axios client.
   *
   * @param options - Integration options.
   */
  async installInterceptor(options: CastleIntegrationOptions): Promise<void> {
    if (options.configureHttpClient) {
      await options.configureHttpClient(this.castleJS.createRequestToken);

      this.isInterceptorAttached = true;

      return;
    }

    // install the default interceptor on our core client
    this.httpClientInterceptor = this.httpClient.interceptors.request.use(
      this.onBeforeRequestFullfil,
      undefined,
    );

    this.isInterceptorAttached = true;
  }

  /**
   * Callback that is used on the Axios interceptor to add the correct Castle token
   * header.
   *
   * @param config - Axios config object.
   *
   * @returns - The modified Axios config object.
   */
  onBeforeRequestFullfil = async (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    const requestTokenValue = await this.castleJS.createRequestToken();

    if (!config.headers) {
      config.headers = {};
    }

    config.headers[this.clientIdHeaderName] = requestTokenValue;

    return config;
  };

  /**
   * Returns the user object data formatted for the Castle needs.
   *
   * @param data - Data Track event data.
   *
   * @returns - The formatted user object.
   */
  getUserData(data: TrackEventData | PageviewEventData) {
    const userData: UserData = data.user || {};
    const userTraits: UserTraits = userData.traits || {};

    const formattedUserData: UserParams = {
      id: userData.id?.toString() || 'USER NOT LOADED YET',
      email: userTraits.email,
      phone: userTraits.phoneNumber,
      name: userTraits.name,
      registered_at: userTraits.createdDate,
      traits: {
        isGuest: userTraits.isGuest,
      },
    };

    // clean "falsy" values to ensure the SDK accepts the request.
    return pickBy(formattedUserData, identity) as UserParams;
  }

  /**
   * Track method that will filter by event type: page or track.
   *
   * @param data - Track event data.
   *
   * @returns - Promise that will resolve when the method finishes.
   */
  override async track(
    data: EventData<TrackTypesValues>,
  ): Promise<Thenable<boolean | null | undefined>> {
    switch (data.type) {
      case trackTypes.PAGE:
        return this.trackPage(data as PageviewEventData);

      case trackTypes.TRACK:
        return this.trackEvent(data as TrackEventData);
      /* istanbul ignore next */
      default:
        return;
    }
  }

  /**
   * Method that will handle each type of event to be tracked.
   *
   * @param data - Data Track event data.
   *
   * @returns - The resolved promise of each castle call method.
   */
  async trackEvent(data: TrackEventData): Promise<Thenable<boolean | null>> {
    const user = this.getUserData(data);

    switch (data.event) {
      case eventTypes.ADDRESS_INFO_ADDED:
      case eventTypes.CHECKOUT_STEP_COMPLETED:
      case eventTypes.LOGIN:
      case eventTypes.PAYMENT_INFO_ADDED:
      case eventTypes.PROMOCODE_APPLIED:
      case eventTypes.SHIPPING_INFO_ADDED:
      case eventTypes.SHIPPING_METHOD_ADDED:
      case eventTypes.SIGNUP_FORM_COMPLETED:
      case eventTypes.SIGNUP_NEWSLETTER: {
        const formData: FormParams = {
          user,
          name: data.event,
          values: pickBy(data?.properties, isString),
        };

        return this.castleJS
          .form(formData)
          .then(
            () =>
              this.debugModeOn &&
              utils.logger.info(
                `${CASTLE_MESSAGE_PREFIX} Form track success. Payload:`,
                formData,
              ),
          );
      }

      default: {
        const eventData: CustomParams = {
          user,
          name: data.event,
          properties: pickBy(data?.properties, isString),
        };

        return this.castleJS
          .custom(eventData)
          .then(
            () =>
              this.debugModeOn &&
              utils.logger.info(
                `${CASTLE_MESSAGE_PREFIX} Custom event track success. Payload:`,
                eventData,
              ),
          );
      }
    }
  }

  /**
   * Method that will handle page events to be tracked.
   *
   * @param data - Data Track event data.
   *
   * @returns - The resolved promise of each castle call method.
   */
  async trackPage(data: PageviewEventData): Promise<Thenable<boolean | null>> {
    const user = this.getUserData(data);
    const dataWithWebEventType = data as PageviewEventData & {
      context: WebContextType;
    };

    const pageData: PageParams = {
      url: dataWithWebEventType.context.web.window.location.href,
      name: dataWithWebEventType.context.web.document.title,
      referrer: dataWithWebEventType.context.web.document.referrer,
      user,
    };

    return this.castleJS
      .page(pageData)
      .then(
        () =>
          this.debugModeOn &&
          utils.logger.info(
            `${CASTLE_MESSAGE_PREFIX} Page track success. Payload:`,
            pageData,
          ),
      );
  }
}

export default Castle;
