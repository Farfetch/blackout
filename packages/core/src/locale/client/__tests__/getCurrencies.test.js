import { getCurrencies } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCurrencies.fixtures';
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

  describe('getCurrencies()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [
        {
          id: 2,
          name: 'United States Dollar',
          isoCode: 'USD',
          cultureCode: 'en-US',
        },
      ];

      fixtures.success({
        response,
        countryCode,
      });

      await expect(getCurrencies(countryCode)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/currencies'),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        countryCode,
      });

      await expect(getCurrencies(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/currencies'),
        expectedConfig,
      );
    });
  });
});
