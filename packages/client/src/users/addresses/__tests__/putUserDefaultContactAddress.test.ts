import {
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import { putUserDefaultContactAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserDefaultContactAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('putUserDefaultContactAddress', () => {
  const spy = jest.spyOn(client, 'put');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/${id}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(putUserDefaultContactAddress(userId, id)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putUserDefaultContactAddress(userId, id),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
