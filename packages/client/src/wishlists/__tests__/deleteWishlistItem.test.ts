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
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));
    expect.assertions(2);

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
    expect.assertions(2);

    await expect(
      deleteWishlistItem(mockWishlistId, mockWishlistItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items/${mockWishlistItemId}`,
      expectedConfig,
    );
  });
});
