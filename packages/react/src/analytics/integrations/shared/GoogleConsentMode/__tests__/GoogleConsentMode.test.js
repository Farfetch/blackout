import { GoogleConsentMode, googleConsentTypes } from '../index.js';

describe('GoogleConsentMode', () => {
  const dataLayerName = 'dataLayer';
  const mockConsent = {
    consent_a: true,
    consent_b: true,
    consent_c: true,
    consent_d: true,
  };
  const defaultConsentConfig = {
    ad_storage: {
      categories: ['consent_a', 'consent_b'],
      default: googleConsentTypes.Denied,
    },
    ad_user_data: {
      categories: ['consent_a'],
      default: googleConsentTypes.Denied,
    },
    ad_personalization: {
      categories: ['consent_c'],
      default: googleConsentTypes.Denied,
    },
    analytics_storage: {
      categories: [],
      default: googleConsentTypes.Denied,
    },
  };

  beforeEach(() => {
    window[dataLayerName] = [];
  });

  describe('Basic Google Consent Mode Configuration', () => {
    it('should initialize GoogleConsentMode', () => {
      const googleConsent = new GoogleConsentMode(
        dataLayerName,
        mockConsent,
        defaultConsentConfig,
      );

      expect(googleConsent).toBeInstanceOf(GoogleConsentMode);

      expect(window.dataLayer).toHaveLength(2);
      expect(window.dataLayer).toMatchSnapshot();
    });

    it('should update dataLayer consent when "updateConsent" is called', () => {
      const googleConsent = new GoogleConsentMode(
        dataLayerName,
        mockConsent,
        defaultConsentConfig,
      );

      expect(window.dataLayer).toMatchSnapshot();

      googleConsent.updateConsent(mockConsent);

      expect(window.dataLayer).toMatchSnapshot();
      expect(window.dataLayer).toHaveLength(2);
    });

    it('should not write to datalayer if no configuration set', () => {
      new GoogleConsentMode(dataLayerName, mockConsent);

      expect(window.dataLayer).toEqual([]);
    });

    it('should not update twice dataLayer consent when "updateConsent" is called with same values', () => {
      const googleConsent = new GoogleConsentMode(
        dataLayerName,
        mockConsent,
        defaultConsentConfig,
      );

      expect(googleConsent).toBeInstanceOf(GoogleConsentMode);

      expect(window.dataLayer).toHaveLength(2);
      expect(window.dataLayer).toMatchSnapshot();

      googleConsent.updateConsent(mockConsent);
      expect(window.dataLayer).toHaveLength(2);
    });
  });

  describe('Extended Google Consent Mode Configuration', () => {
    describe('with unusual scenarios', () => {
      it('should deal with custom assignments on google consents', () => {
        let externalCondition = false;
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          mockConsent,
          {
            ...defaultConsentConfig,
            ad_personalization: {
              getConsentValue: consentData =>
                externalCondition && consentData['consent_x']
                  ? googleConsentTypes.Granted
                  : googleConsentTypes.Denied,
            },
          },
        );

        // update consent without grant conditions
        googleConsent.updateConsent(mockConsent);

        googleConsent.updateConsent({ ...mockConsent, consent_x: true });

        externalCondition = true;

        // update consent with grant conditions
        googleConsent.updateConsent({ ...mockConsent, consent_x: true });

        expect(window.dataLayer).toMatchSnapshot();
      });

      it('should deal with no categories or getConsentValue function set', () => {
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          mockConsent,
          {
            ...defaultConsentConfig,
            ad_personalization: {},
          },
        );

        googleConsent.updateConsent(mockConsent);

        expect(window.dataLayer).toMatchSnapshot();
      });
    });

    describe('with regions', () => {
      const defaultRegionConsentConfig = {
        ...defaultConsentConfig,
        regions: [
          {
            region: ['pt', 'en'],
            ad_personalization: googleConsentTypes.Granted,
          },
        ],
      };

      it('should initialize GoogleConsentMode', () => {
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          mockConsent,
          defaultRegionConsentConfig,
        );

        expect(googleConsent).toBeInstanceOf(GoogleConsentMode);

        expect(window.dataLayer).toHaveLength(3);
        expect(window.dataLayer).toMatchSnapshot();
      });

      it('should update dataLayer consent when "updateConsent" is called', () => {
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          mockConsent,
          defaultRegionConsentConfig,
        );

        expect(window.dataLayer).toMatchSnapshot();

        googleConsent.updateConsent(mockConsent);

        expect(window.dataLayer).toMatchSnapshot();
        expect(window.dataLayer).toHaveLength(3);
      });

      it('should update dataLayer consent when "updateConsent" is called with `wait_for_update` property', () => {
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          {},
          {
            ...defaultRegionConsentConfig,
            waitForUpdate: 400,
          },
        );

        expect(window.dataLayer).toMatchSnapshot();
        expect(window.dataLayer).toHaveLength(3);

        googleConsent.updateConsent(mockConsent);

        expect(window.dataLayer).toHaveLength(4);
        expect(window.dataLayer).toMatchSnapshot();
      });
    });
  });
});
