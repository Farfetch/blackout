import { getUserExternalLogins } from '../../index.js';
import {
  mockGetUserExternalLoginsResponse,
  userId,
} from 'tests/__fixtures__/authentication/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserExternalLogins.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserExternalLogins', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetUserExternalLoginsResponse));

    await expect(getUserExternalLogins(userId)).resolves.toStrictEqual(
      mockGetUserExternalLoginsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/externalLogins`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserExternalLogins(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/externalLogins`,
      expectedConfig,
    );
  });
});
