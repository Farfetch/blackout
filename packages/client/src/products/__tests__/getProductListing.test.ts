import { getProductListing } from '../index.js';
import {
  mockProductsListResponse,
  mockProductsListSlug,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductListing.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductListing', () => {
  const query = {};
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductsListResponse));

    await expect(
      getProductListing(mockProductsListSlug, query),
    ).resolves.toEqual(mockProductsListResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/listing${mockProductsListSlug}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductListing(mockProductsListSlug, query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/listing${mockProductsListSlug}`,
      expectedConfig,
    );
  });
});
