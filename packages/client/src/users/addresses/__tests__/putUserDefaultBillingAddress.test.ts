import {
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import { putUserDefaultBillingAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserDefaultBillingAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

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
