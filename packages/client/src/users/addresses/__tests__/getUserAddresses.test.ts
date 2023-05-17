import { getUserAddresses } from '../index.js';
import {
  mockGetAddressesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserAddresses.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserAddresses', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetAddressesResponse));

    await expect(getUserAddresses({ userId })).resolves.toStrictEqual(
      mockGetAddressesResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserAddresses({ userId })).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      expectedConfig,
    );
  });
});
