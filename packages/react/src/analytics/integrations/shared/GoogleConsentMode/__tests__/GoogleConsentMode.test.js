import { GoogleConsentMode, googleConsentTypes } from '..';

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

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

    deleteAllCookies();
  });

  describe('Basic Google Consent Mode Configuration', () => {
    it('should initialize GoogleConsentMode', () => {
      const googleConsent = new GoogleConsentMode(
        dataLayerName,
        mockConsent,
        defaultConsentConfig,
      );

      expect(googleConsent).toBeInstanceOf(GoogleConsentMode);

      expect(window[dataLayerName]).toHaveLength(2);
      expect(window[dataLayerName]).toMatchSnapshot();
    });

    it('should update dataLayer consent when "updateConsent" is called', () => {
      const googleConsent = new GoogleConsentMode(
        dataLayerName,
        mockConsent,
        defaultConsentConfig,
      );

      expect(window[dataLayerName]).toMatchSnapshot();
      expect(window[dataLayerName]).toHaveLength(2);

      jest.clearAllMocks();

      window[dataLayerName] = [];

      googleConsent.updateConsent(mockConsent);

      expect(window[dataLayerName]).toMatchSnapshot();
    });

    it('should not write to datalayer if no configuration set', () => {
      new GoogleConsentMode(dataLayerName, mockConsent);

      expect(window[dataLayerName]).toEqual([]);
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

        expect(window[dataLayerName]).toMatchSnapshot();
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

        expect(window[dataLayerName]).toMatchSnapshot();
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

        expect(window[dataLayerName]).toHaveLength(3);
        expect(window[dataLayerName]).toMatchSnapshot();
      });

      it('should update dataLayer consent when "updateConsent" is called', () => {
        const googleConsent = new GoogleConsentMode(
          dataLayerName,
          mockConsent,
          defaultRegionConsentConfig,
        );

        expect(window[dataLayerName]).toMatchSnapshot();

        googleConsent.updateConsent(mockConsent);

        expect(window[dataLayerName]).toMatchSnapshot();
        expect(window[dataLayerName]).toHaveLength(4);
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

        expect(window[dataLayerName]).toMatchSnapshot();
        expect(window[dataLayerName]).toHaveLength(3);

        googleConsent.updateConsent(mockConsent);

        expect(window[dataLayerName]).toHaveLength(4);
        expect(window[dataLayerName]).toMatchSnapshot();
      });
    });

    describe('sharing cookie with consent', () => {
      describe('when consent configuration is provided', () => {
        it('should save a cookie when consent is written to dataLayer', () => {
          const googleConsent = new GoogleConsentMode(
            dataLayerName,
            null,
            defaultConsentConfig,
          );

          expect(document.cookie).toMatchSnapshot();

          googleConsent.updateConsent(mockConsent);

          expect(document.cookie).toMatchSnapshot();
        });
      });

      describe('when configuration is not provided', () => {
        it('should load and write consent from the cookie if available', () => {
          // Write cookie with consent values
          new GoogleConsentMode(
            dataLayerName,
            mockConsent,
            defaultConsentConfig,
          );

          expect(document.cookie).not.toBe('');

          window[dataLayerName] = [];

          // Create new instance without configuration to test
          new GoogleConsentMode(dataLayerName, null);

          expect(window[dataLayerName]).toMatchSnapshot();
        });

        it('should not write consent if cookie is not available', () => {
          // Create new instance without configuration to test
          new GoogleConsentMode(dataLayerName, mockConsent);

          expect(window[dataLayerName]).toEqual([]);
        });
      });

      describe('when partial configuration is provided which does not include consent configuration', () => {
        it('should write consent to dataLayer when cookie is available', () => {
          // Write cookie with consent values
          new GoogleConsentMode(
            dataLayerName,
            mockConsent,
            defaultConsentConfig,
          );

          expect(document.cookie).not.toBe('');

          window[dataLayerName] = [];

          // @ts-expect-error Force partial configuration
          new GoogleConsentMode(dataLayerName, mockConsent, {
            mode: 'Advanced',
            waitForUpdate: 100,
          });

          expect(window[dataLayerName]).toMatchSnapshot();
        });

        it('should not write consent to dataLayer when cookie is not available', () => {
          const googleConsent = new GoogleConsentMode(
            dataLayerName,
            mockConsent,
            // @ts-expect-error Force partial configuration
            {
              mode: 'Advanced',
              waitForUpdate: 100,
            },
          );

          expect(window[dataLayerName]).toEqual([]);

          googleConsent.updateConsent(mockConsent);

          expect(window[dataLayerName]).toEqual([]);
        });
      });
    });
  });
});
