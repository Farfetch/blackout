import { getCities } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCities.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('locale client', () => {
  const countryCode = 'US';
  const stateId = 3;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCities()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [
        {
          id: 515,
          name: 'Atlanta',
          stateId: 17,
          countryId: 216,
        },
      ];

      fixtures.success({
        response,
        countryCode,
        stateId,
      });

      await expect(getCities(countryCode, stateId)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join(
          '/settings/v1/countries',
          countryCode,
          'states',
          stateId,
          'cities',
        ),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        countryCode,
        stateId,
      });

      await expect(getCities(countryCode, stateId)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join(
          '/settings/v1/countries',
          countryCode,
          'states',
          stateId,
          'cities',
        ),
        expectedConfig,
      );
    });
  });
});
