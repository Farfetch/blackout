import { getUserDefaultPersonalId } from '../index.js';
import {
  mockGetUserDefaultPersonalIdResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserDefaultPersonalId.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserDefaultPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetUserDefaultPersonalIdResponse));

    await expect(
      getUserDefaultPersonalId(userId, config),
    ).resolves.toStrictEqual(mockGetUserDefaultPersonalIdResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids/default`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getUserDefaultPersonalId(userId, config),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids/default`,
      expectedConfig,
    );
  });
});
