import { getCountries } from '..';
import { mockCountry } from 'tests/__fixtures__/locale';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountries.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountries()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = {
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [mockCountry],
      };

      mswServer.use(fixtures.get.success(response));

      await expect(getCountries()).resolves.toEqual(response.entries);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query: { pageSize: 10000 } }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      await expect(getCountries()).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', { query: { pageSize: 10000 } }),
        expectedConfig,
      );
    });
  });
});
