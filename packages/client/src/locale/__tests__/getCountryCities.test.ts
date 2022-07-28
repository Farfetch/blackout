import {
  mockCountryCode as countryCode,
  mockCountryCitiesResponse,
  mockStateId as stateId,
} from 'tests/__fixtures__/locale';
import { getCountryCities } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryCities.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryCities()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockCountryCitiesResponse));

      expect.assertions(2);

      await expect(getCountryCities(countryCode, stateId)).resolves.toEqual(
        mockCountryCitiesResponse,
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
