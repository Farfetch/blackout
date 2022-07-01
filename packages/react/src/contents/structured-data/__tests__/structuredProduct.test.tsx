import {
  metadata,
  MockRenderScript,
  product,
  productResult,
  productResultWithStock,
  productWithQuantity,
} from './__fixtures__';
import structuredProduct from '../structuredProduct';

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
      metatags: [
        {
          content: 'available',
          property: {
            type: 'property',
            description: 'product:availability',
          },
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
