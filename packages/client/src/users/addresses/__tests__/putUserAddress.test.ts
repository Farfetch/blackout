import {
  address1 as data,
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import { putUserAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('putUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(data));

    await expect(putUserAddress({ id, userId }, data)).resolves.toStrictEqual(
      data,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses/${id}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putUserAddress({ id, userId }, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses/${id}`,
      data,
      expectedConfig,
    );
  });
});
