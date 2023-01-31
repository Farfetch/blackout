import * as helpers from '../';
import productListing from '../../components/__fixtures__/productListing.fixtures.json';
import productListingResult from '../__fixtures__/productListingResult.fixtures.json';

describe('generateProductListing', () => {
  it('should correctly generate JSON-LD for a list of products', () => {
    const productList = helpers.generateProductListing(
      productListing,
      { metatags: [] },
      '/en-pt/shopping/women',
    );

    expect(productList).toMatchObject(productListingResult);
  });
});
