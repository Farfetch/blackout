import { type ConsentData, utils } from '@farfetch/blackout-analytics';
import { GCM_SHARED_COOKIE_NAME, setCookie } from './cookieUtils.js';
import {
  type GoogleConsentCategoryConfig,
  type GoogleConsentModeConfig,
  GoogleConsentType,
} from './types.js';
import { omit } from 'lodash-es';

/**
 * GoogleConsentMode handles with Google Consent Mode v2.
 */
export class GoogleConsentMode {
  private dataLayer!: string; // Stores different data layer names
  private configWithConsentOnly!: Record<string, GoogleConsentCategoryConfig>; // exclude not consent properties from config
  private consentDataLayerCommands: Array<
    [
      'consent',
      'default' | 'update',
      Record<string, Array<string> | string | number | undefined> | undefined,
    ]
  > = [];
  private waitForUpdate?: number;
  private regions?: GoogleConsentModeConfig['regions'];
  private hasConfig: boolean;

  constructor(
    dataLayer: string,
    initConsent: ConsentData | null,
    config?: GoogleConsentModeConfig,
  ) {
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
  private loadSharedConsentFromCookies() {
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
      } catch {
        // Do nothing...
      }
    }
  }

  /**
   * Loads default values from the configuration and
   * writes them in a cookie for sharing.
   *
   * @param initConsent - The consent data available, which can be null if the user has not yet given consent.
   */
  private loadDefaultsFromConfig(initConsent: ConsentData | null) {
    const initialValue: Record<string, string | number> = {};

    if (this.waitForUpdate) {
      initialValue['wait_for_update'] = this.waitForUpdate;
    }

    // Obtain default google consent registry
    const consentRegistry = Object.keys(this.configWithConsentOnly).reduce(
      (result, consentKey) => ({
        ...result,
        [consentKey]:
          this.configWithConsentOnly[consentKey]?.default ||
          GoogleConsentType.Denied,
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
  private initialize(initConsent: ConsentData | null) {
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
   * @param consentData - Consent data obtained from the user or null if not available.
   */
  updateConsent(consentData: ConsentData | null) {
    if (this.hasConfig && consentData) {
      // Fill consent value into consent element, using analytics consent categories
      const consentRegistry = Object.keys(this.configWithConsentOnly).reduce(
        (result, consentKey) => {
          let consentValue = GoogleConsentType.Denied;
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
              consentValue = GoogleConsentType.Granted;
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
   * @param consent - The consent command "consent".
   * @param command - The command "default" or "update".
   * @param consentParams - The consent arguments.
   */
  private write(
    consentCommand: 'consent',
    command: 'default' | 'update',
    consentParams:
      | Record<string, Array<string> | string | number | undefined>
      | undefined,
  ) {
    // Without using the arguments reference, google debug mode would not seem to register the consent
    // that was written to the datalayer, so the parameters added to the function signature are only to
    // avoid mistakes when calling the function.

    if (typeof window !== 'undefined' && consentParams) {
      // @ts-ignore
      window[this.dataLayer] = window[this.dataLayer] || [];

      // @ts-ignore
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
