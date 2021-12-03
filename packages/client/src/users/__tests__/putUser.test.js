import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putUser.fixtures';
import moxios from 'moxios';

describe('putUser', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const data = {};
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.put.success({ response, userId });

    expect.assertions(2);

    await expect(usersClient.putUser(userId, data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.put.failure({ userId });

    expect.assertions(2);

    await expect(usersClient.putUser(userId, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}`,
      data,
      expectedConfig,
    );
  });
});
