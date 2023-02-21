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
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(
      patchWishlistSet(
        mockWishlistId,
        mockWishlistSetId,
        mockWishlistSetPatchData,
      ),
    ).resolves.toEqual(expect.objectContaining({ status: 204 }));

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      mockWishlistSetPatchData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      patchWishlistSet(
        mockWishlistId,
        mockWishlistSetId,
        mockWishlistSetPatchData,
      ),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      mockWishlistSetPatchData,
      expectedConfig,
    );
  });
});
