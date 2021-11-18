import * as helpers from '../';
import {
  product,
  productWithQuantity,
} from '../../components/__fixtures__/product.fixtures';
import {
  productResult,
  productResultWithStock,
  resultNoProduct,
} from '../__fixtures__/productResult.fixtures';

const { productDetail, lastCategory, url, seller } = product;

describe('generateProduct', () => {
  it('should correctly generate JSON-LD for a specific product', () => {
    const meta = {
      metatags: [
        {
          content:
            'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
          property: {
            type: 'property',
            description: 'product:image:1',
          },
        },
      ],
    };
    const productList = helpers.generateProduct(
      productDetail,
      meta,
      lastCategory,
      url,
      seller,
    );

    expect(productList).toMatchObject(productResult);
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
    const productList = helpers.generateProduct(
      productWithQuantity,
      metaWithAvailability,
      lastCategory,
      url,
      seller,
    );

    expect(productList).toMatchObject(productResultWithStock);
  });

  it('no product', () => {
    const meta = {
      metatags: [
        {
          content:
            'https://api.blackout.com/15/09/27/35/15092735_25353206_200.jpg',
          property: {
            type: 'property',
            description: 'product:image:1',
          },
        },
      ],
    };
    const productList = helpers.generateProduct(
      {},
      meta,
      lastCategory,
      url,
      seller,
    );

    expect(productList).toMatchObject(resultNoProduct);
  });
});
