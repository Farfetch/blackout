import { postOrderShippingAddressChangeRequests } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postOrderShippingAddressChangeRequests.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const response = {
  billingAddress: {
    isDefaultBillingAddress: undefined,
    isDefaultShippingAddress: undefined,
    isPreferredAddress: undefined,
  },
  createdDate: '/Date(null)/',
  customerType: null,
  items: undefined,
  shippingAddress: {
    isDefaultBillingAddress: undefined,
    isDefaultShippingAddress: undefined,
    isPreferredAddress: undefined,
  },
  updatedDate: '/Date(null)/',
};
const data = {
  shippingAddress: {
    addressLine1: 'Rua do teste',
  },
};
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postOrderShippingAddressChangeRequests', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId });

    await expect(
      postOrderShippingAddressChangeRequests(orderId, data),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId });

    await expect(
      postOrderShippingAddressChangeRequests(orderId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/shippingAddressChangeRequests`,
      data,
      expectedConfig,
    );
  });
});
