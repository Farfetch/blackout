import {
  metadata,
  MockRenderScript,
  product,
  productResult,
  productResultWithStock,
  productWithQuantity,
} from './__fixtures__';
import structuredProduct from '../product';

const { productDetail, lastCategory, url, seller } = product;

describe('structuredProduct', () => {
  it('should correctly generate JSON-LD for a specific product', () => {
    const renderStructuredProduct = structuredProduct(
      productDetail,
      metadata,
      lastCategory,
      url,
      seller,
    );

    expect(renderStructuredProduct).toEqual(MockRenderScript(JSON.stringify(productResult)));
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
      lastCategory,
      url,
      seller,
    );

    expect(renderStructuredProduct).toEqual(
      MockRenderScript(JSON.stringify(productResultWithStock)),
    );
  });
});
