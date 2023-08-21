import {
  closetId,
  mockGetUserClosetItemsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { getUserClosetItems } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserClosetItems.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserClosetItems', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetUserClosetItemsResponse));

    await expect(getUserClosetItems(userId, closetId)).resolves.toStrictEqual(
      mockGetUserClosetItemsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets/${closetId}/items`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getUserClosetItems(userId, closetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets/${closetId}/items`,
      expectedConfig,
    );
  });
});
