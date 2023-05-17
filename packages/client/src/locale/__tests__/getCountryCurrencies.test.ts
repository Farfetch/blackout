import {
  mockCountryCode as countryCode,
  mockCurrencies,
} from 'tests/__fixtures__/locale/index.mjs';
import { getCountryCurrencies } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCountryCurrencies.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryCurrencies()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockCurrencies));

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

      await expect(getCountryCurrencies(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/currencies'),
        expectedConfig,
      );
    });
  });
});
