import { getProductSizes } from '..';
import { mockProductId, mockProductSizes } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductSizes.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductSizes', () => {
  const expectedConfig = undefined;
  const query = {
    includeOutOfStock: true,
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductSizes));

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(
      getProductSizes(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizes?includeOutOfStock=true`,
      expectedConfig,
    );
  });
});
