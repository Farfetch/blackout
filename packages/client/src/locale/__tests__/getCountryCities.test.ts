import { getCountryCities } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryCities.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const countryCode = 'US';
  const stateId = 3;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryCities()', () => {
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

      mswServer.use(fixtures.get.success(response));

      expect.assertions(2);

      await expect(getCountryCities(countryCode, stateId)).resolves.toEqual(
        response,
      );

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
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(
        getCountryCities(countryCode, stateId),
      ).rejects.toMatchSnapshot();

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
