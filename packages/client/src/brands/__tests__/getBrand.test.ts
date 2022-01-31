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
      const response = mockBrandResponse;

      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(getBrand(mockBrandId)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(getBrand(mockBrandId)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });
  });
});
