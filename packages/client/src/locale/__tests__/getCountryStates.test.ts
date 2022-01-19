import { getCountryStates } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryStates.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const countryCode = 'US';
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryStates()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [
        {
          code: 'AL',
          countryId: 216,
          id: 3,
          name: 'Alabama',
        },
        {
          code: 'AK',
          countryId: 216,
          id: 6,
          name: 'Alaska',
        },
      ];

      mswServer.use(fixtures.get.success(response));

      expect.assertions(2);

      await expect(getCountryStates(countryCode)).resolves.toEqual(response);

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
