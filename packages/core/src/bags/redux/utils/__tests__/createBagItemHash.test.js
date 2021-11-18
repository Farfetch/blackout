import { createBagItemHash } from '../';
import { mockBagItem } from 'tests/__fixtures__/bags';

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
    const baseHashPattern = `${mockBagItem.merchantId}!${mockBagItem.product.id}!${mockBagItem.sizeId}!${mockBagItem.size.scale}!`;

    it('should create a valid hash when no custom attributes are provided', () => {
      const { customAttributes, ...item } = mockBagItem;

      expect(createBagItemHash(item)).toBe(baseHashPattern);
    });
  });
});
