import { postGuestOrderDetails } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postGuestOrderDetails.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const response = {};
const data = {
  guestUserEmail: 'guest@email.com',
};
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postGuestOrderDetails', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, response });

    await expect(postGuestOrderDetails(orderId, data)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId });

    await expect(
      postGuestOrderDetails(orderId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}`,
      data,
      expectedConfig,
    );
  });
});
