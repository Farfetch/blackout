import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteContact.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deleteContact', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const contactId = '78910';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(usersClient.deleteContact(userId, contactId)).resolves.toEqual(
      expect.objectContaining({ status: 204 }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

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
