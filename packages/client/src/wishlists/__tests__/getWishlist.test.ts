import { getWishlist } from '..';
import {
  mockWishlistId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getWishlist', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsResponse;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(getWishlist(wishlistId)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(getWishlist(wishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}?hydrate=true`,
      expectedConfig,
    );
  });
});
