import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchContact.fixtures';
import moxios from 'moxios';

describe('patchContact', () => {
  const expectedConfig = undefined;
  const data = {};
  const userId = '123456';
  const contactId = '78910';
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ userId, contactId, response });

    expect.assertions(2);

    await expect(
      usersClient.patchContact(userId, contactId, data),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, contactId });

    expect.assertions(2);

    await expect(
      usersClient.patchContact(userId, contactId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      data,
      expectedConfig,
    );
  });
});
