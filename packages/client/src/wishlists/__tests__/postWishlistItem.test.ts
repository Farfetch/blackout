import {
  mockWishlistId,
  mockWishlistItemPostData,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { postWishlistItem } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postWishlistItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postWishlistItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));

    await expect(
      postWishlistItem(mockWishlistId, mockWishlistItemPostData),
    ).resolves.toEqual(mockWishlistsResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items`,
      mockWishlistItemPostData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postWishlistItem(mockWishlistId, mockWishlistItemPostData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/items`,
      mockWishlistItemPostData,
      expectedConfig,
    );
  });
});
