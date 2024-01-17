import { name as PCKG_NAME, version as PCKG_VERSION } from '../../package.json';
import Analytics, {
  trackTypes as analyticsTrackTypes,
  platformTypes,
} from '@farfetch/blackout-core/analytics';
import get from 'lodash/get';
import webContext from './context';

/**
 * Analytics base class.
 *
 * @external farfetch/blackout-core/Analytics
 * @category Analytics
 */

/**
 * @typedef {module:analytics~AnalyticsWeb} AnalyticsWeb
 * @ignore
 */

/**
 * Analytics facade for web applications.
 * Refer to @farfetch/blackout-core documentation to know the
 * inherited methods from Analytics.
 *
 * @category Analytics
 * @alias AnalyticsWeb
 * @augments external:farfetch/blackout-core/Analytics
 */
class AnalyticsWeb extends Analytics {
  /**
   * @hideconstructor
   */
  constructor() {
    super(platformTypes.Web);

    // Stores the last page call
    this.currentPageCallData = null;

    this.useContext(webContext);
  }

  /**
   * Whenever the integrations are loaded at a certain point in time, we fetch them and send the page track information.
   * This can happen whenever the user gives consent for a specific category mid session.
   *
   * @private
   * @param {Array} loadedIntegrations - List of integrations that were loaded.
   *
   * @returns {Promise} Promise that will resolve when the method finishes.
   */
  async onLoadedIntegrations(loadedIntegrations) {
    // If there is a previous page call data stored, send a page event to the integrations that were loaded by the consent
    if (this.currentPageCallData) {
      super.callIntegrationsMethod(
        loadedIntegrations,
        'track', // call 'track' method of new integrations loaded
        this.currentPageCallData,
      );
    }
  }

  /**
   * Track method for custom events.
   *
   * @param {string} event            - Name of the event.
   * @param {object} [properties]     - Properties of the event.
   * @param {object} [eventContext]   - Context data that is specific for this event.
   *
   * @returns {Promise<AnalyticsWeb>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async track(event, properties, eventContext) {
    await super.track(
      analyticsTrackTypes.TRACK,
      event,
      properties,
      eventContext,
    );

    return this;
  }

  /**
   * Gets event data for a track event.
   *
   * @param {string} type                      - Type of the event being called.
   * @param {string} event                     - Name of the event from analytics.track call.
   * @param {object} [properties]              - Event properties from analytics.track call.
   * @param {object} [eventContext]            - Context data that is specific for this event.
   *
   * @returns {Promise<object>}                - Track event data to be sent to integrations.
   * @private
   */
  async getTrackEventData(type, event, properties, eventContext) {
    const eventData = super.getTrackEventData(
      type,
      event,
      properties,
      eventContext,
    );

    this.processContext(eventData.context);
    return eventData;
  }

  /**
   * Process context to append context features related with this package.
   *
   * @param {object} context                    - The event context.
   */
  processContext(context) {
    if (context) {
      const webLibrary = {
        name: PCKG_NAME,
        version: `${PCKG_NAME}@${PCKG_VERSION};`,
      };

      if (context.library) {
        if (context.library.name === PCKG_NAME) {
          // in this case, then context already processed by analyticsWeb
          return;
        }

        // Library already set by analytics core
        const { name, version } = context.library;
        webLibrary.version = `${name}@${version};${PCKG_NAME}@${PCKG_VERSION};`;
      }

      context.library = webLibrary;
    }
  }

  /**
   * Getter for the context object.
   *
   * @param {string} [key] - Key to retrieve from the context. If not specified, will return the whole data stored in the context.
   * @param {string} eventType - The type of event being tracked. Ex: page, track, onSetUser.
   *
   * @returns {Promise<*>} Value for the key in context or the whole context data if key is not specified.
   */
  async context(key, eventType) {
    const context = await super.context(undefined, eventType);
    this.processContext(context);

    return key ? get(context, key) : context;
  }

  /**
   * Tracks a page view.
   *
   * @param {string} event            - Name of the event.
   * @param {object} [properties]     - Properties of the event.
   * @param {object} [eventContext]   - Context data that is specific for this event.
   *
   * @returns {Promise<AnalyticsWeb>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async page(event, properties, eventContext) {
    // Override the last page call data with the current one

    this.currentPageCallData = await this.getTrackEventData(
      analyticsTrackTypes.PAGE,
      event,
      properties,
      eventContext,
    );

    await super.internalTrack(this.currentPageCallData);

    return this;
  }
}

/**
 * Instance to be used to track events and page views.
 *
 * @type {AnalyticsWeb}
 * @name default
 * @memberof module:analytics
 * @static
 */
const instance = new AnalyticsWeb();

export default instance;
