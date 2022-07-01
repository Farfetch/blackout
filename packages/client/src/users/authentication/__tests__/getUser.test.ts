import * as usersClient from '..';
import { mockUsersResponse } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUser.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUser', () => {
  const expectedConfig = undefined;
  const responseUrl = '/account/v1/users/me';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    expect.assertions(2);

    await expect(usersClient.getUser()).resolves.toStrictEqual(
      mockUsersResponse,
    );

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(usersClient.getUser()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });
});
