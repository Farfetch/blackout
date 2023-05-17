import { getUserOrders } from '../index.js';
import {
  mockOrdersResponse,
  mockOrdersResponse2,
  userId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserOrders.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

const query = {
  page: 1,
  pageSize: 2,
};

const infinityQuery = {
  page: 1,
  pageSize: 10000,
};

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

  it('should handle a client request successfully when only one request is made with the infinity option', async () => {
    mswServer.use(fixtures.success(mockOrdersResponse));

    await expect(
      getUserOrders(userId, { pageSize: Infinity, page: Infinity }),
    ).resolves.toEqual(mockOrdersResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders?page=${infinityQuery.page}&pageSize=${infinityQuery.pageSize}`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully when multiple requests are made with the infinity option', async () => {
    mswServer.use(fixtures.success(mockOrdersResponse2));

    await getUserOrders(userId, { pageSize: Infinity, page: Infinity });

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders?page=${infinityQuery.page}&pageSize=${infinityQuery.pageSize}`,
      expectedConfig,
    );
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should handle a client request successfully with pagination', async () => {
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
