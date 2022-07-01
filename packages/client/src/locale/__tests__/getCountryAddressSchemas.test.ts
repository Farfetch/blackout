import { getCountryAddressSchemas } from '..';
import {
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryAddressSchemas.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getCountryAddressSchemas', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  beforeEach(() => jest.clearAllMocks());

  describe('getSchema', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockGetAddressSchemaResponse));

      expect.assertions(2);
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

      expect.assertions(2);

      await expect(getCountryAddressSchemas(isoCode)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/countries/${isoCode}/addressSchemas`,
        expectedConfig,
      );
    });
  });
});
