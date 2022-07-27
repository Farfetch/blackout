import { getUserDefaultPersonalId } from '..';
import {
  mockGetUserDefaultPersonalIdResponse,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserDefaultPersonalId.fixtures';
import mswServer from '../../../../tests/mswServer';

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

    expect.assertions(2);

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

    expect.assertions(2);
    await expect(
      getUserDefaultPersonalId(userId, config),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids/default`,
      expectedConfig,
    );
  });
});