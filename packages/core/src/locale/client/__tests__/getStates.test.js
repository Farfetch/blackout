import { getStates } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getStates.fixtures';
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

  describe('getStates()', () => {
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

      fixtures.success({
        response,
        countryCode,
      });

      await expect(getStates(countryCode)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/states'),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        countryCode,
      });

      await expect(getStates(countryCode)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/settings/v1/countries', countryCode, '/states'),
        expectedConfig,
      );
    });
  });
});
