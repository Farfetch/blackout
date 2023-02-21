import { contactId, userId } from 'tests/__fixtures__/users';
import { deleteUserContact } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteUserContact.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteUserContact', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteUserContact(userId, contactId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteUserContact(userId, contactId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });
});
