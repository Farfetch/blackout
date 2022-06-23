import { getGuestUser } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getGuestUser.fixtures';
import moxios from 'moxios';

describe('getGuestUser', () => {
  const expectedConfig = undefined;
  const userId = 123;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      id: userId,
      bagId: 'string',
      wishlistId: 'string',
      ip: 'string',
      countryCode: 'string',
      externalId: 'string',
      friendId: 'string',
      expiryDate: '2020-03-31T15:21:55.109Z',
    };

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(getGuestUser(userId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);

    await expect(getGuestUser(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });
});
