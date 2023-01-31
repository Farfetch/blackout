import { adaptProductSizes } from '..';
import {
  composePurchaseChannels,
  getAttributesBySizeId,
} from '../adaptProductSizes';
import {
  oneSizeProduct,
  outOfStockProduct,
  productWithTwoSizes,
  twoSizesProductVariants,
} from '../__fixtures__/adapters.fixtures';

describe('adaptProductSizes()', () => {
  it('should not return anything if no sizes are provided', () => {
    expect(adaptProductSizes()).toBeUndefined();
  });

  it('should return a product sizes adapter object for a product with two sizes available', () => {
    expect(adaptProductSizes(productWithTwoSizes)).toMatchSnapshot(
      'product with two sizes adapter',
    );
  });

  it('should return a product sizes adapter object for a product with two sizes available and variants', () => {
    const result = adaptProductSizes(
      productWithTwoSizes,
      twoSizesProductVariants,
    );
    const customVariantMatcher = expect.objectContaining({
      scaleDescription: 'Clothing standard',
    });

    expect(result).toMatchSnapshot(
      'product with two sizes and variants adapter',
    );
    expect(result).toEqual(
      expect.arrayContaining([customVariantMatcher, customVariantMatcher]),
    );
  });

  it('should return the product sizes adapter object for a product with one size only', () => {
    const result = adaptProductSizes(oneSizeProduct);

    expect(result).toMatchSnapshot('one size product adapter');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ isOneSize: true })]),
    );
  });

  it('should return the product sizes adapter object for a product which has a size out of stock', () => {
    const result = adaptProductSizes(outOfStockProduct);

    expect(result).toMatchSnapshot('out of stock product adapter');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ isOutOfStock: true })]),
    );
  });
});

describe('composePurchaseChannels()', () => {
  it('should generate an object with composed key and purchase channels related to the provided variants', () => {
    expect(composePurchaseChannels(twoSizesProductVariants)).toMatchSnapshot(
      'composed product purchase channels object',
    );
  });
});

describe('getAttributesBySizeId()', () => {
  it('should not return any size attributes if the variant is not available', () => {
    expect(getAttributesBySizeId('1', twoSizesProductVariants)).toEqual({});
  });

  it('should return the right attributes according to the provided variant', () => {
    expect(
      getAttributesBySizeId('20', twoSizesProductVariants),
    ).toMatchSnapshot('size 20/S variants adapter');
  });
});
