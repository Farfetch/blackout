import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getContacts.fixtures';
import moxios from 'moxios';

describe('getContacts', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(usersClient.getContacts(userId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);

    await expect(usersClient.getContacts(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });
});
