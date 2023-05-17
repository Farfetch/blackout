import { getCountryAddressSchemas } from '../index.js';
import {
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCountryAddressSchemas.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCountryAddressSchemas', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  describe('getSchema', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockGetAddressSchemaResponse));

      await expect(getCountryAddressSchemas(isoCode)).resolves.toStrictEqual(
        mockGetAddressSchemaResponse,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/countries/${isoCode}/addressSchemas`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getCountryAddressSchemas(isoCode)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/countries/${isoCode}/addressSchemas`,
        expectedConfig,
      );
    });
  });
});
