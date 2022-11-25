import { deleteSharedWishlist } from '..';
import { mockSharedWishlistId } from 'tests/__fixtures__/sharedWishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteSharedWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

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
    expect.assertions(2);

    await expect(
      deleteSharedWishlist(mockSharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });
});
