import { getWishlist } from '..';
import {
  mockWishlistId,
  mockWishlistResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getWishlist.fixtures';
import moxios from 'moxios';

describe('getWishlist', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockWishlistResponse;

    fixtures.success({ wishlistId, response });

    await expect(getWishlist(wishlistId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId });

    await expect(getWishlist(wishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}?hydrate=true`,
      expectedConfig,
    );
  });
});
