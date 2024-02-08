import { type ConsentData } from '@farfetch/blackout-analytics';
import {
  type GoogleConsentCategoryConfig,
  type GoogleConsentModeConfig,
  GoogleConsentType,
} from './types.js';
import { isEqual, omit } from 'lodash-es';

/**
 * GoogleConsentMode handles with Google Consent Mode v2.
 */
export class GoogleConsentMode {
  private dataLayer!: string; // Stores different data layer names
  private config?: GoogleConsentModeConfig; // Stores default or customized consent category mappings
  private configExcludingModeRegionsAndWaitForUpdate!: Record<
    string,
    GoogleConsentCategoryConfig
  >; // exclude not consent properties from config
  private lastConsent?: Record<
    string,
    Array<string> | string | number | undefined
  >;

  constructor(
    dataLayer: string,
    initConsent: ConsentData | null,
    config?: GoogleConsentModeConfig,
  ) {
    this.dataLayer = dataLayer;
    this.config = config;

    // select only the Google Consent Elements
    this.configExcludingModeRegionsAndWaitForUpdate = omit(this.config || {}, [
      'waitForUpdate',
      'regions',
      'mode',
    ]);

    this.loadDefaults(initConsent);
  }
  /**
   * Write google consent default values to dataLayer.
   *
   * @param initConsent - The init consent data to be set.
   */
  private loadDefaults(initConsent: ConsentData | null) {
    if (this.config) {
      const initialValue: Record<string, string | number> = {};

      if (this.config.waitForUpdate) {
        initialValue['wait_for_update'] = this.config.waitForUpdate;
      }

      // Obtain default google consent registry
      const consentRegistry = Object.keys(
        this.configExcludingModeRegionsAndWaitForUpdate,
      ).reduce(
        (result, consentKey) => ({
          ...result,
          [consentKey]:
            this.configExcludingModeRegionsAndWaitForUpdate[consentKey]
              ?.default || GoogleConsentType.Denied,
        }),
        initialValue,
      );

      // Write default consent to data layer
      this.write('consent', 'default', consentRegistry);

      // write regions to data layer if they exists
      this.config.regions?.forEach(region => {
        this.write('consent', 'default', region);
      });

      this.updateConsent(initConsent);
    }
  }

  /**
   * Update consent.
   *
   * @param consentData - The consent data to be set.
   */
  updateConsent(consentData: ConsentData | null) {
    if (this.config) {
      // Dealing with null or undefined consent values
      const safeConsent = consentData || {};

      // Fill consent value into consent element, using analytics consent categories
      const consentRegistry = Object.keys(
        this.configExcludingModeRegionsAndWaitForUpdate,
      ).reduce((result, consentKey) => {
        let consentValue = GoogleConsentType.Denied;
        const consent =
          this.configExcludingModeRegionsAndWaitForUpdate[consentKey];

        if (consent) {
          // has consent config key

          if (consent.getConsentValue) {
            // give priority to custom function
            consentValue = consent.getConsentValue(safeConsent);
          } else if (
            consent?.categories !== undefined &&
            consent.categories.every(consent => safeConsent[consent])
          ) {
            // The second option to assign value is by categories list
            consentValue = GoogleConsentType.Granted;
          }
        }

        return {
          ...result,
          [consentKey]: consentValue,
        };
      }, {});

      // Write consent to data layer
      this.write('consent', 'update', consentRegistry);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    consentCommand: 'consent',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    command: 'default' | 'update',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    consentParams:
      | Record<string, Array<string> | string | number | undefined>
      | undefined,
  ) {
    // Without using the arguments reference, google debug mode would not seem to register the consent
    // that was written to the datalayer, so the parameters added to the function signature are only to
    // avoid mistakes when calling the function.

    if (
      this.config &&
      typeof window !== 'undefined' &&
      consentParams &&
      !isEqual(this.lastConsent, consentParams)
    ) {
      // @ts-ignore
      window[this.dataLayer] = window[this.dataLayer] || [];

      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      window[this.dataLayer].push(arguments);
      this.lastConsent = consentParams;
    }
  }
}

export default GoogleConsentMode;
