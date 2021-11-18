import { getCountry } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCountry.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('locale client', () => {
  const countryCode = 'US';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCountry()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = {
        code: 'US',
        structure: '/',
        platformId: 216,
        cultureCode: 'en-US',
        isDefault: true,
        newsletterSubscriptionOptionDefault: true,
        isCountryDefault: true,
        continentId: 5,
        currencies: [
          {
            id: 2,
            name: 'United States Dollar',
            isoCode: 'USD',
            cultureCode: 'en-US',
          },
        ],
      };

      fixtures.success({
        response,
        countryCode,
      });

      await expect(getCountry(countryCode)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        countryCode,
      });

      await expect(getCountry(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode),
        expectedConfig,
      );
    });
  });
});
