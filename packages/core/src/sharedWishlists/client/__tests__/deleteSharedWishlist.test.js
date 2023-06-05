import { mockSharedWishlistId } from 'tests/__fixtures__/sharedWishlists';
import client from '../../../helpers/client';
import deleteSharedWishlist from '../deleteSharedWishlist';
import fixtures from '../__fixtures__/deleteSharedWishlist.fixtures';
import moxios from 'moxios';

describe('deleteSharedWishlist', () => {
  const expectedConfig = undefined;
  const sharedWishlistId = mockSharedWishlistId;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ sharedWishlistId });

    await expect(deleteSharedWishlist(sharedWishlistId)).resolves.toEqual(
      expect.objectContaining({ status: 204 }),
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive client request error', async () => {
    fixtures.failure({ sharedWishlistId });

    await expect(
      deleteSharedWishlist(sharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });
});
