import { getOrders } from '..';
import { mockOrdersResponse } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrders.fixtures';
import moxios from 'moxios';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

const userId = 25767945;
const mockedResponse = mockOrdersResponse;

describe('getOrders', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ userId, query: undefined, response: mockedResponse });

    await expect(getOrders(userId)).resolves.toEqual(mockedResponse);
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

    fixtures.success({ query, userId, response: mockedResponse });
    await expect(getOrders(userId, query)).resolves.toEqual(mockedResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders?page=${query.page}&pageSize=${query.pageSize}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    await expect(getOrders(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders`,
      expectedConfig,
    );
  });
});
