import { deleteRecentlyViewedProduct } from '..';
import client from '../../helpers/client';
import fixtures from '../__mocks__/deleteRecentlyViewedProduct.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('deleteRecentlyViewedProduct', () => {
  const id = 1345678;
  const spy = jest.spyOn(client, 'delete');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({
      response,
      id,
    });

    expect.assertions(2);

    await expect(deleteRecentlyViewedProduct(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', id),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(deleteRecentlyViewedProduct(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', id),
      expectedConfig,
    );
  });
});
