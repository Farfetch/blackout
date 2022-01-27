import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistSetPatchData,
} from 'tests/__fixtures__/wishlists';
import { patchWishlistSet } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchWishlistSet.fixtures';
import mswServer from '../../../tests/mswServer';

describe('patchWishlistSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistSetId = mockWishlistSetId;
  const data = mockWishlistSetPatchData;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());
    expect.assertions(2);

    await expect(
      patchWishlistSet(wishlistId, wishlistSetId, data),
    ).resolves.toEqual(expect.objectContaining({ status: 204 }));

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      patchWishlistSet(wishlistId, wishlistSetId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      data,
      expectedConfig,
    );
  });
});
