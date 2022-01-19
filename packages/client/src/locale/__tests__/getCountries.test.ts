import { getCountries } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountries.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;
  const query = {
    pageIndex: 0,
    pageSize: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

      mswServer.use(fixtures.get.success(response));

      expect.assertions(2);

      await expect(getCountries(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(getCountries(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query }),
        expectedConfig,
      );
    });
  });
});
