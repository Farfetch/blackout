import { mockGuestUserResponse } from 'tests/__fixtures__/users/guestUsers.fixtures.mjs';
import { postGuestUser } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postGuestUser.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postGuestUser', () => {
  const expectedConfig = undefined;
  const data = { countryCode: 'PT', ip: '228.43.23.4' };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGuestUserResponse));

    await expect(postGuestUser(data)).resolves.toStrictEqual(
      mockGuestUserResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postGuestUser(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });
});
