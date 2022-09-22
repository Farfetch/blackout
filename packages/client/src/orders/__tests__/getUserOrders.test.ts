import { getUserOrders } from '..';
import { mockOrdersResponse, userId } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUserOrders.fixtures';
import mswServer from '../../../tests/mswServer';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getUserOrders', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrdersResponse));

    await expect(getUserOrders(userId)).resolves.toEqual(mockOrdersResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully with pagination', async () => {
    const query = {
      page: 1,
      pageSize: 2,
    };

    mswServer.use(fixtures.success(mockOrdersResponse));
    await expect(getUserOrders(userId, query)).resolves.toEqual(
      mockOrdersResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders?page=${query.page}&pageSize=${query.pageSize}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserOrders(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders`,
      expectedConfig,
    );
  });
});