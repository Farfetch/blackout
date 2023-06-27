import { getProductListingFacets } from '../index.js';
import { mockListingFacets } from 'tests/__fixtures__/products/productListingFacets.fixtures.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductListingFacets.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductListingFacets', () => {
  const query = { facets: ['sizesbycategory'] };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockListingFacets));

    await expect(getProductListingFacets(query)).resolves.toEqual(
      mockListingFacets,
    );

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/listingFacets?facets=sizesbycategory',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductListingFacets(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/listingFacets?facets=sizesbycategory',
      expectedConfig,
    );
  });
});
