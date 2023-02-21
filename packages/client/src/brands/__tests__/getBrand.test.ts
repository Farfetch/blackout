import { getBrand } from '../';
import { mockBrandId, mockBrandResponse } from 'tests/__fixtures__/brands';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBrand.fixtures';
import mswServer from '../../../tests/mswServer';

describe('brands client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getBrand()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockBrandResponse));

      await expect(getBrand(mockBrandId)).resolves.toEqual(mockBrandResponse);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getBrand(mockBrandId)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });
  });
});
