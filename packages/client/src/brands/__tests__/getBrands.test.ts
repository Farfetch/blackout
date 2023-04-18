import { getBrands } from '..//index.js';
import {
  mockBrandsQuery,
  mockBrandsResponse,
} from 'tests/__fixtures__/brands/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getBrands.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('brands client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getBrands()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockBrandsResponse));

      await expect(getBrands(mockBrandsQuery)).resolves.toEqual(
        mockBrandsResponse,
      );

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20220127',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getBrands(mockBrandsQuery)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20220127',
        expectedConfig,
      );
    });
  });
});
