import {
  metadata,
  MockRenderScript,
  productListing,
  productListingResult,
} from './__fixtures__/index.js';
import structuredProductListing from '../structuredProductListing.js';

describe('structuredProductListing', () => {
  it('should correctly generate JSON-LD for a list of products', () => {
    const renderStructuredProductList = structuredProductListing(
      productListing,
      { ...metadata, metatags: [] },
      '/en-pt/shopping/women',
    );

    expect(renderStructuredProductList).toEqual(
      MockRenderScript(JSON.stringify(productListingResult)),
    );
  });
});
