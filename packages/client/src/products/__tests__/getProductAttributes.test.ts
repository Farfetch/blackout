import { getProductAttributes } from '..';
import {
  mockProductAttributes,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductAttributes.fixtures';
import mswServer from '../../../tests/mswServer';

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
