import { metadata } from '../__fixtures__/metadata.fixtures';
import {
  product,
  productResult,
  productResultWithStock,
  productWithQuantity,
} from '../__fixtures__/product.fixtures';
import { renderScriptTag } from '../../helpers';
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

    expect(renderStructuredProduct).toEqual(renderScriptTag(productResult));
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
      renderScriptTag(productResultWithStock),
    );
  });
});
