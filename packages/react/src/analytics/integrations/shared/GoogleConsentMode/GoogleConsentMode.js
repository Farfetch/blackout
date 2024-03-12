import { GCM_SHARED_COOKIE_NAME, setCookie } from './cookieUtils';
import { utils } from '@farfetch/blackout-core/analytics';
import omit from 'lodash/omit';

export const googleConsentTypes = {
  GRANTED: 'granted',
  DENIED: 'denied',
};

/**
 * GoogleConsentMode handles with Google Consent Mode v2.
 */
export class GoogleConsentMode {
  dataLayer; // Stores different data layer names
  configWithConsentOnly; // exclude not consent properties from config
  consentDataLayerCommands = [];
  waitForUpdate;
  regions;
  hasConfig;

  /**
   * Creates a new GoogleConsentMode instance.
   *
   * @param {string} dataLayer - DataLayer name.
   * @param {object} initConsent  - The init consent data.
   * @param {object} config - The configuration properties of Google Consent Mode.
   */
  constructor(dataLayer, initConsent, config) {
    this.dataLayer = dataLayer;

    this.waitForUpdate = config?.waitForUpdate;
    this.regions = config?.regions;

    // select only the Google Consent Elements
    this.configWithConsentOnly = omit(config || {}, [
      'waitForUpdate',
      'regions',
      'mode',
    ]);

    this.hasConfig = Object.keys(this.configWithConsentOnly).length > 0;

    this.initialize(initConsent);
  }

  /**
   * Tries to load shared consent from cookies if available
   * and writes it to the dataLayer.
   * This method is only supposed to be called if no google
   * consent config was passed.
   */
  loadSharedConsentFromCookies() {
    const consentModeCookieValue = utils.getCookie(GCM_SHARED_COOKIE_NAME);

    if (consentModeCookieValue) {
      try {
        const values = JSON.parse(consentModeCookieValue);

        if (Array.isArray(values)) {
          values.forEach(value => {
            const [consentCommand, command, consent] = value;

            this.write(consentCommand, command, consent);
          });
        }
      } catch (_) {
        // Do nothing...
      }
    }
  }

  /**
   * Loads default values from the configuration and
   * writes them in a cookie for sharing.
   *
   * @param {object} initConsent - The consent data available, which can be null if the user has not yet given consent.
   */
  loadDefaultsFromConfig(initConsent) {
    const initialValue = {};

    if (this.waitForUpdate) {
      initialValue['wait_for_update'] = this.waitForUpdate;
    }

    // Obtain default google consent registry
    const consentRegistry = Object.keys(this.configWithConsentOnly).reduce(
      (result, consentKey) => ({
        ...result,
        [consentKey]:
          this.configWithConsentOnly[consentKey]?.default ||
          googleConsentTypes.DENIED,
      }),
      initialValue,
    );

    // Write default consent to data layer
    this.write('consent', 'default', consentRegistry);

    // write regions to data layer if they exist
    const regions = this.regions;

    if (regions) {
      regions.forEach(region => {
        this.write('consent', 'default', region);
      });
    }

    this.updateConsent(initConsent);

    this.saveConsent();
  }

  /**
   * Try to set consent types with dataLayer. If a valid
   * config was passed, default values for the consent
   * types are used. Else, try to load the commands
   * set from the cookie if it is available.
   *
   * @param initConsent - The consent data available, which can be null if the user has not yet given consent.
   */
  initialize(initConsent) {
    if (this.hasConfig) {
      this.loadDefaultsFromConfig(initConsent);
    } else {
      this.loadSharedConsentFromCookies();
    }
  }

  /**
   * Writes consent updates to the dataLayer
   * by applying the configuration (if any) to
   * the passed consent data.
   *
   * @param {object} consentData - Consent data obtained from the user or null if not available.
   */
  updateConsent(consentData) {
    if (this.hasConfig && consentData) {
      // Fill consent value into consent element, using analytics consent categories
      const consentRegistry = Object.keys(this.configWithConsentOnly).reduce(
        (result, consentKey) => {
          let consentValue = googleConsentTypes.DENIED;
          const consent = this.configWithConsentOnly[consentKey];

          if (consent) {
            // has consent config key
            if (consent.getConsentValue) {
              // give priority to custom function
              consentValue = consent.getConsentValue(consentData);
            } else if (
              consent?.categories !== undefined &&
              consent.categories.every(consent => consentData[consent])
            ) {
              // The second option to assign value is by categories list
              consentValue = googleConsentTypes.GRANTED;
            }
          }

          return {
            ...result,
            [consentKey]: consentValue,
          };
        },
        {},
      );

      // Write consent to data layer
      this.write('consent', 'update', consentRegistry);

      this.saveConsent();
    }
  }

  /**
   * Saves calculated google consent mode to a cookie
   * for sharing consent between apps in same
   * domain.
   */
  saveConsent() {
    if (this.consentDataLayerCommands.length > 0) {
      setCookie(
        GCM_SHARED_COOKIE_NAME,
        JSON.stringify(this.consentDataLayerCommands),
      );
    }
  }

  /**
   * Handles consent by updating the data layer with consent information.
   *
   * @param {string} consentCommand - The consent command "consent".
   * @param {string} command - The command "default" or "update".
   * @param {object} consentParams - The consent arguments.
   */
  write(consentCommand, command, consentParams) {
    // Without using the arguments reference, google debug mode would not seem to register the consent
    // that was written to the datalayer, so the parameters added to the function signature are only to
    // avoid mistakes when calling the function.

    if (typeof window !== 'undefined' && consentParams) {
      window[this.dataLayer] = window[this.dataLayer] || [];

      // eslint-disable-next-line prefer-rest-params
      window[this.dataLayer].push(arguments);

      this.consentDataLayerCommands.push([
        consentCommand,
        command,
        consentParams,
      ]);
    }
  }
}

export default GoogleConsentMode;
