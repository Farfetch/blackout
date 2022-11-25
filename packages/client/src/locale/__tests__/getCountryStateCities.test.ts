import {
  mockCountryCode as countryCode,
  mockCities,
  mockStateId as stateId,
} from 'tests/__fixtures__/locale';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryStateCities.fixtures';
import getCountryStateCities from '../getCountryStateCities';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryStateCities()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockCities));

      expect.assertions(2);

      await expect(
        getCountryStateCities(countryCode, stateId),
      ).resolves.toEqual(mockCities);

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
        getCountryStateCities(countryCode, stateId),
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
