import { addressId as id, userId } from 'tests/__fixtures__/addresses';
import { putUserDefaultBillingAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserDefaultBillingAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putUserDefaultBillingAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(putUserDefaultBillingAddress({ id, userId })).resolves.toBe(
      200,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses/billing/${id}`,
      {},
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putUserDefaultBillingAddress({ id, userId }),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses/billing/${id}`,
      {},
      expectedConfig,
    );
  });
});
