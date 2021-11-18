import {
  mockWishlistId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import { postWishlistsSet } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postWishlistsSet.fixtures';
import moxios from 'moxios';

describe('postWishlistsSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const data = mockWishlistsSetResponse;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsSetResponse;

    fixtures.success({ wishlistId, response });

    await expect(postWishlistsSet(wishlistId, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId });

    await expect(postWishlistsSet(wishlistId, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets`,
      data,
      expectedConfig,
    );
  });
});
