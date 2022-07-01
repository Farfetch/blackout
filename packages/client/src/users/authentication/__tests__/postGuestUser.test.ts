import { mockGuestUserResponse } from 'tests/__fixtures__/users/guestUsers.fixtures';
import { postGuestUser } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postGuestUser.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postGuestUser', () => {
  const expectedConfig = undefined;
  const data = { countryCode: 'PT', ip: '228.43.23.4' };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGuestUserResponse));

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(postGuestUser(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });
});
