import {
  metadata,
  MockRenderScript,
  product,
  productResult,
  productResultWithStock,
  productWithQuantity,
} from './__fixtures__/index.js';
import structuredProduct from '../structuredProduct.js';

const seller = 'Seller';

describe('structuredProduct', () => {
  it('should correctly generate JSON-LD for a specific product', () => {
    const renderStructuredProduct = structuredProduct(
      product,
      metadata,
      seller,
    );

    expect(renderStructuredProduct).toEqual(
      MockRenderScript(JSON.stringify(productResult)),
    );
  });

  it('should correctly generate JSON-LD with stock available', () => {
    const metaWithAvailability = {
      ...metadata,
      metatags: [
        {
          tagName: '',
          propertyType: 'property',
          propertyDescription: 'product:availability',
          content: 'available',
          contentType: '',
        },
      ],
    };
    const renderStructuredProduct = structuredProduct(
      productWithQuantity,
      metaWithAvailability,
      seller,
    );

    expect(renderStructuredProduct).toEqual(
      MockRenderScript(JSON.stringify(productResultWithStock)),
    );
  });
});
