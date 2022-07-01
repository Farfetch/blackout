import {
  MockRenderScript,
  productListing,
  productListingResult,
} from './__fixtures__';
import structuredProductListing from '../structuredProductListing';

describe('structuredProductListing', () => {
  it('should correctly generate JSON-LD for a list of products', () => {
    const renderStructuredProductList = structuredProductListing(
      productListing,
      { metatags: [] },
      '/en-pt/shopping/women',
    );

    expect(renderStructuredProductList).toEqual(
      MockRenderScript(JSON.stringify(productListingResult)),
    );
  });
});
