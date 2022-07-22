import { generateBagItemHash } from '..';
import { mockBagItem } from 'tests/__fixtures__/bags';

describe('generateBagItemHash()', () => {
  describe('error handling', () => {
    it('should throw error when product id is missing', () => {
      const {
        productId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        product, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when merchant id is missing', () => {
      const {
        merchantId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        merchant, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when size id is missing', () => {
      const {
        sizeId, // eslint-disable-line  @typescript-eslint/no-unused-vars
        size, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when scale id is missing', () => {
      const {
        sizeScale, // eslint-disable-line  @typescript-eslint/no-unused-vars
        size, // eslint-disable-line  @typescript-eslint/no-unused-vars
        ...item
      } = mockBagItem;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });
  });

  describe('hash creation', () => {
    const baseHashPattern = `${mockBagItem.merchantId}!${mockBagItem.product.id}!${mockBagItem.sizeId}!${mockBagItem.size.scale}`;

    it('should create a valid hash when no other parameters are provided', () => {
      expect(generateBagItemHash(mockBagItem)).toBe(baseHashPattern);
    });

    it('should create a valid hash when `customAttributes` are provided', () => {
      const newMockBagItem = { ...mockBagItem, customAttributes: '123' };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.customAttributes}`,
      );
    });

    it('should create a valid hash when a `productAggregatorId` is provided', () => {
      const newMockBagItem = {
        ...mockBagItem,
        productAggregator: { id: 123 },
      };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.productAggregator.id}`,
      );
    });

    it('should create a valid hash from a valid bag item', () => {
      const newMockBagItem = {
        ...mockBagItem,
        productAggregator: { id: 456 },
        customAttributes: '123',
      };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.customAttributes}!${newMockBagItem.productAggregator.id}`,
      );
    });
  });
});
