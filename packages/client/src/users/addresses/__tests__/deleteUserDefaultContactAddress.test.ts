import { deleteUserDefaultContactAddress } from '../index.js';
import { userId } from 'tests/__fixtures__/addresses/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserDefaultContactAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserDefaultContactAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteUserDefaultContactAddress(userId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteUserDefaultContactAddress(userId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
