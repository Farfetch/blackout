import { getProduct } from '../index.js';
import {
  mockProductDetails,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProduct.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProduct', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductDetails));

    await expect(getProduct(mockProductId, {})).resolves.toEqual(
      mockProductDetails,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProduct(mockProductId, {})).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });
});
