import { getCountryAddressSchema } from '..';
import {
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCountryAddressSchema.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getSchema', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  beforeEach(() => jest.clearAllMocks());

  describe('getSchema', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockGetAddressSchemaResponse));

      expect.assertions(2);
      await expect(getCountryAddressSchema(isoCode)).resolves.toStrictEqual(
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

      await expect(getCountryAddressSchema(isoCode)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/countries/${isoCode}/addressSchemas`,
        expectedConfig,
      );
    });
  });
});
