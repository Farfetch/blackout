import { getProduct } from '..';
import { mockProductId, mockResponse } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProduct.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProduct', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    expect.assertions(2);

    await expect(getProduct(mockProductId, {})).resolves.toEqual(mockResponse);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getProduct(mockProductId, {})).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });
});
