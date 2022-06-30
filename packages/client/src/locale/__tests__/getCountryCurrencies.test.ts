import {
  mockCountryCode as countryCode,
  mockCurrencies,
} from 'tests/__fixtures__/locale';
import { getCountryCurrencies } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryCurrencies.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryCurrencies()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockCurrencies));

      expect.assertions(2);

      await expect(getCountryCurrencies(countryCode)).resolves.toEqual(
        mockCurrencies,
      );

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/currencies'),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(getCountryCurrencies(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/currencies'),
        expectedConfig,
      );
    });
  });
});
