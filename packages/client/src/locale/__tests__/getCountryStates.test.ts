import {
  mockCountryCode as countryCode,
  mockStates,
} from 'tests/__fixtures__/locale';
import { getCountryStates } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryStates.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryStates()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockStates));

      expect.assertions(2);

      await expect(getCountryStates(countryCode)).resolves.toEqual(mockStates);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/states'),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(getCountryStates(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/states'),
        expectedConfig,
      );
    });
  });
});
