import { getCountries } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountries.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('locale client', () => {
  const expectedConfig = undefined;
  const query = {
    pageIndex: 0,
    pageSize: 5,
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCountries()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [
        {
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
        },
      ];

      fixtures.success({
        response,
        query,
      });

      await expect(getCountries(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({ query });

      await expect(getCountries(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query }),
        expectedConfig,
      );
    });
  });
});
