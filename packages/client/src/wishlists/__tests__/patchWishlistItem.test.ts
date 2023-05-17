import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { patchWishlistItem } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchWishlistItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('patchWishlistItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));

    await expect(
      patchWishlistItem(
        mockWishlistId,
        mockWishlistItemId,
        mockWishlistItemPatchData,
      ),
    ).resolves.toEqual(mockWishlistsResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items/${mockWishlistItemId}`,
      mockWishlistItemPatchData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      patchWishlistItem(
        mockWishlistId,
        mockWishlistItemId,
        mockWishlistItemPatchData,
      ),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items/${mockWishlistItemId}`,
      mockWishlistItemPatchData,
      expectedConfig,
    );
  });
});
