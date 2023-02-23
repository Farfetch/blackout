import {
  mockOrderShippingAddressChangeRequestsPayload,
  orderId,
} from 'tests/__fixtures__/orders';
import { postOrderShippingAddressChangeRequest } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postOrderShippingAddressChangeRequest.fixtures';
import mswServer from '../../../tests/mswServer';

const response = 200;
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postOrderShippingAddressChangeRequest', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(
      postOrderShippingAddressChangeRequest(
        orderId,
        mockOrderShippingAddressChangeRequestsPayload,
      ),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      mockOrderShippingAddressChangeRequestsPayload,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postOrderShippingAddressChangeRequest(
        orderId,
        mockOrderShippingAddressChangeRequestsPayload,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      mockOrderShippingAddressChangeRequestsPayload,
      expectedConfig,
    );
  });
});
