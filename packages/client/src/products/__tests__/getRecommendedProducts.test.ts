import { getRecommendedProducts } from '../';
import {
  mockRecommendedProductsProductId as productId,
  mockRecommendedProductsStrategy as strategyName,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRecommendedProducts.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getRecommendedProducts', () => {
  const query = { strategyName, productId };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(
      getRecommendedProducts({ productId, strategyName }),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recommendations/products', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getRecommendedProducts({ productId, strategyName }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recommendations/products', { query }),
      expectedConfig,
    );
  });
});
