import { getOrderShippingAddressChangeRequests } from '../index.js';
import {
  mockOrderShippingAddressChangeRequestsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderShippingAddressChangeRequests.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderShippingAddressChangeRequests', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(
      fixtures.success(mockOrderShippingAddressChangeRequestsResponse),
    );

    await expect(
      getOrderShippingAddressChangeRequests(orderId),
    ).resolves.toStrictEqual(mockOrderShippingAddressChangeRequestsResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getOrderShippingAddressChangeRequests(orderId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      expectedConfig,
    );
  });
});
