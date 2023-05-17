import { address1, userId } from 'tests/__fixtures__/addresses/index.mjs';
import { getUserDefaultContactAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserDefaultContactAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserDefaultContactAddress', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;
  const response = address1;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getUserDefaultContactAddress(userId)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getUserDefaultContactAddress(userId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
