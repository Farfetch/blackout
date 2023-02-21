import { addressId as id, userId } from 'tests/__fixtures__/addresses';
import { putUserDefaultContactAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserDefaultContactAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

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
