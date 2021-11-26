import { getRecentlyViewedProducts } from '../';
import client from '../../helpers/client';
import fixtures from '../__mocks__/getRecentlyViewedProducts.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getRecentlyViewedProducts', () => {
  const query = { page: 1, pageSize: 10 };
  const spy = jest.spyOn(client, 'get');
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
      query,
    });

    expect.assertions(2);

    await expect(getRecentlyViewedProducts(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });

  it('should handle a client request successfully assuming default parameters', async () => {
    const response = {};

    fixtures.success({
      response,
      query,
    });

    expect.assertions(2);

    await expect(getRecentlyViewedProducts()).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', () => {
    fixtures.failure({ query });

    expect.assertions(2);

    expect(getRecentlyViewedProducts(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recentlyViewed/products', { query }),
      expectedConfig,
    );
  });
});
