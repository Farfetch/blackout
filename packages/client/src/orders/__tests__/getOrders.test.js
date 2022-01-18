import { getOrders } from '..';
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
const mockedResponse = {
  number: 1,
  totalPages: 8,
  totalItems: 471,
  entries: [
    {
      id: 'QRDAE2',
      userId: 25767945,
      merchantId: 10361,
      merchantName: 'ACME WH',
      totalQuantity: 1,
      status: 'Order delivered',
      createdDate: '2021-06-23T08:56:02.353Z',
      returnAvailable: true,
      checkoutOrderId: 138847898,
      tags: [],
    },
    {
      id: 'S3R2YN',
      userId: 25767945,
      merchantId: 10361,
      merchantName: 'ACME WH',
      totalQuantity: 1,
      status: 'Return Accepted and Refunded',
      createdDate: '2021-06-22T16:18:07.66Z',
      returnAvailable: false,
      checkoutOrderId: 138811505,
      returnId: 24314901,
      tags: [],
    },
  ],
};

describe('getOrders', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ userId, response: mockedResponse });

    await expect(getOrders({ userId })).resolves.toEqual(mockedResponse);
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
    await expect(getOrders({ query, userId })).resolves.toEqual(mockedResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders?page=${query.page}&pageSize=${query.pageSize}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    await expect(getOrders({ userId })).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/orders`,
      expectedConfig,
    );
  });
});
