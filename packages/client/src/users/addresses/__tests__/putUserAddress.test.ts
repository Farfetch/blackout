import {
  address1,
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses';
import { putUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putUserAddress', () => {
  const expectedConfig = undefined;
  const response = address1;
  const data = address1;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(putUserAddress({ id, userId }, data)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses/${id}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

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
