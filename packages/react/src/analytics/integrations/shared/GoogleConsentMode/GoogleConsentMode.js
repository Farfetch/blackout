/**
 * GoogleConsentMode handles with Google Consent Mode v2.
 */
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

export const googleConsentTypes = {
  GRANTED: 'granted',
  DENIED: 'denied',
};
export class GoogleConsentMode {
  /**
   * Creates a new GoogleConsentMode instance.
   *
   * @param {string} dataLayer - DataLayer name.
   * @param {string} initConsent  - The init consent data.
   * @param {object} config - The configuration properties of Google Consent Mode.
   */
  constructor(dataLayer, initConsent, config) {
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
   * Initialize Google Consent Mode instance.
   *
   * @param {string} initConsent  - The init consent data.
   */
  loadDefaults(initConsent) {
    if (this.config) {
      const initialValue = {};

      if (this.config.waitForUpdate) {
        initialValue['wait_for_update'] = this.config.waitForUpdate;
      }

      // Obtain default google consent registry
      const consentRegistry = Object.keys(
        this.configExcludingModeRegionsAndWaitForUpdate,
      ).reduce((result, consentKey) => {
        return {
          ...result,
          [consentKey]:
            this.configExcludingModeRegionsAndWaitForUpdate[consentKey]
              ?.default || googleConsentTypes.DENIED,
        };
      }, initialValue);

      // Write default consent to data layer
      this.write('consent', 'default', consentRegistry);

      // write regions to data layer if they exists
      const regions = this.config.regions;
      if (regions) {
        regions.forEach(region => {
          this.write('consent', 'default', region);
        });
      }

      // after write default consents, then write first update with initial consent data
      this.updateConsent(initConsent);
    }
  }

  /**
   * Update consent.
   *
   * @param {object} consentData - The consent data to be set.
   */
  updateConsent(consentData) {
    if (this.config) {
      // Dealing with null or undefined consent values
      const safeConsent = consentData || {};

      // Fill consent value into consent element, using analytics consent categories
      const consentRegistry = Object.keys(
        this.configExcludingModeRegionsAndWaitForUpdate,
      ).reduce((result, consentKey) => {
        let consentValue = googleConsentTypes.DENIED;
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
            consentValue = googleConsentTypes.GRANTED;
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
   * Write consent on data layer.
   *
   * @param {string} consentCommand - The consent command "consent".
   * @param {string} command - The command "default" or "update".
   * @param {object} consentParams - The consent arguments.
   */
  // eslint-disable-next-line no-unused-vars
  write(consentCommand, command, consentParams) {
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

      window[this.dataLayer].push(arguments);
      this.lastConsent = consentParams;
    }
  }
}

export default GoogleConsentMode;
