import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistSetPatchData,
} from 'tests/__fixtures__/wishlists';
import { patchWishlistsSet } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchWishlistsSet.fixtures';
import moxios from 'moxios';

describe('patchWishlistsSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistSetId = mockWishlistSetId;
  const data = mockWishlistSetPatchData;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({
      wishlistId,
      wishlistSetId,
    });

    await expect(
      patchWishlistsSet(wishlistId, wishlistSetId, data),
    ).resolves.toEqual(expect.objectContaining({ status: 204 }));

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      wishlistId,
      wishlistSetId,
    });

    await expect(
      patchWishlistsSet(wishlistId, wishlistSetId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      data,
      expectedConfig,
    );
  });
});
