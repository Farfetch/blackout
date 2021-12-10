import { createBagItemHash } from '../';
import { mockBagItem, mockProductAggregatorId } from 'tests/__fixtures__/bags';
import omit from 'lodash/omit';

describe('createBagItemHash()', () => {
  describe('error handling', () => {
    it('should throw error when product id is missing', () => {
      const { productId, product, ...item } = mockBagItem;

      expect(() => createBagItemHash(item)).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when merchant id is missing', () => {
      const { merchantId, merchant, ...item } = mockBagItem;

      expect(() => createBagItemHash(item)).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when size id is missing', () => {
      const { sizeId, size, ...item } = mockBagItem;

      expect(() => createBagItemHash(item)).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when scale id is missing', () => {
      const { sizeScale, size, ...item } = mockBagItem;

      expect(() => createBagItemHash(item)).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });
  });

  describe('hash creation', () => {
    const baseHashPattern = `${mockBagItem.merchantId}!${mockBagItem.product.id}!${mockBagItem.sizeId}!${mockBagItem.size.scale}`;

    it('should create a valid hash when no other parameters are provided', () => {
      expect(
        createBagItemHash(
          omit(mockBagItem, ['customAttributes', 'productAggregator']),
        ),
      ).toBe(baseHashPattern);
    });

    it('should create a valid hash when `customAttributes` are provided', () => {
      expect(createBagItemHash(mockBagItem)).toBe(
        `${baseHashPattern}!${mockBagItem.customAttributes}`,
      );
    });

    it('should create a valid hash when a `productAggregatorId` is provided', () => {
      const mockBagItemWithProductAggregator = {
        ...mockBagItem,
        productAggregator: {
          bundleSlug: '/slug',
          id: mockProductAggregatorId,
        },
      };
      expect(
        createBagItemHash(
          omit(mockBagItemWithProductAggregator, ['customAttributes']),
        ),
      ).toBe(
        `${baseHashPattern}!${mockBagItemWithProductAggregator.productAggregator.id}`,
      );
    });

    it('should create a valid hash from a valid bag item', () => {
      expect(createBagItemHash(mockBagItem)).toBe(
        `${baseHashPattern}!${mockBagItem.customAttributes}`,
      );
    });
  });
});
