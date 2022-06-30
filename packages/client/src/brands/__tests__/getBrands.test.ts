import { getBrands } from '../';
import { mockBrandsResponse, mockQuery } from 'tests/__fixtures__/brands';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBrands.fixtures';
import mswServer from '../../../tests/mswServer';

describe('brands client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getBrands()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockBrandsResponse));
      expect.assertions(2);

      await expect(getBrands(mockQuery)).resolves.toEqual(mockBrandsResponse);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20110127',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(getBrands(mockQuery)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20110127',
        expectedConfig,
      );
    });
  });
});
