import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { patchWishlistItem } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchWishlistItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('patchWishlistItem', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistItemId = mockWishlistItemId;
  const data = mockWishlistItemPatchData;
  const response = mockWishlistsResponse;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(
      patchWishlistItem(wishlistId, wishlistItemId, data),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      patchWishlistItem(wishlistId, wishlistItemId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      data,
      expectedConfig,
    );
  });
});
