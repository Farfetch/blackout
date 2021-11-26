import { deleteWishlistSet } from '..';
import {
  mockWishlistId,
  mockWishlistSetId,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteWishlistSet.fixtures';
import moxios from 'moxios';

describe('deleteWishlistSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistSetId = mockWishlistSetId;
  const spy = jest.spyOn(client, 'delete');

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

    await expect(deleteWishlistSet(wishlistId, wishlistSetId)).resolves.toEqual(
      expect.objectContaining({ status: 204 }),
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId, wishlistSetId });

    await expect(
      deleteWishlistSet(wishlistId, wishlistSetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });
});
