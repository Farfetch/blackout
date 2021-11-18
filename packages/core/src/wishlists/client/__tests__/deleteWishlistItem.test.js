import { deleteWishlistItem } from '..';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteWishlistItem.fixtures';
import moxios from 'moxios';

describe('deleteWishlistItem', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistItemId = mockWishlistItemId;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockWishlistResponse;

    fixtures.success({
      wishlistId,
      wishlistItemId,
      response,
    });

    await expect(deleteWishlistItem(wishlistId, wishlistItemId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId, wishlistItemId });

    await expect(
      deleteWishlistItem(wishlistId, wishlistItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      expectedConfig,
    );
  });
});
