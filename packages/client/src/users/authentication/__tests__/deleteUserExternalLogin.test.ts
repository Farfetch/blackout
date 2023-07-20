import { deleteUserExternalLogin } from '../index.js';
import { id, userId } from 'tests/__fixtures__/authentication/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserExternalLogin.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserExternalLogin', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const endpoint = `/account/v1/users/${userId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteUserExternalLogin(userId, id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/externalLogins/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(deleteUserExternalLogin(userId, id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/externalLogins/${id}`,
      expectedConfig,
    );
  });
});
