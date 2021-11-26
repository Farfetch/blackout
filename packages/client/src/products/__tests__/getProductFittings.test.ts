import { getProductFittings } from '..';
import {
  mockProductFittings,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductFittings.fixtures';
import moxios from 'moxios';

describe('getProductFittings', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockProductFittings;

    fixtures.success({
      productId: mockProductId,
      response,
    });

    expect.assertions(2);

    await expect(getProductFittings(mockProductId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/fittings`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      productId: mockProductId,
    });

    expect.assertions(2);
    await expect(getProductFittings(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/fittings`,
      expectedConfig,
    );
  });
});
