import { deleteUserDefaultBillingAddress } from '../index.js';
import { userId } from 'tests/__fixtures__/addresses/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserDefaultBillingAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserDefaultBillingAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/account/v1/users/${userId}/addresses/billing/current`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteUserDefaultBillingAddress(userId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteUserDefaultBillingAddress(userId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
