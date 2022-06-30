import { address1, userId } from 'tests/__fixtures__/addresses';
import { getUserDefaultContactAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserDefaultContactAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserDefaultContactAddress', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;
  const response = address1;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getUserDefaultContactAddress(userId)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getUserDefaultContactAddress(userId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
