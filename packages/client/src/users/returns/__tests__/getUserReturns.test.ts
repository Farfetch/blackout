import { getUserReturns } from '..';
import { mockUserReturnsResponse, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserReturns.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserReturns', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUserReturnsResponse));

    await expect(getUserReturns(userId)).resolves.toStrictEqual(
      mockUserReturnsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserReturns(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns`,
      expectedConfig,
    );
  });
});
