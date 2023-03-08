import { getProductAttributes } from '../index.js';
import {
  mockProductAttributes,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductAttributes.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductAttributes', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductAttributes));

    await expect(getProductAttributes(mockProductId)).resolves.toEqual(
      mockProductAttributes,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/attributes`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductAttributes(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/attributes`,
      expectedConfig,
    );
  });
});
