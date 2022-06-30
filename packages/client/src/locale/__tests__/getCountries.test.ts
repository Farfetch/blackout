import { getCountries } from '..';
import { mockCountry, mockQuery as query } from 'tests/__fixtures__/locale';
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
      const response = [mockCountry];

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
