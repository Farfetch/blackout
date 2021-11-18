import { getProductSizes } from '..';
import { mockProductId, mockSizesResponse } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductSizes.fixtures';
import moxios from 'moxios';

describe('getProductSizes', () => {
  const expectedConfig = undefined;
  const query = {
    includeOutOfStock: true,
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSizesResponse;

    fixtures.success({
      id: mockProductId,
      query,
      response,
    });

    expect.assertions(2);

    await expect(getProductSizes(mockProductId, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizes?includeOutOfStock=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: mockProductId, query });

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
