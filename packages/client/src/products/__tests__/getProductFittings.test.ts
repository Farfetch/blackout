import { getProductFittings } from '../index.js';
import {
  mockProductFittings,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductFittings.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductFittings', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductFittings));

    await expect(getProductFittings(mockProductId)).resolves.toEqual(
      mockProductFittings,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/fittings`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductFittings(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/fittings`,
      expectedConfig,
    );
  });
});
