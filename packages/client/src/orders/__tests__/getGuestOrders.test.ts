import { getGuestOrders } from '../index.js';
import { mockGuestOrdersResponse } from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getGuestOrders.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getGuestOrders', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGuestOrdersResponse));

    await expect(getGuestOrders()).resolves.toEqual(mockGuestOrdersResponse);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestorders/',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getGuestOrders()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestorders/',
      expectedConfig,
    );
  });
});
