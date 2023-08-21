import { getUserClosets } from '../index.js';
import {
  mockGetUserClosetsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserClosets.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserClosets', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetUserClosetsResponse));

    await expect(getUserClosets(userId)).resolves.toStrictEqual(
      mockGetUserClosetsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserClosets(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets`,
      expectedConfig,
    );
  });
});
