import {
  mockCountryCode as countryCode,
  mockCities,
  mockStateId as stateId,
} from 'tests/__fixtures__/locale/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCountryStateCities.fixtures.js';
import getCountryStateCities from '../getCountryStateCities.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('locale client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCountryStateCities()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(mockCities));

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
