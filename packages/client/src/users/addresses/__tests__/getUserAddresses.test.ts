import { getUserAddresses } from '..';
import { mockGetAddressesResponse, userId } from 'tests/__fixtures__/addresses';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserAddresses.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserAddresses', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetAddressesResponse));

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(getUserAddresses({ userId })).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      expectedConfig,
    );
  });
});
