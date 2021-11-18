import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistItemPatchData,
  mockWishlistResponse,
} from 'tests/__fixtures__/wishlists';
import { patchWishlistItem } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchWishlistItem.fixtures';
import moxios from 'moxios';

describe('patchWishlistItem', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistItemId = mockWishlistItemId;
  const data = mockWishlistItemPatchData;
  const response = mockWishlistResponse;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({
      wishlistId,
      wishlistItemId,
      response,
    });

    await expect(
      patchWishlistItem(wishlistId, wishlistItemId, data),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/items/${wishlistItemId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      wishlistId,
      wishlistItemId,
      response,
    });

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
