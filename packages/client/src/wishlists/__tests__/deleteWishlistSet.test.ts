import { deleteWishlistSet } from '../index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
} from 'tests/__fixtures__/wishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteWishlistSet.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deleteWishlistSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(
      deleteWishlistSet(mockWishlistId, mockWishlistSetId),
    ).resolves.toEqual(expect.objectContaining({ status: 204 }));

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteWishlistSet(mockWishlistId, mockWishlistSetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      expectedConfig,
    );
  });
});
