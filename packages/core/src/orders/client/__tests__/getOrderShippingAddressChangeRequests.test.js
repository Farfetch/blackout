import { getOrderShippingAddressChangeRequests } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getOrderShippingAddressChangeRequests.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const expectedConfig = undefined;
const response = {};

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderShippingAddressChangeRequests', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, response });

    await expect(getOrderShippingAddressChangeRequests(orderId)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId });

    await expect(
      getOrderShippingAddressChangeRequests(orderId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      expectedConfig,
    );
  });
});
