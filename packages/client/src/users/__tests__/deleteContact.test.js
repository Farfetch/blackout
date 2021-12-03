import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteContact.fixtures';
import moxios from 'moxios';

describe('deleteContact', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const contactId = '78910';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ userId, contactId });

    expect.assertions(2);

    await expect(
      usersClient.deleteContact(userId, contactId),
    ).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, contactId });

    expect.assertions(2);

    await expect(
      usersClient.deleteContact(userId, contactId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });
});
