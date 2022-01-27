import { deleteWishlistItem } from '..';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteWishlistItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deleteWishlistItem', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistItemId = mockWishlistItemId;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsResponse;
    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(
      deleteWishlistItem(wishlistId, wishlistItemId),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      deleteWishlistItem(wishlistId, wishlistItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      expectedConfig,
    );
  });
});
