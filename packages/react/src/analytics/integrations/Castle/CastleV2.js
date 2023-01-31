/**
 * CastleV2 Integration.
 * Tracks page views and user login/logout for security purposes.
 *
 * @example <caption>Adding Castle integration to analytics</caption>
 *
 * import analytics, { integrations } from '@farfetch/blackout-react/analytics';
 *
 * analytics.addIntegration('castle', integrations.Castle, {
 *   configureOptions: {
 *    pk: castle publishable key,
 *    window?: Overrides the browser window object,
 *    avoidCookies?: Disables the usage of cookies whenever possible when set to true,
 *    cookieDomain?: When cookies are used, set the cookie domain scope,
 *    timeout?: Request timeout for page, form, custom events,
 *   },
 *   debugModeOn?: Boolean - if true, will log tracked events,
 *   httpClient?: Custom Axios instance to install the interceptor,
 *   clientIdHeaderName?: Custom name for the header that will be appended via the interceptor,
 *   configureHttpClient?: Custom function that will be responsible for handling the castle request token,
 * });
 *
 * @module CastleV2
 * @category Analytics
 * @subcategory Integrations
 */

import * as castleJS from '@castleio/castle-js';
import {
  eventTypes,
  integrations,
  trackTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import coreClient from '@farfetch/blackout-core/helpers/client';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

export const CLIENT_ID_HEADER_NAME = 'X-Castle-Request-Token';
export const CASTLE_MESSAGE_PREFIX = 'Castle 2.x -';

/**
 * CastleV2 integration.
 *
 * @private
 * @augments Integration
 */
class CastleV2 extends integrations.Integration {
  httpClientInterceptor = null;
  isInterceptorAttached = false;
  debugModeOn = false;

  /**
   * This integration is required, so it should load independently of user consent.
   *
   * @returns {boolean} If the integration should load.
   */
  static shouldLoad() {
    return true;
  }

  /**
   * Creates an instance of CastleV2 integration.
   *
   * @param {object} options - Integration options.
   * @param {object} loadData - Analytics's load event data.
   */
  constructor(options, loadData) {
    super(options, loadData);
    // Store the castle singleton here as it might be useful if someone needs to access it.
    this.castleJS = castleJS;
    this.httpClient = options.httpClient || coreClient;
    this.debugModeOn = options.debugModeOn || false;
    this.clientIdHeaderName =
      options.clientIdHeaderName || CLIENT_ID_HEADER_NAME;

    this.validateOptions(options);
    this.applyOptions(options);
  }

  /**
   * Method that will validate each important option and throw an error if necessary.
   *
   * @param {object} options - Integration options.
   */
  validateOptions(options) {
    if (!options.configureOptions?.pk) {
      throw new Error(
        `${CASTLE_MESSAGE_PREFIX} Failed to initialize Castle. Please make sure a valid 'pk: string (Publishable Key)' is passed via the integration options.`,
      );
    }

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
   * After the validations, this method will apply the options passed in and install the interceptor.
   *
   * @param {object} options - Integration options.
   */
  applyOptions(options) {
    try {
      this.castleJS.configure(options.configureOptions);

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
   * @param {object} options - Integration options.
   *
   * @async
   */
  async installInterceptor(options) {
    if (options.configureHttpClient) {
      await options.configureHttpClient(this.castleJS.createRequestToken);

      this.isInterceptorAttached = true;

      return;
    }

    // install the default interceptor on our core client
    this.httpClientInterceptor = this.httpClient.interceptors.request.use(
      this.onBeforeRequestFullfil,
      null,
    );

    this.isInterceptorAttached = true;
  }

  /**
   * Callback that is used on the Axios interceptor to add the correct Castle token header.
   *
   * @async
   *
   * @param {object} config - Axios config object.
   *
   * @returns {object} - The modified Axios config object.
   */
  onBeforeRequestFullfil = async config => {
    const requestTokenValue = await this.castleJS.createRequestToken();

    config.headers[this.clientIdHeaderName] = requestTokenValue;

    return config;
  };

  /**
   * Returns the user object data formatted for the Castle needs.
   *
   * @param {object} data - Data Track event data.
   *
   * @returns {object} - The formatted user object.
   */
  getUserData(data) {
    const userData = data.user || {};
    const userTraits = userData.traits || {};

    const formattedUserData = {
      id: userData.id || 'USER NOT LOADED YET',
      email: userTraits.email,
      phone: userTraits.phoneNumber,
      name: userTraits.name,
      registered_at: this.getNormalizedCreatedDate(userTraits.createdDate),
      traits: {
        isGuest: userTraits.isGuest,
      },
    };

    // clean "falsy" values to ensure the SDK accepts the request.
    return pickBy(formattedUserData, identity);
  }

  /**
   * Calculates the correct user account created date, if possible.
   *
   * TODO: Remove this 🔨 when the backend starts to send the correct format date on all endpoints.
   *
   * @param {string|undefined} createdDate - The user trait.
   *
   * @returns {string} - The ISO date string.
   */
  getNormalizedCreatedDate(createdDate) {
    if (!createdDate) {
      return undefined;
    }

    const isCreatedDateNaN = isNaN(new Date(createdDate).getTime());

    if (isCreatedDateNaN) {
      // Remove all non-numeric characters and convert the timestamp into a valid date format
      const extractedTimestamp = parseInt(createdDate.replace(/[^0-9]/g, ''));

      // If the timestamp is a valid number, create a date with it,
      // If its not, send undefined
      if (
        typeof extractedTimestamp === 'number' &&
        !isNaN(extractedTimestamp)
      ) {
        return new Date(extractedTimestamp).toISOString();
      }

      return undefined;
    }

    return createdDate;
  }

  /**
   * Track method that will filter by event type: page or track.
   *
   * @param {object} data Track event data.
   *
   * @async
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async track(data) {
    switch (data.type) {
      case trackTypes.PAGE:
        return this.trackPage(data);

      case trackTypes.TRACK:
        return this.trackEvent(data);
      /* istanbul ignore next */
      default:
        return;
    }
  }

  /**
   * Method that will handle each type of event to be tracked.
   *
   * @param {object} data - Data Track event data.
   *
   * @returns {Promise<object>|undefined} - The resolved promise of `form` castle method call for events of interest or undefined for other events.
   */
  trackEvent(data) {
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
        const user = this.getUserData(data);

        const formData = {
          user,
          name: data.event,
          values: data.properties,
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

      default:
        break;
    }
  }

  /**
   * Method that will handle page events to be tracked.
   *
   * @param {object} data - Data Track event data.
   *
   * @async
   *
   * @returns {Promise<object>} - The resolved promise of each castle call method.
   */
  async trackPage(data) {
    const user = this.getUserData(data);

    const pageData = {
      page: {
        url: data.context.web.window.location.href,
        title: data.context.web.document.title,
        referrer: data.context.web.document.referrer,
      },
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

export default CastleV2;
