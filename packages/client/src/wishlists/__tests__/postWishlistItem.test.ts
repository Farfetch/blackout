import {
  mockWishlistId,
  mockWishlistItemPostData,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import { postWishlistItem } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postWishlistItem.fixtures';
import moxios from 'moxios';

describe('postWishlistItem', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const data = mockWishlistItemPostData;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsResponse;

    fixtures.success({ wishlistId, response });

    await expect(postWishlistItem(wishlistId, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId });

    await expect(postWishlistItem(wishlistId, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items`,
      data,
      expectedConfig,
    );
  });
});
