import {
  productListing,
  productListingResult,
} from '../__fixtures__/productListing.fixtures';
import { renderScriptTag } from '../../helpers';
import structuredProductListing from '../productsListing';

describe('structuredProductListing', () => {
  it('should correctly generate JSON-LD for a list of products', () => {
    const renderStructuredProductList = structuredProductListing(
      productListing,
      { metatags: [] },
      '/en-pt/shopping/women',
    );

    expect(renderStructuredProductList).toEqual(
      renderScriptTag(productListingResult),
    );
  });
});
