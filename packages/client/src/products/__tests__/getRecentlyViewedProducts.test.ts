import { expectedRecentlyViewedRemotePayload } from 'tests/__fixtures__/products/index.mjs';
import { getRecentlyViewedProducts } from '..//index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getRecentlyViewedProducts.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';
import type { RecentlyViewedProducts } from '../types/index.js';

describe('getRecentlyViewedProducts', () => {
  const query = { page: 1, pageSize: 10 };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: RecentlyViewedProducts =
      expectedRecentlyViewedRemotePayload;

    mswServer.use(fixtures.success(response));

    await expect(getRecentlyViewedProducts(query)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });

  it('should handle a client request successfully assuming default parameters', async () => {
    const response: RecentlyViewedProducts = {
      totalPages: 1,
      totalItems: 10,
      number: 1,
      entries: [],
    };

    mswServer.use(fixtures.success(response));

    await expect(getRecentlyViewedProducts()).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getRecentlyViewedProducts(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });
});
