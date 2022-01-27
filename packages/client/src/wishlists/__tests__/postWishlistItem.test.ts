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
  const wishlistId = mockWishlistId;
  const data = mockWishlistItemPostData;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsResponse;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(postWishlistItem(wishlistId, data)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(postWishlistItem(wishlistId, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items`,
      data,
      expectedConfig,
    );
  });
});
