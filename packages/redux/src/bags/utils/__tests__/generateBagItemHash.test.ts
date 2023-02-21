import { generateBagItemHash } from '..';
import {
  mockBagItemEntity,
  mockBagItemHydrated,
} from 'tests/__fixtures__/bags';

describe('generateBagItemHash()', () => {
  describe('error handling', () => {
    it('should throw error when product is missing', () => {
      const { product, ...item } = mockBagItemHydrated;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when merchant is missing', () => {
      const { merchant, ...item } = mockBagItemHydrated;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when size id is missing', () => {
      const { size, ...item } = mockBagItemHydrated;

      expect(() =>
        generateBagItemHash(item),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });

    it('should throw error when scale id is missing', () => {
      const { size, ...item } = mockBagItemHydrated;

      expect(() =>
        generateBagItemHash({ scale: 'scale', ...item }),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`"',
      );
    });
  });

  describe('hash creation', () => {
    const baseHashPattern = `${mockBagItemEntity.merchant}!${mockBagItemEntity.product}!${mockBagItemEntity.size.id}!${mockBagItemEntity.size.scale}`;
    const mockProductAggregator = {
      id: 123,
      bundleSlug: 'string',
      images: {
        images: [],
        liveModelId: null,
        liveModel: null,
        productSize: null,
        tag: null,
      },
    };

    it('should create a valid hash when no other parameters are provided', () => {
      expect(generateBagItemHash(mockBagItemHydrated)).toBe(baseHashPattern);
    });

    it('should create a valid hash when `customAttributes` are provided', () => {
      const newMockBagItem = {
        ...mockBagItemHydrated,
        customAttributes: '123',
      };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.customAttributes}`,
      );
    });

    it('should create a valid hash when a `productAggregatorId` is provided', () => {
      const newMockBagItem = {
        ...mockBagItemHydrated,
        productAggregator: mockProductAggregator,
      };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.productAggregator.id}`,
      );
    });

    it('should create a valid hash from a valid bag item', () => {
      const newMockBagItem = {
        ...mockBagItemHydrated,
        productAggregator: mockProductAggregator,
        customAttributes: '123',
      };

      expect(generateBagItemHash(newMockBagItem)).toBe(
        `${baseHashPattern}!${newMockBagItem.customAttributes}!${newMockBagItem.productAggregator.id}`,
      );
    });
  });
});
