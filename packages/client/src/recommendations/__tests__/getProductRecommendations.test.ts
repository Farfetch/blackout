import { getProductRecommendations } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductRecommendations.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getProductRecommendations', () => {
  const productId = 3030;
  const strategyName = 'a_strategy_name';
  const query = { strategyName, productId };
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

    await expect(
      getProductRecommendations({ productId, strategyName }),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recommendations/products', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', () => {
    fixtures.failure({
      query,
    });

    expect.assertions(2);

    expect(
      getProductRecommendations({ productId, strategyName }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/recommendations/products', { query }),
      expectedConfig,
    );
  });
});
