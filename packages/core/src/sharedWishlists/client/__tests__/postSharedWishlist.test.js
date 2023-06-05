import {
  mockSharedWishlistPostData,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postSharedWishlist.fixtures';
import moxios from 'moxios';
import postSharedWishlist from '../postSharedWishlist';

describe('postSharedWishlist', () => {
  const expectedConfig = undefined;
  const data = mockSharedWishlistPostData;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => {
    moxios.uninstall(client);
  });

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    fixtures.success({ response });

    await expect(postSharedWishlist(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/sharedWishlists',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(postSharedWishlist(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/sharedWishlists',
      data,
      expectedConfig,
    );
  });
});
