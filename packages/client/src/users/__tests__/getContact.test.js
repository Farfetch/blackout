import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getContact.fixtures';
import moxios from 'moxios';

describe('getContact', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const contactId = '78910';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ userId, contactId, response });

    expect.assertions(2);

    await expect(usersClient.getContact(userId, contactId)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, contactId });

    expect.assertions(2);

    await expect(
      usersClient.getContact(userId, contactId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });
});
