import { deleteWishlistItem } from '../index.js';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteWishlistItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deleteWishlistItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));

    await expect(
      deleteWishlistItem(mockWishlistId, mockWishlistItemId),
    ).resolves.toEqual(mockWishlistsResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items/${mockWishlistItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteWishlistItem(mockWishlistId, mockWishlistItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items/${mockWishlistItemId}`,
      expectedConfig,
    );
  });
});
