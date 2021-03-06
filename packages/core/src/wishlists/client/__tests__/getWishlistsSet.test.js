import { getWishlistsSet } from '..';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getWishlistsSet.fixtures';
import moxios from 'moxios';

describe('getWishlistsSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistSetId = mockWishlistSetId;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsSetResponse;

    fixtures.success({ wishlistId, wishlistSetId, response });

    await expect(getWishlistsSet(wishlistId, wishlistSetId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId, wishlistSetId });

    await expect(
      getWishlistsSet(wishlistId, wishlistSetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });
});
