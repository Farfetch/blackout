import { getGuestUser } from '../../index.js';
import {
  mockGuestUserResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getGuestUser.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getGuestUser', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGuestUserResponse));

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

    await expect(getGuestUser(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });
});
