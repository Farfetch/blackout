import { deleteRecentlyViewedProduct } from '..';
import { id } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteRecentlyViewedProduct.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('deleteRecentlyViewedProduct', () => {
  const spy = jest.spyOn(client, 'delete');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(deleteRecentlyViewedProduct(id)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', id),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(deleteRecentlyViewedProduct(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', id),
      expectedConfig,
    );
  });
});
