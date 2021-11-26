import { getWishlistSets } from '..';
import {
  mockWishlistId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getWishlistSets.fixtures';
import moxios from 'moxios';

describe('getWishlistSets', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [mockWishlistsSetResponse];

    fixtures.success({ wishlistId: mockWishlistId, response });

    await expect(getWishlistSets(mockWishlistId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId: mockWishlistId });

    await expect(getWishlistSets(mockWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });
});
