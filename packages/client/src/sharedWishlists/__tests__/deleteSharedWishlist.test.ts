import { deleteSharedWishlist } from '../index.js';
import { mockSharedWishlistId } from 'tests/__fixtures__/sharedWishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteSharedWishlist.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deleteSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteSharedWishlist(mockSharedWishlistId)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteSharedWishlist(mockSharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });
});
