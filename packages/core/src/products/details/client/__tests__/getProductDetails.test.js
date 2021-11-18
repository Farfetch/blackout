import { getProductDetails } from '..';
import { mockProductId } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductDetails.fixtures';
import moxios from 'moxios';

describe('getProductDetails', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      result: {
        id: mockProductId,
        shortDescription: 'white shirt',
        slug: 'white-shirt-slug',
      },
    };

    fixtures.success({
      id: mockProductId,
      response,
    });

    expect.assertions(2);

    await expect(getProductDetails(mockProductId, {})).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: mockProductId, query: {} });

    expect.assertions(2);
    await expect(
      getProductDetails(mockProductId, {}),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}`,
      expectedConfig,
    );
  });
});
