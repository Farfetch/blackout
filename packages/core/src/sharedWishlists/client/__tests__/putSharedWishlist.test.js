import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { putSharedWishlist } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putSharedWishlist.fixtures';
import moxios from 'moxios';

describe('putSharedWishlist', () => {
  const expectedConfig = undefined;
  const sharedWishlistId = mockSharedWishlistId;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    fixtures.success({ sharedWishlistId, response });

    await expect(putSharedWishlist(sharedWishlistId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive client request error', async () => {
    fixtures.failure({ sharedWishlistId });

    await expect(putSharedWishlist(sharedWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${sharedWishlistId}`,
      expectedConfig,
    );
  });
});
