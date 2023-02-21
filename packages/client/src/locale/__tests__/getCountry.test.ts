import {
  mockCountryCode as countryCode,
  mockCountry,
} from 'tests/__fixtures__/locale';
import { getCountry } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountry.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountry()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockCountry;

      mswServer.use(fixtures.get.success(mockCountry));

      await expect(getCountry(countryCode)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      await expect(getCountry(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode),
        expectedConfig,
      );
    });
  });
});
