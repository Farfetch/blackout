import { getSharedWishlist } from '..';
import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSharedWishlist.fixtures';
import moxios from 'moxios';

describe('getSharedWishlist', () => {
  const expectedConfig = undefined;
  const sharedWishlistId = mockSharedWishlistId;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    fixtures.success({ sharedWishlistId, response });

    await expect(getSharedWishlist(sharedWishlistId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive client request error', async () => {
    fixtures.failure({ sharedWishlistId });

    await expect(getSharedWishlist(sharedWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });
});
