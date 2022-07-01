import { getGuestUser } from '../..';
import { mockGuestUserResponse, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getGuestUser.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getGuestUser', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGuestUserResponse));

    expect.assertions(2);

    await expect(getGuestUser(userId)).resolves.toStrictEqual(
      mockGuestUserResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getGuestUser(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });
});
