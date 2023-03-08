import { getProductSizes } from '../index.js';
import {
  mockProductId,
  mockProductSizes,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductSizes.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductSizes', () => {
  const expectedConfig = undefined;
  const query = {
    includeOutOfStock: true,
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductSizes));

    await expect(getProductSizes(mockProductId, query)).resolves.toEqual(
      mockProductSizes,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizes?includeOutOfStock=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductSizes(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizes?includeOutOfStock=true`,
      expectedConfig,
    );
  });
});
