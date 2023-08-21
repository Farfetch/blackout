import {
  closetId,
  closetItemId,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { deleteUserClosetItem } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserClosetItem.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserClosetItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    await expect(
      deleteUserClosetItem(userId, closetId, closetItemId),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets/${closetId}/items/${closetItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteUserClosetItem(userId, closetId, closetItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/closets/${closetId}/items/${closetItemId}`,
      expectedConfig,
    );
  });
});
